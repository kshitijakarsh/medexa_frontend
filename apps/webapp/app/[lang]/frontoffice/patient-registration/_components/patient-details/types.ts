export interface PatientDetails {
    id: string
    mrn: string
    cprNid: string
    firstName: string
    lastName: string
    photoUrl?: string
    dob: string
    gender: 'male' | 'female' | 'other'
    bloodGroup: string
    maritalStatus: string
    nationality: string
    phone: string
    email: string
    address: string

    lastVisit?: Visit
    upcomingAppointments: Appointment[]
    diagnoses: Diagnosis[]
    activeOrders: Order[] // Keeping for backward compat if needed, or replace with specific lists
    activeProblems: Problem[]
    allergies: Allergy[]
    documents: PatientDocument[]
    medications: Medication[] // Basic list

    // New detailed lists
    visits: Visit[]
    invoices: Invoice[]
    labResults: LabResult[]
    radiologyReports: RadiologyReport[]
    prescriptions: Prescription[] // Grouped medications
}

export interface PatientDocument {
    id: string
    title: string
    type: 'Insurance' | 'Lab' | 'Identity' | 'Other'
    date: string
    thumbnailUrl?: string // In check real app this would be a URL
}

export interface Visit {
    id: string
    date: string
    time: string
    type: string
    token?: string
    status: 'Completed' | 'Active' | 'Cancelled'
    doctor: {
        name: string
        specialty?: string
    }
    department?: string
    ward?: string
    purpose?: string // For overview
    diagnosis?: string // For list view
}

export interface Invoice {
    id: string
    visitId: string
    visitType: string
    date: string
    totalAmount: number
    paidAmount: number
    outstandingAmount: number
    status: 'Paid' | 'Partial' | 'Unpaid'
}

export interface LabResult {
    id: string
    testName: string
    visitId: string
    visitType: string
    date: string
    status: 'Completed' | 'Pending'
    resultSummary: string
    fileUrl?: string
}

export interface RadiologyReport {
    id: string
    testName: string
    visitId: string
    visitType: string
    date: string
    status: 'Completed' | 'Pending'
    resultSummary: string
    fileUrl?: string
}

export interface Prescription {
    id: string
    doctorName: string
    date: string
    visitId: string
    visitType: string
    items: MedicationItem[]
}

export interface MedicationItem {
    id: string
    name: string
    dosage: string
    frequency: string
    duration: string
    notes: string
}

export interface Appointment {
    id: string
    dateTime: string
    doctor: string
    type: 'follow-up' | 'consultation' | 'checkup'
}

export interface Diagnosis {
    name: string
    code: string
    doctor: string
}

export interface Order {
    id: string
    type: 'laboratory' | 'radiology'
    details: string
    date: string
    status: 'pending' | 'scheduled' | 'completed'
}

export interface Problem {
    name: string
    status: string
}

export interface Allergy {
    id: string
    allergen: string
    severity: 'Mild' | 'Moderate' | 'Severe'
    visitId: string
    visitType: string
    reaction: string
    dateRecorded: string
    recordedBy: string
}

// Keeping basic Medication for backward compat if needed
export interface Medication {
    name: string
    dosage: string
}
