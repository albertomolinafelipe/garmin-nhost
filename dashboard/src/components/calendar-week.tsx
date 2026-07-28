import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	type Category,
	CATEGORY_ORDER,
	categoryColor,
	categoryIcon,
	categoryOf,
	effectiveSubtype,
	iconifyIcon,
	sportColor,
} from "@/lib/activity-types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { usePlansQuery, useUpdatePlanWorkoutMutation } from "@/graphql/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { dayKey, fmtDistance, fmtDuration } from "@/lib/format";
import {
	DAY_LABEL,
	dayToken,
	type Metric,
	METRIC_META,
	raceIcon,
	sportIcon,
	toIsoWeek,
} from "@/lib/plans";
import { type CalendarActivity, num } from "@/lib/queries";
import { cn } from "@/lib/utils";

export interface PlanRequirement {
	id: unknown;
	week: string;
	sport: string | null;
	metric: string;
	target: unknown;
}

export function indexRequirements(
	reqs: PlanRequirement[],
): Map<string, PlanRequirement[]> {
	const map = new Map<string, PlanRequirement[]>();
	for (const r of reqs) {
		(map.get(r.week) ?? map.set(r.week, []).get(r.week))?.push(r);
	}
	return map;
}

function requirementActual(
	acts: CalendarActivity[],
	metric: string,
	sport: string | null,
): number {
	let total = 0;
	for (const a of acts) {
		if (sport && categoryOf(a.activity_type, a.subtype) !== sport) continue;
		if (metric === "sessions") total += 1;
		else if (metric === "distance") total += num(a.distance_m);
		else if (metric === "elevation") total += num(a.elevation_gain_m);
		else if (metric === "duration") total += num(a.duration_s);
	}
	return total;
}

export function WeekRequirements({
	requirements,
	activities,
}: {
	requirements: PlanRequirement[];
	activities: CalendarActivity[];
}) {
	if (requirements.length === 0) return null;
	const sortKey = (sport: string | null) =>
		sport ? CATEGORY_ORDER.indexOf(sport as Category) : -1;
	const ordered = [...requirements].sort(
		(a, b) => sortKey(a.sport) - sortKey(b.sport),
	);
	return (
		<div className="mt-1 flex flex-col gap-1.5">
			{ordered.map((r) => {
				const meta = METRIC_META[r.metric as Metric];
				const target = Number(r.target);
				const actual = requirementActual(activities, r.metric, r.sport);
				const pct = target > 0 ? Math.min(100, (actual / target) * 100) : 0;
				const SportIcon = sportIcon(r.sport);
				const MetricIcon = meta?.icon;
				const color = sportColor(r.sport);
				return (
					<div key={String(r.id)} className="flex items-center gap-1.5">
						<Progress
							value={pct}
							className="h-1"
							indicatorStyle={{ backgroundColor: color }}
						/>
						<span className="text-muted-foreground flex w-20 shrink-0 items-center gap-1 text-[10px] tabular-nums">
							<SportIcon size={11} className="shrink-0" />
							{MetricIcon ? (
								<MetricIcon size={11} className="shrink-0" />
							) : null}
							<span className="truncate">
								{meta ? meta.format(target) : ""}
							</span>
						</span>
					</div>
				);
			})}
		</div>
	);
}

export interface PlanWorkout {
	id: unknown;
	plan_id: unknown;
	week: string;
	day_of_week: string;
	sport: string;
	title: string;
	description?: string | null;
	completed_at?: unknown;
}

// Drag-and-drop: dragging a workout chip onto a day cell reschedules it to that
// day's ISO week + weekday, provided the day still falls inside the plan's week
// range. Shared by the month calendar and the week strip via context so the
// drop targets (page-owned day cells) and drag source (WorkoutChip) coordinate
// without prop drilling.
interface WorkoutDndValue {
	onDragStartWorkout: (w: PlanWorkout, e: React.DragEvent) => void;
	onDropDay: (day: Date, e: React.DragEvent) => void;
}

const WorkoutDndContext = createContext<WorkoutDndValue | null>(null);

