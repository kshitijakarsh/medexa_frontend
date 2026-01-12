"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createOperationApiClient,
    CreateProcedurePayload,
    UpdateProcedurePayload,
} from "@/lib/api/administration/operation";
import { toast } from "@workspace/ui/lib/sonner";

const api = createOperationApiClient();

// GET ALL PROCEDURES

export function useProcedures(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    surgery_type?: string;
}) {
    return useQuery({
        queryKey: ["procedures", params],
        queryFn: async () => {
            const res = await api.getAll(params);
            return res.data;
        },
    });
}

// GET PROCEDURE BY ID

export function useProcedureById(procedureId?: string) {
    return useQuery({
        queryKey: ["procedure-details", procedureId],
        enabled: !!procedureId,
        queryFn: async () => {
            if (!procedureId) return null;
            const res = await api.getById(procedureId);
            return res.data?.data ?? null;
        },
    });
}

// CREATE PROCEDURE

export function useCreateProcedure() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProcedurePayload) => api.create(payload),
        onSuccess: () => {
            toast.success("Procedure created successfully");
            queryClient.invalidateQueries({ queryKey: ["procedures"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create procedure");
        },
    });
}

// UPDATE PROCEDURE

export function useUpdateProcedure() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateProcedurePayload }) =>
            api.update(id, payload),
        onSuccess: () => {
            toast.success("Procedure updated successfully");
            queryClient.invalidateQueries({ queryKey: ["procedures"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update procedure");
        },
    });
}

// DELETE PROCEDURE

export function useDeleteProcedure() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.delete(id),
        onSuccess: () => {
            toast.success("Procedure deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["procedures"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete procedure");
        },
    });
}
