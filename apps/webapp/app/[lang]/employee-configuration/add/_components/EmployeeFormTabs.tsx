// "use client";

// import { useState } from "react";
// import { PersonalDetails } from "./PersonalDetails";
// import { ContactAddress } from "./ContactAddress";
// import { Employment } from "./Employment";
// import { VisaLicense } from "./VisaLicense";
// import { ContractPayroll } from "./ContractPayroll";
// import { Documents } from "./Documents";
// import { SystemAccess } from "./SystemAccess";

// const tabs = [
//   "Personal Details",
//   "Contact & Address",
//   "Employment",
//   "Visa & License",
//   "Contract & Payroll",
//   "Documents",
//   "System Access",
// ];

// export function EmployeeFormTabs() {
//   const [activeTab, setActiveTab] = useState("Personal Details");

//   const renderTab = () => {
//     switch (activeTab) {
//       case "Personal Details": return <PersonalDetails />;
//       case "Contact & Address": return <ContactAddress />;
//       case "Employment": return <Employment />;
//       case "Visa & License": return <VisaLicense />;
//       case "Contract & Payroll": return <ContractPayroll />;
//       case "Documents": return <Documents />;
//       case "System Access": return <SystemAccess />;
//       default: return null;
//     }
//   };

//   return (
//     <div>
//       {/* Tab headers */}
//       <div className="flex flex-wrap gap-2 mb-5 border-b pb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-1.5 rounded-md text-sm font-medium ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-blue-100"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div>{renderTab()}</div>
//     </div>
//   );
// }


"use client";

import { PersonalDetails } from "./PersonalDetails";
import { ContactAddress } from "./ContactAddress";
import { Employment } from "./Employment";
import { VisaLicense } from "./VisaLicense";
import { ContractPayroll } from "./ContractPayroll";
import { Documents } from "./Documents";
import { SystemAccess } from "./SystemAccess";

const tabs = [
  "Personal Details",
  "Contact & Address",
  "Employment",
  "Visa & License",
  "Contract & Payroll",
  "Documents",
  "System Access",
];

export function EmployeeFormTabs({ form, activeTab, setActiveTab }: any) {
  const renderTab = () => {
    switch (activeTab) {
      case "Personal Details": return <PersonalDetails form={form} />;
      case "Contact & Address": return <ContactAddress form={form} />;
      case "Employment": return <Employment form={form} />;
      case "Visa & License": return <VisaLicense form={form} />;
      case "Contract & Payroll": return <ContractPayroll form={form} />;
      case "Documents": return <Documents form={form} />;
      case "System Access": return <SystemAccess form={form} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${
              activeTab === tab
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
