"use client";

import { useParams } from "next/navigation";
import NewButton from "@/components/common/new-button";

import { useVitalsByVisitId, useDeleteVitals, getVitalsbyVisitIdNurse } from "./_hooks/useVitals";

import { useState } from "react";
import { SectionWrapper } from "./common/SectionWrapper";
import { VitalsHistory } from "./vitals/vitals-history/VitalsHistory";
import VitalsModal from "./vitals/vitals-modal/VitalsModal";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { VitalCardsGrid } from "./vitals/vitals-cards/VitalCardsGrid";
import { VitalGraph } from "./vitals/vitals-graph/VitalGraph";

interface patientId {
  patientId: string;
}

export function Vitals({ patientId }: patientId) {
  const { id: visitId } = useParams() as { id: string };

  const { data: vitals, isLoading } = getVitalsbyVisitIdNurse(visitId);
  const deleteVitals = useDeleteVitals(visitId);

  const [showModal, setShowModal] = useState(false);
  const [editingVitals, setEditingVitals] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Vitals");

  const tabs = [
    {
      key: "Vitals",
      label: "Vitals",
      component: (
        <VitalCardsGrid
          vitals={vitals}
          loading={isLoading}
          onDelete={(single_vital) => deleteVitals.mutate(single_vital)}
          onEdit={(single_vital) => {
            setEditingVitals(single_vital);
            setShowModal(true);
          }}
        />
      ),
    },
    {
      key: "Vital Graph",
      label: "Vital Graph",
      component: <VitalGraph vitals={vitals} />,
    },
  ];

  const activeTabConfig = tabs.find((t) => t.key === activeTab);

  return (
    <>
      <SectionWrapper
        header={
          <div className="flex items-center justify-between">
            {/* TAB BUTTONS */}
            <DynamicTabs
              tabs={tabs.map(({ key, label }) => ({ key, label }))}
              defaultTab={activeTab}
              onChange={setActiveTab}
              variant="wrap"
            />
            {activeTab === "Vitals" && <NewButton
              name="Add Vitals"
              handleClick={() => {
                setEditingVitals(null);
                setShowModal(true);
              }}
            />
            }

          </div>
        }
      >
        {/* TAB CONTENT */}
        <div className="">
          {activeTabConfig?.component}
        </div>

        {/* MODAL */}
        {showModal && (
          <VitalsModal
            patientId={patientId}
            open={showModal}
            onClose={() => setShowModal(false)}
            initial={editingVitals} // 👈 edit vs create handled here
          />
        )}
      </SectionWrapper>
      {/* HISTORY (SEPARATE SECTION – like SOAP) */}
      <VitalsHistory patientId={patientId} />
    </>
  );
}
