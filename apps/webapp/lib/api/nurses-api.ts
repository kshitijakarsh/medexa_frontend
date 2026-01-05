import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface NurseUser {
    id: number;
    sub: string;
    email: string;
    name: string;
    tenant_id: number;
    phone: string;
    role_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface NursesListResponse {
    success: boolean;
    data: NurseUser[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

export interface NursesListParams {
    page?: number;
    limit?: number;
    search?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class NursesApiClient {
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

    async getNurses(
        params?: NursesListParams
    ): Promise<AxiosResponse<NursesListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<NursesListResponse>(
                `${this.baseUrl}/api/v1/nurse/users/consumables-creators`,
                {
                    ...config,
                    params,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get nurses error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createNursesApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new NursesApiClient(config);

