"""Pure normalization of Garmin summary responses into database-ready DTOs."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timezone
from typing import Any


def seed_subtype(activity_type: str | None) -> str | None:
    """Seed only unambiguous running subtypes; ported from garmin-dash."""
    at = (activity_type or "").lower()
    if at == "running":
        return "road"
    if "running" in at and ("treadmill" in at or "indoor" in at):
        return "treadmill"
    return None


@dataclass(frozen=True)
class ActivityDTO:
    garmin_activity_id: int
    activity_type: str | None
    start_time: datetime | None
    duration_s: float | None
    distance_m: float | None
    avg_hr: int | None
    max_hr: int | None
    elevation_gain_m: float | None
    calories: int | None
    avg_speed_mps: float | None
    avg_power_w: float | None
    start_lat: float | None
    start_lng: float | None
    synced_at: datetime
    name: str | None
    subtype: str | None


@dataclass(frozen=True)
class SleepDTO:
    calendar_date: date
    start_time: datetime | None
    end_time: datetime | None
    total_sleep_s: int | None
    deep_sleep_s: int | None
    light_sleep_s: int | None
    rem_sleep_s: int | None
    awake_s: int | None
    avg_hrv: float | None
    resting_hr: int | None
    sleep_score: int | None
    synced_at: datetime


@dataclass(frozen=True)
class HrvDTO:
    calendar_date: date
    weekly_avg: int | None
    last_night_avg: int | None
    last_night_5min_high: int | None
    baseline_low_upper: int | None
    baseline_balanced_low: int | None
    baseline_balanced_upper: int | None
    baseline_marker_value: float | None
    status: str | None
    feedback_phrase: str | None
    start_time: datetime | None
    end_time: datetime | None
    readings: list[dict[str, Any]]
    synced_at: datetime


@dataclass(frozen=True)
class TrainingReadinessDTO:
    calendar_date: date
    timestamp: datetime
    device_id: int | None
    level: str | None
    feedback_long: str | None
    feedback_short: str | None
    score: int | None
    sleep_score: int | None
    sleep_score_factor_percent: int | None
    sleep_score_factor_feedback: str | None
    recovery_time: int | None
    recovery_time_factor_percent: int | None
    recovery_time_factor_feedback: str | None
    acwr_factor_percent: int | None
    acwr_factor_feedback: str | None
    acute_load: int | None
    stress_history_factor_percent: int | None
    stress_history_factor_feedback: str | None
    hrv_factor_percent: int | None
    hrv_factor_feedback: str | None
    hrv_weekly_average: int | None
    sleep_history_factor_percent: int | None
    sleep_history_factor_feedback: str | None
    valid_sleep: bool | None
    input_context: str | None
    recovery_time_change_phrase: str | None
    synced_at: datetime


def normalize_training_readiness(
    response: Any, *, synced_at: datetime | None = None
) -> list[TrainingReadinessDTO]:
    """Map a Garmin get_training_readiness response to per-snapshot rows.

    The endpoint returns a list of same-day snapshots (distinct inputContext);
    each keeps its own timestamp. Snapshots without a calendar date or
    timestamp cannot be keyed and are skipped.
    """
    stamp = synced_at or datetime.now(timezone.utc)
    snapshots = response if isinstance(response, list) else [response]
    rows: list[TrainingReadinessDTO] = []
    for snapshot in snapshots:
        if not isinstance(snapshot, dict):
            continue
        try:
            calendar_date = date.fromisoformat(str(snapshot.get("calendarDate")))
        except (TypeError, ValueError):
            continue
        timestamp = _utc(_parse_dt(snapshot.get("timestamp")))
        if timestamp is None:
            continue
        rows.append(
            TrainingReadinessDTO(
                calendar_date=calendar_date,
                timestamp=timestamp,
                device_id=_int(snapshot.get("deviceId")),
                level=_string(snapshot.get("level")),
                feedback_long=_string(snapshot.get("feedbackLong")),
                feedback_short=_string(snapshot.get("feedbackShort")),
                score=_int(snapshot.get("score")),
                sleep_score=_int(snapshot.get("sleepScore")),
                sleep_score_factor_percent=_int(
                    snapshot.get("sleepScoreFactorPercent")
                ),
                sleep_score_factor_feedback=_string(
                    snapshot.get("sleepScoreFactorFeedback")
                ),
                recovery_time=_int(snapshot.get("recoveryTime")),
                recovery_time_factor_percent=_int(
                    snapshot.get("recoveryTimeFactorPercent")
                ),
                recovery_time_factor_feedback=_string(
                    snapshot.get("recoveryTimeFactorFeedback")
                ),
                acwr_factor_percent=_int(snapshot.get("acwrFactorPercent")),
                acwr_factor_feedback=_string(snapshot.get("acwrFactorFeedback")),
                acute_load=_int(snapshot.get("acuteLoad")),
                stress_history_factor_percent=_int(
                    snapshot.get("stressHistoryFactorPercent")
                ),
                stress_history_factor_feedback=_string(
                    snapshot.get("stressHistoryFactorFeedback")
                ),
                hrv_factor_percent=_int(snapshot.get("hrvFactorPercent")),
                hrv_factor_feedback=_string(snapshot.get("hrvFactorFeedback")),
                hrv_weekly_average=_int(snapshot.get("hrvWeeklyAverage")),
                sleep_history_factor_percent=_int(
                    snapshot.get("sleepHistoryFactorPercent")
                ),
                sleep_history_factor_feedback=_string(
                    snapshot.get("sleepHistoryFactorFeedback")
                ),
                valid_sleep=_bool(snapshot.get("validSleep")),
                input_context=_string(snapshot.get("inputContext")),
                recovery_time_change_phrase=_string(
                    snapshot.get("recoveryTimeChangePhrase")
                ),
                synced_at=stamp,
            )
        )
    return rows


def normalize_hrv(
    response: dict[str, Any], *, synced_at: datetime | None = None
) -> HrvDTO:
    """Map a Garmin get_hrv_data response to the daily HRV summary family."""
    summary_value = response.get("hrvSummary")
    summary = summary_value if isinstance(summary_value, dict) else {}
    baseline_value = summary.get("baseline")
    baseline = baseline_value if isinstance(baseline_value, dict) else {}
    try:
        calendar_date = date.fromisoformat(str(summary.get("calendarDate")))
    except (TypeError, ValueError) as exc:
        raise ValueError("hrvSummary.calendarDate must be an ISO date") from exc
    readings_value = response.get("hrvReadings")
    readings = [
        {"t": t, "v": v}
        for reading in (readings_value if isinstance(readings_value, list) else [])
        if isinstance(reading, dict)
        and (t := _string(reading.get("readingTimeGMT"))) is not None
        and (v := _int(reading.get("hrvValue"))) is not None
    ]
    return HrvDTO(
        calendar_date=calendar_date,
        weekly_avg=_int(summary.get("weeklyAvg")),
        last_night_avg=_int(summary.get("lastNightAvg")),
        last_night_5min_high=_int(summary.get("lastNight5MinHigh")),
        baseline_low_upper=_int(baseline.get("lowUpper")),
        baseline_balanced_low=_int(baseline.get("balancedLow")),
        baseline_balanced_upper=_int(baseline.get("balancedUpper")),
        baseline_marker_value=_float(baseline.get("markerValue")),
        status=_string(summary.get("status")),
        feedback_phrase=_string(summary.get("feedbackPhrase")),
        start_time=_utc(_parse_dt(response.get("sleepStartTimestampGMT"))),
        end_time=_utc(_parse_dt(response.get("sleepEndTimestampGMT"))),
        readings=readings,
        synced_at=synced_at or datetime.now(timezone.utc),
    )


def normalize_activity(
    summary: dict[str, Any],
    *,
    start_location: tuple[float, float] | None = None,
    synced_at: datetime | None = None,
) -> ActivityDTO:
    """Map Garmin activity-summary keys without changing Garmin's metric units."""
    activity_type_value = summary.get("activityType")
    activity_type = (
        activity_type_value.get("typeKey")
        if isinstance(activity_type_value, dict)
        else None
    )
    location = start_location
    try:
        garmin_activity_id = int(summary["activityId"])
    except (KeyError, TypeError, ValueError, OverflowError) as exc:
        raise ValueError("activityId must be an integer") from exc
    return ActivityDTO(
        garmin_activity_id=garmin_activity_id,
        activity_type=_string(activity_type),
        start_time=_parse_dt(summary.get("startTimeLocal")),
        duration_s=_float(summary.get("duration")),
        distance_m=_float(summary.get("distance")),
        avg_hr=_int(summary.get("averageHR")),
        max_hr=_int(summary.get("maxHR")),
        elevation_gain_m=_float(summary.get("elevationGain")),
        calories=_int(summary.get("calories")),
        avg_speed_mps=_float(summary.get("averageSpeed")),
        avg_power_w=_float(summary.get("avgPower")),
        start_lat=location[0] if location else None,
        start_lng=location[1] if location else None,
        synced_at=synced_at or datetime.now(timezone.utc),
        name=_string(summary.get("activityName")),
        subtype=seed_subtype(_string(activity_type)),
    )


