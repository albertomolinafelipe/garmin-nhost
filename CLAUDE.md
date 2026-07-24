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

## Stream payload

`activity_streams.payload` is a JSON document. Its exact keys, units, ordering, malformed-point behavior, and downsampling budget are placeholders in this phase and will be frozen in Phase 5. Do not infer or independently extend that contract before then.

## Exercise names

Exercise `name` is required and unique case-insensitively via a unique index on `lower(name)`. Original casing is preserved for display. `categories` is a non-null text array and defaults to an empty array.
