"use client";

import { Suspense, useState } from "react";
import { useNurseVisitsQuery, useNurseAllVisitsQuery } from "../_components/api";
import { RecentPatientCard } from "../_components/RecentPatient/RecentPatientCard";
import { RecentPatientSkeleton } from "../_components/RecentPatient/RecentPatientSkeleton";

function RecentPatientsPageContent() {
  const [activeTab, setActiveTab] = useState<"visits" | "all">("visits");

  const { data: visitsData, isLoading: visitsLoading } = useNurseVisitsQuery({
    page: 1,
    limit: 50,
    enabled: activeTab === "visits",
  });

  const { data: allVisitsData, isLoading: allVisitsLoading } = useNurseAllVisitsQuery({
    page: 1,
    limit: 50,
    enabled: activeTab === "all",
  });

  const visits = visitsData?.data ?? [];
  const allVisits = allVisitsData?.data ?? [];
  const isLoading = activeTab === "visits" ? visitsLoading : allVisitsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F9FF] to-[#E3F6FE] p-6">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Recent Patients</h1>
          <p className="text-sm text-gray-500 mt-1">View all patient visits</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("visits")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "visits"
                ? "text-[#0B84FF] border-b-2 border-[#0B84FF]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Visits
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "text-[#0B84FF] border-b-2 border-[#0B84FF]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Visits
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <RecentPatientSkeleton key={i} />
              ))
            : (activeTab === "visits" ? visits : allVisits).map((visit: any) => (
                <RecentPatientCard key={visit.id} patient={visit} showNurseMenu={true} />
              ))}
        </div>
        {!isLoading && (activeTab === "visits" ? visits : allVisits).length === 0 && (
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-12 text-center">
            <div className="text-gray-400 text-5xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No Patients Found
            </h3>
            <p className="text-sm text-gray-500">
              There are no patient visits to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecentPatientsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecentPatientsPageContent />
    </Suspense>
  );
}
