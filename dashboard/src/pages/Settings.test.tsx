import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Settings } from "./Settings";

const mocks = vi.hoisted(() => ({
	insert: vi.fn(),
	update: vi.fn(),
	remove: vi.fn(),
	toastError: vi.fn(),
}));

vi.mock("sonner", () => ({ toast: { error: mocks.toastError } }));
vi.mock("@/graphql/hooks", () => ({
	useExercisesQuery: () => ({
		data: {
			exercises: [{ id: "1", name: "Deadlift", categories: ["barbell"] }],
		},
		isLoading: false,
		isError: false,
	}),
	useInsertExerciseMutation: () => ({
		mutateAsync: mocks.insert,
		isPending: false,
	}),
	useUpdateExerciseMutation: () => ({
		mutateAsync: mocks.update,
		isPending: false,
	}),
	useDeleteExerciseMutation: () => ({
		mutateAsync: mocks.remove,
		isPending: false,
	}),
}));

function setup() {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	const invalidate = vi
		.spyOn(client, "invalidateQueries")
		.mockResolvedValue(undefined);
	render(
		<QueryClientProvider client={client}>
			<Settings />
		</QueryClientProvider>,
	);
	return { invalidate };
}

afterEach(cleanup);

beforeEach(() => {
	mocks.insert.mockReset().mockResolvedValue({});
	mocks.update.mockReset().mockResolvedValue({});
	mocks.remove.mockReset().mockResolvedValue({});
	mocks.toastError.mockReset();
});

describe("Settings", () => {
	it("inserts an exercise with non-null empty categories and invalidates the catalog", async () => {
		const user = userEvent.setup();
		const { invalidate } = setup();
		await user.type(screen.getByLabelText("New exercise name"), "Squat");
		await user.click(screen.getByRole("button", { name: "Add exercise" }));
		await waitFor(() =>
			expect(mocks.insert).toHaveBeenCalledWith({
				name: "Squat",
				categories: [],
			}),
		);
		expect(invalidate).toHaveBeenCalledWith({ queryKey: ["exercises"] });
	});

	it("surfaces duplicate insert failures without clearing the row", async () => {
		mocks.insert.mockRejectedValueOnce(
			new Error("Uniqueness violation: duplicate key"),
		);
		const user = userEvent.setup();
		setup();
		const input = screen.getByLabelText("New exercise name");
		await user.type(input, "deadLIFT");
		await user.click(screen.getByRole("button", { name: "Add exercise" }));
		await waitFor(() =>
			expect(mocks.toastError).toHaveBeenCalledWith(
				"An exercise with that name already exists",
			),
		);
		expect(input).toHaveValue("deadLIFT");
	});

	it("restores the server name when a rename fails", async () => {
		mocks.update.mockRejectedValueOnce(
			new Error("duplicate key value violates unique constraint"),
		);
		const user = userEvent.setup();
		setup();
		const input = screen.getByLabelText("Name for Deadlift");
		await user.clear(input);
		await user.type(input, "DEADLIFT");
		await user.tab();
		await waitFor(() => expect(input).toHaveValue("Deadlift"));
		expect(mocks.toastError).toHaveBeenCalledWith(
			"An exercise with that name already exists",
		);
	});

	it("does not delete on cancel, then deletes on confirm and invalidates", async () => {
		const user = userEvent.setup();
		const { invalidate } = setup();
		await user.click(screen.getByRole("button", { name: "Delete Deadlift" }));
		await user.click(screen.getByRole("button", { name: "Cancel" }));
		expect(mocks.remove).not.toHaveBeenCalled();

		await user.click(screen.getByRole("button", { name: "Delete Deadlift" }));
		await user.click(
			screen.getByRole("button", { name: "Delete", hidden: false }),
		);
		await waitFor(() => expect(mocks.remove).toHaveBeenCalledWith({ id: "1" }));
		expect(invalidate).toHaveBeenCalledWith({ queryKey: ["exercises"] });
	});
});
