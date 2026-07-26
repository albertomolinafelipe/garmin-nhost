import { useEffect, useReducer, useRef, type ReactNode } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
const Field = ({ label, children }: { label: string; children: ReactNode }) => (
	<div className="space-y-2">
		<div className="text-sm font-medium">{label}</div>
		{children}
	</div>
);

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
		<Field label={label}>
			<ToggleGroup
				type="single"
				value={value?.toString() ?? ""}
				onValueChange={(next) => {
					if (next) void onSave({ [field]: Number(next) });
				}}
			>
				{SCALE_OPTIONS.map((option) => (
					<ToggleGroupItem key={option.value} value={option.value}>
						{option.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</Field>
	);
	return (
		<div className="space-y-5">
			<div className="grid gap-4 sm:grid-cols-2">
				{scale("Feel", "feeling", activity.feeling)}
				{scale("Intensity", "effort", activity.effort)}
			</div>
			<Field label="Exercises">
				<div className="space-y-3">
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
					<p className="text-xs text-muted-foreground">
						Weight blank = bodyweight.
					</p>
				</div>
			</Field>
		</div>
	);
}
