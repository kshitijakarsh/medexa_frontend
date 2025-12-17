"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useSoapTemplates } from "./useSoapTemplates";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (template: any) => void;
}

export function SelectSoapTemplateModal({
  open,
  onClose,
  onSelect,
}: Props) {
  const { data, isLoading } = useSoapTemplates();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Clinical Template</DialogTitle>
          <p className="text-sm text-gray-500">
            Choose a specialty template to auto-fill SOAP Note fields.
          </p>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}

          {!isLoading &&
            data?.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className="w-full flex justify-between items-center p-3 rounded-lg border hover:bg-blue-50 transition"
              >
                <div>
                  <p className="font-medium">{template.template_name}</p>
                  <p className="text-xs text-gray-500">
                    {template.specialty}
                  </p>
                </div>

                <span className="text-blue-600 text-sm">→</span>
              </button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
