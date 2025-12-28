import { getIdToken } from "@/app/utils/auth"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
}

export interface ChargeUnit {
  id: string
  name: string
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

export interface ChargeUnitListResponse {
  data: ChargeUnit[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  success: boolean
}

export interface ChargeUnitResponse {
  data: ChargeUnit
  success: boolean
  message?: string
}

export interface CreateChargeUnitParams {
  name: string
  status: "active" | "inactive"
}

export interface UpdateChargeUnitParams {
  name?: string
  status?: "active" | "inactive"
}

class ChargeUnitsApiClient {
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

  async getChargeUnits(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
    tenant_id?: string
  }): Promise<AxiosResponse<ChargeUnitListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charge-units`, {
      ...config,
      params,
    })
  }

  async createChargeUnit(
    payload: CreateChargeUnitParams
  ): Promise<AxiosResponse<ChargeUnitResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.post(`${this.baseUrl}/api/v1/charge-units`, payload, config)
  }

  async updateChargeUnit(
    id: string,
    payload: UpdateChargeUnitParams
  ): Promise<AxiosResponse<ChargeUnitResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put(`${this.baseUrl}/api/v1/charge-units/${id}`, payload, config)
  }

  async deleteChargeUnit(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete(`${this.baseUrl}/api/v1/charge-units/${id}`, config)
  }

  async getChargeUnitById(id: string): Promise<AxiosResponse<ChargeUnitResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charge-units/${id}`, config)
  }
}

export const createChargeUnitsApiClient = (config: ApiConfig) =>
  new ChargeUnitsApiClient(config)
