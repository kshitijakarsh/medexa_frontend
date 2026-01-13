import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createMedicineApiClient,
  CreateMedicinePayload,
  UpdateMedicinePayload,
} from "@/lib/api/medicine-api"

// Create singleton API client instance
const api = createMedicineApiClient({})

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const medicineKeys = {
  all: ["medicines"] as const,
  lists: () => [...medicineKeys.all, "list"] as const,
  list: (filters: any) => [...medicineKeys.lists(), filters] as const,
  details: () => [...medicineKeys.all, "detail"] as const,
  detail: (id: number | string) => [...medicineKeys.details(), id] as const,
}

/* ---------------------------------------------------
   useMedicines - Get all medicines
--------------------------------------------------- */
export function useMedicines(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
  enabled?: boolean
}) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: medicineKeys.list(queryParams),
    queryFn: async () => {
      console.log("[useMedicines] Fetching with params:", queryParams)
      const response = await api.getAll(queryParams)
      console.log("[useMedicines] Response received:", response.data)
      return response.data
    },
    enabled,
    staleTime: 0, // Always refetch when params change
  })
}

/* ---------------------------------------------------
   useMedicineById - Get medicine by ID
--------------------------------------------------- */
export function useMedicineById(id: number | string, enabled = true) {
  return useQuery({
    queryKey: medicineKeys.detail(id),
    queryFn: async () => {
      const response = await api.getById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

/* ---------------------------------------------------
   useCreateMedicine - Create new medicine
--------------------------------------------------- */
export function useCreateMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateMedicinePayload) => {
      console.log("[useCreateMedicine] mutationFn called with payload:", payload)
      console.log("[useCreateMedicine] calling api.create()")
      try {
        const response = await api.create(payload)
        console.log("[useCreateMedicine] api.create() returned:", response.data)
        return response.data
      } catch (err: any) {
        console.error("[useCreateMedicine] api.create() failed:", err.response?.data || err.message)
        throw err
      }
    },
    onSuccess: (data) => {
      console.log("[useCreateMedicine] onSuccess called with:", data)
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() })
    },
    onError: (error: any) => {
      console.error("[useCreateMedicine] onError called:", error.response?.data || error.message)
    },
  })
}

/* ---------------------------------------------------
   useUpdateMedicine - Update existing medicine
--------------------------------------------------- */
export function useUpdateMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number | string
      payload: UpdateMedicinePayload
    }) => {
      const response = await api.update(id, payload)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: medicineKeys.detail(variables.id),
      })
    },
  })
}

/* ---------------------------------------------------
   useDeleteMedicine - Delete medicine
--------------------------------------------------- */
export function useDeleteMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await api.delete(id)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() })
    },
  })
}
