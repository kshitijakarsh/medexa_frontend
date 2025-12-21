import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

export interface Country {
  id: number;
  iso_code?: string;
  name_en: string;
  name_local?: string;
  currency_code?: string;
  currency_symbol?: string;
  phone_code?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Patient {
  id: string;
  tenant_id?: string;
  category_id?: string | null;
  category?: any;
  first_name: string;
  last_name?: string;
  full_name?: string;
  dob?: string;
  gender?: string;
  country_id?: number;
  country?: Country;
  blood_group?: string;
  civil_id: string;
  passport_number?: string;
  issuing_country_id?: number;
  issuing_country?: Country;
  mobile_number: string;
  alternate_number?: string;
  email?: string;
  emergency_contact?: string;
  city?: string;
  postal_code?: string;
  permanent_address?: string;
  insurance_provider_id?: string;
  plan_type?: string;
  policy_number?: string;
  policy_validity?: string;
  photo_url?: string;
  insurance_card_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PatientListResponse {
  success: boolean;
  data: Patient[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface PatientResponse {
  success: boolean;
  data: Patient;
}

export interface CreatePatientPayload {
  category_id?: string;
  first_name: string;
  last_name?: string;
  dob?: string;
  gender?: string;
  country_id?: string;
  blood_group?: string;
  civil_id: string;
  passport_number?: string;
  issuing_country_id?: string;
  mobile_number: string;
  alternate_number?: string;
  email?: string;
  emergency_contact?: string;
  city?: string;
  postal_code?: string;
  permanent_address?: string;
  insurance_provider_id?: string;
  plan_type?: string;
  policy_number?: string;
  policy_validity?: string;
  photo_url?: string;
  insurance_card_url?: string;
  status?: string;
}

export interface UpdatePatientPayload extends Partial<CreatePatientPayload> {}

export class PatientApiClient {
  private baseUrl: string;
  private authToken: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
    this.authToken = config.authToken;
  }

  private getJsonRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
      },
    };
  }

  /* ---------------------------------------------------
     GET: All Patients
  --------------------------------------------------- */
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<AxiosResponse<PatientListResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/patients`, {
      ...config,
      params,
    });
  }

  /* ---------------------------------------------------
     GET: Patient by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<PatientResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/patients/${id}`, config);
  }

  /* ---------------------------------------------------
     POST: Create Patient
  --------------------------------------------------- */
  async create(
    payload: CreatePatientPayload
  ): Promise<AxiosResponse<PatientResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/patients`, payload, config);
  }

  /* ---------------------------------------------------
     PUT: Update Patient
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdatePatientPayload
  ): Promise<AxiosResponse<PatientResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/patients/${id}`, payload, config);
  }

  /* ---------------------------------------------------
     DELETE: Delete Patient
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<{ success: boolean }>> {
    const config = this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/patients/${id}`, config);
  }
}

export const createPatientApiClient = (config: ApiConfig) =>
  new PatientApiClient(config);
