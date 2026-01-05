import { getIdToken } from "@/app/utils/auth"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
}

export interface ChargeCategory {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  tenant_id: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
  createdBy?: {
    id: string
    name: string
  }
  updatedBy?: {
    id: string
    name: string
  }
}

export interface ChargeCategoryListResponse {
  data: ChargeCategory[]
  pagination?: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
  success: boolean
}

export interface ChargeCategoryResponse {
  data: ChargeCategory
  success: boolean
  message?: string
}

export interface CreateChargeCategoryParams {
  name: string
  description: string
  status: "active" | "inactive"
}

export interface UpdateChargeCategoryParams {
  name?: string
  description?: string
  status?: "active" | "inactive"
}

class ChargeCategoriesApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
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

  async getChargeCategories(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<AxiosResponse<ChargeCategoryListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charge-categories`, {
      ...config,
      params,
    })
  }

  async createChargeCategory(
    payload: CreateChargeCategoryParams
  ): Promise<AxiosResponse<ChargeCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.post(`${this.baseUrl}/api/v1/charge-categories`, payload, config)
  }

  async updateChargeCategory(
    id: string,
    payload: UpdateChargeCategoryParams
  ): Promise<AxiosResponse<ChargeCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put(`${this.baseUrl}/api/v1/charge-categories/${id}`, payload, config)
  }

  async deleteChargeCategory(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete(`${this.baseUrl}/api/v1/charge-categories/${id}`, config)
  }

  async getChargeCategoryById(id: string): Promise<AxiosResponse<ChargeCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charge-categories/${id}`, config)
  }
}

export const createChargeCategoriesApiClient = (config: ApiConfig) =>
  new ChargeCategoriesApiClient(config)
