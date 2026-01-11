import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createSurgeryTeamApiClient,
    CreateSurgeryTeamParams,
    UpdateSurgeryTeamParams
} from "@/lib/api/surgery/teams";
import { createDoctorApiClient } from "@/lib/api/surgery/doctor";
import { createNurseApiClient } from "@/lib/api/nurse-api";
import { getIdToken } from "@/app/utils/auth";

// Hook keys
export const surgeryTeamKeys = {
    all: ["surgery-teams"] as const,
    lists: () => [...surgeryTeamKeys.all, "list"] as const,
    list: (params: any) => [...surgeryTeamKeys.lists(), params] as const,
    details: () => [...surgeryTeamKeys.all, "detail"] as const,
    detail: (id: string | number) => [...surgeryTeamKeys.details(), id] as const,
    doctors: () => ["surgery-doctors"] as const,
    nurses: () => ["surgery-nurses"] as const,
};

/**
 * Hook to fetch all surgery teams
 */
export function useSurgeryTeams(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) {
    const teamsApi = createSurgeryTeamApiClient({});
    return useQuery({
        queryKey: surgeryTeamKeys.list(params),
        queryFn: async () => {
            const response = await teamsApi.getAll(params);
            return response.data; // This returns the full response with pagination
        },
    });
}

/**
 * Hook to fetch a single surgery team by ID
 */
export function useSurgeryTeam(id?: string | number) {
    const teamsApi = createSurgeryTeamApiClient({});
    return useQuery({
        queryKey: surgeryTeamKeys.detail(id!),
        queryFn: async () => {
            const response = await teamsApi.getById(id!.toString());
            return response.data.data;
        },
        enabled: !!id,
    });
}

/**
 * Hook to create a new surgery team
 */
export function useCreateSurgeryTeam() {
    const queryClient = useQueryClient();
    const teamsApi = createSurgeryTeamApiClient({});

    return useMutation({
        mutationFn: async (payload: CreateSurgeryTeamParams) => {
            const response = await teamsApi.create(payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: surgeryTeamKeys.lists() });
        },
    });
}

/**
 * Hook to update an existing surgery team
 */
export function useUpdateSurgeryTeam() {
    const queryClient = useQueryClient();
    const teamsApi = createSurgeryTeamApiClient({});

    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: UpdateSurgeryTeamParams }) => {
            const response = await teamsApi.update(id, payload);
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: surgeryTeamKeys.lists() });
            queryClient.invalidateQueries({ queryKey: surgeryTeamKeys.detail(variables.id) });
        },
    });
}

/**
 * Hook to delete a surgery team
 */
export function useDeleteSurgeryTeam() {
    const queryClient = useQueryClient();
    const teamsApi = createSurgeryTeamApiClient({});

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await teamsApi.delete(id);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: surgeryTeamKeys.lists() });
        },
    });
}

/**
 * Hook to fetch doctors (soap-notes-creators)
 */
export function useSurgeryDoctors(params?: { limit?: number; search?: string }) {
    const doctorApi = createDoctorApiClient({});
    return useQuery({
        queryKey: surgeryTeamKeys.doctors(),
        queryFn: async () => {
            const response = await doctorApi.getAll({ limit: params?.limit ?? 100, search: params?.search });
            return response.data.data;
        },
    });
}

/**
 * Hook to fetch nurses (consumables-creators)
 */
export function useSurgeryNurses(params?: { limit?: number }) {
    return useQuery({
        queryKey: surgeryTeamKeys.nurses(),
        queryFn: async () => {
            const token = await getIdToken();
            const nurseApi = createNurseApiClient({ authToken: token || "" });
            const response = await nurseApi.getConsumablesCreators({ limit: params?.limit ?? 100 } as any);
            return response.data.data;
        },
    });
}
