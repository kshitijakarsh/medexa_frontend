import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface Surgery {
    id: string;
    surgery_type?: string;
    patient_id?: string;
    patient?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    doctor_id?: string;
    doctor?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    department?: string;
    urgency?: "elective" | "urgent" | "emergency";
    scheduled_date?: string;
    status?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export interface SurgeryListResponse {
    success: boolean;
    data: Surgery[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface SurgeryResponse {
    success: boolean;
    data: Surgery;
}

class SurgeryApiClient {
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
       GET: All Surgeries
    --------------------------------------------------- */
    async getAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        urgency?: string;
        department?: string;
    }) {
        const config = await this.getConfig();
        return axios.get(`${this.baseUrl}/api/v1/surgeries`, {
            ...config,
            params,
        });
    }
}

export const createSurgeryApiClient = (config: ApiConfig) =>
    new SurgeryApiClient(config);
