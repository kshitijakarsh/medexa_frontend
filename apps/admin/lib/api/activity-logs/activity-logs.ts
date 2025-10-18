// lib/api/auditLogsApi.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export interface AuditLog {
  id: string
  actor_id: string | null
  actor_type: string
  tenant_id: string
  action: string
  resource_type: string
  resource_id: string
  before_detail: Record<string, any> | null
  after_detail: Record<string, any> | null
  status: "success" | "failed"
  created_at: string
  updated_at: string
  tenant: {
    id: string
    name_en: string
  }
}

export interface ApiConfig {
  baseUrl?: string
  authToken: string
}

export interface AuditLogsListResponse {
  data: AuditLog[]
  success: boolean
  total?: number
}

export class AuditLogsApiClient {
  private baseUrl: string
  private authToken: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl ?? process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
    this.authToken = config.authToken
  }

  private getJsonRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    }
  }

  async getAuditLogs(): Promise<AxiosResponse<AuditLogsListResponse>> {
    return axios.get<AuditLogsListResponse>(
      `${this.baseUrl}/api/v1/audit-logs`,
      this.getJsonRequestConfig()
    )
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createAuditLogsApiClient = (config: ApiConfig) =>
  new AuditLogsApiClient(config)
