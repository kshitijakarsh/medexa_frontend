// "use client";

// import { useVitalsHistoryByPatient } from "../_hooks/useVitals";
// import { useParams } from "next/navigation";
// import { HistoryCard } from "../../common/hisotry/HistoryCard";
// import { format } from "@workspace/ui/hooks/use-date-fns";

// export function VitalsHistory() {
//   const { patientId } = useParams() as { patientId: string };
//   const { data } = useVitalsHistoryByPatient(patientId);

//   if (!data?.length) return null;

//   return (
//     <div>
//       <h3 className="text-sm font-semibold mb-2">Previous Vital Signs</h3>

//       {data.map((item: any) => {
//         const date = new Date(item.created_at);

//         return (
//           <HistoryCard
//             key={item.id}
//             title={format(date, "MMMM dd, yyyy")}
//             subtitle={`Recorded at ${format(date, "hh:mm a")}`}
//           />
//         );
//       })}
//     </div>
//   );
// }
// "use client";

// import { useVitalsHistoryByPatient } from "../_hooks/useVitals";
// import { useParams } from "next/navigation";
// import { HistoryCard } from "../../common/hisotry/HistoryCard";
// import { format } from "@workspace/ui/hooks/use-date-fns";

// export function VitalsHistory() {
//   const { patientId } = useParams() as { patientId: string };
//   const { data } = useVitalsHistoryByPatient(patientId);

//   if (!data?.length) return null;

//   return (
//     <div>
//       <h3 className="text-sm font-semibold mb-2">Previous Vital Signs</h3>

//       {data.map((item: any) => {
//         const date = new Date(item.created_at);

//         return (
//           <HistoryCard
//             key={item.id}
//             title={format(date, "MMMM dd, yyyy")}
//             subtitle={`Recorded at ${format(date, "hh:mm a")}`}
//           />
//         );
//       })}
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { HistoryCard } from "../../common/hisotry/HistoryCard";
import { HistorySkeleton } from "../../common/hisotry/HistorySkeleton";
import { ROUTES } from "@/lib/routes";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { useVitalsHistoryByPatient } from "../../_hooks/useVitals";

export function VitalsHistory({ patientId }: { patientId: string }) {
  const router = useRouter();

  const { data, isLoading } = useVitalsHistoryByPatient(patientId);
  const history = data || [];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">
        Previous History of Nurse Notes
      </h3>

      {isLoading ? (
        <HistorySkeleton />
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No previous visits found.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item: any) => {
            const createdAt = item.created_at
              ? new Date(item.created_at)
              : null;

            const recorderName = item.createdBy?.name ?? "Unknown";

            return (
              <HistoryCard
                key={item.id}
                title={
                  createdAt
                    ? format(createdAt, "MMMM dd, yyyy")
                    : "Unknown Date"
                }
                subtitle={`Recorded by ${recorderName} at ${
                  createdAt ? format(createdAt, "hh:mm a") : "--"
                }`}
                onClick={() =>
                  router.push(
                    `${ROUTES.DOCTOR_APPOINTMENT_SCREENING}${item.visit_id}${ROUTES.DOCTOR_SCREENING_VITALS_HISTORY_VIEW}${item.id}`
                  )
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
