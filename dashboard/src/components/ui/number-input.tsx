import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";

interface NumberInputProps
	extends Omit<
		ComponentProps<typeof Input>,
		"type" | "value" | "onChange" | "min" | "step"
	> {
	value: number | null;
	onChange: (value: number | null) => void;
	integer?: boolean;
	nonNegative?: boolean;
}

function NumberInput({
	value,
	onChange,
	integer = false,
	nonNegative = false,
	...props
}: NumberInputProps) {
	return (
		<Input
			type="number"
			value={value ?? ""}
			min={nonNegative ? 0 : undefined}
			step={integer ? 1 : "any"}
			onChange={(event) => {
				if (event.target.value === "") {
					onChange(null);
					return;
				}
				const next = Number(event.target.value);
				if (
					!Number.isFinite(next) ||
					(integer && !Number.isInteger(next)) ||
					(nonNegative && next < 0)
				) {
					return;
				}
				onChange(next);
			}}
			{...props}
		/>
	);
}

export { NumberInput, type NumberInputProps };
