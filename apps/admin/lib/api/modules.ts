import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface Module {
  id: string
  module_key: string
  name_en: string
  name_local: string
  description: string
  category: string | null
  version: string
  icon_url: string | null
  default_enabled: boolean
  is_billable: boolean
  monthly_price: {
    s: number
    e: number
    d: number[]
  }
  active: boolean
  created_at: string
  updated_at: string
}

interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalData: number
}

interface ModuleListResponse {
  data: Module[]
  success: boolean
  pagination: PaginationMeta
}

interface ModuleResponse {
  data: Module
  success: boolean
}

interface UpdateModulesParams {
  moduleIds: number[]
}

class ModulesApiClient {
  private baseUrl: string
  private authToken: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
    this.authToken = config.authToken
  }

  private getJsonRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${this.authToken}`,
      },
    }
  }

  async getModules(): Promise<AxiosResponse<ModuleListResponse>> {
    try {
      return await axios.get<ModuleListResponse>(
        `${this.baseUrl}/api/v1/modules`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get modules error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateModules(
    tenantId: string,
    params: UpdateModulesParams
  ): Promise<AxiosResponse<ModuleResponse>> {
    try {
      return await axios.put<ModuleResponse>(
        `${this.baseUrl}/api/v1/tenants/${tenantId}/modules`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update modules error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createModulesApiClient = (config: ApiConfig) =>
  new ModulesApiClient(config)

export type { Module, UpdateModulesParams, ModuleListResponse, ModuleResponse }
