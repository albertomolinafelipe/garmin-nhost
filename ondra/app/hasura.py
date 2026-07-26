"""Column-family-safe Hasura writer for normalized Garmin data."""

from __future__ import annotations

import time
from collections.abc import Iterable, Sequence
from dataclasses import asdict, dataclass, field
from datetime import date, datetime
from typing import Any

import httpx

from .main import Settings
from .process import ActivityDTO, HrvDTO, SleepDTO

ACTIVITY_SYNCED_COLUMNS = (
    "activity_type",
    "start_time",
    "duration_s",
    "distance_m",
    "avg_hr",
    "max_hr",
    "elevation_gain_m",
    "calories",
    "avg_speed_mps",
    "avg_power_w",
    "start_lat",
    "start_lng",
    "synced_at",
)
SLEEP_SYNCED_COLUMNS = (
    "start_time",
    "end_time",
    "total_sleep_s",
    "deep_sleep_s",
    "light_sleep_s",
    "rem_sleep_s",
    "awake_s",
    "avg_hrv",
    "resting_hr",
    "sleep_score",
    "synced_at",
)

HRV_SYNCED_COLUMNS = (
    "weekly_avg",
    "last_night_avg",
    "last_night_5min_high",
    "baseline_low_upper",
    "baseline_balanced_low",
    "baseline_balanced_upper",
    "baseline_marker_value",
    "status",
    "feedback_phrase",
    "start_time",
    "end_time",
    "readings",
    "synced_at",
)


def _columns(columns: Sequence[str]) -> str:
    return ", ".join(columns)


ACTIVITIES_MUTATION = f"""
mutation UpsertActivities($objects: [activities_insert_input!]!) {{
  insert_activities(objects: $objects, on_conflict: {{
    constraint: activities_garmin_activity_id_key
    update_columns: [{_columns(ACTIVITY_SYNCED_COLUMNS)}]
  }}) {{ returning {{ id garmin_activity_id }} }}
}}
"""
SLEEP_MUTATION = f"""
mutation UpsertSleep($objects: [sleep_insert_input!]!) {{
  insert_sleep(objects: $objects, on_conflict: {{
    constraint: sleep_calendar_date_key
    update_columns: [{_columns(SLEEP_SYNCED_COLUMNS)}]
  }}) {{ returning {{ calendar_date }} }}
}}
"""
HRV_MUTATION = f"""
mutation UpsertDailyHrv($objects: [daily_hrv_insert_input!]!) {{
  insert_daily_hrv(objects: $objects, on_conflict: {{
    constraint: daily_hrv_calendar_date_key
    update_columns: [{_columns(HRV_SYNCED_COLUMNS)}]
  }}) {{ returning {{ calendar_date }} }}
}}
"""
STREAM_MUTATION = """
mutation UpsertActivityStream($activityId: bigint!, $payload: jsonb!) {
  insert_activity_streams_one(object: {activity_id: $activityId, payload: $payload},
    on_conflict: {constraint: activity_streams_activity_id_key, update_columns: [payload]}) {
    activity_id
  }
}
"""
EXISTING_ACTIVITIES_QUERY = """
query ExistingActivities($ids: [bigint!]!) {
  activities(where: {garmin_activity_id: {_in: $ids}}) { garmin_activity_id }
}
"""
EXISTING_SLEEP_QUERY = """
query ExistingSleep($dates: [date!]!) {
  sleep(where: {calendar_date: {_in: $dates}}) { calendar_date }
}
"""
EXISTING_HRV_QUERY = """
query ExistingHrv($dates: [date!]!) {
  daily_hrv(where: {calendar_date: {_in: $dates}}) { calendar_date }
}
"""


class HasuraError(RuntimeError):
    """A non-retryable GraphQL or exhausted transport failure."""


