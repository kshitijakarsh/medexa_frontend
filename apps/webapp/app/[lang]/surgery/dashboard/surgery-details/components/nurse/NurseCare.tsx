"use client";

import ChecklistSidebar from "../shared/ChecklistSidebar";
import { NurseCareEditMode } from "./NurseCareEditMode";
import { NurseCareViewMode } from "./NurseCareViewMode";
import { useQuery } from "@tanstack/react-query";
import { createNurseNotesApiClient } from "@/lib/api/surgery/nurse-notes";
import { useDictionary } from "@/i18n/use-dictionary";

type NurseCareProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
  surgeryId?: string;
};

export default function NurseCare({ isEditing, onSaveDraft, surgeryId }: NurseCareProps) {
  const nurseNotesApi = createNurseNotesApiClient();
  const dict = useDictionary();
  const nurseCare = dict.pages.surgery.surgeryDetails.nurseCare.sidebar;

  const { data: nurseNotesResponse, isLoading } = useQuery({
    queryKey: ["surgery-nurse-notes", surgeryId],
    queryFn: async () => {
      const response = await nurseNotesApi.getNurseNotes(surgeryId as string);
      return response.data;
    },
    enabled: !!surgeryId,
  });

  const data = nurseNotesResponse?.data;

  // Completion Logic
  const getSectionStatus = (data: any) => {
    const receptionComplete = data?.patient_reception?.time &&
      (data?.patient_reception?.identity_verified || data?.patient_reception?.consent_verified);

    const safetyComplete = data?.safety_checklist?.time &&
      (data?.safety_checklist?.identity_confirmed || data?.safety_checklist?.site_marked);

    const positioningComplete = data?.positioning?.position && data?.positioning?.pressure_points;

    const timeoutComplete = data?.time_out?.time &&
      (data?.time_out?.team_introduced || data?.time_out?.confirmed);

    const signoutComplete = data?.sign_out?.time &&
      (data?.sign_out?.procedure || data?.sign_out?.counts);

    const implantsComplete = (data?.implants || []).length > 0;
    const consumablesComplete = (data?.consumables || []).length > 0;
    const notesComplete = !!data?.nursing_notes;

    const items = [
      { label: nurseCare.patientReception, completed: !!receptionComplete },
      { label: nurseCare.safetyChecklist, completed: !!safetyComplete },
      { label: nurseCare.positioning, completed: !!positioningComplete },
      { label: nurseCare.timeOut, completed: !!timeoutComplete },
      { label: nurseCare.signOut, completed: !!signoutComplete },
      { label: nurseCare.implantsUsed, completed: !!implantsComplete },
      { label: nurseCare.consumablesUsed, completed: !!consumablesComplete },
      { label: nurseCare.additionalNotes, completed: !!notesComplete },
    ];

    const sidebarItems = items.map(item => ({
      label: item.label,
      completedCount: item.completed ? 1 : 0,
      pendingCount: item.completed ? 0 : 1
    }));

    const totalCompleted = items.filter(i => i.completed).length;
    const totalPending = items.filter(i => !i.completed).length;

    return {
      header: {
        title: nurseCare.title,
        completedCount: totalCompleted,
        pendingCount: totalPending
      },
      items: sidebarItems
    };
  };

  const { header, items } = getSectionStatus(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      {/* Left Sidebar */}
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={header} items={items} />
      </div>

      {/* Form Content */}
      <div className="lg:col-span-3 space-y-4">
        {isEditing ? (
          <NurseCareEditMode initialData={data} onSaveDraft={onSaveDraft} />
        ) : (
          <NurseCareViewMode data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
