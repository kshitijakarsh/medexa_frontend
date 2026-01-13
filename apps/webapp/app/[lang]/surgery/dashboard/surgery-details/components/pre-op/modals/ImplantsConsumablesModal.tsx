"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";

import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

const implantSchema = z.object({
    implantType: z.string().min(1, "Required"),
    size: z.string().min(1, "Required"),
    batchNo: z.string().min(1, "Required"),
    manufacturer: z.string().min(1, "Required"),
    quantity: z.string().min(1, "Required"),
    notes: z.string().optional(),
});

type ImplantData = z.infer<typeof implantSchema>;

type ImplantsConsumablesModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: ImplantData) => void;
    initialData?: string;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function ImplantsConsumablesModal({
    open,
    onOpenChange,
    onSave,
    initialData = "",
}: ImplantsConsumablesModalProps) {
    const dict = useDictionary();

    const form = useForm<ImplantData>({
        resolver: zodResolver(implantSchema),
        defaultValues: {
            implantType: "",
            size: "",
            batchNo: "",
            manufacturer: "",
            quantity: "",
            notes: "",
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                implantType: "",
                size: "",
                batchNo: "",
                manufacturer: "",
                quantity: "",
                notes: "",
            });
        }
    }, [open, initialData, form]);

    const handleSave = (data: ImplantData) => {
        onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.title}</DialogTitle>
                        <p className="text-xs text-slate-500">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.subtitle}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        {/* Row 1: Implant Type & Size */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="implantType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.implantType}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.selectImplantType} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="mesh">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.types.mesh}</SelectItem>
                                                <SelectItem value="fixation">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.types.fixation}</SelectItem>
                                                <SelectItem value="clip">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.types.clip}</SelectItem>
                                                <SelectItem value="suture">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.types.suture}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.size}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.selectSize} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="15x15">15x15 cm</SelectItem>
                                                <SelectItem value="30x30">30x30 cm</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="small">Small</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2: Batch, Manufacturer, Quantity */}
                        <div className="grid grid-cols-3 gap-3">
                            <FormField
                                control={form.control}
                                name="batchNo"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.batchNo}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.selectBatchNo} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="bx102">BX-102</SelectItem>
                                                <SelectItem value="bx103">BX-103</SelectItem>
                                                <SelectItem value="bx104">BX-104</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="manufacturer"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.manufacturer}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.selectManufacturer} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ethicon">Ethicon</SelectItem>
                                                <SelectItem value="medtronic">Medtronic</SelectItem>
                                                <SelectItem value="bbraun">B. Braun</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.quantity}</Label>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.enterQuantity}
                                                className="h-8 text-xs"
                                                type="number"
                                                min="1"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Clinical Notes */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.clinicalNotes}</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.clinicalNotesPlaceholder}
                                            className="min-h-[60px] h-[60px] resize-none text-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0 mt-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-6 w-24 h-8 rounded-md border text-[10px] uppercase tracking-wider">
                                {dict.common.cancel}
                            </Button>
                            <Button type="submit" className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider">
                                {dict.common.save}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
