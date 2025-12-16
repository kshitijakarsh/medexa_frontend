import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

/* ---------------- CONFIG ---------------- */

interface ApiConfig {
  authToken?: string;
  baseUrl?: string;
}

/* ---------------- TYPES ---------------- */

export interface SoapData {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface CreateSoapNotePayload {
  patient_id: string;
  visit_id: string;
  soap_data: SoapData;
}

export interface UpdateSoapNotePayload {
  soap_data: SoapData;
}

/* ---------------- CLIENT: SOAP NOTES ---------------- */

class SoapNotesApiClient {
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
     GET: SOAP Notes by Patient ID
  --------------------------------------------------- */
  async getByPatient(
    patientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/patients/${patientId}/soap-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get SOAP notes (patient) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: SOAP Notes by Doctor ID
  --------------------------------------------------- */
  async getByDoctor(
    doctorId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/doctors/${doctorId}/soap-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get SOAP notes (doctor) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: SOAP Notes by Visit ID
  --------------------------------------------------- */
  async getByVisit(
    visitId: string,
    params?: { page?: number; limit?: number }
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/visits/${visitId}/soap-notes`,
        { ...config, params }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get SOAP notes (visit) error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: SOAP Note by Visit ID (Authenticated Doctor)
  --------------------------------------------------- */
  async getByVisitForDoctor(
    visitId: string
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/doctor/soap-notes`,
        {
          ...config,
          params: { visitId },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get SOAP note for doctor error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     GET: Single SOAP Note by ID
  --------------------------------------------------- */
  async getById(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.get(
        `${this.baseUrl}/api/v1/soap-notes/${id}`,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Get SOAP note by ID error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     POST: Create SOAP Note
  --------------------------------------------------- */
  async create(
    payload: CreateSoapNotePayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.post(
        `${this.baseUrl}/api/v1/soap-notes`,
        payload,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Create SOAP note error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     PUT: Update SOAP Note
  --------------------------------------------------- */
  async update(
    id: string,
    payload: UpdateSoapNotePayload
  ): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.put(
        `${this.baseUrl}/api/v1/soap-notes/${id}`,
        payload,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Update SOAP note error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /* ---------------------------------------------------
     DELETE: Soft Delete SOAP Note
  --------------------------------------------------- */
  async delete(id: string): Promise<AxiosResponse<any>> {
    try {
      const config = await this.getJsonRequestConfig();

      return axios.delete(
        `${this.baseUrl}/api/v1/soap-notes/${id}`,
        { ...config }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Delete SOAP note error: ${
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
export const createSoapNotesApiClient = (config: ApiConfig) =>
  new SoapNotesApiClient(config);
