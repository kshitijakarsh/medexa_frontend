export interface LicenceHistory {
  id: string
  plan_key: string
  seats?: number
  storage_quota_mb?: number
  start_date: string
  end_date?: string
  auto_renew?: boolean
  status?: string
}

const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export interface CreateLicenceHistoryPayload {
  plan_key: string
  seats?: number
  storage_quota_mb?: number
  start_date: string
  end_date?: string
  auto_renew?: boolean
  status?: string
}

export interface UpdateLicenceHistoryPayload
  extends CreateLicenceHistoryPayload {
  id: string
}

export async function createLicenceHistory(
  tenantId: string,
  payload: CreateLicenceHistoryPayload
): Promise<LicenceHistory> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to create licence history. Please try again.")
  }

  const newLicence: LicenceHistory = {
    id: `licence-${Date.now()}`,
    ...payload,
  }

  console.log(
    `[Mock API] Created licence history for tenant ${tenantId}:`,
    newLicence
  )
  return newLicence
}

export async function updateLicenceHistory(
  licenceId: string,
  payload: UpdateLicenceHistoryPayload
): Promise<LicenceHistory> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to update licence history. Please try again.")
  }

  const updatedLicence: LicenceHistory = {
    ...payload,
    id: licenceId,
  }

  console.log(
    `[Mock API] Updated licence history ${licenceId}:`,
    updatedLicence
  )
  return updatedLicence
}