class HasuraClient:
    def __init__(
        self,
        settings: Settings,
        *,
        timeout: float = 20.0,
        max_attempts: int = 3,
        transport: httpx.BaseTransport | None = None,
    ) -> None:
        self._max_attempts = max_attempts
        self._client = httpx.Client(
            base_url=settings.hasura_graphql_url,
            headers={"x-hasura-admin-secret": settings.hasura_admin_secret},
            timeout=timeout,
            transport=transport,
        )

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> HasuraClient:
        return self

    def __exit__(self, *_args: object) -> None:
        self.close()

    def execute_graphql(self, query: str, variables: dict[str, Any]) -> dict[str, Any]:
        """Execute once for GraphQL errors; retry only network errors and 5xx."""
        for attempt in range(self._max_attempts):
            try:
                response = self._client.post(
                    "", json={"query": query, "variables": variables}
                )
            except httpx.TransportError as exc:
                if attempt + 1 == self._max_attempts:
                    raise HasuraError("Hasura request failed") from exc
                time.sleep(0.05 * (2**attempt))
                continue
            if response.status_code >= 500:
                if attempt + 1 == self._max_attempts:
                    raise HasuraError("Hasura request failed")
                time.sleep(0.05 * (2**attempt))
                continue
            if response.is_error:
                raise HasuraError(
                    f"Hasura request failed with HTTP {response.status_code}"
                )
            body = response.json()
            if body.get("errors"):
                messages = [
                    str(error.get("message", "GraphQL error"))
                    for error in body["errors"]
                ]
                raise HasuraError("; ".join(messages))
            data = body.get("data")
            if not isinstance(data, dict):
                raise HasuraError("Hasura response did not contain data")
            return data
        raise AssertionError("unreachable")


