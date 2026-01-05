// // /app/.../_components/QuickActionsMenu.tsx
// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { Button } from "@workspace/ui/components/button";
// import { ChevronsUpDown } from "lucide-react";

// export function QuickActionsMenu() {
//   const quickActions = [
//     { label: "Import Excel", onClick: () => console.log("Import Excel") },
//     { label: "Export Excel", onClick: () => console.log("Export Excel") },
//     { label: "Bulk Add Department", onClick: () => console.log("Bulk Add Department") },
//   ];

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
//             className={`text-sm font-medium text-gray-700 rounded-md px-3 py-2 bg-white data-[highlighted]:bg-[#28B469] data-[highlighted]:text-white transition-colors`}
//           >
//             {item.label}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default QuickActionsMenu;




"use client"

import QuickActionsMenu from "@/components/common/quick-actions-menu"
import { useDictionary } from "@/i18n/use-dictionary";

export function QuickActions() {
  const dict = useDictionary()
  const t = dict.common

  return (
    <QuickActionsMenu
      actions={[
        { label: t.importExcel, onClick: () => console.log("Import Excel") },
        { label: t.exportExcel, onClick: () => console.log("Export Excel") },
        { label: t.bulkAddDepartment, onClick: () => console.log("Bulk Add") },
      ]}
    />
  )
}