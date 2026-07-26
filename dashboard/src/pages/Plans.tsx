import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	useDeletePlanMutation,
	useInsertPlanMutation,
	usePlansQuery,
} from "@/graphql/hooks";
import { isIsoWeek } from "@/lib/plans";

function CreatePlan() {
	const queryClient = useQueryClient();
	const insert = useInsertPlanMutation();
	const [name, setName] = useState("");
	const [startWeek, setStartWeek] = useState("");
	const [endWeek, setEndWeek] = useState("");
	const [notes, setNotes] = useState("");

	const valid =
		name.trim() !== "" &&
		isIsoWeek(startWeek) &&
		isIsoWeek(endWeek) &&
		endWeek >= startWeek;

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
			setName("");
			setStartWeek("");
			setEndWeek("");
			setNotes("");
			await queryClient.invalidateQueries({ queryKey: ["plans"] });
		} catch {
			toast.error("Could not create the plan");
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>New plan</CardTitle>
				<CardDescription>
					A plan spans a range of ISO weeks and holds weekly requirements and
					planned workouts.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 sm:grid-cols-2">
				<div className="grid gap-2 sm:col-span-2">
					<Label htmlFor="plan-name">Name</Label>
					<Input
						id="plan-name"
						value={name}
						placeholder="e.g. Base build 2026"
						disabled={insert.isPending}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="plan-start">Start week</Label>
					<Input
						id="plan-start"
						type="week"
						value={startWeek}
						disabled={insert.isPending}
						onChange={(event) => setStartWeek(event.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="plan-end">End week</Label>
					<Input
						id="plan-end"
						type="week"
						value={endWeek}
						disabled={insert.isPending}
						onChange={(event) => setEndWeek(event.target.value)}
					/>
				</div>
				<div className="grid gap-2 sm:col-span-2">
					<Label htmlFor="plan-notes">Notes</Label>
					<Textarea
						id="plan-notes"
						value={notes}
						placeholder="Optional"
						disabled={insert.isPending}
						onChange={(event) => setNotes(event.target.value)}
					/>
				</div>
				<div className="sm:col-span-2">
					<Button disabled={!valid || insert.isPending} onClick={() => void create()}>
						Create plan
					</Button>
					{startWeek && endWeek && endWeek < startWeek ? (
						<p className="text-destructive mt-2 text-sm">
							End week must not be before the start week.
						</p>
					) : null}
				</div>
			</CardContent>
		</Card>
	);
}

export function Plans() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const plans = usePlansQuery();
	const remove = useDeletePlanMutation();

	const deletePlan = async (id: unknown, name: string) => {
		try {
			await remove.mutateAsync({ id });
			await queryClient.invalidateQueries({ queryKey: ["plans"] });
		} catch {
			toast.error(`Could not delete ${name}`);
		}
	};

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Plans</h1>
				<p className="text-muted-foreground text-sm">
					{plans.data?.length ?? 0} plan
					{(plans.data?.length ?? 0) === 1 ? "" : "s"}
				</p>
			</div>

			<CreatePlan />

			{plans.isLoading && (
				<p className="text-muted-foreground text-sm">Loading plans…</p>
			)}
			{plans.isError && (
				<p className="text-destructive text-sm">Could not load plans.</p>
			)}

			<div className="grid gap-3">
				{plans.data?.map((plan) => (
					<Card
						key={String(plan.id)}
						className="hover:bg-muted/40 cursor-pointer transition-colors"
						onClick={() => navigate(`/plans/${plan.id}`)}
					>
						<CardContent className="flex items-center justify-between gap-4 py-4">
							<div className="min-w-0">
								<p className="truncate font-medium">{plan.name}</p>
								<p className="text-muted-foreground text-sm">
									{plan.start_week} – {plan.end_week}
								</p>
								{plan.notes ? (
									<p className="text-muted-foreground mt-1 truncate text-sm">
										{plan.notes}
									</p>
								) : null}
							</div>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="outline"
										size="icon"
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
											This removes the plan and all its requirements and
											workouts.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => void deletePlan(plan.id, plan.name)}
										>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
