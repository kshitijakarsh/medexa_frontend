import { getIdToken } from "@/app/utils/auth"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
}

export interface TaxCategory {
  id: string
  name: string
  percent: number
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

export interface TaxCategoryListResponse {
  data: TaxCategory[]
  pagination?: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
  success: boolean
}

export interface TaxCategoryResponse {
  data: TaxCategory
  success: boolean
  message?: string
}

export interface CreateTaxCategoryParams {
  name: string
  percent: number
  status: "active" | "inactive"
}

export interface UpdateTaxCategoryParams {
  name?: string
  percent?: number
  status?: "active" | "inactive"
}

class TaxCategoriesApiClient {
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

  async getTaxCategories(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<AxiosResponse<TaxCategoryListResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/tax-categories`, {
      ...config,
      params,
    })
  }

  async createTaxCategory(
    payload: CreateTaxCategoryParams
  ): Promise<AxiosResponse<TaxCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.post(`${this.baseUrl}/api/v1/tax-categories`, payload, config)
  }

  async updateTaxCategory(
    id: string,
    payload: UpdateTaxCategoryParams
  ): Promise<AxiosResponse<TaxCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.put(`${this.baseUrl}/api/v1/tax-categories/${id}`, payload, config)
  }

  async deleteTaxCategory(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig()
    return axios.delete(`${this.baseUrl}/api/v1/tax-categories/${id}`, config)
  }

  async getTaxCategoryById(id: string): Promise<AxiosResponse<TaxCategoryResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get(`${this.baseUrl}/api/v1/tax-categories/${id}`, config)
  }
}

export const createTaxCategoriesApiClient = (config: ApiConfig) =>
  new TaxCategoriesApiClient(config)
