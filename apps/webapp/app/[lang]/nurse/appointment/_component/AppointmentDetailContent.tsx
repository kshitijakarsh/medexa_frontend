// import Attachments from "./Tabs/Attachments";
// import { DiagnosticOrders } from "./Tabs/DiagnosticOrders";
// import NurseNotesSection from "./Tabs/NurseNote";
// import Prescription from "./Tabs/Prescription";
// import { SOAPNotes } from "./Tabs/SOAPNotes";
// import SurgerySection from "./Tabs/SurgerySection";
// import { VisitPurpose } from "./Tabs/VisitPurpose";
// import { Vitals } from "./Tabs/Vitals";

// export function AppointmentDetailContent({ activeTab }: { activeTab: string }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm min-h-[400px]">
//       {activeTab === "Visit purpose" && <VisitPurpose />}
//       {activeTab === "SOAP Notes" && <SOAPNotes />}
//       {activeTab === "Vitals" && <Vitals />}
//       {activeTab === "Prescription" && <Prescription />}
//       {activeTab === "Diagnostic Orders" && <DiagnosticOrders />}
//       {activeTab === "Attachments" && <Attachments />}
//       {activeTab === "Visits / Encounters" && <p>Vistis and encounters</p>}
//       {activeTab === "Patient History" && <p>Patient History tab...</p>}
//       {activeTab === "Nurse Note" && <NurseNotesSection />}
//       {activeTab === "Surgery" && <SurgerySection />}
//       {activeTab === "Clinical Forms" && <p>Clinical Forms</p>}
//       {activeTab === "Bed History" && <p>Bed History</p>}
//       {activeTab === "Additional Observations" && <p>Additional Observations</p>}
//       {activeTab === "Consumable" && <p>Consumable</p>}
//     </div>
//   );
// }


// import { appointmentTabsConfig } from "./appointmentTabsConfig";

// export function AppointmentDetailContent({ activeTab }: { activeTab: string }) {
//   const tab = appointmentTabsConfig.find((t) => t.key === activeTab);

//   return (
//     <div className=" min-h-[400px]">
//       {tab?.component || <p>No content found</p>}
//     </div>
//   );
// }


// AppointmentDetailContent.tsx


import { appointmentTabsConfig } from "./appointmentTabsConfig";
import { useUserStore } from "@/store/useUserStore";

export function AppointmentDetailContent({ activeTab, injectedProps }: any) {
    const user = useUserStore((s) => s.user);
  const userPermissions = user?.role?.permissions;

  const tabs = appointmentTabsConfig(injectedProps, userPermissions); // turn config into function

  const tab = tabs.find((t) => t.key === activeTab);

  return (
    <div className=" min-h-[400px]">
      {tab?.component || <p>No content found</p>}
    </div>
  );
}
