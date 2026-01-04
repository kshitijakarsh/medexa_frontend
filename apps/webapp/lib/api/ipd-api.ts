import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface IPDPatient {
    id: string;
    first_name: string;
    last_name: string;
}

export interface IPDDepartment {
    id: string;
    department_name: string;
}

export interface IPDDoctor {
    id: string;
    name: string;
    email: string;
}

export interface IPDWard {
    id: string;
    ward_number: string;
}

export interface IPDBed {
    id: string;
    bed_number: string;
}

export interface IPDNurse {
    id: string;
    name: string;
}

export interface IPDItem {
    id: string;
    date: string;
    patient_id: string;
    casuality: boolean;
    credit_limit: number;
    tpa: string;
    admission_type: "emergency" | "elective" | "daycare" | "observation" | "mlc";
    department_id: string;
    doctor_id: string;
    ward_id: string;
    bed_id: string;
    nurse_id: string;
    expected_days: number;
    admission_reason: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    patient?: IPDPatient;
    department?: IPDDepartment;
    doctor?: IPDDoctor;
    ward?: IPDWard;
    bed?: IPDBed;
    nurse?: IPDNurse;
}

export interface IPDListResponse {
    success: boolean;
    data: IPDItem[];
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        totalData: number;
    };
}

export interface IPDListParams {
    page?: number;
    limit?: number;
    patient_id?: string;
    department_id?: string;
    doctor_id?: string;
    ward_id?: string;
    admission_type?: "emergency" | "elective" | "daycare" | "observation" | "mlc";
    search?: string;
}

export interface CreateIPDParams {
    patient_id: string;
    date: string; // ISO date string
    casuality: boolean;
    credit_limit: number;
    tpa: string;
    admission_type: "emergency" | "elective" | "daycare" | "observation" | "mlc";
    department_id: string;
    doctor_id: string;
    ward_id: string;
    bed_id: string;
    nurse_id: string;
    expected_days: number;
    admission_reason: string;
}

export interface CreateIPDResponse {
    success: boolean;
    data: IPDItem;
    message?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class IPDApiClient {
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

    async getIPDs(
        params?: IPDListParams
    ): Promise<AxiosResponse<IPDListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<IPDListResponse>(`${this.baseUrl}/api/v1/ipds`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get IPDs error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    async createIPD(
        params: CreateIPDParams
    ): Promise<AxiosResponse<CreateIPDResponse>> {
        try {
            const config = await this.getConfig();
            return axios.post<CreateIPDResponse>(
                `${this.baseUrl}/api/v1/ipds`,
                params,
                config
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create IPD error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createIPDApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new IPDApiClient(config);

