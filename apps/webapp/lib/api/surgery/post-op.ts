import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface PostopDetails {
    id: string;
    surgery_id: string;
    disposition?: {
        transfer_to?: string;
        floor?: string;
        ward_unit?: string;
        bed_number?: string;
        transfer_time?: string;
        nurse?: string;
    };
    monitoring?: {
        frequency?: string;
        duration?: string;
        special?: string;
    };
    activity?: {
        level?: string;
        plan?: string;
    };
    diet?: {
        orders?: string;
        time?: string;
        fluid_restriction?: boolean;
        instructions?: string;
    };
    pain?: {
        frequency?: string;
        target_score?: string;
    };
    drains?: {
        catheter_in_situ?: boolean;
        catheter_plan?: string;
        ngt_in_situ?: boolean;
        ngt_management?: string;
    };
    special_instructions?: string;
    follow_up?: {
        doctor?: string;
        date?: string;
        time?: string;
    };
    nurse_orders?: any[];
    [key: string]: any;
}

export interface PostopDetailsResponse {
    success: boolean;
    data: PostopDetails;
}

class PostopApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
        this.authToken = config.authToken;
    }

    private async getConfig() {
        const token = this.authToken || (await getIdToken());
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };
    }

    async getPostopDetails(surgeryId: string) {
        const config = await this.getConfig();
        return axios.get<PostopDetailsResponse>(
            `${this.baseUrl}/api/v1/surgery/${surgeryId}/post-ops`,
            {
                ...config,
            }
        );
    }
}

export const createPostopApiClient = (config: ApiConfig = {}) =>
    new PostopApiClient(config);
