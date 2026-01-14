import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

export interface DashboardKPIs {
  totalStockValue: {
    value: string
    rawValue: number
    growthPercentage: number
    trend: "up" | "down"
  }
  itemsBelowMinLevel: {
    count: number
    status: "urgent" | "normal"
    message: string
  }
  pendingOPDs: {
    count: number
    message: string
  }
  expiringSoon: {
    count: number
    period: string
  }
}

export interface TopSellingDrug {
  medicine_id: string
  medicine_name: string
  quantity_sold: number
  sales_amount: number
}

export interface MedicinesBySales {
  medicine_id: string
  medicine_name: string
  sales_amount: number
  percentage: number
}

export interface DashboardResponse {
  success: boolean
  data: {
    kpis: DashboardKPIs
    topSellingDrugs: TopSellingDrug[]
    medicinesBySales: MedicinesBySales[]
  }
}

export interface DashboardQueryParams {
  startDate?: string
  endDate?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000"

class DashboardApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl || API_BASE_URL
  }

  private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
    const token = await getIdToken()
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  }

  async getDashboard(params?: DashboardQueryParams): Promise<AxiosResponse<DashboardResponse>> {
    const config = await this.getJsonRequestConfig()
    return axios.get<DashboardResponse>(
      `${this.baseUrl}/api/v1/pharmacy/dashboard`,
      { ...config, params }
    )
  }
}

export const createDashboardApiClient = (config: ApiConfig) =>
  new DashboardApiClient(config)
