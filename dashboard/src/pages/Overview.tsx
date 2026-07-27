import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import {
	Area,
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	addDays,
	computeWeekTotals,
	indexWorkouts,
	startOfWeek,
	TotalRow,
	WeekStrip,
} from "@/components/calendar-week";
import { categoryColor, categoryIcon, categoryOf } from "@/lib/activity-types";
import { dayKey, fmtDuration } from "@/lib/format";
import {
	type CalendarActivity,
	num,
	useActivities,
	useHrv,
	useReadiness,
	useSleep,
} from "@/lib/queries";
import { useAllPlanWorkoutsQuery } from "@/graphql/hooks";
import { cn } from "@/lib/utils";

const WINDOW_DAYS = 7; // trailing window each daily point aggregates
const SPAN_DAYS = 30; // how many days to plot
const HISTORY_DAYS = 400; // rows fetched per daily domain so the window can scrub back
const STEP_DAYS = 1; // one back/forward click moves the window this far

// Shared, page-wide window navigation: every panel plots the same SPAN_DAYS
// window ending `end`, and the WindowNav control shifts `end` back/forward.
interface WindowNav {
	end: Date;
	startKey: string;
	endKey: string;
	canForward: boolean;
	back: () => void;
	forward: () => void;
	latest: () => void;
}

function computeWindow(offsetDays: number): {
	end: Date;
	startKey: string;
	endKey: string;
} {
	const end = new Date();
	end.setHours(0, 0, 0, 0);
	end.setDate(end.getDate() - offsetDays);
	const start = new Date(end);
	start.setDate(end.getDate() - (SPAN_DAYS - 1));
	return { end, startKey: dayKey(start), endKey: dayKey(end) };
}

const defaultWindow = computeWindow(0);
const WindowNavContext = createContext<WindowNav>({
	...defaultWindow,
	canForward: false,
	back: () => {},
	forward: () => {},
	latest: () => {},
});

function useWindowNav(): WindowNav {
	return useContext(WindowNavContext);
}

function WindowNavProvider({ children }: { children: ReactNode }) {
	const [offsetDays, setOffsetDays] = useState(0);
	const value = useMemo<WindowNav>(
		() => ({
			...computeWindow(offsetDays),
			canForward: offsetDays > 0,
			back: () => setOffsetDays((o) => o + STEP_DAYS),
			forward: () => setOffsetDays((o) => Math.max(0, o - STEP_DAYS)),
			latest: () => setOffsetDays(0),
		}),
		[offsetDays],
	);
	return (
		<WindowNavContext.Provider value={value}>
			{children}
		</WindowNavContext.Provider>
	);
}

function WindowNav() {
	const { back, forward, latest, canForward } = useWindowNav();
	return (
		<div className="text-muted-foreground flex items-center gap-1 text-xs">
			<Button
				variant="ghost"
				size="icon"
				className="size-6"
				onClick={back}
				aria-label="Go back one day"
			>
				<ChevronLeft className="size-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="size-6"
				onClick={forward}
				disabled={!canForward}
				aria-label="Go forward one day"
			>
				<ChevronRight className="size-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="size-6"
				onClick={latest}
				disabled={!canForward}
				aria-label="Jump to latest"
			>
				<ChevronsRight className="size-4" />
			</Button>
		</div>
	);
}

function inWindow(dateKey: string, w: WindowNav): boolean {
	return dateKey >= w.startKey && dateKey <= w.endKey;
}

// Animate the chart's initial draw once data first arrives, then stay static so
// scrubbing the window back/forth doesn't re-animate every panel.
function useInitialAnimation(ready: boolean): boolean {
	const [done, setDone] = useState(false);
	useEffect(() => {
		if (!ready || done) return;
		const t = setTimeout(() => setDone(true), 1600);
		return () => clearTimeout(t);
	}, [ready, done]);
	return ready && !done;
}

const READINESS_COLORS = {
	score: "#76946A",
	acuteLoad: "#C34043",
	recovery: "#7AA89F",
	stress: "#D27E99",
	sleepHistory: "#6A9589",
};

