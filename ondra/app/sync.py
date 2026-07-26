"""Bounded Garmin pull, in-memory FIT processing, and Hasura ingestion."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Protocol, cast

from garminconnect import Garmin

from .fit import parse_streams, start_location
from .garmin_client import get_client
from .hasura import HasuraClient, WriterResult, write_sync_data
from .main import Settings
from .process import (
    ActivityDTO,
    HrvDTO,
    SleepDTO,
    TrainingReadinessDTO,
    normalize_activity,
    normalize_hrv,
    normalize_sleep,
    normalize_training_readiness,
)

log = logging.getLogger(__name__)


class GarminClient(Protocol):
    """Garmin API surface required by one synchronization unit."""

    def get_activities(self, start: int, limit: int) -> Any: ...

    def download_activity(self, activity_id: str, *, dl_fmt: Any) -> bytes: ...

    def get_sleep_data(self, cdate: str) -> dict[str, Any]: ...

    def get_hrv_data(self, cdate: str) -> dict[str, Any] | None: ...

    def get_training_readiness(self, cdate: str) -> Any: ...


def sync(settings: Settings, *, days: int, max_activities: int) -> WriterResult:
    """Execute one bounded, tolerant synchronization unit."""
    client = get_client(settings)
    activities, errors, failed = _pull_activities(client, max_activities)
    sleeps, sleep_errors = _pull_sleep(client, days)
    hrvs, hrv_errors = _pull_hrv(client, days)
    readiness, readiness_errors = _pull_readiness(client, days)
    log.info(
        "sync pulled %d activities (%d failed), %d sleep, %d hrv, %d readiness",
        len(activities),
        failed,
        len(sleeps),
        len(hrvs),
        len(readiness),
    )
    with HasuraClient(settings) as hasura:
        result = write_sync_data(hasura, activities, sleeps, hrvs, readiness)
    result.activities_failed += failed
    result.errors = [
        *errors,
        *sleep_errors,
        *hrv_errors,
        *readiness_errors,
        *result.errors,
    ]
    return result


def _pull_activities(
    client: GarminClient, max_activities: int, *, batch_size: int = 100
) -> tuple[list[tuple[ActivityDTO, dict[str, Any]]], list[str], int]:
    activities: list[tuple[ActivityDTO, dict[str, Any]]] = []
    errors: list[str] = []
    failed = 0
    start = 0
    fetched = 0
    now = datetime.now(timezone.utc)
    while fetched < max_activities:
        want = min(batch_size, max_activities - fetched)
        try:
            page = cast(list[dict[str, Any]], client.get_activities(start, want))
        except Exception as exc:  # noqa: BLE001 -- third-party API exceptions vary
            errors.append(f"get_activities({start}, {want}) failed: {exc}")
            break
        log.info("get_activities(%d, %d) returned %d items", start, want, len(page))
        if not page:
            break
        bounded_page = page[:want]
        for summary in bounded_page:
            gid = summary.get("activityId")
            try:
                if gid is None:
                    raise ValueError("activityId is missing")
                fit_bytes = client.download_activity(
                    str(gid), dl_fmt=Garmin.ActivityDownloadFormat.ORIGINAL
                )
                payload = parse_streams(fit_bytes)
                location = start_location(fit_bytes)
                dto = normalize_activity(
                    summary, start_location=location, synced_at=now
                )
                activities.append((dto, cast(dict[str, Any], payload)))
            except Exception as exc:  # noqa: BLE001 -- tolerate each Garmin/FIT item
                failed += 1
                errors.append(f"activity {gid!s} failed: {exc}")
        received = len(page)
        fetched += received
        start += received
        if received < want:
            break
    return activities, errors, failed


def _pull_sleep(client: GarminClient, days: int) -> tuple[list[SleepDTO], list[str]]:
    sleeps: list[SleepDTO] = []
    errors: list[str] = []
    today = datetime.now().date()
    for offset in range(days):
        day = (today - timedelta(days=offset)).isoformat()
        try:
            data = client.get_sleep_data(day)
            daily = (data or {}).get("dailySleepDTO") or {}
            if daily.get("sleepTimeSeconds") in (None, 0):
                continue
            sleeps.append(normalize_sleep(data, synced_at=datetime.now(timezone.utc)))
        except Exception as exc:  # noqa: BLE001 -- tolerate each Garmin day
            errors.append(f"get_sleep_data({day}) failed: {exc}")
    return sleeps, errors


def _pull_hrv(client: GarminClient, days: int) -> tuple[list[HrvDTO], list[str]]:
    hrvs: list[HrvDTO] = []
    errors: list[str] = []
    today = datetime.now().date()
    for offset in range(days):
        day = (today - timedelta(days=offset)).isoformat()
        try:
            data = client.get_hrv_data(day)
            if not data or not (data.get("hrvSummary") or {}).get("calendarDate"):
                continue
            hrvs.append(normalize_hrv(data, synced_at=datetime.now(timezone.utc)))
        except Exception as exc:  # noqa: BLE001 -- tolerate each Garmin day
            errors.append(f"get_hrv_data({day}) failed: {exc}")
    return hrvs, errors


def _pull_readiness(
    client: GarminClient, days: int
) -> tuple[list[TrainingReadinessDTO], list[str]]:
    readiness: list[TrainingReadinessDTO] = []
    errors: list[str] = []
    today = datetime.now().date()
    for offset in range(days):
        day = (today - timedelta(days=offset)).isoformat()
        try:
            data = client.get_training_readiness(day)
            readiness.extend(
                normalize_training_readiness(data, synced_at=datetime.now(timezone.utc))
            )
        except Exception as exc:  # noqa: BLE001 -- tolerate each Garmin day
            errors.append(f"get_training_readiness({day}) failed: {exc}")
    return readiness, errors
