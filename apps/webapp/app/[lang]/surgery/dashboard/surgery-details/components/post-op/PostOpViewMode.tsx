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

interface PostOpViewModeProps {
    data: any;
    isLoading: boolean;
}

export const PostOpViewMode = ({ data, isLoading }: PostOpViewModeProps) => {
    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading post-op details...</div>;
    }

    const displayData = {
        disposition: {
            transferTo: data?.disposition?.transfer_to || "-",
            floor: data?.disposition?.floor || "-",
            wardUnit: data?.disposition?.ward_unit || "-",
            bedNumber: data?.disposition?.bed_number || "-",
            transferTime: data?.disposition?.transfer_time || "-",
            nurse: data?.disposition?.nurse || "-",
        },
        monitoring: {
            frequency: data?.monitoring?.frequency || "-",
            duration: data?.monitoring?.duration || "-",
            special: data?.monitoring?.special || "-",
        },
        activity: {
            level: data?.activity?.level || "-",
            plan: data?.activity?.plan || "-",
        },
        diet: {
            orders: data?.diet?.orders || "-",
            time: data?.diet?.time || "-",
            fluidRestriction: data?.diet?.fluid_restriction ? "Yes" : "No",
            instructions: data?.diet?.instructions || "-",
        },
        pain: {
            frequency: data?.pain?.frequency || "-",
            targetScore: data?.pain?.target_score || "-",
        },
        drains: {
            catheterInSitu: data?.drains?.catheter_in_situ ? "Yes" : "No",
            catheterPlan: data?.drains?.catheter_plan || "-",
            ngtInSitu: data?.drains?.ngt_in_situ ? "Yes" : "No",
            ngtManagement: data?.drains?.ngt_management || "-",
        },
        specialInstructions: data?.special_instructions || "-",
        followUp: {
            doctor: data?.follow_up?.doctor || "-",
            date: data?.follow_up?.date || "-",
            time: data?.follow_up?.time || "-",
        },
    };

    const nurseOrders = data?.nurse_orders || [];

    return (
        <div className="space-y-4">
            {/* Disposition / Transfer */}
            <DetailSection title="Disposition / Transfer">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <InfoField label="Transfer To" value={displayData.disposition.transferTo} />
                    <InfoField label="Floor" value={displayData.disposition.floor} />
                    <InfoField label="Ward / Unit" value={displayData.disposition.wardUnit} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Bed Number" value={displayData.disposition.bedNumber} />
                    <InfoField label="Transfer Time" value={displayData.disposition.transferTime} />
                    <InfoField label="Nurse" value={displayData.disposition.nurse} />
                </div>
            </DetailSection>

            {/* Vital Signs Monitoring */}
            <DetailSection title="Vital Signs Monitoring">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Monitoring Frequency" value={displayData.monitoring.frequency} />
                    <InfoField label="Duration" value={displayData.monitoring.duration} />
                    <InfoField label="Special Monitoring" value={displayData.monitoring.special} />
                </div>
            </DetailSection>

            {/* Activity & Mobilization */}
            <DetailSection title="Activity & Mobilization">
                <div className="space-y-4">
                    <InfoField label="Activity Level" value={displayData.activity.level} />
                    <InfoField label="Mobilization Plan" value={displayData.activity.plan} />
                </div>
            </DetailSection>

            {/* Diet & Oral Fluids */}
            <DetailSection title="Diet & Oral Fluids">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label="Diet Orders" value={displayData.diet.orders} />
                    <InfoField label="Time (Hour)" value={displayData.diet.time} />
                </div>
                <div className="space-y-4">
                    <InfoField label="Fluid Restriction" value={displayData.diet.fluidRestriction} />
                    <InfoField label="Instructions" value={displayData.diet.instructions} />
                </div>
            </DetailSection>

            {/* Nurse Order Section */}
            <SurgeryDataTable
                title="Nurse Order"
                columns={NURSE_ORDER_COLUMNS}
                data={nurseOrders}
            />

            {/* Pain Management */}
            <DetailSection title="Pain Management">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Pain Assessment Frequency" value={displayData.pain.frequency} />
                    <InfoField label="Target Pain Score (0-10)" value={displayData.pain.targetScore} />
                </div>
            </DetailSection>

            {/* Drains, Tubes & Catheters */}
            <DetailSection title="Drains, Tubes & Catheters">
                <div className="space-y-4">
                    <InfoField label="Urinary Catheter in situ" value={displayData.drains.catheterInSitu} />
                    <InfoField label="Catheter Removal Plan" value={displayData.drains.catheterPlan} />
                    <InfoField label="NGT (Nasogastric Tube) in situ" value={displayData.drains.ngtInSitu} />
                    <InfoField label="NGT Management" value={displayData.drains.ngtManagement} />
                </div>
            </DetailSection>

            {/* Special Instructions */}
            <DetailSection title="Special Instructions">
                <InfoField label="Additional Special Instructions" value={displayData.specialInstructions} />
            </DetailSection>

            {/* Follow-Up & Reviews */}
            <DetailSection title="Follow-Up & Reviews">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Doctor" value={displayData.followUp.doctor} />
                    <InfoField label="Date" value={displayData.followUp.date} />
                    <InfoField label="Time" value={displayData.followUp.time} />
                </div>
            </DetailSection>
        </div>
    );
};
