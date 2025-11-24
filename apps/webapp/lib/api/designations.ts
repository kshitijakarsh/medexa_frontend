import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateDesignationParams {
  name: string
}

interface UpdateDesignationParams {
  name: string
}

interface Designation {
  id: number
  name: string
  tenant_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
}

interface DesignationResponse {
  data: Designation
  success: boolean
}

interface DesignationsListResponse {
  data: Designation[]
  success: boolean
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
}

interface GetDesignationsParams {
  page?: number
  limit?: number
  search?: string
}

class DesignationApiClient {
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

  async getDesignations(
    params: GetDesignationsParams = {}
  ): Promise<AxiosResponse<DesignationsListResponse>> {
    try {
      const { page = 1, limit = 10, search } = params
      const queryParams = new URLSearchParams()
      queryParams.append("page", String(page))
      queryParams.append("limit", String(limit))
      if (search && search.length >= 2) queryParams.append("search", search)

      return await axios.get<DesignationsListResponse>(
        `${this.baseUrl}/api/v1/designations?${queryParams.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get designations error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createDesignation(
    params: CreateDesignationParams
  ): Promise<AxiosResponse<DesignationResponse>> {
    try {
      return await axios.post<DesignationResponse>(
        `${this.baseUrl}/api/v1/designations`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create designation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateDesignation(
    id: number,
    params: UpdateDesignationParams
  ): Promise<AxiosResponse<DesignationResponse>> {
    try {
      return await axios.put<DesignationResponse>(
        `${this.baseUrl}/api/v1/designations/${id}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update designation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteDesignation(id: number): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/designations/${id}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete designation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createDesignationApiClient = (config: ApiConfig) =>
  new DesignationApiClient(config)

export type {
  Designation,
  CreateDesignationParams,
  UpdateDesignationParams,
  DesignationResponse,
  DesignationsListResponse,
  GetDesignationsParams,
}