const HRV_COLORS = {
	lastNight: "#7E9CD8",
	weekly: "#DCA561",
	baseline: "#957FB8",
};

const SLEEP_COLORS = {
	awake: "#54546D",
	light: "#7E9CD8",
	rem: "#957FB8",
	deep: "#658594",
	score: "#DCA561",
};

// Rolling `windowDays` sum of `contribution` for each of the last SPAN_DAYS days.
// windowDays === 1 gives a plain day-for-day series.
function rolling(
	activities: CalendarActivity[],
	contribution: (a: CalendarActivity) => number | null,
	windowDays: number,
	end: Date,
): number[] {
	const perDay = new Map<string, number>();
	for (const a of activities) {
		if (!a.start_time) continue;
		const v = contribution(a);
		if (v == null) continue;
		const key = a.start_time.slice(0, 10);
		perDay.set(key, (perDay.get(key) ?? 0) + v);
	}
	const out: number[] = [];
	for (let i = SPAN_DAYS - 1; i >= 0; i--) {
		const day = new Date(end);
		day.setDate(end.getDate() - i);
		let sum = 0;
		for (let w = 0; w < windowDays; w++) {
			const d = new Date(day);
			d.setDate(day.getDate() - w);
			sum += perDay.get(dayKey(d)) ?? 0;
		}
		out.push(+sum.toFixed(1));
	}
	return out;
}

function dayLabels(end: Date): string[] {
	const labels: string[] = [];
	for (let i = SPAN_DAYS - 1; i >= 0; i--) {
		const day = new Date(end);
		day.setDate(end.getDate() - i);
		labels.push(dayKey(day).slice(5));
	}
	return labels;
}

function Panel({
	title,
	action,
	showNav = true,
	className,
	children,
}: {
	title: string;
	action?: ReactNode;
	showNav?: boolean;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Card className={cn("min-h-0 gap-2 py-3", className)}>
			<CardHeader className="px-4">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<CardAction>
					<div className="flex items-center gap-3">
						{action}
						{showNav && <WindowNav />}
					</div>
				</CardAction>
			</CardHeader>
			<CardContent className="min-h-0 flex-1 px-4 pb-1">{children}</CardContent>
		</Card>
	);
}

function Empty({ children }: { children: ReactNode }) {
	return (
		<div className="text-muted-foreground flex h-full items-center justify-center text-sm">
			{children}
		</div>
	);
}

function PanelBody({
	isPending,
	isEmpty,
	emptyText,
	children,
}: {
	isPending: boolean;
	isEmpty: boolean;
	emptyText: string;
	children: ReactNode;
}) {
	if (isPending) return <Empty>Loading…</Empty>;
	if (isEmpty) return <Empty>{emptyText}</Empty>;
	return <>{children}</>;
}

// A custom tooltip `formatter` replaces the entire row, so it must re-render
// the color swatch itself or the legend indicator disappears.
function TooltipItem({
	color,
	label,
	value,
}: {
	color?: string;
	label: ReactNode;
	value: string;
}) {
	return (
		<>
			<span
				className="size-2.5 shrink-0 rounded-[2px]"
				style={{ backgroundColor: color }}
			/>
			<div className="flex flex-1 items-center justify-between gap-2 leading-none">
				<span className="text-muted-foreground">{label}</span>
				<span className="text-foreground font-mono font-medium tabular-nums">
					{value}
				</span>
			</div>
		</>
	);
}

interface LoadSeries {
	key: string;
	label: string;
	unit: string;
	color: string;
	axis: "left" | "right";
	contribution: (a: CalendarActivity) => number | null;
}

