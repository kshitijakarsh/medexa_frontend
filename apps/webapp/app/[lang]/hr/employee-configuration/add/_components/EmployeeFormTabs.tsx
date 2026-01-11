"use client";

import { PersonalDetails } from "./PersonalDetails";
import { ContactAddress } from "./ContactAddress";
import { Employment } from "./Employment";
import { VisaLicense } from "./VisaLicense";
import { ContractPayroll } from "./ContractPayroll";
import { Documents } from "./Documents";

const tabs = [
  "Personal Details",
  "Contact & Address",
  "Employment",
  "Visa & License",
  "Contract & Payroll",
  "Documents",
];

interface EmployeeFormTabsProps {
  form: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  authToken: string;
  initialData?: any;
}

export function EmployeeFormTabs({ form, activeTab, setActiveTab, authToken, initialData }: EmployeeFormTabsProps) {
  const renderTab = () => {
    switch (activeTab) {
      case "Personal Details": return <PersonalDetails form={form} authToken={authToken} initialData={initialData} />;
      case "Contact & Address": return <ContactAddress form={form} />;
      case "Employment": return <Employment form={form} />;
      case "Visa & License": return <VisaLicense form={form} />;
      case "Contract & Payroll": return <ContractPayroll form={form} />;
      case "Documents": return <Documents form={form} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-blue-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderTab()}</div>
    </div>
  );
}
