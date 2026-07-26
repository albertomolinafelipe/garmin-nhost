import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
	className,
	...props
}: NumberInputProps) {
	return (
		<Input
			type="number"
			value={value ?? ""}
			min={nonNegative ? 0 : undefined}
			step={integer ? 1 : "any"}
			className={cn(
				"[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
				className,
			)}
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
