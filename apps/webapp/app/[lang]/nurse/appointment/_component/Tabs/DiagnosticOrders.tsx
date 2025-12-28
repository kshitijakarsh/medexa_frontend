"use client";

import { useState } from "react";
import { SectionWrapper } from "./common/SectionWrapper";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import NewButton from "@/components/common/new-button";

import OrderLabTestModal from "./diagnostic/OrderLabTestModal";
import OrderRadiologyModal from "./diagnostic/OrderRadiologyModal";

import LaboratoryTable from "./diagnostic/LaboratoryTable";
import RadiologyTable from "./diagnostic/RadiologyTable";
import { EmptyState } from "./diagnostic/EmptyState";
import { HeartPulse, Microscope } from "lucide-react";
import { HistoryAccordion } from "./diagnostic/HistoryAccordion";

const tabs = [
    { key: "laboratory", label: "Laboratory Tests" },
    { key: "radiology", label: "Radiology & Imaging" },
];

type LabOrder = {
    id: number;
    test: string;
    urgency: string;
    category: string;
    orderedDate: string;
    status: string;
};

type RadOrder = {
    id: number;
    procedure: string;
    bodyPart: string;
    urgency: string;
    orderedDate: string;
    status: string;
};


export function DiagnosticOrders() {
    const [activeTab, setActiveTab] = useState("laboratory");

    const [labHistory, setLabHistory] = useState([
        {
            id: 1,
            test: "Complete Blood Count (CBC)",
            urgency: "Routine",
            category: "Biochemistry",
            orderedDate: "2024-11-14T08:45:00",
            status: "Completed"
        },
        {
            id: 2,
            test: "Lipid Profile",
            urgency: "Urgent",
            category: "Biochemistry",
            orderedDate: "2024-11-14T08:45:00",
            status: "Completed"
        }
    ]);

    const [radHistory, setRadHistory] = useState([
        {
            id: 1,
            procedure: "Stomach X-Ray",
            bodyPart: "Abdomen",
            urgency: "Urgent",
            orderedDate: "2024-11-14T08:45:00",
            status: "Completed"
        }
    ]);

    const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
    const [radOrders, setRadOrders] = useState<RadOrder[]>([]);


    const [showLabModal, setShowLabModal] = useState(false);
    const [showRadModal, setShowRadModal] = useState(false);

    // const [labOrders, setLabOrders] = useState([]);
    // const [radOrders, setRadOrders] = useState([]);

    const addLabOrder = (order: any) => {
        setLabOrders((prev) => [...prev, { id: prev.length + 1, ...order }]);
    };

    const addRadOrder = (order: any) => {
        setRadOrders((prev) => [...prev, { id: prev.length + 1, ...order }]);
    };

    return (
        <SectionWrapper
            header={
                <div className="flex items-center justify-between">
                    <DynamicTabs
                        tabs={tabs}
                        defaultTab={activeTab}
                        onChange={(key) => setActiveTab(key as any)}
                    />

                    <NewButton
                        name={activeTab === "laboratory" ? "Laboratory Tests" : "Radiology Procedure"}
                        handleClick={() =>
                            activeTab === "laboratory"
                                ? setShowLabModal(true)
                                : setShowRadModal(true)
                        }
                    />
                </div>
            }
        >
            {/* CONTENT */}
            <div className="min-h-[240px]">
                {/* {activeTab === "laboratory" ? (
                    labOrders.length === 0 ? (
                        <EmptyState
                            message="No laboratory tests were conducted."
                            buttonText="Laboratory Tests"
                            onClick={() => setShowLabModal(true)}
                            icon={<Microscope size={50} />}
                        />
                    ) : (
                        <LaboratoryTable data={labOrders} />
                    )
                ) : radOrders.length === 0 ? (
                    <EmptyState
                        message="No radiology or imaging tests were conducted."
                        buttonText="Radiology Procedure"
                        onClick={() => setShowRadModal(true)}
                        icon={<HeartPulse size={50} />}
                    />
                ) : (
                    <RadiologyTable data={radOrders} />
                )} */}

                {activeTab === "laboratory" ? (
                    <>
                        {/* CURRENT LAB ORDERS */}
                        {labOrders.length ? (
                            <LaboratoryTable data={labOrders} />
                        ) : (
                            <EmptyState
                                message="No laboratory tests were conducted."
                                buttonText="Laboratory Tests"
                                onClick={() => setShowLabModal(true)}
                                icon={<Microscope size={50} />}
                            />
                        )}

                        {/* HISTORY SECTION */}
                        {labHistory.length > 0 && (
                            <HistoryAccordion
                                date="November 14, 2024"
                                recordedBy="Ordered by Dr. Sarah at 8:45 AM"
                            >
                                <LaboratoryTable data={labHistory} />
                            </HistoryAccordion>
                        )}
                    </>
                ) : null}

                {activeTab === "radiology" ? (
                    <>
                        {/* CURRENT RADIOLOGY ORDERS */}
                        {radOrders.length ? (
                            <RadiologyTable data={radOrders} />
                        ) : (
                            <EmptyState
                                message="No radiology or imaging tests were conducted."
                                buttonText="Radiology Procedure"
                                onClick={() => setShowRadModal(true)}
                                icon={<HeartPulse size={50} />}
                            />
                        )}

                        {/* HISTORY SECTION */}
                        {radHistory.length > 0 && (
                            <HistoryAccordion
                                date="November 14, 2024"
                                recordedBy="Recorded by Nurse Sarah at 8:45 AM"
                            >
                                <RadiologyTable data={radHistory} />
                            </HistoryAccordion>
                        )}
                    </>
                ) : null}


            </div>

            {/* MODALS */}
            <OrderLabTestModal
                open={showLabModal}
                onClose={() => setShowLabModal(false)}
                onSubmit={addLabOrder}
            />

            <OrderRadiologyModal
                open={showRadModal}
                onClose={() => setShowRadModal(false)}
                onSubmit={addRadOrder}
            />
        </SectionWrapper>
    );
}


