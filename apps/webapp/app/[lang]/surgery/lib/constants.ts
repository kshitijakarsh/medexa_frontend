import {
  SurgeryStatus,
  SurgeryRecord,
  EmergencySurgery,
  CriticalAlert,
  SurgeryRequest,
  UrgencyLevel,
  DashboardData,
} from "./types";
import { SectionData, PreOpStat, PreOpSidebarItem, PreOpSidebarHeader } from "./types";



export const SURGERY_RECORDS: SurgeryRecord[] = [
  {
    otRoom: "OT-2",
    patient: {
      name: "Ganguli Rathod",
      mrn: "MRN 00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    time: "10:30 pm",
    procedure: "Total Knee Replacement",
    surgeon: "Dr. Kiran Madha",
    specialty: "Cardialgy",
    status: SurgeryStatus.IN_PROGRESS,
  },
  {
    otRoom: "OT-4",
    patient: {
      name: "Amelia Gray",
      mrn: "MRN 00325112",
      id: "C-ID 56590",
      avatarUrl: "/images/avatars/1.png",
    },
    time: "11:15 pm",
    procedure: "Cholecystectomy",
    surgeon: "Dr. Sarah Chen",
    specialty: "General Surgery",
    status: SurgeryStatus.PRE_OP,
  },
  {
    otRoom: "OT-1",
    patient: {
      name: "James Wilson",
      mrn: "MRN 00324771",
      id: "C-ID 56581",
      avatarUrl: "/images/avatars/1.png",
    },
    time: "09:00 pm",
    procedure: "Appendectomy",
    surgeon: "Dr. Kiran Madha",
    specialty: "Cardialgy",
    status: SurgeryStatus.IN_PROGRESS,
  },
  {
    otRoom: "OT-5",
    patient: {
      name: "Elena Rodriguez",
      mrn: "MRN 00324888",
      id: "C-ID 56588",
      avatarUrl: "/images/avatars/1.png",
    },
    time: "08:45 am",
    procedure: "Laparoscopy",
    surgeon: "Dr. Mike Ross",
    specialty: "Urology",
    status: SurgeryStatus.SCHEDULED,
  },
];

export const MOCK_REQUESTS: SurgeryRequest[] = [
  {
    id: "9",
    patient: {
      name: "Sarah Williams",
      mrn: "00324891",
      id: "APP-0539-17",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr. Vinay A",
      department: "General Surgery",
    },
    procedure: "Laparoscopic Cholecystectomy",
    surgeon: {
      name: "Dr. Vinay A",
      department: "General Surgery",
    },
    requestedFor: "2024-11-25 08:45",
    urgency: UrgencyLevel.Stat,
  },
  {
    id: "1",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Stat,
  },
  {
    id: "2",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Urgent,
  },
  {
    id: "3",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Urgent,
  },
  {
    id: "4",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Elective,
  },
  {
    id: "5",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Elective,
  },
  {
    id: "6",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Elective,
  },
  {
    id: "7",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Elective,
  },
  {
    id: "8",
    patient: {
      name: "Ganguli Rathod",
      mrn: "00324891",
      id: "C-ID 56585",
      avatarUrl: "/images/avatars/1.png",
    },
    requestedDoctor: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    procedure: "Total Knee Replacement",
    surgeon: {
      name: "Dr.Kiran Madha",
      department: "Cardialgy",
    },
    requestedFor: "2025-09-27 19:30",
    urgency: UrgencyLevel.Elective,
  },
];

export const EMERGENCY_SURGERIES: EmergencySurgery[] = [
  {
    name: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    procedure: "Hip Replacement",
    time: "09:00",
    room: "OT-001",
    avatar: "/images/avatars/1.png",
  },
  {
    name: "Marcus Aurelius",
    mrn: "MRN-2502",
    procedure: "Trauma Repair",
    time: "09:15",
    room: "OT-003",
    avatar: "/images/avatars/1.png",
  },
  {
    name: "Sarah Jenkins",
    mrn: "MRN-2503",
    procedure: "C-Section",
    time: "09:30",
    room: "OT-002",
    avatar: "/images/avatars/1.png",
  },
  {
    name: "Marcus Aurelius",
    mrn: "MRN-2502",
    procedure: "Trauma Repair",
    time: "09:15",
    room: "OT-003",
    avatar: "/images/avatars/1.png",
  },
];

export const CRITICAL_ALERTS: CriticalAlert[] = [
  {
    id: 1,
    type: "overrun",
    title: "OT-3 overrun by 45 mins",
    sub: "Yousef Al-Ghanim in OT-2",
  },
  {
    id: 2,
    type: "sterilization",
    title: "OT-5 equipment not sterilized",
    sub: "Urgent attention required",
  },
  {
    id: 3,
    type: "clearance",
    title: "Anesthesia clearance pending",
    sub: "Patient Manam Khan (MRN-2S03)",
  },
];

export const MOCK_DATA: DashboardData = {
  patient: {
    name: "Fatima Al-Sabah",
    mrn: "2501",
    age: 55,
    gender: "Female",
    idNumber: "283041234567",
    phone: "284-1979-0156289",
    email: "Abc@gmail.com",
    insuranceProvider: "Kuwait Insurance",
    insuranceStatus: "Active",
    avatarUrl: "/images/avatars/1.png",
  },
  surgery: {
    procedure: "Laparoscopic Cholecystectomy",
    department: "General Surgery",
    urgency: UrgencyLevel.Elective,
    estimatedDuration: "1.5 Hours",
    date: "22 March 2025",
    time: "10:30 AM",
    otRoom: "OT-02 (General Surgery)",
  },
  team: {
    teamName: "General Surgery – Laparoscopic Team A",
    surgeon: { name: "Dr. Ramesh Kulkarni", department: "Surgery" },
    assistants: [{ name: "Dr. Sneha Patil" }, { name: "Dr. Arjun Rao" }],
    anaesthetist: { name: "Dr. Neelima Shetty", department: "Anaesthesia" },
    scrubNurse: "Nurse Kavya M.",
    circulatingNurse: "Nurse Priya S.",
    otTechnician: "Mr. Suresh Naik",
  },
  activeProblems: [
    { id: "p1", name: "Hypertension", detail: "Well controlled", category: "problem" },
    { id: "p2", name: "Dyslipidemia", detail: "On treatment", category: "problem" },
    { id: "p3", name: "Allergic Rhinitis", detail: "Seasonal", category: "problem" },
  ],
  allergies: [
    { id: "a1", name: "Penicillin", detail: "Rash", category: "allergy" },
    { id: "a2", name: "Sulfa Drugs", detail: "Stevens-Johnson", category: "allergy" },
    { id: "a3", name: "Latex", detail: "Contact dermatitis", category: "allergy" },
  ],
  medications: [
    { name: "Amlodipine", detail: "5mg once daily", category: "medication" },
    { name: "Atorvastatin", detail: "20mg at bedtime", category: "medication" },
    { name: "Aspirin", detail: "75mg once daily", category: "medication" },
  ],
};


export const PREOP_SECTIONS: SectionData[] = [
  {
    title: "Required Investigations",
    statusSuffix: "24 Documents",
    items: [
      {
        kind: "check",
        data: {
          label: "CBC (Complete Blood Count)",
          status: "Ordered",
          type: "ordered",
          date: "12 Oct 2024 10:00 AM",
          testType: "Biochemistry",
          user: "Dr. Alex",
          category: "Laboratory Tests",
          urgency: "Stat",
        },
      },
      {
        kind: "check",
        data: { label: "K (Potassium)", status: "Completed", user: "Dr. Vinay A" },
      },
      {
        kind: "check",
        data: { label: "LFT (Liver Function Test)", status: "Processing" },
      },
    ],
  },
  {
    title: "Medical Clearances",
    statusSuffix: "ALL Categorized",
    items: [
      {
        kind: "check",
        data: {
          label: "General Clearance",
          status: "Completed",
          date: "Scheduled for Tomorrow : 17 Nov 2024 / 09:10 AM",
          actionOptions: "view-only",
        },
      },
      {
        kind: "check",
        data: {
          label: "Cardiac Clearance",
          status: "Completed",
          date: "Scheduled for Tomorrow : 17 Nov 2024 / 09:10 AM",
          actionOptions: "view-only",
        },
      },
    ],
  },
  {
    title: "Consents Required",
    statusSuffix: "All Consent List",
    items: [
      {
        kind: "check",
        data: {
          label: "Surgical Consent",
          status: "Completed",
          date: "Admin checked by Name : John / 12 Nov 2024",
        },
      },
      {
        kind: "check",
        data: {
          label: "Anesthesia Consent",
          status: "Completed",
          date: "Admin checked by Name : John / 12 Nov 2024",
        },
      },
      {
        kind: "pending",
        data: { label: "New Transfusion Consent", status: "Pending" },
      },
    ],
  },
  {
    title: "Nursing Orders (Pre-Op)",
    statusSuffix: "25 General",
    items: [
      {
        kind: "check",
        data: {
          label: "NPO Status for more 2 hours",
          status: "Completed",
          date: "Main Created by : userOne / 14 Nov 2024 : 09:10 AM",
          actionOptions: "view-only",
        },
      },
      {
        kind: "check",
        data: {
          label: "Jewellery removed & Handed Over",
          status: "Completed",
          date: "Sub : Created by : userTwo / 14 Nov 2024 : 09:10 AM",
          actionOptions: "view-only",
        },
      },
      {
        kind: "pending",
        data: { label: "Pre-medication Given as per order", status: "Pending" },
      },
    ],
  },
  {
    title: "Anaesthesia Plan (Pre-Op)",
    statusSuffix: "Finalized",
    items: [
      {
        kind: "check",
        data: {
          label: "General Anaesthesia Plan",
          status: "Completed",
          date: "Dr. Anesthetist / 15 Nov 2024",
          actionOptions: "view-only",
        },
      },
    ],
  },
  {
    title: "Equipment & Instruments",
    statusSuffix: "Ready",
    items: [
      {
        kind: "check",
        data: {
          label: "Laparoscopic Tower",
          status: "Completed",
          date: "Checked by OT Tech",
          actionOptions: "view-only",
        },
      },
      {
        kind: "check",
        data: {
          label: "Harmonic Scalpel",
          status: "Completed",
          date: "Checked by OT Tech",
          actionOptions: "view-only",
        },
      },
    ],
  },
  {
    title: "Implants & Consumables",
    statusSuffix: "In Stock",
    items: [
      {
        kind: "check",
        data: {
          label: "Mesh 15x15cm",
          status: "Completed",
          date: "Verified Inventory",
          actionOptions: "view-only",
        },
      },
      {
        kind: "check",
        data: {
          label: "Sutures 3-0",
          status: "Completed",
          date: "Verified Inventory",
          actionOptions: "view-only",
        },
      },
    ],
  },
  {
    title: "Blood & Resource Preparation",
    statusSuffix: "Reserved",
    items: [
      {
        kind: "check",
        data: {
          label: "PRBC 2 Units",
          status: "Ordered",
          date: "Blood Bank / 16 Nov 2024",
          actionOptions: "view-only",
        },
      },
    ],
  },
];

export const PREOP_STATS: PreOpStat[] = [
  {
    label: "Clinical Condition",
    completed: 1,
    total: 4,
  },
  {
    label: "Medical / Legal Clearance",
    completed: 6,
    total: 7,
  },
  {
    label: "Chest X-Ray Status",
    completed: 3,
    total: 4,
  },
  {
    label: "ECG status and type date",
    completed: 1,
    total: 4,
  },
];

export const PREOP_SIDEBAR_ITEMS: PreOpSidebarItem[] = [
  { label: "Required Investigations", completedCount: 6, pendingCount: 6 },
  { label: "Medical Clearances", completedCount: 6, pendingCount: 6 },
  { label: "Consents Required", completedCount: 6, pendingCount: 6 },
  { label: "Nursing Orders (Pre-Op)", completedCount: 6, pendingCount: 6 },
  { label: "Patient Preparation Requirements", completedCount: 6, pendingCount: 6 },
  { label: "Anaesthesia Plan (Pre-Op)", completedCount: 6, pendingCount: 6 },
  { label: "Equipment & Instruments", completedCount: 6, pendingCount: 6 },
  { label: "Implants & Consumables", completedCount: 6, pendingCount: 6 },
  { label: "Blood & Resource Preparation", completedCount: 6, pendingCount: 6 },
  { label: "Special Instructions to Team", completedCount: 6, pendingCount: 6 },
];

export const PREOP_SIDEBAR_HEADER: PreOpSidebarHeader = {
  title: "All Pre-Op Checklist",
  completedCount: 6,
  pendingCount: 6,
};

export const INTRAOP_SIDEBAR_ITEMS: PreOpSidebarItem[] = [
  { label: "Surgery Timing", completedCount: 6, pendingCount: 6 },
  { label: "Procedure Details", completedCount: 6, pendingCount: 6 },
  { label: "Complications", completedCount: 6, pendingCount: 6 },
  { label: "Blood Loss & Transfusion", completedCount: 6, pendingCount: 6 },
  { label: "Implants Used and Consumables Used", completedCount: 6, pendingCount: 6 },
  { label: "Specimens & Other Details", completedCount: 6, pendingCount: 6 },
  { label: "Surgeon's Additional Notes", completedCount: 6, pendingCount: 6 },
];

export const INTRAOP_SIDEBAR_HEADER: PreOpSidebarHeader = {
  title: "All Intra-Op Checklist",
  completedCount: 6,
  pendingCount: 6,
};

export const NURSE_SIDEBAR_ITEMS: PreOpSidebarItem[] = [
  { label: "Patient Reception in OT", completedCount: 6, pendingCount: 6 },
  { label: "Surgical Safety Checklist", completedCount: 6, pendingCount: 6 },
  { label: "Patient Positioning & Preparation", completedCount: 6, pendingCount: 6 },
  { label: "Time Out (Before Skin Incision)", completedCount: 6, pendingCount: 6 },
  { label: "Sign Out (Before Patient Leaves OT)", completedCount: 6, pendingCount: 6 },
  { label: "Implants and Consumables Used", completedCount: 6, pendingCount: 6 },
  { label: "Additional Nursing Notes", completedCount: 6, pendingCount: 6 },
];

export const NURSE_SIDEBAR_HEADER: PreOpSidebarHeader = {
  title: "All Nurse Check List",
  completedCount: 6,
  pendingCount: 6,
};

export const SURGERY_SIDEBAR_ITEMS: PreOpSidebarItem[] = [
  { label: "Surgery Timing", completedCount: 6, pendingCount: 6 },
  { label: "Procedure Details", completedCount: 6, pendingCount: 6 },
  { label: "Complications", completedCount: 6, pendingCount: 6 },
  { label: "Blood Loss & Transfusion", completedCount: 6, pendingCount: 6 },
  { label: "Implants Used and Consumables Used", completedCount: 6, pendingCount: 6 },
  { label: "Specimens & Other Details", completedCount: 6, pendingCount: 6 },
  { label: "Surgeon's Additional Notes", completedCount: 6, pendingCount: 6 },
];

export const SURGERY_SIDEBAR_HEADER: PreOpSidebarHeader = {
  title: "All Surgery Checklist",
  completedCount: 6,
  pendingCount: 6,
};