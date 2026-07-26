import { CATEGORY_ORDER, type Category } from "./activity-types";

// Mirrors the DB CHECK vocab for plans. These enums are the mutation-boundary
// source of truth; the Postgres CHECK constraints are the backstop.

export type Sport = Category;
export const SPORTS: readonly Sport[] = CATEGORY_ORDER;

export type Metric = "distance" | "elevation" | "duration" | "sessions";
export const METRICS = ["distance", "elevation", "duration", "sessions"] as const;

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS: readonly Day[] = [
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat",
	"sun",
];

export const DAY_LABEL: Record<Day, string> = {
	mon: "Mon",
	tue: "Tue",
	wed: "Wed",
	thu: "Thu",
	fri: "Fri",
	sat: "Sat",
	sun: "Sun",
};

// A metric's stored value is in the SI base unit of its matching activity
// column: distance/elevation in metres, duration in seconds, sessions a count.
export const METRIC_META: Record<
	Metric,
	{ label: string; activityColumn: string | null; format: (target: number) => string }
> = {
	distance: {
		label: "Distance",
		activityColumn: "distance_m",
		format: (m) => `${(m / 1000).toFixed(1)} km`,
	},
	elevation: {
		label: "Elevation",
		activityColumn: "elevation_gain_m",
		format: (m) => `${Math.round(m)} m`,
	},
	duration: {
		label: "Duration",
		activityColumn: "duration_s",
		format: (s) => {
			const h = Math.floor(s / 3600);
			const min = Math.round((s % 3600) / 60);
			return h > 0 ? `${h}h ${min}m` : `${min}m`;
		},
	},
	sessions: {
		label: "Sessions",
		activityColumn: null,
		format: (n) => `${n} session${n === 1 ? "" : "s"}`,
	},
};

// ISO year-week token, e.g. '2026-W01'. Matches the DB CHECK regex.
const ISO_WEEK_RE = /^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/;

export function isIsoWeek(value: string): boolean {
	return ISO_WEEK_RE.test(value);
}
