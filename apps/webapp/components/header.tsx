"use client"

import { useSidebar } from "@workspace/ui/components/sidebar"
import { Grip } from "lucide-react"
import { SectionDropdown } from "./header/section-dropdown"
import { TopActionButtons } from "./header/top-action-menu-buttons"
import { Button } from "@workspace/ui/components/button"

export const Header = () => {
  // const handleLogout = () => {
  //   logoutCognitoUser();
  //   window.location.href = "/login"; // full page reload
  // };

  const userData = {
    name: "Dr. Ahmed Al-Mansouri",
    role: "HOSPITAL ADMIN",
    employeeId: "EMP-2024-1847",
    accountStatus: "Active" as const,
    lastLogin: "Today at 09:42 AM",
    avatar: "/images/user.svg",
    hospital: {
      name: "Hamad Medical Center",
      contact: "+974 4488 1122",
      email: "info@hamad.qa",
      address: "Doha, Qatar",
      logo: "/images/user.svg",
    },
  }

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
