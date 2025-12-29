import { SectionConfig } from "../shared/ConfigurableFormSection";

export const patientReceptionConfig: SectionConfig = {
    id: "patient-reception",
    title: "Patient Reception in OT",
    gridCols: 2,
    fields: [
        {
            id: "reception-time",
            type: "time",
            label: "Patient Received Time",
            placeholder: "Select Time",
            className: "col-span-full mb-2"
        },
        { id: "reception-identity", type: "checkbox", label: "Patient Identity Verified" },
        { id: "reception-consent", type: "checkbox", label: "Consent Form Verified" },
        { id: "reception-site", type: "checkbox", label: "Surgical Site Marked" },
        { id: "reception-npo", type: "checkbox", label: "Fasting Status Confirmed (NPO)" },
    ],
};

export const surgicalSafetyChecklistConfig: SectionConfig = {
    id: "surgical-safety",
    title: "Surgical Safety Checklist",
    headerFields: [
        { id: "safety-time", type: "time", placeholder: "Select Time" }
    ],
    fields: [
        { id: "safety-identity", type: "checkbox", label: "Patient confirms identity, site, procedure, consent" },
        { id: "safety-site", type: "checkbox", label: "Site marked / Not applicable" },
        { id: "safety-consent", type: "checkbox", label: "Consent form complete" },
        { id: "safety-pulse", type: "checkbox", label: "Pulse oximeter on patient and functioning" },
        { id: "safety-allergies", type: "checkbox", label: "Known allergies confirmed" },
        { id: "safety-airway", type: "checkbox", label: "Difficult airway/aspiration risk assessed" },
        { id: "safety-blood", type: "checkbox", label: "Risk of >500ml blood loss assessed" },
        {
            id: "safety-notes",
            type: "textarea",
            label: "Additional notes",
            placeholder: "Enter Additional notes",
            rows: 3,
            className: "mt-4"
        }
    ],
    showMarkCompleted: true
}

export const patientPositioningConfig: SectionConfig = {
    id: "patient-positioning",
    title: "Patient Positioning & Preparation",
    fields: [
        {
            id: "patient-pos",
            type: "text",
            label: "Patient Position",
            placeholder: "Enter Patient Position",
            className: "mb-2"
        },
        { id: "pos-pressure", type: "checkbox", label: "All pressure points adequately padded" }
    ]
}

export const timeOutConfig: SectionConfig = {
    id: "time-out",
    title: "Time Out (Before Skin Incision)",
    headerFields: [
        { id: "timeout-time", type: "time", placeholder: "Select Time" }
    ],
    fields: [
        { id: "timeout-team", type: "checkbox", label: "All team members introduced by name and role" },
        { id: "timeout-confirm", type: "checkbox", label: "Surgeon, Anaesthetist, Nurse confirm patient, site, procedure" },
        { id: "timeout-antibiotic", type: "checkbox", label: "Antibiotic prophylaxis given within 60 min" },
        { id: "timeout-imaging", type: "checkbox", label: "Essential imaging displayed" },
        { id: "timeout-sterility", type: "checkbox", label: "Sterility confirmed (including indicator results)" },
        {
            id: "timeout-notes",
            type: "textarea",
            label: "Additional notes",
            placeholder: "Enter Additional notes",
            rows: 3,
            className: "mt-4"
        }
    ],
    showMarkCompleted: true
}

export const signOutConfig: SectionConfig = {
    id: "sign-out",
    title: "Sign Out (Before Patient Leaves OT)",
    headerFields: [
        { id: "signout-time", type: "time", placeholder: "Select Time" }
    ],
    fields: [
        { id: "signout-procedure", type: "checkbox", label: "Procedure name recorded correctly" },
        { id: "signout-counts", type: "checkbox", label: "Instrument, sponge, needle counts correct" },
        { id: "signout-specimen", type: "checkbox", label: "Specimen labeled (including patient name)" },
        { id: "signout-equipment", type: "checkbox", label: "Equipment problems addressed" },
        {
            id: "signout-notes",
            type: "textarea",
            label: "Additional notes",
            placeholder: "Enter Additional notes",
            rows: 3,
            className: "mt-4"
        }
    ],
    showMarkCompleted: true
}

export const additionalNotesConfig: SectionConfig = {
    id: "additional-notes",
    title: "Additional Nursing Notes",
    fields: [
        {
            id: "nursing-notes",
            type: "textarea",
            label: "Nursing Notes",
            placeholder: "Enter Nursing Notes",
            rows: 3
        }
    ]
}
