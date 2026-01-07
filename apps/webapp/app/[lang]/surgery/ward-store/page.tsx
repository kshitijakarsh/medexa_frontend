"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createWardApiClient, WardType } from "@/lib/api/surgery/ward";
import { WardStockSection } from "./_components/ward-stock/WardStockSection";
import { ConsumptionLogSection } from "./_components/consumption-log/ConsumptionLogSection";
import { EquipmentUsageSection } from "./_components/equipment-usage/EquipmentUsageSection";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@workspace/ui/components/select";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useDictionary } from "@/i18n/use-dictionary";

export default function WardStorePage() {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const [mainTab, setMainTab] = useState("Ward Stock");
    const [selectedWardId, setSelectedWardId] = useState<string | undefined>(undefined);

    // API Client
    const wardApi = createWardApiClient({});

    // Fetch ward types
    const { data: wardTypesResponse } = useQuery({
        queryKey: ["ward-types"],
        queryFn: async () => {
            const response = await wardApi.getWardTypes();
            return response.data;
        },
    });

    const wardTypes = (wardTypesResponse?.data as WardType[]) || [];

    // Set default ward if not selected
    useEffect(() => {
        if (!selectedWardId && wardTypes.length > 0) {
            setSelectedWardId(wardTypes[0]?.id);
        }
    }, [wardTypes, selectedWardId]);

    const selectedWardName = wardTypes.find((w: WardType) => w.id === selectedWardId)?.name || "Select Ward";

    return (
        < div >
            < div className="flex items-center justify-between mb-4" >
                <h1 className="text-lg font-normal">{wardStoreDict.wardStore}</h1>
                <div className="flex items-center gap-3">
                    <Select value={selectedWardId} onValueChange={setSelectedWardId}>
                        <SelectTrigger className="h-9 border-slate-200 text-sm rounded-full bg-white px-4">
                            <SelectValue placeholder={wardStoreDict.selectWard}>
                                {selectedWardName}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {wardTypes.map((ward: WardType) => (
                                <SelectItem key={ward.id} value={ward.id}>
                                    {ward.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div >

            {/* Main Tabs */}
            < div className="mb-4" >
                <DynamicTabs
                    defaultTab={mainTab}
                    tabs={[
                        { label: wardStoreDict.mainTabs.wardStockSection, key: "Ward Stock" },
                        { label: wardStoreDict.mainTabs.consumptionLogSection, key: "Consumption Log" },
                        { label: wardStoreDict.mainTabs.equipmentUsageSection, key: "Equipment Usage Logs" },
                    ]}
                    onChange={setMainTab}
                />
            </div >

            {mainTab === "Ward Stock" && <WardStockSection />}
            {mainTab === "Consumption Log" && <ConsumptionLogSection />}
            {mainTab === "Equipment Usage Logs" && <EquipmentUsageSection />}
        </div >
    );
}