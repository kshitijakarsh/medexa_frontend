import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

/* -----------------------------------------------
   Types & Interfaces
----------------------------------------------- */

export interface PrescriptionItem {
  id?: number
  medicine_id: number
  dosage: string
  route?: string | null
  frequency: string
  duration?: string | null
  medication_instructions?: string | null
  medicine?: {
    id: number
    medicine: string
    type: string
    content?: string
  }
  created_at?: string
  updated_at?: string
}

export interface Prescription {
  id: number
  patient_id: number
  visit_id?: number | null
  ipd_id?: number | null
  diagnosis?: string | null
  notes?: string | null
  status: string
  created_at: string
  updated_at: string
  tenant_id?: number
  created_by?: number
  updated_by?: number | null
  is_deleted?: boolean
  prescription_items: PrescriptionItem[]
  patient?: {
    id: number
    first_name: string
    last_name: string
    mobile_number?: string
  }
}

export interface PrescriptionListResponse {
  success: boolean
  data: Prescription[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PrescriptionResponse {
  success: boolean
  data: Prescription
  message?: string
}

export interface CreatePrescriptionPayload {
  patient_id: number
  visit_id?: number | null
  ipd_id?: number | null
  diagnosis?: string | null
  notes?: string | null
  status?: string
  prescription_items: {
    medicine_id: number
    dosage: string
    route?: string | null
    frequency: string
    duration?: string | null
    medication_instructions?: string | null
  }[]
}

export interface UpdatePrescriptionPayload {
  patient_id?: number
  visit_id?: number | null
  ipd_id?: number | null
  diagnosis?: string | null
  notes?: string | null
  status?: string
  prescription_items?: {
    medicine_id: number
    dosage: string
    route?: string | null
    frequency: string
    duration?: string | null
    medication_instructions?: string | null
  }[]
}

export interface GetPrescriptionsParams {
  page?: number
  limit?: number
  visit_id?: number
  patient_id?: number
  status?: string
}

/* -----------------------------------------------
   API Configuration
----------------------------------------------- */

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000"

class DoctorPrescriptionApiClient {
  private baseUrl: string

  constructor(config?: ApiConfig) {
    this.baseUrl = config?.baseUrl || API_BASE_URL
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

  /* -----------------------------------------------
     GET /api/v1/patients/{patient_id}/prescriptions
     Get prescriptions by patient
  ----------------------------------------------- */
  async getPrescriptionsByPatient(
    patientId: number,
    params?: { page?: number; limit?: number; status?: string }
  ): Promise<PrescriptionListResponse> {
    const config = await this.getJsonRequestConfig()
    const response: AxiosResponse<PrescriptionListResponse> = await axios.get(
      `${this.baseUrl}/api/v1/patients/${patientId}/prescriptions`,
      { ...config, params }
    )
    return response.data
  }

  /* -----------------------------------------------
     GET /api/v1/prescriptions/{id}
     Get prescription by ID
  ----------------------------------------------- */
  async getPrescriptionById(id: number): Promise<PrescriptionResponse> {
    const config = await this.getJsonRequestConfig()
    const response: AxiosResponse<PrescriptionResponse> = await axios.get(
      `${this.baseUrl}/api/v1/prescriptions/${id}`,
      { ...config }
    )
    return response.data
  }

  /* -----------------------------------------------
     POST /api/v1/prescriptions
     Create prescription
  ----------------------------------------------- */
  async createPrescription(
    payload: CreatePrescriptionPayload
  ): Promise<PrescriptionResponse> {
    console.log("[PrescriptionAPI] createPrescription called with:", payload)
    const config = await this.getJsonRequestConfig()
    console.log("[PrescriptionAPI] Config:", config)
    console.log("[PrescriptionAPI] POST URL:", `${this.baseUrl}/api/v1/prescriptions`)
    try {
      const response: AxiosResponse<PrescriptionResponse> = await axios.post(
        `${this.baseUrl}/api/v1/prescriptions`,
        payload,
        { ...config }
      )
      console.log("[PrescriptionAPI] Create response:", response.data)
      return response.data
    } catch (error: any) {
      console.error("[PrescriptionAPI] Create error:", error)
      console.error("[PrescriptionAPI] Error response:", error?.response?.data)
      throw error
    }
  }

  /* -----------------------------------------------
     PUT /api/v1/prescriptions/{id}
     Update prescription
  ----------------------------------------------- */
  async updatePrescription(
    id: number,
    payload: UpdatePrescriptionPayload
  ): Promise<PrescriptionResponse> {
    console.log("[PrescriptionAPI] updatePrescription called with ID:", id, "payload:", payload)
    const config = await this.getJsonRequestConfig()
    console.log("[PrescriptionAPI] PUT URL:", `${this.baseUrl}/api/v1/prescriptions/${id}`)
    try {
      const response: AxiosResponse<PrescriptionResponse> = await axios.put(
        `${this.baseUrl}/api/v1/prescriptions/${id}`,
        payload,
        { ...config }
      )
      console.log("[PrescriptionAPI] Update response:", response.data)
      return response.data
    } catch (error: any) {
      console.error("[PrescriptionAPI] Update error:", error)
      console.error("[PrescriptionAPI] Error response:", error?.response?.data)
      throw error
    }
  }

  /* -----------------------------------------------
     DELETE /api/v1/prescriptions/{id}
     Delete prescription (hard delete)
  ----------------------------------------------- */
  async deletePrescription(id: number): Promise<{ success: boolean; message: string }> {
    const config = await this.getJsonRequestConfig()
    const response: AxiosResponse<{ success: boolean; message: string }> = await axios.delete(
      `${this.baseUrl}/api/v1/prescriptions/${id}`,
      { ...config }
    )
    return response.data
  }

  /* -----------------------------------------------
     GET /api/v1/visits/{visit_id}/prescriptions
     Get prescriptions by visit
  ----------------------------------------------- */
  async getPrescriptionsByVisit(
    visitId: number,
    params?: { page?: number; limit?: number }
  ): Promise<PrescriptionListResponse> {
    console.log("[PrescriptionAPI] getPrescriptionsByVisit called with visitId:", visitId, "params:", params)
    const config = await this.getJsonRequestConfig()
    console.log("[PrescriptionAPI] GET URL:", `${this.baseUrl}/api/v1/visits/${visitId}/prescriptions`)
    try {
      const response: AxiosResponse<PrescriptionListResponse> = await axios.get(
        `${this.baseUrl}/api/v1/visits/${visitId}/prescriptions`,
        { ...config, params }
      )
      console.log("[PrescriptionAPI] Fetch response:", response.data)
      return response.data
    } catch (error: any) {
      console.error("[PrescriptionAPI] Fetch error:", error)
      console.error("[PrescriptionAPI] Error response:", error?.response?.data)
      throw error
    }
  }

  /* -----------------------------------------------
     GET /api/v1/doctor/prescriptions
     Get prescriptions filtered by visit and doctor
  ----------------------------------------------- */
  async getDoctorPrescriptions(
    params?: GetPrescriptionsParams
  ): Promise<PrescriptionListResponse> {
    const config = await this.getJsonRequestConfig()
    const response: AxiosResponse<PrescriptionListResponse> = await axios.get(
      `${this.baseUrl}/api/v1/doctor/prescriptions`,
      { ...config, params }
    )
    return response.data
  }
}

// Create singleton instance
const prescriptionApi = new DoctorPrescriptionApiClient()

// Export wrapper functions for backward compatibility
export const getPrescriptionsByPatient = (
  patientId: number,
  params?: { page?: number; limit?: number; status?: string },
  config?: ApiConfig
) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.getPrescriptionsByPatient(patientId, params)
  }
  return prescriptionApi.getPrescriptionsByPatient(patientId, params)
}

export const getPrescriptionById = (id: number, config?: ApiConfig) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.getPrescriptionById(id)
  }
  return prescriptionApi.getPrescriptionById(id)
}

export const createPrescription = (
  payload: CreatePrescriptionPayload,
  config?: ApiConfig
) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.createPrescription(payload)
  }
  return prescriptionApi.createPrescription(payload)
}

export const updatePrescription = (
  id: number,
  payload: UpdatePrescriptionPayload,
  config?: ApiConfig
) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.updatePrescription(id, payload)
  }
  return prescriptionApi.updatePrescription(id, payload)
}

export const deletePrescription = (id: number, config?: ApiConfig) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.deletePrescription(id)
  }
  return prescriptionApi.deletePrescription(id)
}

export const getPrescriptionsByVisit = (
  visitId: number,
  params?: { page?: number; limit?: number },
  config?: ApiConfig
) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.getPrescriptionsByVisit(visitId, params)
  }
  return prescriptionApi.getPrescriptionsByVisit(visitId, params)
}

export const getDoctorPrescriptions = (
  params?: GetPrescriptionsParams,
  config?: ApiConfig
) => {
  if (config) {
    const api = new DoctorPrescriptionApiClient(config)
    return api.getDoctorPrescriptions(params)
  }
  return prescriptionApi.getDoctorPrescriptions(params)
}
