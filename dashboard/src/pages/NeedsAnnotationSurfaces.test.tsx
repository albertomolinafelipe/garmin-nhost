import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CalendarActivity } from "@/lib/queries";

const fixtures: CalendarActivity[] = [
	{
		id: "1",
		name: "Grandfathered run",
		activity_type: "running",
		subtype: null,
		start_time: "2026-07-12T08:00:00Z",
		duration_s: 1800,
		distance_m: 5000,
		elevation_gain_m: 50,
		feeling: null,
		effort: null,
		caffeine: null,
		focus: null,
	},
	{
		id: "2",
		name: "Unfocused climb",
		activity_type: "bouldering",
		subtype: "boulder",
		start_time: "2026-07-20T08:00:00Z",
		duration_s: 3600,
		distance_m: null,
		elevation_gain_m: null,
		feeling: 4,
		effort: 3,
		caffeine: null,
		focus: null,
	},
	{
		id: "3",
		name: "Complete run",
		activity_type: "running",
		subtype: "road",
		start_time: "2026-07-21T08:00:00Z",
		duration_s: 2400,
		distance_m: 7000,
		elevation_gain_m: 80,
		feeling: 5,
		effort: 4,
		caffeine: "no",
		focus: null,
	},
];

vi.mock("@/lib/queries", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/queries")>();
	return {
		...actual,
		useActivities: () => ({
			data: { activities: fixtures },
			isPending: false,
		}),
		useSleep: () => ({ data: { sleep: [] }, isPending: false }),
	};
});

import { needsAnnotation } from "@/lib/activity-types";
import { Activities } from "./Activities";
import { Overview } from "./Overview";

afterEach(cleanup);

describe("needs-annotation surfaces", () => {
	it("renders list badges from the shared completeness helper", () => {
		render(
			<MemoryRouter>
				<Activities />
			</MemoryRouter>,
		);

		const expected = fixtures.filter(needsAnnotation);
		expect(expected.map((activity) => activity.id)).toEqual(["2"]);
		expect(screen.getAllByText("Needs annotation")).toHaveLength(
			expected.length,
		);
		expect(screen.getByText("Needs annotation")).toBeVisible();
	});

	it("lists and counts the same incomplete fixtures on Overview", () => {
		render(
			<MemoryRouter>
				<Overview />
			</MemoryRouter>,
		);

		const expected = fixtures.filter(needsAnnotation);
		expect(
			screen.getByText(`${expected.length} in loaded activities`),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /Unfocused climb/ }),
		).toHaveAttribute("href", "/activities/2");
		expect(
			screen.queryByRole("link", { name: /Grandfathered run/ }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("link", { name: /Complete run/ }),
		).not.toBeInTheDocument();
	});
});
