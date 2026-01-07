"use client";

import ChecklistSidebar from "../shared/ChecklistSidebar";
import { IntraOpEditMode } from "./IntraOpEditMode";
import { IntraOpViewMode } from "./IntraOpViewMode";
import { useQuery } from "@tanstack/react-query";
import { createIntraopApiClient } from "@/lib/api/surgery/intraop";

type IntraOpNotesProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
  surgeryId?: string;
  patientId?: string;
};

export default function IntraOpNotes({ isEditing, onSaveDraft, surgeryId, patientId }: IntraOpNotesProps) {
  const intraopApi = createIntraopApiClient();

  const { data: intraopResponse, isLoading } = useQuery({
    queryKey: ["surgery-intraop", surgeryId],
    queryFn: async () => {
      const response = await intraopApi.getIntraopDetails(surgeryId as string);
      return response.data;
    },
    enabled: !!surgeryId,
  });

  const data = intraopResponse?.data;

  // Completion Logic
  const getSectionStatus = (data: any) => {
    const timingComplete = data?.timing?.patient_in && data?.timing?.anesthesia_start && data?.timing?.surgery_start && data?.timing?.surgery_end;
    const procedureComplete = data?.procedure?.name && data?.procedure?.site && data?.procedure?.approach;
    const complicationsComplete = !!data?.complications;
    const bloodLossComplete = !!data?.blood_loss?.estimated;
    const implantConsumableComplete = (data?.implants?.type) || (data?.consumables?.item_name);
    const specimensComplete = data?.specimens?.histopathology || data?.specimens?.drains || data?.specimens?.catheter;
    const notesComplete = !!data?.surgeon_notes;

    const items = [
      { label: "Surgery Timing", completed: !!timingComplete },
      { label: "Procedure Details", completed: !!procedureComplete },
      { label: "Complications", completed: !!complicationsComplete },
      { label: "Blood Loss & Transfusion", completed: !!bloodLossComplete },
      { label: "Implants Used and Consumables Used", completed: !!implantConsumableComplete },
      { label: "Specimens & Other Details", completed: !!specimensComplete },
      { label: "Surgeon's Additional Notes", completed: !!notesComplete },
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
        title: "All Intra-Op Checklist",
        completedCount: totalCompleted,
        pendingCount: totalPending
      },
      items: sidebarItems
    };
  };

  const { header, items } = getSectionStatus(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={header} items={items} />
      </div>

      <div className="lg:col-span-3 space-y-4">
        {isEditing ? (
          <IntraOpEditMode initialData={data} onSaveDraft={onSaveDraft} />
        ) : (
          <IntraOpViewMode data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
