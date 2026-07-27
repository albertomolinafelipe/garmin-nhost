import { useLayoutEffect, useRef, type ReactNode } from "react";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

// A chronologically-sorted list (oldest first) that keeps past items mounted
// but scrolled above the fold. The upcoming block is forced to at least the
// viewport height (min-h-full), so past items always sit above it and the
// view rests with the first upcoming item at the top — even when there are
// only a couple of items. A single mount-time scroll positions it; no
// measurement feedback loop.
export function TimelineList<T>({
	items,
	getKey,
	isPast,
	renderItem,
	loading,
	empty,
}: {
	items: T[];
	getKey: (item: T) => string;
	// Whether an item is in the past. Items are assumed sorted so all past
	// items come first.
	isPast: (item: T) => boolean;
	renderItem: (item: T) => ReactNode;
	loading?: boolean;
	empty?: ReactNode;
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const upcomingRef = useRef<HTMLDivElement>(null);

	const firstUpcoming = items.findIndex((item) => !isPast(item));
	// Everything is past → split sits at the end; otherwise at the first upcoming.
	const splitIndex = firstUpcoming === -1 ? items.length : firstUpcoming;
	const past = items.slice(0, splitIndex);
	const upcoming = items.slice(splitIndex);

	useLayoutEffect(() => {
		const container = scrollRef.current;
		const upcomingEl = upcomingRef.current;
		if (!container || !upcomingEl) return;
		container.scrollTop = upcomingEl.offsetTop;
	}, [splitIndex, items.length]);

	if (!loading && items.length === 0) {
		return <div className="min-h-0 flex-1 overflow-y-auto p-2">{empty}</div>;
	}

	return (
		<div
			ref={scrollRef}
			className="relative min-h-0 flex-1 overflow-y-auto p-2"
		>
			{past.length > 0 ? (
				<ul className="flex flex-col gap-1">
					{past.map((item) => (
						<li key={getKey(item)}>{renderItem(item)}</li>
					))}
				</ul>
			) : null}
			<div ref={upcomingRef} className="flex min-h-full flex-col">
				{past.length > 0 ? (
					<PreviousMarker
						onClick={() => scrollRef.current?.scrollTo({ top: 0 })}
					/>
				) : null}
				<ul className="flex flex-col gap-1">
					{upcoming.map((item) => (
						<li key={getKey(item)}>{renderItem(item)}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function PreviousMarker({ onClick }: { onClick: () => void }) {
	return (
		<div className="flex justify-center py-1">
			<Button
				variant="ghost"
				size="sm"
				className="text-muted-foreground h-7 gap-1 text-xs"
				onClick={onClick}
			>
				<ChevronUp className="size-3.5" />
				Previous
			</Button>
		</div>
	);
}
