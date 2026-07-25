import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Panel({
	title,
	className,
	children,
}: {
	title: string;
	className?: string;
	children?: ReactNode;
}) {
	return (
		<Card className={cn("min-h-0 gap-3 py-4", className)}>
			<CardHeader className="px-4">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
			</CardHeader>
			<CardContent className="min-h-0 flex-1 px-4">
				<div className="text-muted-foreground bg-muted/30 flex h-full min-h-24 items-center justify-center rounded-md text-sm">
					{children ?? "Coming soon"}
				</div>
			</CardContent>
		</Card>
	);
}

export function Overview() {
	return (
		<div className="flex h-full flex-col gap-4 p-4">
			{/* Row 1: running load (wide) + climbing & weights load */}
			<div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
				<Panel title="Running load" className="flex-[2]" />
				<Panel title="Climbing & weights load" className="flex-1" />
			</div>
			{/* Row 2: sleep + latest run route */}
			<div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
				<Panel title="Sleep" className="flex-1" />
				<Panel title="Latest run route" className="flex-1" />
			</div>
		</div>
	);
}
