"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import {
  Globe2,
  Menu,
  LogOut,
  User,
  Lock,
  X,
  Mail,
  MapPin,
  Phone,
  Building2,
} from "lucide-react";
import Image from "next/image";

interface UserProfile {
  name: string;
  role: string;
  employeeId: string;
  avatar?: string;
  accountStatus: "Active" | "Inactive";
  lastLogin: string;
  hospital: {
    name: string;
    contact: string;
    email: string;
    address: string;
    logo?: string;
  };
}

interface TopActionButtonsProps {
  user: UserProfile;
}

export function TopActionButtons({ user }: TopActionButtonsProps) {
  const [open, setOpen] = React.useState(false);

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

      {/* Menu Button + Sheet */}
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-green-500 hover:bg-green-600 rounded-full p-2 shadow-sm transition-all"
          >
            <Menu className="h-4 w-4 text-white" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="sm:max-w-sm w-full bg-gradient-to-b from-[#e7f6ff] to-[#f7feff] border-none shadow-2xl overflow-y-auto rounded-l-3xl"
        >
          <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
          {/* Close button */}
          {/* <SheetClose asChild>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </SheetClose> */}

          {/* Header Section */}
          <div className="flex items-center gap-4 mt-10 px-2">
            <Image
              src={user.avatar || "/avatar.png"}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full border-2 border-green-500"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">
                {user.role} | ID: {user.employeeId}
              </p>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex items-center gap-3 mt-5 px-2">
            <Button
              variant="outline"
              className="flex-1 border-green-100 hover:bg-green-50"
            >
              <User className="h-4 w-4 mr-2 text-green-600" />
              View Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-green-100 hover:bg-green-50"
            >
              <Lock className="h-4 w-4 mr-2 text-green-600" />
              Change Password
            </Button>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl p-4 mt-6 mx-2 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">
              Account Status:{" "}
              <span
                className={
                  user.accountStatus === "Active"
                    ? "text-green-600 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {user.accountStatus}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Last Login:{" "}
              <span className="text-gray-800">{user.lastLogin}</span>
            </p>

            <Button
              variant="ghost"
              className="mt-4 w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Hospital Info */}
          <div className="bg-white rounded-xl p-4 mt-6 mx-2 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Building2 className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">
                  {user.hospital.name}
                </h4>
              </div>
              {user.hospital.logo && (
                <Image
                  src={user.hospital.logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              )}
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span>{user.hospital.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span>{user.hospital.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>{user.hospital.address}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
