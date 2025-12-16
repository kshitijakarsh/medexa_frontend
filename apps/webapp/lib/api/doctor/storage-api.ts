import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getIdToken } from "@/app/utils/auth";

interface ApiConfig {
  baseUrl?: string;
}

export interface PresignedUrlPayload {
  fileName: string;
  path: string; // e.g. "patients"
  contentType: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  bucket: string;
  subbucketPath: string;
  expiresIn: number;
  contentType: string;
}

class StorageApiClient {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl =
      config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
  }

  private async getConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
  }

  async generatePresignedUrl(
    payload: PresignedUrlPayload
  ): Promise<AxiosResponse<{ data: PresignedUrlResponse }>> {
    const config = await this.getConfig();
    return axios.post(
      `${this.baseUrl}/api/v1/storage`,
      payload,
      config
    );
  }
}

export const createStorageApiClient = (config: ApiConfig) =>
  new StorageApiClient(config);
