"use client";

import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";

interface ActionButtonProps {
  label?: string;
  type?: "button" | "submit";
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ActionButton({
  label = "Apply Filter",
  type = "submit",
  loading = false,
  onClick,
  disabled = false,
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-green-500 hover:bg-green-600 text-white flex items-center justify-center ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
