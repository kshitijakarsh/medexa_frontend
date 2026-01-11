import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateEmployeeParams {
  first_name: string
  last_name: string
  gender?: string
  date_of_birth?: string
  marital_status?: string
  crp_nid?: string
  crp_nid_expiry?: string
  blood_group?: string
  photo_url?: string
  phone?: string
  office_email?: string
  local_address?: string
  permanent_address?: string
  emergency_contact?: string
  language?: string
  qualification?: string
  year_of_experience?: number
  visa_start?: string
  visa_end?: string
  passport_no?: string
  passport_expiry?: string
  license_no?: string
  license_expiry?: string
  joining_date?: string
  last_working_date?: string
  contract_renewal_date?: string
  contract_expiry_date?: string
  notice_period?: number
  bank_name?: string
  iban?: string
  account_name?: string
  account_no?: string
  swift_code?: string
  date_from?: string
  date_to?: string
  basic_salary?: number
  gosi_deduction_percentage?: number
  gosi?: number
  housing_allowance?: number
  qchp_document_url?: string
  passport_document_url?: string
  id_proof_document_url?: string
  contract_document_url?: string
  signature_document_url?: string
  country_id?: number
  specialisation_id?: number
  department_id?: number
  designation_id?: number
  user_id?: number
}

interface UpdateEmployeeParams {
  first_name?: string
  last_name?: string
  gender?: string
  date_of_birth?: string
  marital_status?: string
  crp_nid?: string
  crp_nid_expiry?: string
  blood_group?: string
  photo_url?: string
  phone?: string
  office_email?: string
  local_address?: string
  permanent_address?: string
  emergency_contact?: string
  language?: string
  qualification?: string
  year_of_experience?: number
  visa_start?: string
  visa_end?: string
  passport_no?: string
  passport_expiry?: string
  license_no?: string
  license_expiry?: string
  joining_date?: string
  last_working_date?: string
  contract_renewal_date?: string
  contract_expiry_date?: string
  notice_period?: number
  bank_name?: string
  iban?: string
  account_name?: string
  account_no?: string
  swift_code?: string
  date_from?: string
  date_to?: string
  basic_salary?: number
  gosi_deduction_percentage?: number
  gosi?: number
  housing_allowance?: number
  qchp_document_url?: string
  passport_document_url?: string
  id_proof_document_url?: string
  contract_document_url?: string
  signature_document_url?: string
  country_id?: number
  specialisation_id?: number
  department_id?: number
  designation_id?: number
  user_id?: number
}

interface Employee {
  id: number
  first_name: string
  last_name: string
  gender?: string
  date_of_birth?: string
  marital_status?: string
  crp_nid?: string
  crp_nid_expiry?: string
  blood_group?: string
  photo_url?: string
  phone?: string
  office_email?: string
  local_address?: string
  permanent_address?: string
  emergency_contact?: string
  language?: string
  qualification?: string
  year_of_experience?: number
  visa_start?: string
  visa_end?: string
  passport_no?: string
  passport_expiry?: string
  license_no?: string
  license_expiry?: string
  joining_date?: string
  last_working_date?: string
  contract_renewal_date?: string
  contract_expiry_date?: string
  notice_period?: number
  bank_name?: string
  iban?: string
  account_name?: string
  account_no?: string
  swift_code?: string
  date_from?: string
  date_to?: string
  basic_salary?: number
  gosi_deduction_percentage?: number
  gosi?: number
  housing_allowance?: number
  qchp_document_url?: string
  passport_document_url?: string
  id_proof_document_url?: string
  contract_document_url?: string
  signature_document_url?: string
  country_id?: number
  specialisation_id?: number
  department_id?: number
  designation_id?: number
  user_id?: number
  tenant_id?: number
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: number
  status?: "active" | "inactive"
}

interface EmployeeResponse {
  data: Employee
  success: boolean
}

interface EmployeesListResponse {
  data: Employee[]
  success: boolean
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalData: number
  }
}

interface GetEmployeesParams {
  page?: number
  limit?: number
  status?: "active" | "inactive"
  search?: string
}

class EmployeeApiClient {
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

  async getEmployees(
    params: GetEmployeesParams = {}
  ): Promise<AxiosResponse<EmployeesListResponse>> {
    try {
      const { page = 1, limit = 10, status, search } = params
      const queryParams = new URLSearchParams()
      queryParams.append("page", String(page))
      queryParams.append("limit", String(limit))
      if (status) queryParams.append("status", status)
      if (search && search.length >= 2) queryParams.append("search", search)

      return await axios.get<EmployeesListResponse>(
        `${this.baseUrl}/api/v1/employees?${queryParams.toString()}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get employees error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async getEmployee(id: number): Promise<AxiosResponse<EmployeeResponse>> {
    try {
      return await axios.get<EmployeeResponse>(
        `${this.baseUrl}/api/v1/employees/${id}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get employee error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createEmployee(
    params: CreateEmployeeParams
  ): Promise<AxiosResponse<EmployeeResponse>> {
    try {
      return await axios.post<EmployeeResponse>(
        `${this.baseUrl}/api/v1/employees`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create employee error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateEmployee(
    id: number,
    params: UpdateEmployeeParams
  ): Promise<AxiosResponse<EmployeeResponse>> {
    try {
      return await axios.put<EmployeeResponse>(
        `${this.baseUrl}/api/v1/employees/${id}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update employee error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteEmployee(id: number): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/employees/${id}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete employee error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createEmployeeApiClient = (config: ApiConfig) =>
  new EmployeeApiClient(config)

export type {
  Employee,
  CreateEmployeeParams,
  UpdateEmployeeParams,
  EmployeeResponse,
  EmployeesListResponse,
  GetEmployeesParams,
}
