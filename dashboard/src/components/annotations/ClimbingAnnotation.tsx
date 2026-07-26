import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
const Field = ({ label, children }: { label: string; children: ReactNode }) => (
	<div className="space-y-2">
		<div className="text-sm font-medium">{label}</div>
		{children}
	</div>
);

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
			<Field label="Climbing type">
				<ToggleGroup
					type="single"
					value={activity.subtype ?? ""}
					onValueChange={(value) => {
						if (value) void onSave({ subtype: value });
					}}
				>
					{CLIMBING_SUBTYPES.map((value) => (
						<ToggleGroupItem key={value} value={value}>
							{value}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				{!activity.subtype && (
					<p className="text-sm text-destructive">Climbing type is required.</p>
				)}
			</Field>
			<Field label="Focus">
				<Select
					value={activity.focus ?? ""}
					onValueChange={(value) => void onSave({ focus: value })}
				>
					<SelectTrigger aria-label="Focus">
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
				{!activity.focus && (
					<p role="alert" className="text-sm text-destructive">
						Focus is required.
					</p>
				)}
			</Field>
			<Field label="Hard tries">
				<NumberInput
					aria-label="Hard tries"
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
			<div className="grid gap-4 sm:grid-cols-2">
				{scale("Feel", "feeling", activity.feeling)}
				{scale("Intensity", "effort", activity.effort)}
			</div>
			<Field label="Notes">
				<Textarea
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
