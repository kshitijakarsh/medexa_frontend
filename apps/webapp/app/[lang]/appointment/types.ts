export interface AppointmentEntry {
    id: string;
    mrn: string;
    appId: string;
    patientName: string;
    patientImg?: string; // URL or path
    isVip: boolean;
    consultantDoctor: string;
    specialty: string; // e.g., "Cardiology"
    appointmentDate: string; // YYYY-MM-DD
    bookedSlot: string; // "09:00 Am"
    serviceType: string; // "Doctor Consultation"
    visitType: string; // "General", "Walk-in"
    paymentStatus: "Pending" | "Paid" | "Failed";
    status: "Booked" | "Confirmed" | "Checked-In" | "Completed" | "Cancelled" | "Pending";
    contactNumber: string;
    isNewConsultation?: boolean;
}

export type FilterState = {
    department: string;
    doctor: string;
    status: string;
    dateFilter: string; // "today", "tomorrow", "custom", "all"
    customDateRange?: { start: string; end: string };
};
