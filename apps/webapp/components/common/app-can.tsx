import { hasPermission } from "@/app/utils/permissions";

export function Can({ permission, userPermissions, children }: any) {
  if (!hasPermission(userPermissions, permission)) return null;
  return children;
}
