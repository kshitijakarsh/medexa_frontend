import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/lib/api";

interface ApiConfig {
    baseUrl?: string;
    authToken?: string;
}

export interface PresignedUrlPayload {
    fileName: string;
    path: string; // e.g. "patients"
    contentType: string;
}

export interface PresignedUrlResponse {
    uploadUrl: string;
    key: string;
    bucket: string;
    subbucketPath: string;
    expiresIn: number;
    contentType: string;
}

class StorageApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl =
            config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
        this.authToken = config.authToken;
    }

    private async getConfig(): Promise<AxiosRequestConfig> {
        const token = this.authToken || (await getIdToken());
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
        };
    }

    async generatePresignedUrl(
        payload: PresignedUrlPayload
    ): Promise<AxiosResponse<{ data: PresignedUrlResponse }>> {
        const config = await this.getConfig();
        return axios.post(
            `${this.baseUrl}/api/v1/storage`,
            payload,
            config
        );
    }
}

export const createStorageApiClient = (config: ApiConfig) =>
    new StorageApiClient(config);
