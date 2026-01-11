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
import { useDictionary } from "@/i18n/use-dictionary";

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
  const dict = useDictionary();
  const details = dict.pages.surgery.surgeryDetails.details;

  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="text-base font-bold text-slate-800">{details.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectField
          label={details.fields.procedure}
          placeholder={details.placeholders.selectProcedure}
          options={PROCEDURE_OPTIONS}
        />

        {/* Department */}
        <SelectField
          label={details.fields.department}
          placeholder={details.placeholders.selectCategory}
          options={DEPARTMENT_OPTIONS}
        />

        {/* Urgency & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">{details.fields.urgency}</Label>
            <Input
              type="text"
              placeholder={details.placeholders.enterUrgency}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">{details.fields.estimatedDuration}</Label>
            <Input
              type="text"
              placeholder={details.placeholders.selectDuration}
              className="h-10"
            />
          </div>
        </div>

        {/* Date, Time, OT Room */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Picker */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">{details.fields.surgeryDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-10 justify-start text-left font-normal px-3"
                >
                  <div className="flex-1">
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>{details.placeholders.selectDate}</span>}
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
            <Label className="text-xs font-medium text-slate-800">{details.fields.surgeryTime}</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full h-10 px-3">
                <div className="flex-1 text-left">
                  <SelectValue placeholder={details.placeholders.selectTime} />
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
            label={details.fields.otRoom}
            placeholder={details.placeholders.selectOtRoom}
            options={OT_ROOM_OPTIONS}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SurgeryFormSection;