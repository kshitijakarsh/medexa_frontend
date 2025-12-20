"use client";

import { useState } from "react";
import { ArrowLeft, Printer, Download } from "lucide-react";
import SurgeryDetailsTab from "../_components/SurgeryDetailsTab";
import PreOpInstructionsTab from "../_components/PreOpInstructionsTab";
import OTRequirementsTab from "../_components/OTRequirementsTab";
import RisksConsentTab from "../_components/RisksConsentTab";
import PatientInfo from "../_components/PatientInfo";
import VisitInfoCard from "../_components/VisitInfoCard";
import ActiveProblemsCard from "../_components/ActiveProblemsCard";
import AllergiesCard from "../_components/AllergiesCard";
import OngoingMedicationsCard from "../_components/OngoingMedicationsCard";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { PageHeader } from "@/components/common/page-header";


const TAB_LIST = [
    { key: "details", label: "Surgery Details" },
    { key: "preop", label: "Pre-Operative Instructions" },
    { key: "ot", label: "Operation Theatre Requirements" },
    { key: "risks", label: "Risks & Consent" },
];


export default function SurgeryDetailsPage() {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="p-4 lg:p-6 space-y-6">

            {/* HEADER */}
            {/* <div className="flex justify-between items-center bg-white border p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div>
                        <h2 className="text-lg font-semibold">Surgery Details</h2>
                        <p className="text-gray-500">Patient Information Overview</p>
                    </div>
                </div>

              
            </div> */}
            <PageHeader title="Surgery Details" />

            {/* PATIENT HEADER CARD */}
            <PatientInfo />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT MAIN CONTENT */}
                <div className="lg:col-span-8 space-y-6">

                    {/* CURRENT VISIT INFO */}
                    <VisitInfoCard />

                    {/* SURGERY DETAILS TABS */}
                    <div className="bg-white border p-4 rounded-xl shadow-sm">
                        {/* <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
                        <DynamicTabs
                            tabs={TAB_LIST}
                            defaultTab={activeTab}
                            // onChange={ }
                            onChange={(tabKey) => setActiveTab(tabKey as any)}
                        />


                        <div className="mt-4">
                            {activeTab === "details" && <SurgeryDetailsTab />}
                            {activeTab === "preop" && <PreOpInstructionsTab />}
                            {activeTab === "ot" && <OTRequirementsTab />}
                            {activeTab === "risks" && <RisksConsentTab />}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE CARDS */}
                <div className="lg:col-span-4 space-y-6">
                    <ActiveProblemsCard />
                    <AllergiesCard />
                    <OngoingMedicationsCard />
                </div>
            </div>
        </div>
    );
}
