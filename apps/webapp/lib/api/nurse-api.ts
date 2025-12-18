import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}

export interface NurseUser {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar_url?: string;
}

export interface NurseUsersResponse {
  success: boolean;
  data: NurseUser[];
}

export class NurseApiClient {
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
   * GET: Fetch all nurses (consumables creators)
   */
  async getConsumablesCreators(params?: {
    search?: string;
  }): Promise<AxiosResponse<NurseUsersResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse/users/consumables-creators`, {
      ...config,
      params,
    });
  }
}

export const createNurseApiClient = (config: ApiConfig) =>
  new NurseApiClient(config);
