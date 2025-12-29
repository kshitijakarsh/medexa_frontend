"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { MOCK_DATA } from "@/app/[lang]/surgery/lib/constants";
import NewButton from "@/components/common/new-button";
import SurgeryFormSection from "./SurgeryFormSection";
import SurgicalTeamSection from "./SurgicalTeamSection";
import ClinicalSidebar from "./ClinicalSidebar";
import { DetailSection } from "./DetailsSection";
import { InfoField } from "@/app/[lang]/surgery/components/common/InfoField";
import { ClinicalList } from "./ClinicalList";

interface SurgeryDetailsTabProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const SurgeryDetailsTab = ({ isEditing, setIsEditing }: SurgeryDetailsTabProps) => {

  return (
    <div className="flex flex-col gap-4">
      {isEditing ? (
        <div className="flex w-full gap-4">
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            <SurgeryFormSection />
            <SurgicalTeamSection />

            <div className="mt-auto flex w-full justify-end gap-3 pt-4">
              <button
                className="px-6 py-2 border border-blue-500 rounded-lg text-sm"
                onClick={() => setIsEditing(false)}
              >
                CANCEL
              </button>
              <button
                className="flex gap-2 items-center px-4 py-2 rounded-lg bg-green-room text-white"
                onClick={() => setIsEditing(false)}
              >
                <Send size={18} /> Update Request
              </button>
            </div>
          </div>

          <div className="w-90 shrink-0">
            <ClinicalSidebar />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <DetailSection title="Schedule Surgery">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label="Procedure"
                  value={MOCK_DATA.surgery.procedure}
                />
                <InfoField
                  label="Department"
                  value={MOCK_DATA.surgery.department}
                />

                <InfoField label="Urgency" value={MOCK_DATA.surgery.urgency} />
                <InfoField
                  label="Estimated Duration (hours)"
                  value={MOCK_DATA.surgery.estimatedDuration}
                />

                <InfoField
                  label="Surgery Date"
                  value={MOCK_DATA.surgery.date}
                />
                <InfoField
                  label="Surgery Time"
                  value={MOCK_DATA.surgery.time}
                />

                <InfoField label="OT Room" value={MOCK_DATA.surgery.otRoom} />
              </div>
            </DetailSection>

            <DetailSection title="Surgical Team">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label="Select Surgeon Team"
                  value={MOCK_DATA.team.teamName}
                />
                <InfoField label="Surgeon" value={MOCK_DATA.team.surgeon.name} />

                <InfoField
                  label="Assistant Surgeons"
                  value={MOCK_DATA.team.assistants.map((d) => d.name).join(", ")}
                />
                <InfoField
                  label="Anaesthetist"
                  value={MOCK_DATA.team.anaesthetist.name}
                />

                <InfoField
                  label="Scrub Nurse"
                  value={MOCK_DATA.team.scrubNurse}
                />
                <InfoField
                  label="Circulating Nurse"
                  value={MOCK_DATA.team.circulatingNurse}
                />

                <InfoField
                  label="OT Technician"
                  value={MOCK_DATA.team.otTechnician}
                />
              </div>
            </DetailSection>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <ClinicalList
              title="Active Problems"
              items={MOCK_DATA.activeProblems}
              type="problem"
            />
            <ClinicalList
              title="Allergies"
              items={MOCK_DATA.allergies}
              type="allergy"
            />
            <ClinicalList
              title="Ongoing Medications"
              items={MOCK_DATA.medications.map((m) => ({
                id: String(m.slNo),
                name: m.name,
                detail: `${m.dose} - ${m.frequency}`,
                type: "medication",
              }))}
              type="medication"
            />
          </div>
        </div>
      )}
    </div>
  );
};
