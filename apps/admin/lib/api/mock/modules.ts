export interface Module {
  id: string
  name: string
  description: string
}

const MOCK_MODULES: Module[] = [
  {
    id: "ipd",
    name: "IPD",
    description: "In-Patient Department - Manage patient admissions and ward operations",
  },
  {
    id: "opd",
    name: "OPD",
    description: "Out-Patient Department - Handle outpatient consultations and appointments",
  },
  {
    id: "ot",
    name: "OT",
    description: "Operation Theater - Schedule and manage surgical procedures",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Pharmacy Management - Track inventory and dispense medications",
  },
  {
    id: "lab",
    name: "Lab",
    description: "Laboratory - Manage test orders and results",
  },
  {
    id: "billing",
    name: "Billing",
    description: "Billing & Invoicing - Generate bills and manage payments",
  },
]

const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function getModules(): Promise<Module[]> {
  await mockDelay()
  return MOCK_MODULES
}

export interface UpdateModulesPayload {
  selectedIds: string[]
}

export async function updateTenantModules(
  tenantId: string,
  payload: UpdateModulesPayload
): Promise<void> {
  await mockDelay(800)
  
  // Simulate occasional errors for testing (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to update modules. Please try again.")
  }
  
  console.log(`[Mock API] Updated modules for tenant ${tenantId}:`, payload)
}
