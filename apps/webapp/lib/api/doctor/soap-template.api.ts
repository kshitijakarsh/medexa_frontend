import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

/* ---------------- TYPES ---------------- */

export interface SoapTemplate {
  id: string;
  tenant_id: string;
  template_name: string;
  specialty: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SoapTemplateListResponse {
  success: boolean;
  data: SoapTemplate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CreateSoapTemplateParams {
  template_name: string;
  specialty: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface UpdateSoapTemplateParams extends Partial<CreateSoapTemplateParams> {}

/* ---------------- CLIENT ---------------- */

class SoapTemplateApiClient {
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
  async getSoapTemplates(params?: {
    page?: number;
    limit?: number;
    specialty?: string;
    template_name?: string;
  }): Promise<AxiosResponse<SoapTemplateListResponse>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/soap-templates`, {
      ...config,
      params,
    });
  }

  /* --------- GET ONE --------- */
  async getSoapTemplateById(
    id: string
  ): Promise<AxiosResponse<{ success: boolean; data: SoapTemplate }>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/soap-templates/${id}`, config);
  }

  /* --------- CREATE --------- */
  async createSoapTemplate(
    payload: CreateSoapTemplateParams
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/soap-templates`, payload, config);
  }

  /* --------- UPDATE --------- */
  async updateSoapTemplate(
    id: string,
    payload: UpdateSoapTemplateParams
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(
      `${this.baseUrl}/api/v1/soap-templates/${id}`,
      payload,
      config
    );
  }

  /* --------- DELETE --------- */
  async deleteSoapTemplate(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(
      `${this.baseUrl}/api/v1/soap-templates/${id}`,
      config
    );
  }
}

export const createSoapTemplateApiClient = (config: ApiConfig) =>
  new SoapTemplateApiClient(config);
