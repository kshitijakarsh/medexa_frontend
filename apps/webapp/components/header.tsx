"use client"

import { useSidebar } from "@workspace/ui/components/sidebar"
import { Grip } from "lucide-react"
import { SectionDropdown } from "./header/section-dropdown"
import { TopActionButtons } from "./header/top-action-menu-buttons"
import { Button } from "@workspace/ui/components/button"
import { useUserStore } from "@/store/useUserStore"
import { format, formatRelative } from "@workspace/ui/hooks/use-date-fns"
import { useDictionary } from "@/i18n/use-dictionary"


import { useQuery } from "@tanstack/react-query"
import { createTenantApiClient } from "@/lib/api/tenant"
import { getIdToken } from "@/app/utils/auth"

export const Header = () => {
  // const handleLogout = () => {
  //   logoutCognitoUser();
  //   window.location.href = "/login"; // full page reload
  // };
  const user = useUserStore((s) => s.user);
  console.log("DEBUG: Header User Data:", user);

  // Fetch full tenant details to get the name and other info
  const { data: tenant } = useQuery({
    queryKey: ['tenant', user?.tenant_id],
    queryFn: async () => {
      if (!user?.tenant_id) return null;
      const token = await getIdToken();
      // Use cast or fix path if needed, assuming the import works as verified
      const client = createTenantApiClient({ authToken: token || '' });
      const res = await client.getTenantById(String(user.tenant_id));
      return res.data.data;
    },
    enabled: !!user?.tenant_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ⭐ CLEAN & SAFE MAPPING
  const userData = {
    name: user?.name ?? "",
    role: user?.role?.name ?? "",
    employeeId: String(user?.id) || "",
    accountStatus: (user?.status ?? "Active") as "Active" | "Inactive",
    lastLogin: user?.updated_at
      ? formatRelative(new Date(user.updated_at), new Date())
      : "",
    avatar: "/images/user.svg",
    hospital: {
      name: tenant?.name_en,
      contact: tenant?.primary_admin_email,
      email: tenant?.primary_admin_email,
      // address: tenant?.address,
      // logo: tenant?.logo,
    },
  };

  const { toggleSidebar } = useSidebar()
  const dict = useDictionary()
  const t = dict.common;

  return (
    <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
      <div className="flex gap-3 items-center">
        {/* <SidebarTrigger size="icon-lg" /> */}
        <Button
          size="icon-lg"
          variant="ghost"
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-gray-800 rounded-lg transition-all"
        >
          <Grip className="h-5 w-5" />
        </Button>
        <SectionDropdown />
      </div>
      {/* <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        <LogOutIcon onClick={handleLogout} className="h-4 w-4" />
      </button> */}
      <div>
        <TopActionButtons user={userData} />
      </div>
    </div>
  )
}
