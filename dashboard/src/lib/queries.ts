import { useMemo } from "react";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { graphQLClient } from "@/graphql/client";
import {
	useActivityDetailQuery,
	useCalendarActivitiesQuery,
	useRacesQuery,
} from "@/graphql/hooks";
import { dayKey } from "@/lib/format";

export interface CalendarActivity {
	id: string;
	name: string | null;
	activity_type: string | null;
	subtype: string | null;
	start_time: string | null;
	// Numeric columns may arrive as number or string (Hasura numeric); coerce at use.
	duration_s: number | string | null;
	distance_m: number | string | null;
	elevation_gain_m: number | string | null;
	feeling: number | null;
	effort: number | null;
	caffeine: string | null;
	focus: string | null;
}

export function useActivities(): UseQueryResult<
	{ activities: CalendarActivity[] },
	Error
> {
	return useCalendarActivitiesQuery() as unknown as UseQueryResult<
		{ activities: CalendarActivity[] },
		Error
	>;
}

export const num = (v: number | string | null | undefined): number =>
	v == null ? 0 : Number(v);

export interface RaceRef {
	id: unknown;
	name: string;
}

// Races indexed by their local YYYY-MM-DD date, so an activity can be matched
// to the race held on its day (activity.start_time -> dayKey).
export function useRacesByDay(): Map<string, RaceRef[]> {
	const { data } = useRacesQuery();
	return useMemo(() => {
		const map = new Map<string, RaceRef[]>();
		for (const r of data ?? []) {
			const key = String(r.date);
			const list = map.get(key) ?? [];
			list.push({ id: r.id, name: r.name });
			map.set(key, list);
		}
		return map;
	}, [data]);
}

// The race held on an activity's day, if any (first when multiple exist).
export function raceForStartTime(
	racesByDay: Map<string, RaceRef[]>,
	startTime: string | null,
): RaceRef | null {
	if (!startTime) return null;
	return racesByDay.get(dayKey(new Date(startTime)))?.[0] ?? null;
}

export interface SleepNight {
	calendar_date: string;
	total_sleep_s: number | string | null;
	deep_sleep_s: number | string | null;
	light_sleep_s: number | string | null;
	rem_sleep_s: number | string | null;
	awake_s: number | string | null;
	sleep_score: number | string | null;
	resting_hr: number | string | null;
	avg_hrv: number | string | null;
}

const SLEEP_NIGHTS = /* GraphQL */ `
	query SleepNights($limit: Int = 14) {
		sleep(order_by: { calendar_date: desc }, limit: $limit) {
			calendar_date
			total_sleep_s
			deep_sleep_s
			light_sleep_s
			rem_sleep_s
			awake_s
			sleep_score
			resting_hr
			avg_hrv
		}
	}
`;

export function useSleep(limit = 14) {
	return useQuery({
		queryKey: ["sleep", limit],
		queryFn: () =>
			graphQLClient.request<{ sleep: SleepNight[] }>(SLEEP_NIGHTS, { limit }),
	});
}

export interface HrvDay {
	calendar_date: string;
	weekly_avg: number | string | null;
	last_night_avg: number | string | null;
	last_night_5min_high: number | string | null;
	baseline_balanced_low: number | string | null;
	baseline_balanced_upper: number | string | null;
	status: string | null;
	feedback_phrase: string | null;
}

const HRV_DAYS = /* GraphQL */ `
	query HrvDays($limit: Int = 30) {
		daily_hrv(order_by: { calendar_date: desc }, limit: $limit) {
			calendar_date
			weekly_avg
			last_night_avg
			last_night_5min_high
			baseline_balanced_low
			baseline_balanced_upper
			status
			feedback_phrase
		}
	}
`;

export function useHrv(limit = 30) {
	return useQuery({
		queryKey: ["hrv", limit],
		queryFn: () =>
			graphQLClient.request<{ daily_hrv: HrvDay[] }>(HRV_DAYS, { limit }),
	});
}

export interface ReadinessDay {
	calendar_date: string;
	timestamp: string;
	score: number | string | null;
	level: string | null;
	acute_load: number | string | null;
	acwr_factor_percent: number | string | null;
	stress_history_factor_percent: number | string | null;
	hrv_factor_percent: number | string | null;
	sleep_score_factor_percent: number | string | null;
	recovery_time_factor_percent: number | string | null;
	sleep_history_factor_percent: number | string | null;
}

// The morning (AFTER_WAKEUP_RESET) snapshot is the headline readiness value.
const READINESS_DAYS = /* GraphQL */ `
	query ReadinessDays($limit: Int = 30) {
		training_readiness(
			where: { input_context: { _eq: "AFTER_WAKEUP_RESET" } }
			order_by: { calendar_date: desc, timestamp: desc }
			limit: $limit
		) {
			calendar_date
			timestamp
			score
			level
			acute_load
			acwr_factor_percent
			stress_history_factor_percent
			hrv_factor_percent
			sleep_score_factor_percent
			recovery_time_factor_percent
			sleep_history_factor_percent
		}
	}
`;

export function useReadiness(limit = 30) {
	return useQuery({
		queryKey: ["readiness", limit],
		queryFn: () =>
			graphQLClient.request<{ training_readiness: ReadinessDay[] }>(
				READINESS_DAYS,
				{ limit },
			),
	});
}

export interface StreamSample {
	t: number;
	v: number;
}

export interface TrackPoint {
	lat: number;
	lng: number;
}

export interface ActivityStreamPayload {
	hr?: StreamSample[];
	elevation?: StreamSample[];
	track?: TrackPoint[];
}

export interface ActivityDetail extends CalendarActivity {
	garmin_activity_id: number | string;
	avg_hr: number | null;
	max_hr: number | null;
	calories: number | null;
	avg_speed_mps: number | string | null;
	avg_power_w: number | string | null;
	feeling: number | null;
	effort: number | null;
	food_during: string[] | null;
	food_after: string[] | null;
	caffeine: string | null;
	weather: string | null;
	notes: string | null;
	focus: string | null;
	hard_tries: number | null;
	strength_exercises: unknown;
	activity_streams: { payload: ActivityStreamPayload }[];
}

export function useActivity(
	id: string | undefined,
): UseQueryResult<ActivityDetail | null, Error> {
	return useActivityDetailQuery(id) as unknown as UseQueryResult<
		ActivityDetail | null,
		Error
	>;
}
