// lib/api/user/user.api.ts
import { getIdToken } from "@/app/utils/auth"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

export interface PermissionItem {
  id: number
  permission: {
    module_key: string
    name: string
  }
}

export interface Module {
  id: number
  module_key: string
  name_en: string
  name_local: string
}

export interface TenantData {
  status: string
  modules: Module[]
  tenant_key?: string
  external_id?: string
}

export interface RoleData {
  id: number
  name: string
  status: "active" | "inactive"
  permissions: PermissionItem[]
}

export interface CurrentUser {
  id: number
  email: string
  name: string
  tenant_id: number
  phone: string,
  address?: string,
  hospital?: any,
  tenant?: TenantData, // Added tenant
  role: RoleData,
  logo?: string,
  status: string
  created_at: string
  updated_at: string
}

export interface CurrentUserResponse {
  data: CurrentUser
  success: boolean
}

class UserApiClient {
  private baseUrl: string
  private authToken: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
    this.authToken = config.authToken
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

  /** GET /users/me */
  async getCurrentUser(): Promise<AxiosResponse<CurrentUserResponse>> {
    try {
      return await axios.get<CurrentUserResponse>(
        `${this.baseUrl}/api/v1/users/me`,
        await this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Failed to load user"
        )
      }
      throw error
    }
  }
}

export const createUserApiClient = (config: ApiConfig) =>
  new UserApiClient(config)
