from datetime import date, datetime, timezone

import pytest

from app.process import (
    normalize_activity,
    normalize_hrv,
    normalize_sleep,
    normalize_training_readiness,
    seed_subtype,
)


@pytest.mark.parametrize(
    ("activity_type", "expected"),
    [
        ("running", "road"),
        ("treadmill_running", "treadmill"),
        ("indoor_running", "treadmill"),
        ("trail_running", None),
        ("other", None),
        (None, None),
    ],
)
def test_seed_subtype(activity_type: str | None, expected: str | None) -> None:
    assert seed_subtype(activity_type) == expected


def test_normalize_activity_maps_exact_summary_units() -> None:
    now = datetime(2026, 7, 25, tzinfo=timezone.utc)
    dto = normalize_activity(
        {
            "activityId": 9_007_199_254_740_993,
            "activityType": {"typeKey": "running"},
            "activityName": "Morning Run",
            "startTimeLocal": "2026-07-24 06:30:00",
            "duration": 3661.5,
            "distance": 12345.6,
            "averageHR": 151,
            "maxHR": 181,
            "elevationGain": 234.5,
            "calories": 765,
            "averageSpeed": 3.371,
            "avgPower": 287.2,
        },
        start_location=(46.1234567, 7.7654321),
        synced_at=now,
    )

    assert dto.garmin_activity_id == 9_007_199_254_740_993
    assert dto.activity_type == "running"
    assert dto.start_time == datetime(2026, 7, 24, 6, 30)
    assert dto.duration_s == 3661.5
    assert dto.distance_m == 12345.6
    assert dto.avg_hr == 151
    assert dto.max_hr == 181
    assert dto.elevation_gain_m == 234.5
    assert dto.calories == 765
    assert dto.avg_speed_mps == 3.371
    assert dto.avg_power_w == 287.2
    assert dto.start_lat == 46.1234567
    assert dto.start_lng == 7.7654321
    assert dto.synced_at == now
    assert dto.name == "Morning Run"
    assert dto.subtype == "road"


def test_normalize_hrv_maps_summary_baseline_and_readings() -> None:
    now = datetime(2026, 7, 25, tzinfo=timezone.utc)
    dto = normalize_hrv(
        {
            "hrvSummary": {
                "calendarDate": "2026-07-24",
                "weeklyAvg": 104,
                "lastNightAvg": 117,
                "lastNight5MinHigh": 166,
                "baseline": {
                    "lowUpper": 100,
                    "balancedLow": 105,
                    "balancedUpper": 129,
                    "markerValue": 0.23561096,
                },
                "status": "UNBALANCED",
                "feedbackPhrase": "HRV_UNBALANCED_11",
            },
            "hrvReadings": [
                {"hrvValue": 71, "readingTimeGMT": "2026-07-23T20:09:23.0"},
                {"readingTimeGMT": "2026-07-23T20:14:23.0"},
                {"hrvValue": 75, "readingTimeGMT": "2026-07-23T20:19:23.0"},
            ],
            "sleepStartTimestampGMT": "2026-07-23T20:05:37.0",
            "sleepEndTimestampGMT": "2026-07-24T04:46:37.0",
        },
        synced_at=now,
    )

    assert dto.calendar_date == date(2026, 7, 24)
    assert dto.weekly_avg == 104
    assert dto.last_night_avg == 117
    assert dto.last_night_5min_high == 166
    assert dto.baseline_low_upper == 100
    assert dto.baseline_balanced_low == 105
    assert dto.baseline_balanced_upper == 129
    assert dto.baseline_marker_value == 0.23561096
    assert dto.status == "UNBALANCED"
    assert dto.feedback_phrase == "HRV_UNBALANCED_11"
    assert dto.start_time == datetime(2026, 7, 23, 20, 5, 37, tzinfo=timezone.utc)
    assert dto.end_time == datetime(2026, 7, 24, 4, 46, 37, tzinfo=timezone.utc)
    assert dto.readings == [
        {"t": "2026-07-23T20:09:23.0", "v": 71},
        {"t": "2026-07-23T20:19:23.0", "v": 75},
    ]
    assert dto.synced_at == now


def test_normalize_hrv_rejects_missing_calendar_date() -> None:
    with pytest.raises(ValueError):
        normalize_hrv({"hrvSummary": {}})


def test_normalize_training_readiness_keeps_each_snapshot() -> None:
    now = datetime(2026, 7, 26, tzinfo=timezone.utc)
    rows = normalize_training_readiness(
        [
            {
                "calendarDate": "2026-07-25",
                "timestamp": "2026-07-25T17:57:10.0",
                "deviceId": 3437589526,
                "level": "HIGH",
                "score": 80,
                "acuteLoad": 323,
                "acwrFactorPercent": 97,
                "validSleep": True,
                "inputContext": "AFTER_WAKEUP_RESET",
            },
            {
                "calendarDate": "2026-07-25",
                "timestamp": "2026-07-25T05:00:00.0",
                "score": 74,
                "inputContext": "UPDATE_REALTIME_VARIABLES",
            },
            {"calendarDate": "2026-07-25"},
        ],
        synced_at=now,
    )

    assert [r.timestamp for r in rows] == [
        datetime(2026, 7, 25, 17, 57, 10, tzinfo=timezone.utc),
        datetime(2026, 7, 25, 5, 0, 0, tzinfo=timezone.utc),
    ]
    first = rows[0]
    assert first.calendar_date == date(2026, 7, 25)
    assert first.device_id == 3437589526
    assert first.level == "HIGH"
    assert first.score == 80
    assert first.acute_load == 323
    assert first.acwr_factor_percent == 97
    assert first.valid_sleep is True
    assert first.input_context == "AFTER_WAKEUP_RESET"
    assert first.synced_at == now


def test_normalize_training_readiness_tolerates_none() -> None:
    assert normalize_training_readiness(None) == []


def test_normalize_sleep_maps_nested_summary_and_epoch_milliseconds() -> None:
    now = datetime(2026, 7, 25, tzinfo=timezone.utc)
    dto = normalize_sleep(
        {
            "dailySleepDTO": {
                "calendarDate": "2026-07-24",
                "sleepStartTimestampGMT": 1_753_315_200_000,
                "sleepEndTimestampGMT": 1_753_344_000_000,
                "sleepTimeSeconds": 27_000,
                "deepSleepSeconds": 4_000,
                "lightSleepSeconds": 15_000,
                "remSleepSeconds": 6_000,
                "awakeSleepSeconds": 2_000,
                "sleepScores": {"overall": {"value": 88}},
            },
            "avgOvernightHrv": 53.5,
            "restingHeartRate": 44,
        },
        synced_at=now,
    )

    assert dto.calendar_date == date(2026, 7, 24)
    assert dto.start_time == datetime.fromtimestamp(1_753_315_200, tz=timezone.utc)
    assert dto.end_time == datetime.fromtimestamp(1_753_344_000, tz=timezone.utc)
    assert dto.total_sleep_s == 27_000
    assert dto.deep_sleep_s == 4_000
    assert dto.light_sleep_s == 15_000
    assert dto.rem_sleep_s == 6_000
    assert dto.awake_s == 2_000
    assert dto.avg_hrv == 53.5
    assert dto.resting_hr == 44
    assert dto.sleep_score == 88
    assert dto.synced_at == now
