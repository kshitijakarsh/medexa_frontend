"use client";

import { PERMISSIONS, hasPermission, normalizePermissionList } from "@/app/utils/permissions";
import { NoPermission } from "@/components/common/no-permission-page";
import { Header } from "@/components/header";
import { useUserStore } from "@/store/useUserStore";
import { ReactNode } from "react";

export default function TenantLayout({
    children,
}: {
    children: ReactNode;
}) {
    const userPermissions = useUserStore(
        (s) => s.user?.role.permissions
    );

    // ⛔ Wait for store hydration
    const permissionKeys = normalizePermissionList(userPermissions)


    const allowed = hasPermission(
        permissionKeys,
        PERMISSIONS.NURSE.USERS.VIEW
    );

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] overflow-x-hidden">
            <Header />

            <div className="w-full">
                {allowed ? children : <NoPermission />}
            </div>
        </main>
    );
}
