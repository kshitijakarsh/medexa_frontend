"use client";

import React from "react";
import PreOpChecklistSidebar from "../shared/ChecklistSidebar";
import { PreOpStats } from "./PreOpStats";
import { PreOpContent } from "./PreOpContent";
import { Send } from "lucide-react";
import { PreOpNote } from "./PreOpNote";

export default function PreOpChecklist({ isEditing }: { isEditing?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <PreOpChecklistSidebar />
      </div>

      <div className="lg:col-span-3">
        <PreOpStats />
        <PreOpNote
          title="Procedures"
          items={[
            {
              title: "ECG - 12 Lead",
              description: "Impression: Normal sinus rhythm. No ST-T wave changes. No evidence of acute ischemia."
            }
          ]}
        />
        <div className="">
          <PreOpContent />
          <PreOpNote
            title="Special Instructions to Team"
            items={[
              {
                title: "",
                description: "Known MRSA colonization. Follow contact precautions. Use dedicated instruments."
              }
            ]}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50">
              SAVE AS DRAFT
            </button>
            <button className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600">
              <Send size={16} /> MARK AS COMPLETED
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
