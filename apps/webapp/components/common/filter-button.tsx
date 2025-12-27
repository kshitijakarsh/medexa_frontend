// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { SlidersHorizontal } from "lucide-react";
// import { cn } from "@workspace/ui/lib/utils";

// export default function FilterButton({
//   onClick,
//   className,
//   label = "Filter",
// }: {
//   onClick: () => void;
//   className?: string;
//   label?: string;
// }) {
//   return (
//     <Button
//       onClick={onClick}
//       variant="outline"
//       className={cn(
//         "flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100",
//         className
//       )}
//     >
//       <SlidersHorizontal className="w-4 h-4" />
//       {label}
//     </Button>
//   );
// }


"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Delete, SlidersHorizontal } from "lucide-react";

export default function FilterButton({
  count = 0,
  onClick,
  onClear,
  filters = {},
  className,
}: {
  count?: number;
  filters?: object
  onClick: () => void;
  onClear?: () => void;
  className?: string;
}) {
  const appliedCount = Object.values(filters).filter(Boolean).length;

  const hasFilters = appliedCount > 0;
  //  console.log(filters, appliedCount)
  return (
    <div className="flex items-center gap-3">
      {/* FILTER BUTTON */}
      <Button
        variant="outline"
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 bg-[#0095FF] text-white border-none rounded-full hover:bg-[#0080DD] relative cursor-pointer h-10 px-4",
          className
        )}
      >
        {/* Icon */}
        <SlidersHorizontal size={18} className="text-white" />

        <span className="text-sm font-medium">Filter</span>

        {/* Badge */}
        {hasFilters && (
          <span
            className="
              absolute -top-2 -right-2 
              flex items-center justify-center
              bg-red-500 text-white text-xs 
              w-5 h-5 rounded-full shadow-md
            "
          >
            {appliedCount}
          </span>
        )}
      </Button>

      {/* CLEAR BUTTON */}
      {hasFilters && onClear && (
        <Button
          onClick={onClear}
          className="
            bg-red-500 text-white px-3 h-8
            rounded-full flex items-center gap-2 cursor-pointer hover:bg-red-600 text-xs
          "
        >
          Clear <Delete className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
