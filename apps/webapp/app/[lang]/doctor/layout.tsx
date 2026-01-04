// "use client"

// import { Header } from "@/components/header"
// import { Providers } from "@/components/providers"
// import { useUserStore } from "@/store/useUserStore";
// import { ReactNode } from "react"

// export default async function TenantLayout({
//     children,
// }: Readonly<{
//     children: ReactNode
// }>) {

//     const userPermissions = useUserStore((s) => s.user?.role.permissions);

//     return (
//         <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] overflow-x-hidden">
//             <Header />
//             <div className="w-full">

//                 {children}
//             </div>

//         </main>
//     )
// }


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
    PERMISSIONS.DOCTOR.USERS.VIEW
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
