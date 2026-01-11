"use client";

import React from "react";
import { format } from "@workspace/ui/hooks/use-date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";

import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

const bloodRequirementSchema = z.object({
    component: z.string().min(1, "Required"),
    group: z.string().min(1, "Required"),
    units: z.string().min(1, "Required"),
    urgency: z.string().min(1, "Required"),
    date: z.date(),
    time: z.string().min(1, "Required"),
    notes: z.string().optional(),
});


type BloodFormData = z.infer<typeof bloodRequirementSchema>;

type BloodData = {
    component: string;
    group: string;
    units: string;
    urgency: string;
    date: string;
    time: string;
    notes: string;
};

type BloodRequirementModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: BloodData) => void;
    initialData?: string;
};

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const paddedHours = hours.toString().padStart(2, "0");
    return `${paddedHours}:${minutes}`;
});

import { useDictionary } from "@/i18n/use-dictionary";

export default function BloodRequirementModal({
    open,
    onOpenChange,
    onSave,
    initialData = "",
}: BloodRequirementModalProps) {
    const dict = useDictionary();

    const form = useForm<BloodFormData>({
        resolver: zodResolver(bloodRequirementSchema),
        defaultValues: {
            component: "",
            group: "A+",
            units: "",
            urgency: "",
            date: new Date(),
            time: "06:30",
            notes: "",
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                component: "",
                group: "A+",
                units: "",
                urgency: "",
                date: new Date(),
                time: "06:30",
                notes: "",
            });
        }
    }, [open, initialData, form]);

    const handleSave = (data: BloodFormData) => {
        onSave({
            ...data,
            date: data.date ? format(data.date, "dd/MM/yyyy") : "",
            notes: data.notes || ""
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.title}</DialogTitle>
                        <p className="text-xs text-slate-500">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.subtitle}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        {/* Row 1: Blood Component & Group */}
                        <div className="grid grid-cols-[2fr_1fr] gap-3">
                            <FormField
                                control={form.control}
                                name="component"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.bloodComponent}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.selectBloodComponent} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="prbc">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.components.prbc}</SelectItem>
                                                <SelectItem value="ffp">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.components.ffp}</SelectItem>
                                                <SelectItem value="platelets">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.components.platelets}</SelectItem>
                                                <SelectItem value="whole_blood">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.components.whole_blood}</SelectItem>
                                                <SelectItem value="cryo">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.components.cryo}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-1">
                                <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.bloodGroup}</Label>
                                <div className="h-8 px-3 rounded-md bg-blue-100/50 border border-blue-100 flex items-center text-xs font-medium text-slate-700">
                                    {form.watch("group")}
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Units & Urgency */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="units"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.units}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.selectUnits} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1 {dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.unitLabel}</SelectItem>
                                                <SelectItem value="2">2 {dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.unitsLabel}</SelectItem>
                                                <SelectItem value="3">3 {dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.unitsLabel}</SelectItem>
                                                <SelectItem value="4">4 {dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.unitsLabel}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.urgency}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.selectUrgency} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="routine">{dict.pages.surgery.common.sort.routine}</SelectItem>
                                                <SelectItem value="urgent">{dict.pages.surgery.common.sort.urgent}</SelectItem>
                                                <SelectItem value="stat">{dict.pages.surgery.common.sort.stat}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 3: Date & Time */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.date}</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full h-8 text-xs justify-start text-left font-normal px-3",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <div className="flex-1">
                                                            {field.value ? format(field.value, "dd/MM/yyyy") : <span>{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.pickDate}</span>}
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
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.time}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className={cn("w-full h-8 text-xs px-3", !field.value && "text-muted-foreground")}>
                                                    <div className="flex-1 text-left">
                                                        <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.selectTime} />
                                                    </div>
                                                    <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[200px]">
                                                {TIME_SLOTS.map((slot) => (
                                                    <SelectItem key={slot} value={slot}>
                                                        {slot}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                    <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.clinicalNotes}</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirement.clinicalNotesPlaceholder}
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
                                {dict.pages.surgery.surgeryDetails.common.cancel}
                            </Button>
                            <Button type="submit" className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider">
                                {dict.pages.surgery.surgeryDetails.common.save}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
