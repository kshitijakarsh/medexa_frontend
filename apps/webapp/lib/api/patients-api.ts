import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface PatientCountry {
    id: number;
    name_en: string;
    iso_code: string;
    phone_code: string;
}

export interface PatientCategory {
    id: number;
    name: string;
}

export interface PatientItem {
    id: number;
    first_name: string;
    last_name: string;
    dob: string | null;
    gender: string | null;
    civil_id: string | null; // CPR/NID
    mobile_number: string | null;
    email: string | null;
    blood_group?: string | null;
    marital_status?: string | null;
    nationality?: string | null;
    city?: string | null;
    permanent_address?: string | null;
    photo_url?: string | null;
    category?: PatientCategory | null;
    country?: PatientCountry | null;
    issuing_country?: PatientCountry | null;
}

export interface PatientListResponse {
    success: boolean;
    data: PatientItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface PatientListParams {
    page?: number;
    limit?: number;
    search?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class PatientsApiClient {
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

    async getPatients(
        params?: PatientListParams
    ): Promise<AxiosResponse<PatientListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<PatientListResponse>(`${this.baseUrl}/api/v1/patients`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get patients error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    async getPatient(id: string): Promise<AxiosResponse<{ success: boolean; data: PatientItem }>> {
        try {
            const config = await this.getConfig();
            return axios.get<{ success: boolean; data: PatientItem }>(
                `${this.baseUrl}/api/v1/patients/${id}`,
                config
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get patient error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createPatientsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new PatientsApiClient(config);
