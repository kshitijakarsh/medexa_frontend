import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  CreatePrescriptionPayload,
  UpdatePrescriptionPayload,
} from "@/lib/api/prescription-api"

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const prescriptionKeys = {
  all: ["prescriptions"] as const,
  lists: () => [...prescriptionKeys.all, "list"] as const,
  list: (filters: any) => [...prescriptionKeys.lists(), filters] as const,
  details: () => [...prescriptionKeys.all, "detail"] as const,
  detail: (id: number) => [...prescriptionKeys.details(), id] as const,
}

/* ---------------------------------------------------
   usePrescriptions - Get all prescriptions
--------------------------------------------------- */
export function usePrescriptions(params?: {
  page?: number
  limit?: number
  search?: string
  appointment_type?: string
  status?: string
  patient_id?: number
  enabled?: boolean
}) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: prescriptionKeys.list(queryParams),
    queryFn: async () => {
      console.log("[usePrescriptions] Fetching with params:", queryParams)
      const response = await getPrescriptions(queryParams)
      console.log("[usePrescriptions] Response received:", response)
      return response
    },
    enabled,
    staleTime: 0,
  })
}

/* ---------------------------------------------------
   usePrescriptionById - Get prescription by ID
--------------------------------------------------- */
export function usePrescriptionById(id: number, enabled = true) {
  return useQuery({
    queryKey: prescriptionKeys.detail(id),
    queryFn: async () => {
      const response = await getPrescriptionById(id)
      return response.data
    },
    enabled: enabled && !!id,
  })
}

/* ---------------------------------------------------
   useCreatePrescription - Create new prescription
--------------------------------------------------- */
export function useCreatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreatePrescriptionPayload) => {
      console.log("[useCreatePrescription] Creating with payload:", payload)
      const response = await createPrescription(payload)
      console.log("[useCreatePrescription] Created successfully:", response.data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
    },
    onError: (error: any) => {
      console.error("[useCreatePrescription] Error:", error.response?.data || error.message)
    },
  })
}

/* ---------------------------------------------------
   useUpdatePrescription - Update prescription
--------------------------------------------------- */
export function useUpdatePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdatePrescriptionPayload }) => {
      console.log("[useUpdatePrescription] Updating prescription:", id, payload)
      const response = await updatePrescription(id, payload)
      console.log("[useUpdatePrescription] Updated successfully:", response.data)
      return response
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.detail(variables.id) })
    },
    onError: (error: any) => {
      console.error("[useUpdatePrescription] Error:", error.response?.data || error.message)
    },
  })
}

/* ---------------------------------------------------
   useDeletePrescription - Delete prescription
--------------------------------------------------- */
export function useDeletePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      console.log("[useDeletePrescription] Deleting prescription:", id)
      const response = await deletePrescription(id)
      console.log("[useDeletePrescription] Deleted successfully")
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
    },
    onError: (error: any) => {
      console.error("[useDeletePrescription] Error:", error.response?.data || error.message)
    },
  })
}
