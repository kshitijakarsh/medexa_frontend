"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import ActionMenu from "@/components/common/action-menu";

// --- Types ---
export type WardStockItem = {
    id: string;
    itemName: string;
    category: "Consumables" | "Equipment";
    currentQty: number;
    minQty: number;
    store: string;
    expiry: string;
    status: "Available" | "Low Stock" | "Out Of Stock";
};

// --- Mock Data ---
const WARD_STOCK_DATA: WardStockItem[] = [
    {
        id: "1",
        itemName: "Surgical Gloves (M)",
        category: "Consumables",
        currentQty: 45,
        minQty: 20,
        store: "Pharmacy 4",
        expiry: "2025-09-27 19:30",
        status: "Low Stock",
    },
    {
        id: "2",
        itemName: "Surgical Gloves (M)",
        category: "Equipment",
        currentQty: 45,
        minQty: 10,
        store: "Store 2",
        expiry: "2025-09-27 19:30",
        status: "Low Stock",
    },
    {
        id: "3",
        itemName: "Surgical Gloves (M)",
        category: "Equipment",
        currentQty: 5,
        minQty: 2,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Available",
    },
    {
        id: "4",
        itemName: "Surgical Gloves (M)",
        category: "Consumables",
        currentQty: 45,
        minQty: 50,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Available",
    },
    {
        id: "5",
        itemName: "Surgical Gloves (M)",
        category: "Equipment",
        currentQty: 45,
        minQty: 50,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Available",
    },
    {
        id: "6",
        itemName: "Surgical Gloves (M)",
        category: "Consumables",
        currentQty: 45,
        minQty: 50,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Available",
    },
    {
        id: "7",
        itemName: "Surgical Gloves (M)",
        category: "Consumables",
        currentQty: 45,
        minQty: 50,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Out Of Stock",
    },
    {
        id: "8",
        itemName: "Surgical Gloves (M)",
        category: "Consumables",
        currentQty: 45,
        minQty: 50,
        store: "Pharmacy 1",
        expiry: "2025-09-27 19:30",
        status: "Available",
    },
];

export const ConsumptionStock = () => {
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
            label: "Minimum Qty",
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
                        badgeClass = "bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] hover:bg-[#EEFBF3]";
                        break;
                    case "Low Stock":
                        badgeClass = "bg-[#FFF6E9] text-[#FBAD37] border-[#FFE7C8] hover:bg-[#FFF6E9]";
                        break;
                    case "Out Of Stock":
                        badgeClass = "bg-[#FFF2F2] text-[#FF3B30] border-[#FFDADA] hover:bg-[#FFF2F2]";
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-4 py-1.5 rounded-full whitespace-nowrap text-xs`}>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            key: "action",
            label: "Action",
            render: () => (
                <ActionMenu actions={[
                    {
                        label: "View",
                        // onClick: () => {
                        //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
                        // }
                    },
                    {
                        label: "Edit",
                        // onClick: () => {
                        //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
                        // }
                    },
                    {
                        label: "Delete",
                        // onClick: () => {
                        //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
                        // }
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />

            ),
        },
    ];

    return (
        <div className="flex flex-col h-full mt-2">
            <ResponsiveDataTable
                columns={columns}
                data={WARD_STOCK_DATA}
                striped
            />
        </div>
    );
};

