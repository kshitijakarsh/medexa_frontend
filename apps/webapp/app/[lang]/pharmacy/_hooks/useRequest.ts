import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import toast from "react-hot-toast"
import {
    getRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    GetRequestsParams,
    CreateRequestPayload,
    UpdateRequestPayload,
} from "@/lib/api/request-api"
/* -----------------------------------------------
     GET /api/v1/requests - List requests
----------------------------------------------- */

export function useRequests(params?: GetRequestsParams) {
    return useQuery({
        queryKey: ["requests", params],
        queryFn: () => getRequests(params),
    })
}

/* -----------------------------------------------
     GET /api/v1/requests/{id} - Get request by ID
----------------------------------------------- */

export function useRequest(id: number, enabled = true) {
    return useQuery({
        queryKey: ["requests", id],
        queryFn: () => getRequestById(id),
        enabled: enabled && !!id,
    })
}

/* -----------------------------------------------
     POST /api/v1/requests - Create request
----------------------------------------------- */

export function useCreateRequest() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateRequestPayload) => createRequest(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests"] })
            // toast.success("Request created successfully")
        },
        onError: (error: any) => {
            // toast.error(error?.response?.data?.message || "Failed to create request")
        },
    })
}

/* -----------------------------------------------
     PUT /api/v1/requests/{id} - Update request
----------------------------------------------- */

export function useUpdateRequest() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateRequestPayload }) =>
            updateRequest(id, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] })
            queryClient.invalidateQueries({ queryKey: ["requests", data.data.id] })
            // toast.success("Request updated successfully")
        },
        onError: (error: any) => {
            // toast.error(error?.response?.data?.message || "Failed to update request")
        },
    })
}

/* -----------------------------------------------
     DELETE /api/v1/requests/{id} - Delete request
----------------------------------------------- */

export function useDeleteRequest() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["requests"] })
            // toast.success("Request deleted successfully")
        },
        onError: (error: any) => {
            // toast.error(error?.response?.data?.message || "Failed to delete request")
        },
    })
}
