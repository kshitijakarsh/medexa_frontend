"use client";

import { PersonalDetails } from "./PersonalDetails";
import { ContactAddress } from "./ContactAddress";
import { Employment } from "./Employment";
import { VisaLicense } from "./VisaLicense";
import { ContractPayroll } from "./ContractPayroll";
import { Documents } from "./Documents";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

const tabs = [
  { key: "Personal Details", label: "Personal Details" },
  { key: "Contact & Address", label: "Contact & Address" },
  { key: "Employment", label: "Employment" },
  { key: "Visa & License", label: "Visa & License" },
  { key: "Contract & Payroll", label: "Contract & Payroll" },
  { key: "Documents", label: "Documents" },
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
      case "Documents": return <Documents form={form} initialData={initialData} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="mb-5 border-b pb-2">
        <DynamicTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
      <div>{renderTab()}</div>
    </div>
  );
}

