// "use client";

// import { Crown } from "lucide-react";

// export function VipCrownBadge() {
//   return (
//     <div className="h-6 w-6 rounded-full bg-[#FFF4D9] text-[#F4A100] flex items-center justify-center">
//       <Crown size={14} strokeWidth={2.5} />
//     </div>
//   );
// }


"use client";
import { Crown } from "lucide-react";

export function VipCrownBadge({
  size = 14,
  bg = "#FFF4D9",
  color = "#F4A100",
  className = "",
}: {
  size?: number;
  bg?: string;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full flex items-center justify-center ${className}`}
      style={{
        backgroundColor: bg,
        width: size + 6,
        height: size + 6,
        color,
      }}
    >
      <Crown size={size} strokeWidth={2.3} />
    </div>
  );
}
