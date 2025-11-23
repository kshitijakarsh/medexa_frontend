import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateSpecialisationParams {
  name: string
  status: "active" | "inactive"
}

interface UpdateSpecialisationParams {
  name: string
  status: "active" | "inactive"
}

interface Specialisation {
  id: number
  name: string
  status: "active" | "inactive"
  tenant_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
}

interface SpecialisationResponse {
  data: Specialisation
  success: boolean
}

interface SpecialisationsListResponse {
  data: Specialisation[]
  success: boolean
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
}

interface GetSpecialisationsParams {
  page?: number
  limit?: number
  status?: "active" | "inactive"
  search?: string
}

class SpecialisationApiClient {
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

  async getSpecialisations(
    params: GetSpecialisationsParams = {}
  ): Promise<AxiosResponse<SpecialisationsListResponse>> {
    try {
      const { page = 1, limit = 10, status, search } = params
      const queryParams = new URLSearchParams()
      queryParams.append("page", String(page))
      queryParams.append("limit", String(limit))
      if (status) queryParams.append("status", status)
      if (search && search.length >= 2) queryParams.append("search", search)

      return await axios.get<SpecialisationsListResponse>(
        `${this.baseUrl}/api/v1/specialisations?${queryParams.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get specialisations error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createSpecialisation(
    params: CreateSpecialisationParams
  ): Promise<AxiosResponse<SpecialisationResponse>> {
    try {
      return await axios.post<SpecialisationResponse>(
        `${this.baseUrl}/api/v1/specialisations`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create specialisation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateSpecialisation(
    id: number,
    params: UpdateSpecialisationParams
  ): Promise<AxiosResponse<SpecialisationResponse>> {
    try {
      return await axios.put<SpecialisationResponse>(
        `${this.baseUrl}/api/v1/specialisations/${id}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update specialisation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteSpecialisation(id: number): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/specialisations/${id}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete specialisation error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createSpecialisationApiClient = (config: ApiConfig) =>
  new SpecialisationApiClient(config)

export type {
  Specialisation,
  CreateSpecialisationParams,
  UpdateSpecialisationParams,
  SpecialisationResponse,
  SpecialisationsListResponse,
  GetSpecialisationsParams,
}

