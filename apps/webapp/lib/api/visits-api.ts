import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface VisitDoctor {
    id: string;
    name: string;
    email: string;
}

export interface VisitPatient {
    id: string;
    first_name: string;
    last_name: string;
}

export interface VisitCharge {
    id: string;
    amount: number;
    status: string;
}

export interface VisitItem {
    id: string;
    patient_id: string;
    procedure_type_id: string;
    procedure_category_id: string;
    machine_room_id: string;
    nurse_id: string;
    communication_mode_id: string;
    doctor_ids: VisitDoctor[];
    time_slot_start: string;
    time_slot_end: string;
    shift: string;
    status: string;
    visit_type: string;
    patient_visit_type: string;
    full_name: string;
    gender: string;
    age: number;
    civil_id: string;
    phone_no: string;
    mode_of_arrival: string;
    emergency_guardian_mrn: string;
    er_team_id: string;
    weight: number;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    patient: VisitPatient;
    charges: VisitCharge[];
}

export interface VisitListResponse {
    success: boolean;
    data: VisitItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface VisitListParams {
    page?: number;
    limit?: number;
    status?: string;
    department_id?: string;
    doctor_id?: string;
    patient_id?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class VisitsApiClient {
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
       GET Visits
    ------------------------------------------- */
    async getVisits(
        params?: VisitListParams
    ): Promise<AxiosResponse<VisitListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<VisitListResponse>(`${this.baseUrl}/api/v1/visits`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visits error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

/* Instance Creator */
export const createVisitsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new VisitsApiClient(config);
