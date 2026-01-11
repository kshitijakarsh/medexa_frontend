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
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
import { useDictionary } from "@/i18n/use-dictionary";

type AddConsumptionLogModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: any) => void;
    editId?: string;
};

import { createPatientsApiClient } from "@/lib/api/patients-api";
import { useWardStock, useCreateConsumptionLog, useConsumptionLog, useUpdateConsumptionLog } from "@/app/[lang]/surgery/_hooks/useWard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { toast } from "@workspace/ui/lib/sonner";

const consumptionLogSchema = z.object({
    usageType: z.enum(["Patient", "Ward"]),
    patient: z.string().optional(),
    itemName: z.string().min(1, "Item name is required"),
    quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Quantity must be a positive number",
    }),
    reason: z.string().min(1, "Reason is required"),
    notes: z.string().optional(),
}).refine((data) => {
    if (data.usageType === "Patient" && !data.patient) {
        return false;
    }
    return true;
}, {
    message: "Patient is required when usage type is Patient",
    path: ["patient"],
});

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
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const modalDict = wardStoreDict.consumptionLog.modal;
    const optionsDict = wardStoreDict.options;

    const patientsApi = createPatientsApiClient({});
    const createLogMutation = useCreateConsumptionLog();
    const updateLogMutation = useUpdateConsumptionLog();

    const { data: logData, isLoading: isLoadingLog } = useConsumptionLog(editId);

    const form = useForm<z.infer<typeof consumptionLogSchema>>({
        resolver: zodResolver(consumptionLogSchema),
        defaultValues: {
            usageType: "Patient",
            patient: "",
            itemName: "",
            quantity: "",
            reason: "",
            notes: "",
        },
    });

    const usageType = form.watch("usageType");

    useEffect(() => {
        if (logData?.data) {
            const log = logData.data;
            form.reset({
                usageType: (log.usage_type.charAt(0).toUpperCase() + log.usage_type.slice(1)) as "Patient" | "Ward",
                patient: log.patient_id || "",
                itemName: log.item_name || "",
                quantity: log.quantity.toString() || "",
                reason: log.reason || "",
                notes: log.notes || "",
            });
        } else if (!editId && open) {
            form.reset({
                usageType: "Patient",
                patient: "",
                itemName: "",
                quantity: "",
                reason: "",
                notes: "",
            });
        }
    }, [logData, open, editId, form]);

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

    const handleSave = (data: z.infer<typeof consumptionLogSchema>) => {
        const payload = {
            usage_type: data.usageType.toLowerCase() as "patient" | "ward",
            patient_id: data.usageType === "Patient" ? data.patient : undefined,
            item_name: data.itemName,
            quantity: Number(data.quantity),
            reason: data.reason || "",
            notes: data.notes || "",
        };

        if (editId) {
            updateLogMutation.mutate({ id: editId, payload }, {
                onSuccess: () => {
                    onOpenChange(false);
                    onSave?.(payload);
                }
            });
        } else {
            createLogMutation.mutate(payload, {
                onSuccess: () => {
                    onOpenChange(false);
                    onSave?.(payload);
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
                            {editId ? modalDict.editTitle || "Edit Consumption Log" : modalDict.title}
                        </DialogTitle>
                        <p className="text-xs text-slate-500">
                            {editId ? modalDict.editSubtitle || "Update consumption details for the patient or ward" : modalDict.subtitle}
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        <div className="space-y-3">
                            {/* Usage Type */}
                            <FormField
                                control={form.control}
                                name="usageType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-medium">{modalDict.usageType}</Label>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-10 text-xs bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder={modalDict.placeholders.usageType} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Patient">{optionsDict.usageTypes.patient}</SelectItem>
                                                <SelectItem value="Ward">{optionsDict.usageTypes.ward}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            {usageType === "Patient" && (
                                <>
                                    {/* Patient & Item Name */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="patient"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label className="text-xs font-medium">{modalDict.patient}</Label>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                                <SelectValue placeholder={modalDict.placeholders.patient} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {patientsData?.map((p) => (
                                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                                    {p.first_name} {p.last_name}
                                                                </SelectItem>
                                                            ))}
                                                            {(!patientsData || patientsData.length === 0) && (
                                                                <SelectItem value="none" disabled>{dict.common.noData}</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
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
                                                            {allItems?.map((item: any) => (
                                                                <SelectItem key={item.id} value={item.item_name}>
                                                                    {item.item_name}
                                                                </SelectItem>
                                                            ))}
                                                            {(!allItems || allItems.length === 0) && (
                                                                <SelectItem value="none" disabled>{dict.common.noData}</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Quantity & Reason */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label className="text-xs font-medium">{modalDict.quantity}</Label>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={modalDict.placeholders.quantity}
                                                            className="h-10 text-xs px-3 bg-white border-slate-200"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="reason"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label className="text-xs font-medium">{modalDict.reason}</Label>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={modalDict.placeholders.reason}
                                                            className="h-10 text-xs px-3 bg-white border-slate-200"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {usageType === "Ward" && (
                                <>
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
                                                        {allItems?.map((item: any) => (
                                                            <SelectItem key={item.id} value={item.item_name}>
                                                                {item.item_name}
                                                            </SelectItem>
                                                        ))}
                                                        {(!allItems || allItems.length === 0) && (
                                                            <SelectItem value="none" disabled>{dict.common.noData}</SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Quantity & Reason */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label className="text-xs font-medium">{modalDict.quantity}</Label>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={modalDict.placeholders.quantity}
                                                            className="h-10 text-xs px-3 bg-white border-slate-200"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
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
                                                            <SelectItem value="Routine">{optionsDict.reasons.routine}</SelectItem>
                                                            <SelectItem value="Emergency">{optionsDict.reasons.emergency}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {usageType && (
                                /* Notes */
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
                            )}
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
                                disabled={createLogMutation.isPending || updateLogMutation.isPending}
                                className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-8 h-10 rounded-lg text-sm uppercase"
                            >
                                {createLogMutation.isPending || updateLogMutation.isPending ? dict.common.saving : (editId ? dict.common.update : dict.common.save)}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
