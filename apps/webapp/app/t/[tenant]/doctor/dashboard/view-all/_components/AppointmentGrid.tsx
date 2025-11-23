// app/doctor-dashboard/components/appointments/AppointmentGrid.tsx
"use client";

import AppointmentCard from "./AppointmentCard";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";



export default function AppointmentGrid({
  items,
  loading,
}: {
  items: any[];
  loading: boolean;
}) {
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
        <AppointmentCard key={it.id} item={it} />
      ))}
    </div>
  );
}
