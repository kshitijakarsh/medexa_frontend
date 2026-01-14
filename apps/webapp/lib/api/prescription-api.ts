import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

export interface Prescription {
  id: number
  patient_id: number
  visit_id?: number | null
  ipd_id?: number | null
  prescription_date: string
  diagnosis?: string | null
  notes?: string | null
  status: string
  created_at: string
  created_by?: number | null
  updated_at: string
  updated_by?: number | null
  patient?: {
    id: number
    first_name: string
    last_name: string
    civil_id?: string
    mobile_number?: string
    email?: string
    dob?: string
    gender?: string
  }
  prescription_items?: PrescriptionItem[]
  visit?: {
    id: number
    time_slot_start: string
    visit_type: string
  }
  ipd?: {
    id: number
    patient_id: number
    bed_id?: number | null
    admission_date?: string
    discharge_date?: string | null
  } | null
}

export interface PrescriptionItem {
  id: number
  medicine_id: number
  dosage?: string | null
  route?: string | null
  frequency?: string | null
  duration?: string | null
  medication_instructions?: string | null
  medicine?: {
    id: number
    medicine: string
    type: string
    content?: string
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
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface PrescriptionResponse {
  success: boolean
  data: Prescription
}

export interface CreatePrescriptionPayload {
  patient_id: number
  appointment_id?: number | null
  appointment_type?: string | null
  doctor_id?: number | null
  prescription_date?: string
  notes?: string | null
  status?: string
  prescription_items: {
    medicine_id: number
    dosage?: string | null
    frequency?: string | null
    duration?: string | null
    quantity: number
    notes?: string | null
  }[]
}

export interface UpdatePrescriptionPayload {
  patient_id?: number
  appointment_id?: number | null
  appointment_type?: string | null
  doctor_id?: number | null
  prescription_date?: string
  notes?: string | null
  status?: string
  prescription_items?: {
    medicine_id: number
    dosage?: string | null
    frequency?: string | null
    duration?: string | null
    quantity: number
    notes?: string | null
  }[]
}

const createApiConfig = async (config?: ApiConfig): Promise<AxiosRequestConfig> => {
  const token = config?.authToken || (await getIdToken())
  return {
    baseURL: config?.baseUrl || process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
}

export const getPrescriptions = async (
  params?: {
    page?: number
    limit?: number
    search?: string
    appointment_type?: string
    status?: string
    patient_id?: number
  },
  config?: ApiConfig
): Promise<PrescriptionListResponse> => {
  const apiConfig = await createApiConfig(config)
  const queryParams = new URLSearchParams()
  
  if (params?.page) queryParams.append("page", params.page.toString())
  if (params?.limit) queryParams.append("limit", params.limit.toString())
  if (params?.search) queryParams.append("search", params.search)
  if (params?.appointment_type) queryParams.append("appointment_type", params.appointment_type)
  if (params?.status) queryParams.append("status", params.status)
  if (params?.patient_id) queryParams.append("patient_id", params.patient_id.toString())

  const response: AxiosResponse<PrescriptionListResponse> = await axios.get(
    `/api/v1/pharmacy/prescriptions?${queryParams.toString()}`,
    apiConfig
  )
  return response.data
}

export const getPrescriptionById = async (
  id: number,
  config?: ApiConfig
): Promise<PrescriptionResponse> => {
  const apiConfig = await createApiConfig(config)
  const response: AxiosResponse<PrescriptionResponse> = await axios.get(
    `/api/v1/pharmacy/prescriptions/${id}`,
    apiConfig
  )
  return response.data
}

export const createPrescription = async (
  payload: CreatePrescriptionPayload,
  config?: ApiConfig
): Promise<PrescriptionResponse> => {
  const apiConfig = await createApiConfig(config)
  const response: AxiosResponse<PrescriptionResponse> = await axios.post(
    `/api/v1/pharmacy/prescriptions`,
    payload,
    apiConfig
  )
  return response.data
}

export const updatePrescription = async (
  id: number,
  payload: UpdatePrescriptionPayload,
  config?: ApiConfig
): Promise<PrescriptionResponse> => {
  const apiConfig = await createApiConfig(config)
  const response: AxiosResponse<PrescriptionResponse> = await axios.put(
    `/api/v1/pharmacy/prescriptions/${id}`,
    payload,
    apiConfig
  )
  return response.data
}

export const deletePrescription = async (
  id: number,
  config?: ApiConfig
): Promise<{ success: boolean; message: string }> => {
  const apiConfig = await createApiConfig(config)
  const response: AxiosResponse<{ success: boolean; message: string }> = await axios.delete(
    `/api/v1/pharmacy/prescriptions/${id}`,
    apiConfig
  )
  return response.data
}
