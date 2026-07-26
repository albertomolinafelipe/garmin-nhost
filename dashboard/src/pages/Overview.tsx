import { type ReactNode, useMemo } from "react";
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
import { categoryColor, categoryOf } from "@/lib/activity-types";
import { dayKey, fmtDuration } from "@/lib/format";
import {
	type CalendarActivity,
	num,
	useActivities,
	useHrv,
	useSleep,
} from "@/lib/queries";
import { cn } from "@/lib/utils";

const WINDOW_DAYS = 7; // trailing window each daily point aggregates
const SPAN_DAYS = 30; // how many days to plot

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
): number[] {
	const perDay = new Map<string, number>();
	for (const a of activities) {
		if (!a.start_time) continue;
		const v = contribution(a);
		if (v == null) continue;
		const key = a.start_time.slice(0, 10);
		perDay.set(key, (perDay.get(key) ?? 0) + v);
	}
	const today = new Date();
	const out: number[] = [];
	for (let i = SPAN_DAYS - 1; i >= 0; i--) {
		const day = new Date(today);
		day.setDate(today.getDate() - i);
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

function dayLabels(): string[] {
	const today = new Date();
	const labels: string[] = [];
	for (let i = SPAN_DAYS - 1; i >= 0; i--) {
		const day = new Date(today);
		day.setDate(today.getDate() - i);
		labels.push(dayKey(day).slice(5));
	}
	return labels;
}

function Panel({
	title,
	action,
	className,
	children,
}: {
	title: string;
	action?: ReactNode;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Card className={cn("min-h-0 gap-2 py-3", className)}>
			<CardHeader className="px-4">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{action ? <CardAction>{action}</CardAction> : null}
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

	const rows = useMemo(() => {
		const labels = dayLabels();
		const cols = series.map((s) =>
			rolling(activities, s.contribution, windowDays),
		);
		return labels.map((date, i) => {
			const row: Record<string, string | number> = { date };
			series.forEach((s, si) => {
				row[s.key] = cols[si][i];
			});
			return row;
		});
	}, [activities, series, windowDays]);

	const config = useMemo(
		() =>
			Object.fromEntries(
				series.map((s) => [s.key, { label: s.label, color: s.color }]),
			) satisfies ChartConfig,
		[series],
	);

	const usesRight = series.some((s) => s.axis === "right");
	const hasData = rows.some((r) => series.some((s) => Number(r[s.key]) > 0));
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
	const { data, isPending } = useSleep(SPAN_DAYS);
	const rows = useMemo(
		() =>
			[...(data?.sleep ?? [])].reverse().map((n) => ({
				date: n.calendar_date.slice(5),
				fullDate: n.calendar_date,
				awake: +(num(n.awake_s) / 3600).toFixed(2),
				light: +(num(n.light_sleep_s) / 3600).toFixed(2),
				rem: +(num(n.rem_sleep_s) / 3600).toFixed(2),
				deep: +(num(n.deep_sleep_s) / 3600).toFixed(2),
				score: n.sleep_score == null ? null : num(n.sleep_score),
			})),
		[data],
	);

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
	const { data, isPending } = useHrv(SPAN_DAYS);
	const rows = useMemo(
		() =>
			[...(data?.daily_hrv ?? [])].reverse().map((d) => ({
				date: d.calendar_date.slice(5),
				fullDate: d.calendar_date,
				lastNight: d.last_night_avg == null ? null : num(d.last_night_avg),
				weekly: d.weekly_avg == null ? null : num(d.weekly_avg),
				baseline:
					d.baseline_balanced_low == null || d.baseline_balanced_upper == null
						? null
						: [num(d.baseline_balanced_low), num(d.baseline_balanced_upper)],
			})),
		[data],
	);

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
						/>
						<Line
							type="monotone"
							dataKey="weekly"
							stroke={HRV_COLORS.weekly}
							strokeWidth={2}
							strokeDasharray="4 3"
							dot={false}
							connectNulls
						/>
						<Line
							type="monotone"
							dataKey="lastNight"
							stroke={HRV_COLORS.lastNight}
							strokeWidth={2}
							dot={{ r: 2 }}
							connectNulls
						/>
					</ComposedChart>
				</ChartContainer>
			</PanelBody>
		</Panel>
	);
}

// Each row is one third of the window on md+, so panels stay a uniform,
// window-proportional height and the page simply scrolls as rows are added.
const ROW = "md:h-[calc((100svh-4rem)/3)] md:min-h-[260px]";

export function Overview() {
	return (
		<div className="flex flex-col gap-4 p-4">
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
