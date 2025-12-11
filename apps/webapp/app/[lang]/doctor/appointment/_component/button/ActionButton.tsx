// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { cn } from "@workspace/ui/lib/utils";


// export function ActionButton({
//   label,
//   icon,
//   variant = "outline",
//   onClick,
// }: {
//   label: string;
//   icon: React.ReactNode;
//   variant?: "solid" | "outline";
//   onClick?: () => void;
// }) {
//   return (
//     <Button
//       onClick={onClick}
//       variant="ghost"
//       className={cn(
//         "w-full h-11 rounded-xl flex items-center justify-start gap-3 font-medium transition-all shadow-sm cursor-pointer",
//         variant === "solid"
//           ? "bg-[#0094FF] text-white hover:bg-[#0085E6] hover:text-white"
//           : "bg-white border border-[#0094FF40] text-[#0066CC] hover:bg-blue-50 hover:text-[#0066CC]"
//       )}
//     >
//       {/* LEFT ICON CONTAINER */}
//       <span
//         className={cn(
//           "w-8 h-8 flex items-center justify-center rounded-md",
//           variant === "solid"
//             ? "bg-white/20 text-white"
//             : "bg-[#EAF4FF] text-[#0094FF]"
//         )}
//       >
//         {icon}
//       </span>

//       {label}
//     </Button>
//   );
// }


"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";

export function ActionButton({
  label,
  icon,
  variant = "outline",
  onClick,
  loading = false,
  disabled = false,
}: {
  label: string;
  icon: React.ReactNode;
  variant?: "solid" | "outline";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  const isDisabled = loading || disabled;

  return (
    <Button
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      variant="ghost"
      className={cn(
        "w-full h-11 rounded-xl flex items-center justify-start gap-3 font-medium transition-all shadow-sm cursor-pointer",
        isDisabled && "opacity-70 cursor-not-allowed",

        variant === "solid"
          ? "bg-[#0094FF] text-white hover:bg-[#0085E6] hover:text-white"
          : "bg-white border border-[#0094FF40] text-[#0066CC] hover:bg-blue-50 hover:text-[#0066CC]"
      )}
    >
      {/* LEFT ICON / LOADING SPINNER */}
      <span
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md",
          variant === "solid"
            ? "bg-white/20 text-white"
            : "bg-[#EAF4FF] text-[#0094FF]"
        )}
      >
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : icon}
      </span>

      {/* LABEL */}
      {label}
    </Button>
  );
}
