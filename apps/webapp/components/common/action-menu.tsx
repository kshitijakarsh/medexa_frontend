"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { MoreVertical } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ActionItem {
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger" | "success";
}

export default function ActionMenu({
  actions,
  className,
}: {
  actions: ActionItem[];
  className?: string;
}) {
  const getVariantClasses = (variant: string | undefined) => {
    switch (variant) {
      case "primary":
        return "bg-[#0094FF] text-white hover:bg-[#007BE0]";
      case "danger":
        return "text-red-600 hover:bg-red-50";
      case "success":
        return "bg-green-500 text-white hover:bg-green-600";
      default:
        return "hover:bg-gray-100 text-gray-700";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "bg-[#0094FF] text-white rounded-full px-6 py-1.5 hover:bg-[#007BE0] flex items-center gap-2",
            className
          )}
        >
          Action
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36 rounded-md border border-gray-200 shadow-md p-1 space-y-1">
        {actions.map((item, i) => (
          <DropdownMenuItem
            key={i}
            onClick={item.onClick}
            className={cn(
              "cursor-pointer rounded-md px-2 py-2 text-sm font-medium",
              getVariantClasses(item.variant)
            )}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
