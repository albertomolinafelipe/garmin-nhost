import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	categoryColor,
	categoryOf,
	needsAnnotation,
	typeLabel,
} from "@/lib/activity-types";
import { fmtDay, fmtDistance, fmtDuration } from "@/lib/format";
import {
	num,
	raceForStartTime,
	useActivities,
	useRacesByDay,
} from "@/lib/queries";
import { raceIcon as RaceIcon } from "@/lib/plans";

export function Activities() {
	const navigate = useNavigate();
	const { data, isPending } = useActivities();
	const racesByDay = useRacesByDay();
	const [search, setSearch] = useState("");
	const activities = data?.activities ?? [];

	const filtered = useMemo(() => {
		const query = search.trim().toLocaleLowerCase();
		if (!query) return activities;

		return activities.filter((activity) => {
			const searchable = [
				activity.name,
				activity.activity_type,
				activity.subtype,
				typeLabel(activity.activity_type, activity.subtype),
				activity.start_time?.slice(0, 10),
			]
				.filter(Boolean)
				.join(" ")
				.toLocaleLowerCase();
			return searchable.includes(query);
		});
	}, [activities, search]);

	return (
		<div className="flex h-full min-h-0 flex-col gap-4 p-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Activities</h1>
					<p className="text-muted-foreground text-sm">
						{filtered.length} of {activities.length} activities
					</p>
				</div>
				<div className="relative w-full sm:max-w-sm">
					<Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
					<Input
						value={search}
						onChange={(event) => setSearch(event.currentTarget.value)}
						placeholder="Search activities…"
						aria-label="Search activities"
						className="pl-9"
					/>
				</div>
			</div>

			<Card className="min-h-0 flex-1 gap-0 overflow-hidden py-0">
				<CardContent className="h-full overflow-auto px-0">
					<table className="w-full text-sm">
						<thead className="bg-card sticky top-0 z-10 border-b">
							<tr className="text-muted-foreground text-left">
								<th className="w-3 py-3" aria-label="Category" />
								<th className="px-4 py-3 font-medium">Date</th>
								<th className="px-4 py-3 font-medium">Name</th>
								<th className="hidden px-4 py-3 font-medium md:table-cell">
									Type
								</th>
								<th className="hidden px-4 py-3 text-right font-medium md:table-cell">
									Distance
								</th>
								<th className="hidden px-4 py-3 text-right font-medium md:table-cell">
									Duration
								</th>
								<th className="hidden px-4 py-3 text-right font-medium md:table-cell">
									Elevation
								</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{filtered.map((activity) => {
								const category = categoryOf(
									activity.activity_type,
									activity.subtype,
								);
								return (
									<tr
										key={activity.id}
										className="hover:bg-muted/50 cursor-pointer transition-colors"
										tabIndex={0}
										onClick={() => navigate(`/activities/${activity.id}`)}
										onKeyDown={(event) => {
											if (event.key === "Enter" || event.key === " ") {
												navigate(`/activities/${activity.id}`);
											}
										}}
									>
										<td className="py-3">
											<div
												className="mx-auto h-6 w-1 rounded-full"
												style={{ backgroundColor: categoryColor[category] }}
											/>
										</td>
										<td className="text-muted-foreground whitespace-nowrap px-4 py-3">
											{fmtDay(activity.start_time)}
										</td>
										<td className="max-w-[60vw] px-4 py-3 font-medium md:max-w-72">
											<div className="flex min-w-0 items-center gap-2">
												<span className="truncate">{activity.name ?? "—"}</span>
												{raceForStartTime(racesByDay, activity.start_time) ? (
													<RaceIcon
														className="text-race size-4 shrink-0"
														aria-label="Race"
													/>
												) : null}
												{needsAnnotation(activity) ? (
													<Badge
														variant="outline"
														className="shrink-0 text-[10px]"
													>
														Needs annotation
													</Badge>
												) : null}
											</div>
										</td>
										<td className="hidden px-4 py-3 md:table-cell">
											{typeLabel(activity.activity_type, activity.subtype)}
										</td>
										<td className="hidden whitespace-nowrap px-4 py-3 text-right tabular-nums md:table-cell">
											{fmtDistance(num(activity.distance_m))}
										</td>
										<td className="hidden whitespace-nowrap px-4 py-3 text-right tabular-nums md:table-cell">
											{fmtDuration(num(activity.duration_s))}
										</td>
										<td className="hidden whitespace-nowrap px-4 py-3 text-right tabular-nums md:table-cell">
											{num(activity.elevation_gain_m)
												? `${Math.round(num(activity.elevation_gain_m))} m`
												: "—"}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{isPending && (
						<div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
							Loading activities…
						</div>
					)}
					{!isPending && filtered.length === 0 && (
						<div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
							{activities.length === 0
								? "No activities synced yet."
								: "No activities match your search."}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
