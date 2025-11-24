// import axios from "axios";
// import { getIdToken } from "@/app/utils/auth";

// interface ApiConfig {
//     authToken: string;
//     baseUrl?: string;
// }

// export interface Ward {
//     id: string;
//     ward_number: string;
//     ward_type_id: string;
//     floor_id: string;
//     status: "active" | "inactive";
// }

// export interface WardListResponse {
//     data: Ward[];
//     success: boolean;
// }

// export interface CreateWardParams {
//     ward_number: string;
//     ward_type_id: string;
//     floor_id: string;
//     status: "active" | "inactive";
// }

// export interface UpdateWardParams {
//     ward_number?: string;
//     ward_type_id?: string;
//     floor_id?: string;
//     status?: "active" | "inactive";
// }

// class WardApiClient {
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

//     getWards(params?: any) {
//         return axios.get(`${this.baseUrl}/api/v1/wards`, {
//             ...(this.getConfig() as any),
//             params,
//         });
//     }

//     createWard(payload: CreateWardParams) {
//         return axios.post(`${this.baseUrl}/api/v1/wards`, payload, this.getConfig());
//     }

//     updateWard(id: string, payload: UpdateWardParams) {
//         return axios.put(`${this.baseUrl}/api/v1/wards/${id}`, payload, this.getConfig());
//     }

//     deleteWard(id: string) {
//         return axios.delete(`${this.baseUrl}/api/v1/wards/${id}`, this.getConfig());
//     }
// }

// export const createWardApiClient = (config: ApiConfig) =>
//     new WardApiClient(config);


// src/lib/api/administration/wards.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
  baseUrl?: string;
}

/* ----- Response / Payload Types ----- */

export interface WardType {
  id: string;
  name?: string;
}

export interface FloorType {
  id: string;
  floor_name?: string;
}

export interface WardItem {
  id: string;
  ward_number: string;
  ward_type_id: string;
  floor_id: string;
  status: "active" | "inactive";
  created_at: string;
  // optional relations if backend returns them
  ward_type?: WardType;
  floor?: FloorType;
}

export interface WardListResponse {
  data: WardItem[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  };
  success: boolean;
}

export interface WardDetailResponse {
  data: WardItem;
  success: boolean;
}

export interface CreateWardPayload {
  ward_number: string;
  ward_type_id: string;
  floor_id: string;
  status: "active" | "inactive";
}

export interface UpdateWardPayload {
  ward_number?: string;
  ward_type_id?: string;
  floor_id?: string;
  status?: "active" | "inactive";
}

/* query params for list */
export interface WardListParams {
  page?: number;
  limit?: number;
  search?: string; // searches ward_number or any backend defined fields
  ward_type_id?: string;
  floor_id?: string;
  status?: "active" | "inactive";
}

/* ----- API Client ----- */

class WardApiClient {
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

  /**
   * Get paginated / filtered list of wards
   */
  async getWards(params?: WardListParams): Promise<AxiosResponse<WardListResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<WardListResponse>(`${this.baseUrl}/api/v1/wards`, {
        ...config,
        params,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get wards error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get single ward by id
   */
  async getWardById(id: string): Promise<AxiosResponse<WardDetailResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<WardDetailResponse>(`${this.baseUrl}/api/v1/wards/${id}`, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get ward error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Create a ward
   */
  async createWard(payload: CreateWardPayload): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.post(`${this.baseUrl}/api/v1/wards`, payload, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create ward error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Update a ward
   */
  async updateWard(id: string, payload: UpdateWardPayload): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.put(`${this.baseUrl}/api/v1/wards/${id}`, payload, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update ward error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Delete (soft) a ward
   */
  async deleteWard(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.delete(`${this.baseUrl}/api/v1/wards/${id}`, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete ward error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }
}

export const createWardApiClient = (config: ApiConfig = { baseUrl: undefined }) =>
  new WardApiClient(config);
