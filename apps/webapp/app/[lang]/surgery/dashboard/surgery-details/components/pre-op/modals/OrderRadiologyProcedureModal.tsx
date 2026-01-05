"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";

type OrderRadiologyData = {
    procedure: string;
    urgency: string;
    isRequired: boolean;
    notes: string;
};

type OrderRadiologyProcedureModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: OrderRadiologyData) => void;
    procedureOptions: { value: string; label: string }[];
    initialProcedure?: string;
};

export default function OrderRadiologyProcedureModal({
    open,
    onOpenChange,
    onSave,
    procedureOptions,
    initialProcedure = "",
}: OrderRadiologyProcedureModalProps) {
    const [procedure, setProcedure] = React.useState(initialProcedure);
    const [urgency, setUrgency] = React.useState("");
    const [isRequired, setIsRequired] = React.useState(false);
    const [notes, setNotes] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setProcedure(initialProcedure);
            setUrgency("");
            setIsRequired(false);
            setNotes("");
        }
    }, [open, initialProcedure]);

    const handleSave = () => {
        onSave({ procedure, urgency, isRequired, notes });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] gap-6">
                <DialogHeader className="border-b pb-4 mb-2">
                    <DialogTitle className="text-xl font-semibold">Order Radiology Procedure</DialogTitle>
                    <p className="text-sm text-slate-500">Select imaging procedure for the patient</p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Select Procedure */}
                    <div className="space-y-2">
                        <Label>Select procedure</Label>
                        <Select value={procedure} onValueChange={setProcedure}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select procedure" />
                            </SelectTrigger>
                            <SelectContent>
                                {procedureOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Urgency and Required Row */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Urgency</Label>
                            <Select value={urgency} onValueChange={setUrgency}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Urgency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="routine">Routine</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                    <SelectItem value="stat">Stat</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Required</Label>
                            <div className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-100 h-[calc(100%-24px)] mt-auto">
                                <Checkbox
                                    id="rad-required-check"
                                    checked={isRequired}
                                    onCheckedChange={(c) => setIsRequired(!!c)}
                                    className="mt-0.5"
                                />
                                <label
                                    htmlFor="rad-required-check"
                                    className="text-xs text-slate-600 leading-tight cursor-pointer"
                                >
                                    Patient cannot proceed to the next step until this test is completed.
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Clinical Notes */}
                    <div className="space-y-2">
                        <Label>Clinical Notes (Optional)</Label>
                        <Textarea
                            placeholder="Enter Clinical Notes"
                            className="min-h-[100px] resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium px-8">
                        CANCEL
                    </Button>
                    <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-medium px-8">
                        SAVE
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