function LoadPanel({
	title,
	series,
	windowDays = WINDOW_DAYS,
	variant = "area",
	className,
}: {
	title: string;
	series: LoadSeries[];
	windowDays?: number;
	variant?: "area" | "bar";
	className?: string;
}) {
	const { data, isPending } = useActivities();
	const activities = data?.activities ?? [];
	const { end } = useWindowNav();

	const rows = useMemo(() => {
		const labels = dayLabels(end);
		const cols = series.map((s) =>
			rolling(activities, s.contribution, windowDays, end),
		);
		return labels.map((date, i) => {
			const row: Record<string, string | number> = { date };
			series.forEach((s, si) => {
				row[s.key] = cols[si][i];
			});
			return row;
		});
	}, [activities, series, windowDays, end]);

	const config = useMemo(
		() =>
			Object.fromEntries(
				series.map((s) => [s.key, { label: s.label, color: s.color }]),
			) satisfies ChartConfig,
		[series],
	);

	const usesRight = series.some((s) => s.axis === "right");
	const hasData = rows.some((r) => series.some((s) => Number(r[s.key]) > 0));
	const animate = useInitialAnimation(hasData);
	const current = (s: LoadSeries) =>
		rows.length ? rows[rows.length - 1][s.key] : null;

	const badges = (
		<div className="flex gap-1.5">
			{series.map((s) => (
				<Badge
					key={s.key}
					variant="outline"
					style={{ color: s.color, borderColor: s.color }}
				>
					{current(s) ?? "—"} {s.unit} / {windowDays}d
				</Badge>
			))}
		</div>
	);

	return (
		<Panel title={title} action={badges} className={className}>
			<PanelBody
				isPending={isPending}
				isEmpty={!hasData}
				emptyText={`Nothing in the last ${SPAN_DAYS} days.`}
			>
				<ChartContainer config={config} className="aspect-auto h-full w-full">
					<ComposedChart data={rows} margin={{ top: 6, right: 0, left: 0 }}>
						<defs>
							{series.map((s) => (
								<linearGradient
									key={s.key}
									id={`fill-${s.key}`}
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
									<stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
								</linearGradient>
							))}
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="date"
							interval={4}
							tickLine={false}
							axisLine={false}
							tickMargin={6}
						/>
						<YAxis
							yAxisId="left"
							width={32}
							tickLine={false}
							axisLine={false}
						/>
						{usesRight && (
							<YAxis
								yAxisId="right"
								orientation="right"
								width={38}
								tickLine={false}
								axisLine={false}
							/>
						)}
						<ChartTooltip content={<ChartTooltipContent />} />
						{series.map((s) =>
							variant === "bar" ? (
								<Bar
									key={s.key}
									yAxisId={s.axis}
									dataKey={s.key}
									fill={`url(#fill-${s.key})`}
									stroke={s.color}
									radius={[2, 2, 0, 0]}
									isAnimationActive={animate}
								/>
							) : (
								<Area
									key={s.key}
									yAxisId={s.axis}
									type="monotone"
									dataKey={s.key}
									stroke={s.color}
									strokeWidth={2}
									fill={`url(#fill-${s.key})`}
									dot={false}
									activeDot={{ r: 3 }}
									isAnimationActive={animate}
								/>
							),
						)}
					</ComposedChart>
				</ChartContainer>
			</PanelBody>
		</Panel>
	);
}

const RUNNING_SERIES: LoadSeries[] = [
	{
		key: "km",
		label: "Distance",
		unit: "km",
		color: categoryColor.running,
		axis: "left",
		contribution: (a) =>
			a.activity_type?.includes("running") && num(a.distance_m)
				? num(a.distance_m) / 1000
				: null,
	},
	{
		key: "vert",
		label: "Vertical",
		unit: "m",
		color: "#D27E99",
		axis: "right",
		contribution: (a) =>
			a.activity_type?.includes("running") && num(a.elevation_gain_m)
				? num(a.elevation_gain_m)
				: null,
	},
];

const EFFORT_SERIES: LoadSeries[] = [
	{
		key: "climbing",
		label: "Climbing",
		unit: "h",
		color: categoryColor.climbing,
		axis: "left",
		contribution: (a) =>
			categoryOf(a.activity_type, a.subtype) === "climbing"
				? num(a.duration_s) / 3600
				: null,
	},
	{
		key: "weights",
		label: "Weights",
		unit: "h",
		color: categoryColor.strength,
		axis: "left",
		contribution: (a) =>
			categoryOf(a.activity_type, a.subtype) === "strength"
				? num(a.duration_s) / 3600
				: null,
	},
];

