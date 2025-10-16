// API client helpers for hospital onboarding steps

const mockDelay = (ms: number = 300) =>
  new Promise((res) => setTimeout(res, ms))

export interface CreateHospitalPayload {
  hospitalName: string
  mophLicenseNumber?: string
  tradeLicense?: string
  taxRegistrationNumber?: string
  contactEmail?: string
  contactPhone?: string
  emergencyContactNumber?: string
  city?: string
  fullAddress?: string
  adminFullName?: string
  adminDesignation?: string
  adminEmail?: string
  adminPhone?: string
  userFullName?: string
  userPassword: string
}

export interface UpdateModulesPayload {
  modules: string[]
}

export interface SavePaymentPayload {
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

export interface SaveLicensePayload {
  plan_key: string
  seats?: number
  storage_quota_mb?: number
  start_date: string // ISO date string
  end_date?: string
  auto_renew?: boolean
  status?: string
}

/**
 * Step 1: Create a new hospital
 */
export async function createHospital(
  payload: CreateHospitalPayload,
  logoFile?: File | null
): Promise<{ id: string }> {
  const formData = new FormData()

  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      formData.append(k, String(v))
    }
  })

  if (logoFile) {
    formData.append("logo", logoFile)
  }

  try {
    const res = await fetch("/api/hospitals", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error("non-OK response")
    }

    return res.json()
  } catch (err) {
    console.warn("[mocks] createHospital fallback in use", err)
    await mockDelay()
    return { id: `mock-hospital-${Math.random().toString(36).slice(2, 8)}` }
  }
}

/**
 * Step 2: Update hospital modules
 */
export async function updateHospitalModules(
  hospitalId: string,
  payload: UpdateModulesPayload
): Promise<void> {
  try {
    const res = await fetch(`/api/hospitals/${hospitalId}/modules`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error("non-OK response")
    }
  } catch (err) {
    console.warn("[mocks] updateHospitalModules fallback in use", err)
    await mockDelay()
  }
}

/**
 * Step 3: Save hospital payment details
 */
export async function saveHospitalPayment(
  hospitalId: string,
  payload: SavePaymentPayload
): Promise<void> {
  try {
    const res = await fetch(`/api/hospitals/${hospitalId}/payment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error("non-OK response")
    }
  } catch (err) {
    console.warn("[mocks] saveHospitalPayment fallback in use", err)
    await mockDelay()
  }
}

/**
 * Step 4: Save hospital license history
 */
export async function saveHospitalLicense(
  hospitalId: string,
  payload: SaveLicensePayload
): Promise<void> {
  try {
    const res = await fetch(`/api/hospitals/${hospitalId}/license`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error("non-OK response")
    }
  } catch (err) {
    console.warn("[mocks] saveHospitalLicense fallback in use", err)
    await mockDelay()
  }
}

/**
 * Step 5: Upload regulatory document
 */
export async function uploadRegulatoryDoc(
  hospitalId: string,
  formData: FormData
): Promise<void> {
  try {
    const res = await fetch(`/api/hospitals/${hospitalId}/regulatory-docs`, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error("non-OK response")
    }
  } catch (err) {
    console.warn("[mocks] uploadRegulatoryDoc fallback in use", err)
    await mockDelay()
  }
}
