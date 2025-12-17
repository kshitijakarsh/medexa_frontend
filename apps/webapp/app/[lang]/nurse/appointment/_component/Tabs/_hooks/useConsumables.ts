"use client";

import { createConsumablesApiClient } from "@/lib/api/doctor/consumables-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Consumable } from "../consumable/consumable";

const api = createConsumablesApiClient({});

/* ---------------- GET BY VISIT (Doctor) ---------------- */
export function useConsumablesByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["consumables", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisitForDoctor(visitId);
      return res.data?.data as Consumable[];
    },
  });
}

/* ---------------- HISTORY BY PATIENT ---------------- */
export function useConsumablesHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["consumables-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ---------------- SINGLE CONSUMABLE ---------------- */
export function useConsumableHistoryOne(id: string) {
  return useQuery({
    queryKey: ["consumable-history-one", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.getById(id);
      return res.data?.data ?? null;
    },
  });
}

/* ---------- CREATE ---------- */
export function useCreateConsumable(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      visit_id: string;
      patient_id: string;
      item_name: string;
      quantity: number;
      cost?: string;
      status?: string;
      notes?: string;
    }) => api.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consumables", visitId] });
    },
  });
}

/* ---------------- SAVE (POST / PUT) ---------------- */
export function useSaveConsumable(consumableId?: string) {
  return useMutation({
    mutationFn: async (payload: any) => {
      if (consumableId) {
        return api.update(consumableId, payload);
      }
      return api.create(payload);
    },
  });
}

/* ---------------- DELETE ---------------- */
export function useDeleteConsumable(visitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumables", visitId] });
      queryClient.invalidateQueries({ queryKey: ["consumables-history"] });
    },
  });
}

/* ---------------- SINGLE VISIT Consumables (DETAIL VIEW) ---------------- */
export function useConsumableHistoryOneVisitId(visitId: string) {
  return useQuery({
    queryKey: ["consumableHistoryByVisitId", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getConsumablesByVisitId(visitId);
      return res.data?.data ?? [];
    },
  });
}
