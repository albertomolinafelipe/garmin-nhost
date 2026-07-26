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
	PlansDocument,
	PlanDocument,
	type GeneratedPlanQueryVariables,
	InsertPlanDocument,
	type GeneratedInsertPlanMutationVariables,
	UpdatePlanDocument,
	type GeneratedUpdatePlanMutationVariables,
	DeletePlanDocument,
	type GeneratedDeletePlanMutationVariables,
	InsertPlanRequirementDocument,
	type GeneratedInsertPlanRequirementMutationVariables,
	UpdatePlanRequirementDocument,
	type GeneratedUpdatePlanRequirementMutationVariables,
	DeletePlanRequirementDocument,
	type GeneratedDeletePlanRequirementMutationVariables,
	InsertPlanWorkoutDocument,
	type GeneratedInsertPlanWorkoutMutationVariables,
	UpdatePlanWorkoutDocument,
	type GeneratedUpdatePlanWorkoutMutationVariables,
	DeletePlanWorkoutDocument,
	type GeneratedDeletePlanWorkoutMutationVariables,
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

export function usePlansQuery() {
	return useQuery({
		queryKey: ["plans"],
		queryFn: () => graphQLClient.request(PlansDocument),
		select: (data) => data.plans,
	});
}

export function usePlanQuery(id: string | undefined) {
	return useQuery({
		queryKey: ["plan", id],
		enabled: Boolean(id),
		queryFn: () =>
			graphQLClient.request(PlanDocument, {
				id,
			} as GeneratedPlanQueryVariables),
		select: (data) => data.plans_by_pk,
	});
}

export function useInsertPlanMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedInsertPlanMutationVariables) =>
			graphQLClient.request(InsertPlanDocument, variables),
	});
}

export function useUpdatePlanMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedUpdatePlanMutationVariables) =>
			graphQLClient.request(UpdatePlanDocument, variables),
	});
}

export function useDeletePlanMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedDeletePlanMutationVariables) =>
			graphQLClient.request(DeletePlanDocument, variables),
	});
}

export function useInsertPlanRequirementMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedInsertPlanRequirementMutationVariables) =>
			graphQLClient.request(InsertPlanRequirementDocument, variables),
	});
}

export function useUpdatePlanRequirementMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedUpdatePlanRequirementMutationVariables) =>
			graphQLClient.request(UpdatePlanRequirementDocument, variables),
	});
}

export function useDeletePlanRequirementMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedDeletePlanRequirementMutationVariables) =>
			graphQLClient.request(DeletePlanRequirementDocument, variables),
	});
}

export function useInsertPlanWorkoutMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedInsertPlanWorkoutMutationVariables) =>
			graphQLClient.request(InsertPlanWorkoutDocument, variables),
	});
}

export function useUpdatePlanWorkoutMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedUpdatePlanWorkoutMutationVariables) =>
			graphQLClient.request(UpdatePlanWorkoutDocument, variables),
	});
}

export function useDeletePlanWorkoutMutation() {
	return useMutation({
		mutationFn: (variables: GeneratedDeletePlanWorkoutMutationVariables) =>
			graphQLClient.request(DeletePlanWorkoutDocument, variables),
	});
}
