import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	addDays,
	computeWeekTotals,
	DayEvent,
	DayWorkouts,
	indexRequirements,
	indexWorkouts,
	startOfWeek,
	TotalRow,
	WeekRequirements,
	WEEKDAYS,
} from "@/components/calendar-week";
import {
	useAllPlanRequirementsQuery,
	useAllPlanWorkoutsQuery,
} from "@/graphql/hooks";
import { toIsoWeek } from "@/lib/plans";
import {
	type Category,
	CATEGORY_ORDER,
	categoryColor,
	categoryIcon,
	categoryOf,
} from "@/lib/activity-types";
import { dayKey } from "@/lib/format";
import { type CalendarActivity, useActivities } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function Calendar() {
	const [cursor, setCursor] = useState(() => new Date());
	const [filter, setFilter] = useState<Category | null>(null);
	const { data, isLoading } = useActivities();
	const { data: workouts } = useAllPlanWorkoutsQuery();
	const { data: requirements } = useAllPlanRequirementsQuery();

	const activities = data?.activities ?? [];
	const workoutsByWeekDay = useMemo(
		() => indexWorkouts(workouts ?? []),
		[workouts],
	);
	const requirementsByWeek = useMemo(
		() => indexRequirements(requirements ?? []),
		[requirements],
	);
	const activitiesByWeek = useMemo(() => {
		const map = new Map<string, CalendarActivity[]>();
		for (const a of activities) {
			if (!a.start_time) continue;
			const key = toIsoWeek(new Date(a.start_time));
			(map.get(key) ?? map.set(key, []).get(key))?.push(a);
		}
		return map;
	}, [activities]);

	const byDay = useMemo(() => {
		const map = new Map<string, CalendarActivity[]>();
		for (const a of activities) {
			if (!a.start_time) continue;
			if (filter && categoryOf(a.activity_type, a.subtype) !== filter) continue;
			const key = dayKey(new Date(a.start_time));
			(map.get(key) ?? map.set(key, []).get(key))?.push(a);
		}
		return map;
	}, [activities, filter]);

	const totals = useMemo(() => computeWeekTotals(activities), [activities]);

	const weeks = useMemo(() => {
		const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
		const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
		const start = startOfWeek(first);
		const end = startOfWeek(last);
		const out: Date[] = [];
		for (let w = start; w <= end; w = addDays(w, 7)) out.push(new Date(w));
		return out;
	}, [cursor]);

	const presentCats = useMemo(() => {
		const set = new Set<Category>();
		for (const a of activities) set.add(categoryOf(a.activity_type, a.subtype));
		return CATEGORY_ORDER.filter((c) => set.has(c));
	}, [activities]);

	const month = cursor.toLocaleDateString(undefined, {
		month: "long",
		year: "numeric",
	});

	return (
		<div className="flex h-full min-h-[520px] flex-col gap-4 p-4">
			{/* Toolbar */}
			<div className="relative flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							aria-label="Today"
							onClick={() => setCursor(new Date())}
						>
							<CalendarDays />
						</Button>
						<Button
							variant="outline"
							size="icon"
							aria-label="Previous month"
							onClick={() =>
								setCursor(
									new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1),
								)
							}
						>
							<ChevronLeft />
						</Button>
						<Button
							variant="outline"
							size="icon"
							aria-label="Next month"
							onClick={() =>
								setCursor(
									new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1),
								)
							}
						>
							<ChevronRight />
						</Button>
					</div>
					<div className="flex items-center gap-1">
						{presentCats.map((c) => {
							const Icon = categoryIcon[c];
							const active = filter === c;
							return (
								<Button
									key={c}
									variant="outline"
									size="icon"
									aria-label={`Filter ${c}`}
									aria-pressed={active}
									onClick={() => setFilter(active ? null : c)}
									style={
										active
											? { backgroundColor: categoryColor[c], color: "#fff" }
											: { color: categoryColor[c] }
									}
								>
									<Icon />
								</Button>
							);
						})}
					</div>
				</div>
				<div className="order-first w-full text-center text-sm font-semibold sm:order-none sm:w-auto md:absolute md:left-1/2 md:-translate-x-1/2">
					{month}
				</div>
			</div>

			{/* Month grid + week-totals column */}
			<div className="bg-card flex min-h-0 flex-1 overflow-hidden rounded-xl border">
				{/* Days */}
				<div className="flex min-w-0 flex-1 flex-col">
					<div className="grid grid-cols-7 border-b">
						{WEEKDAYS.map((d) => (
							<div
								key={d}
								className="text-muted-foreground flex h-9 items-center justify-center text-[11px] font-medium tracking-wide uppercase"
							>
								{d}
							</div>
						))}
					</div>
					<div className="flex min-h-0 flex-1 flex-col">
						{weeks.map((w) => (
							<div
								key={dayKey(w)}
								className="grid min-h-0 flex-1 grid-cols-7 border-b last:border-b-0"
							>
								{Array.from({ length: 7 }, (_, i) => addDays(w, i)).map(
									(day) => {
										const offMonth = day.getMonth() !== cursor.getMonth();
										const events = byDay.get(dayKey(day)) ?? [];
										return (
											<div
												key={dayKey(day)}
												className={cn(
													"flex min-w-0 flex-col overflow-hidden border-r p-1 last:border-r-0",
													offMonth && "bg-muted/30",
												)}
											>
												<div
													className={cn(
														"text-muted-foreground text-right text-xs",
														offMonth && "opacity-50",
													)}
												>
													{day.getDate()}
												</div>
												<div className="mt-2 flex flex-col gap-1">
													{events.map((a) => (
														<DayEvent key={a.id} a={a} />
													))}
												</div>
												<DayWorkouts day={day} byWeekDay={workoutsByWeekDay} />
											</div>
										);
									},
								)}
							</div>
						))}
					</div>
				</div>

				{/* Week totals */}
				<div className="bg-muted/30 hidden w-44 flex-col border-l md:flex">
					<div className="text-muted-foreground flex h-9 items-center justify-center border-b text-[11px] font-semibold tracking-wide uppercase">
						Week totals
					</div>
					<div className="flex min-h-0 flex-1 flex-col">
						{weeks.map((w) => {
							const t = totals.get(dayKey(w));
							return (
								<div
									key={dayKey(w)}
									className="flex min-h-0 flex-1 flex-col gap-1 border-b p-2 last:border-b-0"
								>
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
													!t?.runKm && "text-muted-foreground font-normal",
												)}
											>
												{(t?.runKm ?? 0).toFixed(1)} km
											</div>
											<div className="text-muted-foreground text-[11px]">
												{(t?.runH ?? 0).toFixed(1)} h ·{" "}
												{Math.round(t?.runVert ?? 0)} m
											</div>
										</div>
									</div>
									<TotalRow
										category="climbing"
										value={`${(t?.climbH ?? 0).toFixed(1)} h`}
										zero={!t?.climbH}
									/>
									<TotalRow
										category="strength"
										value={`${(t?.weightsH ?? 0).toFixed(1)} h`}
										zero={!t?.weightsH}
									/>
									<WeekRequirements
										requirements={requirementsByWeek.get(toIsoWeek(w)) ?? []}
										activities={activitiesByWeek.get(toIsoWeek(w)) ?? []}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{isLoading && (
				<p className="text-muted-foreground text-sm">Loading activities…</p>
			)}
		</div>
	);
}
