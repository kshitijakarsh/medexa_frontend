// // // // // "use client";

// // // // // const tabs = [
// // // // //   "Visit purpose",
// // // // //   "SOAP Notes",
// // // // //   "Vitals",
// // // // //   "Prescription",
// // // // //   "Diagnostic Orders",
// // // // //   "Attachments",
// // // // //   "Patient History",
// // // // //   "Nurse Note",
// // // // //   "Surgery",
// // // // // ];

// // // // // export function AppointmentDetailTabs({ active, onChange }) {
// // // // //   return (
// // // // //     <div className="flex gap-2 overflow-x-auto pb-2">
// // // // //       {tabs.map((t) => (
// // // // //         <button
// // // // //           key={t}
// // // // //           onClick={() => onChange(t)}
// // // // //           className={`
// // // // //             px-4 py-1 rounded-full text-sm 
// // // // //             ${active === t ? "bg-blue-600 text-white" : "bg-[#F4F7FB] text-gray-600"}
// // // // //           `}
// // // // //         >
// // // // //           {t}
// // // // //         </button>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // const tabs = [
// // // //   "Visit purpose",
// // // //   "SOAP Notes",
// // // //   "Vitals",
// // // //   "Prescription",
// // // //   "Diagnostic Orders",
// // // //   "Attachments",
// // // //   "Patient History",
// // // //   "Nurse Note",
// // // //   "Surgery",
// // // // ];

// // // // export function AppointmentDetailTabs({ active, onChange } : {active: string, onChange: void}) {
// // // //   return (
// // // //     <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
// // // //       {tabs.map((t) => (
// // // //         <button
// // // //           key={t}
// // // //           onClick={() => onChange(t)}
// // // //           className={`
// // // //             px-4 py-1 rounded-full whitespace-nowrap text-sm  
// // // //             ${
// // // //               active === t
// // // //                 ? "bg-blue-600 text-white"
// // // //                 : "bg-[#EFF4FF] text-gray-600"
// // // //             }
// // // //           `}
// // // //         >
// // // //           {t}
// // // //         </button>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }



// // // "use client";

// // // export const DETAIL_TABS = [
// // //   "Visit purpose",
// // //   "SOAP Notes",
// // //   "Vitals",
// // //   "Prescription",
// // //   "Diagnostic Orders",
// // //   "Attachments",
// // //   "Patient History",
// // //   "Nurse Note",
// // //   "Surgery",
// // // ] as const;

// // // export type DetailTab = (typeof DETAIL_TABS)[number];

// // // interface AppointmentDetailTabsProps {
// // //   active: DetailTab;
// // //   onChange: (tab: DetailTab) => void;
// // // }

// // // export function AppointmentDetailTabs({
// // //   active,
// // //   onChange,
// // // }: AppointmentDetailTabsProps) {
// // //   return (
// // //     <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
// // //       {DETAIL_TABS.map((t) => (
// // //         <button
// // //           key={t}
// // //           onClick={() => onChange(t)}
// // //           className={`
// // //             px-4 py-1 rounded-full whitespace-nowrap text-sm  
// // //             ${
// // //               active === t
// // //                 ? "bg-blue-600 text-white"
// // //                 : "bg-[#EFF4FF] text-gray-600"
// // //             }
// // //           `}
// // //         >
// // //           {t}
// // //         </button>
// // //       ))}
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

// // export function AppointmentDetailTabs({
// //   active,
// //   onChange,
// // }: {
// //   active: string;
// //   onChange: (tab: string) => void;
// // }) {
// //   const tabs = [
// //     { key: "Visit purpose", label: "Visit purpose" },
// //     { key: "SOAP Notes", label: "SOAP Notes" },
// //     { key: "Vitals", label: "Vitals" },
// //     { key: "Prescription", label: "Prescription" },
// //     { key: "Diagnostic Orders", label: "Diagnostic Orders" },
// //     { key: "Attachments", label: "Attachments" },
// //     { key: "Patient History", label: "Patient History" },
// //     { key: "Nurse Note", label: "Nurse Note" },
// //     { key: "Surgery", label: "Surgery" },
// //   ];

// //   return (
// //     <DynamicTabs
// //       tabs={tabs}
// //       defaultTab={active}
// //       onChange={onChange}
// //     />
// //   );
// // }



// "use client";

// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// import { appointmentTabsConfig } from "./appointmentTabsConfig";

// export function AppointmentDetailTabs({
//   active,
//   onChange,
// }: {
//   active: string;
//   onChange: (tab: string) => void;
// }) {

//   return (
//     <DynamicTabs
//       tabs={appointmentTabsConfig.map((t) => ({ key: t.key, label: t.label }))}
//       defaultTab={active}
//       onChange={onChange}
//       variant="scroll"
//     />
//   );
// }



"use client";

import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { appointmentTabsConfig } from "./appointmentTabsConfig";

export function AppointmentDetailTabs({
  active,
  onChange,
  injectedProps,
}: {
  active: string;
  onChange: (tab: string) => void;
  injectedProps: any;
}) {

  const tabs = appointmentTabsConfig(injectedProps);

  return (
    <DynamicTabs
      tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
      defaultTab={active}
      onChange={onChange}
      variant="scroll"
    />
  );
}
