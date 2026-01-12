"use client";

import React from "react";
import { Send } from "lucide-react";
import { Surgery } from "@/lib/api/surgery/surgeries";
import SurgeryFormSection from "./SurgeryFormSection";
import SurgicalTeamSection from "./SurgicalTeamSection";
import ClinicalSidebar from "./ClinicalSidebar";
import { DetailSection } from "./DetailsSection";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";

import { useDictionary } from "@/i18n/use-dictionary";

interface SurgeryDetailsTabProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  surgeryId?: string;
  patientId?: string;
  surgeryData?: Surgery | null;
}

export const SurgeryDetailsTab = ({ isEditing, setIsEditing, patientId, surgeryData }: SurgeryDetailsTabProps) => {
  const dict = useDictionary();

  return (
    <div className="flex w-full gap-4">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {isEditing ? (
          <>
            <SurgeryFormSection />
            <SurgicalTeamSection />

            <div className="flex w-full justify-end gap-3 pt-4">
              <button
                className="px-6 py-2 border border-blue-500 rounded-lg text-sm"
                onClick={() => setIsEditing(false)}
              >
                {dict.pages.surgery.surgeryDetails.details.actions.cancel}
              </button>
              <button
                className="flex gap-2 items-center px-4 py-2 rounded-lg bg-green-500 text-white"
                onClick={() => setIsEditing(false)}
              >
                <Send size={18} /> {dict.pages.surgery.surgeryDetails.details.actions.updateRequest}
              </button>
            </div>
          </>
        ) : (
          <>
            <DetailSection title={dict.pages.surgery.surgeryDetails.details.title}>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.procedure}
                  value={surgeryData?.procedure?.name || "—"}
                />
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.department}
                  value={surgeryData?.department || "—"}
                />

                <InfoField label={dict.pages.surgery.surgeryDetails.details.fields.urgency} value={surgeryData?.urgency || "—"} />
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.estimatedDuration}
                  value={surgeryData?.duration?.toString() || "—"}
                />

                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.surgeryDate}
                  value={surgeryData?.date ? new Date(surgeryData.date).toLocaleDateString() : "—"}
                />
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.surgeryTime}
                  value={surgeryData?.date ? new Date(surgeryData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                />

                <InfoField label={dict.pages.surgery.surgeryDetails.details.fields.otRoom} value={surgeryData?.ot_room_id || "—"} />
              </div>
            </DetailSection>

            <DetailSection title={dict.pages.surgery.surgeryDetails.details.surgicalTeam}>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.surgeonTeam}
                  value={"—"}
                />
                <InfoField label={dict.pages.surgery.surgeryDetails.details.fields.surgeon} value={surgeryData?.doctor ? `${surgeryData.doctor.first_name} ${surgeryData.doctor.last_name}` : "—"} />

                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.assistantSurgeons}
                  value={surgeryData?.assistant_surgeon_id || "—"}
                />
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.anaesthetist}
                  value={surgeryData?.anaesthetist_id || "—"}
                />

                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.scrubNurse}
                  value={surgeryData?.scrub_nurse_id || "—"}
                />
                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.circulatingNurse}
                  value={surgeryData?.circulating_nurse_id || "—"}
                />

                <InfoField
                  label={dict.pages.surgery.surgeryDetails.details.fields.otTechnician}
                  value={surgeryData?.ot_technician_id || "—"}
                />
              </div>
            </DetailSection>
          </>
        )}
      </div>

      {/* Sidebar - fixed width, always visible */}
      <div className="w-90 shrink-0">
        <ClinicalSidebar patientId={patientId} />
      </div>
    </div>
  );
};
