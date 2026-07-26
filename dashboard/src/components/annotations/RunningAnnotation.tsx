import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
	<div className="space-y-2">
		<div className="text-sm font-medium">{label}</div>
		{children}
	</div>
);

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
		<Field label={label}>
			<ToggleGroup
				type="single"
				value={value?.toString() ?? ""}
				onValueChange={(next) => {
					if (next) void onSave({ [field]: Number(next) });
				}}
			>
				{SCALE_OPTIONS.map((option) => (
					<ToggleGroupItem
						key={option.value}
						value={option.value}
						aria-label={`${label} ${option.label}`}
					>
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
			<Field label="Terrain">
				<ToggleGroup
					type="single"
					value={activity.subtype ?? ""}
					onValueChange={(value) => {
						if (value) void onSave({ subtype: value });
					}}
				>
					{terrainOptions(activity.activity_type).map((option) => (
						<ToggleGroupItem
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				{needsSubtype(activity.activity_type, activity.subtype) && (
					<p className="text-sm text-destructive">Choose a valid terrain.</p>
				)}
			</Field>
			<Field label="Caffeine">
				<ToggleGroup
					type="single"
					value={activity.caffeine ?? ""}
					onValueChange={(value) => {
						if (value) void onSave({ caffeine: value });
					}}
				>
					{CAFFEINE_OPTIONS.map((value) => (
						<ToggleGroupItem key={value} value={value}>
							{value}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</Field>
			<Field label="Weather">
				<ToggleGroup
					type="single"
					value={activity.weather ?? ""}
					onValueChange={(value) => void onSave({ weather: value || null })}
				>
					{WEATHER_OPTIONS.map(({ value, label, icon: Icon }) => (
						<ToggleGroupItem key={value} value={value} aria-label={label}>
							<Icon className="size-4" />
							{label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				<p className="text-xs text-muted-foreground">
					No selection means normal conditions.
				</p>
			</Field>
			<Field label="Food during">
				<TagsInput
					aria-label="Add food during"
					value={activity.food_during ?? []}
					suggestions={foodOptions}
					onChange={(value) => void onSave({ food_during: value })}
				/>
			</Field>
			<Field label="Food after">
				<TagsInput
					aria-label="Add food after"
					value={activity.food_after ?? []}
					suggestions={foodOptions}
					onChange={(value) => void onSave({ food_after: value })}
				/>
			</Field>
			<Field label="Notes">
				<Textarea
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
	);
}
