"use client";

import React from "react";
import { VipCrownBadge } from "@/components/common/pasient-card/vip-crown-badge";
import {
    MessagesSquare,
    NotepadText,
    CircleUser,
    ArrowLeft,
    Eye,
} from "lucide-react";
import { AppSelect } from "@/components/common/app-select";
import { Button } from "@workspace/ui/components/button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { Patient } from "@/app/[lang]/surgery/_lib/types";
import PatientBanner from "@/app/[lang]/surgery/dashboard/surgery-details/components/shared/PatientBanner";
import PatientCard from "@/app/[lang]/surgery/dashboard/_components/UI/PatientCard";
import AddSurgeryModal from "@/app/[lang]/surgery/dashboard/surgery-details/components/shared/AddSurgeryModal";
import SurgeryDetailsModal from "@/app/[lang]/surgery/dashboard/surgery-details/components/shared/SurgeryDetailsModal";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { ResponsiveDataTable, Column } from "@/components/common/data-table/ResponsiveDataTable";

// --- Mock Data ---

const PATIENT_DATA: Patient = {
    id: "1",
    name: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    age: 55,
    gender: "Male",
    phone: "283041234567",
    insuranceProvider: "Kuwait Insurance",
    insuranceStatus: "Active",
    avatarUrl: "/images/avatars/1.png",
};

