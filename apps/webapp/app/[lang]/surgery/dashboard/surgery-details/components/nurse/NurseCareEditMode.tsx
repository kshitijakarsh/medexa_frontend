"use client";

import { Send, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Button } from "@workspace/ui/components/button";
import NewButton from "@/components/common/new-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Clock } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const paddedHours = hours.toString().padStart(2, "0");
    return `${paddedHours}:${minutes}`;
});

// Helper component for inventory selects
const SelectInput = ({ placeholder }: { placeholder: string }) => (
    <Select>
        <SelectTrigger className="w-full h-9 text-xs">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
    </Select>
);

// Checkbox item for checklists
const ChecklistItem = ({
    id,
    label,
    defaultChecked = false,
}: {
    id: string;
    label: string;
    defaultChecked?: boolean;
}) => (
    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
        <Checkbox id={id} defaultChecked={defaultChecked} />
        <Label htmlFor={id} className="text-sm font-light cursor-pointer">
            {label}
        </Label>
    </div>
);

type NurseCareEditModeProps = {
    onSaveDraft?: () => void;
};

export const NurseCareEditMode = ({ onSaveDraft }: NurseCareEditModeProps) => {
    return (
        <>
            {/* Patient Reception in OT */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Patient Reception in OT</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Patient Received Time</Label>
                        <Select defaultValue="08:00">
                            <SelectTrigger className={cn("w-full md:w-1/2 h-10")}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ChecklistItem id="reception-identity" label="Patient Identity Verified" />
                        <ChecklistItem id="reception-consent" label="Consent Form Verified" />
                        <ChecklistItem id="reception-site" label="Surgical Site Marked" />
                        <ChecklistItem id="reception-npo" label="Fasting Status Confirmed (NPO)" />
                    </div>
                </CardContent>
            </Card>

            {/* Surgical Safety Checklist */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Surgical Safety Checklist</CardTitle>
                    <Select defaultValue="08:15">
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder="Select Time" />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="safety-identity" label="Patient confirms identity, site, procedure, consent" />
                        <ChecklistItem id="safety-site" label="Site marked / Not applicable" />
                        <ChecklistItem id="safety-consent" label="Consent form complete" />
                        <ChecklistItem id="safety-pulse" label="Pulse oximeter on patient and functioning" />
                        <ChecklistItem id="safety-allergies" label="Known allergies confirmed" />
                        <ChecklistItem id="safety-airway" label="Difficult airway/aspiration risk assessed" />
                        <ChecklistItem id="safety-blood" label="Risk of >500ml blood loss assessed" />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">Additional Notes</Label>
                        <Textarea placeholder="Enter Additional notes" className="min-h-[80px] resize-none" />
                    </div>
                </CardContent>
            </Card>

            {/* Patient Positioning & Preparation */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Patient Positioning & Preparation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">Patient Position</Label>
                        <Input type="text" placeholder="Enter Patient Position" className="h-10" />
                    </div>
                    <ChecklistItem id="pos-pressure" label="All pressure points adequately padded" />
                </CardContent>
            </Card>

            {/* Time Out */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Time Out (Before Skin Incision)</CardTitle>
                    <Select defaultValue="08:45">
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder="Select Time" />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="timeout-team" label="All team members introduced by name and role" />
                        <ChecklistItem id="timeout-confirm" label="Surgeon, Anaesthetist, Nurse confirm patient, site, procedure" />
                        <ChecklistItem id="timeout-antibiotic" label="Antibiotic prophylaxis given within 60 min" />
                        <ChecklistItem id="timeout-imaging" label="Essential imaging displayed" />
                        <ChecklistItem id="timeout-sterility" label="Sterility confirmed (including indicator results)" />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">Additional Notes</Label>
                        <Textarea placeholder="Enter Additional notes" className="min-h-[80px] resize-none" />
                    </div>
                </CardContent>
            </Card>

            {/* Sign Out */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Sign Out (Before Patient Leaves OT)</CardTitle>
                    <Select defaultValue="10:30">
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder="Select Time" />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="signout-procedure" label="Procedure name recorded correctly" />
                        <ChecklistItem id="signout-counts" label="Instrument, sponge, needle counts correct" />
                        <ChecklistItem id="signout-specimen" label="Specimen labeled (including patient name)" />
                        <ChecklistItem id="signout-equipment" label="Equipment problems addressed" />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">Additional Notes</Label>
                        <Textarea placeholder="Enter Additional notes" className="min-h-[80px] resize-none" />
                    </div>
                </CardContent>
            </Card>

            {/* Implants Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Implants Used</CardTitle>
                    <NewButton name="Add Implant" handleClick={() => { }} />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2 text-xs px-1">
                        <div className="col-span-3">Implant Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-3">Batch/Lot No.</div>
                        <div className="col-span-2">Manufacturer</div>
                        <div className="col-span-2">Quantity</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-3"><SelectInput placeholder="Select Type" /></div>
                        <div className="col-span-2"><SelectInput placeholder="Select Size" /></div>
                        <div className="col-span-3"><SelectInput placeholder="Select Batch" /></div>
                        <div className="col-span-2"><SelectInput placeholder="Select Manufacturer" /></div>
                        <div className="col-span-2 flex gap-2">
                            <Input placeholder="Qty" className="h-9 text-xs" />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Consumables Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Consumables Used</CardTitle>
                    <NewButton name="Add Consumable" handleClick={() => { }} />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2 text-xs px-1">
                        <div className="col-span-4">Item Name</div>
                        <div className="col-span-3">Quantity</div>
                        <div className="col-span-5">Note</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-4"><SelectInput placeholder="Select Item Name" /></div>
                        <div className="col-span-3"><Input placeholder="Enter Quantity" className="h-9 text-xs" /></div>
                        <div className="col-span-5 flex gap-2">
                            <Input placeholder="Enter Note" className="h-9 text-xs" />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Nursing Notes */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Additional Nursing Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">Nursing Notes</Label>
                        <Textarea placeholder="Enter Nursing Notes" className="min-h-[100px] resize-none" />
                    </div>
                </CardContent>
            </Card>

            {/* Footer Actions */}
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
