"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDictionary } from "@/i18n/use-dictionary";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { ConsumptionStock } from "./ConsumptionStock";
import { EquipmentStock } from "./EquipmentStock";
import { StockActivityLog } from "./StockActivityLog";
import { EquipmentDetailView } from "./EquipmentDetailView";
import { WardStockItem } from "./ConsumptionStock";

import { createWardApiClient } from "@/lib/api/surgery/ward";

export function WardStockSection() {
    const dict = useDictionary();
    const router = useRouter();
    const params = useParams();
    const lang = params.lang as string;
    const [subTab, setSubTab] = useState("Consumption Stock");
    const [search, setSearch] = useState("");
    const [viewedItem, setViewedItem] = useState<WardStockItem | null>(null);

    const wardApi = createWardApiClient({});

    const { data: stockResponse, isLoading, refetch } = useQuery({
        queryKey: ["ward-stock", subTab, search],
        queryFn: async () => {
            const categoryFilter =
                subTab === "Consumption Stock"
                    ? "Consumables"
                    : subTab === "Equipment Stock"
                        ? "Equipment"
                        : undefined;

            const response = await wardApi.getWardStock({
                category: categoryFilter,
                search: search || undefined,
            });
            return response.data;
        },
    });

    return (
        <>
            {/* Actions Bar */}
            {!viewedItem && (
                <div className="rounded-xl mb-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <DynamicTabs
                                defaultTab={subTab}
                                tabs={[
                                    { label: dict.pages.surgery.wardStore.subTabs.consumptionStock, key: "Consumption Stock" },
                                    { label: dict.pages.surgery.wardStore.subTabs.equipmentStock, key: "Equipment Stock" },
                                ]}
                                onChange={setSubTab}
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
                                name={dict.pages.surgery.wardStore.actions.addRequestStock}
                                handleClick={() => router.push(`/${lang}/surgery/ward-store/stock-requests`)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {viewedItem ? (
                viewedItem.category === "Equipment" ? (
                    <EquipmentDetailView
                        item={viewedItem}
                        onBack={() => setViewedItem(null)}
                    />
                ) : (
                    <StockActivityLog
                        item={viewedItem}
                        onBack={() => setViewedItem(null)}
                    />
                )
            ) : (
                <>
                    {subTab === "Consumption Stock" && (
                        <ConsumptionStock
                            data={stockResponse?.data}
                            isLoading={isLoading}
                            onViewItem={setViewedItem}
                        />
                    )}
                    {subTab === "Equipment Stock" && (
                        <EquipmentStock
                            data={stockResponse?.data}
                            isLoading={isLoading}
                            onViewItem={setViewedItem}
                        />
                    )}
                </>
            )}
        </>
    );
}
