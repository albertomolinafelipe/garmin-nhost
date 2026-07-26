import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RunningAnnotation } from "./RunningAnnotation";
import { ClimbingAnnotation } from "./ClimbingAnnotation";

afterEach(cleanup);

const running = {
	id: "1",
	activity_type: "running",
	subtype: "road",
	feeling: null,
	effort: null,
	caffeine: null,
	weather: null,
	food_during: [],
	food_after: [],
	notes: null,
};

describe("annotation editors", () => {
	it("saves exactly feeling when feel is toggled", () => {
		const onSave = vi.fn();
		render(<RunningAnnotation activity={running} onSave={onSave} />);
		fireEvent.click(screen.getByLabelText("Feel II"));
		expect(onSave).toHaveBeenCalledOnce();
		expect(onSave).toHaveBeenCalledWith({ feeling: 2 });
	});
	it("shows required focus error for climbing", () => {
		render(
			<ClimbingAnnotation
				activity={{
					id: "2",
					subtype: "boulder",
					focus: null,
					feeling: 1,
					effort: 1,
					hard_tries: null,
					notes: null,
				}}
				onSave={vi.fn()}
			/>,
		);
		expect(screen.getByRole("alert")).toHaveTextContent("Focus is required");
	});
	it("clears selected weather to null", () => {
		const onSave = vi.fn();
		render(
			<RunningAnnotation
				activity={{ ...running, weather: "hot" }}
				onSave={onSave}
			/>,
		);
		fireEvent.click(screen.getByLabelText("Hot"));
		expect(onSave).toHaveBeenCalledWith({ weather: null });
	});
});
