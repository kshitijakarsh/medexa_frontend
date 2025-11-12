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
  maxWidth?: string;
}

export function AppDialog({
  open,
  onClose,
  title,
  children,
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
        <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
          <DialogTitle className="text-white text-lg font-semibold">
            {title}
          </DialogTitle>
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
