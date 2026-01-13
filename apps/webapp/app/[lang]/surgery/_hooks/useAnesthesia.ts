import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnesthesiaApiClient, AnesthesiaPlan } from "@/lib/api/surgery/anesthesia";
import { toast } from "@workspace/ui/lib/sonner";

const anesthesiaApi = createAnesthesiaApiClient();

// Query Keys
export const anesthesiaKeys = {
    all: ["surgery-anesthesia"] as const,
    detail: (surgeryId: string) => [...anesthesiaKeys.all, surgeryId] as const,
};

export function useAnesthesia(surgeryId?: string) {
    return useQuery({
        queryKey: anesthesiaKeys.detail(surgeryId || ""),
        queryFn: async () => {
            if (!surgeryId) throw new Error("Surgery ID is required");
            const response = await anesthesiaApi.getAnesthesiaPlans(surgeryId);
            return response.data.data;
        },
        enabled: !!surgeryId,
    });
}

export function useUpdateAnesthesia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ surgeryId, data }: { surgeryId: string; data: Partial<AnesthesiaPlan> }) => {
            const response = await anesthesiaApi.updateAnesthesiaPlan(surgeryId, data);
            return response.data.data;
        },
        onSuccess: (data, { surgeryId }) => {
            queryClient.setQueryData(anesthesiaKeys.detail(surgeryId), data);
            queryClient.invalidateQueries({ queryKey: anesthesiaKeys.detail(surgeryId) });
            toast.success("Anesthesia plan updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update anesthesia plan");
        },
    });
}

export function useCreateAnesthesia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ surgeryId, data }: { surgeryId: string; data: Partial<AnesthesiaPlan> }) => {
            const response = await anesthesiaApi.saveAnesthesiaPlan(surgeryId, data);
            return response.data.data;
        },
        onSuccess: (data, { surgeryId }) => {
            queryClient.setQueryData(anesthesiaKeys.detail(surgeryId), data);
            queryClient.invalidateQueries({ queryKey: anesthesiaKeys.detail(surgeryId) });
            toast.success("Anesthesia plan created successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create anesthesia plan");
        },
    });
}

export function useDeleteAnesthesia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (surgeryId: string) => {
            await anesthesiaApi.deleteAnesthesiaPlan(surgeryId);
        },
        onSuccess: (_, surgeryId) => {
            queryClient.invalidateQueries({ queryKey: anesthesiaKeys.detail(surgeryId) });
            toast.success("Anesthesia plan deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete anesthesia plan");
        },
    });
}
