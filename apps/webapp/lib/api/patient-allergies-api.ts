import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface AllergyItem {
    id: string;
    tenant_id: string;
    patient_id: string;
    visit_id: string;
    allergy_type: string;
    date_from: string;
    date_to: string;
    allergy_name: string;
    reaction: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    is_deleted: boolean;
    patient: {
        id: string;
        first_name: string;
        last_name: string;
        civil_id: string;
        mobile_number: string;
    };
    visit: {
        id: string;
        visit_date: string;
        visit_type: string;
        status: string;
    };
    createdBy: {
        id: string;
        name: string;
        email: string;
    };
    updatedBy: {
        id: string;
        name: string;
        email: string;
    };
}

export interface AllergiesListResponse {
    success: boolean;
    message: string;
    data: AllergyItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

export interface AllergiesListParams {
    page?: number;
    limit?: number;
    allergy_type?: string;
    allergy_name?: string;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class PatientAllergiesApiClient {
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

    async getAllergiesByPatientId(
        patientId: string,
        params?: AllergiesListParams
    ): Promise<AxiosResponse<AllergiesListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<AllergiesListResponse>(
                `${this.baseUrl}/api/v1/patients/${patientId}/allergies`,
                {
                    ...config,
                    params,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get allergies error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createPatientAllergiesApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new PatientAllergiesApiClient(config);

