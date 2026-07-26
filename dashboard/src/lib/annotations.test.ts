import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
	parseStrengthExercises,
	toActivitySetInput,
	type AnnotationInput,
} from "./annotations";

const WRITABLE = {
	name: "Evening session",
	subtype: "trail",
	feeling: 4,
	effort: 3,
	food_during: ["gel"],
	food_after: ["rice"],
	caffeine: "yes",
	weather: "sunny",
	notes: "Good",
	focus: "power",
	hard_tries: 2,
	strength_exercises: [{ exercise: "Squat", sets: 3, reps: 5, weight: 100 }],
} satisfies AnnotationInput;

const SYNCED_COLUMNS = [
	"garmin_activity_id",
	"activity_type",
	"start_time",
	"duration_s",
	"distance_m",
	"avg_hr",
	"max_hr",
	"elevation_gain_m",
	"calories",
	"avg_speed_mps",
	"avg_power_w",
	"start_lat",
	"start_lng",
	"synced_at",
] as const;

describe("toActivitySetInput", () => {
	it("keeps all twelve writable fields", () => {
		expect(toActivitySetInput(WRITABLE)).toEqual(WRITABLE);
	});

	it("drops every synced field from untrusted runtime input", () => {
		const synced = Object.fromEntries(
			SYNCED_COLUMNS.map((key) => [key, "bad"]),
		);
		expect(
			toActivitySetInput({ ...WRITABLE, ...synced } as AnnotationInput),
		).toEqual(WRITABLE);
	});

	it("normalizes clearable empty strings and drops undefined", () => {
		expect(
			toActivitySetInput({
				caffeine: "",
				subtype: "",
				weather: "",
				focus: "",
				name: undefined,
			}),
		).toEqual({ caffeine: null, subtype: null, weather: null, focus: null });
	});

	it("returns an empty object for no-op and synced-only patches", () => {
		expect(toActivitySetInput({})).toEqual({});
		expect(
			toActivitySetInput({
				distance_m: 42,
				synced_at: "now",
			} as AnnotationInput),
		).toEqual({});
	});
});

describe("UpdateActivity operation", () => {
	it("returns only the id and writable columns, never synced columns", () => {
		const operationsPath = resolve(
			process.cwd(),
			"src/graphql/operations.graphql",
		);
		const source = readFileSync(operationsPath, "utf8");
		const operation = source.match(
			/mutation UpdateActivity[\s\S]*?(?=\nquery FoodOptions)/,
		)?.[0];
		expect(operation).toBeDefined();
		const tokens = new Set(operation?.match(/\b[a-z_]+\b/g) ?? []);
		for (const column of SYNCED_COLUMNS) {
			expect(tokens.has(column)).toBe(false);
		}
		for (const column of ["id", ...Object.keys(WRITABLE)]) {
			expect(tokens.has(column)).toBe(true);
		}
	});
});

describe("parseStrengthExercises", () => {
	it("returns empty for null, garbage, and malformed JSON", () => {
		expect(parseStrengthExercises(null)).toEqual([]);
		expect(parseStrengthExercises({ exercise: "Squat" })).toEqual([]);
		expect(parseStrengthExercises("not json")).toEqual([]);
	});

	it("accepts valid arrays or serialized JSON", () => {
		const rows = [
			{ exercise: "Pull-up", sets: 3, reps: 8, weight: null },
			{ exercise: "Run", sets: null, reps: null, weight: null },
		];
		expect(parseStrengthExercises(rows)).toEqual(rows);
		expect(parseStrengthExercises(JSON.stringify(rows))).toEqual(rows);
	});

	it("filters invalid rows and defaults missing numeric values to null", () => {
		expect(
			parseStrengthExercises([
				{ exercise: "Squat", sets: 3 },
				{ exercise: "", sets: 1, reps: 1, weight: 1 },
				{ exercise: "Deadlift", sets: Number.NaN, reps: 2, weight: 80 },
			]),
		).toEqual([{ exercise: "Squat", sets: 3, reps: null, weight: null }]);
	});
});
