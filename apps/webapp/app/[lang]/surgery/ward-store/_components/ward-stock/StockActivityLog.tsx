"use client";

import React, { useState } from "react";
import { ChevronLeft, MoreVertical, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import SearchInput from "@/components/common/search-input";
import FilterButton from "@/components/common/filter-button";
import { WardStockItem } from "./ConsumptionStock";
import { useDictionary } from "@/i18n/use-dictionary";

interface StockActivityLogProps {
    item: WardStockItem;
    onBack: () => void;
}

export const StockActivityLog = ({ item, onBack }: StockActivityLogProps) => {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const activityLogDict = wardStoreDict.wardStock.activityLog;
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");

    const stats = [
        { label: activityLogDict.stats.currentQuantity, value: `${item.currentQty} units`, color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: activityLogDict.stats.minimumQuantity, value: `${item.minQty} units`, color: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: activityLogDict.stats.totalReceived, value: `+237 units`, color: "bg-green-50 text-green-600 border-green-100" },
        { label: activityLogDict.stats.totalConsumed, value: `-76 units`, color: "bg-red-50 text-red-600 border-red-100" },
    ];

    const mockData = [
        {
            id: "1",
            dateTime: "2025-09-27 19:30",
            action: "Received",
            quantity: "+100",
            recordedBy: "Nurse Ameena K\nNurse",
            usageType: "---",
            notes: "Supplier delivery",
        },
        {
            id: "2",
            dateTime: "2025-09-27 19:30",
            action: "Damaged",
            quantity: "-50",
            recordedBy: "Nurse Ameena K\nNurse",
            usageType: "---",
            notes: "Package damaged during handling",
        },
        {
            id: "3",
            dateTime: "2025-09-27 19:30",
            action: "Consumption",
            quantity: "-1",
            recordedBy: "Nurse Ameena K\nNurse",
            usageType: "Patient • MRN-2501",
            notes: "Daily ward procedures",
        },
        {
            id: "4",
            dateTime: "2025-09-27 19:30",
            action: "Returned",
            quantity: "-10",
            recordedBy: "Nurse Ameena K\nNurse",
            usageType: "---",
            notes: "Unused from patient discharge",
        },
        {
            id: "5",
            dateTime: "2025-09-27 19:30",
            action: "Received",
            quantity: "100",
            recordedBy: "Nurse Ameena K\nNurse",
            usageType: "---",
            notes: "Monthly stock replenishment",
        },
    ];

    const columns = [
        {
            key: "dateTime",
            label: wardStoreDict.columns.dateTime,
        },
        {
            key: "action",
            label: wardStoreDict.columns.action,
            render: (row: any) => {
                let badgeClass = "";
                let actionLabel = row.action;

                switch (row.action) {
                    case "Received":
                        badgeClass = "bg-green-100 text-green-700 border-green-200 hover:bg-green-100";
                        actionLabel = activityLogDict.tabs.received;
                        break;
                    case "Damaged":
                        badgeClass = "bg-red-100 text-red-700 border-red-200 hover:bg-red-100";
                        actionLabel = activityLogDict.tabs.damaged;
                        break;
                    case "Consumption":
                        badgeClass = "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
                        actionLabel = activityLogDict.tabs.consumption;
                        break;
                    case "Returned":
                        badgeClass = "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100";
                        actionLabel = activityLogDict.tabs.returned;
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-4 py-1 rounded-full text-xs`}>
                        {actionLabel}
                    </Badge>
                );
            },
        },
        {
            key: "quantity",
            label: wardStoreDict.columns.quantity,
            render: (row: any) => (
                <span className={row.quantity.startsWith("+") ? "text-green-600" : row.quantity.startsWith("-") ? "text-red-600" : ""}>
                    {row.quantity}
                </span>
            )
        },
        {
            key: "recordedBy",
            label: wardStoreDict.columns.recordedBy,
            render: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.recordedBy.split("\n")[0]}</span>
                    <span className="text-xs text-slate-500">{row.recordedBy.split("\n")[1]}</span>
                </div>
            )
        },
        {
            key: "usageType",
            label: wardStoreDict.columns.usageType,
        },
        {
            key: "notes",
            label: wardStoreDict.columns.notes,
        },
        {
            key: "action",
            label: wardStoreDict.columns.action,
            render: () => (
                <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
                    Action <MoreVertical size={14} />
                </button>
            )
        },
    ];

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack} className="bg-blue-500 text-white rounded-md hover:bg-blue-600 w-9 h-9">
                    <ChevronLeft size={20} />
                </Button>
                <h1 className="text-xl font-semibold">{activityLogDict.title}</h1>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">{item.itemName}</h2>
                            <p className="text-sm text-slate-500">{item.category}</p>
                        </div>
                        <Badge variant="outline" className="bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] font-normal px-4 py-1.5 rounded-full text-xs">
                            {item.status}
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
                <DynamicTabs
                    defaultTab={activeTab}
                    tabs={[
                        { label: activityLogDict.tabs.all, key: "All" },
                        { label: activityLogDict.tabs.received, key: "Received" },
                        { label: activityLogDict.tabs.returned, key: "Returned" },
                        { label: activityLogDict.tabs.consumption, key: "Consumption" },
                        { label: activityLogDict.tabs.damaged, key: "Damaged" },
                    ]}
                    onChange={setActiveTab}
                />

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
                        {item.category === "Equipment" ? wardStoreDict.actions.addEquipmentUsage : wardStoreDict.actions.addConsumptionLog} <Plus size={16} />
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
