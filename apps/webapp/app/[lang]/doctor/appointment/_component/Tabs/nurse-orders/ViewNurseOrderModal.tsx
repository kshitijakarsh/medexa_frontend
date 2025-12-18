"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { ORDER_TYPE_LABELS } from "./nurse-order";

interface ViewNurseOrderModalProps {
  order: any | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewNurseOrderModal({
  order,
  open,
  onClose,
}: ViewNurseOrderModalProps) {
  if (!order) return null;

  const formatDateTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "ordered":
        return "bg-orange-100 text-orange-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "stat":
        return "bg-red-100 text-red-700";
      case "urgent":
        return "bg-orange-100 text-orange-700";
      case "routine":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderDetailsByType = () => {
    const details = order.details || {};

    switch (order.order_type) {
      case "iv_fluids":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Fluid Type" value={details.fluid_type} />
            <DetailItem label="Volume (ml)" value={details.volume_ml} />
            <DetailItem label="Rate (ml/hr)" value={details.rate_ml_hr} />
            <DetailItem label="Duration (hours)" value={details.duration_hours} />
            <DetailItem label="Total Volume" value={details.total_volume} />
            <DetailItem label="Total Bottles" value={details.total_bottles} />
            <DetailItem label="Injection" value={details.injection} />
            <DetailItem label="Dose" value={details.dose} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
          </div>
        );

      case "medication":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Medication Name" value={details.medication_name} />
            <DetailItem label="Dose" value={details.dose} />
            <DetailItem label="Route" value={details.route} />
            <DetailItem label="Frequency" value={details.frequency} />
            <DetailItem label="Duration" value={details.duration} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
          </div>
        );

      case "wound_dressing":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Wound Location" value={details.wound_location} />
            <DetailItem label="Dressing Type" value={details.dressing_type} />
            <DetailItem label="Frequency" value={details.frequency} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
          </div>
        );

      case "oxygen_therapy":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Delivery Type" value={details.oxygen_delivery_type} />
            <DetailItem label="Flow Rate" value={details.flow_rate} />
            <DetailItem label="Frequency Mode" value={details.frequency_mode} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
            {details.clinical_notes && (
              <div className="col-span-2">
                <DetailItem label="Clinical Notes" value={details.clinical_notes} />
              </div>
            )}
          </div>
        );

      case "special_notes":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Note Type" value={details.note_type} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
            {details.clinical_notes && (
              <div className="col-span-2">
                <DetailItem label="Clinical Notes" value={details.clinical_notes} />
              </div>
            )}
          </div>
        );

      case "monitoring":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Parameter to Monitor" value={details.parameter_to_monitor} />
            <DetailItem label="Frequency" value={details.frequency} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
          </div>
        );

      case "catheter_care":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Catheter Type" value={details.catheter_type} />
            <DetailItem label="Care Type" value={details.care_type} />
            <DetailItem label="Frequency" value={details.frequency} />
            <DetailItem label="Start Date" value={details.start_date} />
            <DetailItem label="Start Time" value={details.start_time} />
          </div>
        );

      default:
        return <p className="text-gray-500">No details available</p>;
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="View Nurse Order">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Header Info */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b">
          <div>
            <label className="text-sm font-medium text-gray-500">Order Type</label>
            <p className="text-base font-semibold mt-1">
              {ORDER_TYPE_LABELS[order.order_type as keyof typeof ORDER_TYPE_LABELS] || order.order_type}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Urgency</label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                {order.urgency?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || "pending")}`}>
                {order.status || "Pending"}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Created At</label>
            <p className="text-base mt-1">{formatDateTime(order.created_at)}</p>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h3 className="text-base font-semibold mb-3">Order Details</h3>
          {renderDetailsByType()}
        </div>

        {/* Notes */}
        {order.notes && (
          <div>
            <h3 className="text-base font-semibold mb-2">Notes</h3>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
              {order.notes}
            </p>
          </div>
        )}

        {/* Doctor Info */}
        {order.createdBy && (
          <div className="pt-4 border-t">
            <label className="text-sm font-medium text-gray-500">Ordered By</label>
            <p className="text-base mt-1">
              {(order.createdBy as any).name ||
                (order.createdBy.first_name
                  ? `Dr. ${order.createdBy.first_name} ${order.createdBy.last_name}`
                  : "N/A")}
            </p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </AppDialog>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <p className="text-base mt-1">{value || "N/A"}</p>
    </div>
  );
}
