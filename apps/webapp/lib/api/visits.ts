import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export interface ApiConfig {
  baseUrl?: string
  authToken: string
}

export interface CreateVisitRequest {
  patient_id: string
  procedure_type_id?: string
  procedure_category_id?: string
  machine_room_id?: string
  nurse_id?: string
  communication_mode_id?: string
  doctor_ids: string[]
  time_slot_start: string
  time_slot_end: string
  shift: string
  visit_type: string
  patient_visit_type: string
  status?: string
}

export interface VisitResponse {
  success: boolean
  data: any
  message?: string
}

export interface Visit {
  id: number
  patient_id: number
  procedure_type_id: number | null
  procedure_category_id: number | null
  machine_room_id: number | null
  nurse_id: number | null
  communication_mode_id: number | null
  time_slot_start: string
  time_slot_end: string
  shift: string
  visit_type: string
  patient_visit_type: string
  full_name: string | null
  gender: string | null
  age: number | null
  civil_id: string | null
  phone_no: string | null
  mode_of_arrival: string | null
  emergency_guardian_mrn: string | null
  er_team_id: number | null
  weight: number | null
  tenant_id: number
  status: string
  created_at: string
  updated_at: string
  created_by: number | null
  updated_by: number | null
  patient: {
    id: number
    first_name: string
    last_name: string
  }
  tenant: {
    id: number
    name_en: string
  }
  doctor_ids: Array<{ id: number }>
}

export interface VisitsListResponse {
  success: boolean
  data: Visit[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface GetVisitsParams {
  page?: number
  limit?: number
  status?: string
  department_id?: string
  doctor_id?: string
  patient_id?: string
}

class VisitsApiClient {
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

  async getVisits(
    params: GetVisitsParams = {}
  ): Promise<AxiosResponse<VisitsListResponse>> {
    const {
      page = 1,
      limit = 20,
      status,
      department_id,
      doctor_id,
      patient_id,
    } = params

    const query = new URLSearchParams()
    query.append("page", String(page))
    query.append("limit", String(limit))
    if (status) query.append("status", status)
    if (department_id) query.append("department_id", department_id)
    if (doctor_id) query.append("doctor_id", doctor_id)
    if (patient_id) query.append("patient_id", patient_id)

    try {
      return await axios.get<VisitsListResponse>(
        `${this.baseUrl}/api/v1/visits?${query.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(
          `Get visits error: ${
            (error.response?.data as any)?.message || error.message
          }`
        )
      }
      throw error
    }
  }

  async createVisit(
    payload: CreateVisitRequest
  ): Promise<AxiosResponse<VisitResponse>> {
    try {
      return await axios.post<VisitResponse>(
        `${this.baseUrl}/api/v1/visits`,
        payload,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(
          `Create visit error: ${
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

export const createVisitsApiClient = (config: ApiConfig) =>
  new VisitsApiClient(config)

