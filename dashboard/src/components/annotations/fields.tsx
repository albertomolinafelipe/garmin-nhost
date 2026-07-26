import type { ComponentType, ReactNode } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Field({
	label,
	hint,
	error,
	inline,
	children,
}: {
	label: string;
	hint?: ReactNode;
	error?: ReactNode;
	inline?: boolean;
	children: ReactNode;
}) {
	if (inline) {
		return (
			<div className="flex items-center gap-3">
				<span className="text-muted-foreground w-20 shrink-0 text-[11px] font-semibold tracking-wide uppercase">
					{label}
				</span>
				<div className="min-w-0 flex-1">{children}</div>
			</div>
		);
	}
	return (
		<div className="space-y-1.5">
			<div className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
				{label}
			</div>
			{children}
			{error ? (
				<p role="alert" className="text-destructive text-xs">
					{error}
				</p>
			) : null}
			{!error && hint ? (
				<p className="text-muted-foreground text-xs">{hint}</p>
			) : null}
		</div>
	);
}

export interface SegmentedOption {
	value: string;
	label?: ReactNode;
	ariaLabel?: string;
	disabled?: boolean;
	icon?: ComponentType<{ className?: string }>;
}

// Inline row: uppercase label on the left, a connected button group on the right.
export function SegmentedField({
	label,
	options,
	value,
	onChange,
	hint,
	error,
}: {
	label: string;
	options: SegmentedOption[];
	value: string;
	onChange: (value: string) => void;
	hint?: ReactNode;
	error?: ReactNode;
}) {
	return (
		<div className="space-y-1">
			<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
				<span className="text-muted-foreground w-20 shrink-0 text-[11px] font-semibold tracking-wide uppercase">
					{label}
				</span>
				<ToggleGroup
					type="single"
					variant="outline"
					size="sm"
					value={value}
					onValueChange={onChange}
					className="flex-wrap"
				>
					{options.map((option) => {
						const Icon = option.icon;
						return (
							<ToggleGroupItem
								key={option.value}
								value={option.value}
								disabled={option.disabled}
								aria-label={option.ariaLabel}
							>
								{Icon ? <Icon className="size-3.5" /> : null}
								{option.label}
							</ToggleGroupItem>
						);
					})}
				</ToggleGroup>
			</div>
			{error ? (
				<p role="alert" className="text-destructive text-xs">
					{error}
				</p>
			) : null}
			{!error && hint ? (
				<p className="text-muted-foreground text-xs">{hint}</p>
			) : null}
		</div>
	);
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
