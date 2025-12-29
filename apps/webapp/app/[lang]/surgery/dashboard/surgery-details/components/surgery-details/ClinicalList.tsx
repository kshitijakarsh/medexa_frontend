import React from "react";
import { AlertCircle, Pill, LucideIcon } from "lucide-react";
import { ClinicalItem } from "@/app/[lang]/surgery/lib/types";
import { cn } from "@workspace/ui/lib/utils";

type ClinicalType = "problem" | "allergy" | "medication";

interface ClinicalListProps {
  title: string;
  items: ClinicalItem[];
  type: ClinicalType;
}

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

export const ClinicalList: React.FC<ClinicalListProps> = ({
  title,
  items,
  type,
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-soft p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4" />
        <h3 className="text-base">{title}</h3>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={item.id ?? index}
            className={cn(
              "flex gap-0.5 rounded-md border px-4 py-3 text-sm",
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
    </div>
  );
};
