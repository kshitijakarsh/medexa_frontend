// "use client";

// import { Clock3 } from "lucide-react";

// export function FollowUpBadge({
//   size = 14,
//   className = "",
// }: {
//   size?: number;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`
//         rounded-full bg-[#FFF4D9] text-[#F4A100] 
//         flex items-center justify-center 
//         ${className}
//       `}
//       style={{ width: size + 6, height: size + 6 }}
//     >
//       <Clock3 size={size} strokeWidth={2.3} />
//     </div>
//   );
// }


"use client";

import { History } from "lucide-react";

export function FollowUpBadge() {
  return (
    <div
      className="
        h-6 w-6 rounded-full 
        bg-[#FFF4D9] 
        text-[#F4A100] 
        flex items-center justify-center
      "
    >
      <History size={14} strokeWidth={2.4} />
      
    </div>
  );
}

