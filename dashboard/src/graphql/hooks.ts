import { useMutation, useQuery } from "@tanstack/react-query";
import { toActivitySetInput, type AnnotationInput } from "@/lib/annotations";
import { graphQLClient } from "./client";
import {
	ActivitiesSmokeDocument,
	ActivityDetailDocument,
	type GeneratedActivityDetailQueryVariables,
	CalendarActivitiesDocument,
	DeleteExerciseDocument,
	type GeneratedDeleteExerciseMutationVariables,
	ExercisesDocument,
	FoodOptionsDocument,
	InsertExerciseDocument,
	type GeneratedInsertExerciseMutationVariables,
	SyncActivitiesDocument,
	type GeneratedSyncActivitiesMutationVariables,
	UpdateActivityDocument,
	UpdateExerciseDocument,
	type GeneratedUpdateExerciseMutationVariables,
} from "./generated";

export function useActivitiesSmokeQuery() {
	return useQuery({
		queryKey: ["ActivitiesSmoke"],
		queryFn: () => graphQLClient.request(ActivitiesSmokeDocument),
	});
}

export function useCalendarActivitiesQuery() {
	return useQuery({
		queryKey: ["activities"],
		queryFn: () => graphQLClient.request(CalendarActivitiesDocument),
	});
}

export function useActivityDetailQuery(id: string | undefined) {
	return useQuery({
		queryKey: ["activity", id],
		enabled: Boolean(id),
		queryFn: () =>
			graphQLClient.request(ActivityDetailDocument, {
				id,
			} as GeneratedActivityDetailQueryVariables),
		select: (data) => data.activities_by_pk,
	});
}

export interface UpdateActivityVariables {
	id: string;
	patch: AnnotationInput;
}

export function useUpdateActivityMutation() {
	return useMutation({
		mutationFn: ({ id, patch }: UpdateActivityVariables) =>
			graphQLClient.request(UpdateActivityDocument, {
				id,
				set: toActivitySetInput(patch),
			}),
	});
}

export function useFoodOptionsQuery() {
	return useQuery({
		queryKey: ["food-options"],
		queryFn: () => graphQLClient.request(FoodOptionsDocument),
	});
}

export function useExercisesQuery() {
	return useQuery({
		queryKey: ["exercises"],
		queryFn: () => graphQLClient.request(ExercisesDocument),
	});
}

export function useInsertExerciseMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedInsertExerciseMutationVariables) =>
			graphQLClient.request(InsertExerciseDocument, variables),
	});
}

export function useUpdateExerciseMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedUpdateExerciseMutationVariables) =>
			graphQLClient.request(UpdateExerciseDocument, variables),
	});
}

export function useDeleteExerciseMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedDeleteExerciseMutationVariables) =>
			graphQLClient.request(DeleteExerciseDocument, variables),
	});
}

export function useSyncActivitiesMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedSyncActivitiesMutationVariables = {}) =>
			graphQLClient.request(SyncActivitiesDocument, variables),
	});
}
