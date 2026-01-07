"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createWardApiClient } from "@/lib/api/surgery/ward";
import { useDictionary } from "@/i18n/use-dictionary";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { SlidersHorizontal } from "lucide-react";
import { ConsumptionLog } from "./ConsumptionLog";
import { AddConsumptionLogModal } from "./AddConsumptionLogModal";

export function ConsumptionLogSection() {
    const dict = useDictionary();
    const [logSubTab, setLogSubTab] = useState("All");
    const [search, setSearch] = useState("");
    const [showAddLogModal, setShowAddLogModal] = useState(false);

    // API Client
    const wardApi = createWardApiClient({});

    // Fetch consumption logs with React Query
    const {
        data: logsResponse,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["consumption-logs", logSubTab, search],
        queryFn: async () => {
            const usageTypeFilter =
                logSubTab === "Ward"
                    ? "Ward"
                    : logSubTab === "Patient"
                        ? "Patient"
                        : undefined;

            const response = await wardApi.getConsumptionLogs({
                usage_type: usageTypeFilter,
                search: search || undefined,
            });
            return response.data;
        },
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
                                { label: dict.pages.surgery.wardStore.mainTabs.equipmentUsageSubItems.all, key: "All" },
                                { label: dict.pages.surgery.wardStore.mainTabs.equipmentUsageSubItems.ward, key: "Ward" },
                                { label: dict.pages.surgery.wardStore.mainTabs.equipmentUsageSubItems.patient, key: "Patient" },
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
                            name="Add Consumption Log"
                            handleClick={() => setShowAddLogModal(true)}
                        />
                    </div>
                </div>
            </div>

            <ConsumptionLog
                data={logsResponse?.data}
                isLoading={isLoading}
            />

            <AddConsumptionLogModal
                open={showAddLogModal}
                onOpenChange={setShowAddLogModal}
                onSave={(data) => {
                    console.log("Saving log:", data);
                    setShowAddLogModal(false);
                }}
            />
        </>
    );
}
