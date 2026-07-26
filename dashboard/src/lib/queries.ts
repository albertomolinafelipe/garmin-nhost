import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { graphQLClient } from "@/graphql/client";
import {
	useActivityDetailQuery,
	useCalendarActivitiesQuery,
} from "@/graphql/hooks";

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
