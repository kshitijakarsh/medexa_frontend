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
};

import { createPatientsApiClient } from "@/lib/api/patients-api";
import { createWardApiClient } from "@/lib/api/surgery/ward";
import { useQuery } from "@tanstack/react-query";

export function AddConsumptionLogModal({
    open,
    onOpenChange,
    onSave,
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
    const wardApi = createWardApiClient({});

    const { data: patientsData } = useQuery({
        queryKey: ["patients-small-list"],
        queryFn: async () => {
            const response = await patientsApi.getPatients({ limit: 100 });
            return response.data.data;
        },
        enabled: open,
    });

    const { data: stockData } = useQuery({
        queryKey: ["ward-stock-small-list"],
        queryFn: async () => {
            const response = await wardApi.getWardStock({ category: "Consumables" });
            return response.data.data;
        },
        enabled: open,
    });

    const handleSave = () => {
        onSave({ usageType, patient, itemName, quantity, reason, notes });
        onOpenChange(false);
    };

    

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">{modalDict.title}</DialogTitle>
                        <p className="text-xs text-slate-500">{modalDict.subtitle}</p>
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
                                            {stockData?.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.item_name}
                                                </SelectItem>
                                            ))}
                                            {(!stockData || stockData.length === 0) && (
                                                <SelectItem value="none" disabled>No items found</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-1">
                                <Label className="text-xs font-medium">{modalDict.quantity}</Label>
                                <Input
                                    placeholder={modalDict.placeholders.quantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="h-10 text-xs px-3 bg-white border-slate-200"
                                />
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
                                        <SelectItem value="Injection">Injection</SelectItem>
                                        <SelectItem value="Gloves">Gloves</SelectItem>
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
                        className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-8 h-10 rounded-lg text-sm uppercase"
                    >
                        {dict.common.save || "SAVE"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
