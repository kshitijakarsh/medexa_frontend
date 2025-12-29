import React from "react";
import SelectFieldWithAdd from "./AddField";
import { SelectField } from "./SelectField";

const SurgicalTeamSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-base font-bold text-slate-800 mb-5">Surgical Team</h3>

      <div className="space-y-4">
        <SelectField
          label="Select Surgeon Team"
          placeholder="Select Surgeon Team"
        />

        {/* Surgeon */}
        <SelectField label="Surgeon" placeholder="Select Surgeon" />

        {/* Assistant Surgeons (with Add button) */}
        <SelectFieldWithAdd
          label="Assistant Surgeons"
          placeholder="Select Assistant Surgeons"
        />

        {/* Anaesthetist (with Add button) */}
        <SelectFieldWithAdd
          label="Anaesthetist"
          placeholder="Select Anaesthetist"
        />

        {/* Scrub Nurse (with Add button) */}
        <SelectFieldWithAdd
          label="Scrub Nurse"
          placeholder="Select Scrub Nurse"
        />

        {/* Circulating Nurse */}
        <SelectField
          label="Circulating Nurse"
          placeholder="Select Circulating Nurse"
        />

        <SelectField label="OT Technician" placeholder="Select OT Technician" />
      </div>
    </div>
  );
};

export default SurgicalTeamSection;