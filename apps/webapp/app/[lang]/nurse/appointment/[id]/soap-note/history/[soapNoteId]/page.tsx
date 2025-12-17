"use client";

import { useParams } from "next/navigation";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { PageHeader } from "@/components/common/page-header";
import { SoapNoteDetailsSkeleton } from "../_components/SoapNoteDetailsSkeleton";
import { useSoapNoteHistoryOne } from "../../../../_component/Tabs/_hooks/useSoapNotes";

/* ---------- Reusable UI blocks (same as Visit Purpose) ---------- */

function InfoBox({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm leading-relaxed">{value || "-"}</p>
    </div>
  );
}

export default function SoapNoteHistoryDetails() {
  const { soapNoteId } = useParams() as { soapNoteId: string };

  const { data, isLoading } = useSoapNoteHistoryOne(soapNoteId);

  if (isLoading || !data) return <SoapNoteDetailsSkeleton />;

  const createdAt = data.created_at ? new Date(data.created_at) : null;
  const soap = data;

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="SOAP Note Details" />

      <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
        {/* Date */}
        <p className="font-semibold">
          {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
        </p>

        {/* Recorder */}
        <p className="text-xs text-gray-500">
          Recorded by{" "}
          {data.createdBy
            ? `${data.createdBy.name} (${data.createdBy?.role?.name})`
            : "Unknown"}
          {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
        </p>

        {/* SOAP Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBox
            label="Subjective (Patient’s Story)"
            value={soap?.subjective}
          />

          <InfoBox
            label="Objective (Clinical Findings)"
            value={soap?.objective}
          />

          <InfoBox
            label="Assessment (Diagnosis)"
            value={soap?.assessment}
          />

          <InfoBox
            label="Plan (Treatment & Follow-up)"
            value={soap?.plan}
          />
        </div>
      </div>
    </div>
  );
}
