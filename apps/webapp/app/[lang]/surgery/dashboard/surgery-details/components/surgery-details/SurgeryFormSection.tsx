"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { format } from "@workspace/ui/hooks/use-date-fns";

const PROCEDURE_OPTIONS = [
  { value: "appendectomy", label: "Appendectomy" },
  { value: "cataract_surgery", label: "Cataract Surgery" },
  { value: "knee_replacement", label: "Knee Replacement" },
];

const DEPARTMENT_OPTIONS = [
  { value: "general_surgery", label: "General Surgery" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "orthopedics", label: "Orthopedics" },
];

const OT_ROOM_OPTIONS = [
  { value: "ot_1", label: "OT Room 1" },
  { value: "ot_2", label: "OT Room 2" },
  { value: "ot_3", label: "OT Room 3" },
];

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  const paddedHours = hours.toString().padStart(2, "0");
  return `${paddedHours}:${minutes}`;
});

const SurgeryFormSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState<string>("08:00");

  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="text-base font-bold text-slate-800">Schedule Surgery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectField
          label="Procedure"
          placeholder="Select Procedure Name"
          options={PROCEDURE_OPTIONS}
        />

        {/* Department */}
        <SelectField
          label="Department"
          placeholder="Select Procedure Category"
          options={DEPARTMENT_OPTIONS}
        />

        {/* Urgency & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Urgency</Label>
            <Input
              type="text"
              placeholder="Enter Urgency"
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Estimated Duration (hours)</Label>
            <Input
              type="text"
              placeholder="Select Estimated Duration"
              className="h-10"
            />
          </div>
        </div>

        {/* Date, Time, OT Room */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Picker */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Surgery Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-10 justify-start text-left font-normal px-3"
                >
                  <div className="flex-1">
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Select Date</span>}
                  </div>
                  <CalendarIcon size={18} className="text-emerald-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Select */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Surgery Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full h-10 px-3">
                <div className="flex-1 text-left">
                  <SelectValue placeholder="Select Time" />
                </div>
                <Clock size={18} className="text-emerald-500 mr-2" />
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

          <SelectField
            label="OT Room"
            placeholder="Select OT Room"
            options={OT_ROOM_OPTIONS}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SurgeryFormSection;