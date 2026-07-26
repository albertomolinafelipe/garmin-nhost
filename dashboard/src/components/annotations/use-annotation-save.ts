import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUpdateActivityMutation } from "@/graphql/hooks";
import { toActivitySetInput, type AnnotationInput } from "@/lib/annotations";

const queues = new Map<string, Promise<void>>();

export function useAnnotationSave(activityId: string) {
	const queryClient = useQueryClient();
	const mutation = useUpdateActivityMutation();
	const mutationRef = useRef(mutation.mutateAsync);
	mutationRef.current = mutation.mutateAsync;
	const idRef = useRef(activityId);
	useEffect(() => {
		idRef.current = activityId;
	}, [activityId]);

	return useCallback(
		(patch: AnnotationInput): Promise<boolean> => {
			const set = toActivitySetInput(patch);
			if (Object.keys(set).length === 0) return Promise.resolve(true);
			const id = activityId;
			const previous = queues.get(id) ?? Promise.resolve();
			const result = previous
				.catch(() => undefined)
				.then(async () => {
					try {
						const data = await mutationRef.current({
							id,
							patch: set as AnnotationInput,
						});
						if (idRef.current === id && data.update_activities_by_pk) {
							queryClient.setQueryData(["activity", id], (current: unknown) => {
								const cached = current as
									| { activities_by_pk?: Record<string, unknown> }
									| undefined;
								return {
									activities_by_pk: {
										...cached?.activities_by_pk,
										...data.update_activities_by_pk,
									},
								};
							});
						}
						await queryClient.invalidateQueries({ queryKey: ["activities"] });
						if ("food_during" in set || "food_after" in set) {
							await queryClient.invalidateQueries({
								queryKey: ["food-options"],
							});
						}
						return true;
					} catch {
						toast.error("Could not save annotation");
						return false;
					}
				});
			const chain = result.then(() => undefined);
			queues.set(id, chain);
			void chain.finally(() => {
				if (queues.get(id) === chain) queues.delete(id);
			});
			return result;
		},
		[activityId, queryClient],
	);
}
