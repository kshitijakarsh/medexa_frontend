// app/doctor-dashboard/components/appointments/AppointmentGrid.tsx
"use client";

import AppointmentCard from "@/components/common/pasient-card/appointment-card";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";



export default function AppointmentGrid({
  items,
  loading,
}: {
  items: any[];
  loading: boolean;
}) {
  const router = useRouter()
  const { withLocale } = useLocaleRoute()

  const handleCardClick = (id: number) => {
    router.push(`${withLocale(ROUTES.NURSE_APPOINTMENT_SCREENING)}${id}`)

  }
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <AppointmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-white border border-[#E8F7FF] text-center text-gray-500">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {items.map((it: any) => (
        <AppointmentCard key={it.id} item={it} onClick={() => handleCardClick(it.id)} showNurseMenu={true} />
      ))}
    </div>
  );
}