const sleepConfig = {
	awake: { label: "Awake", color: SLEEP_COLORS.awake },
	light: { label: "Light", color: SLEEP_COLORS.light },
	rem: { label: "REM", color: SLEEP_COLORS.rem },
	deep: { label: "Deep", color: SLEEP_COLORS.deep },
	score: { label: "Score", color: SLEEP_COLORS.score },
} satisfies ChartConfig;

// Stages stacked bottom → top as filled bands; score overlaid on its own axis.
const STAGE_ORDER = ["awake", "light", "rem", "deep"] as const;

function SleepPanel() {
	const { data, isPending } = useSleep(HISTORY_DAYS);
	const win = useWindowNav();
	const rows = useMemo(
		() =>
			[...(data?.sleep ?? [])]
				.filter((n) => inWindow(n.calendar_date, win))
				.reverse()
				.map((n) => ({
					date: n.calendar_date.slice(5),
					fullDate: n.calendar_date,
					awake: +(num(n.awake_s) / 3600).toFixed(2),
					light: +(num(n.light_sleep_s) / 3600).toFixed(2),
					rem: +(num(n.rem_sleep_s) / 3600).toFixed(2),
					deep: +(num(n.deep_sleep_s) / 3600).toFixed(2),
					score: n.sleep_score == null ? null : num(n.sleep_score),
				})),
		[data, win],
	);
	const animate = useInitialAnimation(rows.length > 0);

	const legend = (
		<div className="text-muted-foreground flex items-center gap-3 text-xs">
			{[...STAGE_ORDER].reverse().map((k) => (
				<span key={k} className="flex items-center gap-1">
					<span
						className="size-2 rounded-[2px]"
						style={{ backgroundColor: SLEEP_COLORS[k] }}
					/>
					{sleepConfig[k].label}
				</span>
			))}
			<span className="flex items-center gap-1">
				<span
					className="size-2 rounded-full"
					style={{ backgroundColor: SLEEP_COLORS.score }}
				/>
				Score
			</span>
		</div>
	);

	return (
		<Panel
			title="Sleep"
			action={legend}
			className="h-[280px] md:h-full md:flex-1"
		>
			<PanelBody
				isPending={isPending}
				isEmpty={rows.length === 0}
				emptyText="No sleep synced yet."
			>
				<ChartContainer
					config={sleepConfig}
					className="aspect-auto h-full w-full"
				>
					<ComposedChart data={rows} margin={{ top: 6, right: 0, left: 0 }}>
						<defs>
							{STAGE_ORDER.map((k) => (
								<linearGradient
									key={k}
									id={`fill-sleep-${k}`}
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="0%"
										stopColor={SLEEP_COLORS[k]}
										stopOpacity={0.55}
									/>
									<stop
										offset="100%"
										stopColor={SLEEP_COLORS[k]}
										stopOpacity={0.15}
									/>
								</linearGradient>
							))}
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="date"
							interval={2}
							tickLine={false}
							axisLine={false}
							tickMargin={6}
						/>
						<YAxis
							yAxisId="hours"
							width={28}
							tickLine={false}
							axisLine={false}
							unit="h"
						/>
						<YAxis yAxisId="score" hide domain={[0, 100]} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									formatter={(value, name) => {
										const key = String(name);
										const cfg = sleepConfig[key as keyof typeof sleepConfig];
										const text =
											key === "score"
												? String(value)
												: fmtDuration(Number(value) * 3600);
										return (
											<TooltipItem
												color={cfg?.color}
												label={cfg?.label ?? key}
												value={text}
											/>
										);
									}}
								/>
							}
						/>
						{STAGE_ORDER.map((k) => (
							<Area
								key={k}
								yAxisId="hours"
								type="monotone"
								stackId="stages"
								dataKey={k}
								stroke={SLEEP_COLORS[k]}
								strokeWidth={1.5}
								fill={`url(#fill-sleep-${k})`}
								dot={false}
								activeDot={{ r: 2 }}
								isAnimationActive={animate}
							/>
						))}
						<Line
							yAxisId="score"
							type="monotone"
							dataKey="score"
							stroke={SLEEP_COLORS.score}
							strokeWidth={2}
							dot={{ r: 2 }}
							connectNulls
							isAnimationActive={animate}
						/>
					</ComposedChart>
				</ChartContainer>
			</PanelBody>
		</Panel>
	);
}

