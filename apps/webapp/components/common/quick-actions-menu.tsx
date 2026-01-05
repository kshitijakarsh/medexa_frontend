// "use client"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu"
// import { Button } from "@workspace/ui/components/button"
// import { ChevronsUpDown } from "lucide-react"

// export function QuickActionsMenu() {
//   const quickActions = [
//     {
//       label: "Import Excel",
//       highlightColor: "#28B469", // Green
//       onClick: () => console.log("Import Excel"),
//     },
//     {
//       label: "Export Excel",
//       highlightColor: "#28B469", // Green
//       onClick: () => console.log("Export Excel"),
//     },
//     {
//       label: "Bulk Add Department",
//       highlightColor: "#28B469", // Green
//       onClick: () => console.log("Bulk Add Department"),
//     },
//     {
//       label: "Delete All",
//       highlightColor: "#E74C3C", // Red
//       onClick: () => console.log("Delete All"),
//     },
//   ]

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="rounded-full bg-white border border-blue-200 text-gray-600 font-medium px-4 py-2 flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300 transition-all"
//         >
//           Quick
//           <ChevronsUpDown className="w-4 h-4 text-[#0056D2]" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="end"
//         className="mt-2 min-w-[180px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
//       >
//         {quickActions.map((item, index) => (
//           <DropdownMenuItem
//             key={index}
//             onClick={item.onClick}
//             // Set the CSS variable dynamically
//             style={{ '--highlight-color': item.highlightColor } as React.CSSProperties}
//             // Use the variable in the class
//             className={`
//               text-sm font-medium text-gray-700 rounded-md px-3 py-2 bg-white 
//               transition-colors 
//               data-[highlighted]:bg-[var(--highlight-color)] 
//               data-[highlighted]:text-white
//             `}
//           >
//             {item.label}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }


"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useDictionary } from "@/i18n/use-dictionary";

export interface QuickAction {
  label: string;
  onClick: () => void;
  highlightColor?: string;
}

export default function QuickActionsMenu({
  actions,
  buttonLabel = useDictionary().common.quickActions,
  className,
}: {
  actions: QuickAction[];
  buttonLabel?: string;
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "rounded-full bg-white border border-blue-200 text-gray-700 font-medium px-4 py-2 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all",
            className
          )}
        >
          {buttonLabel}
          <ChevronsUpDown className="w-4 h-4 text-[#0056D2]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-2 min-w-[180px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
      >
        {actions.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            style={
              {
                "--highlight-color": item.highlightColor || "#28B469",
              } as React.CSSProperties
            }
            className="
              text-sm font-medium text-gray-700 rounded-md px-3 py-2 bg-white
              transition-colors cursor-pointer
              data-[highlighted]:bg-[var(--highlight-color)]
              data-[highlighted]:text-white
            "
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
