
import {
    AlertCircle,
    BriefcaseMedical,
    CheckCircle2,
    Clock,
    FileText,
    Users
} from "lucide-react";

export const OVERVIEW_STATS = {
    todaysOverview: {
        totalPatients: 10,
        newPatients: 3,
    },
    medications: {
        due: 5,
        followUps: 6,
    },
    workload: {
        pendingTasks: 4,
        prescriptionsIssued: 12,
    },
    alerts: [
        {
            id: 1,
            title: "Emergency Patient Arrived",
            description: "Yousef Al-Ghanim in ER-2",
            type: "critical", // red
        },
        {
            id: 2,
            title: "New Patient Arrived",
            description: "Yousef Al-Ghanim in ER-2",
            type: "warning", // orange
        },
    ],
};

export type BedStatus = "Occupied" | "Vacant" | "Reserved" | "Blocked" | "Cleaning";

export interface BedData {
    id: string;
    bedNumber: string; // e.g. "B-01"
    status: BedStatus;

    // Occupied Details
    patientName?: string;
    mrn?: string;
    doctorName?: string;
    admissionDate?: string;
    expectedDischargeDate?: string;
    isCritical?: boolean; // Label "Critical"

    // Blocked Details
    reason?: string;
}

export const ICU_WARD_BEDS: BedData[] = [
    {
        id: "1",
        bedNumber: "B-01",
        status: "Occupied",
        patientName: "Ahmed Al-Mutairi",
        mrn: "MRN-2501",
        doctorName: "Dr. Jeni Bennett",
        admissionDate: "20-10-2025",
        expectedDischargeDate: "20-10-2025",
        isCritical: true,
    },
    {
        id: "2",
        bedNumber: "B-01",
        status: "Vacant",
    },
    {
        id: "3",
        bedNumber: "B-01",
        status: "Reserved",
    },
    {
        id: "4",
        bedNumber: "B-01",
        status: "Reserved",
    },
    {
        id: "5",
        bedNumber: "B-01",
        status: "Occupied",
        patientName: "Ahmed Al-Mutairi",
        mrn: "MRN-2501",
        doctorName: "Dr. Jeni Bennett",
        admissionDate: "20-10-2025",
        expectedDischargeDate: "20-10-2025",
        isCritical: true,
    },
    {
        id: "6",
        bedNumber: "B-01",
        status: "Occupied",
        patientName: "Ahmed Al-Mutairi",
        mrn: "MRN-2501",
        doctorName: "Dr. Jeni Bennett",
        admissionDate: "20-10-2025",
        expectedDischargeDate: "20-10-2025",
        isCritical: true,
    },
    {
        id: "7",
        bedNumber: "B-01",
        status: "Occupied",
        patientName: "Ahmed Al-Mutairi",
        mrn: "MRN-2501",
        doctorName: "Dr. Jeni Bennett",
        admissionDate: "20-10-2025",
        expectedDischargeDate: "20-10-2025",
        isCritical: true,
    },
    {
        id: "8",
        bedNumber: "B-01",
        status: "Blocked",
        reason: "Equipment Issue",
    },
];
