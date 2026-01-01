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

export default function NurseOrdersModal({
    open,
    onOpenChange,
    onSave,
    initialOrder = "",
}: NurseOrdersModalProps) {
    const [orderType, setOrderType] = React.useState("iv_fluids");
    const [fluidType, setFluidType] = React.useState("");
    const [volume, setVolume] = React.useState("");
    const [rate, setRate] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [urgency, setUrgency] = React.useState("");
    const [totalVolume, setTotalVolume] = React.useState("200");
    const [totalBottles, setTotalBottles] = React.useState("3");
    const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
    const [startTime, setStartTime] = React.useState("06:30");
    const [injection, setInjection] = React.useState("");
    const [dose, setDose] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [isRequired, setIsRequired] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            setOrderType("iv_fluids"); // Default as per image
            setFluidType("");
            setVolume("");
            setRate("");
            setDuration("");
            setUrgency("");
            setStartDate(undefined);
            setStartTime("06:30");
            setInjection("");
            setDose("");
            setNotes("");
            setIsRequired(false);
        }
    }, [open, initialOrder]);

    const handleSave = () => {
        onSave({
            orderType,
            fluidType,
            volume,
            rate,
            duration,
            urgency,
            totalVolume,
            totalBottles,
            startDate: startDate ? format(startDate, "dd/MM/yyyy") : "",
            startTime,
            injection,
            dose,
            notes,
            isRequired
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">Nurse Orders</DialogTitle>
                        <p className="text-xs text-slate-500">Add Nurse Orders</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Row 1: Order Type & Required */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Order Type</Label>
                            <Select value={orderType} onValueChange={setOrderType}>
                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Select Order Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="iv_fluids">IV FLUIDS</SelectItem>
                                    <SelectItem value="medication">Medication</SelectItem>
                                    <SelectItem value="monitoring">Monitoring</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Required</Label>
                            <div className="flex items-start gap-2 p-1.5 rounded-md bg-slate-50 border border-slate-100 h-8">
                                <Checkbox
                                    id="req-check"
                                    checked={isRequired}
                                    onCheckedChange={(c) => setIsRequired(!!c)}
                                    className="mt-0.5 h-3.5 w-3.5"
                                />
                                <label htmlFor="req-check" className="text-[10px] text-slate-600 leading-tight cursor-pointer mt-0.5">
                                    Patient cannot proceed to next step.
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Fluid Type & Volume */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Fluid Type</Label>
                            <Select value={fluidType} onValueChange={setFluidType}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Fluid Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ns">Normal Saline (NS)</SelectItem>
                                    <SelectItem value="rl">Ringer's Lactate (RL)</SelectItem>
                                    <SelectItem value="d5">Dextrose 5%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Volume (mL)</Label>
                            <Select value={volume} onValueChange={setVolume}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Volume" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="500">500 mL</SelectItem>
                                    <SelectItem value="1000">1000 mL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 3: Rate & Duration */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Rate (mL/hr)</Label>
                            <Select value={rate} onValueChange={setRate}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="50">50 mL/hr</SelectItem>
                                    <SelectItem value="100">100 mL/hr</SelectItem>
                                    <SelectItem value="125">125 mL/hr</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Duration (hours/days)</Label>
                            <Select value={duration} onValueChange={setDuration}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="24h">24 Hours</SelectItem>
                                    <SelectItem value="48h">48 Hours</SelectItem>
                                    <SelectItem value="3d">3 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 4: Urgency & Totals */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Urgency</Label>
                            <Select value={urgency} onValueChange={setUrgency}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Urgency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="routine">Routine</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                    <SelectItem value="stat">Stat</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs">Total Volume</Label>
                                <div className="h-8 px-3 py-1 bg-blue-50/50 rounded-md text-xs text-slate-700 flex items-center">
                                    {totalVolume}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Total Bottles</Label>
                                <div className="h-8 px-3 py-1 bg-blue-50/50 rounded-md text-xs text-slate-700 flex items-center">
                                    {totalBottles}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 5: Start Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-8 text-xs justify-start text-left font-normal px-3",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex-1">
                                            {startDate ? format(startDate, "dd/MM/yyyy") : <span>Pick a date</span>}
                                        </div>
                                        <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Start Time</Label>
                            <Select value={startTime} onValueChange={setStartTime}>
                                <SelectTrigger className={cn("w-full h-8 text-xs px-3", !startTime && "text-muted-foreground")}>
                                    <div className="flex-1 text-left">
                                        <SelectValue placeholder="Select Time" />
                                    </div>
                                    <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {TIME_SLOTS.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                            {slot}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 6: Injection & Dose */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Injection</Label>
                            <Select value={injection} onValueChange={setInjection}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Injection" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pantop">Inj. Pantoprazole</SelectItem>
                                    <SelectItem value="ondem">Inj. Ondansetron</SelectItem>
                                    <SelectItem value="pcm">Inj. Paracetamol</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="space-y-1 flex-1">
                                <Label className="text-xs">Dose</Label>
                                <Select value={dose} onValueChange={setDose}>
                                    <SelectTrigger className="w-full h-8 text-xs">
                                        <SelectValue placeholder="Select Volume" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="40mg">40 mg</SelectItem>
                                        <SelectItem value="4mg">4 mg</SelectItem>
                                        <SelectItem value="1g">1 gm</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 rounded-md shrink-0">
                                <Plus className="h-4 w-4 text-white" />
                            </Button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-1">
                        <Label className="text-xs">Instructions / Notes</Label>
                        <Textarea
                            placeholder="Enter Instructions / Notes"
                            className="min-h-[50px] h-[50px] resize-none text-xs"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-6 w-24 h-8 rounded-md border text-[10px] uppercase tracking-wider">
                        CANCEL
                    </Button>
                    <Button onClick={handleSave} className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider">
                        SAVE
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
