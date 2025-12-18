import Link from "next/link";

interface PriorityTaskCardProps {
  task: any;
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

export function PriorityTaskCard({ task }: PriorityTaskCardProps) {
  const getUrgencyStyles = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "stat":
        return {
          bg: "bg-[#FFE5E5]",
          badge: "bg-[#FF4D4D] text-white",
          label: "High",
        };
      case "urgent":
        return {
          bg: "bg-[#FFE5E5]",
          badge: "bg-[#FF4D4D] text-white",
          label: "High",
        };
      case "routine":
        return {
          bg: "bg-[#FFF4E5]",
          badge: "bg-[#FF9933] text-white",
          label: "Medium",
        };
      default:
        return {
          bg: "bg-[#FFF4E5]",
          badge: "bg-[#FF9933] text-white",
          label: "Medium",
        };
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "N/A";
    // If it's already in HH:MM format
    if (/^\d{2}:\d{2}$/.test(timeStr)) {
      const parts = timeStr.split(":");
      const hours = parts[0] || "0";
      const minutes = parts[1] || "00";
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "pm" : "am";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    }
    return timeStr;
  };

  const getTaskLabel = () => {
    return ORDER_TYPE_LABELS[task.order_type] || task.order_type || "Task";
  };

  const getPatientInfo = () => {
    if (task.patient) {
      const name = `${task.patient.first_name || ""} ${task.patient.last_name || ""}`.trim();
      const mrn = task.patient.civil_id || task.patient_id;
      return `${name} (MRN-${mrn})`;
    }
    return `Patient MRN-${task.patient_id}`;
  };

  const getRoomInfo = () => {
    // Check if room info is available in visit or task details
    if (task.details?.room) {
      return `Room ${task.details.room}`;
    }
    if (task.visit?.room_number) {
      return `Room ${task.visit.room_number}`;
    }
    return null;
  };

  const urgencyStyles = getUrgencyStyles(task.urgency || "routine");
  const getStatusStyles = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "in_progress":
      case "in-consultation":
      case "inprogress":
        return { badge: "border-[#0B84FF] text-[#0B84FF] bg-white", label: "In Progress" };
      case "completed":
      case "done":
        return { badge: "bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]", label: "Done" };
      case "cancelled":
      case "canceled":
        return { badge: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]", label: "Canceled" };
      case "pending":
      default:
        return { badge: "border-[#FF6B35] text-[#FF6B35] bg-white", label: "Pending" };
    }
  };

  const statusStyles = getStatusStyles(task.status || "pending");

  return (
    <Link
      href={`/nurse/appointment/${task.visit_id}`}
      className={`${urgencyStyles.bg} hover:opacity-90 rounded-lg p-4 transition-all cursor-pointer block`}
    >
      <div className="flex items-start justify-between mb-3">
        {/* Task Title */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-900">
            {getTaskLabel()}
          </h3>
        </div>

        {/* Status Badge */}
        <span className={`${statusStyles.badge} px-2 py-0.5 rounded-full text-xs font-medium ml-3 border`}> {statusStyles.label} </span>

        {/* Urgency Badge */}
        <span
          className={`${urgencyStyles.badge} px-3 py-1 rounded-full text-xs font-medium ml-3`}
        >
          {urgencyStyles.label}
        </span>
      </div>

      {/* Patient Info */}
      <div className="flex items-center text-xs text-gray-600 mb-2">
        <svg
          className="w-3 h-3 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span>{getPatientInfo()}</span>
      </div>

      {/* Additional Details */}
      <div className="flex items-center gap-4 text-xs text-gray-600">
        {/* Room */}
        {getRoomInfo() && (
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{getRoomInfo()}</span>
          </div>
        )}

        {/* Time */}
        {task.details?.start_time && (
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formatTime(task.details.start_time)}</span>
          </div>
        )}
      </div>

      {/* Details Link */}
      <div className="mt-3 text-right">
        <span className="text-xs text-[#FF6B35] font-medium hover:underline">
          Details
        </span>
      </div>
    </Link>
  );
}
