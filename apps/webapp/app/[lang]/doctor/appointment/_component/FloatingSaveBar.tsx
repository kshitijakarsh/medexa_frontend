"use client";

import { ActionButton } from "./button/ActionButton";
import { Save, Users } from "lucide-react";

import { useDictionary } from "@/i18n/dictionary-context";

export function FloatingSaveBar({
  saving,
  finishing,
  onSaveDraft,
  onFinish,
}: {
  saving: boolean;
  finishing: boolean;
  onSaveDraft: () => void;
  onFinish: () => void;
}) {
  const dict = useDictionary();
  return (
    <div className="mb-10">
      <div
        className="
        fixed bottom-0 right-0
        w-[calc(100%-260px)]   
        max-w-[200px]      
        px-6 py-4
        flex items-center justify-end flex-col
        gap-4
        z-50
      "
      >
        <ActionButton
          label={saving ? dict.pages.doctor.appointment.actions.saving : dict.pages.doctor.appointment.actions.saveDraft}
          icon={<Save size={18} />}
          variant="outline"
          disabled={saving || finishing}
          loading={saving}
          onClick={onSaveDraft}
          className="border-2"
        />

        {/* <ActionButton
        label={finishing ? "Finishing..." : "Finish Consultation"}
        icon={<Users size={18} />}
        variant="solid"
        disabled={finishing || saving}
        loading={finishing}
        onClick={onFinish}
      /> */}
      </div>
    </div>
  );
}
