CREATE TABLE public.activities (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- SYNCED: refreshed on every Garmin sync.
  garmin_activity_id bigint NOT NULL UNIQUE,
  activity_type text NULL,
  start_time timestamptz NULL,
  duration_s double precision NULL,
  distance_m double precision NULL,
  avg_hr integer NULL,
  max_hr integer NULL,
  elevation_gain_m double precision NULL,
  calories integer NULL,
  avg_speed_mps double precision NULL,
  avg_power_w double precision NULL,
  start_lat double precision NULL,
  start_lng double precision NULL,
  synced_at timestamptz NULL,

  -- SEEDED-ONCE: seeded on insert, then user-editable.
  name text NULL,
  subtype text NULL,

  -- ANNOTATION: user-owned.
  feeling integer NULL,
  effort integer NULL,
  food_during text[] NULL,
  food_after text[] NULL,
  caffeine text NULL,
  weather text NULL,
  notes text NULL,
  focus text NULL,
  hard_tries integer NULL,
  strength_exercises jsonb NULL,

  CONSTRAINT activities_feeling_range CHECK (feeling IS NULL OR feeling BETWEEN 1 AND 5),
  CONSTRAINT activities_effort_range CHECK (effort IS NULL OR effort BETWEEN 1 AND 5),
  CONSTRAINT activities_caffeine_value CHECK (
    caffeine IS NULL OR caffeine IN ('yes', 'no', 'residual')
  )
);

CREATE TABLE public.sleep (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  calendar_date date NOT NULL UNIQUE,
  start_time timestamptz NULL,
  end_time timestamptz NULL,
  total_sleep_s integer NULL,
  deep_sleep_s integer NULL,
  light_sleep_s integer NULL,
  rem_sleep_s integer NULL,
  awake_s integer NULL,
  avg_hrv double precision NULL,
  resting_hr integer NULL,
  sleep_score integer NULL,
  synced_at timestamptz NULL
);

CREATE TABLE public.activity_streams (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  activity_id bigint NOT NULL UNIQUE
    REFERENCES public.activities(id) ON DELETE CASCADE,
  payload jsonb NOT NULL
);

CREATE TABLE public.exercises (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  categories text[] NOT NULL DEFAULT ARRAY[]::text[]
);

CREATE UNIQUE INDEX exercises_name_lower_key
  ON public.exercises (lower(name));
