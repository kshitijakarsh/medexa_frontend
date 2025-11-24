"use client";

import { useState } from "react";

export default function AppointmentTabs({ onChange }: any) {
  const tabs = ["All", "VIP", "Follow Up"];
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-3 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => {
            setActive(t);
            onChange(t);
          }}
          className={`px-4 py-2 rounded-full border ${
            active === t
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
