"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { SelectField } from "@/app/[lang]/surgery/components/common/SelectField";

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

const SurgeryFormSection: React.FC = () => {
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
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Surgery Date</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Select Date"
                className="h-10 pr-10"
              />
              <CalendarIcon size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-800">Surgery Time</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Select Time"
                className="h-10 pr-10"
              />
              <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            </div>
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