"use client"

import { ReactNode } from "react"
import { useRouter, useParams } from "next/navigation"

const PHARMACY_TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "opd-dispensing", label: "OPD Dispensing" },
  { key: "ipd-pharmacy", label: "IPD Pharmacy" },
  { key: "general-sales", label: "General Sales" },
  { key: "orders", label: "Orders" },
  { key: "drug-inventory", label: "Drug Inventory" },
  { key: "expiry-management", label: "Expiry Management" },
  { key: "approvals", label: "Approvals" },
  // { key: "reports", label: "Reports" },
] as const

export default function PharmacyTabLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const activeTab = params?.tab as string
  const lang = params?.lang as string || "en"

  const renderTabLabel = (label: string, isActive: boolean) => {
    if (label === "IPD Pharmacy") {
      return (
        <>
          IPD <span className={isActive ? "bg-yellow-400 text-blue-600 px-1" : ""}>Pharmacy</span>
        </>
      )
    }
    return label
  }

  return (
    <div className="w-full">
      {/* Pharmacy Tab Navigation */}
      <div className="bg-white px-4 pt-4 border-b border-gray-200 shadow-sm overflow-x-auto">
        <div className="flex justify-center">
          <div className="flex gap-3 min-w-max">
            {PHARMACY_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => router.push(`/${lang}/pharmacy/${tab.key}`)}
                className={`h-[60px] px-5 py-2 rounded-t-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {/* {renderTabLabel(tab.label, activeTab === tab.key)} */}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
