"use client"

import { useSidebar } from "@workspace/ui/components/sidebar"
import { Grip } from "lucide-react"
import { SectionDropdown } from "./header/section-dropdown"
import { TopActionButtons } from "./header/top-action-menu-buttons"
import { Button } from "@workspace/ui/components/button"
import { useUserStore } from "@/store/useUserStore"
import { format, formatRelative } from "@workspace/ui/hooks/use-date-fns"

export const Header = () => {
  // const handleLogout = () => {
  //   logoutCognitoUser();
  //   window.location.href = "/login"; // full page reload
  // };
  const user = useUserStore((s) => s.user);
  // ⭐ CLEAN & SAFE MAPPING
  const userData = {
    name: user?.name ?? "Dr. Ahmed Al-Mansouri",
    role: user?.role?.name ?? "HOSPITAL ADMIN",
    employeeId: "EMP-2024-1847", // Static – update if needed
    accountStatus: (user?.status ?? "Active") as "Active" | "Inactive",
    lastLogin: user?.updated_at
      ? formatRelative(new Date(user.updated_at), new Date())
      : "Today at 09:42 AM",
    avatar: "/images/user.svg",
    hospital: {
      name: user?.hospital?.name ?? "Hamad Medical Center",
      contact: user?.phone ?? "+974 4488 1122",
      email: user?.email ?? "info@hamad.qa",
      address: user?.address ?? "Doha, Qatar",
      logo: user?.logo ?? "/images/user.svg",
    },
  };

  const { toggleSidebar } = useSidebar()

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
