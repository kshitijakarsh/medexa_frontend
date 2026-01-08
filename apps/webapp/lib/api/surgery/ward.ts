import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface EquipmentUsageLog {
    id: string;
    item_name: string;
    asset_id: string;
    condition_before_use?: string;
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
    date?: string;
    item_name: string;
    quantity: number;
    usage_type: "patient" | "ward";
    patient_id?: string;
    patient?: {
        id: string;
        first_name: string;
        last_name: string;
        mrn?: string;
    };
    logged_by?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    reason: string;
    notes: string;
}

export interface ConsumptionLogListResponse {
    success: boolean;
    data: ConsumptionLog[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ConsumptionLogDetailResponse {
    success: boolean;
    data: ConsumptionLog & {
        created_at: string;
        updated_at: string;
        created_by: string;
        updated_by: string;
        createdBy: {
            id: string;
            name: string;
        };
        updatedBy: {
            id: string;
            name: string;
        };
    };
}

export interface EquipmentUsageLogListResponse {
    success: boolean;
    data: EquipmentUsageLog[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface EquipmentUsageLogDetailResponse {
    success: boolean;
    data: EquipmentUsageLog & {
        created_at: string;
        updated_at: string;
        created_by: string;
        updated_by: string;
        createdBy?: {
            id: string;
            name: string;
        };
        updatedBy?: {
            id: string;
            name: string;
        };
    };
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

export interface CreateConsumptionLogParams {
    usage_type: "patient" | "ward";
    patient_id?: string;
    item_name: string;
    reason: string;
    quantity: number;
    notes?: string;
}

export interface CreateEquipmentUsageLogParams {
    item_name: string;
    asset_id: string;
    condition_before_use: string;
    start_time: string;
    end_time?: string;
    notes?: string;
    patient_id?: string;
}

export interface WardStock {
    id: string;
    item_name: string;
    category: "Consumables" | "Equipment";
    current_qty: number;
    min_qty: number;
    store: string;
    expiry: string;
    status: "Available" | "Low Stock" | "Out Of Stock";
}

export interface WardStockListResponse {
    success: boolean;
    data: WardStock[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface StockRequest {
    id: string;
    request_id: string;
    item_name: string;
    quantity: number;
    requested_date: string;
    requested_by_id?: string;
    requested_by?: {
        id: string;
        first_name: string;
        last_name: string;
    };
    status: "Issued" | "Pending" | "Approved" | "Rejected" | "Partially Approved";
    store_remarks?: string;
}

export interface StockRequestListResponse {
    success: boolean;
    data: StockRequest[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
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
        return axios.get<EquipmentUsageLogListResponse>(`${this.baseUrl}/api/v1/equipment-usage-logs`, {
            ...config,
            params,
        });
    }

    async getEquipmentUsageLog(id: string) {
        const config = await this.getConfig();
        return axios.get<EquipmentUsageLogDetailResponse>(`${this.baseUrl}/api/v1/equipment-usage-logs/${id}`, config);
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
        return axios.get<ConsumptionLogListResponse>(`${this.baseUrl}/api/v1/consumption-logs`, {
            ...config,
            params,
        });
    }

    async getConsumptionLog(id: string) {
        const config = await this.getConfig();
        return axios.get<ConsumptionLogDetailResponse>(`${this.baseUrl}/api/v1/consumption-logs/${id}`, config);
    }

    /* ---------------------------------------------------
       GET: Ward Stock
    --------------------------------------------------- */
    async getWardStock(params?: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<WardStockListResponse>(`${this.baseUrl}/api/v1/ward-stock`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       GET: All Stock Requests
    --------------------------------------------------- */
    async getStockRequests(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<StockRequestListResponse>(`${this.baseUrl}/api/v1/stock-requests`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       POST: Create Consumption Log
    --------------------------------------------------- */
    async createConsumptionLog(payload: CreateConsumptionLogParams) {
        const config = await this.getConfig();
        return axios.post(`${this.baseUrl}/api/v1/consumption-logs`, payload, config);
    }

    async updateConsumptionLog(id: string, payload: Partial<CreateConsumptionLogParams>) {
        const config = await this.getConfig();
        return axios.put(`${this.baseUrl}/api/v1/consumption-logs/${id}`, payload, config);
    }

    async deleteConsumptionLog(id: string) {
        const config = await this.getConfig();
        return axios.delete(`${this.baseUrl}/api/v1/consumption-logs/${id}`, config);
    }

    async createEquipmentUsageLog(payload: CreateEquipmentUsageLogParams) {
        const config = await this.getConfig();
        return axios.post(`${this.baseUrl}/api/v1/equipment-usage-logs`, payload, config);
    }

    async updateEquipmentUsageLog(id: string, payload: Partial<CreateEquipmentUsageLogParams>) {
        const config = await this.getConfig();
        return axios.put(`${this.baseUrl}/api/v1/equipment-usage-logs/${id}`, payload, config);
    }

    async deleteEquipmentUsageLog(id: string) {
        const config = await this.getConfig();
        return axios.delete(`${this.baseUrl}/api/v1/equipment-usage-logs/${id}`, config);
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
