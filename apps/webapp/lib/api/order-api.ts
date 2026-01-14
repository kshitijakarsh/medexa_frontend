import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { getIdToken } from "@/app/utils/auth"

interface ApiConfig {
  baseUrl?: string
  authToken?: string
}

export interface OrderItem {
  id?: number
  order_id?: number
  medicine_id: number
  batch_id?: number | null
  quantity: number
  price_at_sale: number
  subtotal?: number
  created_at?: string
  updated_at?: string
  medicine?: {
    id: number
    medicine: string
    type: string
    content?: string
  }
  batch?: {
    id: number
    batch_number: string
    expiry_date: string
  }
}

export interface Order {
  id: number
  tenant_id: number
  patient_id?: number | null
  prescription_id?: number | null
  total_amount: number
  order_date: string
  status: string
  payment_status?: string | null
  payment_method?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
  created_by?: number | null
  updated_by?: number | null
  is_deleted: boolean
  orderItems?: OrderItem[]
  patient?: {
    id: number
    first_name: string
    last_name: string
    phone?: string
  }
}

export interface OrderListResponse {
  success: boolean
  data: Order[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface OrderResponse {
  success: boolean
  data: Order
}

export interface CreateOrderItemPayload {
  medicine_id: number
  batch_id?: number | null
  quantity: number
  price_at_sale: number
}

export interface CreateOrderPayload {
  patient_id?: number | null
  prescription_id?: number | null
  status?: string
  payment_status?: string | null
  payment_method?: string | null
  notes?: string | null
  order_items: CreateOrderItemPayload[]
}

export interface UpdateOrderPayload {
  patient_id?: number | null
  prescription_id?: number | null
  status?: string
  payment_status?: string | null
  payment_method?: string | null
  notes?: string | null
  order_items?: CreateOrderItemPayload[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URI || "http://localhost:3000"

class OrderApiClient {
  private baseUrl: string

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl || API_BASE_URL
  }

  private async getJsonRequestConfig(): Promise<AxiosRequestConfig> {
    console.log("[OrderApiClient.getJsonRequestConfig] Getting token...")
    const token = await getIdToken()
    console.log("[OrderApiClient.getJsonRequestConfig] Token obtained:", token ? "Yes" : "No")

    return {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  }

  /**
   * GET /api/v1/orders - Get all orders with pagination and filters
   */
  async getAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
    payment_status?: string
    patient_id?: number
    from_date?: string
    to_date?: string
  }): Promise<AxiosResponse<OrderListResponse>> {
    console.log("[OrderApiClient.getAll] Called with params:", params)
    const config = await this.getJsonRequestConfig()
    
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.search) queryParams.append("search", params.search)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.payment_status) queryParams.append("payment_status", params.payment_status)
    if (params?.patient_id) queryParams.append("patient_id", params.patient_id.toString())
    if (params?.from_date) queryParams.append("from_date", params.from_date)
    if (params?.to_date) queryParams.append("to_date", params.to_date)

    const url = `${this.baseUrl}/api/v1/orders${queryParams.toString() ? `?${queryParams}` : ""}`
    console.log("[OrderApiClient.getAll] Fetching:", url)

    const response = await axios.get<OrderListResponse>(url, config)
    console.log("[OrderApiClient.getAll] Response:", response.data)
    return response
  }

  /**
   * GET /api/v1/orders/{id} - Get a specific order by ID
   */
  async getById(id: number | string): Promise<AxiosResponse<OrderResponse>> {
    console.log("[OrderApiClient.getById] Called with id:", id)
    const config = await this.getJsonRequestConfig()
    const url = `${this.baseUrl}/api/v1/orders/${id}`
    console.log("[OrderApiClient.getById] Fetching:", url)

    const response = await axios.get<OrderResponse>(url, config)
    console.log("[OrderApiClient.getById] Response:", response.data)
    return response
  }

  /**
   * POST /api/v1/orders - Create a new order
   */
  async create(payload: CreateOrderPayload): Promise<AxiosResponse<OrderResponse>> {
    console.log("[OrderApiClient.create] Called with payload:", payload)
    const config = await this.getJsonRequestConfig()
    const url = `${this.baseUrl}/api/v1/orders`
    console.log("[OrderApiClient.create] Posting to:", url)

    const response = await axios.post<OrderResponse>(url, payload, config)
    console.log("[OrderApiClient.create] Response:", response.data)
    return response
  }

  /**
   * PUT /api/v1/orders/{id} - Update an existing order
   */
  async update(id: number | string, payload: UpdateOrderPayload): Promise<AxiosResponse<OrderResponse>> {
    console.log("[OrderApiClient.update] Called with id:", id, "payload:", payload)
    const config = await this.getJsonRequestConfig()
    const url = `${this.baseUrl}/api/v1/orders/${id}`
    console.log("[OrderApiClient.update] Putting to:", url)

    const response = await axios.put<OrderResponse>(url, payload, config)
    console.log("[OrderApiClient.update] Response:", response.data)
    return response
  }

  /**
   * DELETE /api/v1/orders/{id} - Delete an order (soft delete)
   */
  async delete(id: number | string): Promise<AxiosResponse<{ success: boolean; message: string }>> {
    console.log("[OrderApiClient.delete] Called with id:", id)
    const config = await this.getJsonRequestConfig()
    const url = `${this.baseUrl}/api/v1/orders/${id}`
    console.log("[OrderApiClient.delete] Deleting:", url)

    const response = await axios.delete<{ success: boolean; message: string }>(url, config)
    console.log("[OrderApiClient.delete] Response:", response.data)
    return response
  }
}

// Factory function to create API client instance
export function createOrderApiClient(config: ApiConfig = {}): OrderApiClient {
  return new OrderApiClient(config)
}

// Default export for convenience
export default createOrderApiClient
