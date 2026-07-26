import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./alert-dialog";
import { NumberInput } from "./number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { TagsInput } from "./tags-input";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("form primitives", () => {
	it("opens a select and chooses an option", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		render(
			<Select onValueChange={onValueChange}>
				<SelectTrigger aria-label="Terrain">
					<SelectValue placeholder="Choose" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="trail">Trail</SelectItem>
				</SelectContent>
			</Select>,
		);
		await user.click(screen.getByRole("combobox", { name: "Terrain" }));
		await user.click(screen.getByRole("option", { name: "Trail" }));
		expect(onValueChange).toHaveBeenCalledWith("trail");
	});

	it("changes a single-select toggle group", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		render(
			<ToggleGroup
				type="single"
				onValueChange={onValueChange}
				aria-label="Feeling"
			>
				<ToggleGroupItem value="1">I</ToggleGroupItem>
				<ToggleGroupItem value="2">II</ToggleGroupItem>
			</ToggleGroup>,
		);
		await user.click(screen.getByRole("radio", { name: "II" }));
		expect(onValueChange).toHaveBeenCalledWith("2");
	});

	it("adds and removes tags by keyboard and chip button", async () => {
		const user = userEvent.setup();
		function Harness() {
			const [tags, setTags] = useState<string[]>(["water"]);
			return <TagsInput value={tags} onChange={setTags} />;
		}
		render(<Harness />);
		const input = screen.getByRole("textbox", { name: "Add tag" });
		await user.type(input, "gel{Enter}");
		expect(screen.getByText("gel")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Remove gel" }));
		expect(screen.queryByText("gel")).not.toBeInTheDocument();
		await user.click(input);
		await user.keyboard("{Backspace}");
		expect(screen.queryByText("water")).not.toBeInTheDocument();
	});

	it("emits numbers and null while rejecting constrained negatives", async () => {
		const user = userEvent.setup();
		const changes: Array<number | null> = [];
		function Harness() {
			const [value, setValue] = useState<number | null>(null);
			return (
				<NumberInput
					aria-label="Sets"
					value={value}
					integer
					nonNegative
					onChange={(next) => {
						changes.push(next);
						setValue(next);
					}}
				/>
			);
		}
		render(<Harness />);
		const input = screen.getByRole("spinbutton", { name: "Sets" });
		await user.type(input, "12");
		expect(changes).toContain(12);
		await user.clear(input);
		expect(changes.at(-1)).toBeNull();
		await user.type(input, "-2");
		expect(changes).not.toContain(-2);
	});

	it("runs alert dialog confirm and cancel callbacks", async () => {
		const user = userEvent.setup();
		const confirm = vi.fn();
		const cancel = vi.fn();
		render(
			<AlertDialog>
				<AlertDialogTrigger>Delete</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogTitle>Delete exercise?</AlertDialogTitle>
					<AlertDialogDescription>
						This cannot be undone.
					</AlertDialogDescription>
					<AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={confirm}>Confirm</AlertDialogAction>
				</AlertDialogContent>
			</AlertDialog>,
		);
		await user.click(screen.getByRole("button", { name: "Delete" }));
		await user.click(screen.getByRole("button", { name: "Cancel" }));
		expect(cancel).toHaveBeenCalledOnce();
		await user.click(screen.getByRole("button", { name: "Delete" }));
		await user.click(screen.getByRole("button", { name: "Confirm" }));
		expect(confirm).toHaveBeenCalledOnce();
	});
});
