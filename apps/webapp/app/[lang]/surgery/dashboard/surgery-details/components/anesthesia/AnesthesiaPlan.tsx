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
import { AnesthesiaPlan as AnesthesiaPlanType } from "@/lib/api/surgery/anesthesia";
import { useAnesthesia, useCreateAnesthesia, useUpdateAnesthesia } from "@/app/[lang]/surgery/_hooks/useAnesthesia";
import { useSurgeryById } from "@/app/[lang]/surgery/_hooks/useSurgery";

import { toast } from "@workspace/ui/lib/sonner";
import { Info } from "lucide-react";

import { useDictionary } from "@/i18n/use-dictionary";

interface AnesthesiaPlanProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  surgeryId?: string;
  patientId?: string;
}

export const AnesthesiaPlan: React.FC<AnesthesiaPlanProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  isEditing,
  setIsEditing,
  surgeryId,
}) => {
  const dict = useDictionary();
  const { data: surgeryData } = useSurgeryById(surgeryId as string);
  const patientId = surgeryData?.patient_id;

  const TABS_CONFIG = [
    { key: "Medical History", label: dict.pages.surgery.surgeryDetails.anesthesia.tabs.medicalHistory },
    { key: "Airway Assessment", label: dict.pages.surgery.surgeryDetails.anesthesia.tabs.airwayAssessment },
    { key: "Vitals Examination", label: dict.pages.surgery.surgeryDetails.anesthesia.tabs.vitalsExamination },
    { key: "ASA & Risk", label: dict.pages.surgery.surgeryDetails.anesthesia.tabs.asaRisk },
    { key: "Anesthesia Plan", label: dict.pages.surgery.surgeryDetails.anesthesia.tabs.planDetails },
  ];

  const { data: anesthesiaData, isLoading } = useAnesthesia(surgeryId);

  const updateMutation = useUpdateAnesthesia();
  const createMutation = useCreateAnesthesia();

  const handleSave = (payload: Partial<AnesthesiaPlanType>) => {
    if (anesthesiaData?.id) {
      updateMutation.mutate(
        { surgeryId: surgeryId as string, data: payload },
        {
          onSuccess: () => {
            setIsEditing(false);
          }
        }
      );
    } else {
      createMutation.mutate(
        { surgeryId: surgeryId as string, data: payload },
        {
          onSuccess: () => {
            setIsEditing(false);
          }
        }
      );
    }
  };

  const data = anesthesiaData;
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
        patientId={patientId}
      />

      <div className="flex items-center justify-between mb-2 px-3">
        <div className="w-full flex justify-between gap-4">
          <div className="flex-1 overflow-hidden">
            <DynamicTabs
              tabs={TABS_CONFIG}
              defaultTab={activeTab}
              onChange={setActiveTab}
              variant="scroll"
            />
          </div>

          {activeTab === "Vitals Examination" ? (
            <NewButton
              name={dict.pages.surgery.surgeryDetails.anesthesia.actions.addVitals}
              handleClick={() => setIsVitalsModalOpen(true)}
            />
          ) : activeTab === "Medical History" ? (
            <NewButton
              name={dict.pages.surgery.surgeryDetails.anesthesia.actions.addNew}
              handleClick={() => setIsMedicalHistoryModalOpen(true)}
            />
          ) : (
            <NewButton
              name={dict.pages.surgery.surgeryDetails.anesthesia.actions.addNew}
              handleClick={() => { }}
            />
          )}

        </div>
      </div>



      <div className="w-full bg-slate-200 h-px"></div>

      <div className="py-2">
        <div className="flex justify-end items-center gap-1 mr-2">
          <div className="flex items-center rounded-full px-4 py-1.5 text-xs border border-blue-200 text-slate-500">
            {/* {updatedAt ? (
                <>Last Edited by {updatedBy || 'System'} on {format(new Date(updatedAt), "MMMM dd, yyyy, 'at' h:mm a")}.</>
              ) : */}

            {/* ( */}
            <>{dict.pages.surgery.surgeryDetails.anesthesia.status.lastEditedBy} Anesthesia Sarah {dict.pages.surgery.surgeryDetails.anesthesia.status.on} November 14, 2024, {dict.pages.surgery.surgeryDetails.anesthesia.status.at} 8:45 AM.</>
            {/* )} */}
          </div>
          <Info size={18} className="text-blue-400" />
        </div>
      </div>

      <div className="px-3 pb-6 pt-1">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">{dict.pages.surgery.surgeryDetails.anesthesia.status.loading}</div>
        ) : activeTab === "Medical History" ? (
          <MedicalHistory patientId={patientId} />
        ) : activeTab === "Airway Assessment" ? (
          <AirwayAssessment
            isEditing={isEditing}
            mallampatiGrade={data?.mallampati_grade}
            mouthOpening={data?.mouth_opening}
            neckMobility={data?.neck_mobility}
            difficultAirwayRisk={data?.diffult_airway_risk}
            airwayManagementPlan={data?.airway_management_plan}
            onSave={(payload) => handleSave(payload)}
            isSaving={updateMutation.isPending || createMutation.isPending}
          />
        ) : activeTab === "Vitals Examination" ? (
          <VitalsExamination
            patientId={patientId}
          />
        ) : activeTab === "ASA & Risk" ? (
          <ASARisk
            isEditing={isEditing}
            asaStatusClassification={data?.asa_status_classification}
            surgeryRiskLevel={data?.surgery_risk_level}
            asaAndRiskAdditionalNote={data?.asa_and_risk_additional_note}
            onSave={(payload) => handleSave(payload)}
            isSaving={updateMutation.isPending || createMutation.isPending}
          />
        ) : activeTab === "Anesthesia Plan" ? (
          <PlanDetails
            isEditing={isEditing}
            anaesthesiaType={data?.anaesthesia_type}
            monitoringRequired={data?.monitoring_required}
            postOperativeVentilationRequired={data?.post_operative_ventilation_required}
            icuRequired={data?.icu_required}
            airwayManagementPlan={data?.airway_management_plan}
            onSave={(payload) => handleSave(payload)}
            isSaving={updateMutation.isPending || createMutation.isPending}
          />
        ) : (
          <div className="flex w-full h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-slate-400 font-medium">{dict.pages.surgery.surgeryDetails.anesthesia.status.toBeImplemented}</p>
          </div>
        )}
      </div>
    </div>
  );
};
