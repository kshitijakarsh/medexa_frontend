import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateLicenseParams {
  plan_key: string
  seats: number
  storage_quota_mb: number
  start_date: string
  end_date: string
  auto_renew: boolean
  status: string
}

interface UpdateLicenseParams {
  plan_key: string
  seats: number
  storage_quota_mb: number
  start_date: string
  end_date: string
  auto_renew: boolean
  status: string
}

interface License {
  id: string
  tenant_id: string
  plan_key: string
  seats: number
  storage_quota_mb: number
  start_date: string
  end_date: string
  auto_renew: boolean
  status: string
  created_at: string
  updated_at: string
}

interface LicenseResponse {
  data: License
  success: boolean
}

class LicenseApiClient {
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

  async createLicense(
    tenantId: string,
    params: CreateLicenseParams
  ): Promise<AxiosResponse<LicenseResponse>> {
    try {
      return await axios.post<LicenseResponse>(
        `${this.baseUrl}/api/v1/tenant/${tenantId}/license`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create license error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateLicense(
    licenseId: string,
    params: UpdateLicenseParams
  ): Promise<AxiosResponse<LicenseResponse>> {
    try {
      return await axios.put<LicenseResponse>(
        `${this.baseUrl}/api/v1/tenant/license/${licenseId}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update license error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteLicense(licenseId: string): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/tenant/license/${licenseId}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete license error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createLicenseApiClient = (config: ApiConfig) =>
  new LicenseApiClient(config)

export type {
  License,
  CreateLicenseParams,
  UpdateLicenseParams,
  LicenseResponse,
}
