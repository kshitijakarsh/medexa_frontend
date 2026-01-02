export interface OPDEntry {
    id: string;
    tokenNo: string;
    patientName: string;
    mrn: string;
    visitId: string;
    patientImg?: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    bookingType: string;
    priorityType: "VIP" | "Normal" | "Urgent";
    status: string;
    action?: string;
    // New fields for Completed View
    reason?: string;
    type?: string;
    createdOn?: string;
}

export interface InstructionEntry {
    id: string;
    patientName: string;
    patientImg?: string;
    mrn: string;
    visitId: string;

    // Ordered By / Doctor
    doctorName: string;
    specialty: string;

    // Nurse Clinical Tasks specifics
    nurseName?: string;
    nurseRole?: string;
    orderType?: string; // Wound Dressing
    description?: string; // Dressing change on left leg wound
    frequency?: string; // Daily
    dateTime?: string; // 2025-09-27 19:30

    // Lab/Radiology specifics
    orderedDate?: string;
    testName?: string;
    category?: string;
    urgency?: "Routine" | "Urgent";

    priority: "Urgent" | "Normal" | "Routine";
    status: "Pending" | "Completed";
}

export type OPDFilterState = {
    dateRange: string; // "Today's OPD QUE" etc
    department: string;
    doctor: string;
    status: string;
    search: string;
    viewMode: "list" | "grid";
    category: "All" | "New Consultation" | "VIP Appointments" | "Follow Up" | "Emergency";
};

export type InstructionFilterState = {
    tab: "Nurse Clinical Tasks" | "Laboratory Orders" | "Radiology Orders" | "Surgery / OT Requests" | "Follow Up Required" | "Referral";
    search: string;
    viewMode: "list" | "grid";
};
