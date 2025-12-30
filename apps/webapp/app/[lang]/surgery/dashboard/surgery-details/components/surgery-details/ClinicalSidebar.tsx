"use client";

import React from "react";
import { AlertCircle, Pill, LucideIcon } from "lucide-react";
import { MOCK_DATA } from "@/app/[lang]/surgery/lib/constants";
import { ClinicalItem } from "@/app/[lang]/surgery/lib/types";
import { cn } from "@workspace/ui/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

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

interface ClinicalSidebarProps {
  problems?: ClinicalItem[];
  allergies?: ClinicalItem[];
  medications?: ClinicalItem[];
}

const ClinicalSidebar: React.FC<ClinicalSidebarProps> = ({
  problems = MOCK_DATA.activeProblems,
  allergies = MOCK_DATA.allergies,
  medications = MOCK_DATA.medications.map((m) => ({
    id: String(m.slNo),
    name: m.name,
    detail: `${m.dose} - ${m.frequency}`,
  })),
}) => {
  return (
    <div className="space-y-4">
      <ClinicalListSection
        title="Active Problems"
        items={problems}
        type="problem"
      />
      <ClinicalListSection
        title="Allergies"
        items={allergies}
        type="allergy"
      />
      <ClinicalListSection
        title="Ongoing Medications"
        items={medications}
        type="medication"
      />
    </div>
  );
};

export default ClinicalSidebar;
