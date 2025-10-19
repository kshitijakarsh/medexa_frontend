"use client";

import { logoutCognitoUser } from "@/lib/api";
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { LogOutIcon } from "lucide-react"

export const Header = () => {

  // const handleLogout = () => {
  //   logoutCognitoUser();
  //   window.location.href = "/login"; // full page reload
  // };

  return (
    <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
      <SidebarTrigger size="icon-lg" />
      {/* <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        <LogOutIcon onClick={handleLogout} className="h-4 w-4" />
      </button> */}
    </div>
  )
}
