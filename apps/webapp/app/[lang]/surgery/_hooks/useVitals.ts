"use client";

import { createVitalsApiClient, VitalRecord, CreateVitalsPayload, UpdateVitalsPayload } from "@/lib/api/surgery/vitals";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";

const api = createVitalsApiClient({});

// GET VITALS BY PATIENT ID

export function useVitalsByPatientId(patientId?: string) {
    return useQuery({
        queryKey: ["surgery-vitals", patientId],
        enabled: !!patientId,
        queryFn: async () => {
            if (!patientId) return null;
            const res = await api.getByPatientId(patientId);
            return res.data?.data ?? [];
        },
    });
}

// GET LATEST VITALS BY PATIENT ID

export function useLatestVitalsByPatientId(patientId?: string) {
    return useQuery({
        queryKey: ["surgery-vitals-latest", patientId],
        enabled: !!patientId,
        queryFn: async () => {
            if (!patientId) return null;
            const res = await api.getByPatientId(patientId);
            const records = res.data?.data ?? [];
            // Sort by recorded_at descending to ensure we get the latest
            const sortedRecords = records.sort((a, b) =>
                new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
            );
            return sortedRecords[0] ?? null;
        },
    });
}

// CREATE VITALS

export function useCreateVitals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateVitalsPayload) => {
            const response = await api.createVitals(data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals", variables.patient_id] });
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals-latest", variables.patient_id] });
            toast.success("Vitals created successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create vitals");
        },
    });
}

// UPDATE VITALS
export function useUpdateVitals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateVitalsPayload }) => {
            const response = await api.updateVitals(id, data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            if (variables.data.patient_id) {
                queryClient.invalidateQueries({ queryKey: ["surgery-vitals", variables.data.patient_id] });
                queryClient.invalidateQueries({ queryKey: ["surgery-vitals-latest", variables.data.patient_id] });
            }
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals"] });
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals-latest"] });
            toast.success("Vitals updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update vitals");
        },
    });
}

// SAVE VITALS (POST / PUT)

export function useSaveVitals(patientId?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: Partial<VitalRecord>) => {
            // TODO: Add create/update API method when available
            throw new Error("Save vitals API not implemented yet");
        },
        onSuccess: () => {
            // Refetch vitals after save
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals"] });
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals-latest"] });
        },
    });
}

// DELETE VITALS

export function useDeleteVitals(patientId?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (vitalsId: string) => {
            // TODO: Add delete API method when available
            throw new Error("Delete vitals API not implemented yet");
        },
        onSuccess: () => {
            // Refetch vitals after delete
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals"] });
            queryClient.invalidateQueries({ queryKey: ["surgery-vitals-latest"] });
        },
    });
}
