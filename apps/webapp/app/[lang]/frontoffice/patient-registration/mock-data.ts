import type { PatientDetails } from "./_components/patient-details/types"

// Mock function to generate patient details from patient entry
export const mockPatientDetails: Record<string, PatientDetails> = {
    "1": {
        id: "1",
        mrn: "MRN-12231",
        cprNid: "9988776655",
        firstName: "Aarav",
        lastName: "Nair",
        photoUrl: undefined,
        dob: "1995-08-12",
        gender: "male",
        bloodGroup: "B+",
        maritalStatus: "Married",
        nationality: "Indian",
        phone: "+998 877 6655",
        email: "aarav.nair@gmail.com",
        address: "Bengaluru, Karnataka, India",
        lastVisit: {
            id: "585658",
            date: "Nov 14, 2024",
            time: "10:30 AM",
            type: "OPD Visit",
            token: "C-001",
            status: "Completed",
            doctor: {
                name: "Dr. Mohammed Hassan",
                specialty: "Cardiology"
            },
            department: "Cardiology",
            ward: "ICU Ward _ I-01 _ B-01",
            purpose: "Stomach pain,"
        },
        upcomingAppointments: [
            {
                id: "1",
                dateTime: "2025-11-25T10:00:00",
                doctor: "Dr. Fatima Al-Zaabi",
                type: "follow-up"
            },
            {
                id: "2",
                dateTime: "2025-11-25T10:00:00",
                doctor: "Dr. Fatima Al-Zaabi",
                type: "follow-up"
            }
        ],
        diagnoses: [
            {
                name: "Hypertension, Essential",
                code: "I10",
                doctor: "Dr. Mohammed Hassan"
            },
            {
                name: "Type 2 Diabetes Mellitus",
                code: "E11.9",
                doctor: "Dr. Fatima Al-Zaabi"
            }
        ],
        activeOrders: [],
        activeProblems: [
            {
                name: "Hypertension - Well controlled",
                status: "Active"
            },
            {
                name: "Dyslipidemia - On treatment",
                status: "Active"
            }
        ],
        allergies: [
            {
                id: "1",
                allergen: "Penicillin",
                severity: "Moderate",
                visitId: "184723",
                visitType: "OPD Visit",
                reaction: "Rash, Itching",
                dateRecorded: "2025-01-15",
                recordedBy: "Nurse Vinay"
            },
            {
                id: "2",
                allergen: "Penicillin",
                severity: "Severe",
                visitId: "184723",
                visitType: "OPD Visit",
                reaction: "Rash, Itching",
                dateRecorded: "2025-01-15",
                recordedBy: "Nurse Vinay"
            }
        ],
        medications: [
            {
                name: "Amlodipine Oral",
                dosage: "5mg - Once daily"
            },
            {
                name: "Metformin",
                dosage: "500mg - Twice daily"
            }
        ],
        visits: [
            {
                id: "585658",
                type: "OPD Visit",
                date: "2025-11-19",
                time: "10:30 AM",
                doctor: { name: "Dr. Mohammed Hassan", specialty: "Cardiology" },
                diagnosis: "Hypertension",
                status: "Active",
                department: "Cardiology",
                ward: "ICU Ward _ I-01 _ B-01",
                token: "C-001",
                purpose: "Stomach pain,"
            },
            {
                id: "585658",
                type: "OPD Visit",
                date: "2025-11-19",
                time: "10:30 AM",
                doctor: { name: "Dr. Mohammed Hassan", specialty: "Cardiology" },
                diagnosis: "Hypertension",
                status: "Completed",
                department: "Cardiology"
            },
            {
                id: "585658",
                type: "OPD Visit",
                date: "2025-11-19",
                time: "10:30 AM",
                doctor: { name: "Dr. Mohammed Hassan", specialty: "Cardiology" },
                diagnosis: "Hypertension",
                status: "Completed",
                department: "Cardiology"
            }
        ],
        invoices: [
            {
                id: "INV-2025-001100",
                visitType: "OPD Visit",
                visitId: "184723",
                date: "2025-10-15",
                totalAmount: 450.00,
                paidAmount: 450.00,
                outstandingAmount: 0.00,
                status: "Paid"
            },
            {
                id: "INV-2025-001100",
                visitType: "IPD",
                visitId: "184723",
                date: "2025-10-15",
                totalAmount: 450.00,
                paidAmount: 360.00,
                outstandingAmount: 90.00, // Implied from image (paid is partial)
                status: "Partial"
            }
        ],
        labResults: [
            {
                id: "1",
                testName: "Complete Blood Count (CBC)",
                visitId: "184723",
                visitType: "OPD Visit",
                date: "2025-11-19",
                status: "Completed",
                resultSummary: "Abnormal - High LDL"
            },
            {
                id: "2",
                testName: "Complete Blood Count (CBC)",
                visitId: "184723",
                visitType: "OPD Visit",
                date: "2025-11-19",
                status: "Completed",
                resultSummary: "Abnormal - High LDL"
            }
        ],
        radiologyReports: [
            {
                id: "1",
                testName: "Chest X-Ray PA",
                visitId: "184723",
                visitType: "OPD Visit",
                date: "2025-11-19",
                status: "Completed",
                resultSummary: "Normal"
            },
            {
                id: "2",
                testName: "Chest X-Ray PA",
                visitId: "184723",
                visitType: "OPD Visit",
                date: "2025-11-19",
                status: "Completed",
                resultSummary: "Normal"
            }
        ],
        prescriptions: [
            {
                id: "1",
                doctorName: "Dr. Mohammed Hassan",
                date: "2025-11-25",
                visitId: "184723",
                visitType: "OPD Visit",
                items: [
                    {
                        id: "1",
                        name: "Amlodipine Oral",
                        dosage: "5mg",
                        frequency: "Once daily",
                        duration: "90 days",
                        notes: "Take in the morning"
                    },
                    {
                        id: "2",
                        name: "Amlodipine Oral",
                        dosage: "5mg",
                        frequency: "Once daily",
                        duration: "90 days",
                        notes: "Take in the morning"
                    },
                    {
                        id: "3",
                        name: "Amlodipine Oral",
                        dosage: "5mg",
                        frequency: "Once daily",
                        duration: "90 days",
                        notes: "Take in the morning"
                    }
                ]
            },
            {
                id: "2",
                doctorName: "Dr. Mohammed Hassan", // Empty card in image, adding structured empty-like data or second card
                date: "2025-11-25",
                visitId: "184723",
                visitType: "OPD Visit",
                items: []
            }
        ],
        documents: [
            {
                id: "1",
                title: "Insurance Card",
                type: "Insurance",
                date: "2024-01-01",
                thumbnailUrl: "insurance-card-placeholder"
            },
            {
                id: "2",
                title: "Lab Report - CBC",
                type: "Lab",
                date: "2025-11-19",
                thumbnailUrl: "lab-report-placeholder"
            },
            {
                id: "3",
                title: "Passport Copy",
                type: "Identity",
                date: "2020-05-15",
                thumbnailUrl: "passport-placeholder"
            }
        ]
    },
    "2": { // Updating minimal patient to match structure type
        id: "2",
        mrn: "MRN-1223",
        cprNid: "1122334455",
        firstName: "Nevaeh",
        lastName: "Simmons",
        photoUrl: undefined,
        dob: "1996-03-05",
        gender: "male",
        bloodGroup: "A-",
        maritalStatus: "Single",
        nationality: "American",
        phone: "(319) 555-0115",
        email: "nevaeh.simmons@example.com",
        address: "Iowa City, Iowa, USA",
        lastVisit: undefined,
        upcomingAppointments: [],
        diagnoses: [],
        activeOrders: [],
        activeProblems: [],
        allergies: [],
        medications: [],
        visits: [],
        invoices: [],
        labResults: [],
        radiologyReports: [],
        prescriptions: [],
        documents: []
    }
}

// Add default mock data for other patients
for (let i = 3; i <= 5; i++) {
    mockPatientDetails[i.toString()] = {
        ...mockPatientDetails["2"],
        id: i.toString(),
        mrn: `MRN-122${i}`,
        cprNid: `112233445${i}`,
        firstName: "Patient",
        lastName: `${i}`,
        dob: "1980-01-01",
        gender: "male",
        bloodGroup: "O+",
        maritalStatus: "Single",
        nationality: "Unknown",
        phone: "0000000000",
        address: "Unknown",
        email: "unknown@example.com",
        upcomingAppointments: [],
        diagnoses: [],
        activeOrders: [],
        activeProblems: [
            {
                name: "Hypertension",
                status: "Active"
            }
        ],
        allergies: [],
        medications: [],
        visits: [],
        invoices: [],
        labResults: [],
        radiologyReports: [],
        prescriptions: [],
        documents: []
    }
}
