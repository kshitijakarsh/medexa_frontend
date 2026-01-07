"use client";

import React from "react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { PostOpEditMode } from "./PostOpEditMode";
import { PostOpViewMode } from "./PostOpViewMode";
import { useQuery } from "@tanstack/react-query";
import { createPostopApiClient } from "@/lib/api/surgery/post-op";

type PostOpCareProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
  surgeryId?: string;
  patientId?: string;
};

export default function PostOpCare({ isEditing, onSaveDraft, surgeryId, patientId }: PostOpCareProps) {
  const postopApi = createPostopApiClient();

  const { data: postopResponse, isLoading } = useQuery({
    queryKey: ["surgery-postop", surgeryId],
    queryFn: async () => {
      const response = await postopApi.getPostopDetails(surgeryId as string);
      return response.data;
    },
    enabled: !!surgeryId,
  });

  const data = postopResponse?.data;

  // Completion Logic
  const getSectionStatus = (data: any) => {
    const dispositionComplete = !!data?.disposition?.transfer_to;
    const monitoringComplete = !!data?.monitoring?.frequency;
    const activityComplete = !!data?.activity?.level;
    const dietComplete = !!data?.diet?.orders;
    const notesComplete = (data?.nurse_orders || []).length > 0;
    const painComplete = !!data?.pain?.frequency;
    const drainsComplete = !!data?.drains?.catheter_plan || !!data?.drains?.ngt_management;
    const instructionsComplete = !!data?.special_instructions;
    const followupComplete = !!data?.follow_up?.doctor;

    const items = [
      { label: "Disposition / Transfer", completed: !!dispositionComplete },
      { label: "Vital Signs Monitoring", completed: !!monitoringComplete },
      { label: "Activity & Mobilization", completed: !!activityComplete },
      { label: "Diet & Oral Fluids", completed: !!dietComplete },
      { label: "Nurse Order", completed: !!notesComplete },
      { label: "Pain Management", completed: !!painComplete },
      { label: "Drains, Tubes & Catheters", completed: !!drainsComplete },
      { label: "Special Instructions", completed: !!instructionsComplete },
      { label: "Follow-Up & Reviews", completed: !!followupComplete },
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
        title: "All Post-Op Care Checklist",
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
          <PostOpEditMode initialData={data} onSaveDraft={onSaveDraft} />
        ) : (
          <PostOpViewMode data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
