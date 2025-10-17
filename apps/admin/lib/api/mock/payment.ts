export interface PaymentGateway {
  id: string
  name: string
}

export interface PaymentConfig {
  id: string
  gateway_id: string
  merchant_id?: string
  terminal_key?: string
  vault_path?: string
  bank_name?: string
  bank_account_no?: string
  vat_registered?: boolean
  vat_number?: string
  currency_code?: string
}

const MOCK_GATEWAYS: PaymentGateway[] = [
  { id: "stripe", name: "Stripe" },
  { id: "paypal", name: "PayPal" },
  { id: "square", name: "Square" },
  { id: "authorize-net", name: "Authorize.Net" },
  { id: "braintree", name: "Braintree" },
]

const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function getPaymentGateways(): Promise<PaymentGateway[]> {
  await mockDelay()
  return MOCK_GATEWAYS
}

export interface CreatePaymentConfigPayload {
  gateway_id: string
  merchant_id?: string
  terminal_key?: string
  vault_path?: string
  bank_name?: string
  bank_account_no?: string
  vat_registered?: boolean
  vat_number?: string
  currency_code?: string
}

export interface UpdatePaymentConfigPayload extends CreatePaymentConfigPayload {
  id: string
}

export async function createPaymentConfig(
  tenantId: string,
  payload: CreatePaymentConfigPayload
): Promise<PaymentConfig> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to create payment config. Please try again.")
  }

  const newConfig: PaymentConfig = {
    id: `payment-${Date.now()}`,
    ...payload,
  }

  console.log(`[Mock API] Created payment config for tenant ${tenantId}:`, newConfig)
  return newConfig
}

export async function updatePaymentConfig(
  configId: string,
  payload: UpdatePaymentConfigPayload
): Promise<PaymentConfig> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to update payment config. Please try again.")
  }

  const updatedConfig: PaymentConfig = {
    ...payload,
    id: configId,
  }

  console.log(`[Mock API] Updated payment config ${configId}:`, updatedConfig)
  return updatedConfig
}
