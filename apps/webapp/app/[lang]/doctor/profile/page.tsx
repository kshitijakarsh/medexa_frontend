// "use client";

// import { useState } from "react";
// import { AppointmentTable } from "./_components/AppointmentTable";
// import { OverviewCards } from "./_components/OverviewCards";
// import { DoctorHeader } from "./_components/DoctorHeader";
// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

// const TABS = [
//   { key: "all", label: "All Appointments" },
//   { key: "new", label: "New Patients" },
//   { key: "followup", label: "Follow Up Patients" },
// ];

// export default function DoctorDashboardPage() {
//   const [activeTab, setActiveTab] = useState("all");

//   return (
//     <div className="space-y-6 p-4">
//       {/* Doctor Info Header */}
//       <DoctorHeader />

//       {/* Overview Statistic Cards */}
//       <OverviewCards />

//       {/* Tabs */}
//       <DynamicTabs
//         tabs={TABS}
//         defaultTab="all"
//         variant="wrap"
//         onChange={(key) => setActiveTab(key)}
//       />

//       {/* Appointment Table */}
//       <AppointmentTable activeTab={activeTab} />
//     </div>
//   );
// }


"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { AppointmentTable } from "./_components/AppointmentTable";
import { OverviewCards } from "./_components/OverviewCards";
import { DoctorHeader } from "./_components/DoctorHeader";
import { SoapTemplateList } from "./_components/SoapTemplateList";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useDictionary } from "@/i18n/dictionary-context";

export default function DoctorDashboardPage() {
    const router = useRouter();
    const params = useSearchParams();
    const dict = useDictionary();
    const { tabs } = dict.pages.doctor.profile;

    const queryTab = params.get("tab") || "overview";
    const [pageTab, setPageTab] = useState(queryTab);
    const [appointmentTab, setAppointmentTab] = useState("all");

    const TOP_TABS = [
        { key: "overview", label: tabs.overview },
        { key: "soap", label: tabs.soapTemplates },
    ];

    const APPOINTMENT_TABS = [
        { key: "all", label: tabs.allAppointments },
        { key: "new", label: tabs.newPatients },
        { key: "followup", label: tabs.followUpPatients },
    ];

    useEffect(() => {
        setPageTab(queryTab);
    }, [queryTab]);

    const updateQueryTab = (tab: string) => {
        router.replace(`?tab=${tab}`, { scroll: false });
        setPageTab(tab);
    };

    return (
        <div className="space-y-6 p-4">
            <DoctorHeader />

            <div className="bg-white rounded-xl border space-y-4">

                {/* 🔵 Top Tabs with DynamicTabs */}
                <div className="flex justify-start border-b border-blue-200 p-4 pb-2 mb-0">
                    <DynamicTabs
                        tabs={TOP_TABS}
                        defaultTab={pageTab}
                        variant="wrap"
                        onChange={(key) => updateQueryTab(key)}
                    />
                </div>
                <div className="p-4 space-y-4">
                    {/* 🔵 Page Content */}
                    {pageTab === "overview" && (
                        <>
                            <OverviewCards />

                            <DynamicTabs
                                tabs={APPOINTMENT_TABS}
                                defaultTab="all"
                                variant="wrap"
                                onChange={(key) => setAppointmentTab(key)}
                            />

                            <AppointmentTable activeTab={appointmentTab} />
                        </>
                    )}

                    {pageTab === "soap" && <SoapTemplateList />}
                </div>
            </div>
        </div>
    );
}