const hrvConfig = {
	lastNight: { label: "Last night", color: HRV_COLORS.lastNight },
	weekly: { label: "Weekly avg", color: HRV_COLORS.weekly },
	baseline: { label: "Balanced range", color: HRV_COLORS.baseline },
} satisfies ChartConfig;

function HrvPanel() {
	const { data, isPending } = useHrv(HISTORY_DAYS);
	const win = useWindowNav();
	const rows = useMemo(
		() =>
			[...(data?.daily_hrv ?? [])]
				.filter((d) => inWindow(d.calendar_date, win))
				.reverse()
				.map((d) => ({
					date: d.calendar_date.slice(5),
					fullDate: d.calendar_date,
					lastNight: d.last_night_avg == null ? null : num(d.last_night_avg),
					weekly: d.weekly_avg == null ? null : num(d.weekly_avg),
					baseline:
						d.baseline_balanced_low == null || d.baseline_balanced_upper == null
							? null
							: [num(d.baseline_balanced_low), num(d.baseline_balanced_upper)],
				})),
		[data, win],
	);
	const animate = useInitialAnimation(rows.length > 0);

	const legend = (
		<div className="text-muted-foreground flex items-center gap-3 text-xs">
			<span className="flex items-center gap-1">
				<span
					className="size-2 rounded-[2px]"
					style={{ backgroundColor: HRV_COLORS.baseline }}
				/>
				Balanced range
			</span>
			<span className="flex items-center gap-1">
				<span
					className="size-2 rounded-full"
					style={{ backgroundColor: HRV_COLORS.lastNight }}
				/>
				Last night
			</span>
			<span className="flex items-center gap-1">
				<span
					className="size-2 rounded-full"
					style={{ backgroundColor: HRV_COLORS.weekly }}
				/>
				Weekly avg
			</span>
		</div>
	);

	return (
		<Panel
			title="HRV"
			action={legend}
			className="h-[280px] md:h-full md:flex-1"
		>
			<PanelBody
				isPending={isPending}
				isEmpty={rows.length === 0}
				emptyText="No HRV synced yet."
			>
				<ChartContainer
					config={hrvConfig}
					className="aspect-auto h-full w-full"
				>
					<ComposedChart data={rows} margin={{ top: 6, right: 0, left: 0 }}>
						<defs>
							<linearGradient
								id="fill-hrv-baseline"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor={HRV_COLORS.baseline}
									stopOpacity={0.3}
								/>
								<stop
									offset="100%"
									stopColor={HRV_COLORS.baseline}
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="date"
							interval={2}
							tickLine={false}
							axisLine={false}
							tickMargin={6}
						/>
						<YAxis
							width={40}
							tickLine={false}
							axisLine={false}
							domain={["dataMin - 10", "dataMax + 10"]}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									formatter={(value, name) => {
										const cfg = hrvConfig[name as keyof typeof hrvConfig];
										const text = Array.isArray(value)
											? `${value[0]}\u2013${value[1]} ms`
											: `${String(value)} ms`;
										return (
											<TooltipItem
												color={cfg?.color}
												label={cfg?.label ?? String(name)}
												value={text}
											/>
										);
									}}
								/>
							}
						/>
						<Area
							type="monotone"
							dataKey="baseline"
							stroke="none"
							fill="url(#fill-hrv-baseline)"
							connectNulls
							dot={false}
							activeDot={false}
							isAnimationActive={animate}
						/>
						<Line
							type="monotone"
							dataKey="weekly"
							stroke={HRV_COLORS.weekly}
							strokeWidth={2}
							strokeDasharray="4 3"
							dot={false}
							connectNulls
							isAnimationActive={animate}
						/>
						<Line
							type="monotone"
							dataKey="lastNight"
							stroke={HRV_COLORS.lastNight}
							strokeWidth={2}
							dot={{ r: 2 }}
							connectNulls
							isAnimationActive={animate}
						/>
					</ComposedChart>
				</ChartContainer>
			</PanelBody>
		</Panel>
	);
}

