import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
    authToken?: string
    baseUrl?: string
}

/* ---------------- CLIENT: Nurse Visits ---------------- */

class NurseVisitsApiClient {
    private baseUrl: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
    }

    private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
        const token = await getIdToken();
        return {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        };
    }

    async getVisits(params?: {
        page?: number;
        limit?: number;
        status?: string;
        department_id?: string;
        patient_id?: string;
    }): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/nurse/visits`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get nurse visits error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    async getAllVisits(params?: {
        page?: number;
        limit?: number;
        status?: string;
        department_id?: string;
        patient_id?: string;
    }): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/nurse/visits/all`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get all nurse visits error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    async getNurseOrders(params?: {
        page?: number;
        limit?: number;
        status?: string;
        urgency?: string;
    }): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/nurse/nurse-orders`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get nurse orders error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    async getAllNurseOrders(params?: {
        page?: number;
        limit?: number;
        status?: string;
        urgency?: string;
    }): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/nurse/visits/all`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get all nurse orders error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

export const createNurseVisitsApiClient = (config: ApiConfig) =>
    new NurseVisitsApiClient(config);
