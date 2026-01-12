import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface Procedure {
    id: string;
    name: string;
    code: string;
    surgery_type: string;
    standard_charge: number;
    status: "active" | "inactive";

    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
}

/* ---------------- PAYLOADS ---------------- */

export type CreateProcedurePayload = {
    name: string;
    code: string;
    surgery_type: string;
    standard_charge: number;
    status: "active" | "inactive";
};

export type UpdateProcedurePayload = Partial<CreateProcedurePayload>;

/* ---------------- RESPONSE TYPES ---------------- */

export interface ProcedureResponse {
    success: boolean;
    data: Procedure;
}

export interface ProcedureListResponse {
    success: boolean;
    data: Procedure[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

/* ---------------- CLIENT: OPERATION ---------------- */

class OperationApiClient {
    private baseUrl: string;

    constructor(config: ApiConfig) {
        this.baseUrl =
            config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
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

    /* ---------------------------------------------------
       GET: All Procedures
    --------------------------------------------------- */
    async getAll(
        params?: {
            page?: number;
            limit?: number;
            search?: string;
            status?: string;
            surgery_type?: string;
        }
    ): Promise<AxiosResponse<ProcedureListResponse>> {
        const config = await this.getJsonRequestConfig();

        return axios.get(
            `${this.baseUrl}/api/v1/procedures`,
            { ...config, params }
        );
    }

    /* ---------------------------------------------------
       GET: Procedure By ID
    --------------------------------------------------- */
    async getById(id: string): Promise<AxiosResponse<ProcedureResponse>> {
        const config = await this.getJsonRequestConfig();

        return axios.get(
            `${this.baseUrl}/api/v1/procedures/${id}`,
            { ...config }
        );
    }

    /* ---------------------------------------------------
       POST: Create Procedure
    --------------------------------------------------- */
    async create(
        payload: CreateProcedurePayload
    ): Promise<AxiosResponse<ProcedureResponse>> {
        const config = await this.getJsonRequestConfig();

        return axios.post(
            `${this.baseUrl}/api/v1/procedures`,
            payload,
            { ...config }
        );
    }

    /* ---------------------------------------------------
       PUT: Update Procedure
    --------------------------------------------------- */
    async update(
        id: string,
        payload: UpdateProcedurePayload
    ): Promise<AxiosResponse<ProcedureResponse>> {
        const config = await this.getJsonRequestConfig();

        return axios.put(
            `${this.baseUrl}/api/v1/procedures/${id}`,
            payload,
            { ...config }
        );
    }

    /* ---------------------------------------------------
       DELETE: Delete Procedure
    --------------------------------------------------- */
    async delete(id: string): Promise<AxiosResponse<any>> {
        const config = await this.getJsonRequestConfig();

        return axios.delete(
            `${this.baseUrl}/api/v1/procedures/${id}`,
            { ...config }
        );
    }
}

/* ---------------- FACTORY FUNCTION ---------------- */

export function createOperationApiClient(config: ApiConfig = {}) {
    return new OperationApiClient(config);
}
