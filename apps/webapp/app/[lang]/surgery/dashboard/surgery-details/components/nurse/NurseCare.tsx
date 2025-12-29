import React from "react";
import { Send } from "lucide-react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { NURSE_SIDEBAR_HEADER, NURSE_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/lib/constants";
import ConfigurableFormSection from "../shared/ConfigurableFormSection";
import {
  patientReceptionConfig,
  surgicalSafetyChecklistConfig,
  patientPositioningConfig,
  timeOutConfig,
  signOutConfig,
  additionalNotesConfig
} from "./nurseCareConfigs";
import { ImplantsUsed, ConsumablesUsed } from "./NurseInventory";

export default function NurseCare({ isEditing }: { isEditing?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      {/* Left Sidebar */}
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={NURSE_SIDEBAR_HEADER} items={NURSE_SIDEBAR_ITEMS} />
      </div>

      {/* Form Content */}
      <div className="lg:col-span-3 space-y-4">
        <ConfigurableFormSection config={patientReceptionConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={surgicalSafetyChecklistConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={patientPositioningConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={timeOutConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={signOutConfig} isEditing={isEditing} />

        <ImplantsUsed />
        <ConsumablesUsed />

        <ConfigurableFormSection config={additionalNotesConfig} isEditing={isEditing} />

        {/* Footer Actions */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50">
              SAVE AS DRAFT
            </button>
            <button className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600">
              <Send size={16} /> COMPLETE & SIGN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
