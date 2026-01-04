"use client";

import { useRouter } from "next/navigation";
import { HistoryCard } from "../common/hisotry/HistoryCard";
import { HistorySkeleton } from "../common/hisotry/HistorySkeleton";
import { ROUTES } from "@/lib/routes";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { useAttachmentsHistoryByPatient } from "../_hooks/useAttachments";
import { useDictionary } from "@/i18n/dictionary-context";

export function AttachmentsHistory({ patientId }: { patientId: string }) {
  const router = useRouter();
  const { withLocale } = useLocaleRoute();
  const dict = useDictionary();

  const { data, isLoading } = useAttachmentsHistoryByPatient(patientId);
  const history = data || [];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">
        {dict.pages.doctor.appointment.tabsContent.attachments.history.title}
      </h3>

      {isLoading ? (
        <HistorySkeleton />
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">
          {dict.pages.doctor.appointment.tabsContent.attachments.history.empty}
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
                subtitle={`${dict.pages.doctor.appointment.tabsContent.attachments.history.uploadedBy} ${recorderName} ${dict.pages.doctor.appointment.tabsContent.attachments.history.at} ${createdAt ? format(createdAt, "hh:mm a") : "--"
                  }`}
                onClick={() =>
                  router.push(
                    `${withLocale(`${ROUTES.DOCTOR_APPOINTMENT_SCREENING}${item.visit_id}${ROUTES.DOCTOR_SCREENING_ATTACHMENT_HISTORY_VIEW}${item.visit_id}`)}`
                  )}



              />
            );
          })}
        </div>
      )}
    </div>
  );
}
