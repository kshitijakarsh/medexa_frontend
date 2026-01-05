"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { createSurgeryApiClient } from "@/lib/api/surgery/surgeries";
import { MOCK_DATA } from "@/app/[lang]/surgery/_lib/constants";
import SurgeryFormSection from "./SurgeryFormSection";
import SurgicalTeamSection from "./SurgicalTeamSection";
import ClinicalSidebar from "./ClinicalSidebar";
import { DetailSection } from "./DetailsSection";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";

interface SurgeryDetailsTabProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  patientId?: string;
}

export const SurgeryDetailsTab = ({ isEditing, setIsEditing, patientId }: SurgeryDetailsTabProps) => {
  const { id } = useParams();
  const surgeryApi = createSurgeryApiClient({});

  const { data: response, isLoading } = useQuery({
    queryKey: ["surgery-details", id],
    queryFn: async () => {
      if (!id || id === "new") return null;
      const resp = await surgeryApi.getById(id as string);
      return resp.data;
    },
    enabled: !!id && id !== "new",
  });

  const surgeryData = response?.data;

  // Prepare clinical data (keeping MOCK_DATA for these as they aren't in the provided sample)
  const clinicalData = {
    problems: MOCK_DATA.activeProblems,
    allergies: MOCK_DATA.allergies,
    medications: MOCK_DATA.medications.map((m: any) => ({
      id: String(m.slNo),
      name: m.name,
      detail: `${m.dose} - ${m.frequency}`,
    })),
  };

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
            <ClinicalSidebar
              problems={clinicalData.problems}
              allergies={clinicalData.allergies}
              medications={clinicalData.medications}
              patientId={patientId}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <DetailSection title="Schedule Surgery">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label="Procedure"
                  value={surgeryData?.procedure?.name || MOCK_DATA.surgery.procedure}
                />
                <InfoField
                  label="Department"
                  value={surgeryData?.department_id || MOCK_DATA.surgery.department}
                />

                <InfoField label="Urgency" value={surgeryData?.urgency || MOCK_DATA.surgery.urgency} />
                <InfoField
                  label="Estimated Duration (hours)"
                  value={surgeryData?.duration?.toString() || MOCK_DATA.surgery.estimatedDuration}
                />

                <InfoField
                  label="Surgery Date"
                  value={surgeryData?.date ? new Date(surgeryData.date).toLocaleDateString() : MOCK_DATA.surgery.date}
                />
                <InfoField
                  label="Surgery Time"
                  value={surgeryData?.date ? new Date(surgeryData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : MOCK_DATA.surgery.time}
                />

                <InfoField label="OT Room" value={surgeryData?.ot_room_id || MOCK_DATA.surgery.otRoom} />
              </div>
            </DetailSection>

            <DetailSection title="Surgical Team">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <InfoField
                  label="Select Surgeon Team"
                  value={MOCK_DATA.team.teamName}
                />
                <InfoField label="Surgeon" value={surgeryData?.surgeon_id || MOCK_DATA.team.surgeon.name} />

                <InfoField
                  label="Assistant Surgeons"
                  value={surgeryData?.assistant_surgeon_id || MOCK_DATA.team.assistants.map((d) => d.name).join(", ")}
                />
                <InfoField
                  label="Anaesthetist"
                  value={surgeryData?.anaesthetist_id || MOCK_DATA.team.anaesthetist.name}
                />

                <InfoField
                  label="Scrub Nurse"
                  value={surgeryData?.scrub_nurse_id || MOCK_DATA.team.scrubNurse}
                />
                <InfoField
                  label="Circulating Nurse"
                  value={surgeryData?.circulating_nurse_id || MOCK_DATA.team.circulatingNurse}
                />

                <InfoField
                  label="OT Technician"
                  value={surgeryData?.ot_technician_id || MOCK_DATA.team.otTechnician}
                />
              </div>
            </DetailSection>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <ClinicalSidebar
              problems={clinicalData.problems}
              allergies={clinicalData.allergies}
              medications={clinicalData.medications}
              patientId={patientId}
            />
          </div>
        </div>
      )}
    </div>
  );
};
