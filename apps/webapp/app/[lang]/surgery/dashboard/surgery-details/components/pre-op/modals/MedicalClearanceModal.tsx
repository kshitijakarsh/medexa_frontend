"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";
import { X } from "lucide-react";

import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

const medicalClearanceSchema = z.object({
    clearanceType: z.string().min(1, "Required"),
    doctor: z.string().min(1, "Required"),
    urgency: z.string().min(1, "Required"),
    isRequired: z.boolean(),
    notes: z.string().optional(),
});

type MedicalClearanceData = z.infer<typeof medicalClearanceSchema>;

type MedicalClearanceModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: MedicalClearanceData) => void;
    clearanceOptions: { value: string; label: string }[];
    doctorOptions: { value: string; label: string }[];
    initialClearance?: string;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function MedicalClearanceModal({
    open,
    onOpenChange,
    onSave,
    clearanceOptions,
    doctorOptions,
    initialClearance = "",
}: MedicalClearanceModalProps) {
    const dict = useDictionary();

    const form = useForm<MedicalClearanceData>({
        resolver: zodResolver(medicalClearanceSchema),
        defaultValues: {
            clearanceType: initialClearance,
            doctor: "",
            urgency: "",
            isRequired: false,
            notes: "",
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                clearanceType: initialClearance,
                doctor: "",
                urgency: "",
                isRequired: false,
                notes: "",
            });
        }
    }, [open, initialClearance, form]);

    const handleSave = (data: MedicalClearanceData) => {
        onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.title}</DialogTitle>
                        <p className="text-xs text-slate-500 font-medium">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.subtitle}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        {/* Clearance Type and Doctor Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="clearanceType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.clearanceType}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.clearanceType} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                                {clearanceOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value} className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="doctor"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.doctor}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.doctorPlaceholder} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                                {doctorOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value} className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Urgency and Required Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.urgency}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="h-8 w-full border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-slate-50 shadow-sm transition-all hover:bg-slate-100/50">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.selectUrgency} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-md border-slate-200 shadow-xl">
                                                <SelectItem value="routine" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">{dict.pages.surgery.common.sort.routine}</SelectItem>
                                                <SelectItem value="urgent" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">{dict.pages.surgery.common.sort.urgent}</SelectItem>
                                                <SelectItem value="stat" className="py-1.5 focus:bg-blue-50 cursor-pointer text-xs">{dict.pages.surgery.common.sort.stat}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isRequired"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.required}</Label>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50/30 border border-blue-50 shadow-sm">
                                            <FormControl>
                                                <Checkbox
                                                    id="required-check-clearance"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="w-3.5 h-3.5 rounded border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                                />
                                            </FormControl>
                                            <label
                                                htmlFor="required-check-clearance"
                                                className="text-xs text-slate-600 leading-normal cursor-pointer overflow-hidden text-ellipsis"
                                            >
                                                {dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.requiredMessage}
                                            </label>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Notes Row */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="text-xs font-semibold text-slate-900">{dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.notes}</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.medicalClearance.notesPlaceholder}
                                            className="min-h-[60px] h-[60px] pt-2 px-3 border-slate-200 focus:ring-blue-500 rounded-md text-xs text-slate-600 bg-white shadow-sm transition-all resize-none placeholder:text-slate-400 hover:border-blue-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0 mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-6 w-24 h-8 rounded-md border text-[10px] uppercase tracking-wider"
                            >
                                {dict.pages.surgery.surgeryDetails.common.cancel}
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider"
                            >
                                {dict.pages.surgery.surgeryDetails.common.add}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