const SIDEBAR_ITEMS = {
    emergency: [
        { id: 1, name: "Fatima Al-Sabah", mrn: "MRN-2501", time: "09:00", room: "T-101", procedure: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
        { id: 2, name: "Fatima Al-Sabah", mrn: "MRN-2501", time: "09:00", room: "T-101", procedure: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    ],
    vip: [
        { id: 3, name: "Fatima Al-Sabah", mrn: "MRN-2501", time: "09:00", room: "T-101", procedure: "New", status: "Waiting", avatar: "/images/avatars/1.png", isVip: true },
    ],
    general: [
        { id: 4, name: "Fatima Al-Sabah", mrn: "MRN-2501", time: "09:00", room: "T-101", procedure: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
        { id: 5, name: "Fatima Al-Sabah", mrn: "MRN-2501", time: "09:00", room: "T-101", procedure: "Follow Up", status: "Waiting", avatar: "/images/avatars/1.png" },
    ]
};

interface Surgery {
    id: number;
    surgeryType: string;
    department: string;
    requestedDate: string;
    doctor: string;
    urgency: "Elective" | "Urgent" | "Emergency";
    status: "Ordered" | "Completed" | "In Progress" | "Cancelled";
}

const MOCK_SURGERIES: Surgery[] = [
    {
        id: 1,
        surgeryType: "Knee Replacement",
        department: "Orthopedics",
        requestedDate: "2025-09-27 19:30",
        doctor: "Dr. Vinay",
        urgency: "Elective",
        status: "Ordered",
    },
    {
        id: 2,
        surgeryType: "Cholecystectomy",
        department: "Orthopedics",
        requestedDate: "2025-09-27 19:30",
        doctor: "Dr. Vinay",
        urgency: "Urgent",
        status: "Completed",
    },
];

export default function NewSurgeryPage() {
    const [activeTab, setActiveTab] = React.useState("Surgery");
    const [appointmentFilter, setAppointmentFilter] = React.useState("all");
    const [alertsCount, setAlertsCount] = React.useState(8);
    const [isAddSurgeryModalOpen, setIsAddSurgeryModalOpen] = React.useState(false);
    const [surgeries, setSurgeries] = React.useState<Surgery[]>(MOCK_SURGERIES);
    const [selectedSurgery, setSelectedSurgery] = React.useState<Surgery | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);

    const handleViewSurgeryDetails = (surgery: Surgery) => {
        setSelectedSurgery(surgery);
        setIsDetailsModalOpen(true);
    };

    const getUrgencyClass = (urgency: Surgery["urgency"]) => {
        switch (urgency) {
            case "Elective":
                return "text-blue-500";
            case "Urgent":
                return "text-orange-500";
            case "Emergency":
                return "text-red-500";
            default:
                return "text-slate-500";
        }
    };

    const surgeryColumns: Column<Surgery>[] = [
        {
            key: "id",
            label: "SI No",
            render: (_, index) => <span>{(index ?? 0) + 1}</span>,
        },
        {
            key: "surgeryType",
            label: "Surgery Type",
        },
        {
            key: "department",
            label: "Department",
        },
        {
            key: "requestedDate",
            label: "Requested",
        },
        {
            key: "doctor",
            label: "Doctor",
        },
        {
            key: "urgency",
            label: "Urgency",
            render: (row) => (
                <span className={`font-medium ${getUrgencyClass(row.urgency)}`}>
                    {row.urgency}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusPill status={row.status} />,
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => handleViewSurgeryDetails(row)}
                >
                    <Eye size={18} />
                </button>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-1">
                <div className="bg-blue-500 p-1 rounded-md">
                    <ArrowLeft size={20} className="text-white" />
                </div>
                <h2>Today Appointments</h2>
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex gap-4 flex-1 overflow-hidden">
                <div className="w-80 shrink-0 flex flex-col gap-4 rounded-2xl h-full overflow-y-auto">
                    <div className="flex justify-between items-center gap-28">
                        <AppSelect
                            placeholder="All"
                            value={appointmentFilter}
                            onChange={setAppointmentFilter}
                            options={[
                                { label: "All", value: "all" },
                                { label: "Emergency", value: "emergency" },
                                { label: "VIP", value: "vip" },
                                { label: "General", value: "general" },
                            ]}
                            triggerClassName="bg-slate-50 border-slate-200 text-xs font-medium text-slate-600"
                        />

                        <div>
                            <h1 className="whitespace-nowrap text-red-400 text-sm">{alertsCount} Alerts</h1>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div>
                            <h3 className="text-sm text-rose-500 mb-2">Emergency Appointments</h3>
                            {SIDEBAR_ITEMS.emergency.map(item => (
                                <div key={item.id} className="mb-3">
                                    <PatientCard
                                        avatar={item.avatar}
                                        name={item.name}
                                        mrn={item.mrn}
                                        procedure={item.procedure}
                                        time={item.time}
                                        room={item.room}
                                        status={item.status}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                <VipCrownBadge size={14} />
                                <h3 className="text-sm text-amber-500">VIP Appointments</h3>
                            </div>
                            {SIDEBAR_ITEMS.vip.map(item => (
                                <div key={item.id} className="mb-3">
                                    <PatientCard
                                        avatar={item.avatar}
                                        name={item.name}
                                        mrn={item.mrn}
                                        procedure={item.procedure}
                                        time={item.time}
                                        room={item.room}
                                        status={item.status}
                                        vip={item.isVip}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="text-sm mb-2">General Appointments</h3>
                            {SIDEBAR_ITEMS.general.map(item => (
                                <div key={item.id} className="mb-3">
                                    <PatientCard
                                        avatar={item.avatar}
                                        name={item.name}
                                        mrn={item.mrn}
                                        procedure={item.procedure}
                                        time={item.time}
                                        room={item.room}
                                        status={item.status}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="text-blue-500 text-xs font-medium mt-auto flex items-center justify-center gap-1">
                        View All <span className="text-lg">→</span>
                    </button>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <PatientBanner
                        patient={PATIENT_DATA}
                        className=""
                        actionItems={[
                            {
                                label: "Finish Consultation",
                                icon: <MessagesSquare size={16} />,
                                position: "top-right",
                                variant: "primary",
                                onClick: () => { }, // Add handler if needed
                            },
                            {
                                label: "View Details",
                                icon: <NotepadText size={16} />,
                                position: "top-right",
                                variant: "outline",
                                onClick: () => { },
                            },
                            {
                                label: "Refer Doctor",
                                icon: <CircleUser size={16} />,
                                position: "top-right",
                                variant: "outline",
                                onClick: () => { },
                            },
                        ]}
                    />

                    <div className="mt-2 border-t border-slate-100 pt-2">
                        <DynamicTabs
                            tabs={[
                                { key: "Visit purpose", label: "Visit purpose" },
                                { key: "SOAP Notes", label: "SOAP Notes" },
                                { key: "Vitals", label: "Vitals" },
                                { key: "Prescription", label: "Prescription" },
                                { key: "Diagnostic Orders", label: "Diagnostic Orders" },
                                { key: "Attachments", label: "Attachments" },
                                { key: "Visits / Encounters", label: "Visits / Encounters" },
                                { key: "Nurse Note", label: "Nurse Note" },
                                { key: "Surgery", label: "Surgery" },
                                { key: "Clinical Notes", label: "Clinical Notes" },
                            ]}
                            defaultTab={activeTab}
                            onChange={setActiveTab}
                            variant="scroll"
                        />
                    </div>


                    {/* Tab Content Area */}
                    <div className="bg-white rounded-3xl p-4 flex-1 overflow-y-auto relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Surgery</h2>
                            <Button
                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4 h-8 text-sm flex items-center gap-1"
                                onClick={() => setIsAddSurgeryModalOpen(true)}
                            >
                                Add Surgery
                            </Button>
                        </div>

                        {surgeries.length > 0 ? (
                            <ResponsiveDataTable
                                columns={surgeryColumns}
                                data={surgeries}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[400px] text-center">
                                <div className="mb-4 text-slate-300">
                                    <svg
                                        width="64"
                                        height="64"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="6" width="20" height="8" rx="1" />
                                        <path d="M17 14v7" />
                                        <path d="M7 14v7" />
                                        <path d="M17 3v3" />
                                        <path d="M7 3v3" />
                                        <path d="M10 14v4" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 mb-6">No surgeries have been prescribed yet.</p>
                                <Button
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 h-10 font-medium"
                                    onClick={() => setIsAddSurgeryModalOpen(true)}
                                >
                                    Add Surgery
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Surgery Modal */}
            <AddSurgeryModal
                open={isAddSurgeryModalOpen}
                onClose={() => setIsAddSurgeryModalOpen(false)}
            />

            {/* Surgery Details Modal */}
            <SurgeryDetailsModal
                open={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                surgery={selectedSurgery}
            />
        </div>
    )
}