"use client";

import { createSurgeryApiClient, CreateSurgeryParams, Surgery } from "@/lib/api/surgery/surgeries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";

const api = createSurgeryApiClient({});

// GET SURGERY BY ID

export function useSurgeryById(surgeryId?: string) {
    return useQuery({
        queryKey: ["surgery-details", surgeryId],
        enabled: !!surgeryId && surgeryId !== "new",
        queryFn: async () => {
            if (!surgeryId || surgeryId === "new") return null;
            const res = await api.getById(surgeryId);
            return res.data?.data ?? null;
        },
    });
}

// GET ALL SURGERIES

export function useSurgeries(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    urgency?: string;
    department?: string;
}) {
    return useQuery({
        queryKey: ["surgeries", params],
        queryFn: async () => {
            const res = await api.getAll(params);
            return res.data;
        },
    });
}

// CREATE SURGERY

export function useCreateSurgery() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSurgeryParams) => api.create(payload),
        onSuccess: () => {
            toast.success("Surgery sent to OT successfully");
            queryClient.invalidateQueries({ queryKey: ["surgeries"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send surgery to OT");
        },
    });
}
