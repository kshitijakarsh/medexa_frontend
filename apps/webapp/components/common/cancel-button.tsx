"use client";

import { Button } from "@workspace/ui/components/button";
import { XCircle } from "lucide-react";

interface CancelButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: boolean;
}

export function CancelButton({
  label = "Cancel",
  onClick,
  disabled = false,
  className = "",
  icon = false,
}: CancelButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`text-blue-600 border-blue-500 hover:bg-blue-50 ${className}`}
    >
      {icon && <XCircle className="w-4 h-4 mr-2" />}
      {label}
    </Button>
  );
}
