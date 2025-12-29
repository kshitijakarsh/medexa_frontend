import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface BedItem {
    id: string;
    bed_number: string;
    bed_type_id: string;
    ward_id: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    tenant_id: string;
}

export interface BedListResponse {
    success: boolean;
    data: BedItem[];
}

export interface BedListParams {
    page?: number;
    limit?: number;
    tenant_id?: string;
    ward_id?: string;
    bed_type_id?: string;
    status?: string;
    search?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class FrontofficeBedsApiClient {
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

    async getBeds(
        params?: BedListParams
    ): Promise<AxiosResponse<BedListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<BedListResponse>(`${this.baseUrl}/api/v1/beds`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get beds error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createFrontofficeBedsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new FrontofficeBedsApiClient(config);

