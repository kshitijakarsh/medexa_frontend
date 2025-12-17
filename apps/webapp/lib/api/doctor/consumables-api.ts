import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface Consumable {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;

  item_name: string;
  quantity: number;
  cost?: string;
  status: string;
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

export type CreateConsumablePayload = {
  patient_id: string;
  visit_id: string;
  item_name: string;
  quantity: number;
  cost?: string;
  status?: string;
  notes?: string;
};

export type UpdateConsumablePayload = Partial<
  Omit<CreateConsumablePayload, "patient_id" | "visit_id">
>;

/* ---------------- CLIENT: CONSUMABLES ---------------- */

class ConsumablesApiClient {
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
     GET: Consumables by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(`${this.baseUrl}/api/v1/patients/${patientId}/consumables`, {
      ...config,
      params,
    });
  }

  /* ---------------------------------------------------
     GET: Consumables by Visit ID (Doctor view)
  --------------------------------------------------- */
  async getByVisitForDoctor(visitId: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse/consumables`, {
      ...config,
      params: { visit_id: visitId },
    });
  }

  /* ---------------------------------------------------
     GET: Single Consumable by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/consumables/${id}`, config);
  }

  /* ---------------------------------------------------
     POST: Create new consumable
  --------------------------------------------------- */
  async create(
    payload: CreateConsumablePayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/consumables`, payload, config);
  }

  /* ---------------------------------------------------
     PUT: Update existing consumable
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateConsumablePayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/consumables/${id}`, payload, config);
  }

  /* ---------------------------------------------------
     DELETE: Remove consumable
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/consumables/${id}`, config);
  }

  /* ---------------------------------------------------
     GET: Consumables by Visit ID (History details)
  --------------------------------------------------- */
  async getConsumablesByVisitId(
    visitId: string
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse/consumables`, {
      ...config,
      params: { visit_id: visitId },
    });
  }
}

/* ---------------- FACTORY FUNCTION ---------------- */

export function createConsumablesApiClient(config: ApiConfig) {
  return new ConsumablesApiClient(config);
}
