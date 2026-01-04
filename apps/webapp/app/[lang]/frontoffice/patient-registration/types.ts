export interface PatientEntry {
    id: string;
    mrn: string;
    patientName: string;
    patientImg?: string; // URL or path
    isVip: boolean;
    dob: string; // Date of Birth - YYYY-MM-DD
    phone: string;
    email: string;
    gender: "Male" | "Female" | "Other";
    category: "VIP" | "Normal" | "Emergency";
    lastVisit: string; // YYYY-MM-DD or formatted date
    status: "Active" | "Inactive" | "Registered" | "Unknown ER" | "Incomplete" | "Online Registration";
    registrationStatus: "Registered Patient" | "Unknown ER" | "Incomplete" | "Online Registration";
}

export type PatientFilterState = {
    department: string;
    category: string;
    status: string;
    dateFilter: string; // "today", "this-week", "this-month", "all"
    registrationStatus: string; // Filter by tab
    customDateRange?: { start: string; end: string };
};
