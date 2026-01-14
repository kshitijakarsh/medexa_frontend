import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createOrderApiClient,
  CreateOrderPayload,
  UpdateOrderPayload,
} from "@/lib/api/order-api"

// Create singleton API client instance
const api = createOrderApiClient({})

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: any) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number | string) => [...orderKeys.details(), id] as const,
}

/* ---------------------------------------------------
   useOrders - Get all orders
--------------------------------------------------- */
export function useOrders(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
  payment_status?: string
  patient_id?: number
  from_date?: string
  to_date?: string
  enabled?: boolean
}) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: orderKeys.list(queryParams),
    queryFn: async () => {
      console.log("[useOrders] Fetching with params:", queryParams)
      const response = await api.getAll(queryParams)
      console.log("[useOrders] Response received:", response.data)
      return response.data
    },
    enabled,
    staleTime: 0, // Always refetch when params change
  })
}

/* ---------------------------------------------------
   useOrderById - Get order by ID
--------------------------------------------------- */
export function useOrderById(id: number | string, enabled = true) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: async () => {
      const response = await api.getById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

/* ---------------------------------------------------
   useCreateOrder - Create new order
--------------------------------------------------- */
export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      console.log("[useCreateOrder] mutationFn called with payload:", payload)
      console.log("[useCreateOrder] calling api.create()")
      try {
        const response = await api.create(payload)
        console.log("[useCreateOrder] api.create() returned:", response.data)
        return response.data
      } catch (err: any) {
        const errorData = err.response?.data || {}
        const errorMsg = errorData.message || errorData.errors?.[0]?.message || err.message
        console.error("[useCreateOrder] api.create() failed:", {
          status: err.response?.status,
          data: errorData,
          message: errorMsg
        })
        throw err
      }
    },
    onSuccess: (data) => {
      console.log("[useCreateOrder] onSuccess triggered, data:", data)
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      console.log("[useCreateOrder] Invalidated queries:", orderKeys.lists())
    },
    onError: (error: any) => {
      console.error("[useCreateOrder] onError triggered:", error)
    },
  })
}

/* ---------------------------------------------------
   useUpdateOrder - Update existing order
--------------------------------------------------- */
export function useUpdateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number | string; payload: UpdateOrderPayload }) => {
      console.log("[useUpdateOrder] mutationFn called with id:", id, "payload:", payload)
      try {
        const response = await api.update(id, payload)
        console.log("[useUpdateOrder] api.update() returned:", response.data)
        return response.data
      } catch (err: any) {
        console.error("[useUpdateOrder] api.update() failed:", err.response?.data || err.message)
        throw err
      }
    },
    onSuccess: (data, variables) => {
      console.log("[useUpdateOrder] onSuccess triggered, data:", data)
      // Invalidate both the list and the specific order detail
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) })
      console.log("[useUpdateOrder] Invalidated queries")
    },
    onError: (error: any) => {
      console.error("[useUpdateOrder] onError triggered:", error)
    },
  })
}

/* ---------------------------------------------------
   useDeleteOrder - Delete an order
--------------------------------------------------- */
export function useDeleteOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number | string) => {
      console.log("[useDeleteOrder] mutationFn called with id:", id)
      try {
        const response = await api.delete(id)
        console.log("[useDeleteOrder] api.delete() returned:", response.data)
        return response.data
      } catch (err: any) {
        console.error("[useDeleteOrder] api.delete() failed:", err.response?.data || err.message)
        throw err
      }
    },
    onSuccess: (data, id) => {
      console.log("[useDeleteOrder] onSuccess triggered, data:", data)
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      // Remove the specific order from cache
      queryClient.removeQueries({ queryKey: orderKeys.detail(id) })
      console.log("[useDeleteOrder] Invalidated queries")
    },
    onError: (error: any) => {
      console.error("[useDeleteOrder] onError triggered:", error)
    },
  })
}
