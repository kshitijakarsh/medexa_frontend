// import React from "react";

// export function VitalHistoryCard({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value?: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="border rounded-xl p-4 bg-white flex items-center gap-4">
//       <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
//         {icon}
//       </div>

//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="text-sm font-semibold text-gray-800">
//           {value || "----"}
//         </p>
//       </div>
//     </div>
//   );
// }




import React from "react";
import { cn } from "@workspace/ui/lib/utils";

export function VitalHistoryCard({
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
