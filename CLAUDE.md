# Garmin Nhost contracts

These contracts are frozen unless a later phase explicitly changes them.

## Activity column families

The allowlists are authoritative:

- **SYNCED** (refreshed from Garmin on every sync): `garmin_activity_id`, `activity_type`, `start_time`, `duration_s`, `distance_m`, `avg_hr`, `max_hr`, `elevation_gain_m`, `calories`, `avg_speed_mps`, `avg_power_w`, `start_lat`, `start_lng`, `synced_at`.
- **SEEDED-ONCE** (set only on insert, then user-editable): `name`, `subtype`.
- **ANNOTATION** (user-owned): `feeling`, `effort`, `food_during`, `food_after`, `caffeine`, `weather`, `notes`, `focus`, `hard_tries`, `strength_exercises`.

Activity, sleep, stream, and exercise primary keys are PostgreSQL `bigint GENERATED ALWAYS AS IDENTITY`. `garmin_activity_id` is also `bigint`.

There are two independent admin writers. **ondra** inserts SYNCED fields and initial seeds, and on conflict updates only the SYNCED allowlist. The **dashboard** writes only SEEDED-ONCE and ANNOTATION fields through document-level allowlists. There is intentionally no database-level column-family guard: both writers hold admin access, so these application mutation contracts are the protection against clobbering user data.

Do not add legacy `fit_path` or `annotated` columns.

## Authentication and authorization

Hasura admin-secret access is the only authorization model. There are no Nhost Auth users, ownership columns, unauthenticated roles, or non-admin table permissions in tracked metadata. The local CLI may inject `HASURA_GRAPHQL_UNAUTHORIZED_ROLE=public` into its generated development compose environment; that is not a tracked application role, and metadata must never grant it permissions.

## Activity taxonomy

The canonical presentation taxonomy is `dashboard/src/activityTypes.ts` when ported from the read-only reference `garmin-dash/web/src/activityTypes.ts`: climbing subtype is one of `boulder`, `route`, `board`, or `mix`, and climbing requires `focus`. The database deliberately keeps `subtype` as unconstrained free text so presentation taxonomy changes do not require a migration.

## ondra sync remote schema

The frozen mutation is `syncActivities(days: Int = 7, maxActivities: Int = 20): SyncResult!`. `days` is limited to 1..31 and `maxActivities` to 1..100, inclusive. Omitted arguments use the defaults; zero, negative, and above-limit values produce a GraphQL error without starting work. Calls are deliberately small bounded units so a future dashboard can loop them without exceeding Hasura's remote-schema timeout.

The frozen `SyncResult` fields are `activities_created`, `activities_updated`, `sleep_created`, `sleep_updated`, `hrv_created`, `hrv_updated`, `readiness_created`, `readiness_updated`, `streams_written`, `activities_failed`, and `errors: [String!]!`. Do not restore the legacy `fits_downloaded` or `fits_missing` fields: FIT bytes are discarded in this architecture. Partial ingestion failures in later phases return a successful result with `activities_failed` and `errors` populated rather than failing the whole GraphQL operation.

Hasura forwards `X-Ondra-Secret` from `ONDRA_REMOTE_SCHEMA_SECRET`, and ondra rejects `/graphql` before resolver execution unless it matches. This dedicated shared secret must be distinct from `ONDRA_HASURA_GRAPHQL_ADMIN_SECRET`: the former authenticates Hasura to ondra, while the latter is used only for ondra's future write-backs to Hasura. Never log either value.

## Stream payload

`activity_streams.payload` is exactly `{ "hr": [{"t": <int>, "v": <int>}], "track": [{"lat": <float>, "lng": <float>}], "elevation": [{"t": <int>, "v": <int>}] }`; all three keys are always present and arrays are empty when their FIT channel is unavailable. `t` is whole elapsed seconds from the first timestamped FIT record, HR `v` is integer beats per minute, elevation `v` is rounded integer metres, and track coordinates are semicircles converted to degrees and rounded to 6 decimal places. Points remain in FIT-record/time order. Records missing a timestamp or requested value are omitted from that time series; a GPS point requires both finite coordinates; non-numeric and non-finite values are omitted. Elevation prefers `enhanced_altitude` per record and falls back to `altitude`.

