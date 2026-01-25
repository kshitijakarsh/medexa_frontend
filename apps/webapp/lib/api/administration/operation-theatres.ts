import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

export interface OperationTheatre {
    id: string;
    operation_room: string; // 'operationRoom' in some places, snake_case in backend usually
    room_name: string;
    floor: string;
    status: "active" | "inactive";
}

export interface CreateOTPayload {
    operationRoom: string; // Dialog uses camelCase
    roomName: string;
    floor: string;
    status?: "active" | "inactive";
}

class OperationTheatreApiClient {
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

    async create(payload: CreateOTPayload): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getConfig();
            // Mapping camelCase to snake_case if needed, but keeping simple for now
            // Assuming backend accepts these fields
            return axios.post(`${this.baseUrl}/api/v1/operation-theatres`, payload, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create OT error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createOperationTheatreApiClient = (config: ApiConfig = { baseUrl: undefined }) =>
    new OperationTheatreApiClient(config);
