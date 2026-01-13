import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createBatchApiClient,
  CreateBatchPayload,
  UpdateBatchPayload,
} from "@/lib/api/batch-api"

// Create singleton API client instance
const api = createBatchApiClient({})

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const batchKeys = {
  all: ["batches"] as const,
  lists: () => [...batchKeys.all, "list"] as const,
  list: (filters: any) => [...batchKeys.lists(), filters] as const,
  details: () => [...batchKeys.all, "detail"] as const,
  detail: (id: number | string) => [...batchKeys.details(), id] as const,
}

/* ---------------------------------------------------
   useBatches - Get all batches
--------------------------------------------------- */
export function useBatches(params?: {
  page?: number
  limit?: number
  medicine_id?: number
  status?: string
  enabled?: boolean
}) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: batchKeys.list(queryParams),
    queryFn: async () => {
      const response = await api.getAll(queryParams)
      return response.data
    },
    enabled,
  })
}

/* ---------------------------------------------------
   useBatchById - Get batch by ID
--------------------------------------------------- */
export function useBatchById(id: number | string, enabled = true) {
  return useQuery({
    queryKey: batchKeys.detail(id),
    queryFn: async () => {
      const response = await api.getById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

/* ---------------------------------------------------
   useCreateBatch - Create new batch
--------------------------------------------------- */
export function useCreateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateBatchPayload) => {
      const response = await api.create(payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: batchKeys.lists() })
    },
  })
}

/* ---------------------------------------------------
   useUpdateBatch - Update existing batch
--------------------------------------------------- */
export function useUpdateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number | string
      payload: UpdateBatchPayload
    }) => {
      const response = await api.update(id, payload)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: batchKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: batchKeys.detail(variables.id),
      })
    },
  })
}

/* ---------------------------------------------------
   useDeleteBatch - Delete batch
--------------------------------------------------- */
export function useDeleteBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await api.delete(id)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: batchKeys.lists() })
    },
  })
}
