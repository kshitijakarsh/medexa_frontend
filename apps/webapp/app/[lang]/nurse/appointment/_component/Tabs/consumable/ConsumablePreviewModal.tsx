"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { Button } from "@workspace/ui/components/button";

interface ConsumablePreviewModalProps {
  open: boolean;
  onClose: () => void;
  consumable: {
    item_name: string;
    quantity: number;
    cost?: string;
    status: string;
    notes?: string;
  };
}

export default function ConsumablePreviewModal({
  open,
  onClose,
  consumable,
}: ConsumablePreviewModalProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "text-blue-700 bg-blue-100";
      case "completed":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Consumable Details">
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {consumable.item_name}
              </h3>
              <p className="text-sm text-gray-600">Quantity: {consumable.quantity}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(consumable.status)}`}>
              {consumable.status}
            </span>
          </div>

          {consumable.cost && (
            <p className="text-sm text-gray-600 mt-2">
              Cost: <span className="font-medium">{consumable.cost}</span>
            </p>
          )}
        </div>

        {consumable.notes && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Notes
            </h4>
            <p className="text-gray-600">{consumable.notes}</p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
