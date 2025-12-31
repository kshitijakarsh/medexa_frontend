import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface RelatedPatient {
    id: string;
    first_name: string;
    last_name: string;
    civil_id: string;
    mobile_number: string;
    email: string;
    gender: string;
    dob: string;
}

export interface PatientRelation {
    id: string;
    patient_id: string;
    related_patient_id: string;
    relation_type: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    relatedPatient: RelatedPatient;
}

export interface CreatePatientRelationPayload {
    patient_id: string;
    related_patient_id: string;
    relation_type: string;
}

export interface CreatePatientRelationResponse {
    success: boolean;
    message: string;
    data: {
        relation1: PatientRelation;
        relation2: PatientRelation;
    };
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class PatientRelationsApiClient {
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

    async createRelation(
        payload: CreatePatientRelationPayload
    ): Promise<AxiosResponse<CreatePatientRelationResponse>> {
        try {
            const config = await this.getConfig();
            return axios.post<CreatePatientRelationResponse>(
                `${this.baseUrl}/api/v1/patient-relations`,
                payload,
                config
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create patient relation error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createPatientRelationsApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new PatientRelationsApiClient(config);

