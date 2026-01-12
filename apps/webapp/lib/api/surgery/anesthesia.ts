import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface AnesthesiaPlan {
    id: string;
    surgery_id: string;
    mallampati_grade?: string;
    mouth_opening?: boolean;
    neck_mobility?: boolean;
    diffult_airway_risk?: string;
    airway_management_plan?: string;
    asa_status_classification?: string;
    surgery_risk_level?: string;
    asa_and_risk_additional_note?: string;
    anaesthesia_type?: string;
    monitoring_required?: string;
    post_operative_ventilation_required?: boolean;
    icu_required?: string;
    tenant_id?: string;
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
    createdBy?: {
        id: string;
        name: string;
    };
    updatedBy?: {
        id: string;
        name: string;
    };
    tenant?: {
        id: string;
        name_en: string;
    };
}

export interface AnesthesiaPlansResponse {
    success: boolean;
    data: AnesthesiaPlan;
}

class AnesthesiaApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
        this.authToken = config.authToken;
    }

    private async getConfig() {
        // use provided token or fetch from session
        const token = this.authToken || (await getIdToken());
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };
    }

    /**
     * GET: Fetch anesthesia plan for a specific surgery ID
     * Endpoint: api/v1/surgery/{id}/anesthesia-plans
     */
    async getAnesthesiaPlans(surgeryId: string) {
        const config = await this.getConfig();
        const response = await axios.get<AnesthesiaPlansResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/anesthesia`,
            {
                ...config,
            }
        );
        return response;
    }

    /**
     * PUT: Update anesthesia plan for a specific surgery ID
     * Endpoint: api/v1/surgery/{id}/anesthesia
     */
    async updateAnesthesiaPlan(surgeryId: string, data: Partial<AnesthesiaPlan>) {
        const config = await this.getConfig();
        const response = await axios.put<AnesthesiaPlansResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/anesthesia`,
            data,
            {
                ...config,
            }
        );
        return response;
    }

    /**
     * POST: Save or update anesthesia plan for a specific surgery ID
     * Endpoint: api/v1/surgery/{id}/anesthesia
     */
    async saveAnesthesiaPlan(surgeryId: string, data: Partial<AnesthesiaPlan>) {
        const config = await this.getConfig();
        const response = await axios.post<AnesthesiaPlansResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/anesthesia`,
            data,
            {
                ...config,
            }
        );
        return response;
    }

    /**
     * DELETE: Delete anesthesia plan for a specific surgery ID
     * Endpoint: api/v1/surgery/{id}/anesthesia
     */
    async deleteAnesthesiaPlan(surgeryId: string) {
        const config = await this.getConfig();
        return axios.delete(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/anesthesia`,
            {
                ...config,
            }
        );
    }
}

export const createAnesthesiaApiClient = (config: ApiConfig = {}) =>
    new AnesthesiaApiClient(config);
