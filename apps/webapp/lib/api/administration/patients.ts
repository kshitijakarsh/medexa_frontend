// /app/patient-categories/_components/api.ts

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
  baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface PatientCategoryItem {
  id: string;
  patient_type: string;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  tenant_id?: string;
}

export interface PatientCategoryListResponse {
  data: PatientCategoryItem[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  };
  success: boolean;
}

export interface PatientCategoryDetailResponse {
  data: PatientCategoryItem;
  success: boolean;
}

export interface CreatePatientCategoryPayload {
  name: string;
  status: "active" | "inactive";
}

export interface UpdatePatientCategoryPayload {
  name?: string;
  status?: "active" | "inactive";
}

/* List filters allowed by your backend */
export interface PatientCategoryListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
}

/* ------------------------------------------
    API Client
------------------------------------------- */

class PatientCategoryApiClient {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
  }

  private async getConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }

  /* ------------------------------------------
      GET ALL
  ------------------------------------------- */
  async getPatientCategories(
    params?: PatientCategoryListParams
  ): Promise<AxiosResponse<PatientCategoryListResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<PatientCategoryListResponse>(
        `${this.baseUrl}/api/v1/patient-categories`,
        {
          ...config,
          params,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get patient categories error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /* ------------------------------------------
      GET ONE BY ID
  ------------------------------------------- */
  async getPatientCategoryById(
    id: string
  ): Promise<AxiosResponse<PatientCategoryDetailResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<PatientCategoryDetailResponse>(
        `${this.baseUrl}/api/v1/patient-categories/${id}`,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get patient category error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /* ------------------------------------------
      CREATE
  ------------------------------------------- */
  async createPatientCategory(
    payload: CreatePatientCategoryPayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.post(
        `${this.baseUrl}/api/v1/patient-categories`,
        payload,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create patient category error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /* ------------------------------------------
      UPDATE
  ------------------------------------------- */
  async updatePatientCategory(
    id: string,
    payload: UpdatePatientCategoryPayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.put(
        `${this.baseUrl}/api/v1/patient-categories/${id}`,
        payload,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update patient category error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /* ------------------------------------------
      DELETE
  ------------------------------------------- */
  async deletePatientCategory(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.delete(
        `${this.baseUrl}/api/v1/patient-categories/${id}`,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete patient category error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }
}


/* Instance Creator */
export const createPatientCategoryApiClient  = (config: ApiConfig = { baseUrl: undefined }) =>
  new PatientCategoryApiClient(config);

