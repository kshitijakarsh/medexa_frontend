"use client";

import { createNurseNotesApiClient } from "@/lib/api/doctor/nurse-notes-api";
import { useQuery } from "@tanstack/react-query";

const api = createNurseNotesApiClient({});

/* ----------------------------------------------
   GET NURSE NOTE BY VISIT (Doctor – single record)
---------------------------------------------- */
export function useNurseNoteByVisitId(visitId: string) {
  return useQuery({
    queryKey: ["nurse-note", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisitForDoctor(visitId);
      return res.data?.data ?? null;
    },
  });
}

/* ----------------------------------------------
   GET NURSE NOTES HISTORY (By Patient)
---------------------------------------------- */
export function useNurseNotesHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["nurse-note-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ----------------------------------------------
   GET SINGLE NURSE NOTE (History Details)
---------------------------------------------- */
export function useNurseNoteHistoryOne(nurseNoteId: string) {
  return useQuery({
    queryKey: ["nurse-note-history-one", nurseNoteId],
    enabled: !!nurseNoteId,
    queryFn: async () => {
      const res = await api.getById(nurseNoteId);
      return res.data?.data ?? null;
    },
  });
}
