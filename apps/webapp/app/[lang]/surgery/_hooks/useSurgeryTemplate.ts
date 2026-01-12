import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createSurgeryTemplateApiClient,
    SurgeryTemplate
} from "@/lib/api/surgery/templates";

// Hook keys
export const surgeryTemplateKeys = {
    all: ["surgery-templates"] as const,
    lists: () => [...surgeryTemplateKeys.all, "list"] as const,
    list: (params: any) => [...surgeryTemplateKeys.lists(), params] as const,
    procedures: () => ["surgery-procedures"] as const,
    clearances: () => ["surgery-clearances"] as const,
    consents: () => ["surgery-consents"] as const,
};

/**
 * Hook to fetch all surgery templates
 */
export function useSurgeryTemplates(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) {
    const templatesApi = createSurgeryTemplateApiClient({});
    return useQuery({
        queryKey: surgeryTemplateKeys.list(params),
        queryFn: async () => {
            const response = await templatesApi.getTemplates(params);
            return response.data;
        },
    });
}

/**
 * Hook to create a new surgery template
 */
export function useCreateSurgeryTemplate() {
    const queryClient = useQueryClient();
    const templatesApi = createSurgeryTemplateApiClient({});

    return useMutation({
        mutationFn: async (payload: Partial<SurgeryTemplate>) => {
            const response = await templatesApi.create(payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: surgeryTemplateKeys.lists() });
        },
    });
}

/**
 * Hook to fetch procedures
 */
export function useSurgeryProcedures(params?: { limit?: number; search?: string }) {
    const templatesApi = createSurgeryTemplateApiClient({});
    return useQuery({
        queryKey: surgeryTemplateKeys.procedures(),
        queryFn: async () => {
            const response = await templatesApi.getProcedures({ limit: params?.limit ?? 100, search: params?.search });
            return response.data.data;
        },
    });
}

/**
 * Hook to fetch clearances
 */
export function useSurgeryClearances(params?: { limit?: number; search?: string }) {
    const templatesApi = createSurgeryTemplateApiClient({});
    return useQuery({
        queryKey: surgeryTemplateKeys.clearances(),
        queryFn: async () => {
            const response = await templatesApi.getClearances({ limit: params?.limit ?? 100, search: params?.search });
            return response.data.data;
        },
    });
}

/**
 * Hook to fetch consents
 */
export function useSurgeryConsents(params?: { limit?: number; search?: string }) {
    const templatesApi = createSurgeryTemplateApiClient({});
    return useQuery({
        queryKey: surgeryTemplateKeys.consents(),
        queryFn: async () => {
            const response = await templatesApi.getConsents({ limit: params?.limit ?? 100, search: params?.search });
            return response.data.data;
        },
    });
}