export function PlanWorkoutDndProvider({ children }: { children: ReactNode }) {
	const dragged = useRef<PlanWorkout | null>(null);
	const plans = usePlansQuery();
	const update = useUpdatePlanWorkoutMutation();
	const queryClient = useQueryClient();

	const onDragStartWorkout = useCallback(
		(w: PlanWorkout, e: React.DragEvent) => {
			dragged.current = w;
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", String(w.id));
		},
		[],
	);

	const onDropDay = useCallback(
		(day: Date, e: React.DragEvent) => {
			e.preventDefault();
			const w = dragged.current;
			dragged.current = null;
			if (!w) return;
			const week = toIsoWeek(day);
			const dow = dayToken(day);
			if (w.week === week && w.day_of_week === dow) return;
			const plan = plans.data?.find((p) => String(p.id) === String(w.plan_id));
			if (!plan || week < plan.start_week || week > plan.end_week) {
				toast.error("That day is outside the plan's range");
				return;
			}
			void (async () => {
				try {
					await update.mutateAsync({
						id: w.id,
						set: { week, day_of_week: dow },
					});
					await queryClient.invalidateQueries({ queryKey: ["plan-workouts"] });
				} catch {
					toast.error("Could not move the workout");
				}
			})();
		},
		[plans.data, update, queryClient],
	);

	const value = useMemo(
		() => ({ onDragStartWorkout, onDropDay }),
		[onDragStartWorkout, onDropDay],
	);
	return (
		<WorkoutDndContext.Provider value={value}>
			{children}
		</WorkoutDndContext.Provider>
	);
}

export function useWorkoutDnd(): WorkoutDndValue | null {
	return useContext(WorkoutDndContext);
}

// Plain helpers (not hooks) so they can be used inside `.map` day loops.
export function dayDropProps(dnd: WorkoutDndValue | null, day: Date) {
	if (!dnd) return {};
	return {
		onDragOver: (e: React.DragEvent) => e.preventDefault(),
		onDrop: (e: React.DragEvent) => dnd.onDropDay(day, e),
	};
}

