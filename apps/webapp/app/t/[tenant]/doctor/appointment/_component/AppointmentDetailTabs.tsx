// // "use client";

// // const tabs = [
// //   "Visit purpose",
// //   "SOAP Notes",
// //   "Vitals",
// //   "Prescription",
// //   "Diagnostic Orders",
// //   "Attachments",
// //   "Patient History",
// //   "Nurse Note",
// //   "Surgery",
// // ];

// // export function AppointmentDetailTabs({ active, onChange }) {
// //   return (
// //     <div className="flex gap-2 overflow-x-auto pb-2">
// //       {tabs.map((t) => (
// //         <button
// //           key={t}
// //           onClick={() => onChange(t)}
// //           className={`
// //             px-4 py-1 rounded-full text-sm 
// //             ${active === t ? "bg-blue-600 text-white" : "bg-[#F4F7FB] text-gray-600"}
// //           `}
// //         >
// //           {t}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }


// "use client";

// const tabs = [
//   "Visit purpose",
//   "SOAP Notes",
//   "Vitals",
//   "Prescription",
//   "Diagnostic Orders",
//   "Attachments",
//   "Patient History",
//   "Nurse Note",
//   "Surgery",
// ];

// export function AppointmentDetailTabs({ active, onChange } : {active: string, onChange: void}) {
//   return (
//     <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
//       {tabs.map((t) => (
//         <button
//           key={t}
//           onClick={() => onChange(t)}
//           className={`
//             px-4 py-1 rounded-full whitespace-nowrap text-sm  
//             ${
//               active === t
//                 ? "bg-blue-600 text-white"
//                 : "bg-[#EFF4FF] text-gray-600"
//             }
//           `}
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }



"use client";

export const DETAIL_TABS = [
  "Visit purpose",
  "SOAP Notes",
  "Vitals",
  "Prescription",
  "Diagnostic Orders",
  "Attachments",
  "Patient History",
  "Nurse Note",
  "Surgery",
] as const;

export type DetailTab = (typeof DETAIL_TABS)[number];

interface AppointmentDetailTabsProps {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
}

export function AppointmentDetailTabs({
  active,
  onChange,
}: AppointmentDetailTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
      {DETAIL_TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`
            px-4 py-1 rounded-full whitespace-nowrap text-sm  
            ${
              active === t
                ? "bg-blue-600 text-white"
                : "bg-[#EFF4FF] text-gray-600"
            }
          `}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
