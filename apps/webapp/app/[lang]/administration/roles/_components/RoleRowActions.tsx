

// // "use client"

// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@workspace/ui/components/dropdown-menu"
// // import { Button } from "@workspace/ui/components/button"
// // import { MoreVertical } from "lucide-react"

// // export function RowActionMenu({
// //   onEdit,
// //   onView,
// //   onDelete,
// // }: {
// //   onEdit: () => void
// //   onView: () => void
// //   onDelete: () => void
// // }) {
// //   return (
// //     <DropdownMenu>
// //       <DropdownMenuTrigger asChild>
// //         <Button
// //           variant="ghost"
// //           size="icon"
// //           className="rounded-md text-[#0056D2] hover:bg-blue-50 focus:ring-1 focus:ring-blue-200 transition-all cursor-pointer"
// //         >
// //           <MoreVertical className="w-5 h-5" />
// //         </Button>
// //       </DropdownMenuTrigger>

// //       <DropdownMenuContent
// //         align="end"
// //         className="mt-1 min-w-[140px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
// //       >
// //         <DropdownMenuItem
// //           className="text-sm font-medium text-gray-800 rounded-md px-3 py-2 cursor-pointer bg-[#28B469] text-white hover:bg-[#32C676] transition-colors"
// //           onClick={onEdit}
// //         >
// //           Edit
// //         </DropdownMenuItem>
// //         <DropdownMenuItem
// //           className="text-sm font-medium text-gray-800 rounded-md px-3 py-2 cursor-pointer bg-[#28B469] text-white hover:bg-[#32C676] transition-colors"
// //           onClick={onView}
// //         >
// //           View
// //         </DropdownMenuItem>
// //         <DropdownMenuItem
// //           className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 cursor-pointer bg-white hover:bg-red-500 hover:text-white transition-colors"
// //           onClick={onDelete}
// //         >
// //           Delete
// //         </DropdownMenuItem>
// //       </DropdownMenuContent>
// //     </DropdownMenu>
// //   )
// // }

import { hasPermission, PERMISSIONS } from "@/app/utils/permissions";
import { RowActionMenu } from "@/components/common/row-action-menu";
import { Pencil, Eye, Trash2, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

// export function EmployeeRowActions({ onEdit, onView, onDelete, onPermission }: any) {
//   const rowActions = [
//     { label: "Edit", icon: <Pencil className="w-4 h-4" />, onClick: onEdit, variant: "success" },
//     { label: "View", icon: <Eye className="w-4 h-4" />, onClick: onView, variant: "info" },
//     { label: "Permissions", icon: <ShieldCheck className="w-4 h-4" />, onClick: onPermission, variant: "success" },
//     { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: onDelete, variant: "danger" },
//   ];

//   return <RowActionMenu actions={rowActions} />;
// }

interface RowAction {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "default" | "danger" | "success" | "info";
  disabled?: boolean;
}

export function RoleRowActions({ onEdit, onView, onDelete, onPermission, userPermissions }: any) {
  
  // const rowActions: RowAction[] = [
  //   { label: "Edit", icon: <Pencil className="w-4 h-4" />, onClick: onEdit, variant: "success" },
  //   // { label: "View", icon: <Eye className="w-4 h-4" />, onClick: onView, variant: "success" },
  //   { label: "Permissions", icon: <ShieldCheck className="w-4 h-4" />, onClick: onPermission, variant: "success" },
  //   { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: onDelete, variant: "danger" },
  // ];

   const rowActions: RowAction[] = [];
  
    if (hasPermission(userPermissions, PERMISSIONS.ROLE.EDIT)) {
      rowActions.push({
        label: "Edit",
        icon: <Pencil className="w-4 h-4" />,
        onClick: onEdit,
        variant: "success",
      });
    }
     if (hasPermission(userPermissions, PERMISSIONS.ROLE.EDIT)) {
      rowActions.push({
        label: "Permissions",
        icon: <ShieldCheck className="w-4 h-4" />,
        onClick: onPermission,
        variant: "success",
      });
    }
  
    if (hasPermission(userPermissions, PERMISSIONS.ROLE.DELETE)) {
      rowActions.push({
        label: "Delete",
        icon: <Trash2 className="w-4 h-4" />,
        onClick: onDelete,
        variant: "danger",
      });
    }


  return <RowActionMenu actions={rowActions} />;
}
