// // app/permissions/_components/CustomCheckbox.tsx
// "use client";

// import { Check } from "lucide-react";
// import { cn } from "@workspace/ui/lib/utils";

// interface CustomCheckboxProps {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   size?: "sm" | "md";
// }

// export function CustomCheckbox({ checked, onChange, size = "md" }: CustomCheckboxProps) {
//   return (
//     <div
//       onClick={() => onChange(!checked)}
//       className={cn(
//         "flex items-center justify-center border-2 rounded-md cursor-pointer transition-all",
//         size === "sm" ? "w-4 h-4" : "w-5 h-5",
//         checked
//           ? "bg-green-500 border-green-500 hover:bg-green-600"
//           : "bg-white border-gray-300 hover:border-gray-400"
//       )}
//     >
//       {checked && <Check className="text-white w-3 h-3" />}
//     </div>
//   );
// }


"use client";

import { Check } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
}

export function CustomCheckbox({ checked, onChange, size = "md" }: CustomCheckboxProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out",
        size === "sm" ? "w-4 h-4" : "w-5 h-5",
        checked
          ? "bg-green-500 border-green-500 hover:bg-green-600"
          : "bg-white border-gray-300 hover:border-gray-400"
      )}
    >
      {checked && <Check className="text-white w-3 h-3" />}
    </div>
  );
}
