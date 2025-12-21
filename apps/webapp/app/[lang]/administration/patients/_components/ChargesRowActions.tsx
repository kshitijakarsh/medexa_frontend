// /app/.../_components/ChargesRowActions.tsx
import { hasPermission, PERMISSIONS } from "@/app/utils/permissions";
import { RowActionMenu } from "@/components/common/row-action-menu";
import { Pencil, Eye, Trash2, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

interface RowAction {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "default" | "danger" | "success" | "info";
  disabled?: boolean;
}
const PERMISSION_MAP: Record<string, any> = {
  patients: PERMISSIONS.PATIENTS,
}

console.log("PERMISSION_MAP:", PERMISSION_MAP);

export function ChargesRowActions({ onEdit, onView, onDelete, onPermission, userPermissions, mode }: any) {
  // const rowActions: RowAction[] = [
  //   { label: "Edit", icon: <Pencil className="w-4 h-4" />, onClick: onEdit, variant: "success" },
  //   { label: "View", icon: <Eye className="w-4 h-4" />, onClick: onView, variant: "info" },
  //   // { label: "Permissions", icon: <ShieldCheck className="w-4 h-4" />, onClick: onPermission, variant: "success" },
  //   { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: onDelete, variant: "danger" },
  // ];
  const rowActions: RowAction[] = [];


  const permissionGroup = PERMISSION_MAP[mode];

  console.log("mode:", mode, "permissionGroup:", permissionGroup);

  if (!permissionGroup) {
    console.warn("Unknown mode:", mode);
  }


  if (hasPermission(userPermissions, permissionGroup.EDIT)) {
    rowActions.push({
      label: "Edit",
      icon: <Pencil className="w-4 h-4" />,
      onClick: onEdit,
      variant: "success",
    });
  }

  if (mode === "service")
    if (hasPermission(userPermissions, permissionGroup.VIEW)) {
      rowActions.push({
        label: "View",
        icon: <Eye className="w-4 h-4" />,
        onClick: onView,
        variant: "success",
      });
    }


  if (hasPermission(userPermissions, permissionGroup.DELETE)) {
    rowActions.push({
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: onDelete,
      variant: "danger",
    });
  }



  return <RowActionMenu actions={rowActions} />;
}

export default ChargesRowActions;
