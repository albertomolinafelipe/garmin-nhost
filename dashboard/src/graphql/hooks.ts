import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "./client";
import { ActivitiesSmokeDocument } from "./generated";

export function useActivitiesSmokeQuery() {
	return useQuery({
		queryKey: ["ActivitiesSmoke"],
		queryFn: () => graphQLClient.request(ActivitiesSmokeDocument),
	});
}
