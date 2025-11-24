// // app/doctor-dashboard/components/Alerts/AlertItem.tsx
// "use client";

// import React from "react";
// import {
//   AlertTriangle,
//   Users,
//   FlaskConical,
// } from "lucide-react";

// interface AlertItemProps {
//   type: "emergency" | "patient" | "insurance";
//   title: string;
//   subtitle: string;
// }

// const iconMap: Record<
//   string,
//   { icon: JSX.Element; bg: string; color: string }
// > = {
//   emergency: {
//     icon: <AlertTriangle size={16} />,
//     bg: "bg-[#FFEDEC]",
//     color: "text-[#F03E3E]",
//   },

//   patient: {
//     icon: <Users size={16} />,
//     bg: "bg-[#FFF4E6]",
//     color: "text-[#F79009]",
//   },

//   insurance: {
//     icon: <FlaskConical size={16} />,
//     bg: "bg-[#E8F3FF]",
//     color: "text-[#0B84FF]",
//   },
// };

// export function AlertItem({ type, title, subtitle }: AlertItemProps) {
//   const data = iconMap[type] || iconMap["patient"];

//   return (
//     <div className="flex gap-3 items-start">
//       <div
//         className={`h-7 w-7 rounded-full flex items-center justify-center ${data.bg} ${data.color}`}
//       >
//         {data.icon}
//       </div>

//       <div className="flex flex-col">
//         <div className="font-medium text-sm">{title}</div>
//         <div className="text-xs text-gray-500">{subtitle}</div>
//       </div>
//     </div>
//   );
// }


// app/doctor-dashboard/components/Alerts/AlertItem.tsx
"use client";

import {
  AlertTriangle,
  Users,
  FlaskConical,
  CircleAlert,
} from "lucide-react";
import type { ReactElement } from "react";

interface AlertItemProps {
  type: "emergency" | "patient" | "insurance";
  title: string;
  subtitle: string;
}
const iconMap: Record<
  string,
  { icon: ReactElement; bg: string; color: string }
> = {

  emergency: {
    icon: <CircleAlert size={20} strokeWidth={2.5} />, // matches screenshot
    bg: "bg-[#FFEDEC]",
    color: "text-[#F03E3E]",
  },

  patient: {
    icon: <Users size={20} strokeWidth={2.5} />,
    bg: "bg-[#FFF4E6]",
    color: "text-[#F79009]",
  },

  insurance: {
    icon: <FlaskConical size={20} strokeWidth={2.5} />,
    bg: "bg-[#E8F3FF]",
    color: "text-[#0B84FF]",
  },
};

export function AlertItem({ type, title, subtitle }: AlertItemProps) {
  const data = iconMap[type]!;

  return (
    <div className="flex gap-3 items-start">
      {/* Icon bubble */}
      <div
        // className={`h-7 w-7 rounded-full flex items-center justify-center ${data.bg} ${data.color}`}
                className={`h-7 w-7 rounded-full flex items-center justify-center  ${data.color}`}
      >
        {data.icon}
      </div>

      {/* Texts */}
      <div className="flex flex-col">
        <div className="font-semibold text-[14px] leading-[18px]">
          {title}
        </div>
        <div className="text-xs text-gray-500 leading-[16px]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
