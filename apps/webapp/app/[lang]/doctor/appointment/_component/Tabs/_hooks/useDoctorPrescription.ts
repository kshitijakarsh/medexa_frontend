import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getPrescriptionsByPatient,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByVisit,
  getDoctorPrescriptions,
  CreatePrescriptionPayload,
  UpdatePrescriptionPayload,
  GetPrescriptionsParams,
} from "@/lib/api/doctor-prescription-api"

/* -----------------------------------------------
   GET /api/v1/patients/{patient_id}/prescriptions
   Get prescriptions by patient
----------------------------------------------- */

export function usePrescriptionsByPatient(
  patientId: number,
  params?: { page?: number; limit?: number; status?: string },
  enabled = true
) {
  return useQuery({
    queryKey: ["prescriptions", "patient", patientId, params],
    queryFn: () => getPrescriptionsByPatient(patientId, params),
    enabled: enabled && !!patientId,
  })
}

/* -----------------------------------------------
   GET /api/v1/prescriptions/{id}
   Get prescription by ID
----------------------------------------------- */

export function usePrescription(id: number, enabled = true) {
  return useQuery({
    queryKey: ["prescriptions", id],
    queryFn: () => getPrescriptionById(id),
    enabled: enabled && !!id,
  })
}

/* -----------------------------------------------
   GET /api/v1/visits/{visit_id}/prescriptions
   Get prescriptions by visit
----------------------------------------------- */

export function usePrescriptionsByVisit(
  visitId: number,
  params?: { page?: number; limit?: number },
  enabled = true
) {
  return useQuery({
    queryKey: ["prescriptions", "visit", visitId, params],
    queryFn: () => getPrescriptionsByVisit(visitId, params),
    enabled: enabled && !!visitId,
  })
}

/* -----------------------------------------------
   GET /api/v1/doctor/prescriptions
   Get prescriptions filtered by visit and doctor
----------------------------------------------- */

export function useDoctorPrescriptions(params?: GetPrescriptionsParams) {
  return useQuery({
    queryKey: ["prescriptions", "doctor", params],
    queryFn: () => getDoctorPrescriptions(params),
  })
}

/* -----------------------------------------------
   POST /api/v1/prescriptions
   Create prescription
----------------------------------------------- */

export function useCreatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePrescriptionPayload) => createPrescription(payload),
    onSuccess: (data, variables) => {
      // Invalidate all prescription queries
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
      
      // Invalidate patient-specific queries
      if (variables.patient_id) {
        queryClient.invalidateQueries({ 
          queryKey: ["prescriptions", "patient", variables.patient_id] 
        })
      }
      
      // Invalidate visit-specific queries
      if (variables.visit_id) {
        queryClient.invalidateQueries({ 
          queryKey: ["prescriptions", "visit", variables.visit_id] 
        })
      }
    },
  })
}

/* -----------------------------------------------
   PUT /api/v1/prescriptions/{id}
   Update prescription
----------------------------------------------- */

export function useUpdatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePrescriptionPayload }) =>
      updatePrescription(id, payload),
    onSuccess: (data, variables) => {
      // Invalidate all prescription queries
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
      
      // Invalidate the specific prescription
      queryClient.invalidateQueries({ 
        queryKey: ["prescriptions", variables.id] 
      })
      
      // Invalidate patient-specific queries if patient_id is in the payload
      if (variables.payload.patient_id) {
        queryClient.invalidateQueries({ 
          queryKey: ["prescriptions", "patient", variables.payload.patient_id] 
        })
      }
      
      // Invalidate visit-specific queries if visit_id is in the payload
      if (variables.payload.visit_id) {
        queryClient.invalidateQueries({ 
          queryKey: ["prescriptions", "visit", variables.payload.visit_id] 
        })
      }
    },
  })
}

/* -----------------------------------------------
   DELETE /api/v1/prescriptions/{id}
   Delete prescription (hard delete)
----------------------------------------------- */

export function useDeletePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePrescription(id),
    onSuccess: () => {
      // Invalidate all prescription queries
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
    },
  })
}
