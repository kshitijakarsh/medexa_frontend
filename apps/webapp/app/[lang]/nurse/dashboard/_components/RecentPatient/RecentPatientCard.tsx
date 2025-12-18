import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { NurseReassignModal } from "../NurseReassignModal";

interface RecentPatientCardProps {
  patient: any;
  showNurseMenu?: boolean;
}

export function RecentPatientCard({ patient, showNurseMenu = false }: RecentPatientCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const nurseName = patient?.nurse
    ? patient.nurse.name || `${patient.nurse.first_name || ""} ${patient.nurse.last_name || ""}`.trim()
    : null;
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "stable":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDateTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-GB", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return dateStr;
    }
  };

  const patientName = patient.patient 
    ? `${patient.patient.first_name} ${patient.patient.last_name}`.trim() 
    : patient.full_name || "Unknown Patient";
  
  const patientInitial = patientName.charAt(0).toUpperCase();

  return (
    <>
    <Link
      href={`/nurse/appointment/${patient.id}`}
      className="bg-white border border-[#E6E6E6] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {patientInitial}
        </div>

        {/* Patient Info */}
        <div className="flex-1">
          <div className="font-semibold text-[15px]">
            {patientName}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>
              {patient.gender || "N/A"} / {patient.age || "N/A"}
            </span>
            <span>•</span>
            <span>{patient.patient?.civil_id || patient.civil_id || "N/A"}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              patient.status || "stable"
            )}`}
          >
            {(patient.status || "stable").replace("_", " ").toUpperCase()}
          </span>
        </div>

        {/* Three-dot Menu */}
        {showNurseMenu && (
          <button
            onClick={handleMenuClick}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-xs text-gray-500">Visit Type</span>
          <span className="text-xs font-medium">
            {(patient.visit_type || "consultation").replace("_", " ").toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          {/* Phone */}
          {(patient.patient?.mobile_number || patient.phone_no) && (
            <div className="flex items-center gap-1">
              <span>📞</span>
              <span>{patient.patient?.mobile_number || patient.phone_no}</span>
            </div>
          )}

          {/* Mode of Arrival */}
          {patient.mode_of_arrival && (
            <div className="flex items-center gap-1">
              <span>🚑</span>
              <span>{patient.mode_of_arrival}</span>
            </div>
          )}
        </div>

        {/* Time Update */}
        {patient.updated_at && (
          <div className="mt-2 text-[10px] text-gray-400">
            Last updated: {formatDateTime(patient.updated_at)}
          </div>
        )}

        {/* Nurse Name */}
        {showNurseMenu && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-xs text-gray-600">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-500">Nurse:</span>
              <span className="font-medium text-gray-700">
                {nurseName || "Not assigned"}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>

    {/* Nurse Reassign Modal */}
    {showNurseMenu && (
      <NurseReassignModal
        visit={patient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    )}
    </>
  );
}
