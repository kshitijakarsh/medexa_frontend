import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface Procedure {
    id: string;
    title: string;
    details?: string;
}

export interface ProcedureListResponse {
    success: boolean;
    data: Procedure[];
}

class SurgeryTemplateApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
        this.authToken = config.authToken;
    }

    private async getConfig() {
        const token = await getIdToken();
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };
    }

    /* ---------------------------------------------------
       GET: All Procedures
    --------------------------------------------------- */
    async getProcedures(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<ProcedureListResponse>(`${this.baseUrl}/api/v1/procedures`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       GET: All Clearances
    --------------------------------------------------- */
    async getClearances(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<{ success: boolean; data: { id: string; name: string }[] }>(
            `${this.baseUrl}/api/v1/clearances`,
            {
                ...config,
                params,
            }
        );
    }

    /* ---------------------------------------------------
       GET: All Consents
    --------------------------------------------------- */
    async getConsents(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<{ success: boolean; data: { id: string; name: string }[] }>(
            `${this.baseUrl}/api/v1/consents`,
            {
                ...config,
                params,
            }
        );
    }
}

export const createSurgeryTemplateApiClient = (config: ApiConfig) =>
    new SurgeryTemplateApiClient(config);
