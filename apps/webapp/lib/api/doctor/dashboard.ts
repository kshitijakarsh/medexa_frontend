import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
    authToken?: string
    baseUrl?: string
}

/* ---------------- CLIENT: Doctor Visits ---------------- */

class DoctorVisitsApiClient {
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

            return axios.get(`${this.baseUrl}/api/v1/doctor/visits`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visits error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }


    async getVisitById(id: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/visits/${id}`, {
                ...config,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit by ID error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

}

export const createDoctorVisitsApiClient = (config: ApiConfig) =>
    new DoctorVisitsApiClient(config);