def _serialize(value: Any) -> Any:
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, dict):
        return {key: _serialize(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [_serialize(item) for item in value]
    return value


def serialize_activity(dto: ActivityDTO) -> dict[str, Any]:
    return _serialize(asdict(dto))


def serialize_sleep(dto: SleepDTO) -> dict[str, Any]:
    return _serialize(asdict(dto))


def serialize_hrv(dto: HrvDTO) -> dict[str, Any]:
    return _serialize(asdict(dto))


def upsert_activities(
    client: HasuraClient, dtos: Sequence[ActivityDTO]
) -> dict[int, int]:
    if not dtos:
        return {}
    unique_dtos = {dto.garmin_activity_id: dto for dto in dtos}
    data = client.execute_graphql(
        ACTIVITIES_MUTATION,
        {"objects": [serialize_activity(dto) for dto in unique_dtos.values()]},
    )
    rows = data["insert_activities"]["returning"]
    try:
        return {int(row["garmin_activity_id"]): int(row["id"]) for row in rows}
    except (KeyError, TypeError, ValueError) as exc:
        raise HasuraError("Hasura returned invalid activity identifiers") from exc


def upsert_activity_streams(
    client: HasuraClient, activity_id: int, payload: dict[str, Any]
) -> None:
    client.execute_graphql(
        STREAM_MUTATION, {"activityId": activity_id, "payload": payload}
    )


def upsert_sleep(client: HasuraClient, dtos: Sequence[SleepDTO]) -> None:
    if dtos:
        unique_dtos = {dto.calendar_date: dto for dto in dtos}
        client.execute_graphql(
            SLEEP_MUTATION,
            {"objects": [serialize_sleep(dto) for dto in unique_dtos.values()]},
        )


def upsert_hrv(client: HasuraClient, dtos: Sequence[HrvDTO]) -> None:
    if dtos:
        unique_dtos = {dto.calendar_date: dto for dto in dtos}
        client.execute_graphql(
            HRV_MUTATION,
            {"objects": [serialize_hrv(dto) for dto in unique_dtos.values()]},
        )


@dataclass
class WriterResult:
    activities_created: int = 0
    activities_updated: int = 0
    sleep_created: int = 0
    sleep_updated: int = 0
    hrv_created: int = 0
    hrv_updated: int = 0
    streams_written: int = 0
    activities_failed: int = 0
    errors: list[str] = field(default_factory=list)


def _batches(items: Sequence[Any], size: int) -> Iterable[Sequence[Any]]:
    for offset in range(0, len(items), size):
        yield items[offset : offset + size]


def write_sync_data(
    client: HasuraClient,
    activities: Sequence[tuple[ActivityDTO, dict[str, Any] | None]],
    sleep: Sequence[SleepDTO],
    hrv: Sequence[HrvDTO] = (),
    *,
    batch_size: int = 50,
) -> WriterResult:
    """Write a sync, querying keys first to report created versus updated counts.

    Duplicate keys are collapsed with the final input winning. Failed activity batches are
    skipped while later batches and sleep continue, matching SyncResult partial-failure semantics.
    """
    if batch_size < 1:
        raise ValueError("batch_size must be positive")
    result = WriterResult()
    by_id = {dto.garmin_activity_id: (dto, payload) for dto, payload in activities}
    unique_activities = list(by_id.values())
    ids = list(by_id)
    existing_rows = (
        client.execute_graphql(EXISTING_ACTIVITIES_QUERY, {"ids": ids})["activities"]
        if ids
        else []
    )
    try:
        existing = {int(row["garmin_activity_id"]) for row in existing_rows}
    except (KeyError, TypeError, ValueError) as exc:
        raise HasuraError(
            "Hasura returned invalid existing activity identifiers"
        ) from exc

    for batch in _batches(unique_activities, batch_size):
        try:
            id_map = upsert_activities(client, [item[0] for item in batch])
        except HasuraError as exc:
            result.activities_failed += len(batch)
            result.errors.append(str(exc))
            continue
        for dto, payload in batch:
            if dto.garmin_activity_id in existing:
                result.activities_updated += 1
            else:
                result.activities_created += 1
            if payload is not None:
                try:
                    upsert_activity_streams(
                        client, id_map[dto.garmin_activity_id], payload
                    )
                    result.streams_written += 1
                except HasuraError as exc:
                    result.activities_failed += 1
                    result.errors.append(str(exc))

    sleep_by_date = {dto.calendar_date: dto for dto in sleep}
    unique_sleep = list(sleep_by_date.values())
    dates = [day.isoformat() for day in sleep_by_date]
    existing_sleep_rows = (
        client.execute_graphql(EXISTING_SLEEP_QUERY, {"dates": dates})["sleep"]
        if dates
        else []
    )
    existing_dates = {str(row["calendar_date"]) for row in existing_sleep_rows}
    for batch in _batches(unique_sleep, batch_size):
        try:
            upsert_sleep(client, batch)
        except HasuraError as exc:
            result.errors.append(str(exc))
            continue
        result.sleep_updated += sum(
            dto.calendar_date.isoformat() in existing_dates for dto in batch
        )
        result.sleep_created += sum(
            dto.calendar_date.isoformat() not in existing_dates for dto in batch
        )

    hrv_by_date = {dto.calendar_date: dto for dto in hrv}
    unique_hrv = list(hrv_by_date.values())
    hrv_dates = [day.isoformat() for day in hrv_by_date]
    existing_hrv_rows = (
        client.execute_graphql(EXISTING_HRV_QUERY, {"dates": hrv_dates})["daily_hrv"]
        if hrv_dates
        else []
    )
    existing_hrv_dates = {str(row["calendar_date"]) for row in existing_hrv_rows}
    for batch in _batches(unique_hrv, batch_size):
        try:
            upsert_hrv(client, batch)
        except HasuraError as exc:
            result.errors.append(str(exc))
            continue
        result.hrv_updated += sum(
            dto.calendar_date.isoformat() in existing_hrv_dates for dto in batch
        )
        result.hrv_created += sum(
            dto.calendar_date.isoformat() not in existing_hrv_dates for dto in batch
        )
    return result
