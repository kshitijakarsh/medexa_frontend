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
import { AnesthesiaPlan as AnesthesiaPlanType, createAnesthesiaApiClient } from "@/lib/api/surgery/anesthesia";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@workspace/ui/lib/sonner";
import { Info } from "lucide-react";

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
  surgeryId?: string;
  patientId?: string;
}

export const AnesthesiaPlan: React.FC<AnesthesiaPlanProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  isEditing,
  setIsEditing,
  surgeryId,
  patientId,
}) => {
  const anesthesiaApi = createAnesthesiaApiClient();

  const { data: anesthesiaResponse, isLoading } = useQuery({
    queryKey: ["surgery-anesthesia", surgeryId],
    queryFn: async () => {
      const response = await anesthesiaApi.getAnesthesiaPlans(surgeryId as string);
      return response.data;
    },
    enabled: !!surgeryId,
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (payload: Partial<AnesthesiaPlanType>) => {
      const response = await anesthesiaApi.saveAnesthesiaPlan(surgeryId as string, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surgery-anesthesia", surgeryId] });
      toast.success("Anesthesia plan saved successfully");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to save anesthesia plan");
    },
  });

  const data = anesthesiaResponse?.data;
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

      <div className="py-2">
        <div className="flex justify-end items-center gap-1 mr-2">
          <div className="flex items-center rounded-full px-4 py-1.5 text-xs border border-blue-200 text-slate-500">
            {/* {updatedAt ? (
                <>Last Edited by {updatedBy || 'System'} on {format(new Date(updatedAt), "MMMM dd, yyyy, 'at' h:mm a")}.</>
              ) : */}

            {/* ( */}
            <>Last Edited by Anesthesia Sarah on November 14, 2024, at 8:45 AM.</>
            {/* )} */}
          </div>
          <Info size={18} className="text-blue-400" />
        </div>
      </div>

      <div className="px-3 pb-6 pt-1">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading anesthesia plan...</div>
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
            onSave={(payload) => saveMutation.mutate(payload)}
            isSaving={saveMutation.isPending}
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
            onSave={(payload) => saveMutation.mutate(payload)}
            isSaving={saveMutation.isPending}
          />
        ) : activeTab === "Anesthesia Plan" ? (
          <PlanDetails
            isEditing={isEditing}
          // anaesthesiaType={data?.anaesthesia_type}
          // monitoringRequired={data?.monitoring_required}
          // postOperativeVentilationRequired={data?.post_operative_ventilation_required}
          // icuRequired={data?.icu_required}
          // airwayManagementPlan={data?.airway_management_plan}
          // onSave={(payload) => saveMutation.mutate(payload)}
          // isSaving={saveMutation.isPending}
          />
        ) : (
          <div className="flex w-full h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-slate-400 font-medium">To be implemented</p>
          </div>
        )}
      </div>
    </div>
  );
};
