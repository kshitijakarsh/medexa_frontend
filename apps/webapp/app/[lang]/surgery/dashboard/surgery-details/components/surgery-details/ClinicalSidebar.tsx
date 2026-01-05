"use client";

import React from "react";
import { AlertCircle, Pill, LucideIcon } from "lucide-react";
import { MOCK_DATA } from "@/app/[lang]/surgery/_lib/constants";
import { ClinicalItem } from "@/app/[lang]/surgery/_lib/types";
import { cn } from "@workspace/ui/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { createMedicalHistoryApiClient } from "@/lib/api/surgery/medical-history";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface ClinicalSidebarProps {
  problems?: ClinicalItem[];
  allergies?: ClinicalItem[];
  medications?: ClinicalItem[];
  patientId?: string;
}

type ClinicalType = "problem" | "allergy" | "medication";

const TYPE_CONFIG: Record<
  ClinicalType,
  {
    icon: LucideIcon;
    cardStyle: string;
    detailStyle: string;
  }
> = {
  problem: {
    icon: AlertCircle,
    cardStyle: "bg-[#FEF9E7] border-yellow-200",
    detailStyle: "opacity-80",
  },
  allergy: {
    icon: AlertCircle,
    cardStyle: "bg-[#FEF2F2] border-red-200",
    detailStyle: "opacity-80",
  },
  medication: {
    icon: Pill,
    cardStyle: "bg-blue-50 border-blue-200",
    detailStyle: "text-gray-500",
  },
};

// Internal component for rendering a single clinical list section
const ClinicalListSection = ({
  title,
  items,
  type,
}: {
  title: string;
  items: ClinicalItem[];
  type: ClinicalType;
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <Card className="shadow-none border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Icon className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div
              key={item.id ?? index}
              className={cn(
                "flex gap-0.5 rounded-md border px-2 py-3 text-sm",
                config.cardStyle
              )}
            >
              <span>
                {item.name}
                <span className="mx-1">–</span>
              </span>

              <span className={config.detailStyle}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};



const ClinicalSidebar: React.FC<ClinicalSidebarProps> = ({
  problems: propProblems,
  allergies: propAllergies,
  medications: propMedications,
  patientId,
}) => {
  const medicalHistoryApi = createMedicalHistoryApiClient({});

  const { data: response, isLoading } = useQuery({
    queryKey: ["medical-history", patientId],
    queryFn: async () => {
      if (!patientId) return null;
      const resp = await medicalHistoryApi.getByPatientId(patientId);
      return resp.data;
    },
    enabled: !!patientId,
  });

  const historyItem = response?.data?.[0]?.history;

  // Map API data to ClinicalItem or use props/mock as fallback
  const mappedProblems = React.useMemo(() => {
    if (propProblems) return propProblems;
    if (!historyItem) return MOCK_DATA.activeProblems;

    return [
      ...historyItem.conditions.map((c, i) => ({
        id: `cond-${i}`,
        name: c,
        detail: "Active Condition",
      })),
      ...historyItem.surgeries.map((s, i) => ({
        id: `surg-${i}`,
        name: s.name,
        detail: `Surgery in ${s.date} at ${s.hospital}`,
      })),
    ];
  }, [historyItem, propProblems]);

  const mappedAllergies = propAllergies || MOCK_DATA.allergies;

  const mappedMedications = React.useMemo(() => {
    if (propMedications) return propMedications;
    if (!historyItem) {
      return MOCK_DATA.medications.map((m) => ({
        id: String(m.slNo),
        name: m.name,
        detail: `${m.dose} - ${m.frequency}`,
      }));
    }

    return historyItem.medications.map((m, i) => ({
      id: `med-${i}`,
      name: m,
      detail: "Ongoing Medication",
    }));
  }, [historyItem, propMedications]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <ClinicalListSection
        title="Active Problems"
        items={mappedProblems}
        type="problem"
      />
      <ClinicalListSection
        title="Allergies"
        items={mappedAllergies}
        type="allergy"
      />
      <ClinicalListSection
        title="Ongoing Medications"
        items={mappedMedications}
        type="medication"
      />
    </div>
  );
};

export default ClinicalSidebar;
