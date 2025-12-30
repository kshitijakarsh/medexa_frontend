"use client";

import ChecklistSidebar from "../shared/ChecklistSidebar";
import { NURSE_SIDEBAR_HEADER, NURSE_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/lib/constants";
import { NurseCareEditMode } from "./NurseCareEditMode";
import { NurseCareViewMode } from "./NurseCareViewMode";

type NurseCareProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
};

export default function NurseCare({ isEditing, onSaveDraft }: NurseCareProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      {/* Left Sidebar */}
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={NURSE_SIDEBAR_HEADER} items={NURSE_SIDEBAR_ITEMS} />
      </div>

      {/* Form Content */}
      <div className="lg:col-span-3 space-y-4">
        {isEditing ? (
          <NurseCareEditMode onSaveDraft={onSaveDraft} />
        ) : (
          <NurseCareViewMode />
        )}
      </div>
    </div>
  );
}
