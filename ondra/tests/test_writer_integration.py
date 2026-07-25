"""Live clobber-protection gate; skipped unless throwaway Hasura credentials exist."""

from dataclasses import replace
from datetime import date, datetime, timezone
import os
import uuid

import pytest

from app.hasura import (
    HasuraClient,
    upsert_activity_streams,
    upsert_activities,
    upsert_sleep,
)
from app.main import Settings
from app.process import ActivityDTO, SleepDTO


@pytest.mark.integration
def test_resync_preserves_user_columns_and_is_idempotent() -> None:
    url = os.getenv("HASURA_GRAPHQL_URL")
    secret = os.getenv("HASURA_GRAPHQL_ADMIN_SECRET")
    if not url or not secret:
        pytest.skip("live Hasura credentials not configured")
    marker = uuid.uuid4().int % 1_000_000_000
    gid = 8_000_000_000_000 + marker
    day = date(2098, 1, 1) + __import__("datetime").timedelta(days=marker % 300)
    now = datetime.now(timezone.utc)
    original = ActivityDTO(
        gid,
        "running",
        now,
        10,
        20,
        100,
        120,
        3,
        40,
        2,
        200,
        1.1,
        2.2,
        now,
        "seed",
        "road",
    )
    sleeper = SleepDTO(day, now, now, 1, 2, 3, 4, 5, 6, 7, 8, now)
    settings = Settings("unused", url, secret)
    annotations = {
        "name": "edited",
        "subtype": "mix",
        "feeling": 4,
        "effort": 5,
        "food_during": ["gel"],
        "food_after": ["rice"],
        "caffeine": "yes",
        "weather": "sun",
        "notes": "keep",
        "focus": "power",
        "hard_tries": 3,
        "strength_exercises": [{"name": "squat", "reps": 5}],
    }
    with HasuraClient(settings) as client:
        try:
            row_id = upsert_activities(client, [original])[gid]
            upsert_activity_streams(
                client, row_id, {"hr": [], "track": [], "elevation": []}
            )
            upsert_sleep(client, [sleeper])
            client.execute_graphql(
                """
              mutation Annotate($id: bigint!, $changes: activities_set_input!) {
                update_activities_by_pk(pk_columns: {id: $id}, _set: $changes) { id }
              }
            """,
                {"id": row_id, "changes": annotations},
            )
            changed = replace(
                original,
                duration_s=99,
                start_lat=9.9,
                start_lng=8.8,
                synced_at=now.replace(microsecond=123456),
                name="clobber",
                subtype=None,
            )
            assert upsert_activities(client, [changed, changed]) == {gid: row_id}
            payload = {"hr": [{"t": 0, "v": 111}], "track": [], "elevation": []}
            upsert_activity_streams(client, row_id, payload)
            data = client.execute_graphql(
                """
              query Verify($id: bigint!) {
                activities_by_pk(id: $id) { duration_s start_lat start_lng synced_at name subtype
                  feeling effort food_during food_after caffeine weather notes focus hard_tries
                  strength_exercises activity_streams { payload } }
              }
            """,
                {"id": row_id},
            )["activities_by_pk"]
            assert float(data["duration_s"]) == 99
            assert float(data["start_lat"]) == 9.9
            assert float(data["start_lng"]) == 8.8
            assert data["activity_streams"][0]["payload"] == payload
            for key, value in annotations.items():
                assert data[key] == value
            counts = client.execute_graphql(
                """
              query Counts($gid: bigint!, $day: date!) {
                activities_aggregate(where: {garmin_activity_id: {_eq: $gid}}) { aggregate { count } }
                sleep_aggregate(where: {calendar_date: {_eq: $day}}) { aggregate { count } }
              }
            """,
                {"gid": gid, "day": day.isoformat()},
            )
            assert counts["activities_aggregate"]["aggregate"]["count"] == 1
            assert counts["sleep_aggregate"]["aggregate"]["count"] == 1
        finally:
            client.execute_graphql(
                """
              mutation Cleanup($gid: bigint!, $day: date!) {
                delete_activities(where: {garmin_activity_id: {_eq: $gid}}) { affected_rows }
                delete_sleep(where: {calendar_date: {_eq: $day}}) { affected_rows }
              }
            """,
                {"gid": gid, "day": day.isoformat()},
            )
