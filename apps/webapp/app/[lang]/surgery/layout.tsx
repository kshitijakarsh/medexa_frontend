"use client";

import { Header } from "@/components/header";
import { useUserStore } from "@/store/useUserStore";
import { PERMISSIONS, hasPermission, normalizePermissionList } from "@/app/utils/permissions";
import { NoPermission } from "@/components/common/no-permission-page";
import { ReactNode } from "react";

export default function SurgeryLayout({
    children,
}: {
    children: ReactNode;
}) {
    const userPermissions = useUserStore((s) => s.user?.role.permissions);

    // Normalize permissions for checking
    const permissionKeys = normalizePermissionList(userPermissions);

    const allowed = hasPermission(
        permissionKeys,
        PERMISSIONS.SURGERY.SURGERIES.VIEW
    );

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] overflow-x-hidden">
            <Header />
            <div className="w-full p-3">
                {allowed ? children : <NoPermission />}
            </div>
        </main>
    );
}
