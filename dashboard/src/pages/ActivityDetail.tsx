import { useEffect, useMemo, useRef, useState } from "react";
import {
	Bolt,
	Check,
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
import { CircleMarker, MapContainer, Polyline, TileLayer } from "react-leaflet";
import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "recharts";

import { ClimbingAnnotation } from "@/components/annotations/ClimbingAnnotation";
import { RunningAnnotation } from "@/components/annotations/RunningAnnotation";
import { StrengthAnnotation } from "@/components/annotations/StrengthAnnotation";
import { useAnnotationSave } from "@/components/annotations/use-annotation-save";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useFoodOptionsQuery } from "@/graphql/hooks";
import {
	categoryColor,
	categoryOf,
	needsAnnotation,
	typeLabel,
} from "@/lib/activity-types";
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

function RouteMap({
	track,
	marker,
}: {
	track: { lat: number; lng: number }[];
	marker?: { lat: number; lng: number } | null;
}) {
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
				<div className="isolate overflow-hidden rounded-lg border">
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
						{marker && (
							<CircleMarker
								center={[marker.lat, marker.lng]}
								radius={6}
								pathOptions={{
									color: "#fff",
									weight: 2,
									fillColor: "#E46876",
									fillOpacity: 1,
								}}
							/>
						)}
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
	onHover,
}: {
	hr: StreamSample[];
	elevation: StreamSample[];
	onHover?: (t: number | null) => void;
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
					<ComposedChart
						data={rows}
						margin={{ top: 5, right: 2, left: 0 }}
						onMouseMove={(state) => {
							const label = state?.activeLabel;
							onHover?.(label == null ? null : Number(label));
						}}
						onMouseLeave={() => onHover?.(null)}
					>
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
									hideLabel
									formatter={(value, name) => {
										if (value == null || Number.isNaN(Number(value)))
											return null;
										const isHr = name === "hr" || name === "Heart rate";
										return (
											<div className="flex w-full items-center justify-between gap-4">
												<span className="text-muted-foreground">
													{isHr ? "Heart rate" : "Elevation"}
												</span>
												<span className="text-foreground font-mono font-medium tabular-nums">
													{Math.round(Number(value))} {isHr ? "bpm" : "m"}
												</span>
											</div>
										);
									}}
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

function EditableName({
	activity,
	onSave,
}: {
	activity: Activity;
	onSave: ReturnType<typeof useAnnotationSave>;
}) {
	const [name, setName] = useState(activity.name ?? "");
	const dirty = useRef(false);

	useEffect(() => {
		if (!dirty.current) setName(activity.name ?? "");
	}, [activity.name]);

	const isDirty = name !== (activity.name ?? "");
	const confirm = async () => {
		if (!isDirty) return;
		const saved = await onSave({ name: name.trim() ? name : null });
		if (saved) dirty.current = false;
	};

	return (
		<div className="flex min-w-0 items-center gap-2">
			<Input
				aria-label="Activity name"
				className="h-auto border-0 px-0 text-xl font-semibold shadow-none focus-visible:ring-0 md:text-xl"
				value={name}
				placeholder="Activity name"
				onChange={(event) => {
					dirty.current = true;
					setName(event.target.value);
				}}
				onKeyDown={(event) => {
					if (event.key === "Enter") void confirm();
				}}
			/>
			{isDirty && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					aria-label="Confirm name"
					onClick={() => void confirm()}
				>
					<Check />
				</Button>
			)}
		</div>
	);
}

export function ActivityDetail() {
	const { id } = useParams();
	const { data: activity, isPending, isError } = useActivity(id);
	const foodOptions =
		useFoodOptionsQuery().data?.food_options.flatMap((option) =>
			option.value == null ? [] : [option.value],
		) ?? [];
	const save = useAnnotationSave(id ?? "");
	const [hoverT, setHoverT] = useState<number | null>(null);
	const [asClimbing, setAsClimbing] = useState(false);

	useEffect(() => setAsClimbing(false), [id]);

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

	// Track points carry no timestamps, so approximate the hovered fix by mapping
	// the hovered elapsed time onto the uniformly-thinned track by fraction.
	const maxT = Math.max(hr.at(-1)?.t ?? 0, elevation.at(-1)?.t ?? 0);
	const hoverMarker =
		hoverT != null && track.length > 0 && maxT > 0
			? track[
					Math.min(
						track.length - 1,
						Math.max(0, Math.round((hoverT / maxT) * (track.length - 1))),
					)
				]
			: null;

	return (
		<div className="space-y-4 p-4">
			<div className="grid gap-4 lg:grid-cols-3">
				<Card
					className="justify-center gap-3 border-l-4 py-4 lg:col-span-1"
					style={{ borderLeftColor: categoryColor[category] }}
				>
					<CardHeader className="px-4">
						<CardTitle>
							<EditableName
								key={String(activity.id)}
								activity={activity}
								onSave={save}
							/>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-wrap items-center gap-2 px-4">
						<span className="text-muted-foreground text-sm">
							{fmtDate(activity.start_time)}
						</span>
						<Badge variant="outline">
							{typeLabel(activity.activity_type, activity.subtype)}
						</Badge>
						{needsAnnotation(activity) && (
							<Badge variant="secondary">needs annotation</Badge>
						)}
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
					{track.length > 1 && <RouteMap track={track} marker={hoverMarker} />}
					{hasChart && (
						<StreamChart hr={hr} elevation={elevation} onHover={setHoverT} />
					)}
				</div>
			)}
			<Card className="gap-4 py-4">
				<CardHeader className="flex-row items-center justify-between px-4">
					<CardTitle className="text-sm">Notes & annotations</CardTitle>
					{category === "strength" && !asClimbing && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setAsClimbing(true)}
						>
							Log as climbing
						</Button>
					)}
					{category === "strength" && asClimbing && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setAsClimbing(false)}
						>
							Cancel climbing
						</Button>
					)}
				</CardHeader>
				<CardContent className="px-4">
					{(() => {
						if (category === "running") {
							return (
								<RunningAnnotation
									activity={activity}
									foodOptions={foodOptions}
									onSave={save}
								/>
							);
						}
						if (category === "climbing" || asClimbing) {
							return <ClimbingAnnotation activity={activity} onSave={save} />;
						}
						if (category === "strength") {
							return <StrengthAnnotation activity={activity} onSave={save} />;
						}
						return (
							<p className="text-muted-foreground text-sm">
								No annotations for this activity type yet.
							</p>
						);
					})()}
				</CardContent>
			</Card>
		</div>
	);
}
