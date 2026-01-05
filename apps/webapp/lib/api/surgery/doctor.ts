import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface DoctorUser {
    id: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    role?: string;
    avatar_url?: string;
}

export interface DoctorUsersResponse {
    success: boolean;
    data: DoctorUser[];
}

class DoctorApiClient {
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
       GET: All Doctors (Soap Notes Creators)
    --------------------------------------------------- */
    async getAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<DoctorUsersResponse>(`${this.baseUrl}/api/v1/doctor/users/soap-notes-creators`, {
            ...config,
            params,
        });
    }
}

export const createDoctorApiClient = (config: ApiConfig) =>
    new DoctorApiClient(config);
