import { SectionConfig } from "../shared/ConfigurableFormSection";

export const surgeryTimingConfig: SectionConfig = {
    id: "surgery-timing",
    title: "Surgery Timing",
    gridCols: 4,
    fields: [
        { id: "patient-in", type: "date", label: "Patient In Time", required: false },
        { id: "anesthesia-start", type: "date", label: "Anesthesia Start", required: false },
        { id: "surgery-start", type: "date", label: "Surgery Start (Incision)", required: false },
        { id: "surgery-end", type: "date", label: "Surgery End (Closure)", required: false },
    ],
};

const procedureFormFields = [
    {
        id: "group-1",
        type: "group" as const,
        gridCols: 2,
        subFields: [
            {
                id: "procedure",
                type: "select" as const,
                label: "Actual Procedure Performed",
                placeholder: "Select Procedure",
                options: ["Laparoscopic Cholecystectomy", "Umbilical Hernia Repair", "Appendectomy"],
                required: true,
            },
            {
                id: "site",
                type: "select" as const,
                label: "Side / Site",
                placeholder: "Select Side / Site",
                options: ["Left", "Right", "Bilateral"],
            }
        ]
    },
    {
        id: "approach",
        type: "select" as const,
        label: "Approach / Access",
        placeholder: "Select Approach / Access",
        options: ["Laparoscopic", "Open", "Robotic"],
    },
    {
        id: "findings",
        type: "textarea" as const,
        label: "Intra-operative Findings",
        placeholder: "Enter / Instructions",
        rows: 3,
    },
    {
        id: "steps",
        type: "textarea" as const,
        label: "Operative Steps Summary",
        placeholder: "Enter / Instructions",
        rows: 3,
    }
];

export const procedureDetailsConfig: SectionConfig = {
    id: "procedure-details",
    title: "Procedure Details",
    fields: [
        {
            id: "proc-form-1",
            type: "group",
            subFields: procedureFormFields,
            className: "border-slate-100 rounded-lg bg-slate-50/50 p-3" // matching original styling
        },
        {
            id: "proc-form-2",
            type: "group",
            subFields: procedureFormFields.map(f => ({ ...f, id: f.id + '-2' })), // simple unique ID hack
            className: "border-slate-100 rounded-lg bg-slate-50/50 p-3"
        }
    ],
};

export const complicationsConfig: SectionConfig = {
    id: "complications",
    title: "Complications",
    fields: [
        {
            id: "intra-op-complications",
            type: "textarea",
            label: "Intra-operative Complications",
            placeholder: "Enter Intra-operative Complications",
            rows: 1,
        },
    ],
};

export const bloodLossConfig: SectionConfig = {
    id: "blood-loss",
    title: "Blood Loss & Transfusion",
    fields: [
        {
            id: "estimated-loss",
            type: "text",
            label: "Estimated Blood Loss (mL)",
            placeholder: "Select Estimated Blood Loss",
            required: true
        },
        {
            id: "blood-products",
            type: "group",
            gridCols: 3,
            subFields: [
                { id: "prbc", type: "select", label: "PRBC (Units)", placeholder: "Select Surgeon Team", options: ["Team A", "Team B"] },
                { id: "ffp", type: "select", label: "FFP (Units)", placeholder: "Select Surgeon Team", options: ["Team A", "Team B"] },
                { id: "platelets", type: "select", label: "Platelets (Units)", placeholder: "Select Surgeon Team", options: ["Team A", "Team B"] },
            ]
        }
    ],
};

export const specimensConfig: SectionConfig = {
    id: "specimens",
    title: "Specimens & Other Details",
    fields: [
        {
            id: "specimens-sent",
            type: "checkbox",
            label: "Specimens sent for Histopathology",
            defaultValue: false,
        },
        {
            id: "drains-placed",
            type: "checkbox",
            label: "Drains Placed",
            defaultValue: true,
            subFields: [
                {
                    id: "drain-details",
                    type: "textarea",
                    label: "Drain Details",
                    placeholder: "Enter Drain Details",
                    rows: 3
                }
            ]
        },
        {
            id: "catheter-placed",
            type: "checkbox",
            label: "Catheter Placed",
            defaultValue: false,
        },
    ],
};

export const surgeonNotesConfig: SectionConfig = {
    id: "surgeon-notes",
    title: "Surgeon's Additional Notes",
    fields: [
        {
            id: "op-steps",
            type: "textarea",
            label: "Operative Steps Summary",
            placeholder: "Enter / Instructions",
            rows: 3,
            required: true,
        },
    ],
};
