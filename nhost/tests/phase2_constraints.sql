-- Run after migrations against a disposable database. All fixtures are rolled back.
BEGIN;

INSERT INTO public.activities (garmin_activity_id, feeling, effort, caffeine)
VALUES (9000000000001, NULL, NULL, NULL);

DO $$
BEGIN
  BEGIN
    INSERT INTO public.activities (garmin_activity_id, feeling) VALUES (9000000000002, 0);
    RAISE EXCEPTION 'feeling below range was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;

  BEGIN
    INSERT INTO public.activities (garmin_activity_id, effort) VALUES (9000000000003, 6);
    RAISE EXCEPTION 'effort above range was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;

  BEGIN
    INSERT INTO public.activities (garmin_activity_id, caffeine) VALUES (9000000000004, 'sometimes');
    RAISE EXCEPTION 'invalid caffeine was accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
END
$$;

INSERT INTO public.exercises (name) VALUES ('Pull Up');
DO $$
BEGIN
  BEGIN
    INSERT INTO public.exercises (name) VALUES ('pull up');
    RAISE EXCEPTION 'case-insensitive duplicate exercise name was accepted';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
END
$$;

INSERT INTO public.activity_streams (activity_id, payload)
SELECT id, '{}'::jsonb FROM public.activities WHERE garmin_activity_id = 9000000000001;

DO $$
BEGIN
  BEGIN
    INSERT INTO public.activity_streams (activity_id, payload)
    SELECT id, '{}'::jsonb FROM public.activities WHERE garmin_activity_id = 9000000000001;
    RAISE EXCEPTION 'second stream for one activity was accepted';
  EXCEPTION WHEN unique_violation THEN NULL;
  END;
END
$$;

ROLLBACK;
