import { useQuery } from "@tanstack/react-query";

import { graphQLClient } from "@/graphql/client";

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
}

const CALENDAR_ACTIVITIES = /* GraphQL */ `
	query CalendarActivities {
		activities(order_by: { start_time: desc_nulls_last }, limit: 1000) {
			id
			name
			activity_type
			subtype
			start_time
			duration_s
			distance_m
			elevation_gain_m
		}
	}
`;

export function useActivities() {
	return useQuery({
		queryKey: ["activities"],
		queryFn: () =>
			graphQLClient.request<{ activities: CalendarActivity[] }>(
				CALENDAR_ACTIVITIES,
			),
	});
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

