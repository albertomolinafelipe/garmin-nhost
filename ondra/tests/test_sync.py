from __future__ import annotations

from datetime import timezone
from pathlib import Path
from typing import Any

import pytest

from app.hasura import WriterResult
from app.sync import _pull_activities, _pull_sleep, sync


class FakeGarmin:
    def __init__(self) -> None:
        self.activity_calls: list[tuple[int, int]] = []
        self.downloaded: list[str] = []

    def get_activities(self, start: int, limit: int) -> list[dict[str, Any]]:
        self.activity_calls.append((start, limit))
        summaries = [
            {
                "activityId": index,
                "activityName": f"Run {index}",
                "activityType": {"typeKey": "running"},
                "startTimeLocal": "2026-07-24 08:00:00",
            }
            for index in range(1, 6)
        ]
        return summaries[start : start + limit]

    def download_activity(self, activity_id: str, *, dl_fmt: object) -> bytes:
        self.downloaded.append(activity_id)
        if activity_id == "2":
            raise RuntimeError("download failed")
        return f"fit-{activity_id}".encode()

    def get_sleep_data(self, cdate: str) -> dict[str, Any]:
        self.sleep_days = [*getattr(self, "sleep_days", []), cdate]
        if len(self.sleep_days) == 2:
            raise RuntimeError("sleep API failed")
        sleep_seconds = 0 if len(self.sleep_days) == 3 else 100
        return {
            "dailySleepDTO": {
                "calendarDate": cdate,
                "sleepTimeSeconds": sleep_seconds,
            }
        }

    def get_hrv_data(self, cdate: str) -> dict[str, Any] | None:
        return {"hrvSummary": {"calendarDate": cdate, "lastNightAvg": 100}}

    def get_training_readiness(self, cdate: str) -> list[dict[str, Any]]:
        return [
            {
                "calendarDate": cdate,
                "timestamp": f"{cdate}T06:00:00.0",
                "score": 80,
                "inputContext": "AFTER_WAKEUP_RESET",
            }
        ]


def test_pull_is_bounded_tolerant_and_never_writes_fit(
    monkeypatch: pytest.MonkeyPatch, tmp_path: Path
) -> None:
    client = FakeGarmin()
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(
        "app.sync.parse_streams", lambda data: {"hr": [], "track": [], "elevation": []}
    )
    monkeypatch.setattr("app.sync.start_location", lambda data: (1.5, 2.5))

    activities, errors, failed = _pull_activities(client, 3, batch_size=2)

    assert client.activity_calls == [(0, 2), (2, 1)]
    assert client.downloaded == ["1", "2", "3"]
    assert [dto.garmin_activity_id for dto, _ in activities] == [1, 3]
    assert activities[0][0].start_lat == 1.5
    assert failed == 1
    assert "download failed" in errors[0]
    assert list(tmp_path.iterdir()) == []


def test_pagination_stops_at_end_of_history(monkeypatch: pytest.MonkeyPatch) -> None:
    client = FakeGarmin()
    monkeypatch.setattr(
        "app.sync.parse_streams", lambda data: {"hr": [], "track": [], "elevation": []}
    )
    monkeypatch.setattr("app.sync.start_location", lambda data: None)

    activities, _, _ = _pull_activities(client, 10, batch_size=2)

    assert len(activities) == 4  # activity 2 fails, history contains five
    # The short page at offset 4 proves the five-item history is exhausted.
    assert client.activity_calls[-1] == (4, 2)


def test_sleep_skips_empty_night_and_tolerates_failure() -> None:
    client = FakeGarmin()
    sleeps, errors = _pull_sleep(client, 3)

    assert len(sleeps) == 1
    assert sleeps[0].synced_at.tzinfo == timezone.utc
    assert len(errors) == 1


def test_sync_calls_writer_with_normalized_values(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    client = FakeGarmin()
    captured: dict[str, object] = {}

    class FakeHasura:
        def __init__(self, settings: object) -> None:
            pass

        def __enter__(self) -> "FakeHasura":
            return self

        def __exit__(self, *args: object) -> None:
            pass

    def writer(
        client: object,
        activities: object,
        sleeps: object,
        hrvs: object = (),
        readiness: object = (),
    ) -> WriterResult:
        captured.update(
            activities=activities, sleeps=sleeps, hrvs=hrvs, readiness=readiness
        )
        return WriterResult(activities_created=2, streams_written=2)

    monkeypatch.setattr("app.sync.get_client", lambda settings: client)
    monkeypatch.setattr("app.sync.HasuraClient", FakeHasura)
    monkeypatch.setattr("app.sync.write_sync_data", writer)
    monkeypatch.setattr(
        "app.sync.parse_streams", lambda data: {"hr": [], "track": [], "elevation": []}
    )
    monkeypatch.setattr("app.sync.start_location", lambda data: None)

    result = sync(object(), days=1, max_activities=3)  # type: ignore[arg-type]

    assert result.activities_created == 2
    assert result.activities_failed == 1
    assert len(captured["activities"]) == 2  # type: ignore[arg-type]
