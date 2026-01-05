"use client";

import React, { useState } from "react";
import { format } from "@workspace/ui/hooks/use-date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";

type AddEquipmentUsageModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
};

export function AddEquipmentUsageModal({
    open,
    onOpenChange,
    onSave,
}: AddEquipmentUsageModalProps) {
    const [patient, setPatient] = useState("");
    const [itemName, setItemName] = useState("");
    const [assetId, setAssetId] = useState("");
    const [condition, setCondition] = useState("");
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);
    const [notes, setNotes] = useState("");

    const handleSave = () => {
        onSave({
            patient,
            itemName,
            assetId,
            condition,
            startTime: startTime ? format(startTime, "dd/MM/yyyy") : "",
            endTime: endTime ? format(endTime, "dd/MM/yyyy") : "",
            notes
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">Equipment</DialogTitle>
                        <p className="text-xs text-slate-500">Add Equipment for the patient</p>
                    </div>
                </div>

                <div className="space-y-3">
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
                                    <SelectItem value="Oxygen Cylinder">Oxygen Cylinder</SelectItem>
                                    <SelectItem value="Monitor">Vital Signs Monitor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Asset ID & Condition */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Asset ID</Label>
                            <Select onValueChange={setAssetId} value={assetId}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Asset ID" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Oxy-004">Oxy-004</SelectItem>
                                    <SelectItem value="Oxy-005">Oxy-005</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Condition Before Use</Label>
                            <Select onValueChange={setCondition} value={condition}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Damaged">Damaged</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Start Time & End Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Start Time</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-8 text-xs justify-start text-left font-normal px-3",
                                            !startTime && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex-1">
                                            {startTime ? format(startTime, "dd/MM/yyyy") : <span>Select Start Time</span>}
                                        </div>
                                        <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startTime}
                                        onSelect={setStartTime}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">End Time (Optional)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-8 text-xs justify-start text-left font-normal px-3",
                                            !endTime && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex-1">
                                            {endTime ? format(endTime, "dd/MM/yyyy") : <span>Select End Time</span>}
                                        </div>
                                        <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endTime}
                                        onSelect={setEndTime}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                        <Label className="text-xs">Notes / Instructions</Label>
                        <Textarea
                            placeholder="Enter Notes / Instructions"
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