const readinessConfig = {
	score: { label: "Readiness", color: READINESS_COLORS.score },
	acuteLoad: { label: "Acute load", color: READINESS_COLORS.acuteLoad },
	recovery: { label: "Recovery", color: READINESS_COLORS.recovery },
	stress: { label: "Stress hist.", color: READINESS_COLORS.stress },
	sleepHistory: { label: "Sleep hist.", color: READINESS_COLORS.sleepHistory },
} satisfies ChartConfig;

// Score is the headline; the rest are 0-100 factor percentages except acute
// load, which rides its own right axis.
const READINESS_FACTORS = ["recovery", "stress", "sleepHistory"] as const;
const READINESS_LEGEND = ["score", "acuteLoad", ...READINESS_FACTORS] as const;

function ReadinessPanel() {
	const { data, isPending } = useReadiness(HISTORY_DAYS);
	const win = useWindowNav();
	const rows = useMemo(() => {
		const seen = new Set<string>();
		const daily = [];
		for (const r of data?.training_readiness ?? []) {
			if (seen.has(r.calendar_date)) continue;
			seen.add(r.calendar_date);
			if (inWindow(r.calendar_date, win)) daily.push(r);
		}
		return daily.reverse().map((r) => ({
			date: r.calendar_date.slice(5),
			fullDate: r.calendar_date,
			level: r.level,
			score: r.score == null ? null : num(r.score),
			acuteLoad: r.acute_load == null ? null : num(r.acute_load),
			recovery:
				r.recovery_time_factor_percent == null
					? null
					: num(r.recovery_time_factor_percent),
			stress:
				r.stress_history_factor_percent == null
					? null
					: num(r.stress_history_factor_percent),
			sleepHistory:
				r.sleep_history_factor_percent == null
					? null
					: num(r.sleep_history_factor_percent),
		}));
	}, [data, win]);
	const animate = useInitialAnimation(rows.length > 0);

	const legend = (
		<div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
			{READINESS_LEGEND.map((k) => (
				<span key={k} className="flex items-center gap-1">
					<span
						className="size-2 rounded-full"
						style={{ backgroundColor: READINESS_COLORS[k] }}
					/>
					{readinessConfig[k].label}
				</span>
			))}
		</div>
	);

	return (
		<Panel
			title="Training readiness"
			action={legend}
			className="h-[320px] md:h-full md:flex-1"
		>
			<PanelBody
				isPending={isPending}
				isEmpty={rows.length === 0}
				emptyText="No training readiness synced yet."
			>
				<ChartContainer
					config={readinessConfig}
					className="aspect-auto h-full w-full"
				>
					<ComposedChart data={rows} margin={{ top: 6, right: 0, left: 0 }}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="date"
							interval={2}
							tickLine={false}
							axisLine={false}
							tickMargin={6}
						/>
						<YAxis
							yAxisId="pct"
							width={34}
							tickLine={false}
							axisLine={false}
							domain={[0, 100]}
						/>
						<YAxis
							yAxisId="load"
							orientation="right"
							width={34}
							tickLine={false}
							axisLine={false}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									formatter={(value, name) => {
										const key = String(name);
										const cfg =
											readinessConfig[key as keyof typeof readinessConfig];
										const text =
											key === "score" || key === "acuteLoad"
												? String(value)
												: `${String(value)}%`;
										return (
											<TooltipItem
												color={cfg?.color}
												label={cfg?.label ?? key}
												value={text}
											/>
										);
									}}
								/>
							}
						/>
						{READINESS_FACTORS.map((k) => (
							<Line
								key={k}
								yAxisId="pct"
								type="monotone"
								dataKey={k}
								stroke={READINESS_COLORS[k]}
								strokeWidth={1.25}
								strokeOpacity={0.7}
								dot={false}
								connectNulls
								isAnimationActive={animate}
							/>
						))}
						<Line
							yAxisId="load"
							type="monotone"
							dataKey="acuteLoad"
							stroke={READINESS_COLORS.acuteLoad}
							strokeWidth={2}
							strokeDasharray="4 3"
							dot={false}
							connectNulls
							isAnimationActive={animate}
						/>
						<Line
							yAxisId="pct"
							type="monotone"
							dataKey="score"
							stroke={READINESS_COLORS.score}
							strokeWidth={2.5}
							dot={{ r: 2 }}
							connectNulls
							isAnimationActive={animate}
						/>
					</ComposedChart>
				</ChartContainer>
			</PanelBody>
		</Panel>
	);
}

