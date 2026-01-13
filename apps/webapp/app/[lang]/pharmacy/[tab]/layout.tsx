"use client"

import { ReactNode } from "react"
import { useRouter, useParams } from "next/navigation"

const PHARMACY_TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "opd-dispensing", label: "OPD Dispensing" },
  { key: "ipd-pharmacy", label: "IPD Pharmacy" },
  { key: "general-sales", label: "General Sales" },
  { key: "drug-inventory", label: "Drug Inventory" },
  { key: "expiry-management", label: "Expiry Management" },
  { key: "approvals", label: "Approvals" },
  { key: "reports", label: "Reports" },
] as const

export default function PharmacyTabLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const activeTab = params?.tab as string
  const lang = params?.lang as string || "en"

  return (
    <div className="w-full">
      {/* Pharmacy Tab Navigation */}
      <div className="bg-white px-6 py-3 flex gap-3 overflow-x-auto sticky top-0 z-10">
        {PHARMACY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => router.push(`/${lang}/pharmacy/${tab.key}`)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-[#2196F3] text-white shadow-md"
                : "bg-[#F5F5F5] text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
