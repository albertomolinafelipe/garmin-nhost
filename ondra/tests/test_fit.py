from __future__ import annotations

import builtins
import io
import zipfile
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

import pytest

import app.fit as fit


class FakeFrame:
    name = "record"

    def __init__(self, **values: object) -> None:
        self.values = values

    def get_value(self, name: str, fallback: object = None) -> object:
        return self.values.get(name, fallback)


class FakeReader:
    inputs: list[bytes] = []
    frames: list[FakeFrame] = []

    def __init__(self, source: io.BytesIO) -> None:
        self.source = source

    def __enter__(self) -> FakeReader:
        self.inputs.append(self.source.read())
        return self

    def __exit__(self, *_args: object) -> None:
        return None

    def __iter__(self):  # type: ignore[no-untyped-def]
        return iter(self.frames)


def test_downsample_caps_bucket_averages_and_preserves_endpoints() -> None:
    samples = [(index * 10, index * 1.0) for index in range(20)]
    result = fit._downsample(samples, 6)

    assert len(result) <= 6
    assert result[0] == {"t": 0, "v": 0}
    assert result[-1] == {"t": 190, "v": 19}
    assert result[1:-1] == [
        {"t": 30, "v": 2},
        {"t": 70, "v": 7},
        {"t": 120, "v": 12},
        {"t": 160, "v": 16},
    ]


def test_stride_caps_rounds_and_always_includes_last() -> None:
    points = [(index * 1.0, -index * 1.0) for index in range(17)]
    result = fit._stride(points, 5)

    assert len(result) == 5
    assert result[0] == {"lat": 0.0, "lng": 0.0}
    assert result[-1] == {"lat": 16.0, "lng": -16.0}


def test_semicircle_conversion() -> None:
    frame = FakeFrame(position_lat=2**30, position_long=-(2**30))
    expected = (90.0, -90.0)
    assert fit._track_point(frame) == expected  # type: ignore[arg-type]


def test_zip_is_unwrapped_and_all_channels_are_parsed_once(monkeypatch) -> None:
    start = datetime(2026, 1, 1)
    FakeReader.inputs = []
    FakeReader.frames = [
        FakeFrame(
            timestamp=start,
            heart_rate=120,
            enhanced_altitude=100.4,
            position_lat=2**30,
            position_long=-(2**30),
        ),
        FakeFrame(
            timestamp=start + timedelta(seconds=5),
            heart_rate=130,
            enhanced_altitude=None,
            altitude=102.6,
            position_lat=2**29,
            position_long=-(2**29),
        ),
    ]
    monkeypatch.setattr(fit.fitdecode, "FitReader", FakeReader)
    monkeypatch.setattr(fit.fitdecode, "FitDataMessage", FakeFrame)
    archive_bytes = io.BytesIO()
    with zipfile.ZipFile(archive_bytes, "w") as archive:
        archive.writestr("activity.fit", b"unwrapped-fit")

    payload = fit.parse_streams(archive_bytes.getvalue())

    assert FakeReader.inputs == [b"unwrapped-fit"]
    assert payload == {
        "hr": [{"t": 0, "v": 120}, {"t": 5, "v": 130}],
        "track": [
            {"lat": 90.0, "lng": -90.0},
            {"lat": 45.0, "lng": -45.0},
        ],
        "elevation": [{"t": 0, "v": 100}, {"t": 5, "v": 103}],
    }


def test_start_location_uses_first_valid_fix(monkeypatch) -> None:
    FakeReader.inputs = []
    FakeReader.frames = [
        FakeFrame(position_lat=None, position_long=None),
        FakeFrame(position_lat=2**30, position_long=2**29),
    ]
    monkeypatch.setattr(fit.fitdecode, "FitReader", FakeReader)
    monkeypatch.setattr(fit.fitdecode, "FitDataMessage", FakeFrame)
    expected = (90.0, 45.0)
    assert fit.start_location(b"bare-fit") == expected


@pytest.mark.parametrize("data", [b"", b"garbage", b"PK not really a zip"])
def test_bad_bytes_return_empty_payload_and_location(data: bytes) -> None:
    assert fit.parse_streams(data) == {"hr": [], "track": [], "elevation": []}
    assert fit.start_location(data) is None


def test_processing_never_opens_a_file_for_writing(monkeypatch, tmp_path: Path) -> None:
    monkeypatch.chdir(tmp_path)
    real_open = builtins.open

    def guarded_open(file: Any, mode: str = "r", *args: Any, **kwargs: Any):  # type: ignore[no-untyped-def]
        assert not any(flag in mode for flag in "wax+")
        return real_open(file, mode, *args, **kwargs)

    monkeypatch.setattr(builtins, "open", guarded_open)
    fit.parse_streams(b"garbage")
    fit.start_location(b"garbage")
    assert list(tmp_path.iterdir()) == []
