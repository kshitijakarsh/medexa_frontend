"use client";

import React from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@workspace/ui/components/table";
import { MoreVertical, Plus, Clock } from "lucide-react";
import NewButton from "@/components/common/new-button";
import AppDatePicker from "@/components/common/app-date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const paddedHours = hours.toString().padStart(2, "0");
    return `${paddedHours}:${minutes}`;
});

// Options for select fields
const PAIN_LEVEL_OPTIONS = [
    { value: "none", label: "None (0)" },
    { value: "mild", label: "Mild (1-3)" },
    { value: "moderate", label: "Moderate (4-6)" },
    { value: "severe", label: "Severe (7-10)" },
];

const DIET_OPTIONS = [
    { value: "npo", label: "NPO" },
    { value: "clear_liquids", label: "Clear liquids" },
    { value: "soft_diet", label: "Soft diet" },
    { value: "regular_diet", label: "Regular diet" },
];

const MOBILITY_OPTIONS = [
    { value: "2h", label: "2 hours" },
    { value: "4h", label: "4 hours" },
    { value: "6h", label: "6 hours" },
];

const WOUND_OPTIONS = [
    { value: "clean_dry", label: "Clean & Dry" },
    { value: "mild_drainage", label: "Mild Drainage" },
    { value: "infected", label: "Signs of Infection" },
];

const TRANSFER_TO_OPTIONS = [
    { value: "pacu", label: "PACU" },
    { value: "icu", label: "ICU" },
    { value: "surgical_ward", label: "Surgical Ward" },
    { value: "medical_ward", label: "Medical Ward" },
];

const FLOOR_OPTIONS = [
    { value: "ground", label: "Ground Floor" },
    { value: "1", label: "1st Floor" },
    { value: "2", label: "2nd Floor" },
    { value: "3", label: "3rd Floor" },
];

const WARD_OPTIONS = [
    { value: "a", label: "Ward A" },
    { value: "b", label: "Ward B" },
    { value: "icu_1", label: "ICU-1" },
    { value: "icu_2", label: "ICU-2" },
];

const BED_OPTIONS = [
    { value: "01", label: "Bed 01" },
    { value: "12", label: "Bed 12" },
    { value: "25", label: "Bed 25" },
];

const NURSE_OPTIONS = [
    { value: "n_asha", label: "Nurse Asha" },
    { value: "n_john", label: "Nurse John" },
    { value: "n_priya", label: "Nurse Priya" },
];

const MONITORING_FREQUENCY_OPTIONS = [
    { value: "q15m", label: "Every 15 minutes" },
    { value: "q30m", label: "Every 30 minutes" },
    { value: "hourly", label: "Hourly" },
    { value: "q4h", label: "4-hourly" },
];

const DURATION_OPTIONS = [
    { value: "2h", label: "2 hours" },
    { value: "6h", label: "6 hours" },
    { value: "24h", label: "24 hours" },
];

const SPECIAL_MONITORING_OPTIONS = [
    { value: "bp", label: "BP" },
    { value: "spo2", label: "SpO₂" },
    { value: "ecg", label: "ECG" },
    { value: "none", label: "None" },
];

const ACTIVITY_LEVEL_OPTIONS = [
    { value: "bed_rest", label: "Bed rest" },
    { value: "bed_rest_bathroom", label: "Bed rest with bathroom privileges" },
    { value: "mobilize_assist", label: "Mobilize with assistance" },
    { value: "mobilize_as_tolerated", label: "Mobilize as tolerated" },
];

const DOCTOR_OPTIONS = [
    { value: "dr_kumar", label: "Dr. Kumar" },
    { value: "dr_vinay", label: "Dr. Vinay" },
    { value: "dr_ahmed", label: "Dr. Ahmed" },
];

const PAIN_ASSESSMENT_FREQUENCY_OPTIONS = [
    { value: "q4h", label: "Every 4 hours" },
    { value: "q6h", label: "Every 6 hours" },
    { value: "q_shift", label: "Every shift" },
];

const TARGET_PAIN_SCORE_OPTIONS = [
    { value: "0", label: "0" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "6", label: "6" },
];

type PostOpEditModeProps = {
    onSaveDraft?: () => void;
};

// --- Local SurgeryDataTable Component ---

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
    headerAction?: React.ReactNode;
    className?: string;
    striped?: boolean;
}

