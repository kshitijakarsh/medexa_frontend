import { createVisitPurposeApiClient } from "@/lib/api/doctor/visit-purpose-api";
import { useQuery, useMutation } from "@tanstack/react-query";

const api = createVisitPurposeApiClient({});


/* ----------------------------------------------
   GET Visit Purpose for a Visit (Doctor specific)
---------------------------------------------- */
export function useVisitPurposeByVisitId(visitId: string) {
    return useQuery({
        queryKey: ["visitPurpose", visitId],
        enabled: !!visitId,
        queryFn: async () => {
            const res = await api.getByVisitForDoctor(visitId);

            return res.data?.data ?? null;  // backend returns SINGLE object
        },
    });
}


/* ----------------------------------------------
   SAVE (POST or PUT automatically)
---------------------------------------------- */
export function useSaveVisitPurpose(existingId?: string) {
    return useMutation({
        mutationFn: async (payload: any) => {
            if (existingId) {
                return await api.update(existingId, payload);
            }
            return await api.create(payload);
        },
    });
}


/* ----------------------------------------------
   GET Visit Purpose for a Visit
---------------------------------------------- */
export function useVisitPurposeByVisitIdHistory(patientId: string) {
    return useQuery({
        queryKey: ["visitPurposeHistory", patientId],  // Unique key
        enabled: !!patientId,
        queryFn: async () => {
            const res = await api.getByPatient(patientId);

            // Backend returns array inside res.data.data → extract correctly
            return res.data?.data ?? [];
        },
    });
}


export function useVisitPurposeByVisitIdHistoryOne(visitId: string) {
    return useQuery({
        queryKey: ["visitPurposeHistoryOne", visitId],  // Unique key
        enabled: !!visitId,
        queryFn: async () => {
            const res = await api.getById(visitId);

            // Backend returns array inside res.data.data → extract correctly
            return res.data?.data ?? null;
        },
    });
}