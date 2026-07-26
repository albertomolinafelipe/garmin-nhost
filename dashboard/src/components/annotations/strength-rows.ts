import { parseStrengthExercises, type StrengthEntry } from "@/lib/annotations";

export type StrengthRowsAction =
	| { type: "reset"; value: unknown }
	| { type: "add" }
	| { type: "remove"; index: number }
	| {
			type: "edit";
			index: number;
			field: keyof StrengthEntry;
			value: string | number | null;
	  };

const emptyRow = (): StrengthEntry => ({
	exercise: "",
	sets: null,
	reps: null,
	weight: null,
});

export function strengthRowsReducer(
	state: StrengthEntry[],
	action: StrengthRowsAction,
): StrengthEntry[] {
	switch (action.type) {
		case "reset":
			return parseStrengthExercises(action.value);
		case "add":
			return [...state, emptyRow()];
		case "remove":
			return state.filter((_, index) => index !== action.index);
		case "edit":
			return state.map((row, index) =>
				index === action.index ? { ...row, [action.field]: action.value } : row,
			);
	}
}
