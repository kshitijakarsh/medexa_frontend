"use client";

import { useState } from "react";
import { useDictionary } from "@/i18n/use-dictionary";
import { useConsumptionLogs, useDeleteConsumptionLog } from "@/app/[lang]/surgery/_hooks/useWard";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { ConsumptionLog } from "./ConsumptionLog";
import { AddConsumptionLogModal } from "./AddConsumptionLogModal";

export function ConsumptionLogSection() {
    const dict = useDictionary();
    const [logSubTab, setLogSubTab] = useState("All");
    const [search, setSearch] = useState("");
    const [showAddLogModal, setShowAddLogModal] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState<string | undefined>(undefined);

    const deleteLogMutation = useDeleteConsumptionLog();

    const handleEdit = (id: string) => {
        setSelectedLogId(id);
        setShowAddLogModal(true);
    };

    const handleDelete = (id: string) => {
        deleteLogMutation.mutate(id);
    };

    const handleModalClose = (open: boolean) => {
        setShowAddLogModal(open);
        if (!open) {
            setSelectedLogId(undefined);
        }
    };

    // Fetch consumption logs with the new hook
    const {
        data: logsResponse,
        isLoading,
        refetch,
    } = useConsumptionLogs({
        usage_type: logSubTab === "Ward" ? "Ward" : logSubTab === "Patient" ? "Patient" : undefined,
        search: search || undefined,
    });

    return (
        <>
            {/* Actions Bar */}
            <div className="rounded-xl mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <DynamicTabs
                            defaultTab={logSubTab}
                            tabs={[
                                { label: dict.pages.surgery.wardStore.subTabs.all, key: "All" },
                                { label: dict.pages.surgery.wardStore.subTabs.ward, key: "Ward" },
                                { label: dict.pages.surgery.wardStore.subTabs.patient, key: "Patient" },
                            ]}
                            onChange={setLogSubTab}
                        />
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <FilterButton onClick={() => refetch()} className="bg-blue-500 text-white hover:none" />
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Search..."
                            width="280px"
                            className="rounded-lg bg-white border-none"
                        />
                        <NewButton
                            name={dict.pages.surgery.wardStore.actions.addConsumptionLog}
                            handleClick={() => setShowAddLogModal(true)}
                        />
                    </div>
                </div>
            </div>

            <ConsumptionLog
                data={logsResponse?.data}
                isLoading={isLoading}
                onEdit={handleEdit}
            />

            <AddConsumptionLogModal
                open={showAddLogModal}
                onOpenChange={handleModalClose}
                editId={selectedLogId}
                onSave={(data: any) => {
                    console.log("Saving log:", data);
                    setShowAddLogModal(false);
                    setSelectedLogId(undefined);
                }}
            />
        </>
    );
}
