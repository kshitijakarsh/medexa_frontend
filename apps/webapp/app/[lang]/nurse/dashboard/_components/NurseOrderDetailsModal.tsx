"use client";

import { X, Calendar, Clock, AlertCircle, FileText, User, Droplet, Wind, Stethoscope, ClipboardList, Activity } from "lucide-react";
import Button from "@/components/ui/button";

interface NurseOrderDetailsModalProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
}

const ORDER_TYPE_LABELS: Record<string, string> = {
  wound_dressing: "Wound Dressing Change",
  medication: "Medication",
  iv_fluids: "IV Fluids",
  oxygen_therapy: "Oxygen Therapy",
  special_notes: "Special Notes",
  monitoring: "Monitoring",
  catheter_care: "Catheter Care",
};

const ORDER_TYPE_ICONS: Record<string, any> = {
  wound_dressing: Activity,
  medication: ClipboardList,
  iv_fluids: Droplet,
  oxygen_therapy: Wind,
  special_notes: FileText,
  monitoring: Stethoscope,
  catheter_care: Activity,
};

export function NurseOrderDetailsModal({
  task,
  isOpen,
  onClose,
}: NurseOrderDetailsModalProps) {
  if (!isOpen) return null;

  const getTaskLabel = () => {
    return ORDER_TYPE_LABELS[task?.order_type] || task?.order_type || "Task";
  };

  const getTaskIcon = () => {
    const Icon = ORDER_TYPE_ICONS[task?.order_type] || FileText;
    return Icon;
  };

  const getPatientInfo = () => {
    if (task?.patient) {
      const name = `${task.patient.first_name || ""} ${task.patient.last_name || ""}`.trim();
      const mrn = task.patient.civil_id || task.patient_id;
      return { name, mrn, mobile: task.patient.mobile_number };
    }
    return { name: "N/A", mrn: task?.patient_id || "N/A", mobile: "N/A" };
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "in_progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "stat":
      case "urgent":
        return "bg-red-100 text-red-700";
      case "routine":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const patientInfo = getPatientInfo();
  const TaskIcon = getTaskIcon();

  const renderOrderDetails = () => {
    const details = task?.details || {};
    const orderType = task?.order_type;

    switch (orderType) {
      case "wound_dressing":
        return (
          <>
            <DetailRow label="Wound Location" value={details.wound_location} />
            <DetailRow label="Dressing Type" value={details.dressing_type} />
            <DetailRow label="Frequency" value={details.frequency} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
            <DetailRow label="Start Time" value={details.start_time} />
          </>
        );

      case "medication":
        return (
          <>
            <DetailRow label="Medication Name" value={details.medication_name} />
            <DetailRow label="Dosage" value={details.dosage} />
            <DetailRow label="Route" value={details.route} />
            <DetailRow label="Frequency" value={details.frequency} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
            <DetailRow label="Duration" value={details.duration} />
          </>
        );

      case "iv_fluids":
        return (
          <>
            <DetailRow label="Fluid Type" value={details.fluid_type} />
            <DetailRow label="Volume" value={details.volume} />
            <DetailRow label="Rate" value={details.rate} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
            <DetailRow label="Start Time" value={details.start_time} />
          </>
        );

      case "oxygen_therapy":
        return (
          <>
            <DetailRow label="Delivery Method" value={details.delivery_method} />
            <DetailRow label="Flow Rate" value={details.flow_rate} />
            <DetailRow label="Duration" value={details.duration} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
            <DetailRow label="Start Time" value={details.start_time} />
          </>
        );

      case "monitoring":
        return (
          <>
            <DetailRow label="Parameters" value={details.parameters} />
            <DetailRow label="Frequency" value={details.frequency} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
            <DetailRow label="Duration" value={details.duration} />
          </>
        );

      case "catheter_care":
        return (
          <>
            <DetailRow label="Catheter Type" value={details.catheter_type} />
            <DetailRow label="Care Type" value={details.care_type} />
            <DetailRow label="Frequency" value={details.frequency} />
            <DetailRow label="Start Date" value={formatDate(details.start_date)} />
          </>
        );

      case "special_notes":
        return (
          <>
            <DetailRow label="Instructions" value={details.instructions} fullWidth />
          </>
        );

      default:
        return (
          <div className="text-sm text-gray-500">
            No specific details available for this order type.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TaskIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {getTaskLabel()}
              </h3>
              <p className="text-xs text-gray-500">Order ID: {task?.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status & Urgency */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task?.status)}`}>
              {(task?.status || "pending").replace("_", " ").toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(task?.urgency)}`}>
              {(task?.urgency || "routine").toUpperCase()}
            </span>
          </div>

          {/* Patient Information */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600">Name</p>
                <p className="text-sm font-medium text-gray-900">{patientInfo.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">MRN</p>
                <p className="text-sm font-medium text-gray-900">{patientInfo.mrn}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Mobile</p>
                <p className="text-sm font-medium text-gray-900">{patientInfo.mobile}</p>
              </div>
              {task?.visit && (
                <div>
                  <p className="text-xs text-gray-600">Visit Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {task.visit.visit_type?.replace("_", " ") || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Order Details
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderOrderDetails()}
              </div>
            </div>
          </div>

          {/* Notes */}
          {task?.notes && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Additional Notes
              </h4>
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-gray-700">{task.notes}</p>
              </div>
            </div>
          )}

          {/* Created By */}
          {task?.createdBy && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Created By</h4>
              <p className="text-sm text-gray-700">{task.createdBy.name}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-gray-600">Created At</p>
              <p className="text-sm text-gray-900">{formatDate(task?.created_at)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Last Updated</p>
              <p className="text-sm text-gray-900">{formatDate(task?.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, fullWidth = false }: { label: string; value: any; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || "N/A"}</p>
    </div>
  );
}
