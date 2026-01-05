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

export default function BloodRequirementModal({
    open,
    onOpenChange,
    onSave,
    initialData = "",
}: BloodRequirementModalProps) {
    const [component, setComponent] = React.useState("");
    const [group, setGroup] = React.useState("A+"); // Default or fetched from patient data
    const [units, setUnits] = React.useState("");
    const [urgency, setUrgency] = React.useState("");
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [time, setTime] = React.useState("06:30"); // Default sample time
    const [notes, setNotes] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setComponent("");
            setUnits("");
            setUrgency("");
            setNotes("");
            // Keep default date/time/group for now
        }
    }, [open, initialData]);

    const handleSave = () => {
        onSave({
            component,
            group,
            units,
            urgency,
            date: date ? format(date, "dd/MM/yyyy") : "",
            time,
            notes
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">Add Blood Requirement</DialogTitle>
                        <p className="text-xs text-slate-500">Select Blood Requirement for the patient</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Row 1: Blood Component & Group */}
                    <div className="grid grid-cols-[2fr_1fr] gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Blood Component *</Label>
                            <Select value={component} onValueChange={setComponent}>
                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Select Blood Component" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="prbc">Packed Red Blood Cells (PRBC)</SelectItem>
                                    <SelectItem value="ffp">Fresh Frozen Plasma (FFP)</SelectItem>
                                    <SelectItem value="platelets">Platelets</SelectItem>
                                    <SelectItem value="whole_blood">Whole Blood</SelectItem>
                                    <SelectItem value="cryo">Cryoprecipitate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Blood Group</Label>
                            <div className="h-8 px-3 rounded-md bg-blue-100/50 border border-blue-100 flex items-center text-xs font-medium text-slate-700">
                                {group}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Units & Urgency */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Units</Label>
                            <Select value={units} onValueChange={setUnits}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Units" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Unit</SelectItem>
                                    <SelectItem value="2">2 Units</SelectItem>
                                    <SelectItem value="3">3 Units</SelectItem>
                                    <SelectItem value="4">4 Units</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                    </div>

                    {/* Row 3: Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-8 text-xs justify-start text-left font-normal px-3",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex-1">
                                            {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                                        </div>
                                        <CalendarIcon className="ml-auto h-3.5 w-3.5 text-green-500 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Time</Label>
                            <Select value={time} onValueChange={setTime}>
                                <SelectTrigger className={cn("w-full h-8 text-xs px-3", !time && "text-muted-foreground")}>
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

                    {/* Clinical Notes */}
                    <div className="space-y-1">
                        <Label className="text-xs">Clinical Notes (Optional)</Label>
                        <Textarea
                            placeholder="Enter Clinical Notes"
                            className="min-h-[60px] h-[60px] resize-none text-xs"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-2">
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
