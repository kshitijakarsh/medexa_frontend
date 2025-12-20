"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { Button } from "@workspace/ui/components/button";

interface EquipmentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  equipment: {
    item_name: string;
    asset_tag: string;
    asset_id?: string;
    cost?: string;
    status: string;
    condition_before_use?: string;
    start_time?: string;
    end_time?: string;
    notes?: string;
  };
}

export default function EquipmentPreviewModal({
  open,
  onClose,
  equipment,
}: EquipmentPreviewModalProps) {
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
    <AppDialog open={open} onClose={onClose} title="Equipment Details">
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {equipment.item_name}
              </h3>
              <p className="text-sm text-gray-600">Asset Tag: {equipment.asset_tag}</p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full ${getStatusColor(equipment.status)}`}
            >
              {equipment.status}
            </span>
          </div>

          {equipment.asset_id && (
            <p className="text-sm text-gray-600 mt-2">
              Asset ID: <span className="font-medium">{equipment.asset_id}</span>
            </p>
          )}

          {equipment.cost && (
            <p className="text-sm text-gray-600 mt-2">
              Cost: <span className="font-medium">{equipment.cost}</span>
            </p>
          )}

          {equipment.condition_before_use && (
            <p className="text-sm text-gray-600 mt-2">
              Condition Before Use: <span className="font-medium">{equipment.condition_before_use}</span>
            </p>
          )}

          {equipment.start_time && (
            <p className="text-sm text-gray-600 mt-2">
              Start Time: <span className="font-medium">{new Date(equipment.start_time).toLocaleString()}</span>
            </p>
          )}

          {equipment.end_time && (
            <p className="text-sm text-gray-600 mt-2">
              End Time: <span className="font-medium">{new Date(equipment.end_time).toLocaleString()}</span>
            </p>
          )}
        </div>

        {equipment.notes && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Notes
            </h4>
            <p className="text-gray-600">{equipment.notes}</p>
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
