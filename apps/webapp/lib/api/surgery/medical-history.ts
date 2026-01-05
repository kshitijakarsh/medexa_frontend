import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface SurgeryHistory {
    name: string;
    date: string;
    hospital: string;
}

export interface Immunization {
    vaccine: string;
    date: string;
}

export interface FamilyHistory {
    diabetes: boolean;
    heart_disease: boolean;
    cancer: boolean;
}

export interface MedicalHistoryData {
    conditions: string[];
    surgeries: SurgeryHistory[];
    family_history: FamilyHistory;
    medications: string[];
    immunizations: Immunization[];
}

export interface MedicalHistoryItem {
    id: string;
    tenant_id: string;
    patient_id: string;
    history: MedicalHistoryData;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    patient: {
        id: string;
        first_name: string;
        last_name: string;
        uhid: string;
    };
    createdBy: {
        id: string;
        first_name: string;
        last_name: string;
    };
    updatedBy: {
        id: string;
        first_name: string;
        last_name: string;
    };
}

export interface MedicalHistoryResponse {
    success: boolean;
    data: MedicalHistoryItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

class MedicalHistoryApiClient {
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
       GET: Patient Medical History
    --------------------------------------------------- */
    async getByPatientId(patientId: string) {
        const config = await this.getConfig();
        return axios.get<MedicalHistoryResponse>(
            `${this.baseUrl}/api/v1/patients/${patientId}/medical-history`,
            { ...config }
        );
    }
}

export const createMedicalHistoryApiClient = (config: ApiConfig) =>
    new MedicalHistoryApiClient(config);
