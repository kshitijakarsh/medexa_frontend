"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { ORDER_TYPE_LABELS } from "./nurse-order";
import { useDictionary } from "@/i18n/dictionary-context";

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
  const dict = useDictionary();

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
    const fields = dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.fields;

    switch (order.order_type) {
      case "iv_fluids":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.fluidType} value={details.fluid_type} />
            <DetailItem label={fields.volume} value={details.volume_ml} />
            <DetailItem label={fields.rate} value={details.rate_ml_hr} />
            <DetailItem label={fields.duration} value={details.duration_hours} />
            <DetailItem label={fields.totalVolume} value={details.total_volume} />
            <DetailItem label={fields.totalBottles} value={details.total_bottles} />
            <DetailItem label={fields.injection} value={details.injection} />
            <DetailItem label={fields.dose} value={details.dose} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
          </div>
        );

      case "medication":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.medicationName} value={details.medication_name} />
            <DetailItem label={fields.dose} value={details.dose} />
            <DetailItem label={fields.route} value={details.route} />
            <DetailItem label={fields.frequency} value={details.frequency} />
            <DetailItem label={fields.duration} value={details.duration} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
          </div>
        );

      case "wound_dressing":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.woundLocation} value={details.wound_location} />
            <DetailItem label={fields.dressingType} value={details.dressing_type} />
            <DetailItem label={fields.frequency} value={details.frequency} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
          </div>
        );

      case "oxygen_therapy":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.deliveryType} value={details.oxygen_delivery_type} />
            <DetailItem label={fields.flowRate} value={details.flow_rate} />
            <DetailItem label={fields.frequencyMode} value={details.frequency_mode} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
            {details.clinical_notes && (
              <div className="col-span-2">
                <DetailItem label={fields.clinicalNotes} value={details.clinical_notes} />
              </div>
            )}
          </div>
        );

      case "special_notes":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.noteType} value={details.note_type} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
            {details.clinical_notes && (
              <div className="col-span-2">
                <DetailItem label={fields.clinicalNotes} value={details.clinical_notes} />
              </div>
            )}
          </div>
        );

      case "monitoring":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.parameter} value={details.parameter_to_monitor} />
            <DetailItem label={fields.frequency} value={details.frequency} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
          </div>
        );

      case "catheter_care":
        return (
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label={fields.catheterType} value={details.catheter_type} />
            <DetailItem label={fields.careType} value={details.care_type} />
            <DetailItem label={fields.frequency} value={details.frequency} />
            <DetailItem label={fields.startDate} value={details.start_date} />
            <DetailItem label={fields.startTime} value={details.start_time} />
          </div>
        );

      default:
        return <p className="text-gray-500">No details available</p>;
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.title}
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Header Info */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b">
          <div>
            <label className="text-sm font-medium text-gray-500">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.modal.orderType}
            </label>
            <p className="text-base font-semibold mt-1">
              {(dict.pages.doctor.appointment.tabsContent.nurseOrders.orderTypes as any)[order.order_type] || order.order_type}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.urgency}
            </label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                {(dict.pages.doctor.appointment.tabsContent.nurseOrders.form.options as any)[order.urgency?.toLowerCase()] || order.urgency}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.status}
            </label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || "pending")}`}>
                {(dict.pages.doctor.appointment.tabsContent.nurseOrders.form.options as any)[order.status?.toLowerCase() || "pending"] || order.status}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.dateTime}
            </label>
            <p className="text-base mt-1">{formatDateTime(order.created_at)}</p>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h3 className="text-base font-semibold mb-3">
            {dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.orderDetails}
          </h3>
          {renderDetailsByType()}
        </div>

        {/* Notes */}
        {order.notes && (
          <div>
            <h3 className="text-base font-semibold mb-2">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.notes}
            </h3>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
              {order.notes}
            </p>
          </div>
        )}

        {/* Doctor Info */}
        {order.createdBy && (
          <div className="pt-4 border-t">
            <label className="text-sm font-medium text-gray-500">
              {dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.orderedBy}
            </label>
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
            {dict.pages.doctor.appointment.tabsContent.nurseOrders.viewModal.close}
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
