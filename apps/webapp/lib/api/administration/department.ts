import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiConfig {
    baseUrl?: string;
    authToken: string;
}

/* ---------------- TYPES ---------------- */

export interface Department {
    id: string;
    department_name: string;
    status: "active" | "inactive";
    added_by?: string;
    // created_at?: string;
    // createdBy?: {
    //     name: string
    // };
    tenant_id?: string;
}

export interface DepartmentUser {
    id: string;
    name: string;
    email: string;
}

export interface TenantInfo {
    id: string;
    tenant_name: string;
}

export interface DepartmentDetailResponse {
    data: {
        id: string;
        department_name: string;
        status: "active" | "inactive";
        // addedBy: DepartmentUser;
        created_at?: string;
        createdBy?: DepartmentUser;
        tenant: TenantInfo;
    };
    success: boolean;
}

export interface DepartmentListResponse {
    data: DepartmentDetailResponse["data"][];
    pagination?: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
        totalPages?: number;
    };
    success: boolean;
}

export interface CreateDepartmentParams {
    department_name: string;
    status: "active" | "inactive";
}

export interface UpdateDepartmentParams {
    department_name?: string;
    status?: "active" | "inactive";
}

/* ---------------- CLIENT ---------------- */

class DepartmentApiClient {
    private baseUrl: string;
    private authToken: string

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
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
    async getDepartments(params?: {
        tenant_id?: string;
        status?: string;
        limit?: number;
        offset?: number;
        search?: string;
    }): Promise<AxiosResponse<DepartmentListResponse>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.get(`${this.baseUrl}/api/v1/departments`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get departments error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- GET ONE --------- */
    async getDepartmentById(id: string): Promise<AxiosResponse<DepartmentDetailResponse>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.get(`${this.baseUrl}/api/v1/departments/${id}`, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get department error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- CREATE --------- */
    async createDepartment(
        payload: CreateDepartmentParams
    ): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.post(`${this.baseUrl}/api/v1/departments`, payload, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create department error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- UPDATE --------- */
    async updateDepartment(
        id: string,
        payload: UpdateDepartmentParams
    ): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.put(`${this.baseUrl}/api/v1/departments/${id}`, payload, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Update department error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- DELETE --------- */
    async deleteDepartment(id: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.delete(`${this.baseUrl}/api/v1/departments/${id}`, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Delete department error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createDepartmentApiClient = (config: ApiConfig) =>
    new DepartmentApiClient(config);
