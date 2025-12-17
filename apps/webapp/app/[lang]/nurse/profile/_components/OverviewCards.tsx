"use client";

import {
  UserRound,
  CalendarDays,
  CheckCircle2,
  Stethoscope,
  Pill,
} from "lucide-react";

export function OverviewCards() {
  const stats = [
    {
      label: "Total Patients Treated",
      value: 565,
      icon: <UserRound size={22} />,
      bg: "bg-purple-50",
      iconBg: "bg-purple-200 text-purple-700",
    },
    {
      label: "Today Appointments",
      value: 565,
      icon: <CalendarDays size={22} />,
      bg: "bg-blue-50",
      iconBg: "bg-blue-200 text-blue-700",
    },
    {
      label: "Completed Appointments",
      value: 565,
      icon: <CheckCircle2 size={22} />,
      bg: "bg-green-50",
      iconBg: "bg-green-200 text-green-700",
    },
    {
      label: "Total Patients Treated",
      value: 565,
      icon: <Stethoscope size={22} />,
      bg: "bg-orange-50",
      iconBg: "bg-orange-200 text-orange-700",
    },
    {
      label: "Follow-ups",
      value: 565,
      icon: <Pill size={22} />,
      bg: "bg-pink-50",
      iconBg: "bg-pink-200 text-pink-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`${s.bg} rounded-xl border p-4 flex flex-col gap-3 shadow-sm`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.iconBg}`}>
            {s.icon}
          </div>

          <span className="text-3xl font-semibold">{s.value}</span>
          <span className="text-sm font-medium text-gray-600">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
