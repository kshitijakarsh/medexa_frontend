import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface VisitPurposeItem {
    id: string;
    tenant_id: string;
    patient_id: string;
    visit_id: string;
    chief_complaint: string;
    history_of_present_illness: string;
    onset: string;
    duration: string;
    severity: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    is_deleted: boolean;
    patient: {
        id: string;
        first_name: string;
        last_name: string;
        patient_number: string;
    };
    createdBy: {
        id: string;
        name: string;
        email?: string;
        role?: {
            name: string;
        };
    };
}

export interface VisitPurposeListResponse {
    success: boolean;
    message: string;
    data: VisitPurposeItem[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
}

/* ---------------- CLIENT: Visit Purpose ---------------- */

class VisitPurposeApiClient {
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


    /* ---------------------------------------------------
   GET: Visit Purpose for Doctor by Visit ID (NEW)
--------------------------------------------------- */
    async getByVisitForDoctor(visitId: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(
                `${this.baseUrl}/api/v1/doctor/visit-purposes`,
                {
                    ...config,
                    params: { visitId },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit purpose for doctor error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }


    /* ---------------------------------------------------
       GET: Visit Purposes by Patient
    --------------------------------------------------- */
    async getByPatient(
        patientId: string,
        params?: { page?: number; limit?: number }
    ): Promise<AxiosResponse<VisitPurposeListResponse>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get<VisitPurposeListResponse>(
                `${this.baseUrl}/api/v1/patients/${patientId}/visit-purposes`,
                { ...config, params }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit purposes (patient) error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       GET: Visit Purposes by Doctor
    --------------------------------------------------- */
    async getByDoctor(
        doctorId: string,
        params?: { page?: number; limit?: number }
    ): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(
                `${this.baseUrl}/api/v1/doctors/${doctorId}/visit-purposes`,
                { ...config, params }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit purposes (doctor) error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       GET: Visit Purposes by Visit ID
    --------------------------------------------------- */
    async getByVisit(
        visitId: string,
        params?: { page?: number; limit?: number }
    ): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(
                `${this.baseUrl}/api/v1/visits/${visitId}/visit-purposes`,
                { ...config, params }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit purposes (visit) error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       GET: Single Visit Purpose by ID
    --------------------------------------------------- */
    async getById(id: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.get(`${this.baseUrl}/api/v1/visit-purposes/${id}`, {
                ...config,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get visit purpose by ID error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       POST: Create Visit Purpose
    --------------------------------------------------- */
    async create(data: any): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.post(`${this.baseUrl}/api/v1/visit-purposes`, data, {
                ...config,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create visit purpose error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       PUT: Update Visit Purpose
    --------------------------------------------------- */
    async update(id: string, data: any): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.put(`${this.baseUrl}/api/v1/visit-purposes/${id}`, data, {
                ...config,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Update visit purpose error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ---------------------------------------------------
       DELETE: Soft Delete Visit Purpose
    --------------------------------------------------- */
    async delete(id: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();

            return axios.delete(`${this.baseUrl}/api/v1/visit-purposes/${id}`, {
                ...config,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Delete visit purpose error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

/* ---------------------------------------------------
   FACTORY EXPORT
--------------------------------------------------- */
export const createVisitPurposeApiClient = (config: ApiConfig) =>
    new VisitPurposeApiClient(config);
