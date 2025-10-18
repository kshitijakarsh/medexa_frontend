import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiConfig {
  baseUrl?: string
  authToken: string
}

interface PaymentGateway {
  id: string
  country_id: string
  name: string
  currency_code: string
  vat_rate: string
  settlement_days: number
  config_schema: Record<string, any>
  active: boolean
  created_at: string
  updated_at: string
}

interface PaymentGatewayResponse {
  data: PaymentGateway[]
  success: boolean
  pagination: PaginationMeta
}

interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalData: number
}

interface CreatePaymentConfigParams {
  gateway_id: number
  merchant_id: string
  terminal_key: string
  vault_path: string
  bank_name: string
  bank_account_no: string
  vat_registered: boolean
  vat_number: string
  currency_code: string
  active: boolean
}

interface UpdatePaymentConfigParams {
  merchant_id: string
  terminal_key: string
  vault_path: string
  bank_name: string
  bank_account_no: string
  vat_registered: boolean
  vat_number: string
  currency_code: string
  active: boolean
}

export interface PaymentConfig {
  id: string
  tenant_id: string
  gateway_id: number
  merchant_id: string
  terminal_key: string
  vault_path: string
  bank_name: string
  bank_account_no: string
  vat_registered: boolean
  vat_number: string
  currency_code: string
  active: boolean
  created_at: string
  updated_at: string
}

interface PaymentConfigResponse {
  data: PaymentConfig[]
  success: boolean
  pagination: PaginationMeta
}

class PaymentConfigApiClient {
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

  async getPaymentGateways(): Promise<AxiosResponse<PaymentGatewayResponse>> {
    try {
      return await axios.get<PaymentGatewayResponse>(
        `${this.baseUrl}/api/v1/billing/payment-gateways`,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Get payment gateways error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async createPaymentConfig(
    tenantId: string,
    params: CreatePaymentConfigParams
  ): Promise<AxiosResponse<PaymentConfigResponse>> {
    try {
      return await axios.post<PaymentConfigResponse>(
        `${this.baseUrl}/api/v1/tenants/${tenantId}/payment-config`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Create payment config error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  async updatePaymentConfig(
    configId: string,
    params: UpdatePaymentConfigParams
  ): Promise<AxiosResponse<PaymentConfig>> {
    try {
      return await axios.put<PaymentConfig>(
        `${this.baseUrl}/api/v1/tenants/payment-config/${configId}`,
        params,
        this.getJsonRequestConfig()
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Authentication failed. Please Log In again.")
        }
        throw new Error(
          `Update payment config error: ${error.response?.data?.message || error.message}`
        )
      }
      throw error
    }
  }

  updateAuthToken(newToken: string) {
    this.authToken = newToken
  }
}

export const createPaymentConfigApiClient = (config: ApiConfig) =>
  new PaymentConfigApiClient(config)

export type {
  PaymentGateway,
  CreatePaymentConfigParams,
  UpdatePaymentConfigParams,
  PaymentConfigResponse,
}
