"use client";

import { createWardApiClient, CreateConsumptionLogParams } from "@/lib/api/surgery/ward";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";

const api = createWardApiClient({});

export function useConsumptionLogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    usage_type?: string;
}) {
    return useQuery({
        queryKey: ["consumption-logs", params],
        queryFn: async () => {
            const res = await api.getConsumptionLogs(params);
            return res.data;
        },
    });
}

export function useConsumptionLog(id?: string) {
    return useQuery({
        queryKey: ["consumption-log", id],
        queryFn: async () => {
            if (!id) return null;
            const res = await api.getConsumptionLog(id);
            return res.data;
        },
        enabled: !!id,
    });
}

// CREATE CONSUMPTION LOG

export function useCreateConsumptionLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateConsumptionLogParams) => api.createConsumptionLog(payload),
        onSuccess: () => {
            toast.success("Consumption log added successfully");
            queryClient.invalidateQueries({ queryKey: ["consumption-logs"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add consumption log");
        },
    });
}

// UPDATE CONSUMPTION LOG

export function useUpdateConsumptionLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateConsumptionLogParams> }) => api.updateConsumptionLog(id, payload),
        onSuccess: () => {
            toast.success("Consumption log updated successfully");
            queryClient.invalidateQueries({ queryKey: ["consumption-logs"] });
            queryClient.invalidateQueries({ queryKey: ["consumption-log"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update consumption log");
        },
    });
}

// DELETE CONSUMPTION LOG

export function useDeleteConsumptionLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.deleteConsumptionLog(id),
        onSuccess: () => {
            toast.success("Consumption log deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["consumption-logs"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete consumption log");
        },
    });
}

// GET WARD STOCK

export function useWardStock(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
}) {
    return useQuery({
        queryKey: ["ward-stock", params],
        queryFn: async () => {
            const res = await api.getWardStock(params);
            return res.data;
        },
    });
}

// GET EQUIPMENT USAGE LOGS

export function useEquipmentUsageLogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) {
    return useQuery({
        queryKey: ["equipment-usage-logs", params],
        queryFn: async () => {
            const res = await api.getEquipmentUsageLogs(params);
            return res.data;
        },
    });
}

export function useEquipmentUsageLog(id?: string) {
    return useQuery({
        queryKey: ["equipment-usage-log", id],
        queryFn: async () => {
            if (!id) return null;
            const res = await api.getEquipmentUsageLog(id);
            return res.data;
        },
        enabled: !!id,
    });
}

// CREATE EQUIPMENT USAGE LOG

export function useCreateEquipmentUsageLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: any) => api.createEquipmentUsageLog(payload),
        onSuccess: () => {
            toast.success("Equipment usage log added successfully");
            queryClient.invalidateQueries({ queryKey: ["equipment-usage-logs"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add equipment usage log");
        },
    });
}

// UPDATE EQUIPMENT USAGE LOG

export function useUpdateEquipmentUsageLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) => api.updateEquipmentUsageLog(id, payload),
        onSuccess: () => {
            toast.success("Equipment usage log updated successfully");
            queryClient.invalidateQueries({ queryKey: ["equipment-usage-logs"] });
            queryClient.invalidateQueries({ queryKey: ["equipment-usage-log"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update equipment usage log");
        },
    });
}

// DELETE EQUIPMENT USAGE LOG

export function useDeleteEquipmentUsageLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.deleteEquipmentUsageLog(id),
        onSuccess: () => {
            toast.success("Equipment usage log deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["equipment-usage-logs"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete equipment usage log");
        },
    });
}

// GET ALL WARDS

export function useWards() {
    return useQuery({
        queryKey: ["wards"],
        queryFn: async () => {
            const res = await api.getWards();
            return res.data;
        },
    });
}
