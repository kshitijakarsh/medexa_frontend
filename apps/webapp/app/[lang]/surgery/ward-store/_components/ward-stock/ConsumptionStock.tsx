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

import { WardStock } from "@/lib/api/surgery/ward";

interface ConsumptionStockProps {
    data?: WardStock[];
    isLoading: boolean;
    onViewItem: (item: WardStockItem) => void;
}

import { useDictionary } from "@/i18n/use-dictionary";

export const ConsumptionStock = ({ data, isLoading, onViewItem }: ConsumptionStockProps) => {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;

    // Map API data (snake_case) to table display format
    const tableData: WardStockItem[] = React.useMemo(() => {
        if (!data) return [];
        return data.map((item) => ({
            id: item.id,
            itemName: item.item_name,
            category: item.category,
            currentQty: item.current_qty,
            minQty: item.min_qty,
            store: item.store || "—",
            expiry: item.expiry || "—",
            status: item.status,
        }));
    }, [data]);

    const columns = [
        {
            key: "itemName",
            label: wardStoreDict.columns.itemName,
        },
        {
            key: "category",
            label: wardStoreDict.columns.category,
        },
        {
            key: "currentQty",
            label: wardStoreDict.columns.currentQty,
        },
        {
            key: "minQty",
            label: wardStoreDict.columns.minQty,
        },
        {
            key: "store",
            label: wardStoreDict.columns.store,
        },
        {
            key: "expiry",
            label: wardStoreDict.columns.expiry,
        },
        {
            key: "status",
            label: wardStoreDict.columns.status,
            render: (row: WardStockItem) => {
                let badgeClass = "";
                let statusLabel: string = row.status;

                switch (row.status) {
                    case "Available":
                        badgeClass = "bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] hover:bg-[#EEFBF3]";
                        statusLabel = wardStoreDict.statuses.available;
                        break;
                    case "Low Stock":
                        badgeClass = "bg-[#FFF6E9] text-[#FBAD37] border-[#FFE7C8] hover:bg-[#FFF6E9]";
                        statusLabel = wardStoreDict.statuses.lowStock;
                        break;
                    case "Out Of Stock":
                        badgeClass = "bg-[#FFF2F2] text-[#FF3B30] border-[#FFDADA] hover:bg-[#FFF2F2]";
                        statusLabel = wardStoreDict.statuses.outOfStock;
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-4 py-1.5 rounded-full whitespace-nowrap text-xs`}>
                        {statusLabel}
                    </Badge>
                );
            },
        },
        {
            key: "action",
            label: wardStoreDict.columns.action,
            render: (row: WardStockItem) => (
                <ActionMenu actions={[
                    {
                        label: wardStoreDict.actions.view,
                        onClick: () => onViewItem(row)
                    },
                    {
                        label: wardStoreDict.actions.edit,
                    },
                    {
                        label: wardStoreDict.actions.delete,
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />

            ),
        }
    ];

    return (
        <div className="flex flex-col h-full mt-2">
            <ResponsiveDataTable
                columns={columns}
                data={tableData}
                striped
                loading={isLoading}
            />
        </div>
    );
};

