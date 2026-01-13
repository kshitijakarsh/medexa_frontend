import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface IntraopDetails {
    id: string;
    surgery_id: string;
    // Add other fields as they become known from the backend response
    [key: string]: any;
}

export interface IntraopDetailsResponse {
    success: boolean;
    data: IntraopDetails;
}

class IntraopApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI_SET_2 ?? "";
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
     * GET: Fetch intra-op details for a specific surgery ID
     * Endpoint: api/v1/surgery/{id}/intraops
     */
    async getIntraopDetails(surgeryId: string) {
        const config = await this.getConfig();
        return axios.get<IntraopDetailsResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/intraops`,
            {
                ...config,
            }
        );
    }
}

export const createIntraopApiClient = (config: ApiConfig = {}) =>
    new IntraopApiClient(config);
