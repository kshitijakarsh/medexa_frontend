"use client";

import { Button } from "@workspace/ui/components/button";
import { Globe2, Menu } from "lucide-react";

export function TopActionButtons() {

    const userData = {
    name: "Dr. Ahmed Al-Mansouri",
    role: "HOSPITAL ADMIN",
    employeeId: "EMP-2024-1847",
    accountStatus: "Active" as const,
    lastLogin: "Today at 09:42 AM",
    avatar: "/avatar.png",
    hospital: {
      name: "Hamad Medical Center",
      contact: "+974 4488 1122",
      email: "info@hamad.qa",
      address: "Doha, Qatar",
      logo: "/logo.png",
    },
  };
  return (
    <div className="flex items-center gap-3">
      {/* Quick Actions */}
      <button className="text-blue-500 font-medium text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">
        Quick Actions <span className="text-base font-bold">+</span>
      </button>

      {/* Language Selector */}
      <Button
        variant="ghost"
        className="bg-blue-50 hover:bg-blue-100 text-gray-700 rounded-full px-3 py-1.5 flex items-center gap-2 h-auto shadow-sm transition-all"
      >
        <span className="bg-green-500 text-white rounded-full p-1">
          <Globe2 className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-medium">English</span>
      </Button>

      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-green-500 hover:bg-green-600 rounded-full p-2 shadow-sm transition-all"
      >
        <Menu className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}
