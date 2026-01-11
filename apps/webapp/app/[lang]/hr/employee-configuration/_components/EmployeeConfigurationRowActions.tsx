

import { hasPermission, PERMISSIONS } from "@/app/utils/permissions";
import { RowActionMenu } from "@/components/common/row-action-menu";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface RowAction {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "default" | "danger" | "success" | "info";
  disabled?: boolean;
}

const PERMISSION_MAP: Record<string, any> = {
  humanResources: PERMISSIONS.EMPLOYEE,
  designation: PERMISSIONS.DESIGNATION,
  specialization: PERMISSIONS.SPECIALISATION,
  roles: PERMISSIONS.ROLE,
};

export function EmployeeConfigurationRowActions({
  onView,
  onEdit,
  onDelete,
  userPermissions,
  mode,
}: {
  onView?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  userPermissions?: any[]; // accepts PermissionItem[]
  mode: string;
}) {
  // Convert objects → strings (if needed)
  const permissionList: string[] =
    userPermissions?.map((p: any) => (typeof p === "string" ? p : p.permission)) ??
    [];

  const rowActions: RowAction[] = [];

  const permissionGroup = PERMISSION_MAP[mode];

  if (!permissionGroup) {
    console.warn("Unknown mode:", mode);
  }

  // VIEW action - always show for humanResources mode
  if (mode === "humanResources" && onView) {
    rowActions.push({
      label: "View",
      icon: <Eye className="w-4 h-4" />,
      onClick: onView,
      variant: "info",
    });
  }

  // EDIT permission check
  if (permissionGroup && hasPermission(permissionList, permissionGroup.EDIT)) {
    rowActions.push({
      label: "Edit",
      icon: <Pencil className="w-4 h-4" />,
      onClick: onEdit,
      variant: "success",
    });
  }

  // DELETE permission check
  if (permissionGroup && hasPermission(permissionList, permissionGroup.DELETE)) {
    rowActions.push({
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: onDelete,
      variant: "danger",
    });
  }

  return <RowActionMenu actions={rowActions} />;
}

export default EmployeeConfigurationRowActions;

