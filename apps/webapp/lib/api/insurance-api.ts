import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface CreatedBy {
    id: string;
    name: string;
}

export interface UpdatedBy {
    id: string;
    name: string;
}

export interface InsuranceItem {
    id: string;
    provider_name: string;
    company_name: string;
    approval_url: string;
    status: string;
    consulting_service_code: string;
    registration_service_code: string;
    trn: string;
    address: string;
    insurance_company_logo_url: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    createdBy?: CreatedBy;
    updatedBy?: UpdatedBy;
}

export interface InsuranceListResponse {
    success: boolean;
    data: InsuranceItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

export interface InsuranceListParams {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class InsuranceApiClient {
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

    async getInsurances(
        params?: InsuranceListParams
    ): Promise<AxiosResponse<InsuranceListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<InsuranceListResponse>(
                `${this.baseUrl}/api/v1/insurance`,
                {
                    ...config,
                    params,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get insurance providers error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createInsuranceApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new InsuranceApiClient(config);

