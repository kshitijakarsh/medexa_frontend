import { getIdToken } from "@/app/utils/auth"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
}

export interface Charge {
  id: string
  name: string
  category_id: string
  unit_id: string
  tax_id: string
  status: "active" | "inactive"
  tenant_id: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
  category?: {
    id: string
    name: string
  }
  unit?: {
    id: string
    name: string
  }
  tax?: {
    id: string
    name: string
    percent: number
  }
  createdBy?: {
    id: string
    name: string
  }
  updatedBy?: {
    id: string
    name: string
  }
}

export interface ChargeListResponse {
  data: Charge[]
  pagination?: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
  success: boolean
}

export interface ChargeResponse {
  data: Charge
  success: boolean
  message?: string
}

export interface CreateChargeParams {
  name: string
  category_id: number
  unit_id: number
  tax_id: number
  status: "active" | "inactive"
}

export interface UpdateChargeParams {
  name?: string
  category_id?: number
  unit_id?: number
  tax_id?: number
  status?: "active" | "inactive"
}

class ChargesApiClient {
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

  async getCharges(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
    category_id?: string
    unit_id?: string
    tax_id?: string
  }): Promise<AxiosResponse<ChargeListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charges`, {
      ...config,
      params,
    })
  }

  async createCharge(
    payload: CreateChargeParams
  ): Promise<AxiosResponse<ChargeResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.post(`${this.baseUrl}/api/v1/charges`, payload, config)
  }

  async updateCharge(
    id: string,
    payload: UpdateChargeParams
  ): Promise<AxiosResponse<ChargeResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put(`${this.baseUrl}/api/v1/charges/${id}`, payload, config)
  }

  async deleteCharge(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete(`${this.baseUrl}/api/v1/charges/${id}`, config)
  }

  async getChargeById(id: string): Promise<AxiosResponse<ChargeResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/charges/${id}`, config)
  }
}

export const createChargesApiClient = (config: ApiConfig) =>
  new ChargesApiClient(config)