def normalize_sleep(
    summary: dict[str, Any], *, synced_at: datetime | None = None
) -> SleepDTO:
    """Map a Garmin get_sleep_data response to the complete sleep synced family."""
    dto_value = summary.get("dailySleepDTO")
    dto = dto_value if isinstance(dto_value, dict) else {}
    scores_value = dto.get("sleepScores")
    scores = scores_value if isinstance(scores_value, dict) else {}
    overall_value = scores.get("overall")
    overall = overall_value if isinstance(overall_value, dict) else {}
    try:
        calendar_date = date.fromisoformat(str(dto.get("calendarDate")))
    except (TypeError, ValueError) as exc:
        raise ValueError("dailySleepDTO.calendarDate must be an ISO date") from exc
    return SleepDTO(
        calendar_date=calendar_date,
        start_time=_epoch_ms(dto.get("sleepStartTimestampGMT")),
        end_time=_epoch_ms(dto.get("sleepEndTimestampGMT")),
        total_sleep_s=_int(dto.get("sleepTimeSeconds")),
        deep_sleep_s=_int(dto.get("deepSleepSeconds")),
        light_sleep_s=_int(dto.get("lightSleepSeconds")),
        rem_sleep_s=_int(dto.get("remSleepSeconds")),
        awake_s=_int(dto.get("awakeSleepSeconds")),
        avg_hrv=_float(summary.get("avgOvernightHrv")),
        resting_hr=_int(summary.get("restingHeartRate")),
        sleep_score=_int(overall.get("value")),
        synced_at=synced_at or datetime.now(timezone.utc),
    )


def _utc(value: datetime | None) -> datetime | None:
    return value.replace(tzinfo=timezone.utc) if value is not None else None


def _parse_dt(value: object) -> datetime | None:
    if isinstance(value, datetime):
        return value
    if not value:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S.%f", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(str(value), fmt)
        except (ValueError, TypeError):
            continue
    return None


def _epoch_ms(value: object) -> datetime | None:
    try:
        return datetime.fromtimestamp(int(str(value)) / 1000, tz=timezone.utc)
    except (ValueError, TypeError, OverflowError, OSError):
        return None


def _string(value: object) -> str | None:
    return str(value) if value is not None else None


def _bool(value: object) -> bool | None:
    return value if isinstance(value, bool) else None


def _float(value: object) -> float | None:
    try:
        return float(str(value))
    except (ValueError, TypeError):
        return None


def _int(value: object) -> int | None:
    try:
        return int(float(str(value)))
    except (ValueError, TypeError, OverflowError):
        return None
