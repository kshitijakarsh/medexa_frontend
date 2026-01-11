"use client";

import React from "react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { PostOpEditMode } from "./PostOpEditMode";
import { PostOpViewMode } from "./PostOpViewMode";
import { useQuery } from "@tanstack/react-query";
import { createPostopApiClient } from "@/lib/api/surgery/post-op";
import { useDictionary } from "@/i18n/use-dictionary";

type PostOpCareProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
  surgeryId?: string;
  patientId?: string;
};

export default function PostOpCare({ isEditing, onSaveDraft, surgeryId, patientId }: PostOpCareProps) {
  const postopApi = createPostopApiClient();
  const dict = useDictionary();
  const postOp = dict.pages.surgery.surgeryDetails.postOp.sidebar;

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
      { label: postOp.disposition, completed: !!dispositionComplete },
      { label: postOp.vitalSigns, completed: !!monitoringComplete },
      { label: postOp.activity, completed: !!activityComplete },
      { label: postOp.diet, completed: !!dietComplete },
      { label: postOp.nurseOrder, completed: !!notesComplete },
      { label: postOp.painManagement, completed: !!painComplete },
      { label: postOp.drains, completed: !!drainsComplete },
      { label: postOp.specialInstructions, completed: !!instructionsComplete },
      { label: postOp.followUp, completed: !!followupComplete },
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
        title: postOp.title,
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
