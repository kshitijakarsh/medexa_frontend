// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { Button } from "@workspace/ui/components/button";
// import { MoreVertical } from "lucide-react";
// import { ReactNode } from "react";

// interface RowAction {
//   label: string;
//   onClick?: () => void;
//   icon?: ReactNode;
//   variant?: "default" | "danger" | "success" | "info";
//   disabled?: boolean;
// }

// interface RowActionMenuProps {
//   actions: RowAction[];
//   align?: "start" | "center" | "end";
// }

// /**
//  * ✅ Reusable Dynamic Row Action Menu
//  * - Accepts an array of actions dynamically
//  * - Supports custom icons & color variants
//  * - Keeps same gradient dropdown styling
//  * - Works across all modules (Employee, Permissions, etc.)
//  */
// export function RowActionMenu({
//   actions,
//   align = "end",
// }: RowActionMenuProps) {
//   const getActionStyle = (variant: RowAction["variant"]) => {
//     switch (variant) {
//       case "success":
//         return "bg-[#28B469] text-white hover:bg-[#32C676]";
//       case "danger":
//         return "bg-white text-gray-700 hover:bg-red-500 hover:text-white";
//       case "info":
//         return "bg-[#E8F6FF] text-[#0056D2] hover:bg-blue-100";
//       default:
//         return "bg-[#28B469] text-white hover:bg-[#32C676]";
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="rounded-md text-[#0056D2] hover:bg-blue-50 focus:ring-1 focus:ring-blue-200 transition-all cursor-pointer"
//         >
//           <MoreVertical className="w-5 h-5" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align={align}
//         className="mt-1 min-w-[160px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
//       >
//         {actions.map((action, idx) => (
//           <DropdownMenuItem
//             key={idx}
//             disabled={action.disabled}
//             onClick={action.onClick}
//             className={`flex items-center gap-2 text-sm font-medium rounded-md px-3 py-2 cursor-pointer transition-colors 
//               ${getActionStyle(
//               action.variant
//             )} ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {action.icon && <span className="text-white">{action.icon}</span>}
//             {action.label}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }



"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { MoreVertical } from "lucide-react";

interface RowAction {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface RowActionMenuProps {
  actions: RowAction[];
  align?: "start" | "center" | "end";
}

export function RowActionMenu({
  actions,
  align = "end",
}: RowActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md text-[#0056D2] hover:bg-blue-50 focus:ring-1 focus:ring-blue-200 transition-all cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className="mt-1 min-w-[160px] rounded-md border border-[#CFE7FF] 
                   bg-white shadow-sm p-1 space-y-1"
      >
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            disabled={action.disabled}
            onClick={action.onClick}
            className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 
            cursor-pointer transition-colors
            hover:!bg-green-500 hover:!text-white
            ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {action.label}
          </DropdownMenuItem>
          // <DropdownMenuItem
          //   key={idx}
          //   disabled={action.disabled}
          //   onClick={action.onClick}
          //   //         className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 
          //   // cursor-pointer transition-colors

          //   // hover:bg-green-500 hover:text-white

          //   // data-[highlighted]:bg-transparent 
          //   // data-[highlighted]:text-inherit 
          //   // focus:bg-transparent

          //   // ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          //   className="text-sm font-medium text-gray-800 rounded-md px-3 py-2 cursor-pointer bg-white transition-colors"

          // >
          //   {action.label}
          // </DropdownMenuItem>

        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
