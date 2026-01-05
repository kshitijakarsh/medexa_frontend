"use client";

import { useUserStore } from "@/store/useUserStore";

/**
 * SUPER permission helper
 * - wraps store logic
 * - avoids passing permission arrays
 * - safe for React Query & components
 */
export function usePermissionGuard() {
  const hasPermissionFromStore = useUserStore((s) => s.hasPermission);
  const loading = useUserStore((s) => s.loading);

  return {
    can: hasPermissionFromStore,
    loading,
  };
}
