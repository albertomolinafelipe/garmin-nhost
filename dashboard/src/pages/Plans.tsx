import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Pencil,
	Plus,
	Trash2,
	X,
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
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
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { NumberInput } from "@/components/ui/number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TimelineList } from "@/components/timeline-list";
import { useActivities } from "@/lib/queries";
import {
	useDeletePlanMutation,
	useDeletePlanRequirementMutation,
	useDeletePlanWorkoutMutation,
	useInsertPlanMutation,
	useInsertPlanRequirementMutation,
	useInsertPlanWorkoutMutation,
	useInsertRaceMutation,
	useDeleteRaceMutation,
	useRacesQuery,
	usePlanQuery,
	usePlansQuery,
	useUpdatePlanMutation,
	useUpdatePlanRequirementMutation,
} from "@/graphql/hooks";
import {
	currentIsoWeek,
	DAY_LABEL,
	DAYS,
	isIsoWeek,
	type Metric,
	METRIC_META,
	METRICS,
	planIsActive,
	raceIcon as RaceIcon,
	sportIcon,
	SPORTS,
	weeksInRange,
} from "@/lib/plans";
import { cn } from "@/lib/utils";

type Plan = {
	id: unknown;
	name: string;
	start_week: string;
	end_week: string;
	notes: string | null;
};

type PlanFormValues = {
	name: string;
	start_week: string;
	end_week: string;
	notes: string | null;
};

