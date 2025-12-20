"use client";

import { useState } from "react";
import { X, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { useUpdateNurseOrder } from "../_hooks/useNurseOrder";
import Button from "@/components/ui/button";

interface StatusUpdateModalProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    description: "Task is waiting to be started",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: PlayCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    description: "Task is currently being worked on",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    description: "Task has been finished",
  },
];

export function StatusUpdateModal({
  task,
  isOpen,
  onClose,
}: StatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    task?.status || "pending"
  );
  const updateOrder = useUpdateNurseOrder();

  const handleUpdateStatus = async () => {
    if (!task?.id) return;

    try {
      await updateOrder.mutateAsync({
        id: task.id,
        payload: { status: selectedStatus },
      });
      onClose();
    } catch (error: any) {
      console.error("Failed to update status:", error);
      alert(error?.response?.data?.message || "Failed to update status");
    }
  };

  if (!isOpen) return null;

  const getTaskLabel = () => {
    const ORDER_TYPE_LABELS: Record<string, string> = {
      wound_dressing: "Wound Dressing Change",
      medication: "Medication",
      iv_fluids: "IV Fluids",
      oxygen_therapy: "Oxygen Therapy",
      special_notes: "Special Notes",
      monitoring: "Monitoring",
      catheter_care: "Catheter Care",
    };
    return ORDER_TYPE_LABELS[task?.order_type] || task?.order_type || "Task";
  };

  const getPatientInfo = () => {
    if (task?.patient) {
      const name = `${task.patient.first_name || ""} ${task.patient.last_name || ""}`.trim();
      const mrn = task.patient.civil_id || task.patient_id;
      return `${name} (MRN-${mrn})`;
    }
    return `Patient MRN-${task?.patient_id || "N/A"}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-4 bg-blue-50 border-b">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {getTaskLabel()}
          </h4>
          <p className="text-xs text-gray-600">{getPatientInfo()}</p>
          {task?.details?.start_time && (
            <p className="text-xs text-gray-500 mt-1">
              Time: {task.details.start_time}
            </p>
          )}
        </div>

        {/* Status Options */}
        <div className="p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Select Status
          </p>
          <div className="space-y-2">
            {STATUS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.value;
              const isCurrent = task?.status === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? `${option.borderColor} ${option.bgColor}`
                      : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? option.bgColor : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected ? option.color : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-semibold ${
                            isSelected ? option.color : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </p>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${option.color.replace("text-", "bg-")}`}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={
              selectedStatus === task?.status || updateOrder.isPending
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {updateOrder.isPending ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </div>
    </div>
  );
}
