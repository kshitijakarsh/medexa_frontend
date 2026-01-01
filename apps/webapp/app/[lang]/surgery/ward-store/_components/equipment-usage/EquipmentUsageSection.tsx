import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createWardApiClient } from "@/lib/api/surgery/ward";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { SlidersHorizontal } from "lucide-react";
import { EquipmentUsageLogs } from "./EquipmentUsageLogs";
import { AddEquipmentUsageModal } from "./AddEquipmentUsageModal";

export function EquipmentUsageSection() {
    const [equipmentSubTab, setEquipmentSubTab] = useState("All Equipment Usage");
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const wardApi = createWardApiClient({});

    const {
        data: logsResponse,
        isLoading,
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
                                { label: "All Equipment Usage", key: "All Equipment Usage" },
                                { label: "Running", key: "Running" },
                                { label: "Completed", key: "Completed" },
                            ]}
                            onChange={setEquipmentSubTab}
                        />
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-full text-sm font-medium transition-colors hover:bg-blue-50/50">
                            Filter <SlidersHorizontal size={16} />
                        </button>
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