export function workoutDragProps(dnd: WorkoutDndValue | null, w: PlanWorkout) {
	if (!dnd) return {};
	return {
		draggable: true,
		onDragStart: (e: React.DragEvent) => dnd.onDragStartWorkout(w, e),
	};
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

const RaceIcon = raceIcon;

export interface Race {
	id: unknown;
	date: string;
	name: string;
	distance_m: number | string | null;
	elevation_gain_m: number | string | null;
}

// Index races by their local YYYY-MM-DD date string.
export function indexRaces(races: Race[]): Map<string, Race[]> {
	const map = new Map<string, Race[]>();
	for (const r of races) {
		(map.get(r.date) ?? map.set(r.date, []).get(r.date))?.push(r);
	}
	return map;
}

export function DayRaces({
	day,
	byDay,
	activitiesByDay,
}: {
	day: Date;
	byDay?: Map<string, Race[]>;
	// When the race day already has a logged activity, the race is represented by
	// a laurel on that activity (DayEvent) instead of its own chip.
	activitiesByDay?: Map<string, CalendarActivity[]>;
}) {
	const races = byDay?.get(dayKey(day)) ?? [];
	if (races.length === 0) return null;
	if ((activitiesByDay?.get(dayKey(day))?.length ?? 0) > 0) return null;
	return (
		<>
			{races.map((r) => {
				const info = [
					num(r.distance_m) ? fmtDistance(num(r.distance_m)) : null,
					num(r.elevation_gain_m)
						? `${Math.round(num(r.elevation_gain_m))} m`
						: null,
				]
					.filter(Boolean)
					.join(" · ");
				return (
					<div
						key={String(r.id)}
						className="text-race border-race bg-race/10 flex flex-col rounded-md border-l-2 px-2 py-1.5 leading-tight"
						title={r.name}
					>
						<div className="flex items-center justify-center gap-1.5 md:justify-start">
							<RaceIcon size={16} className="shrink-0" />
							<span className="hidden truncate text-sm font-medium md:inline">
								{r.name}
							</span>
						</div>
						{info ? (
							<div className="text-muted-foreground hidden truncate text-xs md:block">
								{info}
							</div>
						) : null}
					</div>
				);
			})}
		</>
	);
}

const WorkoutDoneIcon = iconifyIcon("mdi:check-circle");
const WorkoutTodoIcon = iconifyIcon("mdi:checkbox-blank-circle-outline");

function WorkoutChip({ w, isPast }: { w: PlanWorkout; isPast: boolean }) {
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const dnd = useWorkoutDnd();
	const update = useUpdatePlanWorkoutMutation();
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const Icon = sportIcon(w.sport);
	const color = sportColor(w.sport);
	const isDone = Boolean(w.completed_at);
	const goToPlan = () => navigate(`/plans?plan=${w.plan_id}`);

	const toggleDone = () => {
		const completed_at = isDone ? null : new Date().toISOString();
		void (async () => {
			try {
				await update.mutateAsync({ id: w.id, set: { completed_at } });
				await queryClient.invalidateQueries({ queryKey: ["plan-workouts"] });
			} catch {
				toast.error("Could not update the workout");
			}
		})();
	};

	const DoneIcon = isDone ? WorkoutDoneIcon : WorkoutTodoIcon;

	const chip = (
		<div
			{...workoutDragProps(dnd, w)}
			className={cn(
				"group/chip hover:bg-accent flex items-center gap-1 rounded-md px-1.5 py-1 leading-tight transition-colors",
				dnd ? "md:cursor-grab md:active:cursor-grabbing" : "",
				isPast ? "bg-accent/40 text-muted-foreground" : "bg-muted",
			)}
			style={isPast || isDone ? undefined : { color }}
			title={w.title}
		>
			<button
				type="button"
				onClick={() => (isMobile ? setOpen(true) : goToPlan())}
				className="flex min-w-0 flex-1 items-center justify-center gap-1 hover:opacity-80 md:justify-start"
			>
				<Icon size={14} className="shrink-0" />
				<span
					className={cn(
						"hidden truncate text-xs font-medium md:inline",
						isDone && "text-muted-foreground line-through",
					)}
				>
					{w.title}
				</span>
			</button>
			<button
				type="button"
				onClick={toggleDone}
				aria-label={isDone ? "Mark workout not done" : "Mark workout done"}
				aria-pressed={isDone}
				className={cn(
					"shrink-0 transition-opacity",
					isDone
						? "text-emerald-500"
						: "text-muted-foreground opacity-40 md:opacity-0 md:group-hover/chip:opacity-100",
				)}
			>
				<DoneIcon size={14} className="shrink-0" />
			</button>
		</div>
	);

	if (!isMobile) return chip;

	return (
		<>
			{chip}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="bottom" className="gap-0">
					<SheetHeader>
						<SheetTitle className="flex items-center gap-2">
							<Icon size={18} className="shrink-0" />
							{w.title}
						</SheetTitle>
						<SheetDescription>
							{w.sport} ·{" "}
							{DAY_LABEL[w.day_of_week as keyof typeof DAY_LABEL] ??
								w.day_of_week}{" "}
							· {w.week}
						</SheetDescription>
					</SheetHeader>
					{w.description ? (
						<p className="text-muted-foreground px-4 text-sm">
							{w.description}
						</p>
					) : null}
					<SheetFooter>
						<Button
							variant={isDone ? "outline" : "default"}
							onClick={toggleDone}
						>
							{isDone ? "Mark as not done" : "Mark as done"}
						</Button>
						<Button variant="ghost" onClick={goToPlan}>
							Go to plan
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
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
	const sortKey = (sport: string | null) =>
		sport ? CATEGORY_ORDER.indexOf(sport as Category) : -1;
	const ordered = [...workouts].sort(
		(a, b) => sortKey(a.sport) - sortKey(b.sport),
	);
	return (
		<div className="mt-auto flex flex-col gap-1 pt-1">
			{ordered.map((w) => (
				<WorkoutChip key={String(w.id)} w={w} isPast={isPast} />
			))}
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

export function DayEvent({
	a,
	isRace,
}: {
	a: CalendarActivity;
	isRace?: boolean;
}) {
	const category = categoryOf(a.activity_type, a.subtype);
	const Icon = isRace ? RaceIcon : categoryIcon[category];
	const color = categoryColor[category];
	return (
		<Link
			to={`/activities/${a.id}`}
			className={cn(
				"bg-accent/40 hover:bg-accent focus-visible:ring-ring rounded-md border-l-2 px-1.5 py-1 leading-tight transition-colors focus-visible:ring-2 focus-visible:outline-none",
				isRace && "text-race border-race",
			)}
			style={isRace ? undefined : { borderLeftColor: color }}
		>
			<div className="flex items-center justify-center gap-1 md:justify-start">
				<Icon size={14} className="shrink-0" />
				<span className="hidden truncate text-xs font-medium md:inline">
					{a.name ?? a.activity_type ?? "Activity"}
				</span>
			</div>
			<div
				className={cn(
					"hidden truncate text-xs md:block",
					isRace ? "text-race/80" : "text-muted-foreground",
				)}
			>
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

// Run/climb/strength totals for one week, matching the calendar's totals column.
export function WeekTotalsBlock({ totals }: { totals?: WeekTotals }) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-start gap-1.5">
				<categoryIcon.running
					size={12}
					className="mt-0.5 shrink-0"
					style={{ color: categoryColor.running }}
				/>
				<div className="leading-tight">
					<div
						className={cn(
							"text-xs font-semibold",
							!totals?.runKm && "text-muted-foreground font-normal",
						)}
					>
						{(totals?.runKm ?? 0).toFixed(1)} km
					</div>
					<div className="text-muted-foreground text-[11px]">
						{(totals?.runH ?? 0).toFixed(1)} h ·{" "}
						{Math.round(totals?.runVert ?? 0)} m
					</div>
				</div>
			</div>
			<TotalRow
				category="climbing"
				value={`${(totals?.climbH ?? 0).toFixed(1)} h`}
				zero={!totals?.climbH}
			/>
			<TotalRow
				category="strength"
				value={`${(totals?.weightsH ?? 0).toFixed(1)} h`}
				zero={!totals?.weightsH}
			/>
		</div>
	);
}

// A single-week slice of the calendar: seven day columns (Mon–Sun) with their
// events. `weekStart` must be a Monday (use startOfWeek). Pass `totals` to show
// a week-totals column on the right (md+).
export function WeekStrip({
	weekStart,
	byDay,
	workoutsByWeekDay,
	racesByDay,
	totals,
	requirements,
}: {
	weekStart: Date;
	byDay: Map<string, CalendarActivity[]>;
	workoutsByWeekDay?: Map<string, PlanWorkout[]>;
	racesByDay?: Map<string, Race[]>;
	totals?: WeekTotals;
	requirements?: PlanRequirement[];
}) {
	const today = dayKey(new Date());
	const dnd = useWorkoutDnd();
	const showTotals = totals !== undefined || requirements !== undefined;
	const weekActivities = showTotals ? Array.from(byDay.values()).flat() : [];
	return (
		<div className="bg-card flex h-full overflow-hidden rounded-lg border">
			<div className="grid min-w-0 flex-1 grid-cols-7">
				{Array.from({ length: 7 }, (_, i) => i).map((i) => {
					const day = addDays(weekStart, i);
					const key = dayKey(day);
					const events = byDay.get(key) ?? [];
					const isToday = key === today;
					return (
						<div
							key={key}
							{...dayDropProps(dnd, day)}
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
							<div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-1 pt-2">
								<DayRaces
									day={day}
									byDay={racesByDay}
									activitiesByDay={byDay}
								/>
								{events.map((a) => (
									<DayEvent
										key={a.id}
										a={a}
										isRace={(racesByDay?.get(key)?.length ?? 0) > 0}
									/>
								))}
								{workoutsByWeekDay ? (
									<DayWorkouts day={day} byWeekDay={workoutsByWeekDay} />
								) : null}
							</div>
						</div>
					);
				})}
			</div>
			{showTotals ? (
				<aside className="bg-muted/30 hidden w-44 shrink-0 flex-col border-l md:flex">
					<div className="flex items-center border-b px-2 py-1">
						<span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
							Week totals
						</span>
					</div>
					<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
						<WeekTotalsBlock totals={totals} />
						{requirements ? (
							<WeekRequirements
								requirements={requirements}
								activities={weekActivities}
							/>
						) : null}
					</div>
				</aside>
			) : null}
		</div>
	);
}
