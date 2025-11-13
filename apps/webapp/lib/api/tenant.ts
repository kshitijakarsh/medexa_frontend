import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import type { PaymentConfig } from "@/app/t/[tenant]/onboarding/_components/_deprecated/payment-api"
import type { License } from "./license"
import type { Document } from "./regulatory"
import type { Module } from "@/app/t/[tenant]/onboarding/_components/_deprecated/modules-api"

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
  tenant_modules?: Module[]
  tenant_payment_configs?: PaymentConfig[]
  tenant_license_history?: License[]
  tenant_regulatory_documents?: Document[]
}

interface TenantResponse {
  data: Tenant
  success: boolean
}

interface Country {
  id: number
  name_en: string
  name_local: string
  iso_code: string
  currency_code: string
  created_at: string
  updated_at: string
}

interface CountriesListResponse {
  data: Country[]
  success: boolean
}

interface UpdateTenantParams {
  tenant_key?: string
  external_id?: string
  name_en?: string
  name_local?: string
  country_id?: number
  regulatory_authority_id?: number
  license_number?: string
  license_expiry?: string
  license_type?: string
  commercial_reg_no?: string
  currency_code?: string
  vat_registered?: boolean
  vat_number?: string
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
        Authorization: `Bearer ${this.authToken}`,
      },
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

  async getTenants(
    params: { search?: string; page?: number; limit?: number } = {}
  ): Promise<
    AxiosResponse<{ data: Tenant[]; success: boolean; pagination?: any }>
  > {
    try {
      const { search, page, limit } = params
      const queryParams = new URLSearchParams()
      if (search) queryParams.append("search", search)
      if (page) queryParams.append("page", String(page))
      if (limit) queryParams.append("limit", String(limit))

      return await axios.get<{
        data: Tenant[]
        success: boolean
        pagination?: any
      }>(
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

  async updateTenant(
    tenantId: string,
    params: UpdateTenantParams
  ): Promise<AxiosResponse<TenantResponse>> {
    try {
      return await axios.put<TenantResponse>(
        `${this.baseUrl}/api/v1/tenants/${tenantId}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update tenant error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async getCountriesList(): Promise<AxiosResponse<CountriesListResponse>> {
    try {
      return await axios.get<CountriesListResponse>(
        `${this.baseUrl}/api/v1/countries`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get countries error: ${error.response?.data?.message || error.message}`
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
  Country,
  TenantResponse,
  CountriesListResponse,
  UpdateTenantParams,
}
