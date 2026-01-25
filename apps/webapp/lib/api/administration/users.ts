import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface PasswordResponse {
  success: boolean;
  message: string;
}

export interface UserItem {
  id: number
  sub: string
  email: string
  name: string
  tenant_id: number
  phone: string
  role: {
    id: number
    name: string
    status: string
    permissions: []
  }
  status: "active" | "inactive"
  created_at: string
  updated_at: string
  added_by?: number | null
}

export interface UserListResponse {
  data: UserItem[]
  pagination?: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
  success: boolean
}

/* Query parameters for list */
export interface UserListParams {
  page?: number
  limit?: number
  search?: string // min 2 chars
  status?: "active" | "inactive"
}

/* Create user payload */
export interface CreateUserPayload {
  email: string
  name: string
  password: string
  phone: string
  role_id: number
}

/* Update user payload */
export interface UpdateUserPayload {
  name: string
  password?: string
}

export interface UserResponse {
  data: UserItem
  success: boolean
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class UserApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
  }

  private async getConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken()
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  }

  /* ------------------------------------------
     GET List
  ------------------------------------------- */
  async getUsers(
    params?: UserListParams
  ): Promise<AxiosResponse<UserListResponse>> {
    try {
      const config = await this.getConfig()
      return axios.get<UserListResponse>(`${this.baseUrl}/api/v1/users`, {
        ...config,
        params,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get users error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  /* ------------------------------------------
     CREATE User
  ------------------------------------------- */
  async createUser(
    payload: CreateUserPayload
  ): Promise<AxiosResponse<UserResponse>> {
    try {
      const config = await this.getConfig()
      return axios.post<UserResponse>(
        `${this.baseUrl}/api/v1/users`,
        payload,
        config
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create user error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  /* ------------------------------------------
     UPDATE User
  ------------------------------------------- */
  async updateUser(
    id: string,
    payload: UpdateUserPayload
  ): Promise<AxiosResponse<UserResponse>> {
    try {
      const config = await this.getConfig()
      return axios.put<UserResponse>(
        `${this.baseUrl}/api/v1/users/${id}`,
        payload,
        config
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update user error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  /* ------------------------------------------
     DELETE User
  ------------------------------------------- */
  async deleteUser(id: string): Promise<AxiosResponse<void>> {
    try {
      const config = await this.getConfig()
      return axios.delete<void>(`${this.baseUrl}/api/v1/users/${id}`, config)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete user error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  /* ------------------------------------------
     CHANGE Password
  ------------------------------------------- */
  async changePassword(
    payload: ChangePasswordPayload
  ): Promise<AxiosResponse<PasswordResponse>> {
    // MOCK IMPLEMENTATION
    console.log("Mock API Call: POST /api/v1/users/change-password", payload)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate success
    return {
      data: {
        success: true,
        message: "Password changed successfully",
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    }

    /* 
    // REAL IMPLEMENTATION
    try {
      const config = await this.getConfig();
      return axios.post<PasswordResponse>(
        `${this.baseUrl}/api/v1/users/change-password`,
        payload,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Change password error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
    */
  }
}

/* Instance Creator */
export const createUserApiClient = (
  config: ApiConfig = { baseUrl: undefined }
) => new UserApiClient(config)
