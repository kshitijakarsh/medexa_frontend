"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { WardStockItem } from "./ConsumptionStock";

// --- Mock Data ---
const EQUIPMENT_STOCK_DATA: WardStockItem[] = [
    {
        id: "e1",
        itemName: "Vital Signs Monitor",
        category: "Equipment",
        currentQty: 5,
        minQty: 2,
        store: "Main Store",
        expiry: "N/A",
        status: "Available",
    },
    {
        id: "e2",
        itemName: "Defibrillator",
        category: "Equipment",
        currentQty: 2,
        minQty: 1,
        store: "Main Store",
        expiry: "2026-01-01 12:00",
        status: "Low Stock",
    },
    {
        id: "e3",
        itemName: "Surgical Laser",
        category: "Equipment",
        currentQty: 0,
        minQty: 1,
        store: "Main Store",
        expiry: "N/A",
        status: "Out Of Stock",
    },
];

export const EquipmentStock = () => {
    const columns = [
        {
            key: "itemName",
            label: "Item Name",
        },
        {
            key: "category",
            label: "Category",
        },
        {
            key: "currentQty",
            label: "Current Qty",
        },
        {
            key: "minQty",
            label: "Available",
        },
        {
            key: "store",
            label: "Store",
        },
        {
            key: "expiry",
            label: "Expiry",
        },
        {
            key: "status",
            label: "Status",
            render: (row: WardStockItem) => {
                let badgeClass = "";
                switch (row.status) {
                    case "Available":
                        badgeClass = "bg-green-50 text-green-600 border-green-100 hover:bg-green-100";
                        break;
                    case "Low Stock":
                        badgeClass = "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100";
                        break;
                    case "Out Of Stock":
                        badgeClass = "bg-red-50 text-red-600 border-red-100 hover:bg-red-100";
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-3 py-1 rounded-full whitespace-nowrap`}>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            key: "action",
            label: "Action",
            render: () => (
                <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 text-blue-500 text-sm font-medium">
                        Action
                        <MoreVertical size={14} className="text-green-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Data Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <ResponsiveDataTable
                        columns={columns}
                        data={EQUIPMENT_STOCK_DATA}
                        striped
                    />
                </div>
            </div>
        </div>
    );
};
