"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import {
  Building2,
  Activity,
  Pill,
  FileText,
  Boxes,
  BarChart3,
  Settings,
  Cog,
  ChevronDown,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

const sections = [
  { label: "Hospital", icon: Building2 },
  { label: "Diagnostics", icon: Activity },
  { label: "Pharmacy", icon: Pill },
  { label: "Billing & Insurance", icon: FileText },
  { label: "Inventory", icon: Boxes },
  { label: "Reports & Analytics", icon: BarChart3 },
  { label: "Administration", icon: Cog },
  { label: "Settings", icon: Settings },
];

export function SectionDropdown() {
  const [selected, setSelected] = React.useState("Administration");

  return (
    <div className="flex flex-col items-center mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
          >
            <Cog className="h-4 w-4 text-green-300" />
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = selected === section.label;
            return (
              <DropdownMenuItem
                key={section.label}
                onClick={() => setSelected(section.label)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] cursor-pointer transition-colors",
                  isActive
                    ? "bg-green-500 text-white font-medium"
                    : "hover:bg-green-50 text-gray-700"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-white" : "text-gray-600"
                  )}
                />
                {section.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
