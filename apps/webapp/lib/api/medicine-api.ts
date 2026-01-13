import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

export interface Medicine {
  id: number
  tenant_id: number
  medicine_category_id: number
  medicine: string
  type: string
  content?: string
  total_stock: number
  min_level: number
  unit_price: number
  selling_price: number
  status: string
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: number
  is_deleted: boolean
}

export interface MedicineListResponse {
  success: boolean
  data: Medicine[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface MedicineResponse {
  success: boolean
  data: Medicine
}

export interface CreateMedicinePayload {
  medicine_category_id: number
  medicine: string
  type: string
  content?: string
  total_stock?: number
  min_level?: number
  unit_price?: number
  selling_price?: number
  status?: string
}

export interface UpdateMedicinePayload {
  medicine_category_id?: number
  medicine?: string
  type?: string
  content?: string
  total_stock?: number
  min_level?: number
  unit_price?: number
  selling_price?: number
  status?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000"

class MedicineApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl || API_BASE_URL
  }

  private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
    console.log("[MedicineApiClient.getJsonRequestConfig] Getting token...")
    const token = await getIdToken()
    console.log("[MedicineApiClient.getJsonRequestConfig] Got token:", token ? `✓ (${token.substring(0, 20)}...)` : "✗ null")
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
    console.log("[MedicineApiClient.getJsonRequestConfig] Returning config with auth:", !!token)
    return config
  }

  async getAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }): Promise<AxiosResponse<MedicineListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get<MedicineListResponse>(
      `${this.baseUrl}/api/v1/medicines`,
      { ...config, params }
    )
  }

  async getById(id: number | string): Promise<AxiosResponse<MedicineResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get<MedicineResponse>(
      `${this.baseUrl}/api/v1/medicines/${id}`,
      { ...config }
    )
  }

  async create(payload: CreateMedicinePayload): Promise<AxiosResponse<MedicineResponse>> {
    console.log("[MedicineApiClient.create] Called with payload:", payload)
    const config = await this.getJsonRequestConfig()
    console.log("[MedicineApiClient.create] Got config with headers:", config.headers)
    try {
      console.log("[MedicineApiClient.create] About to POST to:", `${this.baseUrl}/api/v1/medicines`)
      const response = await axios.post<MedicineResponse>(
        `${this.baseUrl}/api/v1/medicines`,
        payload,
        { ...config }
      )
      console.log("[MedicineApiClient.create] POST succeeded:", response.data)
      return response
    } catch (error: any) {
      console.error("[MedicineApiClient.create] POST failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
      throw error
    }
  }

  async update(
    id: number | string,
    payload: UpdateMedicinePayload
  ): Promise<AxiosResponse<MedicineResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put<MedicineResponse>(
      `${this.baseUrl}/api/v1/medicines/${id}`,
      payload,
      { ...config }
    )
  }

  async delete(id: number | string): Promise<AxiosResponse<{ success: boolean }>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete<{ success: boolean }>(
      `${this.baseUrl}/api/v1/medicines/${id}`,
      { ...config }
    )
  }
}

export const createMedicineApiClient = (config: ApiConfig) =>
  new MedicineApiClient(config)
