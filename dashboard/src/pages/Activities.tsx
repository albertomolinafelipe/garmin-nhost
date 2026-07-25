import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryColor, categoryOf, typeLabel } from "@/lib/activity-types";
import { fmtDate, fmtDistance, fmtDuration } from "@/lib/format";
import { num, useActivities } from "@/lib/queries";

export function Activities() {
	const navigate = useNavigate();
	const { data, isPending } = useActivities();
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
					<table className="w-full min-w-[760px] text-sm">
						<thead className="bg-card sticky top-0 z-10 border-b">
							<tr className="text-muted-foreground text-left">
								<th className="w-3 py-3" aria-label="Category" />
								<th className="px-4 py-3 font-medium">Date</th>
								<th className="px-4 py-3 font-medium">Name</th>
								<th className="px-4 py-3 font-medium">Type</th>
								<th className="px-4 py-3 text-right font-medium">Distance</th>
								<th className="px-4 py-3 text-right font-medium">Duration</th>
								<th className="px-4 py-3 text-right font-medium">Elevation</th>
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
											{fmtDate(activity.start_time)}
										</td>
										<td className="max-w-72 truncate px-4 py-3 font-medium">
											{activity.name ?? "—"}
										</td>
										<td className="px-4 py-3">
											{typeLabel(activity.activity_type, activity.subtype)}
										</td>
										<td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
											{fmtDistance(num(activity.distance_m))}
										</td>
										<td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
											{fmtDuration(num(activity.duration_s))}
										</td>
										<td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
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
