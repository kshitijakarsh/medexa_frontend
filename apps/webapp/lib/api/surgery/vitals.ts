import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface VitalRecord {
    id: string;
    patient_id: string;
    visit_id: string;
    blood_pressure?: string;
    pulse_rate?: string;
    respiration_rate?: string;
    spo2?: string;
    systolic_left?: string;
    diastolic_left?: string;
    systolic_right?: string;
    diastolic_right?: string;
    temperature?: string;
    grbs?: string;
    hb?: string;
    height?: string;
    weight?: string;
    bmi?: string;
    ibw?: string;
    rbs?: string;
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

export interface CreateVitalsPayload {
    patient_id: string;
    visit_id: string;
    blood_pressure?: string;
    pulse_rate?: string;
    respiration_rate?: string;
    spo2?: string;
    systolic_left?: string;
    diastolic_left?: string;
    systolic_right?: string;
    diastolic_right?: string;
    temperature?: string;
    grbs?: string;
    hb?: string;
    height?: string;
    weight?: string;
    bmi?: string;
    ibw?: string;
    rbs?: string;
    additional_note?: string;
}

export type UpdateVitalsPayload = Partial<CreateVitalsPayload>;

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

    /* ---------------------------------------------------
       POST: Create Vitals
    --------------------------------------------------- */
    async createVitals(data: CreateVitalsPayload) {
        const config = await this.getConfig();
        return axios.post<VitalsResponse>(
            `${this.baseUrl}/api/v1/vitals`,
            data,
            { ...config }
        );
    }

    /* ---------------------------------------------------
       PUT: Update Vitals
    --------------------------------------------------- */
    async updateVitals(id: string, data: UpdateVitalsPayload) {
        const config = await this.getConfig();
        return axios.put<VitalsResponse>(
            `${this.baseUrl}/api/v1/vitals/${id}`,
            data,
            { ...config }
        );
    }
}

export const createVitalsApiClient = (config: ApiConfig) =>
    new VitalsApiClient(config);
