import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { useDictionary } from "@/i18n/use-dictionary";

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
  const dict = useDictionary();
  const details = dict.pages.surgery.surgeryDetails.details;

  return (
    <Card className="shadow-none border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-slate-800">{details.surgicalTeam}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectField
          label={details.fields.surgeonTeam}
          placeholder={details.placeholders.selectSurgeonTeam}
          options={SURGEON_TEAM_OPTIONS}
        />

        {/* Surgeon */}
        <SelectField
          label={details.fields.surgeon}
          placeholder={details.placeholders.selectSurgeon}
          options={SURGEON_OPTIONS}
        />

        {/* Assistant Surgeons (with Add button) */}
        <SelectField
          label={details.fields.assistantSurgeons}
          placeholder={details.placeholders.selectAssistantSurgeons}
          options={ASSISTANT_OPTIONS}
          showAddButton
        />

        {/* Anaesthetist (with Add button) */}
        <SelectField
          label={details.fields.anaesthetist}
          placeholder={details.placeholders.selectAnaesthetist}
          options={ANAESTHETIST_OPTIONS}
          showAddButton
        />

        {/* Scrub Nurse (with Add button) */}
        <SelectField
          label={details.fields.scrubNurse}
          placeholder={details.placeholders.selectScrubNurse}
          options={NURSE_OPTIONS}
          showAddButton
        />

        {/* Circulating Nurse */}
        <SelectField
          label={details.fields.circulatingNurse}
          placeholder={details.placeholders.selectCirculatingNurse}
          options={NURSE_OPTIONS}
        />

        <SelectField
          label={details.fields.otTechnician}
          placeholder={details.placeholders.selectOtTechnician}
          options={TECHNICIAN_OPTIONS}
        />
      </CardContent>
    </Card>
  );
};

export default SurgicalTeamSection;