import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface NurseNote {
  id: string;
  patient_id: string;
  visit_id: string;
  note: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface CreateNurseNotePayload {
  patient_id: string;
  visit_id: string;
  note: string;
}

export interface UpdateNurseNotePayload {
  note: string;
}

/* ---------------- CLIENT: NURSE NOTES ---------------- */

class NurseNotesApiClient {
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
     GET: Nurse Notes by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/patients/${patientId}/nurse-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get nurse notes (patient) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: Nurse Notes by Nurse ID
  --------------------------------------------------- */
  async getByNurse(
    nurseId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/nurses/${nurseId}/nurse-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get nurse notes (nurse) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: Nurse Notes by Visit ID
  --------------------------------------------------- */
  async getByVisit(
    visitId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/visits/${visitId}/nurse-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get nurse notes (visit) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: Nurse Note by Visit ID (Authenticated Doctor)
  --------------------------------------------------- */
  async getByVisitForDoctor(
    visitId: string
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/doctor/nurse-notes`,
        {
          ...config,
          params: { visitId },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get nurse note for doctor error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: Single Nurse Note by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/nurse-notes/${id}`,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get nurse note by ID error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     POST: Create Nurse Note
  --------------------------------------------------- */
  async create(
    payload: CreateNurseNotePayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.post(
        `${this.baseUrl}/api/v1/nurse-notes`,
        payload,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create nurse note error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     PUT: Update Nurse Note
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateNurseNotePayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.put(
        `${this.baseUrl}/api/v1/nurse-notes/${id}`,
        payload,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update nurse note error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     DELETE: Delete Nurse Note
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.delete(
        `${this.baseUrl}/api/v1/nurse-notes/${id}`,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete nurse note error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }
}

/* ---------------------------------------------------
   FACTORY EXPORT
--------------------------------------------------- */
export const createNurseNotesApiClient = (config: ApiConfig) =>
  new NurseNotesApiClient(config);
