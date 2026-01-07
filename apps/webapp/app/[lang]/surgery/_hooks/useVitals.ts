"use client";

import { createVitalsApiClient, VitalRecord } from "@/lib/api/surgery/vitals";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
            // Return the most recent record (first in array)
            return res.data?.data?.[0] ?? null;
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
