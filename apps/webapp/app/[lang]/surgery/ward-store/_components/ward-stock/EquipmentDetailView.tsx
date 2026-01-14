"use client";

import React, { useState } from "react";
import { ChevronLeft, MoreVertical, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import SearchInput from "@/components/common/search-input";
import FilterButton from "@/components/common/filter-button";
import { WardStockItem } from "./ConsumptionStock";
import { useDictionary } from "@/i18n/use-dictionary";

interface EquipmentDetailViewProps {
    item: WardStockItem;
    onBack: () => void;
}

export const EquipmentDetailView = ({ item, onBack }: EquipmentDetailViewProps) => {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const detailDict = wardStoreDict.wardStock.equipmentDetail;
    const activityLogDict = wardStoreDict.wardStock.activityLog;
    const [search, setSearch] = useState("");

    const stats = [
        { label: detailDict.stats.totalEquipment, value: `75 items`, color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: detailDict.stats.available, value: `39 items`, color: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: detailDict.stats.inUse, value: `29 items`, color: "bg-green-50 text-green-600 border-green-100" },
        { label: detailDict.stats.maintenance, value: `7 items`, color: "bg-red-50 text-red-600 border-red-100" },
    ];

    const mockData = [
        {
            id: "1",
            equipmentName: "Oxygen Cylinders",
            category: "Breathing Support",
            totalItems: "15",
            available: "8",
            inUse: "5",
            maintenance: "2",
        },
        {
            id: "2",
            equipmentName: "Wheelchairs",
            category: "Mobility",
            totalItems: "12",
            available: "7",
            inUse: "4",
            maintenance: "1",
        },
    ];

    const columns = [
        {
            key: "equipmentName",
            label: wardStoreDict.columns.equipmentName,
        },
        {
            key: "category",
            label: wardStoreDict.columns.category,
        },
        {
            key: "totalItems",
            label: wardStoreDict.columns.totalItems,
        },
        {
            key: "available",
            label: wardStoreDict.columns.available,
        },
        {
            key: "inUse",
            label: wardStoreDict.columns.inUse,
        },
        {
            key: "maintenance",
            label: wardStoreDict.columns.maintenance,
        },
        {
            key: "action",
            label: wardStoreDict.columns.action,
            render: () => (
                <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
                    {wardStoreDict.columns.action} <MoreVertical size={14} />
                </button>
            )
        },
    ];

    return (
        <div className="flex flex-col space-y-6 text-[#1A1C1E]">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack} className="bg-blue-500 text-white rounded-md hover:bg-blue-600 w-9 h-9">
                    <ChevronLeft size={20} />
                </Button>
                <h1 className="text-xl font-semibold">{detailDict.title}</h1>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h2 className="text-lg font-bold text-slate-800">{item.itemName}</h2>
                        <Badge variant="outline" className="bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] font-normal px-4 py-1.5 rounded-full text-xs">
                            {wardStoreDict.statuses.available}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`${stat.color} p-4 rounded-xl border flex flex-col gap-1`}>
                                <span className="text-xs font-medium opacity-80">{stat.label}</span>
                                <span className="text-xl font-bold">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 ml-auto">
                    <FilterButton onClick={() => { }} className="bg-blue-500 text-white hover:none" />
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search..."
                        width="280px"
                        className="rounded-lg bg-white border-none"
                    />
                    <Button className="bg-[#34C759] hover:bg-[#2EB350] text-white flex items-center gap-2 h-10 px-4 text-sm font-medium rounded-lg">
                        {wardStoreDict.actions.addRequestStock} <Plus size={16} />
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden">
                <ResponsiveDataTable
                    columns={columns}
                    data={mockData}
                    striped
                />
            </div>
        </div>
    );
};
