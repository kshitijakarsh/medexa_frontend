import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    baseUrl?: string;
}

/* ------------------------------------------
   Response / Payload Types
------------------------------------------- */

export interface SlotBreak {
    start: string;
    end: string;
}

export interface SlotDetails {
    duration: number;
    breaks: SlotBreak[];
}

export interface CreatedBy {
    id: string;
    name: string;
}

export interface SlotItem {
    id: string;
    tenant_id: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    shift: string;
    slots: SlotDetails;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    createdBy: CreatedBy;
    updatedBy: CreatedBy;
}

export interface SlotListResponse {
    success: boolean;
    data: SlotItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

/* Create slot payload */
export interface SlotTimeRange {
    startTime: string;
    endTime: string;
}

export interface CreateSlotPayload {
    doctorId: string;
    startDate: string;
    endDate: string;
    slotVisitType: string;
    slots: SlotTimeRange[];
    applyFor: string[];
}

export interface CreateSlotResponse {
    success: boolean;
    message: string;
    data: {
        count: number;
        message: string;
    };
}

/* Query parameters for list */
export interface SlotListParams {
    page?: number;
    limit?: number;
    doctorId?: string;
    date?: string;
    shift?: string;
    year?: string;
    month?: string;
    departmentId?: string;
    department?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/* ------------------------------------------
   API Client
------------------------------------------- */

class SlotApiClient {
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

    /* ------------------------------------------
       GET Slots
    ------------------------------------------- */
    async getSlots(
        params?: SlotListParams
    ): Promise<AxiosResponse<SlotListResponse>> {
        try {
            const config = await this.getConfig();
            return axios.get<SlotListResponse>(`${this.baseUrl}/api/v1/slots`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get slots error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* ------------------------------------------
       CREATE Slots
    ------------------------------------------- */
    async createSlots(
        payload: CreateSlotPayload
    ): Promise<AxiosResponse<CreateSlotResponse>> {
        try {
            const config = await this.getConfig();
            return axios.post<CreateSlotResponse>(
                `${this.baseUrl}/api/v1/slots`,
                payload,
                config
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create slots error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

/* Instance Creator */
export const createSlotApiClient = (
    config: ApiConfig = { baseUrl: undefined }
) => new SlotApiClient(config);
