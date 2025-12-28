import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

export interface Visit {
  id: string;
  patient_id?: string;
  nurse_id?: string;
  nurse?: {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
  };
  status?: string;
  visit_type?: string;
  [key: string]: any;
}

export interface VisitResponse {
  success: boolean;
  data: Visit;
}

export interface UpdateVisitPayload {
  nurse_id?: string;
  [key: string]: any;
}

export class VisitApiClient {
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

  /**
   * GET: Fetch visit by ID
   */
  async getById(id: string): Promise<AxiosResponse<VisitResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/visits/${id}`, config);
  }

  /**
   * PUT: Update visit (reassign nurse, etc.)
   */
  async update(
    id: string,
    payload: UpdateVisitPayload
  ): Promise<AxiosResponse<VisitResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/visits/${id}`, payload, config);
  }
}

export const createVisitApiClient = (config: ApiConfig) =>
  new VisitApiClient(config);
