import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface AttachmentItem {
    id: string;
    tenant_id: string;
    patient_id: string;
    visit_id: string;
    title: string;
    description?: string;
    s3_url: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    patient: {
        id: string;
        first_name: string;
        last_name: string;
        patient_number: string;
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

export interface AttachmentsListResponse {
    success: boolean;
    message: string;
    data: AttachmentItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

export interface AttachmentsListParams {
    page?: number;
    limit?: number;
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class PatientAttachmentsApiClient {
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

    async getAttachmentsByPatientId(
        patientId: string,
        params?: AttachmentsListParams
    ): Promise<AxiosResponse<AttachmentsListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<AttachmentsListResponse>(
                `${this.baseUrl}/api/v1/patients/${patientId}/attachments`,
                {
                    ...config,
                    params,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get attachments error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createPatientAttachmentsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new PatientAttachmentsApiClient(config);

