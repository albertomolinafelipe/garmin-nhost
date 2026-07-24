CREATE VIEW public.food_options AS
SELECT DISTINCT value
FROM (
  SELECT unnest(food_during) AS value FROM public.activities
  UNION ALL
  SELECT unnest(food_after) AS value FROM public.activities
) AS foods
WHERE value IS NOT NULL AND btrim(value) <> ''
ORDER BY value;
