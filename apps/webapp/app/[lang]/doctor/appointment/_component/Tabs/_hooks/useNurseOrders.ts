"use client";

import { createNurseOrdersApiClient } from "@/lib/api/doctor/nurse-orders-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NurseOrder } from "../nurse-orders/nurse-order";

const api = createNurseOrdersApiClient({});

/* ---------------- GET BY VISIT ---------------- */
export function useNurseOrdersByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["nurse-orders", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisit(visitId);
      return res.data?.data as NurseOrder[];
    },
  });
}

/* ---------------- CREATE ---------------- */
export function useCreateNurseOrder(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      visit_id: string;
      patient_id: string;
      order_type: string;
      urgency: string;
      status: string;
      details: Record<string, any>;
      notes?: string;
    }) => api.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurse-orders", visitId] });
    },
  });
}

/* ---------------- UPDATE ---------------- */
export function useUpdateNurseOrder(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
      api.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurse-orders", visitId] });
    },
  });
}

/* ---------------- DELETE ---------------- */
export function useDeleteNurseOrder(visitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurse-orders", visitId] });
    },
  });
}
