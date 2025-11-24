"use client";

import { X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function RedCircleCloseButton({
  onClick,
  size = 56, // you can change size anytime
}: {
  onClick: () => void;
  size?: number;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="
        rounded-full 
        bg-red-500 
        hover:bg-red-600 
        shadow-md 
        flex items-center justify-center
        p-2
        cursor-pointer
      "
    //   style={{
    //     width: size,
    //     height: size,
    //   }}
    >
      <div
        className="bg-white rounded-full flex items-center justify-center"
        style={{
          width: size * 0.55,
          height: size * 0.55,
        }}
      >
        <X className="text-red-500" size={size * 0.35} strokeWidth={2.5} />
      </div>
    </Button>
  );
}
