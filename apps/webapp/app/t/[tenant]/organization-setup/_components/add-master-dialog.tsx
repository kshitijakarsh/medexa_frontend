"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

interface AddMasterDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
}

export function AddMasterDialog({
  open,
  onOpenChange,
  title,
}: AddMasterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {title}</DialogTitle>
          <DialogDescription>
            Enter details to add a new record for {title}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input placeholder="Enter Name" />
          <Input placeholder="Enter Description" />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
