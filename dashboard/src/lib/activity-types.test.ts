import { describe, expect, it } from "vitest";
import {
	ANNOTATED_CUTOFF,
	needsAnnotation,
	needsSubtype,
	terrainOptions,
} from "./activity-types";

type CompletenessActivity = Parameters<typeof needsAnnotation>[0];

const complete = (
	overrides: Partial<CompletenessActivity> = {},
): CompletenessActivity => ({
	start_time: `${ANNOTATED_CUTOFF}T08:00:00Z`,
	activity_type: "running",
	subtype: "road",
	feeling: 3,
	effort: 3,
	caffeine: "no",
	focus: null,
	...overrides,
});

describe("needsAnnotation", () => {
	it.each([
		["complete running", {}, false],
		[
			"running terrain",
			{ activity_type: "trail_running", subtype: null },
			true,
		],
		["running feeling", { feeling: null }, true],
		["running effort", { effort: null }, true],
		["running caffeine", { caffeine: null }, true],
		[
			"complete climbing",
			{ activity_type: "rock_climbing", subtype: "boulder", focus: "power" },
			false,
		],
		[
			"climbing subtype",
			{ activity_type: "rock_climbing", subtype: null, focus: "power" },
			true,
		],
		[
			"climbing focus",
			{ activity_type: "rock_climbing", subtype: "boulder", focus: null },
			true,
		],
		[
			"climbing feeling",
			{ subtype: "boulder", focus: "power", feeling: null },
			true,
		],
		[
			"climbing effort",
			{ subtype: "boulder", focus: "power", effort: null },
			true,
		],
		[
			"complete strength",
			{ activity_type: "strength_training", subtype: null },
			false,
		],
		[
			"strength feeling",
			{ activity_type: "strength_training", subtype: null, feeling: null },
			true,
		],
		[
			"strength effort",
			{ activity_type: "strength_training", subtype: null, effort: null },
			true,
		],
	] as const)("evaluates %s", (_name, overrides, expected) => {
		expect(needsAnnotation(complete(overrides))).toBe(expected);
	});

	it.each([
		["2026-07-12T23:59:59Z", false],
		["2026-07-13T00:00:00Z", true],
		["2026-07-14T00:00:00Z", true],
		[null, true],
	] as const)("applies the grandfather cutoff to %s", (startTime, expected) => {
		expect(
			needsAnnotation(complete({ start_time: startTime, feeling: null })),
		).toBe(expected);
	});
});

describe("terrainOptions", () => {
	it.each([
		["trail_running", ["trail", "mountain"]],
		["treadmill_running", ["treadmill"]],
		["indoor_running", ["treadmill"]],
		["running", ["road", "trail", "mountain"]],
		["outdoor_running", ["road", "trail", "mountain"]],
	] as const)("enables valid terrain for %s", (activityType, enabled) => {
		const options = terrainOptions(activityType);
		expect(
			options
				.filter((option) => !option.disabled)
				.map((option) => option.value),
		).toEqual(enabled);
		expect(options).toHaveLength(4);
	});
});

describe("needsSubtype", () => {
	it("requires a subtype for native climbing", () => {
		expect(needsSubtype("rock_climbing", null)).toBe(true);
		expect(needsSubtype("rock_climbing", "route")).toBe(false);
	});

	it("requires trail or mountain for Garmin trail runs", () => {
		expect(needsSubtype("trail_running", null)).toBe(true);
		expect(needsSubtype("trail_running", "road")).toBe(true);
		expect(needsSubtype("trail_running", "trail")).toBe(false);
		expect(needsSubtype("trail_running", "mountain")).toBe(false);
	});
});
