// /app/.../_components/EmployeeRowActions.tsx
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

export function EmployeeRowActions({ onEdit, onView, onDelete, onPermission }: any) {
  const rowActions: RowAction[] = [
    { label: "Edit", icon: <Pencil className="w-4 h-4" />, onClick: onEdit, variant: "success" },
    { label: "View", icon: <Eye className="w-4 h-4" />, onClick: onView, variant: "info" },
    { label: "Permissions", icon: <ShieldCheck className="w-4 h-4" />, onClick: onPermission, variant: "success" },
    { label: "Delete", icon: <Trash2 className="w-4 h-4" />, onClick: onDelete, variant: "danger" },
  ];

  return <RowActionMenu actions={rowActions} />;
}

export default EmployeeRowActions;
