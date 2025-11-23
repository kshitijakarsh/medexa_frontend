"use client";

import { Button } from "@workspace/ui/components/button";

export function CancelButton({
  label = "Cancel",
  onClick,
  disabled = false,
  className = "",
}: {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={`border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${className}`}
    >
      {label}
    </Button>
  );
}
