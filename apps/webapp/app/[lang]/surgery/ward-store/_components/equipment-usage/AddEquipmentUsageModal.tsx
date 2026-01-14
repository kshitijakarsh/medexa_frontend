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
import { z } from "@workspace/ui/lib/zod";
import { toast } from "@workspace/ui/lib/sonner";
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
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";
import { zodResolver } from "@workspace/ui/lib/zod";

type AddEquipmentUsageModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: any) => void;
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

import { useDictionary } from "@/i18n/use-dictionary";

export function AddEquipmentUsageModal({
    open,
    onOpenChange,
    onSave,
    editId,
}: AddEquipmentUsageModalProps) {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const modalDict = wardStoreDict.equipmentUsage.modal;
    const optionsDict = wardStoreDict.options;

    const patientsApi = createPatientsApiClient({});
    const wardApi = createWardApiClient({});
    const createLogMutation = useCreateEquipmentUsageLog();
    const updateLogMutation = useUpdateEquipmentUsageLog();

    const { data: logData, isLoading: isLoadingLog } = useEquipmentUsageLog(editId);

    const equipmentUsageSchema = z.object({
        itemName: z.string().min(1, "Item name is required"),
        assetId: z.string().min(1, "Asset ID is required"),
        startTime: z.date(),
        endTime: z.date().optional(),
        patient: z.string().optional(),
        condition: z.string().optional(),
        notes: z.string().optional(),
    });

    type EquipmentUsageData = z.infer<typeof equipmentUsageSchema>;

    const form = useForm<EquipmentUsageData>({
        resolver: zodResolver(equipmentUsageSchema),
        defaultValues: {
            itemName: "",
            assetId: "",
            startTime: undefined,
            endTime: undefined,
            patient: "",
            condition: "",
            notes: "",
        },
    });

    useEffect(() => {
        if (logData?.data) {
            const log = logData.data;
            form.reset({
                patient: log.patient_id || "",
                itemName: log.item_name || "",
                assetId: log.asset_id || "",
                condition: log.condition_before_use || "",
                startTime: log.start_time ? new Date(log.start_time) : undefined,
                endTime: log.end_time ? new Date(log.end_time) : undefined,
                notes: log.notes || "",
            });
        } else if (!editId && open) {
            form.reset({
                patient: "",
                itemName: "",
                assetId: "",
                condition: "",
                startTime: undefined,
                endTime: undefined,
                notes: "",
            });
        }
    }, [logData, open, editId, form]);

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

    const handleSave = (data: EquipmentUsageData) => {
        const payload = {
            item_name: data.itemName,
            asset_id: data.assetId,
            condition_before_use: data.condition || "Good",
            start_time: data.startTime?.toISOString() || "",
            end_time: data.endTime?.toISOString(),
            notes: data.notes || "",
            patient_id: data.patient || undefined
        };

        if (editId) {
            updateLogMutation.mutate({ id: editId, payload }, {
                onSuccess: () => {
                    toast.success(dict.common.save);
                    onOpenChange(false);
                    onSave?.(payload);
                },
                onError: (error) => {
                    toast.error("Something went wrong");
                    console.error("Update failed", error);
                }
            });
        } else {
            createLogMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success(dict.common.save);
                    onOpenChange(false);
                    onSave?.(payload);
                },
                onError: (error) => {
                    toast.error("Something went wrong");
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
                            {editId ? modalDict.editTitle : modalDict.title}
                        </DialogTitle>
                        <p className="text-xs text-slate-500">
                            {editId ? modalDict.editSubtitle : modalDict.subtitle}
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        <div className="space-y-3">
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
                                                    {patientsData?.map((p: any) => (
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
                                                    {allEquipment?.map((item: any) => (
                                                        <SelectItem key={item.id} value={item.item_name}>
                                                            {item.item_name}
                                                        </SelectItem>
                                                    ))}
                                                    {(!allEquipment || allEquipment.length === 0) && (
                                                        <SelectItem value="none" disabled>{dict.common.noData}</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Asset ID & Condition */}
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="assetId"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.assetId}</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                        <SelectValue placeholder={modalDict.placeholders.assetId} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="ASSET-001">ASSET-001</SelectItem>
                                                    <SelectItem value="ASSET-002">ASSET-002</SelectItem>
                                                    <SelectItem value="ASSET-003">ASSET-003</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="condition"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.condition}</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-10 text-xs bg-white border-slate-200">
                                                        <SelectValue placeholder={modalDict.placeholders.condition} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="New">{optionsDict.conditions.new}</SelectItem>
                                                    <SelectItem value="Good">{optionsDict.conditions.good}</SelectItem>
                                                    <SelectItem value="Damaged">{optionsDict.conditions.damaged}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Start Time & End Time */}
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="startTime"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.startTime}</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full h-10 text-xs justify-start text-left font-normal px-3",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <div className="flex-1">
                                                                {field.value ? format(field.value, "dd/MM/yyyy") : <span>{modalDict.placeholders.startTime}</span>}
                                                            </div>
                                                            <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endTime"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <Label className="text-xs font-medium">{modalDict.endTime}</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full h-10 text-xs justify-start text-left font-normal px-3",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <div className="flex-1">
                                                                {field.value ? format(field.value, "dd/MM/yyyy") : <span>{modalDict.placeholders.endTime}</span>}
                                                            </div>
                                                            <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
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
                                disabled={createLogMutation.isPending || updateLogMutation.isPending}
                                className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-8 h-10 rounded-lg text-sm uppercase disabled:opacity-50"
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
