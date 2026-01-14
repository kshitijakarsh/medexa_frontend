import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

/* -----------------------------------------------
   Types & Interfaces
----------------------------------------------- */

export interface MedicineBatch {
  id: number
  tenant_id: number
  medicine_id: number
  batch_number: string
  location: string
  quantity: number
  expiry_date: string
  total_value: number
  status: string
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number | null
  is_deleted: boolean
  medicine?: {
    id: number
    medicine: string
    type: string
  }
}

export interface RequestItem {
  id?: number
  medicine_batch_id: number
  request_id?: number
  created_at?: string
  updated_at?: string
  medicineBatch?: MedicineBatch
}

export interface Request {
  id: number
  request_number: string
  type: string
  request_date?: string
  reason?: string
  priority?: string
  location?: string
  cert_number?: string
  notes?: string
  total_value?: number
  status: string
  request_items?: RequestItem[]
  requestItems?: RequestItem[]
  created_at: string
  updated_at: string
  tenant_id?: number
  created_by?: number
  updated_by?: number | null
  is_deleted?: boolean
}

export interface RequestListResponse {
  success: boolean
  data: Request[]
  kpis?: {
    totalRequests: number
    pending: number
    approved: number
    rejected: number
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
}

export interface RequestDetailResponse {
  success: boolean
  data: Request
}

export interface CreateRequestPayload {
  request_number: string
  type: string
  request_date?: string
  reason?: string
  priority?: string
  location?: string
  cert_number?: string
  notes?: string
  status?: string
  request_items: { medicine_batch_id: number }[]
}

export interface UpdateRequestPayload extends Partial<CreateRequestPayload> {}

/* -----------------------------------------------
   Axios Instance with Auth
----------------------------------------------- */

const createApiClient = async (config?: ApiConfig) => {
  const token = await getIdToken()
  const baseURL = config?.baseUrl || process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:8080"

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

/* -----------------------------------------------
   GET /api/v1/requests - List all requests
----------------------------------------------- */

export interface GetRequestsParams {
  page?: number
  limit?: number
  status?: string
  type?: string
}

export const getRequests = async (
  params?: GetRequestsParams,
  config?: ApiConfig
): Promise<RequestListResponse> => {
  const client = await createApiClient(config)
  const response: AxiosResponse<RequestListResponse> = await client.get("/api/v1/requests", {
    params,
  })
  return response.data
}

/* -----------------------------------------------
   GET /api/v1/requests/{id} - Get request by ID
----------------------------------------------- */

export const getRequestById = async (
  id: number,
  config?: ApiConfig
): Promise<RequestDetailResponse> => {
  const client = await createApiClient(config)
  const response: AxiosResponse<RequestDetailResponse> = await client.get(`/api/v1/pharmacy/requests/${id}`)
  return response.data
}

/* -----------------------------------------------
   POST /api/v1/requests - Create a new request
----------------------------------------------- */

export const createRequest = async (
  payload: CreateRequestPayload,
  config?: ApiConfig
): Promise<RequestDetailResponse> => {
  const client = await createApiClient(config)
  const response: AxiosResponse<RequestDetailResponse> = await client.post(
    "/api/v1/pharmacy/requests",
    payload
  )
  return response.data
}

/* -----------------------------------------------
   PUT /api/v1/requests/{id} - Update a request
----------------------------------------------- */

export const updateRequest = async (
  id: number,
  payload: UpdateRequestPayload,
  config?: ApiConfig
): Promise<RequestDetailResponse> => {
  const client = await createApiClient(config)
  const response: AxiosResponse<RequestDetailResponse> = await client.put(
    `/api/v1/pharmacy/requests/${id}`,
    payload
  )
  return response.data
}

/* -----------------------------------------------
   DELETE /api/v1/requests/{id} - Delete a request
----------------------------------------------- */

export interface DeleteRequestResponse {
  success: boolean
  message: string
}

export const deleteRequest = async (
  id: number,
  config?: ApiConfig
): Promise<DeleteRequestResponse> => {
  const client = await createApiClient(config)
  const response: AxiosResponse<DeleteRequestResponse> = await client.delete(
    `/api/v1/pharmacy/requests/${id}`
  )
  return response.data
}