function PlanForm({
	initial,
	submitting,
	submitLabel,
	pendingLabel,
	onSubmit,
}: {
	initial?: PlanFormValues;
	submitting: boolean;
	submitLabel: string;
	pendingLabel: string;
	onSubmit: (values: PlanFormValues) => void;
}) {
	const [month, setMonth] = useState<Date>(new Date());
	const [name, setName] = useState(initial?.name ?? "");
	const [startWeek, setStartWeek] = useState(initial?.start_week ?? "");
	const [endWeek, setEndWeek] = useState(initial?.end_week ?? "");
	const [notes, setNotes] = useState(initial?.notes ?? "");

	const orderInvalid =
		isIsoWeek(startWeek) && isIsoWeek(endWeek) && endWeek < startWeek;
	const valid =
		name.trim() !== "" &&
		isIsoWeek(startWeek) &&
		isIsoWeek(endWeek) &&
		!orderInvalid;

	const submit = () => {
		if (!valid || submitting) return;
		onSubmit({
			name: name.trim(),
			start_week: startWeek,
			end_week: endWeek,
			notes: notes.trim() || null,
		});
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
						disabled={submitting}
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
							disabled={submitting}
							onChange={(event) => setStartWeek(event.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="plan-end">End week</Label>
						<Input
							id="plan-end"
							value={endWeek}
							placeholder="2026-W04"
							disabled={submitting}
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
					<Label htmlFor="plan-notes">Notes (markdown)</Label>
					<Textarea
						id="plan-notes"
						value={notes}
						rows={8}
						placeholder="Supports **markdown**"
						disabled={submitting}
						onChange={(event) => setNotes(event.target.value)}
					/>
				</div>
			</div>
			<SheetFooter>
				<Button disabled={!valid || submitting} onClick={submit}>
					{submitting ? pendingLabel : submitLabel}
				</Button>
			</SheetFooter>
		</>
	);
}

function PlanSheet({
	open,
	onOpenChange,
	plan,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	plan?: Plan;
}) {
	const queryClient = useQueryClient();
	const insert = useInsertPlanMutation();
	const update = useUpdatePlanMutation();
	const editing = plan != null;
	const submitting = editing ? update.isPending : insert.isPending;

	const submit = async (values: PlanFormValues) => {
		try {
			if (editing) {
				await update.mutateAsync({ id: plan.id, set: values });
			} else {
				await insert.mutateAsync({ object: values });
			}
			await queryClient.invalidateQueries({ queryKey: ["plans"] });
			toast.success(editing ? "Plan updated" : "Plan created");
			onOpenChange(false);
		} catch {
			toast.error(
				editing ? "Could not update the plan" : "Could not create the plan",
			);
		}
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
				<SheetHeader>
					<SheetTitle>{editing ? "Edit plan" : "New plan"}</SheetTitle>
					<SheetDescription>
						{editing
							? "Update the plan's details."
							: "A plan spans a range of ISO weeks and holds weekly requirements and planned workouts."}
					</SheetDescription>
				</SheetHeader>
				<PlanForm
					initial={
						editing
							? {
									name: plan.name,
									start_week: plan.start_week,
									end_week: plan.end_week,
									notes: plan.notes,
								}
							: undefined
					}
					submitting={submitting}
					submitLabel={editing ? "Save changes" : "Create plan"}
					pendingLabel={editing ? "Saving…" : "Creating…"}
					onSubmit={(values) => void submit(values)}
				/>
			</SheetContent>
		</Sheet>
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

function WeekStepper({
	weeks,
	value,
	onChange,
	disabled,
}: {
	weeks: string[];
	value: string;
	onChange: (week: string) => void;
	disabled?: boolean;
}) {
	const index = Math.max(0, weeks.indexOf(value));
	return (
		<div className="flex items-center gap-1">
			<Button
				type="button"
				variant="outline"
				size="icon"
				className="size-9"
				disabled={disabled || index <= 0}
				onClick={() => onChange(weeks[index - 1])}
			>
				<ChevronLeft className="size-4" />
			</Button>
			<span className="w-20 text-center text-sm font-medium tabular-nums">
				{value || "—"}
			</span>
			<Button
				type="button"
				variant="outline"
				size="icon"
				className="size-9"
				disabled={disabled || index >= weeks.length - 1}
				onClick={() => onChange(weeks[index + 1])}
			>
				<ChevronRight className="size-4" />
			</Button>
		</div>
	);
}

function RequirementsSection({ plan }: { plan: Plan }) {
	const planId = String(plan.id);
	const queryClient = useQueryClient();
	const { data } = usePlanQuery(planId);
	const insert = useInsertPlanRequirementMutation();
	const update = useUpdatePlanRequirementMutation();
	const remove = useDeletePlanRequirementMutation();
	const reqs = data?.requirements ?? [];

	const [editId, setEditId] = useState<string | null>(null);
	const [editTarget, setEditTarget] = useState<number | null>(null);
	const weeks = weeksInRange(plan.start_week, plan.end_week);

	const [adding, setAdding] = useState(false);
	const [week, setWeek] = useState(weeks[0] ?? "");
	const [sport, setSport] = useState("all");
	const [metric, setMetric] = useState<string>(METRICS[0]);
	const [target, setTarget] = useState<number | null>(null);

	const refresh = () =>
		queryClient.invalidateQueries({ queryKey: ["plan", planId] });

	const valid = isIsoWeek(week) && target != null;

	const resetDraft = () => {
		setMetric(METRICS[0]);
		setTarget(null);
		setAdding(false);
	};

	const save = async () => {
		if (!valid || insert.isPending) return;
		try {
			await insert.mutateAsync({
				object: {
					plan_id: planId,
					week,
					sport: sport === "all" ? null : sport,
					metric,
					target: METRIC_META[metric as Metric].toBase(target),
				},
			});
			resetDraft();
			await refresh();
		} catch {
			toast.error("Could not add requirement");
		}
	};

	const del = async (id: unknown) => {
		try {
			await remove.mutateAsync({ id });
			await refresh();
		} catch {
			toast.error("Could not delete requirement");
		}
	};

	const startEdit = (r: (typeof reqs)[number]) => {
		setEditId(String(r.id));
		setEditTarget(METRIC_META[r.metric as Metric].fromBase(Number(r.target)));
	};

	const cancelEdit = () => {
		setEditId(null);
		setEditTarget(null);
	};

	const saveEdit = async (r: (typeof reqs)[number]) => {
		if (editTarget == null || update.isPending) return;
		try {
			await update.mutateAsync({
				id: r.id,
				set: { target: METRIC_META[r.metric as Metric].toBase(editTarget) },
			});
			cancelEdit();
			await refresh();
		} catch {
			toast.error("Could not update requirement");
		}
	};

	const SportIcon = sportIcon(sport === "all" ? null : sport);
	const AllSportsIcon = sportIcon(null);
	const MetricIcon = METRIC_META[metric as Metric].icon;

	return (
		<Card className="bg-muted/50 gap-4 border-none py-4 shadow-none">
			<CardHeader className="px-4">
				<CardTitle className="text-sm">Requirements</CardTitle>
				{adding ? null : (
					<CardAction>
						<Button variant="outline" size="sm" onClick={() => setAdding(true)}>
							<Plus className="size-4" />
							New
						</Button>
					</CardAction>
				)}
			</CardHeader>
			<CardContent className="space-y-3 px-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Week</TableHead>
							<TableHead>Sport</TableHead>
							<TableHead>Metric</TableHead>
							<TableHead>Target</TableHead>
							<TableHead className="w-8" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{reqs.map((r) => {
							const RowSport = sportIcon(r.sport);
							const meta = METRIC_META[r.metric as Metric];
							const RowMetric = meta?.icon;
							return (
								<TableRow key={String(r.id)}>
									<TableCell className="tabular-nums">{r.week}</TableCell>
									<TableCell>
										<span className="flex items-center gap-1.5">
											<RowSport className="text-muted-foreground size-4" />
											{r.sport ?? "All"}
										</span>
									</TableCell>
									<TableCell>
										<span className="flex items-center gap-1.5">
											{RowMetric ? (
												<RowMetric className="text-muted-foreground size-4" />
											) : null}
											{meta?.label ?? r.metric}
										</span>
									</TableCell>
									<TableCell className="tabular-nums">
										{editId === String(r.id) ? (
											<div className="relative w-28">
												<NumberInput
													autoFocus
													nonNegative
													value={editTarget}
													className="pr-9"
													onChange={setEditTarget}
													onKeyDown={(e) => {
														if (e.key === "Enter") void saveEdit(r);
														if (e.key === "Escape") cancelEdit();
													}}
												/>
												{meta?.inputUnit ? (
													<span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs">
														{meta.inputUnit}
													</span>
												) : null}
											</div>
										) : (
											<button
												type="button"
												className="hover:bg-muted -mx-1 rounded px-1 text-left tabular-nums"
												onClick={() => startEdit(r)}
											>
												{meta?.format(Number(r.target)) ?? String(r.target)}
											</button>
										)}
									</TableCell>
									<TableCell>
										{editId === String(r.id) ? (
											<div className="flex items-center gap-1">
												<Button
													variant="ghost"
													size="icon"
													className="size-7"
													disabled={editTarget == null || update.isPending}
													aria-label="Save target"
													onClick={() => void saveEdit(r)}
												>
													<Check className="size-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="text-muted-foreground size-7"
													aria-label="Cancel edit"
													onClick={cancelEdit}
												>
													<X className="size-4" />
												</Button>
											</div>
										) : (
											<Button
												variant="ghost"
												size="icon"
												className="text-muted-foreground hover:text-destructive size-7"
												aria-label="Delete requirement"
												onClick={() => void del(r.id)}
											>
												<Trash2 className="size-4" />
											</Button>
										)}
									</TableCell>
								</TableRow>
							);
						})}
						{reqs.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-muted-foreground text-center"
								>
									No requirements yet.
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Table>

				{adding ? (
					<div className="flex flex-wrap items-center gap-2">
						<WeekStepper weeks={weeks} value={week} onChange={setWeek} />
						<Select value={sport} onValueChange={setSport}>
							<SelectTrigger className="w-36">
								<span className="flex items-center gap-1.5">
									<SportIcon className="size-4" />
									{sport === "all" ? "All sports" : sport}
								</span>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									<span className="flex items-center gap-1.5">
										<AllSportsIcon className="size-4" />
										All sports
									</span>
								</SelectItem>
								{SPORTS.map((s) => {
									const Icon = sportIcon(s);
									return (
										<SelectItem key={s} value={s}>
											<span className="flex items-center gap-1.5">
												<Icon className="size-4" />
												{s}
											</span>
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						<Select value={metric} onValueChange={setMetric}>
							<SelectTrigger className="w-36">
								<span className="flex items-center gap-1.5">
									<MetricIcon className="size-4" />
									{METRIC_META[metric as Metric].label}
								</span>
							</SelectTrigger>
							<SelectContent>
								{METRICS.map((m) => {
									const Icon = METRIC_META[m].icon;
									return (
										<SelectItem key={m} value={m}>
											<span className="flex items-center gap-1.5">
												<Icon className="size-4" />
												{METRIC_META[m].label}
											</span>
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						<div className="relative">
							<NumberInput
								nonNegative
								value={target}
								placeholder="target"
								className="w-28 pr-9"
								onChange={setTarget}
							/>
							{METRIC_META[metric as Metric].inputUnit ? (
								<span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs">
									{METRIC_META[metric as Metric].inputUnit}
								</span>
							) : null}
						</div>
						<Button
							size="sm"
							disabled={!valid || insert.isPending}
							onClick={() => void save()}
						>
							{insert.isPending ? "Saving…" : "Save"}
						</Button>
						<Button variant="ghost" size="sm" onClick={resetDraft}>
							Cancel
						</Button>
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

function WorkoutsSection({ plan }: { plan: Plan }) {
	const planId = String(plan.id);
	const queryClient = useQueryClient();
	const { data } = usePlanQuery(planId);
	const insert = useInsertPlanWorkoutMutation();
	const remove = useDeletePlanWorkoutMutation();
	const workouts = data?.workouts ?? [];
	const weeks = weeksInRange(plan.start_week, plan.end_week);

	const [adding, setAdding] = useState(false);
	const [week, setWeek] = useState(weeks[0] ?? "");
	const [day, setDay] = useState<string>(DAYS[0]);
	const [sport, setSport] = useState<string>(SPORTS[0]);
	const [title, setTitle] = useState("");

	const refresh = () =>
		queryClient.invalidateQueries({ queryKey: ["plan", planId] });

	const valid = isIsoWeek(week) && title.trim() !== "";

	const resetDraft = () => {
		setTitle("");
		setAdding(false);
	};

	const save = async () => {
		if (!valid || insert.isPending) return;
		try {
			await insert.mutateAsync({
				object: {
					plan_id: planId,
					week,
					day_of_week: day,
					sport,
					title: title.trim(),
				},
			});
			resetDraft();
			await refresh();
		} catch {
			toast.error("Could not add workout");
		}
	};

	const del = async (id: unknown) => {
		try {
			await remove.mutateAsync({ id });
			await refresh();
		} catch {
			toast.error("Could not delete workout");
		}
	};

	const SportIcon = sportIcon(sport);

	return (
		<Card className="bg-muted/50 gap-4 border-none py-4 shadow-none">
			<CardHeader className="px-4">
				<CardTitle className="text-sm">Workouts</CardTitle>
				{adding ? null : (
					<CardAction>
						<Button variant="outline" size="sm" onClick={() => setAdding(true)}>
							<Plus className="size-4" />
							New
						</Button>
					</CardAction>
				)}
			</CardHeader>
			<CardContent className="space-y-3 px-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Week</TableHead>
							<TableHead>Day</TableHead>
							<TableHead>Sport</TableHead>
							<TableHead>Title</TableHead>
							<TableHead className="w-8" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{workouts.map((w) => {
							const RowSport = sportIcon(w.sport);
							return (
								<TableRow key={String(w.id)}>
									<TableCell className="tabular-nums">{w.week}</TableCell>
									<TableCell>
										{DAY_LABEL[w.day_of_week as keyof typeof DAY_LABEL] ??
											w.day_of_week}
									</TableCell>
									<TableCell>
										<span className="flex items-center gap-1.5">
											<RowSport className="text-muted-foreground size-4" />
											{w.sport}
										</span>
									</TableCell>
									<TableCell className="whitespace-normal">{w.title}</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											className="text-muted-foreground hover:text-destructive size-7"
											aria-label="Delete workout"
											onClick={() => void del(w.id)}
										>
											<Trash2 className="size-4" />
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
						{workouts.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-muted-foreground text-center"
								>
									No workouts yet.
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Table>

				{adding ? (
					<div className="flex flex-wrap items-center gap-2">
						<WeekStepper weeks={weeks} value={week} onChange={setWeek} />
						<ToggleGroup
							type="single"
							variant="outline"
							size="sm"
							value={day}
							className="gap-0"
							onValueChange={(value) => value && setDay(value)}
						>
							{DAYS.map((d) => (
								<ToggleGroupItem
									key={d}
									value={d}
									aria-label={DAY_LABEL[d]}
									className="rounded-none border-l-0 first:rounded-l-md first:border-l last:rounded-r-md"
								>
									{DAY_LABEL[d]}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
						<Select value={sport} onValueChange={setSport}>
							<SelectTrigger className="w-36">
								<span className="flex items-center gap-1.5">
									<SportIcon className="size-4" />
									{sport}
								</span>
							</SelectTrigger>
							<SelectContent>
								{SPORTS.map((s) => {
									const Icon = sportIcon(s);
									return (
										<SelectItem key={s} value={s}>
											<span className="flex items-center gap-1.5">
												<Icon className="size-4" />
												{s}
											</span>
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						<Input
							value={title}
							placeholder="Workout title"
							className="min-w-32 flex-1"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Button
							size="sm"
							disabled={!valid || insert.isPending}
							onClick={() => void save()}
						>
							{insert.isPending ? "Saving…" : "Save"}
						</Button>
						<Button variant="ghost" size="sm" onClick={resetDraft}>
							Cancel
						</Button>
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

function SelectedPlanPanel({
	plan,
	active,
}: {
	plan: Plan | null;
	active: boolean;
}) {
	const [editOpen, setEditOpen] = useState(false);

	if (!plan) {
		return (
			<div className="text-muted-foreground flex flex-1 items-center justify-center p-8 text-sm">
				Select a plan to see its details.
			</div>
		);
	}

	return (
		<div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<div className="flex items-center gap-2">
						<h3 className="truncate text-base font-semibold">{plan.name}</h3>
						{active ? <Badge variant="secondary">Active</Badge> : null}
					</div>
					<p className="text-muted-foreground mt-0.5 text-xs">
						{plan.start_week} – {plan.end_week}
					</p>
					{plan.notes ? (
						<div className="text-muted-foreground mt-2 space-y-1 text-sm [&_a]:underline [&_h1]:font-semibold [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_ul]:my-1">
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{plan.notes}
							</ReactMarkdown>
						</div>
					) : null}
				</div>
				<Button
					variant="outline"
					size="sm"
					className="shrink-0"
					onClick={() => setEditOpen(true)}
				>
					<Pencil className="size-4" />
					Edit
				</Button>
			</div>

			<PlanSheet plan={plan} open={editOpen} onOpenChange={setEditOpen} />

			<RequirementsSection plan={plan} />
			<WorkoutsSection plan={plan} />
		</div>
	);
}

function RaceSheet({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const queryClient = useQueryClient();
	const insert = useInsertRaceMutation();
	const [date, setDate] = useState("");
	const [name, setName] = useState("");
	const [distanceKm, setDistanceKm] = useState<number | null>(null);
	const [elevationM, setElevationM] = useState<number | null>(null);

	const valid = date !== "" && name.trim() !== "";

	const create = async () => {
		if (!valid || insert.isPending) return;
		try {
			await insert.mutateAsync({
				object: {
					date,
					name: name.trim(),
					distance_m: distanceKm == null ? null : distanceKm * 1000,
					elevation_gain_m: elevationM,
				},
			});
			await queryClient.invalidateQueries({ queryKey: ["races"] });
			setDate("");
			setName("");
			setDistanceKm(null);
			setElevationM(null);
			onOpenChange(false);
		} catch {
			toast.error("Could not create the race");
		}
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
				<SheetHeader>
					<SheetTitle>New race</SheetTitle>
					<SheetDescription>An upcoming or past race event.</SheetDescription>
				</SheetHeader>
				<div className="flex-1 space-y-5 overflow-y-auto px-4">
					<div className="grid gap-2">
						<Label htmlFor="race-date">Date</Label>
						<DatePicker
							id="race-date"
							value={date}
							disabled={insert.isPending}
							onChange={setDate}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="race-name">Name</Label>
						<Input
							id="race-name"
							value={name}
							placeholder="e.g. Zegama Marathon"
							disabled={insert.isPending}
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="grid gap-2">
							<Label htmlFor="race-distance">Distance (km)</Label>
							<NumberInput
								id="race-distance"
								nonNegative
								value={distanceKm}
								disabled={insert.isPending}
								onChange={setDistanceKm}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="race-elevation">Elevation (m)</Label>
							<NumberInput
								id="race-elevation"
								nonNegative
								value={elevationM}
								disabled={insert.isPending}
								onChange={setElevationM}
							/>
						</div>
					</div>
				</div>
				<SheetFooter>
					<Button
						disabled={!valid || insert.isPending}
						onClick={() => void create()}
					>
						{insert.isPending ? "Creating…" : "Create race"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

function RacesPanel() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const races = useRacesQuery();
	const activities = useActivities();
	const remove = useDeleteRaceMutation();
	const [createOpen, setCreateOpen] = useState(false);
	const today = new Date().toISOString().slice(0, 10);
	const list = [...(races.data ?? [])].sort((a, b) =>
		String(a.date).localeCompare(String(b.date)),
	);

	// Local calendar date -> activity ids started that day. A race links to its
	// day's activity only when exactly one exists.
	const byDay = new Map<string, string[]>();
	for (const activity of activities.data?.activities ?? []) {
		if (!activity.start_time) continue;
		const day = format(new Date(activity.start_time), "yyyy-MM-dd");
		const ids = byDay.get(day) ?? [];
		ids.push(String(activity.id));
		byDay.set(day, ids);
	}
	const activityForRace = (date: string): string | null => {
		const ids = byDay.get(date);
		return ids && ids.length === 1 ? ids[0] : null;
	};

	const del = async (id: unknown) => {
		try {
			await remove.mutateAsync({ id });
			await queryClient.invalidateQueries({ queryKey: ["races"] });
		} catch {
			toast.error("Could not delete race");
		}
	};

	return (
		<div className="bg-card flex min-h-0 flex-1 flex-col rounded-xl border">
			<div className="flex items-center justify-between gap-2 p-4">
				<div>
					<h2 className="font-semibold">Races</h2>
					<p className="text-muted-foreground text-xs">{list.length} total</p>
				</div>
				<Button size="sm" onClick={() => setCreateOpen(true)}>
					<Plus className="size-4" />
					New
				</Button>
				<RaceSheet open={createOpen} onOpenChange={setCreateOpen} />
			</div>
			<TimelineList
				items={list}
				getKey={(race) => String(race.id)}
				isPast={(race) => String(race.date) < today}
				loading={races.isLoading}
				empty={
					<p className="text-muted-foreground p-4 text-center text-sm">
						No races yet.
					</p>
				}
				renderItem={(race) => {
					const dist = Number(race.distance_m);
					const elev = Number(race.elevation_gain_m);
					const meta = [
						dist ? `${(dist / 1000).toFixed(1)} km` : null,
						elev ? `${Math.round(elev)} m` : null,
					]
						.filter(Boolean)
						.join(" · ");
					const activityId = activityForRace(String(race.date));
					return (
						<div className="hover:bg-muted group flex items-center gap-2 rounded-lg">
							<button
								type="button"
								disabled={activityId == null}
								onClick={() =>
									activityId && navigate(`/activities/${activityId}`)
								}
								className={cn(
									"min-w-0 flex-1 p-2 text-left",
									activityId != null && "cursor-pointer",
								)}
							>
								<span className="flex items-center gap-1.5 truncate text-sm font-medium">
									{String(race.date) < today ? (
										<RaceIcon className="text-race size-4 shrink-0" />
									) : null}
									<span className="truncate">{race.name}</span>
								</span>
								<span className="text-muted-foreground block truncate text-xs">
									{format(
										new Date(`${String(race.date)}T00:00:00`),
										"d MMM yyyy",
									)}
									{meta ? ` · ${meta}` : ""}
								</span>
							</button>
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-destructive mr-1 size-8 shrink-0 opacity-0 group-hover:opacity-100"
								aria-label={`Delete ${race.name}`}
								onClick={() => void del(race.id)}
							>
								<Trash2 className="size-4" />
							</Button>
						</div>
					);
				}}
			/>
		</div>
	);
}

export function Plans() {
	const queryClient = useQueryClient();
	const plans = usePlansQuery();
	const remove = useDeletePlanMutation();
	const [searchParams] = useSearchParams();
	const paramId = searchParams.get("plan");
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
	// Chronological by end week; past plans stay in the list but above the fold.
	const ordered = [...all].sort(
		(a, b) =>
			a.end_week.localeCompare(b.end_week) ||
			a.start_week.localeCompare(b.start_week),
	);
	const selected =
		all.find((plan) => String(plan.id) === selectedId) ??
		all.find((plan) => String(plan.id) === paramId) ??
		active[0] ??
		all[0] ??
		null;

	return (
		<div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6">
			<section className="bg-card flex h-full min-h-0 flex-col rounded-xl border md:col-span-2">
				<SelectedPlanPanel
					key={selected ? String(selected.id) : "none"}
					plan={selected}
					active={selected != null && planIsActive(selected, week)}
				/>
			</section>

			<aside className="flex h-full min-h-0 flex-col gap-4 md:col-span-1">
				<RacesPanel />
				<div className="bg-card flex min-h-0 flex-1 flex-col rounded-xl border">
					<div className="flex items-center justify-between gap-2 p-4">
						<div>
							<h2 className="font-semibold">All plans</h2>
							<p className="text-muted-foreground text-xs">
								{all.length} total
							</p>
						</div>
						<Button size="sm" onClick={() => setCreateOpen(true)}>
							<Plus className="size-4" />
							New
						</Button>
						<PlanSheet open={createOpen} onOpenChange={setCreateOpen} />
					</div>

					<TimelineList
						items={ordered}
						getKey={(plan) => String(plan.id)}
						isPast={(plan) => plan.end_week < week}
						loading={plans.isLoading}
						empty={
							<p className="text-muted-foreground p-4 text-center text-sm">
								No plans yet. Create your first one.
							</p>
						}
						renderItem={(plan) => {
							const isActive = planIsActive(plan, week);
							return (
								<div className="hover:bg-muted group relative flex items-center rounded-lg transition-colors">
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
								</div>
							);
						}}
					/>
				</div>
			</aside>
		</div>
	);
}
