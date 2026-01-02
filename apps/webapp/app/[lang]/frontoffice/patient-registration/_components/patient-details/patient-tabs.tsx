"use client"

export type PatientTab =
    | "overview"
    | "visits"
    | "billing"
    | "lab-results"
    | "radiology"
    | "medications"
    | "allergies"
    | "documents"

interface PatientTabsProps {
    activeTab: PatientTab
    onTabChange: (tab: PatientTab) => void
}

const tabs: { id: PatientTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "visits", label: "Visits / Encounters" },
    { id: "billing", label: "Billing / Invoices" },
    { id: "lab-results", label: "Lab Results" },
    { id: "radiology", label: "Radiology Reports" },
    { id: "medications", label: "Medications" },
    { id: "allergies", label: "Allergies & Problems" },
    { id: "documents", label: "Documents" },
]

export function PatientTabs({ activeTab, onTabChange }: PatientTabsProps) {
    return (
        <div className="w-full">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-6 py-2.5 text-[15px] font-medium whitespace-nowrap transition-all rounded-full border ${activeTab === tab.id
                            ? "bg-[#007AFF] text-white border-[#007AFF] shadow-sm"
                            : "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#CBD5E1]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
