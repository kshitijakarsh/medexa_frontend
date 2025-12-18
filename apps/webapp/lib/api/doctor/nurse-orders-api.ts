import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface NurseOrder {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;
  order_type: string;
  urgency: string;
  status: string;
  details: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  createdBy?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

/* ----------- PAYLOADS ----------- */

export type CreateNurseOrderPayload = {
  patient_id: string;
  visit_id: string;
  order_type: string;
  urgency: string;
  status: string;
  details: Record<string, any>;
  notes?: string;
};

export type UpdateNurseOrderPayload = Partial<
  Omit<CreateNurseOrderPayload, "patient_id" | "visit_id">
>;

/* ---------------- CLIENT: NURSE ORDERS ---------------- */

class NurseOrdersApiClient {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl =
      config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
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
     GET: Nurse Orders by Visit ID
  --------------------------------------------------- */
  async getByVisit(visitId: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(
      `${this.baseUrl}/api/v1/visits/${visitId}/nurse-orders`,
      config
    );
  }

  /* ---------------------------------------------------
     GET: Nurse Orders by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(`${this.baseUrl}/api/v1/patients/${patientId}/nurse-orders`, {
      ...config,
      params,
    });
  }

  /* ---------------------------------------------------
     GET: Single Nurse Order by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse-orders/${id}`, config);
  }

  /* ---------------------------------------------------
     POST: Create new nurse order
  --------------------------------------------------- */
  async create(
    payload: CreateNurseOrderPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/nurse-orders`, payload, config);
  }

  /* ---------------------------------------------------
     PUT: Update existing nurse order
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateNurseOrderPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/nurse-orders/${id}`, payload, config);
  }

  /* ---------------------------------------------------
     DELETE: Remove nurse order
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/nurse-orders/${id}`, config);
  }
}

/* ---------------- FACTORY FUNCTION ---------------- */

export function createNurseOrdersApiClient(config: ApiConfig) {
  return new NurseOrdersApiClient(config);
}
