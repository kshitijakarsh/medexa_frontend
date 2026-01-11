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

export interface SurgeryTemplate {
    id: string;
    name: string;
    procedure_id?: string;
    procedure?: {
        id: string;
        name: string;
    };
    lead_surgeon_id?: string;
    lead_surgeon?: {
        id: string;
        name: string;
        department?: string;
    };
    status?: string;
    created_at?: string;
    updated_at?: string;
    createdBy?: {
        id: string;
        name: string;
        department?: string;
    };
}

export interface SurgeryTemplateListResponse {
    success: boolean;
    data: SurgeryTemplate[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface SurgeryTemplateResponse {
    success: boolean;
    data: SurgeryTemplate;
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
       GET: All Templates
    --------------------------------------------------- */
    async getTemplates(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<SurgeryTemplateListResponse>(`${this.baseUrl}/api/v1/surgery-templates`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       POST: Create Template
    --------------------------------------------------- */
    async create(payload: Partial<SurgeryTemplate>) {
        const config = await this.getConfig();
        return axios.post<SurgeryTemplateResponse>(`${this.baseUrl}/api/v1/surgery-templates`, payload, {
            ...config,
        });
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
