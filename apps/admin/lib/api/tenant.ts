import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface Tenant {
  id: number
  tenant_key: string
  external_id: string
  name_en: string
  name_local: string
  country_id: number
  regulatory_authority_id: number
  license_number: string
  license_expiry: string
  license_type: string
  commercial_reg_no: string
  primary_admin_name: string
  primary_admin_email: string
  primary_admin_id_no: string
  currency_code: string
  vat_registered: boolean
  vat_number: string
  status: string
  created_by: number
  created_at: string
  updated_at: string
}

interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalData: number
}

interface TenantsListResponse {
  data: Tenant[]
  success: boolean
  pagination: PaginationMeta
}

interface TenantResponse {
  data: Tenant
  success: boolean
}

interface GetTenantsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  country_id?: number
}

interface CreateTenantParams {
  tenant_key: string
  external_id: string
  name_en: string
  name_local: string
  country_id: number
  regulatory_authority_id: number
  license_number: string
  license_expiry: string
  license_type: string
  commercial_reg_no: string
  primary_admin_name: string
  primary_admin_email: string
  primary_admin_id_no: string
  currency_code: string
  vat_registered: boolean
  vat_number: string
  user_full_name: string
  user_password: string
}

class TenantApiClient {
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

  async getTenants(
    params: GetTenantsParams = {}
  ): Promise<AxiosResponse<TenantsListResponse>> {
    try {
      const { page, limit, search, status, country_id } = params
      const queryParams = new URLSearchParams({
        ...(page != null ? { page: String(page) } : {}),
        ...(limit != null ? { limit: String(limit) } : {}),
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
        ...(country_id != null ? { country_id: String(country_id) } : {}),
      })

      return await axios.get<TenantsListResponse>(
        `${this.baseUrl}/api/v1/tenants${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get tenants error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async getTenantById(
    tenantId: string
  ): Promise<AxiosResponse<TenantResponse>> {
    try {
      return await axios.get<TenantResponse>(
        `${this.baseUrl}/api/v1/tenants/${tenantId}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get tenant error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createTenant(
    params: CreateTenantParams
  ): Promise<AxiosResponse<TenantResponse>> {
    try {
      return await axios.post<TenantResponse>(
        `${this.baseUrl}/api/v1/tenants`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create tenant error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createTenantApiClient = (config: ApiConfig) =>
  new TenantApiClient(config)

export type {
  Tenant,
  PaginationMeta,
  TenantsListResponse,
  TenantResponse,
  GetTenantsParams,
  CreateTenantParams,
}
