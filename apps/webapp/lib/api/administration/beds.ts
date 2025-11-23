import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken: string;
    baseUrl?: string;
}

export interface Bed {
    id: string;
    bed_no: string;
    bed_type_id: string;
    ward_id: string;
    floor_id: string;
    status: "active" | "inactive";
}

export interface CreateBedParams {
    bed_no: string;
    bed_type_id: string;
    ward_id: string;
    floor_id: string;
    status: "active" | "inactive";
}

export interface UpdateBedParams {
    bed_no?: string;
    bed_type_id?: string;
    ward_id?: string;
    floor_id?: string;
    status?: "active" | "inactive";
}

class BedApiClient {
    private baseUrl: string;
    private authToken: string;

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

    getBeds(params?: any) {
        return axios.get(`${this.baseUrl}/api/v1/beds`, {
            ...(this.getConfig() as any),
            params,
        });
    }

    createBed(payload: CreateBedParams) {
        return axios.post(`${this.baseUrl}/api/v1/beds`, payload, this.getConfig());
    }

    updateBed(id: string, payload: UpdateBedParams) {
        return axios.put(`${this.baseUrl}/api/v1/beds/${id}`, payload, this.getConfig());
    }

    deleteBed(id: string) {
        return axios.delete(`${this.baseUrl}/api/v1/beds/${id}`, this.getConfig());
    }
}

export const createBedApiClient = (config: ApiConfig) =>
    new BedApiClient(config);
