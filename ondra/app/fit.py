"""Pure, in-memory Garmin FIT stream extraction.

Garmin ORIGINAL downloads are normally ZIP archives containing one FIT file.  This
module accepts either representation and never reads from or writes to the filesystem.
"""

from __future__ import annotations

import io
import logging
import math
import zipfile
from datetime import datetime
from typing import Any, TypedDict, cast

import fitdecode

log = logging.getLogger(__name__)

DEFAULT_MAX_POINTS = 400
DEFAULT_MAX_TRACK_POINTS = 800
_SEMICIRCLE_TO_DEG = 180.0 / 2**31


class Sample(TypedDict):
    t: int
    v: int


class TrackPoint(TypedDict):
    lat: float
    lng: float


class StreamPayload(TypedDict):
    hr: list[Sample]
    track: list[TrackPoint]
    elevation: list[Sample]


def parse_streams(data: bytes) -> StreamPayload:
    """Parse ``data`` once and return the frozen, independently sampled streams."""
    empty: StreamPayload = {"hr": [], "track": [], "elevation": []}
    try:
        records = _read_records(_fit_bytes(data))
    except Exception as exc:  # noqa: BLE001 - corrupt downloads are an expected input
        log.warning("Could not parse FIT download: %s", exc)
        return empty

    return {
        "hr": _downsample(records.hr, DEFAULT_MAX_POINTS),
        "track": _stride(records.track, DEFAULT_MAX_TRACK_POINTS),
        "elevation": _downsample(records.elevation, DEFAULT_MAX_POINTS),
    }


def streams(data: bytes) -> StreamPayload:
    """Backward-friendly short name for :func:`parse_streams`."""
    return parse_streams(data)


def start_location(data: bytes) -> tuple[float, float] | None:
    """Return the first GPS fix, or ``None`` for absent/corrupt FIT data."""
    try:
        return _read_records(_fit_bytes(data)).start_location
    except Exception as exc:  # noqa: BLE001 - callers should safely ingest partial data
        log.warning("Could not parse FIT start location: %s", exc)
        return None


class _Records:
    def __init__(self) -> None:
        self.hr: list[tuple[int, float]] = []
        self.elevation: list[tuple[int, float]] = []
        self.track: list[tuple[float, float]] = []
        self.start_location: tuple[float, float] | None = None


def _fit_bytes(data: bytes) -> bytes:
    """Unwrap a Garmin ORIGINAL ZIP in memory; tolerate a bare FIT payload."""
    source = io.BytesIO(data)
    if not zipfile.is_zipfile(source):
        return data
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        members = [info for info in archive.infolist() if not info.is_dir()]
        member = next(
            (info for info in members if info.filename.lower().endswith(".fit")),
            members[0] if members else None,
        )
        return archive.read(member) if member is not None else b""


def _read_records(data: bytes) -> _Records:
    """Walk record messages once, extracting every supported channel."""
    records = _Records()
    start: datetime | None = None
    with fitdecode.FitReader(io.BytesIO(data)) as fit:
        for frame in fit:
            if not isinstance(frame, fitdecode.FitDataMessage) or frame.name != "record":
                continue
            timestamp = frame.get_value("timestamp", fallback=None)
            elapsed: int | None = None
            if isinstance(timestamp, datetime):
                if start is None:
                    start = timestamp
                try:
                    elapsed = int((timestamp - start).total_seconds())
                except (TypeError, ValueError, OverflowError):
                    elapsed = None

            if elapsed is not None:
                heart_rate = _number(frame.get_value("heart_rate", fallback=None))
                if heart_rate is not None:
                    records.hr.append((elapsed, heart_rate))
                altitude = _number(
                    frame.get_value("enhanced_altitude", fallback=None)
                )
                if altitude is None:
                    altitude = _number(frame.get_value("altitude", fallback=None))
                if altitude is not None:
                    records.elevation.append((elapsed, altitude))

            point = _track_point(frame)
            if point is not None:
                records.track.append(point)
                if records.start_location is None:
                    records.start_location = point
    return records


def _number(value: object) -> float | None:
    try:
        number = float(cast(Any, value))
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def _track_point(frame: fitdecode.FitDataMessage) -> tuple[float, float] | None:
    lat = _number(frame.get_value("position_lat", fallback=None))
    lng = _number(frame.get_value("position_long", fallback=None))
    if lat is None or lng is None:
        return None
    return lat * _SEMICIRCLE_TO_DEG, lng * _SEMICIRCLE_TO_DEG


def _stride(
    points: list[tuple[float, float]], max_points: int
) -> list[TrackPoint]:
    """Uniformly thin a route to its cap, preserving both endpoints."""
    if max_points <= 0 or not points:
        return []
    if max_points == 1:
        kept = [points[-1]]
    elif len(points) <= max_points:
        kept = points
    else:
        # Select evenly spaced indexes, including 0 and n-1, without exceeding cap.
        kept = [
            points[round(index * (len(points) - 1) / (max_points - 1))]
            for index in range(max_points)
        ]
    return [TrackPoint(lat=round(lat, 6), lng=round(lng, 6)) for lat, lng in kept]


def _downsample(
    samples: list[tuple[int, float]], max_points: int
) -> list[Sample]:
    """Bucket-average to the cap while preserving first and last samples exactly."""
    if max_points <= 0 or not samples:
        return []
    if max_points == 1:
        t, value = samples[-1]
        return [Sample(t=t, v=round(value))]
    if len(samples) <= max_points:
        return [Sample(t=t, v=round(value)) for t, value in samples]

    interior = samples[1:-1]
    bucket_count = min(max_points - 2, len(interior))
    output = [Sample(t=samples[0][0], v=round(samples[0][1]))]
    for bucket_index in range(bucket_count):
        begin = bucket_index * len(interior) // bucket_count
        end = (bucket_index + 1) * len(interior) // bucket_count
        chunk = interior[begin:end]
        midpoint = chunk[len(chunk) // 2][0]
        output.append(
            Sample(t=midpoint, v=round(sum(value for _, value in chunk) / len(chunk)))
        )
    output.append(Sample(t=samples[-1][0], v=round(samples[-1][1])))
    return output
