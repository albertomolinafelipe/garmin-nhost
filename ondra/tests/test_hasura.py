import json
from dataclasses import replace
from datetime import date, datetime, timezone
from typing import Any

import httpx
import pytest

from app.hasura import (
    ACTIVITIES_MUTATION,
    ACTIVITY_SYNCED_COLUMNS,
    HasuraClient,
    HasuraError,
    SLEEP_MUTATION,
    SLEEP_SYNCED_COLUMNS,
    STREAM_MUTATION,
    serialize_activity,
    serialize_sleep,
    upsert_activities,
    upsert_sleep,
)
from app.main import Settings
from app.process import ActivityDTO, SleepDTO

ANNOTATIONS = {
    "feeling",
    "effort",
    "food_during",
    "food_after",
    "caffeine",
    "weather",
    "notes",
    "focus",
    "hard_tries",
    "strength_exercises",
}


def settings() -> Settings:
    return Settings("remote", "https://hasura.test/v1/graphql", "admin")


def json_body(request: httpx.Request) -> dict[str, Any]:
    try:
        body = json.loads(request.content)
    except json.JSONDecodeError as exc:
        raise AssertionError("request body was not valid JSON") from exc
    assert isinstance(body, dict)
    return body


def activity(gid: int = 42) -> ActivityDTO:
    now = datetime(2026, 7, 24, 10, 30, tzinfo=timezone.utc)
    return ActivityDTO(
        gid,
        "running",
        now,
        10.5,
        2000.0,
        140,
        170,
        20.0,
        300,
        3.2,
        None,
        1.25,
        2.5,
        now,
        "Morning",
        "road",
    )


def sleep() -> SleepDTO:
    now = datetime(2026, 7, 24, tzinfo=timezone.utc)
    return SleepDTO(date(2026, 7, 24), now, now, 1, 2, 3, 4, 5, 6.5, 50, 80, now)


def test_column_allowlists_are_machine_owned_only() -> None:
    expected_activity = {
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
    }
    assert set(ACTIVITY_SYNCED_COLUMNS) == expected_activity
    assert not (set(ACTIVITY_SYNCED_COLUMNS) & ({"name", "subtype"} | ANNOTATIONS))
    assert set(SLEEP_SYNCED_COLUMNS) == {
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
    }
    assert "name" not in ACTIVITIES_MUTATION.split("update_columns:", 1)[1]
    assert "subtype" not in ACTIVITIES_MUTATION.split("update_columns:", 1)[1]
    assert "update_columns: [payload]" in STREAM_MUTATION
    assert "sleep_calendar_date_key" in SLEEP_MUTATION


def test_dto_serialization() -> None:
    obj = serialize_activity(activity())
    assert obj["start_time"] == "2026-07-24T10:30:00+00:00"
    assert obj["name"] == "Morning"
    assert obj["start_lat"] == 1.25
    assert serialize_sleep(sleep())["calendar_date"] == "2026-07-24"


def test_request_shape_and_admin_header() -> None:
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return httpx.Response(
            200,
            json={
                "data": {
                    "insert_activities": {
                        "returning": [{"id": "9", "garmin_activity_id": "42"}]
                    }
                }
            },
        )

    with HasuraClient(settings(), transport=httpx.MockTransport(handler)) as client:
        assert upsert_activities(client, [activity()]) == {42: 9}
    assert seen[0].headers["x-hasura-admin-secret"] == "admin"
    body = json_body(seen[0])
    assert body["variables"]["objects"][0]["garmin_activity_id"] == 42
    assert "name" in body["variables"]["objects"][0]


def test_upserts_dedupe_conflict_keys_last_wins() -> None:
    requests: list[dict[str, Any]] = []

    def handler(request: httpx.Request) -> httpx.Response:
        body = json_body(request)
        requests.append(body)
        if "UpsertActivities" in body["query"]:
            return httpx.Response(
                200,
                json={
                    "data": {
                        "insert_activities": {
                            "returning": [
                                {"id": "9", "garmin_activity_id": "42"},
                                {"id": "10", "garmin_activity_id": "43"},
                            ]
                        }
                    }
                },
            )
        return httpx.Response(200, json={"data": {"insert_sleep": {}}})

    original_activity = activity()
    latest_activity = replace(original_activity, name="Latest")
    original_sleep = sleep()
    latest_sleep = replace(original_sleep, sleep_score=99)
    with HasuraClient(settings(), transport=httpx.MockTransport(handler)) as client:
        assert upsert_activities(
            client, [original_activity, activity(43), latest_activity]
        ) == {42: 9, 43: 10}
        upsert_sleep(client, [original_sleep, latest_sleep])

    activity_objects = requests[0]["variables"]["objects"]
    assert [obj["garmin_activity_id"] for obj in activity_objects] == [42, 43]
    assert activity_objects[0]["name"] == "Latest"
    sleep_objects = requests[1]["variables"]["objects"]
    assert [obj["calendar_date"] for obj in sleep_objects] == ["2026-07-24"]
    assert sleep_objects[0]["sleep_score"] == 99


def test_graphql_error_is_not_retried() -> None:
    calls = 0

    def handler(_request: httpx.Request) -> httpx.Response:
        nonlocal calls
        calls += 1
        return httpx.Response(200, json={"errors": [{"message": "validation failed"}]})

    with (
        HasuraClient(settings(), transport=httpx.MockTransport(handler)) as client,
        pytest.raises(HasuraError, match="validation failed"),
    ):
        client.execute_graphql("query X { x }", {})
    assert calls == 1


def test_transient_5xx_is_retried() -> None:
    calls = 0

    def handler(_request: httpx.Request) -> httpx.Response:
        nonlocal calls
        calls += 1
        if calls == 1:
            return httpx.Response(503)
        return httpx.Response(200, json={"data": {"ok": True}})

    with HasuraClient(settings(), transport=httpx.MockTransport(handler)) as client:
        assert client.execute_graphql("query X { x }", {}) == {"ok": True}
    assert calls == 2
