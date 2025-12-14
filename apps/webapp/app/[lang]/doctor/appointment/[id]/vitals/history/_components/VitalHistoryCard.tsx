import React from "react";

export function VitalHistoryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">
          {value || "----"}
        </p>
      </div>
    </div>
  );
}
