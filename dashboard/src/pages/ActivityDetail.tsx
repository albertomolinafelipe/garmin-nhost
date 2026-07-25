import { useMemo } from "react";
import {
	Bolt,
	Clock3,
	Flame,
	Gauge,
	Heart,
	Mountain,
	Route,
} from "lucide-react";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link, useParams } from "react-router-dom";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { categoryColor, categoryOf, typeLabel } from "@/lib/activity-types";
import { fmtDate, fmtDistance, fmtDuration } from "@/lib/format";
import {
	type ActivityDetail as Activity,
	type StreamSample,
	num,
	useActivity,
} from "@/lib/queries";

const HR = "#E46876";
const ELEVATION = "#7AA89F";

function formatPace(speed: number): string {
	if (!speed) return "—";
	const seconds = 1000 / speed;
	const minutes = Math.floor(seconds / 60);
	return `${minutes}:${String(Math.round(seconds % 60)).padStart(2, "0")} /km`;
}

function elapsed(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return hours ? `${hours}:${String(minutes).padStart(2, "0")}` : `${minutes}m`;
}

interface Metric {
	label: string;
	value: string;
	icon: typeof Route;
}

function Metrics({ activity }: { activity: Activity }) {
	const metrics = (
		[
			num(activity.distance_m)
				? {
						label: "Distance",
						value: fmtDistance(num(activity.distance_m)),
						icon: Route,
					}
				: null,
			num(activity.duration_s)
				? {
						label: "Duration",
						value: fmtDuration(num(activity.duration_s)),
						icon: Clock3,
					}
				: null,
			num(activity.avg_speed_mps)
				? {
						label: "Average pace",
						value: formatPace(num(activity.avg_speed_mps)),
						icon: Gauge,
					}
				: null,
			activity.avg_hr
				? { label: "Average HR", value: `${activity.avg_hr} bpm`, icon: Heart }
				: null,
			activity.max_hr
				? { label: "Maximum HR", value: `${activity.max_hr} bpm`, icon: Heart }
				: null,
			num(activity.elevation_gain_m)
				? {
						label: "Elevation gain",
						value: `${Math.round(num(activity.elevation_gain_m))} m`,
						icon: Mountain,
					}
				: null,
			activity.calories
				? { label: "Calories", value: `${activity.calories} kcal`, icon: Flame }
				: null,
			num(activity.avg_power_w)
				? {
						label: "Average power",
						value: `${Math.round(num(activity.avg_power_w))} W`,
						icon: Bolt,
					}
				: null,
		] satisfies (Metric | null)[]
	).filter((metric): metric is Metric => metric !== null);

	const color =
		categoryColor[categoryOf(activity.activity_type, activity.subtype)];
	return (
		<div className="grid w-full grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
			{metrics.map((metric) => (
				<div key={metric.label} className="flex min-w-0 items-center gap-3">
					<div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
						<metric.icon className="size-5" style={{ color }} />
					</div>
					<div className="min-w-0">
						<div className="truncate font-semibold tabular-nums">
							{metric.value}
						</div>
						<div className="text-muted-foreground truncate text-xs">
							{metric.label}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function RouteMap({ track }: { track: { lat: number; lng: number }[] }) {
	const positions: LatLngExpression[] = track.map((point) => [
		point.lat,
		point.lng,
	]);
	const bounds = positions as LatLngBoundsExpression;

	return (
		<Card className="gap-3 overflow-hidden py-4">
			<CardHeader className="px-4">
				<CardTitle className="text-sm">Route</CardTitle>
			</CardHeader>
			<CardContent className="px-4">
				<div className="overflow-hidden rounded-lg border">
					<MapContainer
						bounds={bounds}
						boundsOptions={{ padding: [20, 20] }}
						scrollWheelZoom={false}
						attributionControl={false}
						className="route-map"
						style={{ height: 280, width: "100%" }}
					>
						<TileLayer
							url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
							subdomains="abcd"
							className="route-map-basemap"
							opacity={0.68}
							zIndex={1}
						/>
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}"
							className="route-map-hillshade"
							opacity={0.28}
							zIndex={2}
						/>
						<Polyline
							positions={positions}
							pathOptions={{ color: "#7FB4CA", weight: 4, opacity: 0.9 }}
						/>
					</MapContainer>
				</div>
			</CardContent>
		</Card>
	);
}

function mergeStreams(hr: StreamSample[], elevation: StreamSample[]) {
	const points = new Map<
		number,
		{ t: number; hr?: number; elevation?: number }
	>();
	for (const sample of hr) points.set(sample.t, { t: sample.t, hr: sample.v });
	for (const sample of elevation) {
		const point = points.get(sample.t) ?? { t: sample.t };
		point.elevation = sample.v;
		points.set(sample.t, point);
	}
	return [...points.values()].sort((a, b) => a.t - b.t);
}

const streamConfig = {
	hr: { label: "Heart rate", color: HR },
	elevation: { label: "Elevation", color: ELEVATION },
} satisfies ChartConfig;

function StreamChart({
	hr,
	elevation,
}: {
	hr: StreamSample[];
	elevation: StreamSample[];
}) {
	const rows = useMemo(() => mergeStreams(hr, elevation), [hr, elevation]);
	const hasHr = hr.length > 0;
	const hasElevation = elevation.length > 0;
	return (
		<Card className="gap-3 py-4">
			<CardHeader className="px-4">
				<CardTitle className="text-sm">
					{hasElevation ? "Heart rate & elevation" : "Heart rate"}
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[296px] px-4 pb-1">
				<ChartContainer
					config={streamConfig}
					className="aspect-auto h-full w-full"
				>
					<ComposedChart data={rows} margin={{ top: 5, right: 2, left: 0 }}>
						<defs>
							<linearGradient
								id="activity-elevation"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop offset="0%" stopColor={ELEVATION} stopOpacity={0.35} />
								<stop offset="100%" stopColor={ELEVATION} stopOpacity={0.03} />
							</linearGradient>
							<linearGradient id="activity-hr" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor={HR} stopOpacity={0.3} />
								<stop offset="100%" stopColor={HR} stopOpacity={0.03} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="t"
							tickFormatter={elapsed}
							tickLine={false}
							axisLine={false}
							minTickGap={35}
						/>
						<YAxis
							yAxisId="hr"
							width={34}
							tickLine={false}
							axisLine={false}
							hide={!hasHr}
						/>
						<YAxis
							yAxisId="elevation"
							orientation="right"
							width={38}
							tickLine={false}
							axisLine={false}
							hide={!hasElevation}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(value) => elapsed(Number(value))}
								/>
							}
						/>
						{hasElevation && (
							<Area
								yAxisId="elevation"
								type="monotone"
								dataKey="elevation"
								stroke={ELEVATION}
								fill="url(#activity-elevation)"
								dot={false}
								connectNulls
							/>
						)}
						{hasHr &&
							(hasElevation ? (
								<Line
									yAxisId="hr"
									type="monotone"
									dataKey="hr"
									stroke={HR}
									strokeWidth={2}
									dot={false}
									connectNulls
								/>
							) : (
								<Area
									yAxisId="hr"
									type="monotone"
									dataKey="hr"
									stroke={HR}
									fill="url(#activity-hr)"
									strokeWidth={2}
									dot={false}
									connectNulls
								/>
							))}
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

function AnnotationSummary({ activity }: { activity: Activity }) {
	const details = [
		activity.feeling && ["Feeling", `${activity.feeling} / 5`],
		activity.effort && ["Effort", `${activity.effort} / 5`],
		activity.focus && ["Focus", activity.focus],
		activity.weather && ["Weather", activity.weather],
		activity.caffeine && ["Caffeine", activity.caffeine],
		activity.hard_tries != null && ["Hard tries", String(activity.hard_tries)],
	].filter((item): item is string[] => Boolean(item));
	const foods = [
		...(activity.food_during ?? []),
		...(activity.food_after ?? []),
	];
	if (!details.length && !foods.length && !activity.notes) return null;

	return (
		<Card className="gap-4 py-4">
			<CardHeader className="px-4">
				<CardTitle className="text-sm">Notes & annotations</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 px-4">
				{details.length > 0 && (
					<div className="grid gap-4 sm:grid-cols-3">
						{details.map(([label, value]) => (
							<div key={label}>
								<div className="font-medium">{value}</div>
								<div className="text-muted-foreground text-xs">{label}</div>
							</div>
						))}
					</div>
				)}
				{foods.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{foods.map((food) => (
							<Badge key={food} variant="secondary">
								{food}
							</Badge>
						))}
					</div>
				)}
				{activity.notes && (
					<p className="text-muted-foreground whitespace-pre-wrap text-sm">
						{activity.notes}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

export function ActivityDetail() {
	const { id } = useParams();
	const { data: activity, isPending, isError } = useActivity(id);

	if (isPending)
		return (
			<div className="text-muted-foreground flex h-full items-center justify-center text-sm">
				Loading activity…
			</div>
		);
	if (isError || !activity)
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4">
				<p className="text-muted-foreground text-sm">Activity not found.</p>
				<Button variant="outline" asChild>
					<Link to="/activities">Back to activities</Link>
				</Button>
			</div>
		);

	const category = categoryOf(activity.activity_type, activity.subtype);
	const payload = activity.activity_streams[0]?.payload ?? {};
	const hr = payload.hr ?? [];
	const elevation = payload.elevation ?? [];
	const track = payload.track ?? [];
	const hasChart = hr.length > 0 || elevation.length > 0;

	return (
		<div className="space-y-4 p-4">
			<div className="grid gap-4 lg:grid-cols-3">
				<Card
					className="justify-center gap-3 border-l-4 py-4 lg:col-span-1"
					style={{ borderLeftColor: categoryColor[category] }}
				>
					<CardHeader className="px-4">
						<CardTitle className="text-xl">
							{activity.name ?? "Untitled activity"}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-wrap items-center gap-2 px-4">
						<span className="text-muted-foreground text-sm">
							{fmtDate(activity.start_time)}
						</span>
						<Badge variant="outline">
							{typeLabel(activity.activity_type, activity.subtype)}
						</Badge>
					</CardContent>
				</Card>
				<Card className="justify-center py-4 lg:col-span-2">
					<CardContent className="flex items-center px-4">
						<Metrics activity={activity} />
					</CardContent>
				</Card>
			</div>
			{(track.length > 1 || hasChart) && (
				<div className="grid gap-4 lg:grid-cols-2">
					{track.length > 1 && <RouteMap track={track} />}
					{hasChart && <StreamChart hr={hr} elevation={elevation} />}
				</div>
			)}
			<AnnotationSummary activity={activity} />
		</div>
	);
}
