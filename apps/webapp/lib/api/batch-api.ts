import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

export interface Batch {
  id: number
  tenant_id: number
  medicine_id: number
  batch_number: string
  location: string
  quantity: number
  expiry_date: string
  total_value: number
  status: string
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: number
  is_deleted: boolean
}

export interface BatchListResponse {
  success: boolean
  data: Batch[]
  kpis?: {
    totalBatches: number
    totalQuantity: number
    expiringSoon: number
    expired: number
    quarantined?: number
    returned?: number
    disposed?: number
    activeBatches?: number
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface BatchResponse {
  success: boolean
  data: Batch
}

export interface CreateBatchPayload {
  medicine_id: number
  batch_number: string
  location: string
  quantity: number
  expiry_date: string
  total_value: number
  status: string
}

export interface UpdateBatchPayload {
  batch_number?: string
  location?: string
  quantity?: number
  expiry_date?: string
  total_value?: number
  status?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000"

class BatchApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl || API_BASE_URL
  }

  private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken()
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  }

  async getAll(params?: {
    page?: number
    limit?: number
    medicine_id?: number
    status?: string
  }): Promise<AxiosResponse<BatchListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get<BatchListResponse>(
      `${this.baseUrl}/api/v1/medicine-batches`,
      { ...config, params }
    )
  }

  async getById(id: number | string): Promise<AxiosResponse<BatchResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get<BatchResponse>(
      `${this.baseUrl}/api/v1/medicine-batches/${id}`,
      { ...config }
    )
  }

  async create(payload: CreateBatchPayload): Promise<AxiosResponse<BatchResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.post<BatchResponse>(
      `${this.baseUrl}/api/v1/medicine-batches`,
      payload,
      { ...config }
    )
  }

  async update(
    id: number | string,
    payload: UpdateBatchPayload
  ): Promise<AxiosResponse<BatchResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put<BatchResponse>(
      `${this.baseUrl}/api/v1/medicine-batches/${id}`,
      payload,
      { ...config }
    )
  }

  async delete(id: number | string): Promise<AxiosResponse<{ success: boolean }>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete<{ success: boolean }>(
      `${this.baseUrl}/api/v1/medicine-batches/${id}`,
      { ...config }
    )
  }
}

export const createBatchApiClient = (config: ApiConfig) =>
  new BatchApiClient(config)