// A slice of the calendar page pinned to the real current week (Mon–Sun).
// Deliberately ignores WindowNav: this is a fixed "this week" snapshot.
function WeekPanel({ className }: { className?: string }) {
	const { data, isPending } = useActivities();
	const { data: workouts } = useAllPlanWorkoutsQuery();
	const activities = data?.activities ?? [];
	const weekStart = useMemo(() => startOfWeek(new Date()), []);
	const workoutsByWeekDay = useMemo(
		() => indexWorkouts(workouts ?? []),
		[workouts],
	);

	const byDay = useMemo(() => {
		const map = new Map<string, CalendarActivity[]>();
		const startKey = dayKey(weekStart);
		const endKey = dayKey(addDays(weekStart, 6));
		for (const a of activities) {
			if (!a.start_time) continue;
			const key = dayKey(new Date(a.start_time));
			if (key < startKey || key > endKey) continue;
			(map.get(key) ?? map.set(key, []).get(key))?.push(a);
		}
		return map;
	}, [activities, weekStart]);

	const totals = useMemo(
		() => computeWeekTotals(activities).get(dayKey(weekStart)),
		[activities, weekStart],
	);

	const summary = (
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-1.5">
				<categoryIcon.running
					size={12}
					className="shrink-0"
					style={{ color: categoryColor.running }}
				/>
				<span
					className={cn(
						"text-xs font-semibold",
						!totals?.runKm && "text-muted-foreground font-normal",
					)}
				>
					{(totals?.runKm ?? 0).toFixed(1)} km
				</span>
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

	return (
		<Panel
			title="This week"
			action={summary}
			showNav={false}
			className={className}
		>
			<PanelBody
				isPending={isPending}
				isEmpty={false}
				emptyText="Nothing this week."
			>
				<WeekStrip
					weekStart={weekStart}
					byDay={byDay}
					workoutsByWeekDay={workoutsByWeekDay}
				/>
			</PanelBody>
		</Panel>
	);
}

// Each row is one third of the window on md+, so panels stay a uniform,
// window-proportional height and the page simply scrolls as rows are added.
const ROW = "md:h-[calc((100svh-4rem)/3)] md:min-h-[260px]";

export function Overview() {
	return (
		<WindowNavProvider>
			<OverviewPanels />
		</WindowNavProvider>
	);
}

function OverviewPanels() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<div className={cn("flex flex-col gap-4 md:flex-row", ROW)}>
				<WeekPanel className="h-[280px] md:h-full md:flex-1" />
			</div>
			<div className={cn("flex flex-col gap-4 md:flex-row", ROW)}>
				<LoadPanel
					title="Running load"
					series={RUNNING_SERIES}
					className="h-[280px] md:h-full md:flex-[2]"
				/>
				<LoadPanel
					title="Climbing & weights load"
					series={EFFORT_SERIES}
					className="h-[280px] md:h-full md:flex-1"
				/>
			</div>
			<div className={cn("flex flex-col gap-4 md:flex-row", ROW)}>
				<SleepPanel />
				<HrvPanel />
			</div>
			<div className={cn("flex flex-col gap-4 md:flex-row", ROW)}>
				<ReadinessPanel />
			</div>
			<div className={cn("flex flex-col gap-4 md:flex-row", ROW)}>
				<LoadPanel
					title="Daily running"
					series={RUNNING_SERIES}
					windowDays={1}
					className="h-[280px] md:h-full md:flex-1"
				/>
			</div>
		</div>
	);
}
