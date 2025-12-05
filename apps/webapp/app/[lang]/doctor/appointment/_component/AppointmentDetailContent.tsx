import Attachments from "./Tabs/Attachments";
import { DiagnosticOrders } from "./Tabs/DiagnosticOrders";
import NurseNotesSection from "./Tabs/NurseNote";
import Prescription from "./Tabs/Prescription";
import { SOAPNotes } from "./Tabs/SOAPNotes";
import SurgerySection from "./Tabs/SurgerySection";
import { VisitPurpose } from "./Tabs/VisitPurpose";
import { Vitals } from "./Tabs/Vitals";

export function AppointmentDetailContent({ activeTab }: { activeTab: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm min-h-[400px]">
      {activeTab === "Visit purpose" && <VisitPurpose />}
      {activeTab === "SOAP Notes" && <SOAPNotes />}
      {activeTab === "Vitals" && <Vitals />}
      {activeTab === "Prescription" && <Prescription />}
      {activeTab === "Diagnostic Orders" && <DiagnosticOrders />}
      {activeTab === "Attachments" && <Attachments />}
      {activeTab === "Patient History" && <p>Patient History tab...</p>}
      {activeTab === "Nurse Note" && <NurseNotesSection />}
      {activeTab === "Surgery" && <SurgerySection />}
    </div>
  );
}
