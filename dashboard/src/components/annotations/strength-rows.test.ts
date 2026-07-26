import { describe, expect, it } from "vitest";
import { strengthRowsReducer } from "./strength-rows";

describe("strengthRowsReducer", () => {
	it("adds, edits, clears bodyweight, and removes rows", () => {
		let rows = strengthRowsReducer([], { type: "add" });
		expect(rows).toEqual([
			{ exercise: "", sets: null, reps: null, weight: null },
		]);
		rows = strengthRowsReducer(rows, {
			type: "edit",
			index: 0,
			field: "exercise",
			value: "Pull-up",
		});
		rows = strengthRowsReducer(rows, {
			type: "edit",
			index: 0,
			field: "weight",
			value: 12.5,
		});
		rows = strengthRowsReducer(rows, {
			type: "edit",
			index: 0,
			field: "weight",
			value: null,
		});
		expect(rows[0]).toEqual({
			exercise: "Pull-up",
			sets: null,
			reps: null,
			weight: null,
		});
		expect(strengthRowsReducer(rows, { type: "remove", index: 0 })).toEqual([]);
	});
	it("defensively resets from garbage", () => {
		expect(
			strengthRowsReducer([], {
				type: "reset",
				value: [
					{ exercise: "ok", sets: 3, reps: 5, weight: null },
					{ exercise: "bad", sets: "many" },
				],
			}),
		).toEqual([{ exercise: "ok", sets: 3, reps: 5, weight: null }]);
	});
});
