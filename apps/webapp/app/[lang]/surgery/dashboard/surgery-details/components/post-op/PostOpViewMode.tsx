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
import { useDictionary } from "@/i18n/use-dictionary";

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
    noRecordsText?: string;
}

const SurgeryDataTable = <T,>({
    title,
    columns,
    data,
    className,
    striped = true,
    noRecordsText = "No records found",
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
                                    {noRecordsText}
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

interface PostOpViewModeProps {
    data: any;
    isLoading: boolean;
}

export const PostOpViewMode = ({ data, isLoading }: PostOpViewModeProps) => {
    const dict = useDictionary();
    const postOp = dict.pages.surgery.surgeryDetails.postOp;

    const NURSE_ORDER_COLUMNS: TableColumn<any>[] = [
        { key: "orderType", label: postOp.table.orderType },
        { key: "details", label: postOp.table.details },
        {
            key: "urgency",
            label: postOp.table.urgency,
            render: (row) => {
                let color = "text-slate-500";
                if (row.urgency === "Stat") color = "text-red-500";
                else if (row.urgency === "Urgent") color = "text-orange-500";
                return <span className={`font-medium ${color}`}>{row.urgency}</span>;
            },
        },
        { key: "frequency", label: postOp.table.frequency },
        { key: "startDateTime", label: postOp.table.startDateTime },
        { key: "orderedBy", label: postOp.table.orderedBy },
        {
            key: "status",
            label: postOp.table.status,
            render: (row) => (
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                    {row.status}
                </span>
            ),
        },
    ];

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">{postOp.loading}</div>;
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
            <DetailSection title={postOp.sections.disposition}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <InfoField label={postOp.fields.transferTo} value={displayData.disposition.transferTo} />
                    <InfoField label={postOp.fields.floor} value={displayData.disposition.floor} />
                    <InfoField label={postOp.fields.wardUnit} value={displayData.disposition.wardUnit} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label={postOp.fields.bedNumber} value={displayData.disposition.bedNumber} />
                    <InfoField label={postOp.fields.transferTime} value={displayData.disposition.transferTime} />
                    <InfoField label={postOp.fields.nurse} value={displayData.disposition.nurse} />
                </div>
            </DetailSection>

            {/* Vital Signs Monitoring */}
            <DetailSection title={postOp.sections.vitalSigns}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label={postOp.fields.monitoringFrequency} value={displayData.monitoring.frequency} />
                    <InfoField label={postOp.fields.duration} value={displayData.monitoring.duration} />
                    <InfoField label={postOp.fields.specialMonitoring} value={displayData.monitoring.special} />
                </div>
            </DetailSection>

            {/* Activity & Mobilization */}
            <DetailSection title={postOp.sections.activity}>
                <div className="space-y-4">
                    <InfoField label={postOp.fields.activityLevel} value={displayData.activity.level} />
                    <InfoField label={postOp.fields.mobilizationPlan} value={displayData.activity.plan} />
                </div>
            </DetailSection>

            {/* Diet & Oral Fluids */}
            <DetailSection title={postOp.sections.diet}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label={postOp.fields.dietOrders} value={displayData.diet.orders} />
                    <InfoField label={postOp.fields.timeHour} value={displayData.diet.time} />
                </div>
                <div className="space-y-4">
                    <InfoField label={postOp.fields.fluidRestriction} value={displayData.diet.fluidRestriction} />
                    <InfoField label={postOp.fields.instructions} value={displayData.diet.instructions} />
                </div>
            </DetailSection>

            {/* Nurse Order Section */}
            <SurgeryDataTable
                title={postOp.sections.nurseOrder}
                columns={NURSE_ORDER_COLUMNS}
                data={nurseOrders}
                noRecordsText={postOp.noRecords}
            />

            {/* Pain Management */}
            <DetailSection title={postOp.sections.painManagement}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label={postOp.fields.painAssessmentFrequency} value={displayData.pain.frequency} />
                    <InfoField label={postOp.fields.targetPainScore} value={displayData.pain.targetScore} />
                </div>
            </DetailSection>

            {/* Drains, Tubes & Catheters */}
            <DetailSection title={postOp.sections.drains}>
                <div className="space-y-4">
                    <InfoField label={postOp.fields.urinaryCatheter} value={displayData.drains.catheterInSitu} />
                    <InfoField label={postOp.fields.catheterRemovalPlan} value={displayData.drains.catheterPlan} />
                    <InfoField label={postOp.fields.ngt} value={displayData.drains.ngtInSitu} />
                    <InfoField label={postOp.fields.ngtManagement} value={displayData.drains.ngtManagement} />
                </div>
            </DetailSection>

            {/* Special Instructions */}
            <DetailSection title={postOp.sections.specialInstructions}>
                <InfoField label={postOp.fields.additionalSpecialInstructions} value={displayData.specialInstructions} />
            </DetailSection>

            {/* Follow-Up & Reviews */}
            <DetailSection title={postOp.sections.followUp}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label={postOp.fields.doctor} value={displayData.followUp.doctor} />
                    <InfoField label={postOp.fields.date} value={displayData.followUp.date} />
                    <InfoField label={postOp.fields.time} value={displayData.followUp.time} />
                </div>
            </DetailSection>
        </div>
    );
};
