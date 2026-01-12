import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface Surgery {
    id: string;
    procedure_id?: string;
    patient_id?: string;
    department_id?: string;
    urgency?: "elective" | "urgent" | "emergency";
    duration?: number;
    date?: string;
    ot_room_id?: string;
    surgeon_id?: string;
    assistant_surgeon_id?: string;
    anaesthetist_id?: string;
    scrub_nurse_id?: string;
    circulating_nurse_id?: string;
    ot_technician_id?: string;
    tenant_id?: string;
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
    patient?: {
        id: string;
        first_name: string;
        last_name: string;
        civil_id?: string;
        mobile_number?: string;
        vip?: boolean;
    };
    procedure?: {
        id: string;
        name: string;
        code?: string;
        surgery_type?: string;
        standard_charge?: number;
    };
    doctor?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    department?: string;
    status?: string;
    notes?: string;
    surgery_type?: string; // Backward compatibility
    scheduled_date?: string; // Backward compatibility
    createdBy?: {
        id: string;
        name: string;
    };
    updatedBy?: {
        id: string;
        name: string;
    };
    tenant?: {
        id: string;
        name: string;
    };
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

export interface CreateSurgeryParams {
    procedure_id: string;
    patient_id: string;
    department_id: string;
    urgency: "elective" | "urgent" | "emergency";
    duration: number;
    date: string;
    ot_room_id: string;
    surgeon_id: string;
    assistant_surgeon_id?: string;
    anaesthetist_id?: string;
    scrub_nurse_id?: string;
    circulating_nurse_id?: string;
    ot_technician_id?: string;
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

    /* ---------------------------------------------------
       POST: Create Surgery
    --------------------------------------------------- */
    async create(payload: CreateSurgeryParams) {
        const config = await this.getConfig();
        return axios.post(`${this.baseUrl}/api/v1/surgeries`, payload, {
            ...config,
        });
    }

    /* ---------------------------------------------------
       GET: Surgery By ID
    --------------------------------------------------- */
    async getById(id: string) {
        const config = await this.getConfig();
        return axios.get<SurgeryResponse>(`${this.baseUrl}/api/v1/surgeries/${id}`, {
            ...config,
        });
    }
}

export const createSurgeryApiClient = (config: ApiConfig) =>
    new SurgeryApiClient(config);
