import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface VitalRecord {
    id: string;
    patient_id: string;
    height?: number;
    weight?: number;
    bmi?: number;
    blood_pressure_systolic?: number;
    blood_pressure_diastolic?: number;
    heart_rate?: number;
    respiratory_rate?: number;
    temperature?: number;
    oxygen_saturation?: number;
    blood_glucose?: number;
    pain_score?: number;
    additional_note?: string;
    recorded_at: string;
    created_at?: string;
    updated_at?: string;
}

export interface VitalsResponse {
    success: boolean;
    data: VitalRecord[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

class VitalsApiClient {
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
       GET: Patient Vitals
    --------------------------------------------------- */
    async getByPatientId(patientId: string) {
        const config = await this.getConfig();
        return axios.get<VitalsResponse>(
            `${this.baseUrl}/api/v1/patients/${patientId}/vitals`,
            { ...config }
        );
    }
}

export const createVitalsApiClient = (config: ApiConfig) =>
    new VitalsApiClient(config);
