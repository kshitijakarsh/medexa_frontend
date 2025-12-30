"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { SelectField } from "@/app/[lang]/surgery/components/common/SelectField";

const SURGEON_TEAM_OPTIONS = [
  { value: "team_a", label: "Team A" },
  { value: "team_b", label: "Team B" },
];

const SURGEON_OPTIONS = [
  { value: "dr_smith", label: "Dr. Smith" },
  { value: "dr_jones", label: "Dr. Jones" },
];

const ASSISTANT_OPTIONS = [
  { value: "dr_miller", label: "Dr. Miller" },
  { value: "dr_wilson", label: "Dr. Wilson" },
];

const ANAESTHETIST_OPTIONS = [
  { value: "dr_brown", label: "Dr. Brown" },
  { value: "dr_davis", label: "Dr. Davis" },
];

const NURSE_OPTIONS = [
  { value: "nurse_sarah", label: "Nurse Sarah" },
  { value: "nurse_emma", label: "Nurse Emma" },
];

const TECHNICIAN_OPTIONS = [
  { value: "tech_john", label: "John" },
  { value: "tech_mike", label: "Mike" },
];

const SurgicalTeamSection: React.FC = () => {
  return (
    <Card className="shadow-none border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-slate-800">Surgical Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectField
          label="Select Surgeon Team"
          placeholder="Select Surgeon Team"
          options={SURGEON_TEAM_OPTIONS}
        />

        {/* Surgeon */}
        <SelectField
          label="Surgeon"
          placeholder="Select Surgeon"
          options={SURGEON_OPTIONS}
        />

        {/* Assistant Surgeons (with Add button) */}
        <SelectField
          label="Assistant Surgeons"
          placeholder="Select Assistant Surgeons"
          options={ASSISTANT_OPTIONS}
          showAddButton
        />

        {/* Anaesthetist (with Add button) */}
        <SelectField
          label="Anaesthetist"
          placeholder="Select Anaesthetist"
          options={ANAESTHETIST_OPTIONS}
          showAddButton
        />

        {/* Scrub Nurse (with Add button) */}
        <SelectField
          label="Scrub Nurse"
          placeholder="Select Scrub Nurse"
          options={NURSE_OPTIONS}
          showAddButton
        />

        {/* Circulating Nurse */}
        <SelectField
          label="Circulating Nurse"
          placeholder="Select Circulating Nurse"
          options={NURSE_OPTIONS}
        />

        <SelectField
          label="OT Technician"
          placeholder="Select OT Technician"
          options={TECHNICIAN_OPTIONS}
        />
      </CardContent>
    </Card>
  );
};

export default SurgicalTeamSection;