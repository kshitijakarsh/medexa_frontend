export interface RegulatoryDoc {
  id: string
  doc_type: string
  authority_id?: string
  doc_number?: string
  issue_date?: string
  expiry_date?: string
  file_url: string
  uploaded_by?: string
  verified_by?: string
  verified_at?: string
  status?: string
  notes?: string
}

const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export interface CreateRegulatoryDocPayload {
  doc_type: string
  authority_id?: string
  doc_number?: string
  issue_date?: string
  expiry_date?: string
  file_url: string
  uploaded_by?: string
  verified_by?: string
  verified_at?: string
  status?: string
  notes?: string
}

export interface UpdateRegulatoryDocPayload extends CreateRegulatoryDocPayload {
  id: string
}

export async function createRegulatoryDoc(
  tenantId: string,
  payload: CreateRegulatoryDocPayload
): Promise<RegulatoryDoc> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to create regulatory document. Please try again.")
  }

  const newDoc: RegulatoryDoc = {
    id: `regulatory-${Date.now()}`,
    ...payload,
  }

  console.log(
    `[Mock API] Created regulatory document for tenant ${tenantId}:`,
    newDoc
  )
  return newDoc
}

export async function updateRegulatoryDoc(
  docId: string,
  payload: UpdateRegulatoryDocPayload
): Promise<RegulatoryDoc> {
  await mockDelay(800)

  if (Math.random() < 0.05) {
    throw new Error("Failed to update regulatory document. Please try again.")
  }

  const updatedDoc: RegulatoryDoc = {
    ...payload,
    id: docId,
  }

  console.log(`[Mock API] Updated regulatory document ${docId}:`, updatedDoc)
  return updatedDoc
}
