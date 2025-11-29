

"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
import { MoreVertical } from "lucide-react"

export function RowActionMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) {
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
        align="end"
        className="mt-1 min-w-[140px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
      >
        <DropdownMenuItem
          className="text-sm font-medium text-gray-800 rounded-md px-3 py-2 cursor-pointer bg-[#28B469] text-white hover:bg-[#32C676] transition-colors"
          onClick={onEdit}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white hover:bg-red-500 hover:text-white transition-colors"
          onClick={onDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

