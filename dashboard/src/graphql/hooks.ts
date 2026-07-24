import { useMutation, useQuery } from "@tanstack/react-query";
import { graphQLClient } from "./client";
import {
	ActivitiesSmokeDocument,
	SyncActivitiesDocument,
	type SyncActivitiesMutationVariables,
} from "./generated";

export function useActivitiesSmokeQuery() {
	return useQuery({
		queryKey: ["ActivitiesSmoke"],
		queryFn: () => graphQLClient.request(ActivitiesSmokeDocument),
	});
}

export function useSyncActivitiesMutation() {
	return useMutation({
		mutationFn: (variables: SyncActivitiesMutationVariables = {}) =>
			graphQLClient.request(SyncActivitiesDocument, variables),
	});
}
