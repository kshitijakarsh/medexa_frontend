"use client";

import React from "react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { PREOP_SIDEBAR_HEADER, PREOP_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/lib/constants";
import { PreOpViewMode, PreOpMetric } from "./PreOpViewMode";
import { PreOpEditMode } from "./PreOpEditMode";

const MOCK_METRICS: PreOpMetric[] = [
  { title: "Clinical Readiness", completed: 6, total: 7 },
  { title: "Medical & Legal Clearance", completed: 6, total: 7 },
  { title: "Patient Preparation", completed: 6, total: 7 },
  { title: "OT & Resource Readiness", completed: 6, total: 7 },
];

export default function PreOpChecklist({ isEditing, onSaveDraft, onEdit }: { isEditing?: boolean; onSaveDraft?: () => void; onEdit?: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={PREOP_SIDEBAR_HEADER} items={PREOP_SIDEBAR_ITEMS} />
      </div>

      <div className="lg:col-span-3">
        {isEditing ? <PreOpEditMode onSaveDraft={onSaveDraft} /> : <PreOpViewMode onEdit={onEdit} metrics={MOCK_METRICS} />}
      </div>
    </div>
  );
}