const SurgeryDataTable = <T,>({
    title,
    columns,
    data,
    headerAction,
    className,
    striped = true,
}: SurgeryDataTableProps<T>) => {
    return (
        <Card className={`shadow-none border-0 overflow-hidden ${className || ""}`}>
            {/* Header */}
            {(title || headerAction) && (
                <CardHeader className="flex flex-row items-center justify-between p-4 bg-white">
                    {title && <CardTitle className="text-lg font-medium text-slate-900">{title}</CardTitle>}
                    <div>{headerAction}</div>
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
            const color = row.urgency === "Stat" ? "text-red-500" : "text-orange-500";
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
    {
        key: "actions",
        label: "Actions",
        className: "text-right",
        headerClassName: "text-right",
        render: () => (
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreVertical size={16} />
                </Button>
            </div>
        ),
    },
];

export const PostOpEditMode = ({ onSaveDraft }: PostOpEditModeProps) => {
    const [followUpDate, setFollowUpDate] = React.useState<Date | null>(null);
    const [fluidRestriction, setFluidRestriction] = React.useState(false);

    const handleSaveDraft = () => {
        // Simulate saving data
        console.log("Saving Post-Op Care Draft");

        // Call the parent handler to switch mode
        if (onSaveDraft) {
            onSaveDraft();
        }
    };

    return (
        <>
            {/* Disposition / Transfer */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Disposition / Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="Transfer To *"
                            placeholder="Select Transfer To"
                            options={TRANSFER_TO_OPTIONS}
                        />
                        <SelectField
                            label="Floor"
                            placeholder="Select Floor"
                            options={FLOOR_OPTIONS}
                        />
                        <SelectField
                            label="Ward / Unit"
                            placeholder="Select Ward / Unit"
                            options={WARD_OPTIONS}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="Bed Number"
                            placeholder="Select Bed Number"
                            options={BED_OPTIONS}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-800">Transfer Time</Label>
                            <Select defaultValue="08:00">
                                <SelectTrigger className={cn("w-full h-10")}>
                                    <div className="flex-1 text-left">
                                        <SelectValue placeholder="Select Time" />
                                    </div>
                                    <Clock className="w-4 h-4 text-green-500 opacity-50 mr-2" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {TIME_SLOTS.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                            {slot}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <SelectField
                            label="Nurse"
                            placeholder="Select Nurse"
                            options={NURSE_OPTIONS}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Vital Signs Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="Monitoring Frequency *"
                            placeholder="Select Frequency"
                            options={MONITORING_FREQUENCY_OPTIONS}
                        />
                        <SelectField
                            label="Duration *"
                            placeholder="Select Duration"
                            options={DURATION_OPTIONS}
                        />
                        <SelectField
                            label="Special Monitoring *"
                            placeholder="Select Monitoring"
                            options={SPECIAL_MONITORING_OPTIONS}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Pain Assessment */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Activity & Mobilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SelectField
                        label="Activity Level *"
                        placeholder="Select Activity Level"
                        options={ACTIVITY_LEVEL_OPTIONS}
                    />
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">Mobilization Plan</Label>
                        <Textarea
                            placeholder="Enter pain management details"
                            className="min-h-[60px] resize-none"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Diet & Mobility */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Diet & Oral Fluids</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Diet Orders *"
                            placeholder="Select diet"
                            options={DIET_OPTIONS}
                        />
                        <SelectField
                            label="Time (Hour)"
                            placeholder="Select mobility"
                            options={MOBILITY_OPTIONS}
                        />
                    </div>
                    <div className="flex flex-col space-x-2 bg-blue-50/50 p-2 rounded-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <Checkbox
                                id="fluid-restriction"
                                checked={fluidRestriction}
                                onCheckedChange={(checked) => setFluidRestriction(checked as boolean)}
                            />
                            <Label htmlFor="fluid-restriction" className="text-sm cursor-pointer">
                                Fluid Restriction
                            </Label>
                        </div>

                        {fluidRestriction && (
                            <div className="space-y-2">
                                <Label className="text-sm font-normal">Fluid Restriction Instructions</Label>
                                <Textarea
                                    placeholder="Details maximum allowed fluid intake"
                                    className="min-h-[60px] resize-none"
                                />
                            </div>
                        )}
                    </div>

                </CardContent>
            </Card>

            {/* Nurse Order Section */}
            <SurgeryDataTable
                title="Nurse Order"
                columns={NURSE_ORDER_COLUMNS}
                data={MOCK_NURSE_ORDER_DATA}
                headerAction={
                    <NewButton
                        name="Add Nurse Note"
                        handleClick={() => console.log("Add Nurse Note")}
                        icon={<Plus size={16} className="text-green-600 bg-white rounded-full" />}
                    />
                }
            />

            {/* Drain Output */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Pain Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Pain Assessment Frequency"
                            placeholder="Select frequency"
                            options={PAIN_ASSESSMENT_FREQUENCY_OPTIONS}
                        />
                        <SelectField
                            label="Target Pain Score (0-10)"
                            placeholder="Select target score"
                            options={TARGET_PAIN_SCORE_OPTIONS}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Medications & Instructions */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Drains, Tubes & Catheters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
                        <Checkbox id="urinary-catheter" />
                        <Label htmlFor="urinary-catheter" className="text-sm cursor-pointer font-normal">
                            Urinary Catheter in situ
                        </Label>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">Catheter Removal Plan</Label>
                        <Textarea
                            placeholder="Enter post-operative instructions"
                            className="min-h-[80px] resize-none"
                        />
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
                        <Checkbox id="ngt-situ" />
                        <Label htmlFor="ngt-situ" className="text-sm cursor-pointer font-normal">
                            NGT (Nasogastric Tube) in situ
                        </Label>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">NGT Management</Label>
                        <Textarea
                            placeholder="Enter post-operative instructions"
                            className="min-h-[80px] resize-none"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Special Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">Additional Special Instructions</Label>
                        <Textarea
                            placeholder="Enter special post-operative instructions"
                            className="min-h-[80px] resize-none"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Follow-Up & Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="Doctor"
                            placeholder="Select Doctor"
                            options={DOCTOR_OPTIONS}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">Date</Label>
                            <AppDatePicker
                                value={followUpDate}
                                onChange={setFollowUpDate}
                                placeholder="Select follow-up date"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">Time</Label>
                            <Select defaultValue="08:00">
                                <SelectTrigger className={cn("w-full h-10")}>
                                    <div className="flex-1 text-left">
                                        <SelectValue placeholder="Select Time" />
                                    </div>
                                    <Clock className="w-4 h-4 text-green-500 opacity-50 mr-2" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {TIME_SLOTS.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                            {slot}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-white hover:text-blue-500"
                    onClick={handleSaveDraft}
                >
                    SAVE AS DRAFT
                </Button>
                <Button className="bg-green-600 hover:bg-green-600" onClick={() => console.log("Complete & Sign")}>
                    <Send size={16} className="mr-2" /> SUBMIT ORDERS
                </Button>
            </div>
        </>
    );
};
