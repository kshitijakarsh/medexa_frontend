// // import axios, { AxiosResponse } from "axios";
// // import { getIdToken } from "@/app/utils/auth";

// // interface ApiConfig {
// //     baseUrl?: string;
// //     authToken: string;
// // }

// // export interface Floor {
// //     id: string;
// //     floor_name: string;
// //     status: "active" | "inactive";
// //     created_at: string;
// //     updated_at: string;
// //     tenant_id: string;
// // }

// // export interface FloorListResponse {
// //     data: Floor[];
// //     pagination?: {
// //         page: number;
// //         limit: number;
// //         totalPages: number;
// //         totalData: number;
// //     };
// //     success: boolean;
// // }

// // export interface FloorCreateParams {
// //     floor_name: string;
// //     status: "active" | "inactive";
// // }

// // export interface FloorUpdateParams {
// //     floor_name?: string;
// //     status?: "active" | "inactive";
// // }

// // class FloorApiClient {
// //     private baseUrl: string;
// //     private authToken: string;

// //     constructor(config: ApiConfig) {
// //         this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
// //         this.authToken = config.authToken;
// //     }

// //     private async getJsonConfig() {
// //         const token = await getIdToken();
// //         return {
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 Authorization: token ? `Bearer ${token}` : "",
// //             },
// //         };
// //     }

// //     getFloors(params?: any): Promise<AxiosResponse<FloorListResponse>> {
// //         return axios.get(`${this.baseUrl}/api/v1/floors`, {
// //             ...(this.getJsonConfig() as any),
// //             params,
// //         });
// //     }

// //     getFloorById(id: string) {
// //         return axios.get(`${this.baseUrl}/api/v1/floors/${id}`, this.getJsonConfig());
// //     }

// //     createFloor(payload: FloorCreateParams) {
// //         return axios.post(`${this.baseUrl}/api/v1/floors`, payload, this.getJsonConfig());
// //     }

// //     updateFloor(id: string, payload: FloorUpdateParams) {
// //         return axios.put(`${this.baseUrl}/api/v1/floors/${id}`, payload, this.getJsonConfig());
// //     }

// //     deleteFloor(id: string) {
// //         return axios.delete(`${this.baseUrl}/api/v1/floors/${id}`, this.getJsonConfig());
// //     }
// // }

// // export const createFloorApiClient = (config: ApiConfig) =>
// //     new FloorApiClient(config);



// import { getIdToken } from "@/app/utils/auth";
// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// interface ApiConfig {
//     baseUrl?: string;
//     authToken: string;
// }

// /* ---------------- TYPES ---------------- */

// export interface Floor {
//     id: string;
//     floor_name: string;
//     status: "active" | "inactive";
//     created_at?: string;
//     updated_at?: string;
//     tenant_id?: string;
// }

// export interface FloorListResponse {
//     data: Floor[];
//     pagination?: {
//         page: number;
//         limit: number;
//         totalPages: number;
//         totalData: number;
//     };
//     success: boolean;
// }

// export interface FloorDetailResponse {
//     data: Floor;
//     success: boolean;
// }

// export interface CreateFloorParams {
//     floor_name: string;
//     status: "active" | "inactive";
// }

// export interface UpdateFloorParams {
//     floor_name?: string;
//     status?: "active" | "inactive";
// }

// /* ---------------- CLIENT ---------------- */

// class FloorApiClient {
//     private baseUrl: string;

//     constructor(config: ApiConfig) {
//         this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
//     }

//     private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
//         const token = await getIdToken();
//         return {
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//         };
//     }

//     /* --------- GET ALL --------- */
//     async getFloors(params?: {
//         page?: number;
//         limit?: number;
//         status?: string;
//         search?: string;
//         tenant_id?: string;
//     }): Promise<AxiosResponse<FloorListResponse>> {
//         const config = await this.getJsonRequestConfig();
//         return axios.get(`${this.baseUrl}/api/v1/floors`, {
//             ...config,
//             params,
//         });
//     }

//     /* --------- GET ONE --------- */
//     async getFloorById(id: string): Promise<AxiosResponse<FloorDetailResponse>> {
//         const config = await this.getJsonRequestConfig();
//         return axios.get(`${this.baseUrl}/api/v1/floors/${id}`, config);
//     }

//     /* --------- CREATE --------- */
//     async createFloor(
//         payload: CreateFloorParams
//     ): Promise<AxiosResponse<any>> {
//         const config = await this.getJsonRequestConfig();
//         return axios.post(`${this.baseUrl}/api/v1/floors`, payload, config);
//     }

//     /* --------- UPDATE --------- */
//     async updateFloor(
//         id: string,
//         payload: UpdateFloorParams
//     ): Promise<AxiosResponse<any>> {
//         const config = await this.getJsonRequestConfig();
//         return axios.put(`${this.baseUrl}/api/v1/floors/${id}`, payload, config);
//     }

//     /* --------- DELETE --------- */
//     async deleteFloor(id: string): Promise<AxiosResponse<any>> {
//         const config = await this.getJsonRequestConfig();
//         return axios.delete(`${this.baseUrl}/api/v1/floors/${id}`, config);
//     }
// }

// export const createFloorApiClient = (config: ApiConfig) =>
//     new FloorApiClient(config);



import { getIdToken } from "@/app/utils/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiConfig {
    baseUrl?: string;
    authToken?: string;
}

/* ---------------- TYPES ---------------- */

export interface Floor {
    id: string;
    floor_name: string;
    status: "active" | "inactive";
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
    tenant_id?: string;
}

export interface FloorListResponse {
    data: Floor[];
    pagination?: {
        page: number;
        limit: number;
        totalPages: number;
        totalData: number;
    };
    success: boolean;
}

export interface FloorDetailResponse {
    data: Floor;
    success: boolean;
}

export interface CreateFloorParams {
    floor_name: string;
    status: "active" | "inactive";
}

export interface UpdateFloorParams {
    floor_name?: string;
    status?: "active" | "inactive";
}

/* ---------------- CLIENT ---------------- */

class FloorApiClient {
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

    /* --------- LIST: GET ALL FLOORS --------- */
    async getFloors(params?: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        tenant_id?: string;
    }): Promise<AxiosResponse<FloorListResponse>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.get(`${this.baseUrl}/api/v1/floors`, {
                ...config,
                params,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get floors error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- GET ONE FLOOR --------- */
    async getFloorById(id: string): Promise<AxiosResponse<FloorDetailResponse>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.get(`${this.baseUrl}/api/v1/floors/${id}`, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Get floor error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- CREATE FLOOR --------- */
    async createFloor(payload: CreateFloorParams): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.post(`${this.baseUrl}/api/v1/floors`, payload, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Create floor error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- UPDATE FLOOR --------- */
    async updateFloor(id: string, payload: UpdateFloorParams): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.put(`${this.baseUrl}/api/v1/floors/${id}`, payload, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Update floor error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }

    /* --------- DELETE FLOOR --------- */
    async deleteFloor(id: string): Promise<AxiosResponse<any>> {
        try {
            const config = await this.getJsonRequestConfig();
            return axios.delete(`${this.baseUrl}/api/v1/floors/${id}`, config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Delete floor error: ${error.response?.data?.message || error.message}`
                );
            }
            throw error;
        }
    }
}

/* --------- EXPORT FACTORY --------- */

export const createFloorApiClient = (config: ApiConfig) =>
    new FloorApiClient(config);
