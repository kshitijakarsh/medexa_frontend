"use client";

import { createSoapNotesApiClient } from "@/lib/api/doctor/soap-notes-api";
import { useQuery, useMutation } from "@tanstack/react-query";

const api = createSoapNotesApiClient({});

/* ---------------- GET SOAP NOTE BY VISIT (Doctor) ---------------- */

export function useSoapNoteByVisitId(visitId: string) {
    return useQuery({
        queryKey: ["soap-note", visitId],
        queryFn: async () => {
            const res = await api.getByVisitForDoctor(visitId);
            return res.data?.data ?? null;
        },
        enabled: !!visitId,
    });
}

/* ---------------- CREATE / UPDATE SOAP NOTE ---------------- */

export function useSaveSoapNote(soapNoteId?: string) {
    return useMutation({
        mutationFn: async (payload: any) => {
            if (soapNoteId) {
                return api.update(soapNoteId, payload.soap_data);
            }
            return api.create(payload.soap_data);
        },
    });
}



/* ----------------------------------------------
   GET SOAP NOTES HISTORY (By Patient)
   → Returns ARRAY
---------------------------------------------- */
export function useSoapNotesHistoryByPatient(patientId: string) {
  return useQuery({
    queryKey: ["soap-note-history", patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const res = await api.getByPatient(patientId);
      return res.data?.data ?? [];
    },
  });
}

/* ----------------------------------------------
   GET SOAP NOTES HISTORY (By Doctor)
---------------------------------------------- */
export function useSoapNotesHistoryByDoctor(doctorId: string) {
  return useQuery({
    queryKey: ["soap-note-history-doctor", doctorId],
    enabled: !!doctorId,
    queryFn: async () => {
      const res = await api.getByDoctor(doctorId);
      return res.data?.data ?? [];
    },
  });
}

/* ----------------------------------------------
   GET SINGLE SOAP NOTE (History Details)
---------------------------------------------- */
export function useSoapNoteHistoryOne(soapNoteId: string) {
  return useQuery({
    queryKey: ["soap-note-history-one", soapNoteId],
    enabled: !!soapNoteId,
    queryFn: async () => {
      const res = await api.getById(soapNoteId);
      return res.data?.data ?? null;
    },
  });
}



/* ---------------- GET SOAP NOTE BY VISIT (Doctor) ---------------- */

export function useSoapNoteByVisitIdForNurse(visitId: string) {
    return useQuery({
        queryKey: ["soap-note-by-visitId", visitId],
        queryFn: async () => {
            const res = await api.getByVisit(visitId);
            return res.data?.data[0] ?? null;
        },
        enabled: !!visitId,
    });
}