import { useEffect, useState, type FocusEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
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
import { TagsInput } from "@/components/ui/tags-input";
import {
	useDeleteExerciseMutation,
	useExercisesQuery,
	useInsertExerciseMutation,
	useUpdateExerciseMutation,
} from "@/graphql/hooks";

function mutationError(error: unknown) {
	const message = error instanceof Error ? error.message.toLowerCase() : "";
	if (message.includes("unique") || message.includes("duplicate")) {
		return "An exercise with that name already exists";
	}
	return "Could not save the exercise";
}

interface ExerciseRowProps {
	exercise: { id: unknown; name: string; categories: string[] };
	pending: boolean;
	onPendingChange: (pending: boolean) => void;
}

function ExerciseRow({ exercise, pending, onPendingChange }: ExerciseRowProps) {
	const queryClient = useQueryClient();
	const update = useUpdateExerciseMutation();
	const remove = useDeleteExerciseMutation();
	const [name, setName] = useState(exercise.name);
	const [categories, setCategories] = useState<string[]>(
		exercise.categories ?? [],
	);

	useEffect(() => {
		if (!update.isPending) {
			setName(exercise.name);
			setCategories(exercise.categories ?? []);
		}
	}, [exercise, update.isPending]);

	const runUpdate = async (set: { name?: string; categories?: string[] }) => {
		onPendingChange(true);
		try {
			await update.mutateAsync({ id: exercise.id, set });
			await queryClient.invalidateQueries({ queryKey: ["exercises"] });
		} catch (error) {
			setName(exercise.name);
			setCategories(exercise.categories ?? []);
			toast.error(mutationError(error));
		} finally {
			onPendingChange(false);
		}
	};

	const saveName = () => {
		const normalized = name.trim();
		if (!normalized) {
			setName(exercise.name);
			return;
		}
		if (normalized !== exercise.name) {
			void runUpdate({ name: normalized });
		}
	};
	const saveCategories = (event: FocusEvent<HTMLFieldSetElement>) => {
		if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
			return;
		}
		if (
			JSON.stringify(categories) !== JSON.stringify(exercise.categories ?? [])
		) {
			void runUpdate({ categories: categories ?? [] });
		}
	};
	const deleteExercise = async () => {
		onPendingChange(true);
		try {
			await remove.mutateAsync({ id: exercise.id });
			await queryClient.invalidateQueries({ queryKey: ["exercises"] });
		} catch (error) {
			toast.error(mutationError(error));
		} finally {
			onPendingChange(false);
		}
	};

	return (
		<div className="grid gap-3 rounded-lg border p-4 md:grid-cols-[minmax(12rem,1fr)_2fr_auto] md:items-start">
			<Input
				aria-label={`Name for ${exercise.name}`}
				value={name}
				disabled={pending}
				onChange={(event) => setName(event.target.value)}
				onBlur={saveName}
			/>
			<fieldset className="min-w-0" disabled={pending} onBlur={saveCategories}>
				<TagsInput
					aria-label={`Categories for ${exercise.name}`}
					value={categories}
					onChange={setCategories}
					disabled={pending}
					placeholder="Add category"
				/>
			</fieldset>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						disabled={pending}
						aria-label={`Delete ${exercise.name}`}
					>
						<Trash2 className="size-4" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete {exercise.name}?</AlertDialogTitle>
						<AlertDialogDescription>
							This removes the exercise from the catalog.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => void deleteExercise()}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export function Settings() {
	const queryClient = useQueryClient();
	const exercises = useExercisesQuery();
	const insert = useInsertExerciseMutation();
	const [name, setName] = useState("");
	const [categories, setCategories] = useState<string[]>([]);
	const [rowPending, setRowPending] = useState(0);
	const pending = insert.isPending || rowPending > 0;

	const addExercise = async () => {
		const normalized = name.trim();
		if (!normalized || pending) {
			return;
		}
		try {
			await insert.mutateAsync({
				name: normalized,
				categories: categories ?? [],
			});
			setName("");
			setCategories([]);
			await queryClient.invalidateQueries({ queryKey: ["exercises"] });
		} catch (error) {
			toast.error(mutationError(error));
		}
	};

	return (
		<div className="mx-auto w-full max-w-5xl p-4 md:p-8">
			<Card>
				<CardHeader>
					<CardTitle>Exercise catalog</CardTitle>
					<CardDescription>
						Manage exercises used by strength annotations.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-3 rounded-lg border p-4 md:grid-cols-[minmax(12rem,1fr)_2fr_auto] md:items-start">
						<Input
							aria-label="New exercise name"
							value={name}
							disabled={pending}
							placeholder="Exercise name"
							onChange={(event) => setName(event.target.value)}
						/>
						<TagsInput
							aria-label="New exercise categories"
							value={categories}
							onChange={setCategories}
							disabled={pending}
							placeholder="Add category"
						/>
						<Button
							disabled={pending || !name.trim()}
							onClick={() => void addExercise()}
						>
							Add exercise
						</Button>
					</div>
					{exercises.isLoading && (
						<p className="text-muted-foreground text-sm">Loading exercises…</p>
					)}
					{exercises.isError && (
						<p className="text-destructive text-sm">
							Could not load exercises.
						</p>
					)}
					<div className="space-y-3">
						{exercises.data?.exercises.map((exercise) => (
							<ExerciseRow
								key={String(exercise.id)}
								exercise={exercise}
								pending={pending}
								onPendingChange={(active) =>
									setRowPending((count) =>
										Math.max(0, count + (active ? 1 : -1)),
									)
								}
							/>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
