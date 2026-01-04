// appointmentTabsConfig.ts

import Attachments from "./Tabs/Attachments";
import { DiagnosticOrders } from "./Tabs/DiagnosticOrders";
import NurseNotesSection from "./Tabs/NurseNote";
import Prescription from "./Tabs/Prescription";
import { SOAPNotes } from "./Tabs/SOAPNotes";
import SurgerySection from "./Tabs/SurgerySection";
import { VisitPurpose } from "./Tabs/VisitPurpose";
import { Vitals } from "./Tabs/Vitals";
import NurseOrders from "./Tabs/NurseOrders";
import { hasPermission, PERMISSIONS } from "@/app/utils/permissions";

// export const appointmentTabsConfig = (props: any) => [
export const appointmentTabsConfig = (
    props: any,
    userPermissions: any[] = []
) => [
        ...(hasPermission(userPermissions, PERMISSIONS.DOCTOR.VISIT_PURPOSE.VIEW)
            ? [
                {
                    key: "Visit purpose",
                    label: "Visit purpose",
                    component: (
                        <VisitPurpose
                            patientId={props.patientId}
                            data={props.visitPurposeData}
                            setData={props.setVisitPurposeData}
                            setDirty={props.setVisitPurposeDirty}
                        />
                    ),
                },
            ]
            : []),
        ...(hasPermission(userPermissions, PERMISSIONS.DOCTOR.SOAP_NOTES.VIEW)
            ? [
                {
                    key: "SOAP Notes", label: "SOAP Notes",
                    component: (
                        <SOAPNotes
                            patientId={props.patientId}
                            data={props.soapNoteData}
                            setData={props.setSoapNoteData}
                            setDirty={props.setSoapNoteDirty}
                        />
                    ),
                }
            ]
            :
            []),
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.VITALS.VIEW
        )
            ? [
                {
                    key: "Vitals",
                    label: "Vitals",
                    component: <Vitals patientId={props.patientId} />,
                },
            ]
            : []),
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.PRESCRIPTION.VIEW
        )
            ? [
                { key: "Prescription", label: "Prescription", component: <Prescription /> },
            ]
            : []),
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.DIAGNOSTIC_ORDERS.VIEW
        )
            ? [
                { key: "Diagnostic Orders", label: "Diagnostic Orders", component: <DiagnosticOrders /> },
            ]
            : []),
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.ATTACHMENTS.VIEW
        )
            ? [
                { key: "Attachments", label: "Attachments", component: <Attachments patientId={props.patientId} /> },
            ]
            : []),
        // { key: "Patient History", label: "Patient History", component: <p>Patient History tab...</p> },
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.NURSE_NOTES.VIEW
        )
            ? [
                {
                    key: "Nurse Note", label: "Nurse Note",
                    component: (
                        <NurseNotesSection
                            patientId={props.patientId}
                        />
                    ),
                },
            ]
            : []),
        ...(hasPermission(
            userPermissions,
            PERMISSIONS.DOCTOR.NURSE_ORDERS.VIEW
        )
            ? [
                {
                    key: "Nurse Orders", label: "Nurse Orders",
                    component: (
                        <NurseOrders
                            patientId={props.patientId}
                        />
                    ),
                },
            ]
            : []),
        // { key: "Surgery", label: "Surgery", component: <SurgerySection /> },
        // { key: "Visits / Encounters", label: "Visits / Encounters", component: <p>Visits and encounters</ p > },
        // { key: "Clinical Forms", label: "Clinical Forms", component: <p>Clinical Forms </p> },
        // { key: "Bed History", label: "Bed History", component: <p>Bed History </p> },
        // { key: "Additional Observations", label: "Additional Observations", component: <p>Additional Observations </p> },
        // { key: "Consumable", label: "Consumable", component: <p>Consumable </p> },
    ];
