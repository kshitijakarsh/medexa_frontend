import { Send } from "lucide-react";
import ChecklistSidebar from "../shared/ChecklistSidebar";
import { INTRAOP_SIDEBAR_HEADER, INTRAOP_SIDEBAR_ITEMS } from "@/app/[lang]/surgery/lib/constants";

import ConfigurableFormSection from "../shared/ConfigurableFormSection";
import {
  surgeryTimingConfig,
  procedureDetailsConfig,
  complicationsConfig,
  bloodLossConfig,
  specimensConfig,
  surgeonNotesConfig
} from "./intraOpConfigs";

export default function IntraOpNotes({ isEditing }: { isEditing?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={INTRAOP_SIDEBAR_HEADER} items={INTRAOP_SIDEBAR_ITEMS} />
      </div>

      <div className="lg:col-span-3 space-y-4">
        <ConfigurableFormSection config={surgeryTimingConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={procedureDetailsConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={complicationsConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={bloodLossConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={specimensConfig} isEditing={isEditing} />
        <ConfigurableFormSection config={surgeonNotesConfig} isEditing={isEditing} />

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
