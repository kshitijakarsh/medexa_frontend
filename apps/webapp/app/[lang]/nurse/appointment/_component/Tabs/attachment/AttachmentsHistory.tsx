"use client";

import { useRouter } from "next/navigation";
import { HistoryCard } from "../common/hisotry/HistoryCard";
import { HistorySkeleton } from "../common/hisotry/HistorySkeleton";
import { ROUTES } from "@/lib/routes";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { useAttachmentsHistoryByPatient } from "../_hooks/useAttachments";

export function AttachmentsHistory({ patientId }: { patientId: string }) {
  const router = useRouter();
  const { withLocale } = useLocaleRoute();

  const { data, isLoading } = useAttachmentsHistoryByPatient(patientId);
  const history = data || [];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">
        Previous History of Attachments
      </h3>

      {isLoading ? (
        <HistorySkeleton />
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No attachments found.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item: any) => {
            const createdAt = item.created_at
              ? new Date(item.created_at)
              : null;

            const recorderName =
              item.createdBy?.first_name
                ? `${item.createdBy.first_name} ${item.createdBy.last_name ?? ""}`
                : "Unknown";

            return (
              <HistoryCard
                key={item.id}
                title={item.title || "Attachment"}
                subtitle={`Uploaded by ${recorderName} at ${createdAt ? format(createdAt, "hh:mm a") : "--"
                  }`}
                onClick={() =>
                  router.push(
                    `${withLocale(`${ROUTES.NURSE_APPOINTMENT_SCREENING}${item.visit_id}${ROUTES.NURSE_SCREENING_ATTACHMENT_HISTORY_VIEW}${item.visit_id}`)}`
                  )}



              />
            );
          })}
        </div>
      )}
    </div>
  );
}
