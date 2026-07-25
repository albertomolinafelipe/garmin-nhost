import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useSyncActivitiesMutation } from "@/graphql/hooks";
import { cn } from "@/lib/utils";

export function SyncButton() {
	const queryClient = useQueryClient();
	const sync = useSyncActivitiesMutation();

	function run() {
		sync.mutate(
			{},
			{
				onSuccess: (data) => {
					const r = data.syncActivities;
					if (r.errors && r.errors.length > 0) {
						toast.warning("Sync finished with errors", {
							description: r.errors.join("; "),
						});
					} else {
						toast.success("Sync complete", {
							description: `${r.activities_created} created · ${r.activities_updated} updated · ${r.streams_written} streams`,
						});
					}
					queryClient.invalidateQueries({ queryKey: ["activities"] });
				},
				onError: (error) => {
					toast.error("Sync failed", {
						description: error instanceof Error ? error.message : String(error),
					});
				},
			},
		);
	}

	return (
		<Button
			variant="ghost"
			className="w-full justify-start"
			disabled={sync.isPending}
			onClick={run}
		>
			<RefreshCw className={cn("size-4", sync.isPending && "animate-spin")} />
			{sync.isPending ? "Syncing…" : "Sync"}
		</Button>
	);
}
