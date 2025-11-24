// import axios from "axios";
// import { getIdToken } from "@/app/utils/auth";

// interface ApiConfig {
//     authToken: string;
//     baseUrl?: string;
// }

// export interface WardType {
//     id: string;
//     name: string;
//     status: "active" | "inactive";
// }

// export interface WardTypeListResponse {
//     data: WardType[];
//     success: boolean;
// }

// export interface CreateWardTypeParams {
//     name: string;
//     status: "active" | "inactive";
// }

// export interface UpdateWardTypeParams {
//     name?: string;
//     status?: "active" | "inactive";
// }

// class WardTypeApiClient {
//     private baseUrl: string;
//     private authToken: string;

//     constructor(config: ApiConfig) {
//         this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
//         this.authToken = config.authToken;
//     }

//     private async getConfig() {
//         const token = await getIdToken();
//         return {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//         };
//     }

//     getWardTypes(params?: any) {
//         return axios.get(`${this.baseUrl}/api/v1/ward-types`, {
//             ...(this.getConfig() as any),
//             params,
//         });
//     }

//     createWardType(payload: CreateWardTypeParams) {
//         return axios.post(`${this.baseUrl}/api/v1/ward-types`, payload, this.getConfig());
//     }

//     updateWardType(id: string, payload: UpdateWardTypeParams) {
//         return axios.put(`${this.baseUrl}/api/v1/ward-types/${id}`, payload, this.getConfig());
//     }

//     deleteWardType(id: string) {
//         return axios.delete(`${this.baseUrl}/api/v1/ward-types/${id}`, this.getConfig());
//     }
// }

// export const createWardTypeApiClient = (config: ApiConfig) =>
//     new WardTypeApiClient(config);



import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiConfig {
  baseUrl?: string;
}

export interface WardType {
  id: string;
  name: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  tenant_id?: string;
}

export interface WardTypeListResponse {
  data: WardType[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  };
  success: boolean;
}

export interface CreateWardTypeParams {
  name: string;
  status: "active" | "inactive";
}

export interface UpdateWardTypeParams {
  name?: string;
  status?: "active" | "inactive";
}

class WardTypeApiClient {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
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

  async getWardTypes(params?: {
    page?: number;
    limit?: number;
    tenant_id?: string;
    status?: string;
    search?: string;
  }): Promise<AxiosResponse<WardTypeListResponse>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/ward-types`, {
      ...config,
      params,
    });
  }

  async createWardType(payload: CreateWardTypeParams): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/ward-types`, payload, config);
  }

  async updateWardType(id: string, payload: UpdateWardTypeParams): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/ward-types/${id}`, payload, config);
  }

  async deleteWardType(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/ward-types/${id}`, config);
  }
}

export const createWardTypeApiClient = (config: ApiConfig) => new WardTypeApiClient(config);
