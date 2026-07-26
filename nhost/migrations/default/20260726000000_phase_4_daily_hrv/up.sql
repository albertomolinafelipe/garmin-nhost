CREATE TABLE public.daily_hrv (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  calendar_date date NOT NULL UNIQUE,
  weekly_avg integer NULL,
  last_night_avg integer NULL,
  last_night_5min_high integer NULL,
  baseline_low_upper integer NULL,
  baseline_balanced_low integer NULL,
  baseline_balanced_upper integer NULL,
  baseline_marker_value double precision NULL,
  status text NULL,
  feedback_phrase text NULL,
  start_time timestamptz NULL,
  end_time timestamptz NULL,
  readings jsonb NULL,
  synced_at timestamptz NULL
);
