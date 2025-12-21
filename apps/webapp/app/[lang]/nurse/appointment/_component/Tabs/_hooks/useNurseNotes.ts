// "use client";

// import { createNurseNotesApiClient } from "@/lib/api/doctor/nurse-notes-api";
// import { useQuery } from "@tanstack/react-query";

// const api = createNurseNotesApiClient({});

// /* ----------------------------------------------
//    GET NURSE NOTE BY VISIT (Doctor – single record)
// ---------------------------------------------- */
// export function useNurseNoteByVisitId(visitId: string) {
//   return useQuery({
//     queryKey: ["nurse-note", visitId],
//     enabled: !!visitId,
//     queryFn: async () => {
//       const res = await api.getByVisitForDoctor(visitId);
//       return res.data?.data ?? null;
//     },
//   });
// }

// /* ----------------------------------------------
//    GET NURSE NOTES HISTORY (By Patient)
// ---------------------------------------------- */
// export function useNurseNotesHistoryByPatient(patientId: string) {
//   return useQuery({
//     queryKey: ["nurse-note-history", patientId],
//     enabled: !!patientId,
//     queryFn: async () => {
//       const res = await api.getByPatient(patientId);
//       return res.data?.data ?? [];
//     },
//   });
// }

// /* ----------------------------------------------
//    GET SINGLE NURSE NOTE (History Details)
// ---------------------------------------------- */
// export function useNurseNoteHistoryOne(nurseNoteId: string) {
//   return useQuery({
//     queryKey: ["nurse-note-history-one", nurseNoteId],
//     enabled: !!nurseNoteId,
//     queryFn: async () => {
//       const res = await api.getById(nurseNoteId);
//       return res.data?.data ?? null;
//     },
//   });
// }


// /* ----------------------------------------------
//    GET NURSE NOTE BY VISIT (Doctor – single record)
// ---------------------------------------------- */
// export function getNurseNoteByVisitIdNurse(visitId: string) {
//   return useQuery({
//     queryKey: ["nurse-note-visitId-nurse", visitId],
//     enabled: !!visitId,
//     queryFn: async () => {
//       const res = await api.getByVisit(visitId);
//       return res.data?.data ?? [];
//     },
//   });
// }



"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNurseNotesApiClient } from "@/lib/api/doctor/nurse-notes-api";
import { NurseNote } from "../nurse-note/NurseNote";
import { toast } from "@workspace/ui/lib/sonner";

const api = createNurseNotesApiClient({});

/* =======================
   LIST BY VISIT
======================= */
export function useNurseNotesByVisit(visitId: string) {
  return useQuery<NurseNote[]>({
    queryKey: ["nurse-notes", visitId],
    enabled: !!visitId,
    queryFn: async () => {
      const res = await api.getByVisit(visitId);
      return res.data?.data ?? [];
    },
  });
}

/* =======================
   CREATE
======================= */
export function useCreateNurseNote(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => api.create(payload), // ✅ FIX
    onSuccess: () => {
      toast.success("Nurse note added successfully");
      qc.invalidateQueries({ queryKey: ["nurse-notes", visitId] });
    },
  });
}

/* =======================
   UPDATE
======================= */
export function useUpdateNurseNote(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      api.update(id, payload), // ✅ FIX
    onSuccess: () => {
      toast.success("Nurse note updated successfully");

      qc.invalidateQueries({ queryKey: ["nurse-notes", visitId] });
    },
  });
}

/* =======================
   DELETE
======================= */
export function useDeleteNurseNote(visitId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(id), // ✅ FIX
    onSuccess: () => {
      toast.success("Nurse note Deleted successfully");

      qc.invalidateQueries({ queryKey: ["nurse-notes", visitId] });
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
