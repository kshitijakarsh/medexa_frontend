"use client";

import { Info } from "lucide-react";

interface RecordedMetaProps {
  createdByName?: string;
  createdAt?: string | Date | null;
  fallbackName?: string;
}

export function RecordedMeta({
  createdByName,
  createdAt,
  fallbackName = "Nurse",
}: RecordedMetaProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "--";

  return (
    <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white">
      <span>
        Recorded by{" "}
        <span className="font-medium">
          {createdByName || fallbackName}
        </span>{" "}
        on {formattedDate}
      </span>

      <Info className="h-3.5 w-3.5 text-blue-500" />
    </div>
  );
}
