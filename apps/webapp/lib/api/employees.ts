import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface CreateEmployeeParams {
  first_name: string
  last_name: string
  department_id?: number
  designation_id?: number
  specialisation_id?: number
  role_id?: number
  gender?: string
  dob?: string
  marital_status?: string
  nationality?: string
  cpr?: string
  cpr_expiration?: string
  blood_group?: string
  employee_photo?: any
  phone?: string
  email?: string
  office_email?: string
  emergency_contact?: string
  local_address?: string
  permanent_address?: string
  language?: string
  qualification?: string
  years_experience?: string
  visa_start?: string
  visa_expiration?: string
  passport_number?: string
  passport_expiration?: string
  license_number?: string
  license_expiration?: string
  joining_date?: string
  contract_type?: string
  contract_start_date?: string
  contract_expiration_date?: string
  basic_salary?: string
  username?: string
  password?: string
  status?: "active" | "inactive"
}

interface UpdateEmployeeParams {
  first_name?: string
  last_name?: string
  department_id?: number
  designation_id?: number
  specialisation_id?: number
  role_id?: number
  gender?: string
  dob?: string
  marital_status?: string
  nationality?: string
  cpr?: string
  cpr_expiration?: string
  blood_group?: string
  employee_photo?: any
  phone?: string
  email?: string
  office_email?: string
  emergency_contact?: string
  local_address?: string
  permanent_address?: string
  language?: string
  qualification?: string
  years_experience?: string
  visa_start?: string
  visa_expiration?: string
  passport_number?: string
  passport_expiration?: string
  license_number?: string
  license_expiration?: string
  joining_date?: string
  contract_type?: string
  contract_start_date?: string
  contract_expiration_date?: string
  basic_salary?: string
  username?: string
  password?: string
  status?: "active" | "inactive"
}

interface Employee {
  id: number
  first_name: string
  last_name: string
  department_id?: number
  designation_id?: number
  specialisation_id?: number
  role_id?: number
  gender?: string
  dob?: string
  marital_status?: string
  nationality?: string
  cpr?: string
  cpr_expiration?: string
  blood_group?: string
  employee_photo?: string
  phone?: string
  email?: string
  office_email?: string
  emergency_contact?: string
  local_address?: string
  permanent_address?: string
  language?: string
  qualification?: string
  years_experience?: string
  visa_start?: string
  visa_expiration?: string
  passport_number?: string
  passport_expiration?: string
  license_number?: string
  license_expiration?: string
  joining_date?: string
  contract_type?: string
  contract_start_date?: string
  contract_expiration_date?: string
  basic_salary?: string
  username?: string
  password?: string
  status?: "active" | "inactive"
  tenant_id?: number
  created_at?: string
  updated_at?: string
  created_by?: number
  updated_by?: number
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

