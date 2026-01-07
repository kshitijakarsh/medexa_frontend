import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createWardApiClient } from "@/lib/api/surgery/ward";
import { useDictionary } from "@/i18n/use-dictionary";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { SlidersHorizontal } from "lucide-react";
import { EquipmentUsageLogs } from "./EquipmentUsageLogs";
import { AddEquipmentUsageModal } from "./AddEquipmentUsageModal";

export function EquipmentUsageSection() {
    const dict = useDictionary();
    const [equipmentSubTab, setEquipmentSubTab] = useState("All Equipment Usage");
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const wardApi = createWardApiClient({});

    const {
        data: logsResponse,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["equipment-usage-logs", equipmentSubTab, search],
        queryFn: async () => {
            const statusFilter =
                equipmentSubTab === "Running"
                    ? "Running"
                    : equipmentSubTab === "Completed"
                        ? "Completed"
                        : undefined;

            const response = await wardApi.getEquipmentUsageLogs({
                status: statusFilter,
                search: search || undefined,
            });
            return response.data;
        },
    });

    return (
        <>
            <div className="rounded-xl mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <DynamicTabs
                            defaultTab={equipmentSubTab}
                            tabs={[
                                { label: dict.pages.surgery.wardStore.mainTabs.consumptionLogSubItems.allEquipmentUsage, key: "All Equipment Usage" },
                                { label: dict.pages.surgery.wardStore.mainTabs.consumptionLogSubItems.running, key: "Running" },
                                { label: dict.pages.surgery.wardStore.mainTabs.consumptionLogSubItems.completed, key: "Completed" },
                            ]}
                            onChange={setEquipmentSubTab}
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
                            name="Add Equipment Usage Logs"
                            handleClick={() => setShowAddModal(true)}
                        />
                    </div>
                </div>
            </div>

            <EquipmentUsageLogs
                data={logsResponse?.data}
                isLoading={isLoading}
            />

            <AddEquipmentUsageModal
                open={showAddModal}
                onOpenChange={setShowAddModal}
                onSave={(data) => {
                    console.log("Saving equipment usage:", data);
                    setShowAddModal(false);
                }}
            />
        </>
    );
}
