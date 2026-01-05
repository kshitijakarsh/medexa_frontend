"use client";

import { useUserStore } from "@/store/useUserStore";
import { PERMISSIONS, hasPermission, hasAnyPermission, hasAllPermissions, normalizePermissionList } from "@/app/utils/permissions";
import { NoPermission } from "@/components/common/no-permission-page";
import { ReactNode, useEffect, useState } from "react";

interface Props {
    permission: string | string[];
    requireAll?: boolean;
    children: ReactNode;
}

export function PermissionGuard({ permission, requireAll = false, children }: Props) {
    const user = useUserStore((s) => s.user);
    const loading = useUserStore((s) => s.loading);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            if (!loading) setIsAuthorized(false);
            return;
        }

        const permissions = normalizePermissionList(user.role?.permissions);

        if (Array.isArray(permission)) {
            if (requireAll) {
                setIsAuthorized(hasAllPermissions(permissions, permission));
            } else {
                setIsAuthorized(hasAnyPermission(permissions, permission));
            }
        } else {
            setIsAuthorized(hasPermission(permissions, permission));
        }
    }, [user, loading, permission, requireAll]);

    if (loading || isAuthorized === null) return null;

    if (!isAuthorized) {
        return <NoPermission />;
    }

    return <>{children}</>;
}
