// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { cn } from "@workspace/ui/lib/utils";

// interface TabItem {
//   label: string;
//   value: string;
// }

// export default function TabSwitcher({
//   items,
//   active,
//   onChange,
//   className,
// }: {
//   items: TabItem[];
//   active: string;
//   onChange: (v: string) => void;
//   className?: string;
// }) {
//   return (
//     <div className={cn("flex flex-wrap gap-2", className)}>
//       {items.map((t) => (
//         <Button
//           key={t.value}
//           onClick={() => onChange(t.value)}
//           className={cn(
//             "px-3 py-1 rounded-full text-sm border border-gray-200 shadow-sm cursor-pointer",
//             active === t.value
//               ? "bg-blue-600 text-white hover:bg-blue-600"
//               : "bg-white text-gray-700 hover:bg-blue-100"
//           )}
//         >
//           {t.label}
//         </Button>
//       ))}
//     </div>
//   );
// }


"use client";

import { cn } from "@workspace/ui/lib/utils";

export default function TabSwitcher({
  active,
  items,
  onChange,
  className,
}: {
  active: string;
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-xl",
        "bg-gradient-to-r from-[#E8F0FF] to-[#ECFAFF]",
        "border border-[#C7DFFF] shadow-md",
        className
      )}
    >
      {items.map((tab) => {
        const isActive = tab.value === active;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer",
              "focus:outline-none",

              // ACTIVE TAB
              isActive
                ? "bg-white text-blue-700 shadow-md border border-blue-100"

                // INACTIVE TABS (Improved visibility)
                : "text-gray-700 bg-[#F4F8FF] border border-transparent hover:border-blue-200 hover:bg-white hover:text-blue-600"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
