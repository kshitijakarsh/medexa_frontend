"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";
import { X } from "lucide-react";

type MedicalClearanceData = {
    clearanceType: string;
    doctor: string;
    urgency: string;
    isRequired: boolean;
    notes: string;
};

type MedicalClearanceModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: MedicalClearanceData) => void;
    clearanceOptions: { value: string; label: string }[];
    doctorOptions: { value: string; label: string }[];
    initialClearance?: string;
};

export default function MedicalClearanceModal({
    open,
    onOpenChange,
    onSave,
    clearanceOptions,
    doctorOptions,
    initialClearance = "",
}: MedicalClearanceModalProps) {
    const [clearanceType, setClearanceType] = React.useState(initialClearance);
    const [doctor, setDoctor] = React.useState("");
    const [urgency, setUrgency] = React.useState("");
    const [isRequired, setIsRequired] = React.useState(false);
    const [notes, setNotes] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setClearanceType(initialClearance);
            setDoctor("");
            setUrgency("");
            setIsRequired(false);
            setNotes("");
        }
    }, [open, initialClearance]);

    const handleSave = () => {
        onSave({ clearanceType, doctor, urgency, isRequired, notes });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-slate-900">Medical Clearances</DialogTitle>
                        <p className="text-xs text-slate-500 font-medium">Select Medical Clearances for the patient</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Clearance Type and Doctor Row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-900">Clearance Type</Label>
                            <Select value={clearanceType} onValueChange={setClearanceType}>
                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                    <SelectValue placeholder="Clearance Type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                    {clearanceOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-900">Doctor</Label>
                            <Select value={doctor} onValueChange={setDoctor}>
                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                    <SelectValue placeholder="Doctor Name" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                    {doctorOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Urgency and Required Row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-900">Urgency</Label>
                            <Select value={urgency} onValueChange={setUrgency}>
                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                    <SelectValue placeholder="Select Urgency" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                    <SelectItem value="routine" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">Routine</SelectItem>
                                    <SelectItem value="urgent" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">Urgent</SelectItem>
                                    <SelectItem value="stat" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">Stat</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-slate-900">Required</Label>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50/30 border border-blue-50 shadow-sm">
                                <Checkbox
                                    id="required-check-clearance"
                                    checked={isRequired}
                                    onCheckedChange={(c) => setIsRequired(!!c)}
                                    className="w-3.5 h-3.5 rounded border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                />
                                <label
                                    htmlFor="required-check-clearance"
                                    className="text-xs text-slate-600 leading-normal cursor-pointer overflow-hidden text-ellipsis"
                                >
                                    Patient cannot proceed to the next step until this test is completed.
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Notes Row */}
                    <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-900">Notes (Optional)</Label>
                        <div className="relative group">
                            <Textarea
                                placeholder="Enter Notes"
                                className="min-h-[60px] h-[60px] pt-2 px-3 border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-white shadow-sm transition-all resize-none placeholder:text-slate-400 group-hover:border-blue-200"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-6 w-24 h-8 rounded-md border text-[10px] uppercase tracking-wider"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider"
                    >
                        ADD
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
