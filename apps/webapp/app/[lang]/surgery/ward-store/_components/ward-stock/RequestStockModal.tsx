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
import { format } from "@workspace/ui/hooks/use-date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";

type RequestStockModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
};

import { createWardApiClient } from "@/lib/api/surgery/ward";
import { useQuery } from "@tanstack/react-query";

export function RequestStockModal({
    open,
    onOpenChange,
    onSave,
}: RequestStockModalProps) {
    const dict = useDictionary();
    const [category, setCategory] = useState("Consumables");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [urgency, setUrgency] = useState("");
    const [reason, setReason] = useState("");
    const [requiredDate, setRequiredDate] = useState<Date | undefined>(undefined);
    const [notes, setNotes] = useState("");

    const wardApi = createWardApiClient({});

    const { data: stockData } = useQuery({
        queryKey: ["ward-stock-small-list", category],
        queryFn: async () => {
            const response = await wardApi.getWardStock({ category });
            return response.data.data;
        },
        enabled: open,
    });

    const handleSave = () => {
        onSave({ category, itemName, quantity, urgency, reason, requiredDate, notes });
        onOpenChange(false);
    };

    const modalDict = dict.pages.surgery.wardStore.stockRequests.modal;

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
                    {/* Category */}
                    <div className="space-y-1">
                        <Label className="text-xs font-medium">{modalDict.category}</Label>
                        <Select onValueChange={(val) => { setCategory(val); setItemName(""); }} value={category}>
                            <SelectTrigger className="w-full h-10 text-xs bg-slate-50 border-slate-200">
                                <SelectValue placeholder={modalDict.placeholders.category} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Consumables">Consumables</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Item Name */}
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

                    {/* Quantity & Urgency */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs font-medium">{modalDict.quantityNeeded}</Label>
                            <Input
                                placeholder={modalDict.placeholders.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="h-10 text-xs px-3 bg-white border-slate-200"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs font-medium">{modalDict.urgency}</Label>
                            <Select onValueChange={setUrgency} value={urgency}>
                                <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                    <SelectValue placeholder={modalDict.placeholders.urgency} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Reason & Date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs font-medium">{modalDict.reason}</Label>
                            <Select onValueChange={setReason} value={reason}>
                                <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                    <SelectValue placeholder={modalDict.placeholders.reason} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Stock Depletion">Stock Depletion</SelectItem>
                                    <SelectItem value="Emergency Requirement">Emergency Requirement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs font-medium">{modalDict.requiredByDate}</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className={cn(
                                        "flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none transition-all hover:bg-slate-50",
                                        !requiredDate && "text-slate-400"
                                    )}>
                                        <span>
                                            {requiredDate
                                                ? format(requiredDate, "PPP")
                                                : modalDict.placeholders.date}
                                        </span>
                                        <CalendarIcon size={14} className="text-slate-400" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 border-none shadow-lg" align="end">
                                    <Calendar
                                        mode="single"
                                        selected={requiredDate}
                                        onSelect={setRequiredDate}
                                        initialFocus
                                        className="rounded-lg border shadow-sm bg-white"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                        <Label className="text-xs font-medium">{modalDict.notes}</Label>
                        <Textarea
                            placeholder={modalDict.placeholders.notes}
                            className="min-h-[80px] h-[80px] resize-none text-xs bg-white border-slate-200"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
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
