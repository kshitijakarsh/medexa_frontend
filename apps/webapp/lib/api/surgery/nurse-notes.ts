import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface NurseNote {
    id: string;
    surgery_id: string;
    // Add other fields as they become known from the backend response
    [key: string]: any;
}

export interface NurseNotesResponse {
    success: boolean;
    data: NurseNote;
}

class NurseNotesApiClient {
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
     * GET: Fetch nurse notes for a specific surgery ID
     * Endpoint: /api/v1/surgery/{id}/nurse-notes
     */
    async getNurseNotes(surgeryId: string) {
        const config = await this.getConfig();
        return axios.get<NurseNotesResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/nurse-notes`,
            {
                ...config,
            }
        );
    }

    /**
     * POST: Save nurse notes for a specific surgery ID
     * Endpoint: /api/v1/surgery/{id}/nurse-notes
     */
    async saveNurseNotes(surgeryId: string, data: Partial<NurseNote>) {
        const config = await this.getConfig();
        return axios.post<NurseNotesResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/nurse-notes`,
            data,
            {
                ...config,
            }
        );
    }
}

export const createNurseNotesApiClient = (config: ApiConfig = {}) =>
    new NurseNotesApiClient(config);
