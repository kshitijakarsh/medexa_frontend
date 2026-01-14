"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import {
  PharmacyDashboard,
  OPDDispensing,
  IPDPharmacy,
  GeneralSales,
  Orders,
  DrugInventory,
  ExpiryManagement,
  ApprovalManagement,
} from "../_components"

const VALID_TABS = [
  "dashboard",
  "opd-dispensing",
  "ipd-pharmacy",
  "general-sales",
  "orders",
  "drug-inventory",
  "expiry-management",
  "approvals",
  "reports",
] as const

export default function PharmacyTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = use(params)

  if (!VALID_TABS.includes(tab as any)) {
    notFound()
  }

  switch (tab) {
    case "dashboard":
      return <PharmacyDashboard />
    case "opd-dispensing":
      return <OPDDispensing />
    case "ipd-pharmacy":
      return <IPDPharmacy />
    case "general-sales":
      return <GeneralSales />
    case "orders":
      return <Orders />
    case "drug-inventory":
      return <DrugInventory />
    case "expiry-management":
      return <ExpiryManagement />
    case "approvals":
      return <ApprovalManagement />
    case "reports":
      return (
        <div className="p-8 text-center text-muted-foreground">
          Reports - Coming Soon
        </div>
      )
    default:
      notFound()
  }
}
