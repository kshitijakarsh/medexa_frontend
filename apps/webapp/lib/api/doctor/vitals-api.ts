import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface Vitals {
  id: string;
  patient_id: string;
  visit_id: string;

  blood_pressure?: string;
  pulse_rate?: string;
  temperature?: string;
  respiratory_rate?: string;
  oxygen_saturation?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  head_circumference?: string;
  waist_circumference?: string;
  hip_circumference?: string;
  blood_glucose?: string;
  cholesterol?: string;
  pain_scale?: string;
  notes?: string;

  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

/* ----------- PAYLOADS ----------- */

export type CreateVitalsPayload = Omit<
  Vitals,
  | "id"
  | "created_at"
  | "updated_at"
  | "created_by"
  | "updated_by"
>;

export type UpdateVitalsPayload = Partial<CreateVitalsPayload>;

/* ---------------- CLIENT: VITALS ---------------- */

class VitalsApiClient {
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
     GET: Vitals by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/patients/${patientId}/vitals`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Vitals by Doctor ID
  --------------------------------------------------- */
  async getByDoctor(
    doctorId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/doctors/${doctorId}/vitals`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Vitals by Visit ID
  --------------------------------------------------- */
  async getByVisit(
    visitId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/visits/${visitId}/vitals`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Vitals by Visit (Authenticated Doctor)
  --------------------------------------------------- */
  async getByVisitForDoctor(
    visitId: string
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/doctor/vitals`,
      {
        ...config,
        params: { visitId },
      }
    );
  }

  /* ---------------------------------------------------
     GET: Single Vitals by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/vitals/${id}`,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     POST: Create Vitals
  --------------------------------------------------- */
  async create(
    payload: CreateVitalsPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.post(
      `${this.baseUrl}/api/v1/vitals`,
      payload,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     PUT: Update Vitals
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateVitalsPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.put(
      `${this.baseUrl}/api/v1/vitals/${id}`,
      payload,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     DELETE: Soft Delete Vitals
  --------------------------------------------------- */
  async delete(id: number): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.delete(
      `${this.baseUrl}/api/v1/vitals/${id}`,
      { ...config }
    );
  }
}

/* ---------------------------------------------------
   FACTORY EXPORT
--------------------------------------------------- */
export const createVitalsApiClient = (config: ApiConfig) =>
  new VitalsApiClient(config);
