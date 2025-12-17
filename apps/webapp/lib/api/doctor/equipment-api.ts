import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface Equipment {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;

  item_name: string;
  asset_tag: string;
  asset_id?: string;
  condition_before_use?: string;
  start_time?: string;
  end_time?: string;
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

export type CreateEquipmentPayload = {
  patient_id: string;
  visit_id: string;
  item_name: string;
  asset_tag: string;
  asset_id?: string;
  condition_before_use?: string;
  start_time?: string;
  end_time?: string;
  cost?: string;
  status: string;
  notes?: string;
};

export type UpdateEquipmentPayload = Partial<
  Omit<CreateEquipmentPayload, "patient_id" | "visit_id">
>;

/* ---------------- CLIENT: EQUIPMENT ---------------- */

class EquipmentApiClient {
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
     GET: Equipment by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(`${this.baseUrl}/api/v1/patients/${patientId}/equipment`, {
      ...config,
      params,
    });
  }

  /* ---------------------------------------------------
     GET: Equipment by Visit ID (Doctor view)
  --------------------------------------------------- */
  async getByVisitForDoctor(visitId: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse/equipment`, {
      ...config,
      params: { visit_id: visitId },
    });
  }

  /* ---------------------------------------------------
     GET: Single Equipment by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/equipment/${id}`, config);
  }

  /* ---------------------------------------------------
     POST: Create new equipment
  --------------------------------------------------- */
  async create(payload: CreateEquipmentPayload): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.post(`${this.baseUrl}/api/v1/equipment`, payload, config);
  }

  /* ---------------------------------------------------
     PUT: Update existing equipment
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateEquipmentPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.put(`${this.baseUrl}/api/v1/equipment/${id}`, payload, config);
  }

  /* ---------------------------------------------------
     DELETE: Remove equipment
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.delete(`${this.baseUrl}/api/v1/equipment/${id}`, config);
  }

  /* ---------------------------------------------------
     GET: Equipment by Visit ID (History details)
  --------------------------------------------------- */
  async getEquipmentsByVisitId(visitId: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/nurse/equipment`, {
      ...config,
      params: { visit_id: visitId },
    });
  }
}

/* ---------------- FACTORY FUNCTION ---------------- */

export function createEquipmentApiClient(config: ApiConfig) {
  return new EquipmentApiClient(config);
}
