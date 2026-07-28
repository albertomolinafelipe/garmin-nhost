-- Mark a prescribed workout as done from the calendar. NULL = not done;
-- a timestamp records completion time so plan adherence can be measured later.
ALTER TABLE public.plan_workouts
  ADD COLUMN completed_at timestamptz NULL;
