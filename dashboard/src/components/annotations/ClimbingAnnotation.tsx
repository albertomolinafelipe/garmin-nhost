import { useEffect, useRef, useState } from "react";
import {
	CLIMBING_FOCUS,
	CLIMBING_SUBTYPES,
	SCALE_OPTIONS,
} from "@/lib/activity-types";
import type { AnnotationInput } from "@/lib/annotations";
import { NumberInput } from "@/components/ui/number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, SegmentedField, cap } from "./fields";

export interface ClimbingActivity {
	id: unknown;
	subtype: string | null;
	focus: string | null;
	feeling: number | null;
	effort: number | null;
	hard_tries: number | null;
	notes: string | null;
}
interface Props {
	activity: ClimbingActivity;
	onSave: (patch: AnnotationInput) => unknown;
	foodOptions?: string[];
}

export function ClimbingAnnotation({ activity, onSave }: Props) {
	const [notes, setNotes] = useState(activity.notes ?? "");
	const [tries, setTries] = useState(activity.hard_tries);
	const notesDirty = useRef(false);
	const triesDirty = useRef(false);
	useEffect(() => {
		if (!notesDirty.current) setNotes(activity.notes ?? "");
		if (!triesDirty.current) setTries(activity.hard_tries);
	}, [activity.id, activity.notes, activity.hard_tries]);

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
		<div className="space-y-3">
			<SegmentedField
				label="Climbing type"
				value={activity.subtype ?? ""}
				onChange={(value) => {
					if (value) void onSave({ subtype: value });
				}}
				options={CLIMBING_SUBTYPES.map((value) => ({
					value,
					label: cap(value),
				}))}
				error={activity.subtype ? undefined : "Climbing type is required."}
			/>
			{scale("Feel", "feeling", activity.feeling)}
			{scale("Intensity", "effort", activity.effort)}
			<Field
				label="Focus"
				error={activity.focus ? undefined : "Focus is required."}
			>
				<Select
					value={activity.focus ?? ""}
					onValueChange={(value) => void onSave({ focus: value })}
				>
					<SelectTrigger aria-label="Focus" className="w-full">
						<SelectValue placeholder="Choose focus" />
					</SelectTrigger>
					<SelectContent>
						{CLIMBING_FOCUS.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</Field>
			<Field label="Hard tries">
				<NumberInput
					aria-label="Hard tries"
					className="w-24"
					integer
					nonNegative
					value={tries}
					onChange={(value) => {
						triesDirty.current = true;
						setTries(value);
					}}
					onBlur={async () => {
						if (!triesDirty.current) return;
						const ok = await onSave({ hard_tries: tries });
						if (ok !== false) triesDirty.current = false;
					}}
				/>
			</Field>
			<Field label="Notes">
				<Textarea
					placeholder="Sends, projects, how it felt…"
					value={notes}
					onChange={(event) => {
						notesDirty.current = true;
						setNotes(event.target.value);
					}}
					onBlur={async () => {
						if (!notesDirty.current) return;
						const ok = await onSave({ notes: notes || null });
						if (ok !== false) notesDirty.current = false;
					}}
				/>
			</Field>
		</div>
	);
}
