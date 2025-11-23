import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
  baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface RolePermission {
  id: number;
  permission: string;
}

export interface RoleItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  tenant_id?: number;
  created_at: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
  permissions?: RolePermission[];
}

export interface RoleListResponse {
  data: RoleItem[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  };
  success: boolean;
}

export interface RoleDetailResponse {
  data: RoleItem;
  success: boolean;
}

export interface CreateRolePayload {
  name: string;
  status: "active" | "inactive";
  permissions?: string[];
}

export interface UpdateRolePayload {
  name?: string;
  status?: "active" | "inactive";
  permissions?: string[]; // replaces all
}

/* Query parameters for list */
export interface RoleListParams {
  page?: number;
  limit?: number;
  search?: string;  // min 2 chars
  status?: "active" | "inactive";
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class RoleApiClient {
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
     GET List
  ------------------------------------------- */
  async getRoles(params?: RoleListParams): Promise<AxiosResponse<RoleListResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<RoleListResponse>(`${this.baseUrl}/api/v1/roles`, {
        ...config,
        params,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Get roles error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /* ------------------------------------------
     GET By ID
  ------------------------------------------- */
  async getRoleById(id: string): Promise<AxiosResponse<RoleDetailResponse>> {
    try {
      const config = await this.getConfig();
      return axios.get<RoleDetailResponse>(`${this.baseUrl}/api/v1/roles/${id}`, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Get role error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /* ------------------------------------------
     CREATE
  ------------------------------------------- */
  async createRole(payload: CreateRolePayload): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.post(`${this.baseUrl}/api/v1/roles`, payload, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Create role error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /* ------------------------------------------
     UPDATE
  ------------------------------------------- */
  async updateRole(id: string, payload: UpdateRolePayload): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.put(`${this.baseUrl}/api/v1/roles/${id}`, payload, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Update role error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /* ------------------------------------------
     DELETE
  ------------------------------------------- */
  async deleteRole(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getConfig();
      return axios.delete(`${this.baseUrl}/api/v1/roles/${id}`, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Delete role error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}

/* Instance Creator */
export const createRoleApiClient = (config: ApiConfig = { baseUrl: undefined }) =>
  new RoleApiClient(config);
