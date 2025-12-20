"use client";

import { createAttachmentsApiClient } from "@/lib/api/doctor/attachments-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Attachment } from "../attachment/attachment";

const api = createAttachmentsApiClient({});

/* ---------------- GET BY VISIT (Doctor) ---------------- */
export function useAttachmentsByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["attachments", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisitForDoctor(visitId);
      return res.data?.data as Attachment[];
    },
  });
}

/* ---------------- HISTORY BY PATIENT ---------------- */
export function useAttachmentsHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["attachments-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ---------------- SINGLE ATTACHMENT ---------------- */
export function useAttachmentHistoryOne(id: string) {
  return useQuery({
    queryKey: ["attachment-history-one", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.getById(id);
      return res.data?.data ?? null;
    },
  });
}

/* ---------- CREATE ---------- */
export function useCreateAttachment(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      visit_id: string;
      patient_id: string;
      title: string;
      s3_url: string;
    }) => api.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attachments", visitId] });
    },
  });
}


/* ---------------- SAVE (POST / PUT) ---------------- */
export function useSaveAttachment(attachmentId?: string) {
  return useMutation({
    mutationFn: async (payload: any) => {
      if (attachmentId) {
        return api.update(attachmentId, payload);
      }
      return api.create(payload);
    },
  });
}

/* ---------------- DELETE ---------------- */
export function useDeleteAttachment(visitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete(id);
    },
    onSuccess: () => {
      // Refetch vitals after delete
      queryClient.invalidateQueries({ queryKey: ["attachments", visitId] });
      queryClient.invalidateQueries({ queryKey: ["attachments-history"] });
    },
  });

}





/*---------------- SINGLE VISIT Attachemts (DETAIL VIEW) ---------------- */
export function useAttachmentHistoryOneVisitId(visitId: string) {
    return useQuery({
        queryKey: ["attachmetHistoryByVisitId", visitId],  // Unique key
        enabled: !!visitId,
        queryFn: async () => {
            const res = await api.getByVisit(visitId);

            // Backend returns array inside res.data.data → extract correctly
            return res.data?.data ?? [];
        },
    });
}
