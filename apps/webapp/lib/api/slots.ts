import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export interface ApiConfig {
  baseUrl?: string
  authToken: string
}

export interface Slot {
  id: number
  doctorId: number
  date: string
  startTime: string
  endTime: string
  type: string
  tenant_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number | null
  createdBy: {
    id: number
    name: string
  }
  updatedBy: number | null
}

export interface SlotsListResponse {
  success: boolean
  data: Slot[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface GetSlotsParams {
  page?: number
  limit?: number
  doctorId?: string
  startDate?: string
  endDate?: string
  slotVisitType?: string
  shift?: string
}

class SlotsApiClient {
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

  async getSlots(
    params: GetSlotsParams = {}
  ): Promise<AxiosResponse<SlotsListResponse>> {
    const {
      page = 1,
      limit = 100,
      doctorId,
      startDate,
      endDate,
      slotVisitType,
      shift,
    } = params

    const query = new URLSearchParams()
    query.append("page", String(page))
    query.append("limit", String(limit))
    if (doctorId) query.append("doctorId", doctorId)
    if (startDate) query.append("startDate", startDate)
    if (endDate) query.append("endDate", endDate)
    if (slotVisitType) query.append("slotVisitType", slotVisitType)
    if (shift) query.append("shift", shift)

    try {
      return await axios.get<SlotsListResponse>(
        `${this.baseUrl}/api/v1/slots?${query.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(
          `Get slots error: ${
            (error.response?.data as any)?.message || error.message
          }`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createSlotsApiClient = (config: ApiConfig) =>
  new SlotsApiClient(config)

