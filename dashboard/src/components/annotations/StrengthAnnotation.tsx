import { useEffect, useReducer, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useExercisesQuery } from "@/graphql/hooks";
import { SCALE_OPTIONS } from "@/lib/activity-types";
import {
	parseStrengthExercises,
	type AnnotationInput,
	type StrengthEntry,
} from "@/lib/annotations";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { NumberInput } from "@/components/ui/number-input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Field, SegmentedField } from "./fields";
import { strengthRowsReducer } from "./strength-rows";

export interface StrengthActivity {
	id: unknown;
	feeling: number | null;
	effort: number | null;
	strength_exercises: unknown;
}
interface Props {
	activity: StrengthActivity;
	onSave: (patch: AnnotationInput) => unknown;
	foodOptions?: string[];
}
export function StrengthAnnotation({ activity, onSave }: Props) {
	const [rows, dispatch] = useReducer(
		strengthRowsReducer,
		activity.strength_exercises,
		parseStrengthExercises,
	);
	const dirty = useRef(false);
	const activityId = useRef(activity.id);
	const exercises = useExercisesQuery().data?.exercises ?? [];
	useEffect(() => {
		if (activityId.current !== activity.id) {
			activityId.current = activity.id;
			dirty.current = false;
			dispatch({ type: "reset", value: activity.strength_exercises });
		} else if (!dirty.current)
			dispatch({ type: "reset", value: activity.strength_exercises });
	}, [activity.id, activity.strength_exercises]);
	const save = async (next: StrengthEntry[]) => {
		const ok = await onSave({ strength_exercises: next });
		if (ok !== false) dirty.current = false;
	};
	const edit = (
		index: number,
		field: keyof StrengthEntry,
		value: string | number | null,
	) => {
		dirty.current = true;
		dispatch({ type: "edit", index, field, value });
	};
	const scale = (
		label: string,
		field: "feeling" | "effort",
		value: number | null,
	) => (
		<SegmentedField
			label={label}
			value={value?.toString() ?? ""}
			onChange={(next) => {
				if (next) void onSave({ [field]: Number(next) });
			}}
			options={SCALE_OPTIONS.map((option) => ({
				value: option.value,
				label: option.label,
				ariaLabel: `${label} ${option.label}`,
			}))}
		/>
	);
	return (
		<div className="space-y-4">
			<div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
				{scale("Feel", "feeling", activity.feeling)}
				{scale("Intensity", "effort", activity.effort)}
			</div>
			<Field label="Exercises" hint="Weight blank = bodyweight.">
				<div className="space-y-3">
					{rows.length > 0 && (
						<div className="text-muted-foreground hidden grid-cols-[minmax(10rem,2fr)_1fr_1fr_1fr_auto] gap-2 px-1 text-xs font-medium sm:grid">
							<span>Exercise</span>
							<span>Sets</span>
							<span>Reps</span>
							<span>Weight</span>
							<span className="w-9" />
						</div>
					)}
					{rows.map((row, index) => (
						<div
							key={index}
							className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(10rem,2fr)_1fr_1fr_1fr_auto]"
						>
							<Popover>
								<PopoverTrigger asChild>
									<Input
										aria-label={`Exercise ${index + 1}`}
										value={row.exercise}
										placeholder="Exercise"
										onChange={(event) =>
											edit(index, "exercise", event.target.value)
										}
										onBlur={() => void save(rows)}
									/>
								</PopoverTrigger>
								<PopoverContent className="p-0">
									<Command>
										<CommandInput placeholder="Find exercise" />
										<CommandList>
											<CommandEmpty>No exercises found.</CommandEmpty>
											{exercises.map((exercise) => (
												<CommandItem
													key={String(exercise.id)}
													value={exercise.name}
													onSelect={(value) => {
														const next = rows.map((item, i) =>
															i === index ? { ...item, exercise: value } : item,
														);
														dispatch({
															type: "edit",
															index,
															field: "exercise",
															value,
														});
														dirty.current = true;
														void save(next);
													}}
												>
													{exercise.name}
												</CommandItem>
											))}
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							{(["sets", "reps", "weight"] as const).map((field) => (
								<NumberInput
									key={field}
									aria-label={`${field} ${index + 1}`}
									placeholder={field}
									integer={field !== "weight"}
									nonNegative
									value={row[field]}
									onChange={(value) => edit(index, field, value)}
									onBlur={() => void save(rows)}
								/>
							))}
							<Button
								type="button"
								variant="ghost"
								size="icon"
								aria-label={`Remove exercise ${index + 1}`}
								onClick={() => {
									const next = rows.filter((_, i) => i !== index);
									dispatch({ type: "remove", index });
									dirty.current = true;
									void save(next);
								}}
							>
								<Trash2 />
							</Button>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => {
							const next = [
								...rows,
								{ exercise: "", sets: null, reps: null, weight: null },
							];
							dispatch({ type: "add" });
							dirty.current = true;
							void save(next);
						}}
					>
						<Plus /> Add exercise
					</Button>
				</div>
			</Field>
		</div>
	);
}
