"use client";

import { createEquipmentApiClient } from "@/lib/api/doctor/equipment-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Equipment } from "../equipment/equipment";

const api = createEquipmentApiClient({});

/* ---------------- GET BY VISIT (Doctor) ---------------- */
export function useEquipmentsByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["equipment", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisitForDoctor(visitId);
      return res.data?.data as Equipment[];
    },
  });
}

/* ---------------- HISTORY BY PATIENT ---------------- */
export function useEquipmentsHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["equipment-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ---------------- SINGLE EQUIPMENT ---------------- */
export function useEquipmentHistoryOne(id: string) {
  return useQuery({
    queryKey: ["equipment-history-one", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.getById(id);
      return res.data?.data ?? null;
    },
  });
}

/* ---------- CREATE ---------- */
export function useCreateEquipment(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      visit_id: string;
      patient_id: string;
      item_name: string;
      asset_tag: string;
      asset_id?: string;
      condition_before_use?: string;
      start_time?: string;
      end_time?: string;
      cost?: string;
      status: string;
      notes?: string;
    }) => api.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment", visitId] });
    },
  });
}

/* ---------------- SAVE (POST / PUT) ---------------- */
export function useSaveEquipment(equipmentId?: string) {
  return useMutation({
    mutationFn: async (payload: any) => {
      if (equipmentId) {
        return api.update(equipmentId, payload);
      }
      return api.create(payload);
    },
  });
}

/* ---------------- DELETE ---------------- */
export function useDeleteEquipment(visitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment", visitId] });
      queryClient.invalidateQueries({ queryKey: ["equipment-history"] });
    },
  });
}

/* ---------------- SINGLE VISIT Equipment (DETAIL VIEW) ---------------- */
export function useEquipmentHistoryOneVisitId(visitId: string) {
  return useQuery({
    queryKey: ["equipmentHistoryByVisitId", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getEquipmentsByVisitId(visitId);
      return res.data?.data ?? [];
    },
  });
}
