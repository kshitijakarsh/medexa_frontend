"use client";

import { createVitalsApiClient } from "@/lib/api/doctor/vitals-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const api = createVitalsApiClient({});

/* ---------------- GET VITALS BY VISIT (Doctor) ---------------- */
export function useVitalsByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["vitals", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisitForDoctor(visitId);
      return res.data?.data ?? null;
    },
  });
}

/* ---------------- SAVE VITALS (POST / PUT) ---------------- */
export function useSaveVitals(vitalsId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      if (vitalsId) {
        return api.update(vitalsId, payload);
      }
      return api.create(payload);
    },
    onSuccess: (_, __) => {
      // Refetch vitals after save
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      queryClient.invalidateQueries({ queryKey: ["vitals-history"] });
    },
  });
}

/* ---------------- DELETE VITALS ---------------- */
export function useDeleteVitals() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vitalsId: number) => {
      return api.delete(vitalsId);
    },
    onSuccess: () => {
      // Refetch vitals after delete
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      queryClient.invalidateQueries({ queryKey: ["vitals-history"] });
    },
  });
}

/* ---------------- VITALS HISTORY (PATIENT) ---------------- */
export function useVitalsHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["vitals-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ---------------- SINGLE VITALS (DETAIL VIEW) ---------------- */
export function useVitalsHistoryOne(vitalsId: string) {
  return useQuery({
    queryKey: ["vitals-history-one", vitalsId],
    enabled: !!vitalsId,
    queryFn: async () => {
      const res = await api.getById(vitalsId);
      return res.data?.data ?? null;
    },
  });
}
