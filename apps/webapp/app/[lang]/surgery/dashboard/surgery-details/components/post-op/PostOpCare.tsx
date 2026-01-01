"use client";

import React from "react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { SURGERY_SIDEBAR_HEADER, SURGERY_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/_lib/constants";
import { PostOpEditMode } from "./PostOpEditMode";
import { PostOpViewMode } from "./PostOpViewMode";

type PostOpCareProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
};

export default function PostOpCare({ isEditing, onSaveDraft }: PostOpCareProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={SURGERY_SIDEBAR_HEADER} items={SURGERY_SIDEBAR_ITEMS} />
      </div>

      <div className="lg:col-span-3 space-y-4">
        {isEditing ? (
          <PostOpEditMode onSaveDraft={onSaveDraft} />
        ) : (
          <PostOpViewMode />
        )}
      </div>
    </div>
  );
}
