import { SOAPNotes } from "./Tabs/SOAPNotes";
import { VisitPurpose } from "./Tabs/VisitPurpose";
import { Vitals } from "./Tabs/Vitals";

export function AppointmentDetailContent({ activeTab }: { activeTab: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm min-h-[400px]">
      {activeTab === "Visit purpose" && <VisitPurpose />}
      {activeTab === "SOAP Notes" && <SOAPNotes />}
      {activeTab === "Vitals" && <Vitals />}
      {activeTab === "Prescription" && <p>Prescription tab...</p>}
      {activeTab === "Diagnostic Orders" && <p>Diagnostic Orders tab...</p>}
      {activeTab === "Attachments" && <p>Attachments tab...</p>}
      {activeTab === "Patient History" && <p>Patient History tab...</p>}
      {activeTab === "Nurse Note" && <p>Nurse Note tab...</p>}
      {activeTab === "Surgery" && <p>Surgery tab...</p>}
    </div>
  );
}
