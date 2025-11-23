import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateRoleParams {
  name: string
  status: "active" | "inactive"
}

interface UpdateRoleParams {
  name: string
  status: "active" | "inactive"
}

interface Permission {
  id: number
  permission: string
}

interface Role {
  id: number
  name: string
  status: "active" | "inactive"
  tenant_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
  permissions: Permission[]
}

interface RoleResponse {
  data: Role
  success: boolean
}

interface RolesListResponse {
  data: Role[]
  success: boolean
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
}

interface GetRolesParams {
  page?: number
  limit?: number
  status?: "active" | "inactive"
  search?: string
}

class RoleApiClient {
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

  async getRoles(
    params: GetRolesParams = {}
  ): Promise<AxiosResponse<RolesListResponse>> {
    try {
      const { page = 1, limit = 10, status, search } = params
      const queryParams = new URLSearchParams()
      queryParams.append("page", String(page))
      queryParams.append("limit", String(limit))
      if (status) queryParams.append("status", status)
      if (search && search.length >= 2) queryParams.append("search", search)

      return await axios.get<RolesListResponse>(
        `${this.baseUrl}/api/v1/roles?${queryParams.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get roles error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createRole(
    params: CreateRoleParams
  ): Promise<AxiosResponse<RoleResponse>> {
    try {
      return await axios.post<RoleResponse>(
        `${this.baseUrl}/api/v1/roles`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create role error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateRole(
    id: number,
    params: UpdateRoleParams
  ): Promise<AxiosResponse<RoleResponse>> {
    try {
      return await axios.put<RoleResponse>(
        `${this.baseUrl}/api/v1/roles/${id}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update role error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteRole(id: number): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/roles/${id}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete role error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createRoleApiClient = (config: ApiConfig) =>
  new RoleApiClient(config)

export type {
  Role,
  CreateRoleParams,
  UpdateRoleParams,
  RoleResponse,
  RolesListResponse,
  GetRolesParams,
  Permission,
}

