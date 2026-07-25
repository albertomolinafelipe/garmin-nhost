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
