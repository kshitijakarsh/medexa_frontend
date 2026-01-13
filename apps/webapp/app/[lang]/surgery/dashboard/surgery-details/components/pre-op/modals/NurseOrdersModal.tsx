"use client";

import React from "react";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";
import { Clock, Calendar as CalendarIcon, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";

import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

const nurseOrderSchema = z.object({
    orderType: z.string().min(1, "Required"),
    fluidType: z.string().optional(),
    volume: z.string().optional(),
    rate: z.string().optional(),
    duration: z.string().optional(),
    urgency: z.string().optional(),
    totalVolume: z.string().optional(),
    totalBottles: z.string().optional(),
    startDate: z.date().optional(),
    startTime: z.string().min(1, "Required"),
    injection: z.string().optional(),
    dose: z.string().optional(),
    notes: z.string().optional(),
    isRequired: z.boolean(),
});

type NurseOrderFormData = z.infer<typeof nurseOrderSchema>;

type NurseOrderData = {
    orderType: string;
    fluidType: string;
    volume: string;
    rate: string;
    duration: string;
    urgency: string;
    totalVolume: string;
    totalBottles: string;
    startDate: string;
    startTime: string;
    injection: string;
    dose: string;
    notes: string;
    isRequired: boolean;
};

type NurseOrdersModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: NurseOrderData) => void;
    initialOrder?: string;
};

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const paddedHours = hours.toString().padStart(2, "0");
    return `${paddedHours}:${minutes}`;
});

import { useDictionary } from "@/i18n/use-dictionary";

export default function NurseOrdersModal({
    open,
    onOpenChange,
    onSave,
    initialOrder = "",
}: NurseOrdersModalProps) {
    const dict = useDictionary();

    const form = useForm<NurseOrderFormData>({
        resolver: zodResolver(nurseOrderSchema),
        defaultValues: {
            orderType: "iv_fluids",
            fluidType: "",
            volume: "",
            rate: "",
            duration: "",
            urgency: "",
            totalVolume: "200",
            totalBottles: "3",
            startDate: undefined,
            startTime: "06:30",
            injection: "",
            dose: "",
            notes: "",
            isRequired: false,
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                orderType: "iv_fluids",
                fluidType: "",
                volume: "",
                rate: "",
                duration: "",
                urgency: "",
                totalVolume: "200",
                totalBottles: "3",
                startDate: undefined,
                startTime: "06:30",
                injection: "",
                dose: "",
                notes: "",
                isRequired: false,
            });
        }
    }, [open, initialOrder, form]);

    const handleSave = (data: NurseOrderFormData) => {
        onSave({
            ...data,
            fluidType: data.fluidType || "",
            volume: data.volume || "",
            rate: data.rate || "",
            duration: data.duration || "",
            urgency: data.urgency || "",
            totalVolume: data.totalVolume || "",
            totalBottles: data.totalBottles || "",
            startDate: data.startDate ? format(data.startDate, "dd/MM/yyyy") : "",
            injection: data.injection || "",
            dose: data.dose || "",
            notes: data.notes || "",
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.title}</DialogTitle>
                        <p className="text-xs text-slate-500">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.addOrder}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
                        {/* Row 1: Order Type & Required */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="orderType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.orderType}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectOrderType} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="iv_fluids">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.types.iv_fluids}</SelectItem>
                                                <SelectItem value="medication">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.types.medication}</SelectItem>
                                                <SelectItem value="monitoring">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.types.monitoring}</SelectItem>
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
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.required}</Label>
                                        <div className="flex items-start gap-2 p-1.5 rounded-md bg-slate-50 border border-slate-100 h-8">
                                            <FormControl>
                                                <Checkbox
                                                    id="req-check"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="mt-0.5 h-3.5 w-3.5"
                                                />
                                            </FormControl>
                                            <label htmlFor="req-check" className="text-[10px] text-slate-600 leading-tight cursor-pointer mt-0.5">
                                                {dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.requiredMessage}
                                            </label>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2: Fluid Type & Volume */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="fluidType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.fluidType}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectFluidType} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="ns">Normal Saline (NS)</SelectItem>
                                                <SelectItem value="rl">Ringer's Lactate (RL)</SelectItem>
                                                <SelectItem value="d5">Dextrose 5%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="volume"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.volume}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectVolume} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="500">500 mL</SelectItem>
                                                <SelectItem value="1000">1000 mL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 3: Rate & Duration */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.rate}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectRate} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="50">50 mL/hr</SelectItem>
                                                <SelectItem value="100">100 mL/hr</SelectItem>
                                                <SelectItem value="125">125 mL/hr</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.duration}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectDuration} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="24h">24 Hours</SelectItem>
                                                <SelectItem value="48h">48 Hours</SelectItem>
                                                <SelectItem value="3d">3 Days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 4: Urgency & Totals */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.urgency}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectUrgency} />
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
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.totalVolume}</Label>
                                    <div className="h-8 px-3 py-1 bg-blue-50/50 rounded-md text-xs text-slate-700 flex items-center">
                                        {form.watch("totalVolume")}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.totalBottles}</Label>
                                    <div className="h-8 px-3 py-1 bg-blue-50/50 rounded-md text-xs text-slate-700 flex items-center">
                                        {form.watch("totalBottles")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 5: Start Date & Time */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.startDate}</Label>
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
                                                            {field.value ? format(field.value, "dd/MM/yyyy") : <span>{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.pickDate}</span>}
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
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.startTime}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className={cn("w-full h-8 text-xs px-3", !field.value && "text-muted-foreground")}>
                                                    <div className="flex-1 text-left">
                                                        <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectTime} />
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

                        {/* Row 6: Injection & Dose */}
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="injection"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.injection}</Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-8 text-xs">
                                                    <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectInjection} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pantop">Inj. Pantoprazole</SelectItem>
                                                <SelectItem value="ondem">Inj. Ondansetron</SelectItem>
                                                <SelectItem value="pcm">Inj. Paracetamol</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-end gap-2">
                                <FormField
                                    control={form.control}
                                    name="dose"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 flex-1">
                                            <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.dose}</Label>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-8 text-xs">
                                                        <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.selectVolume} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="40mg">40 mg</SelectItem>
                                                    <SelectItem value="4mg">4 mg</SelectItem>
                                                    <SelectItem value="1g">1 gm</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 rounded-md shrink-0">
                                    <Plus className="h-4 w-4 text-white" />
                                </Button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="text-xs">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.instructions}</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.instructionsPlaceholder}
                                            className="min-h-[50px] h-[50px] resize-none text-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0 mt-0">
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