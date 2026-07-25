import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	type Category,
	CATEGORY_ORDER,
	categoryColor,
	categoryIcon,
	categoryOf,
	effectiveSubtype,
} from "@/lib/activity-types";
import { dayKey, fmtDistance, fmtDuration } from "@/lib/format";
import { type CalendarActivity, num, useActivities } from "@/lib/queries";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function startOfWeek(d: Date): Date {
	const x = new Date(d);
	x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
	x.setHours(0, 0, 0, 0);
	return x;
}
function addDays(d: Date, n: number): Date {
	const x = new Date(d);
	x.setDate(x.getDate() + n);
	return x;
}

interface WeekTotals {
	runKm: number;
	runVert: number;
	runH: number;
	climbH: number;
	weightsH: number;
}

function computeWeekTotals(acts: CalendarActivity[]): Map<string, WeekTotals> {
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

function eventInfo(a: CalendarActivity): string {
	const parts: string[] = [];
	const sub = effectiveSubtype(a.activity_type, a.subtype);
	if (sub) parts.push(cap(sub));
	if (num(a.distance_m)) parts.push(fmtDistance(num(a.distance_m)));
	if (num(a.duration_s)) parts.push(fmtDuration(num(a.duration_s)));
	return parts.join(" · ");
}

function DayEvent({ a }: { a: CalendarActivity }) {
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

function TotalRow({
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

export function Calendar() {
	const [cursor, setCursor] = useState(() => new Date());
	const [filter, setFilter] = useState<Category | null>(null);
	const { data, isLoading } = useActivities();

	const activities = data?.activities ?? [];

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
													"min-w-0 overflow-hidden border-r p-1 last:border-r-0",
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
												<div className="mt-0.5 flex flex-col gap-0.5">
													{events.map((a) => (
														<DayEvent key={a.id} a={a} />
													))}
												</div>
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
