import { useState } from "react";
import { useDictionary } from "@/i18n/use-dictionary";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { useDeleteEquipmentUsageLog, useEquipmentUsageLogs } from "@/app/[lang]/surgery/_hooks/useWard";
import { EquipmentUsageLogs } from "./EquipmentUsageLogs";
import { AddEquipmentUsageModal } from "./AddEquipmentUsageModal";

export function EquipmentUsageSection() {
    const dict = useDictionary();
    const [equipmentSubTab, setEquipmentSubTab] = useState("All Equipment Usage");
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState<string | undefined>(undefined);

    const deleteLogMutation = useDeleteEquipmentUsageLog();

    const handleEdit = (id: string) => {
        setSelectedLogId(id);
        setShowAddModal(true);
    };

    const handleDelete = (id: string) => {
        deleteLogMutation.mutate(id);
    };

    const handleModalClose = (open: boolean) => {
        setShowAddModal(open);
        if (!open) {
            setSelectedLogId(undefined);
        }
    };

    const statusFilter =
        equipmentSubTab === "Running"
            ? "Running"
            : equipmentSubTab === "Completed"
                ? "Completed"
                : undefined;

    const {
        data: logsResponse,
        isLoading,
        refetch,
    } = useEquipmentUsageLogs({
        status: statusFilter,
        search: search || undefined,
    });

    return (
        <>
            <div className="rounded-xl mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <DynamicTabs
                            defaultTab={equipmentSubTab}
                            tabs={[
                                { label: dict.pages.surgery.wardStore.subTabs.all, key: "All Equipment Usage" },
                                { label: dict.pages.surgery.wardStore.subTabs.running, key: "Running" },
                                { label: dict.pages.surgery.wardStore.subTabs.completed, key: "Completed" },
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
                            name={dict.pages.surgery.wardStore.actions.addEquipmentUsage}
                            handleClick={() => setShowAddModal(true)}
                        />
                    </div>
                </div>
            </div>

            <EquipmentUsageLogs
                data={logsResponse?.data}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AddEquipmentUsageModal
                open={showAddModal}
                onOpenChange={handleModalClose}
                editId={selectedLogId}
                onSave={(data: any) => {
                    console.log("Saving equipment usage:", data);
                    setShowAddModal(false);
                    setSelectedLogId(undefined);
                }}
            />
        </>
    );
}
