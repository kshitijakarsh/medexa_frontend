"use client";

import { useParams, useRouter } from "next/navigation";
import { HistoryCard } from "../common/hisotry/HistoryCard";
import { HistorySkeleton } from "../common/hisotry/HistorySkeleton";
import { ROUTES } from "@/lib/routes";
import { useSoapNotesHistoryByPatient } from "../_hooks/useSoapNotes";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";

export function SoapNotesHistory({ patientId }: { patientId: string }) {
  const router = useRouter();
  const { id: visitId } = useParams() as { id: string };
  const { withLocale } = useLocaleRoute()

  // 🔥 SOAP notes history API
  const { data, isLoading } = useSoapNotesHistoryByPatient(patientId);

  const history = data || [];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">
        Previous History of SOAP Notes
      </h3>

      {isLoading ? (
        <HistorySkeleton />
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">No previous SOAP notes found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item: any) => {
            const createdAt = item.created_at
              ? new Date(item.created_at)
              : null;

            const recorderName = `${item.createdBy?.name ?? ""} (${item.createdBy?.role?.name ?? ""
              })`.trim(); 

            return (
              <HistoryCard
                key={item.id}
                title={
                  createdAt
                    ? format(createdAt, "MMMM dd, yyyy")
                    : "Unknown Date"
                }
                subtitle={`Recorded by ${recorderName || "Unknown"
                  } at ${createdAt ? format(createdAt, "hh:mm a") : "--"
                  }`}
                onClick={() =>
                  router.push(
                    `${withLocale(`${ROUTES.NURSE_APPOINTMENT_SCREENING}${item.visit_id}${ROUTES.NURSE_SCREENING_SOAP_NOTE_HISTORY_VIEW}${item.id}`)}`)
                  }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
