# Garmin Data Expansion Guide

This document is implementation context for agents adding Garmin wellness or training data to this repository.

## Current projects and dependencies

| Project | Garmin client | Garth |
|---|---:|---:|
| `garmin-dash/` | `garminconnect==0.2.25` | `garth==0.5.2` |
| `garmin-nhost/ondra/` | `garminconnect==0.2.30` | `garth==0.5.17` |

Both `garminconnect` versions already expose HRV, training readiness, and training status. Prefer the existing `garminconnect.Garmin` client over calling private endpoints directly.

Existing authentication wrappers:

- `garmin-dash/server/garmin/client.py`
- `garmin-nhost/ondra/app/garmin_client.py`

Reuse these wrappers and their persistent Garth token cache. Do not introduce a second login or token store.

## Immediately available metrics

```python
client = get_client(...)

hrv = client.get_hrv_data("2026-07-25")
readiness = client.get_training_readiness("2026-07-25")
status = client.get_training_status("2026-07-25")
```

### HRV

`get_hrv_data(date)` may include:

- nightly average
- highest five-minute average
- weekly average
- baseline ranges
- HRV status and feedback
- individual overnight readings

The method may return `None` when no HRV data is available.

### Training readiness

`get_training_readiness(date)` returns daily readiness snapshots. Depending on the library response and device, this can be a list rather than a single object.

Potential fields include:

- readiness score and level
- sleep score contribution
- recovery time and contribution
- acute training load and contribution
- HRV contribution and weekly average
- stress-history contribution
- sleep-history contribution
- feedback strings
- snapshot timestamp and input context

A day may contain several snapshots. The morning value normally has:

```text
inputContext = AFTER_WAKEUP_RESET
```

Do not silently assume the final snapshot is the morning score. Preserve all snapshots or explicitly select and document the desired context.

### Training status

`get_training_status(date)` may include:

- current training status and feedback
- acute and chronic training load
- acute/chronic workload ratio (ACWR)
- optimal load range
- fitness or VO2-max trends
- sport-specific status
- source device

The response is nested and may contain data for multiple devices. Inspect real account payloads before fixing a normalized schema.

## Other candidate data

The pinned Garmin client also provides methods for:

- Body Battery and Body Battery events
- stress and all-day stress
- sleep
- respiration
- SpO2
- detailed and resting heart rate
- intensity minutes
- endurance score
- hill score
- max metrics/VO2 max
- lactate threshold
- race predictions
- fitness age
- blood pressure
- weight and body composition
- hydration
- steps and floors
- menstrual and pregnancy information
- solar intensity
- activity splits, weather, gear, and exercise sets

Check the methods available in the project's pinned `garminconnect` version before designing a feature. Do not assume a method present on the upstream `master` branch exists in the pinned release.

## Recommended implementation approach

1. Decide which project is the source of truth. New hosted synchronization should normally target `garmin-nhost/ondra/`; avoid implementing the same pipeline independently in both projects unless explicitly requested.
2. Capture representative real responses for supported, unsupported, and missing-data days. Sanitize fixtures before committing them.
3. Store the raw Garmin response alongside normalized/queryable columns during initial development. Private response schemas can change.
4. Use calendar date plus Garmin identity fields as idempotency keys. For readiness snapshots, include the timestamp or input context.
5. Make historical synchronization explicitly bounded by start/end dates.
6. Treat absent data as normal. A device may not support a metric, the user may not wear it overnight, or Garmin may return `None`, an empty list, or a partial object.
7. Add fixture-driven parsing tests, idempotent re-sync tests, and tests for partial/missing payloads.
8. Keep API calls sequential or conservatively paced. Avoid broad unbounded concurrent backfills.
9. Log metric name and date on failures, but never log credentials or OAuth tokens.
10. Document schema migrations and expose data through the existing API/GraphQL conventions of the selected project.

## Suggested data model boundaries

Prefer separate domain records rather than adding every metric to activity or sleep tables:

- `daily_hrv`: one summary per user/date, optionally with raw payload
- `training_readiness`: one record per snapshot, keyed by user/date/timestamp/context
- `training_status`: one record per user/date/device or sport, depending on observed payload
- optional raw readings/events tables only when the UI needs intraday detail

Use nullable columns for device-dependent fields. Keep Garmin's numeric score/status and its textual feedback when both are available.

## Direct Garth access

Garth exposes the underlying authenticated request client:

```python
payload = client.garth.connectapi("/private-garmin-path")
```

Use this only when the pinned `garminconnect` release lacks a required wrapper. Keep endpoint paths isolated in the Garmin integration layer and add tests around response parsing.

Current upstream Garth includes typed helpers such as `DailyHRV`, `TrainingReadinessData`, and `DailyTrainingStatus`, but the versions pinned here do not provide all of those typed classes. An upgrade must be treated as a separate compatibility change and must verify authentication/token-cache behavior.

## Important caveats

Garmin Connect libraries use undocumented private Garmin web APIs. They are not a stable public consumer API.

Expect:

- endpoint and payload changes without notice
- differences by device, firmware, region, and account
- missing or delayed daily values
- several snapshots for one date
- rate limiting
- authentication changes that may require fresh tokens

Do not claim that a metric is universally available merely because a client method exists.

## Upstream references

Use commit-pinned links when reviewing behavior:

- [`python-garminconnect.get_hrv_data`](https://github.com/cyberjunky/python-garminconnect/blob/206876670d73eb9749674bfa3c3ec67bfa3b77b4/garminconnect/__init__.py#L1722-L1728)
- [`python-garminconnect.get_training_readiness`](https://github.com/cyberjunky/python-garminconnect/blob/206876670d73eb9749674bfa3c3ec67bfa3b77b4/garminconnect/__init__.py#L1730-L1736)
- [`python-garminconnect.get_training_status`](https://github.com/cyberjunky/python-garminconnect/blob/206876670d73eb9749674bfa3c3ec67bfa3b77b4/garminconnect/__init__.py#L1895-L1902)
- [`Garth TrainingReadinessData`](https://github.com/matin/garth/blob/f99159a15c4c9463ce215a60ba9f7cb21f94a3b7/src/garth/data/training_readiness.py#L14-L60)
- [`Garth DailyHRV`](https://github.com/matin/garth/blob/f99159a15c4c9463ce215a60ba9f7cb21f94a3b7/src/garth/stats/hrv.py#L20-L69)
- [`Garth DailyTrainingStatus`](https://github.com/matin/garth/blob/f99159a15c4c9463ce215a60ba9f7cb21f94a3b7/src/garth/stats/training_status/daily.py#L10-L37)

Before implementation, re-check upstream releases and compare them with the versions pinned in the target project's `requirements.txt`.
