"use client";

import { useParams } from "next/navigation";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { PageHeader } from "@/components/common/page-header";
import { NurseNoteDetailsSkeleton } from "../_components/NurseNoteDetailsSkeleton";
import { useNurseNoteHistoryOne } from "../../../../_component/Tabs/_hooks/useNurseNotes";

/* ---------- Reusable UI block ---------- */
function InfoBox({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {value || "-"}
      </p>
    </div>
  );
}

export default function NurseNoteHistoryDetails() {
  const { nurseNoteId } = useParams() as { nurseNoteId: string };

  const { data, isLoading } = useNurseNoteHistoryOne(nurseNoteId);

  if (isLoading || !data) return <NurseNoteDetailsSkeleton />;

  const createdAt = data.created_at ? new Date(data.created_at) : null;

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Nurse Note Details" />

      <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
        {/* Date */}
        <p className="font-semibold">
          {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
        </p>

        {/* Recorder */}
        <p className="text-xs text-gray-500">
          Recorded by{" "}
          {data.createdBy?.name ?? "Unknown"}
          {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
        </p>

        {/* Note */}
        <div className="mt-6">
          <InfoBox label="Nurse Note" value={data.note} />
        </div>
      </div>
    </div>
  );
}
