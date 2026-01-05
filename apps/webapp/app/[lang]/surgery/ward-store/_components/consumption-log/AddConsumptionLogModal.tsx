"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";

type AddConsumptionLogModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
};

export function AddConsumptionLogModal({
    open,
    onOpenChange,
    onSave,
}: AddConsumptionLogModalProps) {
    const [usageType, setUsageType] = useState("Patient");
    const [patient, setPatient] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [notes, setNotes] = useState("");

    const handleSave = () => {
        onSave({ usageType, patient, itemName, quantity, notes });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">Consumables</DialogTitle>
                        <p className="text-xs text-slate-500">Add Consumables Items</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Usage Type */}
                    <div className="space-y-1">
                        <Label className="text-xs">Usage Type</Label>
                        <Select onValueChange={setUsageType} value={usageType}>
                            <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                <SelectValue placeholder="Select Usage Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Patient">Patient</SelectItem>
                                <SelectItem value="Ward">Ward</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Patient & Item Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Patient</Label>
                            <Select onValueChange={setPatient} value={patient}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ganguli Rathod">Ganguli Rathod</SelectItem>
                                    <SelectItem value="John Doe">John Doe</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Item Name</Label>
                            <Select onValueChange={setItemName} value={itemName}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Item Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Injection">Injection</SelectItem>
                                    <SelectItem value="Gloves">Gloves</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                            placeholder="Enter Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="h-8 text-xs px-3"
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                        <Label className="text-xs">Notes</Label>
                        <Textarea
                            placeholder="Enter / Instructions"
                            className="min-h-[60px] h-[60px] resize-none text-xs"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-0">
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
                        SAVE
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
