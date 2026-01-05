"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";

// Options for select fields
const PROCEDURE_OPTIONS = [
    { value: "lap_chole", label: "Laparoscopic Cholecystectomy" },
    { value: "open_chole", label: "Open Cholecystectomy" },
    { value: "appendectomy", label: "Appendectomy" },
    { value: "hernia_repair", label: "Hernia Repair" },
];

const SITE_OPTIONS = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "bilateral", label: "Bilateral" },
    { value: "midline", label: "Midline" },
    { value: "na", label: "Not Applicable" },
];

const APPROACH_OPTIONS = [
    { value: "laparoscopic", label: "Laparoscopic" },
    { value: "open", label: "Open" },
    { value: "robotic", label: "Robotic" },
    { value: "endoscopic", label: "Endoscopic" },
    { value: "converted", label: "Converted to Open" },
];

const BLOOD_LOSS_OPTIONS = [
    { value: "<50", label: "<50 ml" },
    { value: "50-100", label: "50–100 ml" },
    { value: "100-300", label: "100–300 ml" },
    { value: ">300", label: ">300 ml" },
];

const BLOOD_UNITS_OPTIONS = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
];

const IMPLANT_TYPE_OPTIONS = [
    { value: "hernia_mesh", label: "Hernia Mesh" },
    { value: "ortho_plate", label: "Orthopedic Plate" },
    { value: "stent", label: "Stent" },
];

const IMPLANT_SIZE_OPTIONS = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
];

const MANUFACTURER_OPTIONS = [
    { value: "ethicon", label: "Ethicon" },
    { value: "bard", label: "Bard" },
    { value: "covidien", label: "Covidien" },
];

const QUANTITY_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
];

const CONSUMABLE_ITEM_OPTIONS = [
    { value: "sutures", label: "Sutures" },
    { value: "stapler", label: "Stapler" },
    { value: "clip_cartridge", label: "Clip Cartridge" },
];

// Procedure Form Component (reusable for multiple procedures)
const ProcedureFormCard = ({ index, initialData }: { index: number; initialData?: any }) => (
    <div className="border border-slate-100 rounded-lg bg-slate-50/50 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
                label="Actual Procedure Performed"
                placeholder="Select Procedure"
                options={PROCEDURE_OPTIONS}
                value={initialData?.name}
            />
            <SelectField
                label="Side / Site"
                placeholder="Select Side / Site"
                options={SITE_OPTIONS}
                value={initialData?.site}
            />
        </div>
        <SelectField
            label="Approach / Access"
            placeholder="Select Approach / Access"
            options={APPROACH_OPTIONS}
            value={initialData?.approach}
        />
        <div className="space-y-1.5">
            <Label className="text-sm">Intra-operative Findings</Label>
            <Textarea
                placeholder="Enter findings"
                className="min-h-[80px] resize-none"
                defaultValue={initialData?.findings}
            />
        </div>
        <div className="space-y-1.5">
            <Label className="text-sm">Operative Steps Summary</Label>
            <Textarea
                placeholder="Enter operative steps"
                className="min-h-[80px] resize-none"
                defaultValue={initialData?.steps}
            />
        </div>
    </div>
);

type IntraOpEditModeProps = {
    initialData?: any;
    onSaveDraft?: () => void;
};

