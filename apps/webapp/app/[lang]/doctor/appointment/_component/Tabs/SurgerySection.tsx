"use client";

import { useState } from "react";
import NewButton from "@/components/common/new-button";
import AddSurgeryModal from "./surgery-section/AddSurgeryModal";
import SurgeryTable from "./surgery-section/SurgeryTable";
import SurgeryDetailsModal from "./surgery-section/SurgeryDetailsModal"; // placeholder for now
import { SectionWrapper } from "./common/SectionWrapper";
import { EmptySurgeryState } from "./surgery-section/EmptyState";
import { useParams, useRouter } from "next/navigation";

export default function SurgerySection() {
    const router = useRouter();
    const { id } = useParams();

    const [showAddModal, setShowAddModal] = useState(false);
    const [viewItem, setViewItem] = useState(null);

    const [surgeries, setSurgeries] = useState([
        // sample data
        {
            id: 1,
            type: "Knee Replacement",
            category: "Orthopedics",
            urgency: "Elective",
            status: "Ordered",
        },
        {
            id: 2,
            type: "Cholecystectomy",
            category: "General Surgery",
            urgency: "Urgent",
            status: "Completed",
        },
    ]);

    const addSurgery = (data) => {
        setSurgeries((prev) => [
            ...prev,
            { id: prev.length + 1, status: "Ordered", ...data },
        ]);
    };

    return (
        <SectionWrapper
            header={
                <>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Surgery</h2>
                        <NewButton name="Add Surgery" handleClick={() => setShowAddModal(true)} />
                    </div>

                </>
            }
        >


            {/* Content */}
            {surgeries.length === 0 ? (
                <EmptySurgeryState onAdd={() => setShowAddModal(true)} />
            ) : (
                <>
                    <SurgeryTable
                        data={surgeries}
                        onView={(item) => router.push(`/doctor/appointment/${id}/surgery-details/${item.id}`)}
                    />
                </>
            )}

            {/* Modals */}
            <AddSurgeryModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={addSurgery}
            />

            {/* {viewItem && (
                <SurgeryDetailsModal
                    open={true}
                    onClose={() => setViewItem(null)}
                    surgery={viewItem}
                />
            )} */}
        </SectionWrapper>
    );
}
