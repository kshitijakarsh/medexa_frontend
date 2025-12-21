import axios, { AxiosResponse } from "axios";

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

export interface PatientCategory {
  id: number;
  name: string;
  description?: string;
  status?: string;
  tenant_id?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
}

export interface PatientCategoryListResponse {
  success: boolean;
  data: PatientCategory[];
}

export class PatientCategoryApiClient {
  private baseUrl: string;
  private authToken: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_BASE_API_URI || "";
    this.authToken = config.authToken;
  }

  async getAll(): Promise<AxiosResponse<PatientCategoryListResponse>> {
    return axios.get(`${this.baseUrl}/api/v1/patient-categories`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }
}

export const createPatientCategoryApiClient = (config: ApiConfig) => {
  return new PatientCategoryApiClient(config);
};
