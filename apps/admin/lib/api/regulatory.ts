import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface Authority {
  id: number
  name_en: string
  name_local: string
  short_code: string
  country_id: number
  created_at: string
  updated_at: string
}

interface AuthoritiesListResponse {
  data: Authority[]
  success: boolean
}

interface CreateDocumentParams {
  doc_type: string
  authority_id: number
  doc_number: string
  issue_date: string
  expiry_date: string
  file_url: string
  notes?: string
}

interface UpdateDocumentParams {
  doc_type: string
  authority_id: number
  doc_number: string
  issue_date: string
  expiry_date: string
  file_url: string
  verified_by?: number
  status?: string
  notes?: string
}

interface Document {
  id: string
  tenant_id: string
  doc_type: string
  authority_id: number
  doc_number: string
  issue_date: string
  expiry_date: string
  file_url: string
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

interface DocumentResponse {
  data: Document
  success: boolean
}

class RegulatoryApiClient {
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
        // Authorization: `Bearer ${this.authToken}`,
      },
    }
  }

  async getAuthoritesList(): Promise<AxiosResponse<AuthoritiesListResponse>> {
    try {
      return await axios.get<AuthoritiesListResponse>(
        `${this.baseUrl}/api/v1/regulatory_authorities`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get authorities error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createDocument(
    tenantId: string,
    params: CreateDocumentParams
  ): Promise<AxiosResponse<DocumentResponse>> {
    try {
      return await axios.post<DocumentResponse>(
        `${this.baseUrl}/api/v1/tenant/${tenantId}/document`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create document error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updateDocument(
    documentId: string,
    params: UpdateDocumentParams
  ): Promise<AxiosResponse<DocumentResponse>> {
    try {
      return await axios.put<DocumentResponse>(
        `${this.baseUrl}/api/v1/tenant/document/${documentId}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update document error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async deleteDocument(documentId: string): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete<void>(
        `${this.baseUrl}/api/v1/tenant/document/${documentId}`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Delete document error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createRegulatoryApiClient = (config: ApiConfig) =>
  new RegulatoryApiClient(config)

export type {
  Authority,
  AuthoritiesListResponse,
  Document,
  CreateDocumentParams,
  UpdateDocumentParams,
  DocumentResponse,
}
