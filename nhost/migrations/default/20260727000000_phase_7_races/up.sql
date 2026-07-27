CREATE TABLE public.races (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date date NOT NULL,
  name text NOT NULL,
  distance_m numeric NULL,
  elevation_gain_m numeric NULL
);
