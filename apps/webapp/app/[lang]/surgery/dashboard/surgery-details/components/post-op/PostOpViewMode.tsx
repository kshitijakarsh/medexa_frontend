"use client";

import React from "react";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@workspace/ui/components/table";

// --- Local SurgeryDataTable Component (View Version) ---

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T, index?: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface SurgeryDataTableProps<T> {
    title?: string;
    columns: TableColumn<T>[];
    data: T[];
    className?: string;
    striped?: boolean;
}

const SurgeryDataTable = <T,>({
    title,
    columns,
    data,
    className,
    striped = true,
}: SurgeryDataTableProps<T>) => {
    return (
        <Card className={`shadow-none border-0 overflow-hidden ${className || ""}`}>
            {/* Header */}
            {title && (
                <CardHeader className="flex flex-row items-center justify-between p-4 bg-white">
                    <CardTitle className="text-lg font-medium text-slate-900">{title}</CardTitle>
                </CardHeader>
            )}

            {/* Table */}
            <CardContent className="p-0 border-t border-slate-100">
                <Table>
                    <TableHeader className="bg-[#F8FAFC]">
                        <TableRow className="hover:bg-transparent border-b-0">
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key.toString()}
                                    className={`py-4 text-xs ${col.headerClassName || ""}`}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center py-8 text-xs"
                                >
                                    No records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 ${striped && index % 2 !== 0 ? "bg-[#F4FAFF]" : "bg-white"
                                        }`}
                                >
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key.toString()}
                                            className={`py-4 text-xs ${col.className || ""}`}
                                        >
                                            {col.render
                                                ? col.render(row, index)
                                                : (row[col.key as keyof T] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

// --- Nurse Order Data & Columns ---

const MOCK_NURSE_ORDER_DATA = [
    {
        id: "1",
        orderType: "IV Fluids",
        details: "Normal Saline 1000mL at 100mL/hr",
        urgency: "Routine",
        frequency: "Once",
        startDateTime: "2025-09-27 19:30",
        orderedBy: "Dr. Kumar",
        status: "Ordered",
    },
    {
        id: "2",
        orderType: "Medications",
        details: "Paracetamol 1g IV q6h",
        urgency: "Urgent",
        frequency: "Daily",
        startDateTime: "2025-09-27 19:30",
        orderedBy: "Dr. Kumar",
        status: "Ordered",
    },
    {
        id: "3",
        orderType: "Wound Dressing",
        details: "Dressing change on surgical site",
        urgency: "Stat",
        frequency: "Daily",
        startDateTime: "2025-09-27 19:30",
        orderedBy: "Dr. Kumar",
        status: "Ordered",
    },
];

const NURSE_ORDER_COLUMNS: TableColumn<any>[] = [
    { key: "orderType", label: "Order Type" },
    { key: "details", label: "Details / Instructions" },
    {
        key: "urgency",
        label: "Urgency",
        render: (row) => {
            let color = "text-slate-500";
            if (row.urgency === "Stat") color = "text-red-500";
            else if (row.urgency === "Urgent") color = "text-orange-500";
            return <span className={`font-medium ${color}`}>{row.urgency}</span>;
        },
    },
    { key: "frequency", label: "Frequency" },
    { key: "startDateTime", label: "Start Date Time" },
    { key: "orderedBy", label: "Ordered By" },
    {
        key: "status",
        label: "Status",
        render: (row) => (
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                {row.status}
            </span>
        ),
    },
];

// Mock data for view mode
const MOCK_POSTOP_DATA = {
    disposition: {
        transferTo: "Surgical Ward",
        floor: "2nd Floor",
        wardUnit: "Ward A",
        bedNumber: "Bed 12",
        transferTime: "10:30",
        nurse: "Nurse John",
    },
    monitoring: {
        frequency: "Every 30 minutes",
        duration: "24 hours",
        special: "ECG",
    },
    activity: {
        level: "Mobilize with assistance",
        plan: "Encourage early mobilization with help from nursing staff. Monitor for dizziness.",
    },
    diet: {
        orders: "Soft diet",
        time: "4 hours",
        fluidRestriction: "Yes",
        instructions: "Maximum intake 1500mL/day. Monitor intake/output strictly.",
    },
    pain: {
        frequency: "Every 4 hours",
        targetScore: "2",
    },
    drains: {
        catheterInSitu: "Yes",
        catheterPlan: "Remove catheter once urine output is stable and patient is mobilizing.",
        ngtInSitu: "No",
        ngtManagement: "Monitor NGT site for any leakage if removed.",
    },
    specialInstructions: "Keep surgical site clean and dry. Watch for signs of excessive bleeding.",
    followUp: {
        doctor: "Dr. Vinay",
        date: "2025-10-05",
        time: "08:30",
    },
};

export const PostOpViewMode = () => {
    return (
        <div className="space-y-4">
            {/* Disposition / Transfer */}
            <DetailSection title="Disposition / Transfer">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <InfoField label="Transfer To" value={MOCK_POSTOP_DATA.disposition.transferTo} />
                    <InfoField label="Floor" value={MOCK_POSTOP_DATA.disposition.floor} />
                    <InfoField label="Ward / Unit" value={MOCK_POSTOP_DATA.disposition.wardUnit} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Bed Number" value={MOCK_POSTOP_DATA.disposition.bedNumber} />
                    <InfoField label="Transfer Time" value={MOCK_POSTOP_DATA.disposition.transferTime} />
                    <InfoField label="Nurse" value={MOCK_POSTOP_DATA.disposition.nurse} />
                </div>
            </DetailSection>

            {/* Vital Signs Monitoring */}
            <DetailSection title="Vital Signs Monitoring">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Monitoring Frequency" value={MOCK_POSTOP_DATA.monitoring.frequency} />
                    <InfoField label="Duration" value={MOCK_POSTOP_DATA.monitoring.duration} />
                    <InfoField label="Special Monitoring" value={MOCK_POSTOP_DATA.monitoring.special} />
                </div>
            </DetailSection>

            {/* Activity & Mobilization */}
            <DetailSection title="Activity & Mobilization">
                <div className="space-y-4">
                    <InfoField label="Activity Level" value={MOCK_POSTOP_DATA.activity.level} />
                    <InfoField label="Mobilization Plan" value={MOCK_POSTOP_DATA.activity.plan} />
                </div>
            </DetailSection>

            {/* Diet & Oral Fluids */}
            <DetailSection title="Diet & Oral Fluids">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label="Diet Orders" value={MOCK_POSTOP_DATA.diet.orders} />
                    <InfoField label="Time (Hour)" value={MOCK_POSTOP_DATA.diet.time} />
                </div>
                <div className="space-y-4">
                    <InfoField label="Fluid Restriction" value={MOCK_POSTOP_DATA.diet.fluidRestriction} />
                    <InfoField label="Instructions" value={MOCK_POSTOP_DATA.diet.instructions} />
                </div>
            </DetailSection>

            {/* Nurse Order Section */}
            <SurgeryDataTable
                title="Nurse Order"
                columns={NURSE_ORDER_COLUMNS}
                data={MOCK_NURSE_ORDER_DATA}
            />

            {/* Pain Management */}
            <DetailSection title="Pain Management">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Pain Assessment Frequency" value={MOCK_POSTOP_DATA.pain.frequency} />
                    <InfoField label="Target Pain Score (0-10)" value={MOCK_POSTOP_DATA.pain.targetScore} />
                </div>
            </DetailSection>

            {/* Drains, Tubes & Catheters */}
            <DetailSection title="Drains, Tubes & Catheters">
                <div className="space-y-4">
                    <InfoField label="Urinary Catheter in situ" value={MOCK_POSTOP_DATA.drains.catheterInSitu} />
                    <InfoField label="Catheter Removal Plan" value={MOCK_POSTOP_DATA.drains.catheterPlan} />
                    <InfoField label="NGT (Nasogastric Tube) in situ" value={MOCK_POSTOP_DATA.drains.ngtInSitu} />
                    <InfoField label="NGT Management" value={MOCK_POSTOP_DATA.drains.ngtManagement} />
                </div>
            </DetailSection>

            {/* Special Instructions */}
            <DetailSection title="Special Instructions">
                <InfoField label="Additional Special Instructions" value={MOCK_POSTOP_DATA.specialInstructions} />
            </DetailSection>

            {/* Follow-Up & Reviews */}
            <DetailSection title="Follow-Up & Reviews">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Doctor" value={MOCK_POSTOP_DATA.followUp.doctor} />
                    <InfoField label="Date" value={MOCK_POSTOP_DATA.followUp.date} />
                    <InfoField label="Time" value={MOCK_POSTOP_DATA.followUp.time} />
                </div>
            </DetailSection>
        </div>
    );
};
