"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";

import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

export interface OrderLabData {
    test: string;
    urgency: string;
    isRequired: boolean;
    notes?: string;
}

const orderLabSchema = z.object({
    test: z.string().min(1, "Required"),
    urgency: z.string().min(1, "Required"),
    isRequired: z.boolean(),
    notes: z.string().optional(),
});

type OrderLaboratoryTestModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: OrderLabData) => void;
    testOptions: { value: string; label: string }[];
    initialTest?: string;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function OrderLaboratoryTestModal({
    open,
    onOpenChange,
    onSave,
    testOptions,
    initialTest = "",
}: OrderLaboratoryTestModalProps) {
    const dict = useDictionary();

    const form = useForm<OrderLabData>({
        resolver: zodResolver(orderLabSchema),
        defaultValues: {
            test: initialTest,
            urgency: "",
            isRequired: false,
            notes: "",
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                test: initialTest,
                urgency: "",
                isRequired: false,
                notes: "",
            });
        }
    }, [open, initialTest, form]);

    const handleSave = (data: OrderLabData) => {
        onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] gap-6">
                <DialogHeader className="border-b pb-4 mb-2">
                    <DialogTitle className="text-xl font-semibold">{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.title}</DialogTitle>
                    <p className="text-sm text-slate-500">{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.subtitle}</p>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                        {/* Select Test */}
                        <FormField
                            control={form.control}
                            name="test"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <Label>{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.selectTests}</Label>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.selectTests} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {testOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Urgency and Required Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label>{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.urgency}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.selectUrgency} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="routine">{dict.pages.surgery.common.sort.routine}</SelectItem>
                                                <SelectItem value="urgent">{dict.pages.surgery.common.sort.urgent}</SelectItem>
                                                <SelectItem value="stat">{dict.pages.surgery.common.sort.stat}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isRequired"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label>{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.required}</Label>
                                        <div className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-100 h-[calc(100%-24px)] mt-auto">
                                            <FormControl>
                                                <Checkbox
                                                    id="required-check"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="mt-0.5"
                                                />
                                            </FormControl>
                                            <label
                                                htmlFor="required-check"
                                                className="text-xs text-slate-600 leading-tight cursor-pointer"
                                            >
                                                {dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.requiredMessage}
                                            </label>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Clinical Notes */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <Label>{dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.notes}</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.orderLab.notesPlaceholder}
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0 mt-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium px-8">
                                {dict.pages.surgery.surgeryDetails.common.cancel}
                            </Button>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium px-8">
                                {dict.pages.surgery.surgeryDetails.common.save}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
