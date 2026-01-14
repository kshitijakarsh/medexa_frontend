import axios from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
    authToken?: string;
    baseUrl?: string;
}

export interface SurgeryPerson {
    id: number | string;
    name: string;
    email?: string;
}

export interface SurgeryTeamMember {
    id: string;
    name: string;
    role: string;
    specialization?: string;
}

export interface SurgeryTeam {
    id: string | number;
    name: string;
    description?: string;
    speciality?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
    createdBy?: {
        id: number | string;
        name: string;
    };
    lead_surgeon?: SurgeryPerson;
    assistant_surgeon?: SurgeryPerson;
    anaesthetist?: SurgeryPerson;
    scrub_nurse?: SurgeryPerson;
    circulating_nurse?: SurgeryPerson;
    ot_technician?: SurgeryPerson;
    members?: SurgeryTeamMember[];
}

export interface SurgeryTeamListResponse {
    success: boolean;
    data: SurgeryTeam[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface SurgeryTeamResponse {
    success: boolean;
    data: SurgeryTeam;
}

export interface CreateSurgeryTeamParams {
    name: string;
    speciality: string;
    status?: "active" | "inactive";
    lead_surgeon_id: string;
    assistant_surgeon_id: string;
    anaesthetist_id: string;
    scrub_nurse_id: string;
    circulating_nurse_id: string;
    // ot_technician_id: string;
}

export interface UpdateSurgeryTeamParams {
    name?: string;
    speciality?: string;
    status?: "active" | "inactive";
    lead_surgeon_id?: string;
    assistant_surgeon_id?: string;
    anaesthetist_id?: string;
    scrub_nurse_id?: string;
    circulating_nurse_id?: string;
    ot_technician_id?: string;
}

class SurgeryTeamApiClient {
    private baseUrl: string;
    private authToken?: string;

    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URL_SET_2 ?? "";
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
       GET: All Surgery Teams
    --------------------------------------------------- */
    async getAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }) {
        const config = await this.getConfig();
        return axios.get<SurgeryTeamListResponse>(`${this.baseUrl}/api/v1/surgery-teams`, {
            ...config,
            params,
        });
    }

    /* ---------------------------------------------------
       POST: Create Surgery Team
    --------------------------------------------------- */
    async create(payload: CreateSurgeryTeamParams) {
        return axios.post(
            `${this.baseUrl}/api/v1/surgery-teams`,
            payload,
            await this.getConfig()
        );
    }

    /* ---------------------------------------------------
       GET: Surgery Team by ID
    --------------------------------------------------- */
    async getById(id: string) {
        const config = await this.getConfig();
        return axios.get<SurgeryTeamResponse>(
            `${this.baseUrl}/api/v1/surgery-teams/${id}`,
            config
        );
    }

    /* ---------------------------------------------------
       PUT: Update Surgery Team
    --------------------------------------------------- */
    async update(id: string, payload: UpdateSurgeryTeamParams) {
        return axios.put(
            `${this.baseUrl}/api/v1/surgery-teams/${id}`,
            payload,
            await this.getConfig()
        );
    }

    /* ---------------------------------------------------
       DELETE: Delete Surgery Team
    --------------------------------------------------- */
    async delete(id: string) {
        return axios.delete(
            `${this.baseUrl}/api/v1/surgery-teams/${id}`,
            await this.getConfig()
        );
    }
}

export const createSurgeryTeamApiClient = (config: ApiConfig) =>
    new SurgeryTeamApiClient(config);

