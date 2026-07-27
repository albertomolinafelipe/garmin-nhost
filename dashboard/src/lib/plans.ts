import {
	addWeeks,
	getISOWeek,
	getISOWeekYear,
	setISOWeek,
	setISOWeekYear,
	startOfISOWeek,
} from "date-fns";
import { Route } from "lucide-react";

import {
	CATEGORY_ORDER,
	categoryIcon,
	iconifyIcon,
	type Category,
	type IconComponent,
} from "./activity-types";

const allSportsIcon = iconifyIcon("mdi:layers");

// Shared race glyph. Colour comes from the `--race` token (text-race/bg-race).
export const raceIcon = iconifyIcon("tabler:laurel-wreath");

// Mirrors the DB CHECK vocab for plans. These enums are the mutation-boundary
// source of truth; the Postgres CHECK constraints are the backstop.

export type Sport = Category;
export const SPORTS: readonly Sport[] = CATEGORY_ORDER;

// Icon for a requirement/workout sport; null means "all sports".
export function sportIcon(sport: string | null): IconComponent {
	if (!sport) return allSportsIcon;
	return categoryIcon[sport as Category] ?? allSportsIcon;
}

export type Metric = "distance" | "elevation" | "duration" | "sessions";
export const METRICS = [
	"distance",
	"elevation",
	"duration",
	"sessions",
] as const;

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
	{
		label: string;
		icon: IconComponent;
		activityColumn: string | null;
		// Unit the user types in the form; converted to the stored base unit.
		inputUnit: string;
		toBase: (input: number) => number;
		fromBase: (base: number) => number;
		format: (base: number) => string;
	}
> = {
	distance: {
		label: "Distance",
		icon: Route,
		activityColumn: "distance_m",
		inputUnit: "km",
		toBase: (km) => km * 1000,
		fromBase: (m) => m / 1000,
		format: (m) => `${(m / 1000).toFixed(1)} km`,
	},
	elevation: {
		label: "Elevation",
		icon: iconifyIcon("material-symbols:elevation"),
		activityColumn: "elevation_gain_m",
		inputUnit: "m",
		toBase: (m) => m,
		fromBase: (m) => m,
		format: (m) => `${Math.round(m)} m`,
	},
	duration: {
		label: "Duration",
		icon: iconifyIcon("mdi:clock-outline"),
		activityColumn: "duration_s",
		inputUnit: "min",
		toBase: (min) => min * 60,
		fromBase: (s) => s / 60,
		format: (s) => {
			const h = Math.floor(s / 3600);
			const min = Math.round((s % 3600) / 60);
			return h > 0 ? `${h}h ${min}m` : `${min}m`;
		},
	},
	sessions: {
		label: "Sessions",
		icon: iconifyIcon("mdi:repeat"),
		activityColumn: null,
		inputUnit: "",
		toBase: (n) => n,
		fromBase: (n) => n,
		format: (n) => `${n} session${n === 1 ? "" : "s"}`,
	},
};

// ISO year-week token, e.g. '2026-W01'. Matches the DB CHECK regex.
const ISO_WEEK_RE = /^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/;

export function isIsoWeek(value: string): boolean {
	return ISO_WEEK_RE.test(value);
}

// Date -> '2026-W02' using ISO-8601 week numbering.
export function toIsoWeek(date: Date): string {
	const year = getISOWeekYear(date);
	const week = getISOWeek(date);
	return `${year}-W${String(week).padStart(2, "0")}`;
}

export function currentIsoWeek(): string {
	return toIsoWeek(new Date());
}

// Date -> ISO weekday token ('mon'..'sun').
export function dayToken(date: Date): Day {
	return DAYS[(date.getDay() + 6) % 7];
}

// ISO week tokens are zero-padded and year-prefixed, so lexicographic order
// matches chronological order. A plan is active when its range spans the week.
export function planIsActive(
	plan: { start_week: string; end_week: string },
	week: string,
): boolean {
	return plan.start_week <= week && week <= plan.end_week;
}

function isoWeekToDate(value: string): Date {
	const [year, week] = value.split("-W");
	return startOfISOWeek(
		setISOWeek(setISOWeekYear(new Date(), Number(year)), Number(week)),
	);
}

// Every ISO week from start to end inclusive, e.g. ['2026-W01', '2026-W02', ...].
export function weeksInRange(start: string, end: string): string[] {
	if (!isIsoWeek(start) || !isIsoWeek(end) || end < start) return [];
	const weeks: string[] = [];
	let date = isoWeekToDate(start);
	for (let i = 0; i < 260; i++) {
		const week = toIsoWeek(date);
		weeks.push(week);
		if (week >= end) break;
		date = addWeeks(date, 1);
	}
	return weeks;
}
