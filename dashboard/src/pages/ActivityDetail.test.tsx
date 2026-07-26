import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

const save = vi.fn();
const activity = {
	id: "42",
	name: "Morning session",
	activity_type: "strength_training",
	subtype: null,
	start_time: "2026-07-20T08:00:00Z",
	duration_s: 3600,
	distance_m: null,
	elevation_gain_m: null,
	avg_speed_mps: null,
	avg_power_w: null,
	garmin_activity_id: "100",
	avg_hr: null,
	max_hr: null,
	calories: null,
	feeling: null,
	effort: null,
	food_during: null,
	food_after: null,
	caffeine: null,
	weather: null,
	notes: null,
	focus: null,
	hard_tries: null,
	strength_exercises: [{ exercise: "Squat", sets: 3, reps: 5, weight: 80 }],
	activity_streams: [],
};

vi.mock("@/lib/queries", () => ({
	useActivity: () => ({ data: activity, isPending: false, isError: false }),
	num: (value: unknown) => Number(value ?? 0),
}));
vi.mock("@/graphql/hooks", () => ({
	useFoodOptionsQuery: () => ({ data: { food_options: [] } }),
}));
vi.mock("@/components/annotations/use-annotation-save", () => ({
	useAnnotationSave: () => save,
}));
vi.mock("@/components/annotations/RunningAnnotation", () => ({
	RunningAnnotation: () => <div>Running editor</div>,
}));
vi.mock("@/components/annotations/ClimbingAnnotation", () => ({
	ClimbingAnnotation: () => <div>Climbing editor</div>,
}));
vi.mock("@/components/annotations/StrengthAnnotation", () => ({
	StrengthAnnotation: ({ activity: value }: { activity: typeof activity }) => (
		<div>Strength editor: {JSON.stringify(value.strength_exercises)}</div>
	),
}));
vi.mock("react-leaflet", () => ({
	CircleMarker: () => null,
	MapContainer: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	Polyline: () => null,
	TileLayer: () => null,
}));

import { ActivityDetail } from "./ActivityDetail";

function renderPage() {
	return render(
		<MemoryRouter initialEntries={["/activities/42"]}>
			<Routes>
				<Route path="/activities/:id" element={<ActivityDetail />} />
			</Routes>
		</MemoryRouter>,
	);
}

describe("ActivityDetail annotations integration", () => {
	beforeEach(() => {
		save.mockReset();
		save.mockResolvedValue(true);
	});

	it("saves a dirty name by confirm button and Enter, but not blur", async () => {
		const user = userEvent.setup();
		renderPage();
		const input = screen.getByRole("textbox", { name: "Activity name" });
		await user.clear(input);
		await user.type(input, "Evening session");
		await user.tab();
		expect(save).not.toHaveBeenCalled();
		await user.click(screen.getByRole("button", { name: "Confirm name" }));
		expect(save).toHaveBeenLastCalledWith({ name: "Evening session" });

		await user.clear(input);
		await user.keyboard("{Enter}");
		expect(save).toHaveBeenLastCalledWith({ name: null });
	});

	it("keeps a failed name value available for retry", async () => {
		const user = userEvent.setup();
		save.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
		renderPage();
		const input = screen.getByRole("textbox", { name: "Activity name" });
		await user.clear(input);
		await user.type(input, "Retry me");
		await user.click(screen.getByRole("button", { name: "Confirm name" }));
		expect(input).toHaveValue("Retry me");
		expect(
			screen.getByRole("button", { name: "Confirm name" }),
		).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Confirm name" }));
		expect(save).toHaveBeenCalledTimes(2);
	});

	it("switches strength locally to climbing without writing and can cancel", async () => {
		const user = userEvent.setup();
		renderPage();
		expect(screen.getByText(/Strength editor:.*Squat/)).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Log as climbing" }));
		expect(screen.getByText("Climbing editor")).toBeInTheDocument();
		expect(save).not.toHaveBeenCalled();
		await user.click(screen.getByRole("button", { name: "Cancel climbing" }));
		expect(screen.getByText(/Strength editor:.*Squat/)).toBeInTheDocument();
	});

	it("shows the needs annotation badge for an incomplete activity", () => {
		renderPage();
		expect(screen.getByText("needs annotation")).toBeInTheDocument();
	});
});
