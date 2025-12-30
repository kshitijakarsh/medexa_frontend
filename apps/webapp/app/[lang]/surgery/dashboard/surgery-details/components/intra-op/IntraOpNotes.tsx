"use client";

import ChecklistSidebar from "../shared/ChecklistSidebar";
import { INTRAOP_SIDEBAR_HEADER, INTRAOP_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/lib/constants";
import { IntraOpEditMode } from "./IntraOpEditMode";
import { IntraOpViewMode } from "./IntraOpViewMode";

type IntraOpNotesProps = {
  isEditing?: boolean;
  onSaveDraft?: () => void;
};

export default function IntraOpNotes({ isEditing, onSaveDraft }: IntraOpNotesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={INTRAOP_SIDEBAR_HEADER} items={INTRAOP_SIDEBAR_ITEMS} />
      </div>

      <div className="lg:col-span-3 space-y-4">
        {isEditing ? (
          <IntraOpEditMode onSaveDraft={onSaveDraft} />
        ) : (
          <IntraOpViewMode />
        )}
      </div>
    </div>
  );
}
