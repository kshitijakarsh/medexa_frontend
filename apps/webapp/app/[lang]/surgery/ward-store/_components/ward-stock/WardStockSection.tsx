"use client";

import { useState } from "react";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { SlidersHorizontal } from "lucide-react";
import { ConsumptionStock } from "./ConsumptionStock";
import { EquipmentStock } from "./EquipmentStock";

export function WardStockSection() {
    const [subTab, setSubTab] = useState("Consumption Stock");
    const [search, setSearch] = useState("");

    return (
        <>
            {/* Actions Bar */}
            <div className="rounded-xl mb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <DynamicTabs
                            defaultTab={subTab}
                            tabs={[
                                { label: "Consumption Stock", key: "Consumption Stock" },
                                { label: "Equipment Stock", key: "Equipment Stock" },
                            ]}
                            onChange={setSubTab}
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
                            name="Add Request Stock"
                            handleClick={() => console.log("Add Request Stock clicked")}
                        />
                    </div>
                </div>
            </div>

            {subTab === "Consumption Stock" && <ConsumptionStock />}
            {subTab === "Equipment Stock" && <EquipmentStock />}
        </>
    );
}
