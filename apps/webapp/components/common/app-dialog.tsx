"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { X } from "lucide-react";

interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;  // 👈 new
  icon?: React.ReactNode;
  appliedCount?: number
  maxWidth?: string;
}

export function AppDialog({
  open,
  onClose,
  title,
  children,
  icon,
  headerRight,
  appliedCount,
  maxWidth = "md:max-w-2xl lg:max-w-screen-xl",
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`w-[95vw] ${maxWidth} bg-white rounded-lg overflow-hidden shadow-lg p-0`}
        showCloseButton={false}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
          <DialogTitle className="text-white text-lg font-semibold">
            {icon}
            {title}
            {headerRight}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 hover:bg-transparent cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div> */}
        <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">

          {/* LEFT SIDE — ICON + TITLE */}
          <div className="flex items-center gap-2">
            {icon && <span className="text-white">{icon}</span>}

            <DialogTitle className="text-white text-lg font-semibold">
              {title}
            </DialogTitle>
            {/* RIGHT SIDE — BADGE OR ANY CUSTOM ELEMENT */}
            {appliedCount && (
              <div className="flex items-center">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {appliedCount}
                </span>
              </div>
            )}
          </div>



          {/* CLOSE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 hover:bg-transparent cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>


        {/* Body */}
        <div className="p-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
