import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarRange, Plus, Target, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
	useDeletePlanMutation,
	useInsertPlanMutation,
	usePlansQuery,
} from "@/graphql/hooks";
import { currentIsoWeek, isIsoWeek, planIsActive } from "@/lib/plans";
import { cn } from "@/lib/utils";

type Plan = {
	id: unknown;
	name: string;
	start_week: string;
	end_week: string;
	notes: string | null;
};

function CreatePlanForm({ onCreated }: { onCreated: () => void }) {
	const queryClient = useQueryClient();
	const insert = useInsertPlanMutation();
	const [month, setMonth] = useState<Date>(new Date());
	const [name, setName] = useState("");
	const [startWeek, setStartWeek] = useState("");
	const [endWeek, setEndWeek] = useState("");
	const [notes, setNotes] = useState("");

	const orderInvalid =
		isIsoWeek(startWeek) && isIsoWeek(endWeek) && endWeek < startWeek;
	const valid =
		name.trim() !== "" &&
		isIsoWeek(startWeek) &&
		isIsoWeek(endWeek) &&
		!orderInvalid;

	const create = async () => {
		if (!valid || insert.isPending) return;
		try {
			await insert.mutateAsync({
				object: {
					name: name.trim(),
					start_week: startWeek,
					end_week: endWeek,
					notes: notes.trim() || null,
				},
			});
			await queryClient.invalidateQueries({ queryKey: ["plans"] });
			onCreated();
		} catch {
			toast.error("Could not create the plan");
		}
	};

	return (
		<>
			<div className="flex-1 space-y-5 overflow-y-auto px-4">
				<div className="flex justify-center">
					<Calendar
						mode="single"
						ISOWeek
						showWeekNumber
						captionLayout="dropdown"
						month={month}
						onMonthChange={setMonth}
						className="rounded-lg border"
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="plan-name">Name</Label>
					<Input
						id="plan-name"
						value={name}
						placeholder="e.g. Base build 2026"
						disabled={insert.isPending}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="grid gap-2">
						<Label htmlFor="plan-start">Start week</Label>
						<Input
							id="plan-start"
							value={startWeek}
							placeholder="2026-W01"
							disabled={insert.isPending}
							onChange={(event) => setStartWeek(event.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="plan-end">End week</Label>
						<Input
							id="plan-end"
							value={endWeek}
							placeholder="2026-W04"
							disabled={insert.isPending}
							onChange={(event) => setEndWeek(event.target.value)}
						/>
					</div>
				</div>
				<p className="text-muted-foreground text-sm">
					Format: ISO year-week, e.g. <code>2026-W01</code>. Use the calendar
					above to look up week numbers.
				</p>
				{orderInvalid ? (
					<p className="text-destructive text-sm">
						End week must not be before the start week.
					</p>
				) : null}
				<div className="grid gap-2">
					<Label htmlFor="plan-notes">Notes</Label>
					<Textarea
						id="plan-notes"
						value={notes}
						placeholder="Optional"
						disabled={insert.isPending}
						onChange={(event) => setNotes(event.target.value)}
					/>
				</div>
			</div>
			<SheetFooter>
				<Button
					disabled={!valid || insert.isPending}
					onClick={() => void create()}
				>
					{insert.isPending ? "Creating…" : "Create plan"}
				</Button>
			</SheetFooter>
		</>
	);
}

function DeletePlanButton({
	plan,
	onDelete,
	className,
}: {
	plan: Plan;
	onDelete: () => void;
	className?: string;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={className}
					aria-label={`Delete ${plan.name}`}
					onClick={(event) => event.stopPropagation()}
				>
					<Trash2 className="size-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent onClick={(event) => event.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {plan.name}?</AlertDialogTitle>
					<AlertDialogDescription>
						This removes the plan and all its requirements and workouts.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function SelectedPlanPanel({
	plan,
	active,
}: {
	plan: Plan | null;
	active: boolean;
}) {
	if (!plan) {
		return (
			<div className="text-muted-foreground flex flex-1 items-center justify-center p-8 text-sm">
				Select a plan to see its details.
			</div>
		);
	}
	return (
		<div className="min-h-0 flex-1 overflow-y-auto p-6">
			<div className="flex items-start gap-4">
				<div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
					<Target className="size-6" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3 className="truncate text-xl font-semibold">{plan.name}</h3>
						{active ? <Badge variant="secondary">Active</Badge> : null}
					</div>
					<div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
						<CalendarRange className="size-4" />
						<span>
							{plan.start_week} – {plan.end_week}
						</span>
					</div>
				</div>
			</div>
			{plan.notes ? (
				<p className="text-muted-foreground mt-4 text-sm">{plan.notes}</p>
			) : null}
			<div className="text-muted-foreground mt-6 rounded-lg border border-dashed p-6 text-center text-sm">
				Weekly requirements and planned workouts will appear here.
			</div>
		</div>
	);
}

export function Plans() {
	const queryClient = useQueryClient();
	const plans = usePlansQuery();
	const remove = useDeletePlanMutation();
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const deletePlan = async (id: unknown, name: string) => {
		try {
			await remove.mutateAsync({ id });
			await queryClient.invalidateQueries({ queryKey: ["plans"] });
		} catch {
			toast.error(`Could not delete ${name}`);
		}
	};

	const week = currentIsoWeek();
	const all = plans.data ?? [];
	const active = all.filter((plan) => planIsActive(plan, week));
	// Active plans float to the top; array order is otherwise preserved (stable).
	const ordered = [...all].sort(
		(a, b) => Number(planIsActive(b, week)) - Number(planIsActive(a, week)),
	);
	const selected =
		all.find((plan) => String(plan.id) === selectedId) ??
		active[0] ??
		all[0] ??
		null;

	return (
		<div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6">
			<section className="bg-card flex h-full min-h-0 flex-col rounded-xl border md:col-span-2">
				<SelectedPlanPanel
					plan={selected}
					active={selected != null && planIsActive(selected, week)}
				/>
			</section>

			<aside className="bg-card flex h-full min-h-0 flex-col rounded-xl border md:col-span-1">
				<div className="flex items-center justify-between gap-2 border-b p-4">
					<div>
						<h2 className="font-semibold">All plans</h2>
						<p className="text-muted-foreground text-xs">{all.length} total</p>
					</div>
					<Sheet open={createOpen} onOpenChange={setCreateOpen}>
						<SheetTrigger asChild>
							<Button size="sm">
								<Plus className="size-4" />
								New
							</Button>
						</SheetTrigger>
						<SheetContent className="w-full gap-0 p-0 sm:max-w-md">
							<SheetHeader>
								<SheetTitle>New plan</SheetTitle>
								<SheetDescription>
									A plan spans a range of ISO weeks and holds weekly
									requirements and planned workouts.
								</SheetDescription>
							</SheetHeader>
							<CreatePlanForm onCreated={() => setCreateOpen(false)} />
						</SheetContent>
					</Sheet>
				</div>

				<div className="min-h-0 flex-1 overflow-y-auto p-2">
					{!plans.isLoading && all.length === 0 ? (
						<p className="text-muted-foreground p-4 text-center text-sm">
							No plans yet. Create your first one.
						</p>
					) : (
						<ul className="flex flex-col gap-1">
							{ordered.map((plan) => {
								const isActive = planIsActive(plan, week);
								return (
									<li
										key={String(plan.id)}
										className="hover:bg-muted group relative flex items-center rounded-lg transition-colors"
									>
										<button
											type="button"
											onClick={() => setSelectedId(String(plan.id))}
											className={cn(
												"flex min-w-0 flex-1 items-center gap-2 p-2 text-left",
												selected != null &&
													String(selected.id) === String(plan.id) &&
													"font-medium",
											)}
										>
											<span
												className={
													isActive
														? "bg-primary size-2 shrink-0 rounded-full"
														: "bg-muted-foreground/30 size-2 shrink-0 rounded-full"
												}
											/>
											<span className="min-w-0 flex-1">
												<span className="block truncate text-sm font-medium">
													{plan.name}
												</span>
												<span className="text-muted-foreground block truncate text-xs">
													{plan.start_week} – {plan.end_week}
												</span>
											</span>
										</button>
										<DeletePlanButton
											plan={plan}
											onDelete={() => void deletePlan(plan.id, plan.name)}
											className="text-muted-foreground hover:text-destructive mr-1 size-8 shrink-0 opacity-0 group-hover:opacity-100"
										/>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</aside>
		</div>
	);
}
