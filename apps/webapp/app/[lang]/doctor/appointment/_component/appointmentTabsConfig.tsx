// appointmentTabsConfig.ts

import Attachments from "./Tabs/Attachments";
import { DiagnosticOrders } from "./Tabs/DiagnosticOrders";
import NurseNotesSection from "./Tabs/NurseNote";
import Prescription from "./Tabs/Prescription";
import { SOAPNotes } from "./Tabs/SOAPNotes";
import SurgerySection from "./Tabs/SurgerySection";
import { VisitPurpose } from "./Tabs/VisitPurpose";
import { Vitals } from "./Tabs/Vitals";

export const appointmentTabsConfig = (props: any) => [
    {
        key: "Visit purpose",
        label: "Visit purpose",
        component: (
            <VisitPurpose
                data={props.visitPurposeData}
                setData={props.setVisitPurposeData}
                setDirty={props.setVisitPurposeDirty}
            />
        ),
    },
    { key: "SOAP Notes", label: "SOAP Notes", component: <SOAPNotes /> },
    { key: "Vitals", label: "Vitals", component: <Vitals /> },
    { key: "Prescription", label: "Prescription", component: <Prescription /> },
    { key: "Diagnostic Orders", label: "Diagnostic Orders", component: <DiagnosticOrders /> },
    { key: "Attachments", label: "Attachments", component: <Attachments /> },
    { key: "Patient History", label: "Patient History", component: <p>Patient History tab...</p> },
    { key: "Nurse Note", label: "Nurse Note", component: <NurseNotesSection /> },
    { key: "Surgery", label: "Surgery", component: <SurgerySection /> },
    { key: "Visits / Encounters", label: "Visits / Encounters", component: <p>Visits and encounters</ p > },
    { key: "Clinical Forms", label: "Clinical Forms", component: <p>Clinical Forms </p> },
    { key: "Bed History", label: "Bed History", component: <p>Bed History </p> },
    { key: "Additional Observations", label: "Additional Observations", component: <p>Additional Observations </p> },
    { key: "Consumable", label: "Consumable", component: <p>Consumable </p> },
];
