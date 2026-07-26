import type { Activities_Set_Input } from "@/graphql/generated";

export interface AnnotationInput {
	name?: string | null;
	subtype?: string | null;
	feeling?: number | null;
	effort?: number | null;
	food_during?: string[] | null;
	food_after?: string[] | null;
	caffeine?: string | null;
	weather?: string | null;
	notes?: string | null;
	focus?: string | null;
	hard_tries?: number | null;
	strength_exercises?: StrengthEntry[] | null;
}

export interface StrengthEntry {
	exercise: string;
	sets: number | null;
	reps: number | null;
	weight: number | null;
}

const WRITABLE_KEYS = [
	"name",
	"subtype",
	"feeling",
	"effort",
	"food_during",
	"food_after",
	"caffeine",
	"weather",
	"notes",
	"focus",
	"hard_tries",
	"strength_exercises",
] as const satisfies readonly (keyof AnnotationInput)[];

const EMPTY_TO_NULL_KEYS = new Set<keyof AnnotationInput>([
	"caffeine",
	"subtype",
	"weather",
	"focus",
]);

export function toActivitySetInput(
	patch: AnnotationInput,
): Activities_Set_Input {
	const set: Record<string, unknown> = {};
	const source = patch as Record<string, unknown>;

	for (const key of WRITABLE_KEYS) {
		const value = source[key];
		if (value === undefined) continue;
		set[key] = EMPTY_TO_NULL_KEYS.has(key) && value === "" ? null : value;
	}

	return set as Activities_Set_Input;
}

function nullableFiniteNumber(value: unknown): number | null | undefined {
	if (value === null || value === undefined) return null;
	return typeof value === "number" && Number.isFinite(value)
		? value
		: undefined;
}

export function parseStrengthExercises(json: unknown): StrengthEntry[] {
	let value = json;
	if (typeof value === "string") {
		try {
			value = JSON.parse(value);
		} catch {
			return [];
		}
	}
	if (!Array.isArray(value)) return [];

	return value.flatMap((row): StrengthEntry[] => {
		if (typeof row !== "object" || row === null || Array.isArray(row))
			return [];
		const candidate = row as Record<string, unknown>;
		if (
			typeof candidate.exercise !== "string" ||
			candidate.exercise.trim() === ""
		) {
			return [];
		}
		const sets = nullableFiniteNumber(candidate.sets);
		const reps = nullableFiniteNumber(candidate.reps);
		const weight = nullableFiniteNumber(candidate.weight);
		if (sets === undefined || reps === undefined || weight === undefined)
			return [];
		return [{ exercise: candidate.exercise, sets, reps, weight }];
	});
}
