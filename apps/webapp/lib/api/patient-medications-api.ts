import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface MedicationItem {
    id: string;
    tenant_id: string;
    patient_id: string;
    visit_id: string;
    medicine: string;
    dosage: string;
    route: string;
    frequency: string;
    duration: string;
    medication_instructions: string;
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
        first_name: string;
        last_name: string;
        email: string;
    };
}

export interface MedicationsListResponse {
    success: boolean;
    message: string;
    data: MedicationItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

export interface MedicationsListParams {
    page?: number;
    limit?: number;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class PatientMedicationsApiClient {
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

    async getMedicationsByPatientId(
        patientId: string,
        params?: MedicationsListParams
    ): Promise<AxiosResponse<MedicationsListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<MedicationsListResponse>(
                `${this.baseUrl}/api/v1/patients/${patientId}/medications`,
                {
                    ...config,
                    params,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get medications error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createPatientMedicationsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new PatientMedicationsApiClient(config);

