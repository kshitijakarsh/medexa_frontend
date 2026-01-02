import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

/* ---------------- TYPES ---------------- */

export interface InsuranceUser {
  id: string;
  name: string;
}

export interface InsuranceProvider {
  id: string;
  provider_name: string;
  company_name: string;
  approval_url?: string;
  status: "active" | "inactive";
  consulting_service_code?: string;
  registration_service_code?: string;
  trn?: string;
  address?: string;
  insurance_company_logo_url?: string;
  tenant_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  createdBy?: InsuranceUser;
  updatedBy?: InsuranceUser;
}

/* ---------------- RESPONSES ---------------- */

export interface InsuranceListResponse {
  data: InsuranceProvider[];
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface InsuranceDetailResponse {
  data: InsuranceProvider;
  success: boolean;
}

/* ---------------- PAYLOADS ---------------- */

export interface CreateInsuranceParams {
  provider_name: string;
  company_name: string;
  approval_url?: string;
  status: "active" | "inactive";
  consulting_service_code?: string;
  registration_service_code?: string;
  trn?: string;
  address?: string;
  insurance_company_logo_url?: string;
}

export interface UpdateInsuranceParams {
  provider_name?: string;
  company_name?: string;
  approval_url?: string;
  status?: "active" | "inactive";
  consulting_service_code?: string;
  registration_service_code?: string;
  trn?: string;
  address?: string;
  insurance_company_logo_url?: string;
}

/* ---------------- CLIENT ---------------- */

export class InsuranceApiClient {
  private baseUrl: string;
  private authToken: string;

  constructor(config: ApiConfig) {
    this.baseUrl =
      config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
    this.authToken = config.authToken;
  }

  private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }

  /* --------- GET ALL --------- */
  async getInsuranceProviders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<AxiosResponse<InsuranceListResponse>> {
    try {
      const config = await this.getJsonRequestConfig();
      return axios.get(`${this.baseUrl}/api/v1/insurance`, {
        ...config,
        params,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get insurance providers error: ${error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* --------- GET ONE --------- */
  async getInsuranceById(
    id: string
  ): Promise<AxiosResponse<InsuranceDetailResponse>> {
    try {
      const config = await this.getJsonRequestConfig();
      return axios.get(
        `${this.baseUrl}/api/v1/insurance/${id}`,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get insurance error: ${error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* --------- CREATE --------- */
  async createInsurance(
    payload: CreateInsuranceParams
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();
      return axios.post(
        `${this.baseUrl}/api/v1/insurance`,
        payload,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create insurance error: ${error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* --------- UPDATE --------- */
  async updateInsurance(
    id: string,
    payload: UpdateInsuranceParams
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();
      return axios.put(
        `${this.baseUrl}/api/v1/insurance/${id}`,
        payload,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update insurance error: ${error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* --------- DELETE --------- */
  async deleteInsurance(
    id: string
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();
      return axios.delete(
        `${this.baseUrl}/api/v1/insurance/${id}`,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete insurance error: ${error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }
}

/* ---------------- FACTORY ---------------- */

export const createInsuranceApiClient = (config: ApiConfig) =>
  new InsuranceApiClient(config);
