import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface EquipmentUsageLog {
    id: string;
    equipment_name: string;
    asset_id: string;
    patient_id?: string;
    patient?: {
        id: string;
        first_name: string;
        last_name: string;
        mrn?: string;
    };
    logged_by_id?: string;
    logged_by?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    start_time: string;
    end_time?: string;
    duration?: string;
    status: "Running" | "Completed";
    notes?: string;
}

export interface ConsumptionLog {
    id: string;
    date: string;
    item_name: string;
    quantity: number;
    usage_type: "Patient" | "Ward";
    patient_id?: string;
    patient?: {
        id: string;
        first_name: string;
        last_name: string;
        mrn?: string;
    };
    logged_by_id?: string;
    logged_by?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    note?: string;
}

export interface WardType {
    id: string;
    name: string;
    description?: string;
}

export interface WardTypeListResponse {
    success: boolean;
    data: WardType[];
}

export interface EquipmentUsageLogListResponse {
    success: boolean;
    data: EquipmentUsageLog[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface ConsumptionLogListResponse {
    success: boolean;
    data: ConsumptionLog[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

class WardApiClient {
    private baseUrl: string;
    private authToken?: string;

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

    /* ---------------------------------------------------
       GET: All Equipment Usage Logs
    --------------------------------------------------- */
    async getEquipmentUsageLogs(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }) {
        const config = await this.getConfig();
        return axios.get(`${this.baseUrl}/api/v1/equipment-usage-logs`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       GET: All Consumption Logs
    --------------------------------------------------- */
    async getConsumptionLogs(params?: {
        page?: number;
        limit?: number;
        search?: string;
        usage_type?: string;
    }) {
        const config = await this.getConfig();
        return axios.get(`${this.baseUrl}/api/v1/consumption-logs`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       GET: All Ward Types
    --------------------------------------------------- */
    async getWardTypes() {
        const config = await this.getConfig();
        return axios.get(`${this.baseUrl}/api/v1/ward-types`, {
            ...config,
        });
    }
}

export const createWardApiClient = (config: ApiConfig) =>
    new WardApiClient(config);
