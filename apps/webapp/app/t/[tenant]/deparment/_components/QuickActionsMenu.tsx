// "use client"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu"
// import { Button } from "@workspace/ui/components/button"
// import { ChevronDown, ChevronsUpDown } from "lucide-react"

// export function QuickActionsMenu() {
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
//         <DropdownMenuItem
//           className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white hover:bg-[#28B469] hover:text-white transition-colors"
//           onClick={() => console.log('Import Excel')}
//         >
//           Import Excel
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white hover:bg-[#32C676] hover:text-white transition-colors"
//           onClick={() => console.log('Export Excel')}
//         >
//           Export Excel
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white hover:bg-[#32C676] hover:text-white transition-colors"
//           onClick={() => console.log('Bulk Add Department')}
//         >
//           Bulk Add Department
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }


"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
import { ChevronsUpDown } from "lucide-react"

export function QuickActionsMenu() {
  const quickActions = [
    { label: "Import Excel", color: "hover:bg-[#28B469]", onClick: () => console.log("Import Excel") },
    { label: "Export Excel", color: "hover:bg-[#28B469]", onClick: () => console.log("Export Excel") },
    { label: "Bulk Add Department", color: "hover:bg-[#28B469]", onClick: () => console.log("Bulk Add Department") },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full bg-white border border-blue-200 text-gray-600 font-medium px-4 py-2 flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300 transition-all"
        >
          Quick
          <ChevronsUpDown className="w-4 h-4 text-[#0056D2]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-2 min-w-[180px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
      >
        {quickActions.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={`text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white ${item.color} hover:text-white transition-colors`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
