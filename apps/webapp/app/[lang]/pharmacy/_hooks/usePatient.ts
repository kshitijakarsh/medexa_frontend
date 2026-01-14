import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getIdToken } from "@/app/utils/auth"
import { createPatientApiClient } from "@/lib/api/patient-api"

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const patientKeys = {
  all: ["patients"] as const,
  lists: () => [...patientKeys.all, "list"] as const,
  list: (filters: any) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, "detail"] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
}

/* ---------------------------------------------------
   usePatients - Get all patients (for pharmacy)
--------------------------------------------------- */
export function usePatients(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
  enabled?: boolean
}) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: patientKeys.list(queryParams),
    queryFn: async () => {
      const token = await getIdToken()
      if (!token) {
        throw new Error("No authentication token available")
      }
      const api = createPatientApiClient({
        authToken: token,
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000",
      })
      const response = await api.getAll(queryParams)
      return response.data
    },
    enabled,
  })
}

/* ---------------------------------------------------
   usePatientById - Get patient by ID
--------------------------------------------------- */
export function usePatientById(id: string, enabled = true) {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: async () => {
      const token = await getIdToken()
      if (!token) {
        throw new Error("No authentication token available")
      }
      const api = createPatientApiClient({
        authToken: token,
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000",
      })
      const response = await api.getById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}