export const IntraOpEditMode = ({ initialData, onSaveDraft }: IntraOpEditModeProps) => {
    const [specimensChecked, setSpecimensChecked] = useState(!!initialData?.specimens?.histopathology);
    const [drainsChecked, setDrainsChecked] = useState(!!initialData?.specimens?.drains);
    const [catheterChecked, setCatheterChecked] = useState(!!initialData?.specimens?.catheter);

    return (
        <>
            {/* Surgery Timing */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Surgery Timing</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm">Patient In Time</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.patient_in} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">Anesthesia Start</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.anesthesia_start} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">Surgery Start (Incision)</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.surgery_start} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">Surgery End (Closure)</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.surgery_end} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Procedure Details */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Procedure Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProcedureFormCard index={1} initialData={initialData?.procedure} />
                    {/* If multiple procedures are stored, we might want to map them here, but for now we follow the existing static structure */}
                    <ProcedureFormCard index={2} />
                </CardContent>
            </Card>

            {/* Complications */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Complications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Intra-operative Complications</Label>
                        <Textarea
                            placeholder="Enter Intra-operative Complications"
                            className="min-h-[60px] resize-none"
                            defaultValue={initialData?.complications}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Blood Loss & Transfusion */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Blood Loss & Transfusion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SelectField
                        label="Estimated Blood Loss (mL)"
                        placeholder="Select blood loss"
                        options={BLOOD_LOSS_OPTIONS}
                        value={initialData?.blood_loss?.estimated}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="PRBC (Units)"
                            placeholder="Select units"
                            options={BLOOD_UNITS_OPTIONS}
                            value={initialData?.blood_loss?.prbc?.toString()}
                        />
                        <SelectField
                            label="FFP (Units)"
                            placeholder="Select units"
                            options={BLOOD_UNITS_OPTIONS}
                            value={initialData?.blood_loss?.ffp?.toString()}
                        />
                        <SelectField
                            label="Platelets (Units)"
                            placeholder="Select units"
                            options={BLOOD_UNITS_OPTIONS}
                            value={initialData?.blood_loss?.platelets?.toString()}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Implants Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Implants Used</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Implant Type"
                            placeholder="Select implant type"
                            options={IMPLANT_TYPE_OPTIONS}
                            value={initialData?.implants?.type}
                        />
                        <SelectField
                            label="Size"
                            placeholder="Select size"
                            options={IMPLANT_SIZE_OPTIONS}
                            value={initialData?.implants?.size}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm">Batch / Lot No.</Label>
                            <Input type="text" placeholder="Enter batch/lot number" className="h-10" defaultValue={initialData?.implants?.batch_no} />
                        </div>
                        <SelectField
                            label="Manufacturer"
                            placeholder="Select manufacturer"
                            options={MANUFACTURER_OPTIONS}
                            value={initialData?.implants?.manufacturer}
                        />
                    </div>
                    <SelectField
                        label="Quantity"
                        placeholder="Select quantity"
                        options={QUANTITY_OPTIONS}
                        value={initialData?.implants?.quantity?.toString()}
                    />
                </CardContent>
            </Card>

            {/* Consumables Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Consumables Used</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Item Name"
                            placeholder="Select consumable item"
                            options={CONSUMABLE_ITEM_OPTIONS}
                            value={initialData?.consumables?.item_name}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-sm">Quantity</Label>
                            <Input type="number" placeholder="Enter quantity" className="h-10" defaultValue={initialData?.consumables?.quantity} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm">Note</Label>
                        <Input type="text" placeholder="Enter additional details" className="h-10" defaultValue={initialData?.consumables?.note} />
                    </div>
                </CardContent>
            </Card>

            {/* Specimens & Other Details */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Specimens & Other Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="specimens"
                                checked={specimensChecked}
                                onCheckedChange={(checked) => setSpecimensChecked(checked as boolean)}
                            />
                            <Label htmlFor="specimens" className="text-sm cursor-pointer">
                                Specimens sent for Histopathology
                            </Label>
                        </div>
                        {specimensChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder="Enter Specimen Details"
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="drains"
                                checked={drainsChecked}
                                onCheckedChange={(checked) => setDrainsChecked(checked as boolean)}
                            />
                            <Label htmlFor="drains" className="text-sm cursor-pointer">
                                Drains Placed
                            </Label>
                        </div>
                        {drainsChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder="Enter Drain Details"
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="catheter"
                                checked={catheterChecked}
                                onCheckedChange={(checked) => setCatheterChecked(checked as boolean)}
                            />
                            <Label htmlFor="catheter" className="text-sm cursor-pointer">
                                Catheter Placed
                            </Label>
                        </div>
                        {catheterChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder="Enter Catheter Details"
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Surgeon's Additional Notes */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Surgeon's Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Operative Steps Summary</Label>
                        <Textarea
                            placeholder="Enter additional notes"
                            className="min-h-[100px] resize-none"
                            defaultValue={initialData?.surgeon_notes}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-white hover:text-blue-500"
                    onClick={onSaveDraft}
                >
                    SAVE AS DRAFT
                </Button>
                <Button className="bg-green-600 hover:bg-green-600">
                    <Send size={16} className="mr-2" /> MARK AS COMPLETED
                </Button>
            </div>
        </>
    );
};
