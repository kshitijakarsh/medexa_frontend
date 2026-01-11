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
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
import { useEffect } from "react";

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
    const requestStockSchema = z.object({
        category: z.string().min(1, "Category is required"),
        itemName: z.string().min(1, "Item name is required"),
        quantity: z.string().min(1, "Quantity is required"),
        urgency: z.string().min(1, "Urgency is required"),
        reason: z.string().min(1, "Reason is required"),
        requiredDate: z.date().optional(),
        notes: z.string().optional(),
    });

    type RequestStockData = z.infer<typeof requestStockSchema>;

    const form = useForm<RequestStockData>({
        resolver: zodResolver(requestStockSchema),
        defaultValues: {
            category: "Consumables",
            itemName: "",
            quantity: "",
            urgency: "",
            reason: "",
            requiredDate: undefined,
            notes: "",
        },
    });

    const categoryWatch = form.watch("category");
    const wardApi = createWardApiClient({});

    const { data: stockData } = useQuery({
        queryKey: ["ward-stock-small-list", categoryWatch],
        queryFn: async () => {
            const response = await wardApi.getWardStock({ category: categoryWatch });
            return response.data.data;
        },
        enabled: open,
    });

    useEffect(() => {
        if (open) {
            form.reset({
                category: "Consumables",
                itemName: "",
                quantity: "",
                urgency: "",
                reason: "",
                requiredDate: undefined,
                notes: "",
            });
        }
    }, [open, form]);

    const handleSave = (data: RequestStockData) => {
        onSave(data);
        onOpenChange(false);
    };

    const wardStoreDict = dict.pages.surgery.wardStore;
    const modalDict = wardStoreDict.stockRequests.modal;
    const optionsDict = wardStoreDict.options;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">{modalDict.title}</DialogTitle>
                        <p className="text-xs text-slate-500">{modalDict.subtitle}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        <div className="space-y-3">
                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-medium">{modalDict.category}</Label>
                                        <Select onValueChange={(val) => { field.onChange(val); form.setValue("itemName", ""); }} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-10 text-xs bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder={modalDict.placeholders.category} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Consumables">{optionsDict.categories.consumables}</SelectItem>
                                                <SelectItem value="Equipment">{optionsDict.categories.equipment}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            {/* Item Name */}
                            <FormField
                                control={form.control}
                                name="itemName"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-medium">{modalDict.itemName}</Label>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                    <SelectValue placeholder={modalDict.placeholders.itemName} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {stockData?.map((item) => (
                                                    <SelectItem key={item.id} value={item.id}>
                                                        {item.item_name}
                                                    </SelectItem>
                                                ))}
                                                {(!stockData || stockData.length === 0) && (
                                                    <SelectItem value="none" disabled>{dict.common.noData}</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity & Urgency */}
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.quantityNeeded}</Label>
                                            <FormControl>
                                                <Input
                                                    placeholder={modalDict.placeholders.quantity}
                                                    {...field}
                                                    className="h-10 text-xs px-3 bg-white border-slate-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="urgency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.urgency}</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                        <SelectValue placeholder={modalDict.placeholders.urgency} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="High">{optionsDict.urgency.high}</SelectItem>
                                                    <SelectItem value="Medium">{optionsDict.urgency.medium}</SelectItem>
                                                    <SelectItem value="Low">{optionsDict.urgency.low}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Reason & Date */}
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.reason}</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                        <SelectValue placeholder={modalDict.placeholders.reason} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Stock Depletion">{optionsDict.reasons.stockDepletion}</SelectItem>
                                                    <SelectItem value="Emergency Requirement">{optionsDict.reasons.emergencyRequirement}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="requiredDate"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.requiredByDate}</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <button className={cn(
                                                            "flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none transition-all hover:bg-slate-50",
                                                            !field.value && "text-slate-400"
                                                        )}>
                                                            <span>
                                                                {field.value
                                                                    ? format(field.value, "PPP")
                                                                    : modalDict.placeholders.date}
                                                            </span>
                                                            <CalendarIcon size={14} className="text-slate-400" />
                                                        </button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 border-none shadow-lg" align="end">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        className="rounded-lg border shadow-sm bg-white"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Notes */}
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-medium">{modalDict.notes}</Label>
                                        <FormControl>
                                            <Textarea
                                                placeholder={modalDict.placeholders.notes}
                                                className="min-h-[80px] h-[80px] resize-none text-xs bg-white border-slate-200"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-8 h-10 rounded-lg border text-sm uppercase"
                            >
                                {dict.common.cancel}
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-8 h-10 rounded-lg text-sm uppercase"
                            >
                                {dict.common.save}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
