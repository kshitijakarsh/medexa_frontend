// /app/.../_components/UserRowActions.tsx
import { hasPermission, PERMISSIONS } from "@/app/utils/permissions"
import { RowActionMenu } from "@/components/common/row-action-menu"
import { Pencil, Trash2 } from "lucide-react"
import { ReactNode } from "react"
import { useDictionary } from "@/i18n/use-dictionary"

interface RowAction {
  label: string
  onClick?: () => void
  icon?: ReactNode
  variant?: "default" | "danger" | "success" | "info"
  disabled?: boolean
}

export function UserRowActions({
  onEdit,
  onDelete,
  userPermissions,
}: {
  onEdit: () => void
  onDelete: () => void
  // userPermissions?: string[] | undefined
  userPermissions?: any
}) {
  // const rowActions: RowAction[] = [
  //   {
  //     label: "Edit",
  //     icon: <Pencil className="w-4 h-4" />,
  //     onClick: onEdit,
  //     variant: "success",
  //   },
  //   {
  //     label: "Delete",
  //     icon: <Trash2 className="w-4 h-4" />,
  //     onClick: onDelete,
  //     variant: "danger",
  //   },
  // ]
  const rowActions: RowAction[] = [];
  const dict = useDictionary();

  if (hasPermission(userPermissions, PERMISSIONS.USER.EDIT)) {
    rowActions.push({
      label: dict.common.edit,
      icon: <Pencil className="w-4 h-4" />,
      onClick: onEdit,
      variant: "success",
    });
  }

  if (hasPermission(userPermissions, PERMISSIONS.USER.DELETE)) {
    rowActions.push({
      label: dict.common.delete,
      icon: <Trash2 className="w-4 h-4" />,
      onClick: onDelete,
      variant: "danger",
    });
  }


  return <RowActionMenu actions={rowActions} />
}

export default UserRowActions;
