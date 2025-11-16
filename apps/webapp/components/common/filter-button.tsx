"use client";

import { Button } from "@workspace/ui/components/button";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export default function FilterButton({
  onClick,
  className,
  label = "Filter",
}: {
  onClick: () => void;
  className?: string;
  label?: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        "flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100",
        className
      )}
    >
      <SlidersHorizontal className="w-4 h-4" />
      {label}
    </Button>
  );
}
