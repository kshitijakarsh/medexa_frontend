"use client";

import React from "react";
import { EMERGENCY_SURGERIES } from "../../_lib/constants";
import PatientCard from "./UI/PatientCard";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button"
import { ROUTES } from "@/lib/routes";

const EmergencySurgeries: React.FC = () => {
  const router = useRouter();
  const { lang } = useParams();

  return (
    <div className="flex flex-col rounded-xl pt-6 shadow-soft bg-background mb-4">
      <div className="flex flex-row items-center justify-between pl-4">
        <div className="text-lg font-medium">
          Emergency Surgeries
        </div>
        <Button
          variant="link"
          className="text-sm  text-blue-500 h-auto"
          onClick={() => {
            router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`);
          }}
        >
          View All
        </Button>
      </div>
      <div className="p-2">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {EMERGENCY_SURGERIES.map((item, index) => (
            <div key={index} className="shrink-0">
              <PatientCard
                avatar={item.avatar}
                name={item.name}
                mrn={item.mrn}
                procedure={item.procedure}
                time={item.time}
                room={item.room}
                status="Emergency"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencySurgeries;
