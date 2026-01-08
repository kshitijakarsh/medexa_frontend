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
    editId?: string;
};

import { createPatientsApiClient } from "@/lib/api/patients-api";
import { createWardApiClient } from "@/lib/api/surgery/ward";
import { useQuery } from "@tanstack/react-query";
import { useCreateEquipmentUsageLog, useEquipmentUsageLog, useUpdateEquipmentUsageLog } from "@/app/[lang]/surgery/_hooks/useWard";
import { useEffect } from "react";

const MOCK_EQUIPMENT = [
    { id: "e-mock-1", item_name: "Surgical Monitor" },
    { id: "e-mock-2", item_name: "X-Ray Machine" },
    { id: "e-mock-3", item_name: "Ventilator" },
    { id: "e-mock-4", item_name: "Infusion Pump" },
];

export function AddEquipmentUsageModal({
    open,
    onOpenChange,
    onSave,
    editId,
}: AddEquipmentUsageModalProps) {
    const [patient, setPatient] = useState("");
    const [itemName, setItemName] = useState("");
    const [assetId, setAssetId] = useState("");
    const [condition, setCondition] = useState("");
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);
    const [notes, setNotes] = useState("");

    const patientsApi = createPatientsApiClient({});
    const wardApi = createWardApiClient({});
    const createLogMutation = useCreateEquipmentUsageLog();
    const updateLogMutation = useUpdateEquipmentUsageLog();

    const { data: logData, isLoading: isLoadingLog } = useEquipmentUsageLog(editId);

    useEffect(() => {
        if (logData?.data) {
            const log = logData.data;
            setPatient(log.patient_id || "");
            setItemName(log.item_name || "");
            setAssetId(log.asset_id || "");
            setCondition(log.condition_before_use || "");
            setStartTime(log.start_time ? new Date(log.start_time) : undefined);
            setEndTime(log.end_time ? new Date(log.end_time) : undefined);
            setNotes(log.notes || "");
        } else {
            // Reset if not editing
            setPatient("");
            setItemName("");
            setAssetId("");
            setCondition("");
            setStartTime(undefined);
            setEndTime(undefined);
            setNotes("");
        }
    }, [logData, open]);

    const { data: patientsData } = useQuery({
        queryKey: ["patients-small-list"],
        queryFn: async () => {
            const response = await patientsApi.getPatients({ limit: 100 });
            return response.data.data;
        },
        enabled: open,
    });

    const { data: equipmentData } = useQuery({
        queryKey: ["ward-stock-equipment-small-list"],
        queryFn: async () => {
            const response = await wardApi.getWardStock({ category: "Equipment" });
            return response.data.data;
        },
        enabled: open,
    });

    const allEquipment = [
        ...(equipmentData || []),
        ...MOCK_EQUIPMENT.filter(mock => !equipmentData?.some((item: any) => item.item_name === mock.item_name))
    ];

    const handleSave = () => {
        console.log("handleSave called", { itemName, assetId, startTime, condition, patient });
        if (!itemName || !assetId || !startTime) {
            console.log("Validation failed", { itemName, assetId, startTime });
            return;
        }

        const payload = {
            item_name: itemName,
            asset_id: assetId,
            condition_before_use: condition || "Good",
            start_time: startTime.toISOString(),
            end_time: endTime?.toISOString(),
            notes,
            patient_id: patient || undefined
        };

        if (editId) {
            updateLogMutation.mutate({ id: editId, payload }, {
                onSuccess: () => {
                    console.log("Update successful");
                    onOpenChange(false);
                },
                onError: (error) => {
                    console.error("Update failed", error);
                }
            });
        } else {
            createLogMutation.mutate(payload, {
                onSuccess: () => {
                    console.log("Mutation successful");
                    onOpenChange(false);
                    // Reset form is handled in useEffect when open changes or logData is null
                },
                onError: (error) => {
                    console.error("Mutation failed", error);
                }
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">
                            {editId ? "Edit Equipment Usage Logs" : "Equipment"}
                        </DialogTitle>
                        <p className="text-xs text-slate-500">
                            {editId ? "Update equipment usage for the patient" : "Add Equipment for the patient"}
                        </p>
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
                                    {patientsData?.map((p: any) => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.first_name} {p.last_name}
                                        </SelectItem>
                                    ))}
                                    {(!patientsData || patientsData.length === 0) && (
                                        <SelectItem value="none" disabled>No patients found</SelectItem>
                                    )}
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
                                    {allEquipment?.map((item: any) => (
                                        <SelectItem key={item.id} value={item.item_name}>
                                            {item.item_name}
                                        </SelectItem>
                                    ))}
                                    {(!allEquipment || allEquipment.length === 0) && (
                                        <SelectItem value="none" disabled>No equipment found</SelectItem>
                                    )}
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
                                    <SelectItem value="ASSET-001">ASSET-001</SelectItem>
                                    <SelectItem value="ASSET-002">ASSET-002</SelectItem>
                                    <SelectItem value="ASSET-003">ASSET-003</SelectItem>
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
                        disabled={createLogMutation.isPending || updateLogMutation.isPending}
                        className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider disabled:opacity-50"
                    >
                        {createLogMutation.isPending || updateLogMutation.isPending ? "SAVING..." : (editId ? "UPDATE" : "SAVE")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
