import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiConfig {
  baseUrl?: string;
  authToken: string;
}



export interface Country {
  id: number;
  iso_code?: string;
  name_en: string;
  name_local?: string;
  currency_code?: string;
  currency_symbol?: string;
  phone_code?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CountryListResponse {
  data: Country[];
}

export class CountryApiClient {
  private baseUrl: string;
  private authToken: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? "";
    this.authToken = config.authToken;
  }

  private getJsonRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
      },
    };
  }

  async getAll(): Promise<AxiosResponse<CountryListResponse>> {
    const config = this.getJsonRequestConfig();
    return axios.get(`${this.baseUrl}/api/v1/countries`, config);
  }
}

export const createCountryApiClient = (config: ApiConfig) =>
  new CountryApiClient(config);
