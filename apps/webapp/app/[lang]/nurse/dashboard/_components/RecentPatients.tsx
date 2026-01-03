"use client";

import { useState } from "react";
import Link from "next/link";
import { RecentPatientCard } from "./RecentPatient/RecentPatientCard";
import { RecentPatientSkeleton } from "./RecentPatient/RecentPatientSkeleton";
import { useNurseVisitsQuery, useNurseAllVisitsQuery } from "./api";
import { useDictionary } from "@/i18n/use-dictionary";

export default function RecentPatients() {
  const dict = useDictionary();
  const [activeTab, setActiveTab] = useState<"visits" | "all">("visits");

  const { data: visitsData, isLoading: visitsLoading } = useNurseVisitsQuery({
    page: 1,
    limit: 4,
    enabled: activeTab === "visits",
  });

  const { data: allVisitsData, isLoading: allVisitsLoading } = useNurseAllVisitsQuery({
    page: 1,
    limit: 4,
    enabled: activeTab === "all",
  });

  const visits = visitsData?.data ?? [];
  const allVisits = allVisitsData?.data ?? [];
  const isLoading = activeTab === "visits" ? visitsLoading : allVisitsLoading;

  return (
    <div className="border border-[#CFE9FF] bg-white rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-base font-semibold">{dict.dashboard.recentPatients}</div>
        <Link
          href="/nurse/dashboard/recent-patients"
          className="text-sm text-[#0B84FF] font-medium hover:underline"
        >
          {dict.dashboard.viewAll}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("visits")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "visits"
              ? "text-[#0B84FF] border-b-2 border-[#0B84FF]"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {dict.dashboard.visits}
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "all"
              ? "text-[#0B84FF] border-b-2 border-[#0B84FF]"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {dict.dashboard.allVisits}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading
          ? [...Array(4)].map((_, i) => <RecentPatientSkeleton key={i} />)
          : (activeTab === "visits" ? visits : allVisits).map((patient: any) => (
            <RecentPatientCard key={patient.id} patient={patient} showNurseMenu={true} />
          ))}
      </div>
    </div>
  );
}
