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
import { useDictionary } from "@/i18n/use-dictionary";

type AddConsumptionLogModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
    editId?: string;
};

import { createPatientsApiClient } from "@/lib/api/patients-api";
import { useWardStock, useCreateConsumptionLog, useConsumptionLog, useUpdateConsumptionLog } from "@/app/[lang]/surgery/_hooks/useWard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const MOCK_CONSUMABLES = [
    { id: "mock-1", item_name: "Surgical Gloves" },
    { id: "mock-2", item_name: "Injection" },
    { id: "mock-3", item_name: "Syringe" },
    { id: "mock-4", item_name: "Gauze" },
    { id: "mock-5", item_name: "Cotton" },
];

export function AddConsumptionLogModal({
    open,
    onOpenChange,
    onSave,
    editId,
}: AddConsumptionLogModalProps) {

    const [usageType, setUsageType] = useState("");
    const [patient, setPatient] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");

    const dict = useDictionary();
    const modalDict = dict.pages.surgery.wardStore.consumptionLog.modal;

    const patientsApi = createPatientsApiClient({});
    const createLogMutation = useCreateConsumptionLog();
    const updateLogMutation = useUpdateConsumptionLog();

    const { data: logData, isLoading: isLoadingLog } = useConsumptionLog(editId);

    useEffect(() => {
        if (logData?.data) {
            const log = logData.data;
            setUsageType(log.usage_type.charAt(0).toUpperCase() + log.usage_type.slice(1));
            setPatient(log.patient_id || "");
            setItemName(log.item_name || "");
            setQuantity(log.quantity.toString() || "");
            setReason(log.reason || "");
            setNotes(log.notes || "");
        } else if (!editId && open) {
            // Reset if not editing
            setUsageType("");
            setPatient("");
            setItemName("");
            setQuantity("");
            setReason("");
            setNotes("");
        }
    }, [logData, open, editId]);

    // Fetch patients
    const { data: patientsData } = useQuery({
        queryKey: ["patients-small-list"],
        queryFn: async () => {
            const response = await patientsApi.getPatients({ limit: 100 });
            return response.data.data;
        },
        enabled: open,
    });

    // Fetch ward stock
    const { data: stockData } = useWardStock({ category: "Consumables" });

    // Combine stock data and mock data
    const allItems = [
        ...(stockData?.data || []),
        ...MOCK_CONSUMABLES.filter(mock => !stockData?.data?.some((item: any) => item.item_name === mock.item_name))
    ];

    const handleSave = () => {
        if (!usageType || !itemName || !quantity) return;

        const payload = {
            usage_type: usageType.toLowerCase() as "patient" | "ward",
            patient_id: usageType === "Patient" ? patient : undefined,
            item_name: itemName,
            quantity: Number(quantity),
            reason: reason || "",
            notes: notes,
        };

        if (editId) {
            updateLogMutation.mutate({ id: editId, payload }, {
                onSuccess: () => {
                    onOpenChange(false);
                }
            });
        } else {
            createLogMutation.mutate(payload, {
                onSuccess: () => {
                    onOpenChange(false);
                    // Reset form is handled in useEffect
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
                            {editId ? "Edit Consumption Log" : modalDict.title}
                        </DialogTitle>
                        <p className="text-xs text-slate-500">
                            {editId ? "Update consumption details for the patient or ward" : modalDict.subtitle}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Usage Type */}
                    <div className="space-y-1">
                        <Label className="text-xs font-medium">{modalDict.usageType}</Label>
                        <Select onValueChange={setUsageType} value={usageType}>
                            <SelectTrigger className="w-full h-10 text-xs bg-slate-50 border-slate-200">
                                <SelectValue placeholder={modalDict.placeholders.usageType} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Patient">Patient</SelectItem>
                                <SelectItem value="Ward">Ward</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {usageType === "Patient" && (
                        <>
                            {/* Patient & Item Name */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs font-medium">{modalDict.patient}</Label>
                                    <Select onValueChange={setPatient} value={patient}>
                                        <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                            <SelectValue placeholder={modalDict.placeholders.patient} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patientsData?.map((p) => (
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
                                    <Label className="text-xs font-medium">{modalDict.itemName}</Label>
                                    <Select onValueChange={setItemName} value={itemName}>
                                        <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                            <SelectValue placeholder={modalDict.placeholders.itemName} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allItems?.map((item: any) => (
                                                <SelectItem key={item.id} value={item.item_name}>
                                                    {item.item_name}
                                                </SelectItem>
                                            ))}
                                            {(!allItems || allItems.length === 0) && (
                                                <SelectItem value="none" disabled>No items found</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Quantity & Reason */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs font-medium">{modalDict.quantity}</Label>
                                    <Input
                                        placeholder={modalDict.placeholders.quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="h-10 text-xs px-3 bg-white border-slate-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs font-medium">{modalDict.reason}</Label>
                                    <Input
                                        placeholder={modalDict.placeholders.reason}
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="h-10 text-xs px-3 bg-white border-slate-200"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {usageType === "Ward" && (
                        <>
                            {/* Item Name */}
                            <div className="space-y-1">
                                <Label className="text-xs font-medium">{modalDict.itemName}</Label>
                                <Select onValueChange={setItemName} value={itemName}>
                                    <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                        <SelectValue placeholder={modalDict.placeholders.itemName} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allItems?.map((item: any) => (
                                            <SelectItem key={item.id} value={item.item_name}>
                                                {item.item_name}
                                            </SelectItem>
                                        ))}
                                        {(!allItems || allItems.length === 0) && (
                                            <SelectItem value="none" disabled>No items found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Quantity & Reason */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs font-medium">{modalDict.quantity}</Label>
                                    <Input
                                        placeholder={modalDict.placeholders.quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="h-10 text-xs px-3 bg-white border-slate-200"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs font-medium">{modalDict.reason}</Label>
                                    <Select onValueChange={setReason} value={reason}>
                                        <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                            <SelectValue placeholder={modalDict.placeholders.reason} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Routine">Routine</SelectItem>
                                            <SelectItem value="Emergency">Emergency</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </>
                    )}

                    {usageType && (
                        /* Notes */
                        <div className="space-y-1">
                            <Label className="text-xs font-medium">{modalDict.notes}</Label>
                            <Textarea
                                placeholder={modalDict.placeholders.notes}
                                className="min-h-[80px] h-[80px] resize-none text-xs bg-white border-slate-200"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-8 h-10 rounded-lg border text-sm uppercase"
                    >
                        {dict.common.cancel || "CANCEL"}
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={createLogMutation.isPending || updateLogMutation.isPending}
                        className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-8 h-10 rounded-lg text-sm uppercase"
                    >
                        {createLogMutation.isPending || updateLogMutation.isPending ? "SAVING..." : (editId ? "UPDATE" : (dict.common.save || "SAVE"))}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
