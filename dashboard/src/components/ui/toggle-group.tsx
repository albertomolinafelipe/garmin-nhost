import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border border-input bg-transparent shadow-xs",
			},
			size: { default: "h-9 px-3", sm: "h-8 px-2", lg: "h-10 px-4" },
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

type ToggleContextValue = VariantProps<typeof toggleVariants>;
const ToggleContext = React.createContext<ToggleContextValue>({});

function ToggleGroup({
	className,
	variant,
	size,
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
	ToggleContextValue) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			className={cn("flex w-fit items-center gap-1", className)}
			{...props}
		>
			<ToggleContext.Provider value={{ variant, size }}>
				{children}
			</ToggleContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
}
function ToggleGroupItem({
	className,
	children,
	variant,
	size,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
	ToggleContextValue) {
	const context = React.useContext(ToggleContext);
	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			className={cn(
				toggleVariants({
					variant: variant ?? context.variant,
					size: size ?? context.size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
}

export { ToggleGroup, ToggleGroupItem, toggleVariants };
