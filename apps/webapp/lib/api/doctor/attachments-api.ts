import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface Attachment {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;

  title: string;
  description?: string;
  s3_url: string;

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

export type CreateAttachmentPayload = {
  patient_id: string;
  visit_id: string;
  title: string;
  description?: string;
  s3_url: string;
};

export type UpdateAttachmentPayload = Partial<
  Omit<CreateAttachmentPayload, "patient_id" | "visit_id">
>;

/* ---------------- CLIENT: ATTACHMENTS ---------------- */

class AttachmentsApiClient {
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
     GET: Attachments by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/patients/${patientId}/attachments`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Attachments by Visit ID
  --------------------------------------------------- */
  async getByVisit(
    visitId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/visits/${visitId}/attachments`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Attachments by Uploader ID
  --------------------------------------------------- */
  async getByUploader(
    uploaderId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/uploaders/${uploaderId}/attachments`,
      { ...config, params }
    );
  }

  /* ---------------------------------------------------
     GET: Attachments by Visit (Authenticated Doctor)
  --------------------------------------------------- */
  async getByVisitForDoctor(
    visitId: string
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/doctor/attachments`,
      {
        ...config,
        params: { visitId },
      }
    );
  }

  /* ---------------------------------------------------
     GET: Single Attachment by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.get(
      `${this.baseUrl}/api/v1/attachments/${id}`,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     POST: Create Attachment
  --------------------------------------------------- */
  async create(
    payload: CreateAttachmentPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.post(
      `${this.baseUrl}/api/v1/attachments`,
      payload,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     PUT: Update Attachment
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateAttachmentPayload
  ): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.put(
      `${this.baseUrl}/api/v1/attachments/${id}`,
      payload,
      { ...config }
    );
  }

  /* ---------------------------------------------------
     DELETE: Soft Delete Attachment
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const config = await this.getJsonRequestConfig();

    return axios.delete(
      `${this.baseUrl}/api/v1/attachments/${id}`,
      { ...config }
    );
  }
}

/* ---------------------------------------------------
   FACTORY EXPORT
--------------------------------------------------- */

export const createAttachmentsApiClient = (config: ApiConfig) =>
  new AttachmentsApiClient(config);
