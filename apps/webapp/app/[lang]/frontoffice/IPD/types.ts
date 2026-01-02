
export interface IPDEntry {
    id: string;
    bedNo: string;
    patientName: string;
    mrn: string;
    ipdId: string;
    patientImg?: string;
    doctorName: string;
    specialty: string;
    admissionDate: string;
    time: string;
    location: string; // Floor - Ward - Bed details (e.g. 12A - Ward 1 - B101)
    bill: string;
    status: "Critical" | "Stable" | "Under Observation" | "Pre-Operative" | "Post-Operative" | "Discharged";
    action?: string;

    // Discharged specific
    dischargeDate?: string;

    // Follow-up / Discharged Table specific
    followUpDate?: string;
    visitType?: string; // e.g. "OPD", "IPD"
    reason?: string;
    appointmentType?: string; // e.g. "In-person"
    createdOn?: string;
}

export interface IPDFilterState {
    floor: string;
    ward: string;
    status: string; // All Status dropdown
    search: string;
    viewMode: "list" | "grid";
    category: "All" | "Critical" | "Stable" | "Under Observation" | "Pre-Operative" | "Post-Operative";
}

// Reusing InstructionEntry for consistency, 
// or I can redefine if I want to keep modules independent.
// For now, I'll redefine to avoid cross-imports unless I move common types.
export interface InstructionEntry {
    id: string;
    patientName: string;
    patientImg?: string;
    mrn: string;
    visitId: string; // or IPD ID

    // Ordered By / Doctor
    doctorName: string;
    specialty: string;

    // Nurse Clinical Tasks specifics
    nurseName?: string;
    nurseRole?: string;
    orderType?: string;
    description?: string;
    frequency?: string;
    dateTime?: string;

    // Lab/Radiology specifics
    orderedDate?: string;
    testName?: string;
    category?: string;
    urgency?: "Routine" | "Urgent";

    priority: "Urgent" | "Normal" | "Routine";
    status: "Pending" | "Completed";
}

export type InstructionFilterState = {
    tab: "Nurse Clinical Tasks" | "Laboratory Orders" | "Radiology Orders" | "Surgery / OT Requests" | "Follow Up Required" | "Referral";
    search: string;
    viewMode: "list" | "grid";
};
