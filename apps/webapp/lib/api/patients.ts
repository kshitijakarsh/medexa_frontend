import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

// Raw shape from backend `/api/v1/patients`
export interface BackendPatient {
  id: number
  tenant_id: number
  category_id: number | null
  first_name: string
  last_name: string
  dob: string | null
  gender: string | null
  country_id: number | null
  blood_group: string | null
  civil_id: string
  passport_number: string | null
  issuing_country_id: number | null
  mobile_number: string | null
  alternate_number: string | null
  email: string | null
  emergency_contact: string | null
  city: string | null
  postal_code: string | null
  permanent_address: string | null
  insurance_provider_id: number | null
  plan_type: string | null
  policy_number: string | null
  policy_validity: string | null
  photo_url: string | null
  insurance_card_url: string | null
  status: string
  created_at: string
  updated_at: string
  created_by: number | null
  updated_by: number | null
  category: any | null
  country?: {
    id: number
    name_en: string
    name_local: string
    phone_code: string
  } | null
  issuing_country?: {
    id: number
    name_en: string
    name_local: string
    phone_code: string
  } | null
}

export interface PatientsListResponse {
  success: boolean
  data: BackendPatient[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface GetPatientsParams {
  page?: number
  limit?: number
  status?: string
  search?: string
  gender?: string
  blood_group?: string
  country_id?: string
  category?: string
}

class PatientsApiClient {
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

  async getPatients(
    params: GetPatientsParams = {}
  ): Promise<AxiosResponse<PatientsListResponse>> {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      gender,
      blood_group,
      country_id,
      category,
    } = params

    const query = new URLSearchParams()
    query.append("page", String(page))
    query.append("limit", String(limit))
    if (status) query.append("status", status)
    if (search && search.length >= 2) query.append("search", search)
    if (gender) query.append("gender", gender)
    if (blood_group) query.append("blood_group", blood_group)
    if (country_id) query.append("country_id", country_id)
    if (category) query.append("category", category)

    try {
      return await axios.get<PatientsListResponse>(
        `${this.baseUrl}/api/v1/patients?${query.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(
          `Get patients error: ${
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

export const createPatientsApiClient = (config: ApiConfig) =>
  new PatientsApiClient(config)


