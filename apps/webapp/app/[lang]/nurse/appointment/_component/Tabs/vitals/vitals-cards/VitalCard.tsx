// import React from "react";

// export function VitalCard({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode; }) {
//   return (
//     <div className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4">
//       <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
//         {icon ?? <div className="w-5 h-5 bg-gray-300 rounded-full" />}
//       </div>
//       <div>
//         <div className="text-sm text-gray-600">{label}</div>
//         <div className="text-lg font-semibold">{value ?? "-----"}</div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { cn } from "@workspace/ui/lib/utils";

export function VitalCard({
  label,
  value,
  icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}: {
  label: string;
  value?: string | null;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#EAF3FF] bg-white px-4 py-3">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          iconBg,
          iconColor
        )}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {value && value !== "" ? value : "----"}
        </span>
      </div>
    </div>
  );
}
