"use client";

import React from "react";
import PatientCard from "./UI/PatientCard";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button"
import { ROUTES } from "@/lib/routes";
import { useDictionary } from "@/i18n/use-dictionary";
import { useSurgeries } from "../../_hooks/useSurgery";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface SurgeryAPIResponse {
  success: boolean;
  data: Surgery[];
}

const EmergencySurgeries: React.FC = () => {
  const router = useRouter();
  const { lang } = useParams();
  const dict = useDictionary();
  const emergencyDict = dict.pages.surgery.dashboard;
  const commonDict = dict.pages.surgery.common;

  const { data: surgeriesData, isLoading, error } = useSurgeries({ urgency: "emergency" });

  const extractSurgeries = (): Surgery[] => {
    if (!surgeriesData) return [];
    if (Array.isArray(surgeriesData)) return surgeriesData;
    if ((surgeriesData as SurgeryAPIResponse).data) return (surgeriesData as SurgeryAPIResponse).data;
    return [];
  };

  const emergencySurgeries = extractSurgeries();

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-background rounded-xl mb-4">
        Failed to load emergency surgeries.
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl pt-6 bg-background mb-4">
      <div className="flex flex-row items-center justify-between pl-4 pr-4">
        <div className="text-lg font-medium">
          {emergencyDict.emergencySurgeries}
        </div>
        <Button
          variant="link"
          className="text-sm  text-blue-500 h-auto"
          onClick={() => {
            router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`);
          }}
        >
          {dict.dashboard.viewAll}
        </Button>
      </div>

      <div className="p-2">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="shrink-0">
                <Skeleton className="w-[280px] h-[160px] rounded-xl" />
              </div>
            ))
          ) : emergencySurgeries.length > 0 ? (
            emergencySurgeries.map((item, index) => (
              <div key={item.id || index} className="shrink-0">
                <PatientCard
                  id={item.id}
                  avatar={item.patient?.photo_url || item.patient?.avatarUrl || ""}
                  name={item.patient ? `${item.patient.first_name} ${item.patient.last_name}` : commonDict.fallbacks.unknownPatient}
                  mrn={item.patient?.civil_id || item.patient?.mrn || "—"}
                  procedure={item.procedure?.name || "—"}
                  time={(item.date || item.scheduled_date) ? new Date(item.date || (item.scheduled_date as string)).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit"
                  }) : "—"}
                  room={item.ot_room_id ? `${commonDict.prefixes.otRoom}${item.ot_room_id}` : (item.ot_room || "—")}
                  status={emergencyDict.emergency || "Emergency"}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-500 text-sm">
              No emergency surgeries scheduled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencySurgeries;
