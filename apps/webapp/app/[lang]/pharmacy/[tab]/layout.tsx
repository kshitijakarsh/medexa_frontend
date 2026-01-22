"use client"

import { ReactNode } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDictionary } from "@/i18n/use-dictionary"



export default function PharmacyTabLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const activeTab = params?.tab as string
  const lang = params?.lang as string || "en"
  const dict = useDictionary()
  const tabsDict = dict.pages.pharmacy.common.tabs

  const PHARMACY_TABS = [
    { key: "dashboard", label: tabsDict.dashboard },
    { key: "opd-dispensing", label: tabsDict.opd },
    { key: "ipd-pharmacy", label: tabsDict.ipd },
    { key: "general-sales", label: tabsDict.sales },
    { key: "orders", label: tabsDict.orders },
    { key: "drug-inventory", label: tabsDict.inventory },
    { key: "expiry-management", label: tabsDict.expiry },
    { key: "approvals", label: tabsDict.approvals },
  ] as const

  const renderTabLabel = (label: string, isActive: boolean) => {
    if (label === tabsDict.ipd) {
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
                className={`h-[60px] px-5 py-2 rounded-t-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key
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