HR and elevation are independently bucket-averaged to at most 400 points each, preserving their own first and last samples and using each bucket's middle timestamp. Track is independently thinned at uniform indexes to at most 800 points, preserving its first and last fix. The channels are intentionally not index-aligned; consumers must use each time series' own timestamps. Input is raw bytes only: Garmin ORIGINAL ZIP downloads are unwrapped in memory (preferring a `.fit` member, otherwise the first file), while bare FIT bytes are accepted. Malformed, empty, or unreadable input logs a warning and yields empty arrays/`None` start location; FIT processing performs no filesystem I/O.

## Daily HRV

`syncActivities` also looks back at most `days` (1..31) HRV days alongside sleep. Each day maps a Garmin `get_hrv_data` response to one `daily_hrv` row keyed by unique `calendar_date`. Normalized summary columns are `weekly_avg`, `last_night_avg`, `last_night_5min_high`, `baseline_low_upper`, `baseline_balanced_low`, `baseline_balanced_upper`, `baseline_marker_value`, `status`, `feedback_phrase`, `start_time`, `end_time`, and `synced_at`; overnight intraday detail is kept in `readings jsonb` as `[{"t": <ISO GMT timestamp>, "v": <int hrvValue>}]`. `start_time`/`end_time` are the sleep window (`sleepStart/EndTimestampGMT`) and are stored as UTC. Days with no HRV (`None` response or missing `hrvSummary.calendarDate`) are skipped, not errors. HRV is a single-writer SYNCED family; there are no HRV annotation columns.

## Training readiness

`syncActivities` also looks back at most `days` (1..31) training-readiness days. Garmin's `get_training_readiness` returns a list of same-day snapshots with distinct `inputContext` values (e.g. `AFTER_WAKEUP_RESET`, `AFTER_POST_EXERCISE_RESET`, `UPDATE_REALTIME_VARIABLES`); every snapshot is preserved as its own `training_readiness` row keyed by unique `(calendar_date, timestamp)`. `timestamp` is the snapshot's GMT `timestamp` stored as UTC. Normalized columns are `device_id`, `level`, `feedback_long`, `feedback_short`, `score`, `sleep_score`, `sleep_score_factor_percent`, `sleep_score_factor_feedback`, `recovery_time`, `recovery_time_factor_percent`, `recovery_time_factor_feedback`, `acwr_factor_percent`, `acwr_factor_feedback`, `acute_load`, `stress_history_factor_percent`, `stress_history_factor_feedback`, `hrv_factor_percent`, `hrv_factor_feedback`, `hrv_weekly_average`, `sleep_history_factor_percent`, `sleep_history_factor_feedback`, `valid_sleep`, `input_context`, `recovery_time_change_phrase`, and `synced_at`. Snapshots missing a calendar date or timestamp are skipped, not errors. Training readiness is a single-writer SYNCED family with no annotation columns.

## Garmin synchronization

`syncActivities` is a synchronous, bounded manual unit: it paginates at most the requested activities, downloads each ORIGINAL FIT into memory, parses streams and the start location, writes through the column-family-safe Hasura writer, and discards the bytes. It also looks back at most 31 sleep days. A full backfill is the dashboard repeatedly invoking bounded calls; ondra does not stream progress and has no scheduler.

Only garth authentication tokens persist, under `/data/garth` on the ondra volume (directory mode 0700). Production keeps `replicas = 1`; an in-process non-blocking lock rejects overlapping syncs with a clear GraphQL error. This lock is intentionally sufficient only while the single-replica invariant holds. Missing/expired cache tokens trigger credential login (and may require Garmin MFA), then replacement tokens are persisted.

## Exercise names

Exercise `name` is required and unique case-insensitively via a unique index on `lower(name)`. Original casing is preserved for display. `categories` is a non-null text array and defaults to an empty array.
