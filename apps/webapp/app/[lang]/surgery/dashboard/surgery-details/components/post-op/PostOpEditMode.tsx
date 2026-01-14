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
import { useDictionary } from "@/i18n/use-dictionary";

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
    initialData?: any;
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

export const PostOpEditMode = ({ initialData, onSaveDraft }: PostOpEditModeProps) => {
    const dict = useDictionary();
    const postOp = dict.pages.surgery.surgeryDetails.postOp;

    const [followUpDate, setFollowUpDate] = React.useState<Date | null>(
        initialData?.follow_up?.date ? new Date(initialData.follow_up.date) : null
    );
    const [fluidRestriction, setFluidRestriction] = React.useState(!!initialData?.diet?.fluid_restriction);

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
                    <CardTitle className="text-lg font-medium">{postOp.sections.disposition}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label={`${postOp.fields.transferTo} *`}
                            placeholder={postOp.fields.selectTransferTo}
                            options={TRANSFER_TO_OPTIONS}
                            defaultValue={initialData?.disposition?.transfer_to}
                        />
                        <SelectField
                            label={postOp.fields.floor}
                            placeholder={postOp.fields.selectFloor}
                            options={FLOOR_OPTIONS}
                            defaultValue={initialData?.disposition?.floor}
                        />
                        <SelectField
                            label={postOp.fields.wardUnit}
                            placeholder={postOp.fields.selectWardUnit}
                            options={WARD_OPTIONS}
                            defaultValue={initialData?.disposition?.ward_unit}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label={postOp.fields.bedNumber}
                            placeholder={postOp.fields.selectBedNumber}
                            options={BED_OPTIONS}
                            defaultValue={initialData?.disposition?.bed_number}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-800">{postOp.fields.transferTime}</Label>
                            <Select defaultValue={initialData?.disposition?.transfer_time || "08:00"}>
                                <SelectTrigger className={cn("w-full h-10")}>
                                    <div className="flex-1 text-left">
                                        <SelectValue placeholder={postOp.fields.selectTime} />
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
                            label={postOp.fields.nurse}
                            placeholder={postOp.fields.selectNurse}
                            options={NURSE_OPTIONS}
                            defaultValue={initialData?.disposition?.nurse}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.vitalSigns}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label={`${postOp.fields.monitoringFrequency} *`}
                            placeholder={postOp.fields.selectFrequency}
                            options={MONITORING_FREQUENCY_OPTIONS}
                            defaultValue={initialData?.monitoring?.frequency}
                        />
                        <SelectField
                            label={`${postOp.fields.duration} *`}
                            placeholder={postOp.fields.selectDuration}
                            options={DURATION_OPTIONS}
                            defaultValue={initialData?.monitoring?.duration}
                        />
                        <SelectField
                            label={`${postOp.fields.specialMonitoring} *`}
                            placeholder={postOp.fields.selectMonitoring}
                            options={SPECIAL_MONITORING_OPTIONS}
                            defaultValue={initialData?.monitoring?.special}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Pain Assessment */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.activity}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SelectField
                        label={`${postOp.fields.activityLevel} *`}
                        placeholder={postOp.fields.selectActivityLevel}
                        options={ACTIVITY_LEVEL_OPTIONS}
                        defaultValue={initialData?.activity?.level}
                    />
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">{postOp.fields.mobilizationPlan}</Label>
                        <Textarea
                            placeholder={postOp.fields.enterMobilizationPlan}
                            className="min-h-[60px] resize-none"
                            defaultValue={initialData?.activity?.plan}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Diet & Mobility */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.diet}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label={`${postOp.fields.dietOrders} *`}
                            placeholder={postOp.fields.selectDiet}
                            options={DIET_OPTIONS}
                            defaultValue={initialData?.diet?.orders}
                        />
                        <SelectField
                            label={postOp.fields.timeHour}
                            placeholder={postOp.fields.selectTimeHour}
                            options={MOBILITY_OPTIONS}
                            defaultValue={initialData?.diet?.time}
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
                                {postOp.fields.fluidRestriction}
                            </Label>
                        </div>

                        {fluidRestriction && (
                            <div className="space-y-2">
                                <Label className="text-sm font-normal">{postOp.fields.fluidRestrictionInstructions}</Label>
                                <Textarea
                                    placeholder={postOp.fields.enterFluidRestriction}
                                    className="min-h-[60px] resize-none"
                                    defaultValue={initialData?.diet?.instructions}
                                />
                            </div>
                        )}
                    </div>

                </CardContent>
            </Card>

            {/* Nurse Order Section */}
            <SurgeryDataTable
                title={postOp.sections.nurseOrder}
                columns={NURSE_ORDER_COLUMNS}
                data={initialData?.nurse_orders || []}
                headerAction={
                    <NewButton
                        name={postOp.actions.addNurseNote}
                        handleClick={() => console.log("Add Nurse Note")}
                        icon={<Plus size={16} className="text-green-600 bg-white rounded-full" />}
                    />
                }
            />

            {/* Drain Output */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.painManagement}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label={postOp.fields.painAssessmentFrequency}
                            placeholder={postOp.fields.selectFrequency}
                            options={PAIN_ASSESSMENT_FREQUENCY_OPTIONS}
                            defaultValue={initialData?.pain?.frequency}
                        />
                        <SelectField
                            label={postOp.fields.targetPainScore}
                            placeholder={postOp.fields.selectTargetScore}
                            options={TARGET_PAIN_SCORE_OPTIONS}
                            defaultValue={initialData?.pain?.target_score}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Medications & Instructions */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.drains}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
                        <Checkbox id="urinary-catheter" defaultChecked={!!initialData?.drains?.catheter_in_situ} />
                        <Label htmlFor="urinary-catheter" className="text-sm cursor-pointer font-normal">
                            {postOp.fields.urinaryCatheter}
                        </Label>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">{postOp.fields.catheterRemovalPlan}</Label>
                        <Textarea
                            placeholder={postOp.fields.enterPostOpInstructions}
                            className="min-h-[80px] resize-none"
                            defaultValue={initialData?.drains?.catheter_plan}
                        />
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
                        <Checkbox id="ngt-situ" defaultChecked={!!initialData?.drains?.ngt_in_situ} />
                        <Label htmlFor="ngt-situ" className="text-sm cursor-pointer font-normal">
                            {postOp.fields.ngt}
                        </Label>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">{postOp.fields.ngtManagement}</Label>
                        <Textarea
                            placeholder={postOp.fields.enterPostOpInstructions}
                            className="min-h-[80px] resize-none"
                            defaultValue={initialData?.drains?.ngt_management}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.specialInstructions}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-normal">{postOp.fields.additionalSpecialInstructions}</Label>
                        <Textarea
                            placeholder={postOp.fields.enterSpecialInstructions}
                            className="min-h-[80px] resize-none"
                            defaultValue={initialData?.special_instructions}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{postOp.sections.followUp}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label={postOp.fields.doctor}
                            placeholder={postOp.fields.selectDoctor}
                            options={DOCTOR_OPTIONS}
                            defaultValue={initialData?.follow_up?.doctor}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">{postOp.fields.date}</Label>
                            <AppDatePicker
                                value={followUpDate}
                                onChange={setFollowUpDate}
                                placeholder={postOp.fields.selectFollowUpDate}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">{postOp.fields.time}</Label>
                            <Select defaultValue={initialData?.follow_up?.time || "08:00"}>
                                <SelectTrigger className={cn("w-full h-10")}>
                                    <div className="flex-1 text-left">
                                        <SelectValue placeholder={postOp.fields.selectTime} />
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
                    {postOp.actions.saveDraft}
                </Button>
                <Button className="bg-green-600 hover:bg-green-600" onClick={() => console.log("Complete & Sign")}>
                    <Send size={16} className="mr-2" /> {postOp.actions.submitOrders}
                </Button>
            </div>
        </>
    );
};
