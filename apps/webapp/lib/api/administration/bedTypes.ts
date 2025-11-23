// import axios, { AxiosResponse } from "axios";
// import { getIdToken } from "@/app/utils/auth";

// interface ApiConfig {
//     authToken: string;
//     baseUrl?: string;
// }

// export interface BedType {
//     id: string;
//     name: string;
//     status: "active" | "inactive";
// }

// export interface BedTypeListResponse {
//     data: BedType[];
//     success: boolean;
// }

// export interface CreateBedTypeParams {
//     name: string;
//     status: "active" | "inactive";
// }

// export interface UpdateBedTypeParams {
//     name?: string;
//     status?: "active" | "inactive";
// }

// class BedTypeApiClient {
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

//     getBedTypes(params?: any): Promise<AxiosResponse<BedTypeListResponse>> {
//         return axios.get(`${this.baseUrl}/api/v1/bed-types`, {
//             ...(this.getConfig() as any),
//             params,
//         });
//     }

//     createBedType(payload: CreateBedTypeParams) {
//         return axios.post(`${this.baseUrl}/api/v1/bed-types`, payload, this.getConfig());
//     }

//     updateBedType(id: string, payload: UpdateBedTypeParams) {
//         return axios.put(`${this.baseUrl}/api/v1/bed-types/${id}`, payload, this.getConfig());
//     }

//     deleteBedType(id: string) {
//         return axios.delete(`${this.baseUrl}/api/v1/bed-types/${id}`, this.getConfig());
//     }
// }

// export const createBedTypeApiClient = (config: ApiConfig) =>
//     new BedTypeApiClient(config);



import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiConfig {
  baseUrl?: string;
}

export interface BedType {
  id: string;
  name: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  tenant_id?: string;
}

export interface BedTypeListResponse {
  data: BedType[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  };
  success: boolean;
}

export interface CreateBedTypeParams {
  name: string;
  status: "active" | "inactive";
}

export interface UpdateBedTypeParams {
  name?: string;
  status?: "active" | "inactive";
}

class BedTypeApiClient {
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

  async getBedTypes(params?: {
    page?: number;
    limit?: number;
    tenant_id?: string;
    status?: string;
    search?: string;
  }): Promise<AxiosResponse<BedTypeListResponse>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/bed-types`, {
      ...config,
      params,
    });
  }

  async createBedType(payload: CreateBedTypeParams): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/bed-types`, payload, config);
  }

  async updateBedType(id: string, payload: UpdateBedTypeParams): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/bed-types/${id}`, payload, config);
  }

  async deleteBedType(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/bed-types/${id}`, config);
  }
}

export const createBedTypeApiClient = (config: ApiConfig) => new BedTypeApiClient(config);
