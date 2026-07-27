import { Link } from "react-router-dom";

import {
	type Category,
	categoryColor,
	categoryIcon,
	categoryOf,
	effectiveSubtype,
} from "@/lib/activity-types";
import { dayKey, fmtDistance, fmtDuration } from "@/lib/format";
import { dayToken, sportIcon, toIsoWeek } from "@/lib/plans";
import { type CalendarActivity, num } from "@/lib/queries";
import { cn } from "@/lib/utils";

export interface PlanWorkout {
	id: unknown;
	week: string;
	day_of_week: string;
	sport: string;
	title: string;
}

// Index workouts by `${isoWeek}|${dayOfWeek}` for O(1) per-day lookup.
export function indexWorkouts(
	workouts: PlanWorkout[],
): Map<string, PlanWorkout[]> {
	const map = new Map<string, PlanWorkout[]>();
	for (const w of workouts) {
		const key = `${w.week}|${w.day_of_week}`;
		(map.get(key) ?? map.set(key, []).get(key))?.push(w);
	}
	return map;
}

export function DayWorkouts({
	day,
	byWeekDay,
}: {
	day: Date;
	byWeekDay: Map<string, PlanWorkout[]>;
}) {
	const workouts = byWeekDay.get(`${toIsoWeek(day)}|${dayToken(day)}`) ?? [];
	if (workouts.length === 0) return null;
	const isPast = dayKey(day) < dayKey(new Date());
	return (
		<div className="mt-auto flex flex-col gap-1 pt-1">
			{workouts.map((w) => {
				const Icon = sportIcon(w.sport);
				return (
					<div
						key={String(w.id)}
						className={cn(
							"bg-muted flex items-center gap-1.5 rounded-sm px-1.5 py-1 leading-tight",
							isPast
								? "text-muted-foreground"
								: "text-fuchsia-600 dark:text-fuchsia-400",
						)}
						title={w.title}
					>
						<Icon size={11} className="shrink-0" />
						<span className="truncate text-[10px] font-medium">{w.title}</span>
					</div>
				);
			})}
		</div>
	);
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function startOfWeek(d: Date): Date {
	const x = new Date(d);
	x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
	x.setHours(0, 0, 0, 0);
	return x;
}

export function addDays(d: Date, n: number): Date {
	const x = new Date(d);
	x.setDate(x.getDate() + n);
	return x;
}

export interface WeekTotals {
	runKm: number;
	runVert: number;
	runH: number;
	climbH: number;
	weightsH: number;
}

export function computeWeekTotals(
	acts: CalendarActivity[],
): Map<string, WeekTotals> {
	const map = new Map<string, WeekTotals>();
	for (const a of acts) {
		if (!a.start_time) continue;
		const key = dayKey(startOfWeek(new Date(a.start_time)));
		let t = map.get(key);
		if (!t) {
			t = { runKm: 0, runVert: 0, runH: 0, climbH: 0, weightsH: 0 };
			map.set(key, t);
		}
		const hours = num(a.duration_s) / 3600;
		const category = categoryOf(a.activity_type, a.subtype);
		if (category === "running") {
			t.runKm += num(a.distance_m) / 1000;
			t.runVert += num(a.elevation_gain_m);
			t.runH += hours;
		} else if (category === "climbing") {
			t.climbH += hours;
		} else if (category === "strength") {
			t.weightsH += hours;
		}
	}
	return map;
}

export function eventInfo(a: CalendarActivity): string {
	const parts: string[] = [];
	const sub = effectiveSubtype(a.activity_type, a.subtype);
	if (sub) parts.push(cap(sub));
	if (num(a.distance_m)) parts.push(fmtDistance(num(a.distance_m)));
	if (num(a.duration_s)) parts.push(fmtDuration(num(a.duration_s)));
	return parts.join(" · ");
}

export function DayEvent({ a }: { a: CalendarActivity }) {
	const category = categoryOf(a.activity_type, a.subtype);
	const Icon = categoryIcon[category];
	const color = categoryColor[category];
	return (
		<Link
			to={`/activities/${a.id}`}
			className="bg-accent/40 hover:bg-accent focus-visible:ring-ring rounded-sm border-l-2 px-1.5 py-1.5 leading-tight transition-colors focus-visible:ring-2 focus-visible:outline-none md:py-0.5"
			style={{ borderLeftColor: color }}
		>
			<div className="flex items-center justify-center gap-1 md:justify-start">
				<Icon size={12} className="shrink-0" />
				<span className="hidden truncate text-xs font-medium md:inline">
					{a.name ?? a.activity_type ?? "Activity"}
				</span>
			</div>
			<div className="text-muted-foreground hidden truncate text-[11px] md:block">
				{eventInfo(a)}
			</div>
		</Link>
	);
}

export function TotalRow({
	category,
	value,
	zero,
}: {
	category: Category;
	value: string;
	zero: boolean;
}) {
	const Icon = categoryIcon[category];
	return (
		<div className="flex items-center gap-1.5">
			<Icon
				size={12}
				className="shrink-0"
				style={{ color: categoryColor[category] }}
			/>
			<span
				className={cn(
					"text-xs font-semibold",
					zero && "text-muted-foreground font-normal",
				)}
			>
				{value}
			</span>
		</div>
	);
}

// A single-week slice of the calendar: seven day columns (Mon–Sun) with their
// events. `weekStart` must be a Monday (use startOfWeek).
export function WeekStrip({
	weekStart,
	byDay,
	workoutsByWeekDay,
}: {
	weekStart: Date;
	byDay: Map<string, CalendarActivity[]>;
	workoutsByWeekDay?: Map<string, PlanWorkout[]>;
}) {
	const today = dayKey(new Date());
	return (
		<div className="grid h-full grid-cols-7 overflow-hidden rounded-lg border">
			{Array.from({ length: 7 }, (_, i) => i).map((i) => {
				const day = addDays(weekStart, i);
				const key = dayKey(day);
				const events = byDay.get(key) ?? [];
				const isToday = key === today;
				return (
					<div
						key={key}
						className="flex min-h-0 min-w-0 flex-col border-r last:border-r-0"
					>
						<div
							className={cn(
								"flex items-baseline justify-between gap-1 border-b px-1.5 py-1",
								isToday && "bg-accent/50",
							)}
						>
							<span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
								{WEEKDAYS[i]}
							</span>
							<span
								className={cn(
									"text-xs",
									isToday ? "font-semibold" : "text-muted-foreground",
								)}
							>
								{day.getDate()}
							</span>
						</div>
						<div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-1">
							{events.map((a) => (
								<DayEvent key={a.id} a={a} />
							))}
							{workoutsByWeekDay ? (
								<DayWorkouts day={day} byWeekDay={workoutsByWeekDay} />
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
}
