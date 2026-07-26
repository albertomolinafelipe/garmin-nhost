import { useEffect, useRef, useState } from "react";
import {
	CAFFEINE_OPTIONS,
	SCALE_OPTIONS,
	WEATHER_OPTIONS,
	needsSubtype,
	terrainOptions,
} from "@/lib/activity-types";
import type { AnnotationInput } from "@/lib/annotations";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { Field, SegmentedField, cap } from "./fields";

export interface RunningActivity {
	id: unknown;
	activity_type: string | null;
	subtype: string | null;
	feeling: number | null;
	effort: number | null;
	caffeine: string | null;
	weather: string | null;
	food_during: string[] | null;
	food_after: string[] | null;
	notes: string | null;
}
interface Props {
	activity: RunningActivity;
	onSave: (patch: AnnotationInput) => unknown;
	foodOptions?: string[];
}

export function RunningAnnotation({
	activity,
	onSave,
	foodOptions = [],
}: Props) {
	const [notes, setNotes] = useState(activity.notes ?? "");
	const dirty = useRef(false);
	useEffect(() => {
		if (!dirty.current) setNotes(activity.notes ?? "");
	}, [activity.id, activity.notes]);

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
		<div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
			<div className="space-y-3">
				{scale("Feel", "feeling", activity.feeling)}
				{scale("Intensity", "effort", activity.effort)}
				<SegmentedField
					label="Terrain"
					value={activity.subtype ?? ""}
					onChange={(value) => {
						if (value) void onSave({ subtype: value });
					}}
					options={terrainOptions(activity.activity_type).map((option) => ({
						value: option.value,
						label: option.label,
						disabled: option.disabled,
					}))}
					error={
						needsSubtype(activity.activity_type, activity.subtype)
							? "Choose a valid terrain."
							: undefined
					}
				/>
				<SegmentedField
					label="Caffeine"
					value={activity.caffeine ?? ""}
					onChange={(value) => {
						if (value) void onSave({ caffeine: value });
					}}
					options={CAFFEINE_OPTIONS.map((value) => ({
						value,
						label: cap(value),
					}))}
				/>
				<SegmentedField
					label="Weather"
					value={activity.weather ?? ""}
					onChange={(value) => void onSave({ weather: value || null })}
					options={WEATHER_OPTIONS.map(({ value, label, icon }) => ({
						value,
						ariaLabel: label,
						icon,
					}))}
				/>
			</div>
			<div className="space-y-3">
				<Field label="Food during" inline>
					<TagsInput
						aria-label="Add food during"
						value={activity.food_during ?? []}
						suggestions={foodOptions}
						onChange={(value) => void onSave({ food_during: value })}
					/>
				</Field>
				<Field label="Food after" inline>
					<TagsInput
						aria-label="Add food after"
						value={activity.food_after ?? []}
						suggestions={foodOptions}
						onChange={(value) => void onSave({ food_after: value })}
					/>
				</Field>
				<Field label="Notes">
					<Textarea
						placeholder="How did it go? Anything worth remembering…"
						value={notes}
						onChange={(event) => {
							dirty.current = true;
							setNotes(event.target.value);
						}}
						onBlur={async () => {
							if (!dirty.current) return;
							const ok = await onSave({ notes: notes || null });
							if (ok !== false) dirty.current = false;
						}}
					/>
				</Field>
			</div>
		</div>
	);
}
