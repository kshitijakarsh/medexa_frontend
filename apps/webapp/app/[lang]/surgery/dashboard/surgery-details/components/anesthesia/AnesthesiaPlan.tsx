"use client";

import React from "react";
import { MedicalHistory } from "./MedicalHistory";
import { AirwayAssessment } from "./AirwayAssessment";
import { VitalsExamination } from "./VitalsExamination";
import { ASARisk } from "./ASARisk";
import { NewMedicalHistory } from "./NewMedicalHistory";
import { NewVitals } from "./NewVitals";
import { PlanDetails } from "./PlanDetails";
import NewButton from "@/components/common/new-button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

const TABS = [
  "Medical History",
  "Airway Assessment",
  "Vitals Examination",
  "ASA & Risk",
  "Anesthesia Plan",
];

interface AnesthesiaPlanProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const AnesthesiaPlan: React.FC<AnesthesiaPlanProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  isEditing,
  setIsEditing
}) => {
  const [internalActiveTab, setInternalActiveTab] = React.useState("Medical History");

  const activeTab = propActiveTab || internalActiveTab;
  const setActiveTab = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  // Reset editing state when tab changes
  React.useEffect(() => {
    setIsEditing(false);
  }, [activeTab]);

  const [isMedicalHistoryModalOpen, setIsMedicalHistoryModalOpen] = React.useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col rounded-2xl bg-white pt-2 shadow-sm">
      <NewMedicalHistory
        open={isMedicalHistoryModalOpen}
        onOpenChange={setIsMedicalHistoryModalOpen}
      />

      <NewVitals
        open={isVitalsModalOpen}
        onOpenChange={setIsVitalsModalOpen}
      />

      <div className="flex items-center justify-between mb-2 px-3">
        <div className="w-full flex justify-between gap-4">
          <div className="flex-1 overflow-hidden">
            <DynamicTabs
              tabs={TABS.map((tab) => ({ key: tab, label: tab }))}
              defaultTab={activeTab}
              onChange={setActiveTab}
              variant="scroll"
            />
          </div>

          {activeTab === "Vitals Examination" ? (
            <NewButton
              name="Add Vitals"
              handleClick={() => setIsVitalsModalOpen(true)}
            />
          ) : activeTab === "Medical History" ? (
            <NewButton
              name="Add New"
              handleClick={() => setIsMedicalHistoryModalOpen(true)}
            />
          ) : (
            <NewButton
              name="Add New"
              handleClick={() => { }}
            />
          )}

        </div>
      </div>

      <div className="w-full bg-slate-200 h-px"></div>

      <div className="px-3 pb-6 pt-1">
        {activeTab === "Medical History" ? (
          <MedicalHistory />
        ) : activeTab === "Airway Assessment" ? (
          <AirwayAssessment isEditing={isEditing} />
        ) : activeTab === "Vitals Examination" ? (
          <VitalsExamination isEditing={isEditing} />
        ) : activeTab === "ASA & Risk" ? (
          <ASARisk isEditing={isEditing} />
        ) : activeTab === "Anesthesia Plan" ? (
          <PlanDetails isEditing={isEditing} />
        ) : (
          <div className="flex w-full h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-slate-400 font-medium">To be implemented</p>
          </div>
        )}
      </div>
    </div>
  );
};
