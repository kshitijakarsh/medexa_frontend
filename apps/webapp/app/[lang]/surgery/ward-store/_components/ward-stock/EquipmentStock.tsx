"use client";

import React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { WardStockItem } from "./ConsumptionStock";
import ActionMenu from "@/components/common/action-menu";

import { WardStock } from "@/lib/api/surgery/ward";
import { useDictionary } from "@/i18n/use-dictionary";

interface EquipmentStockProps {
    data?: WardStock[];
    isLoading: boolean;
    onViewItem: (item: WardStockItem) => void;
}

export const EquipmentStock = ({ data, isLoading, onViewItem }: EquipmentStockProps) => {
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
            label: wardStoreDict.columns.available,
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
                        badgeClass = "bg-green-50 text-green-600 border-green-100 hover:bg-green-100";
                        statusLabel = wardStoreDict.statuses.available;
                        break;
                    case "Low Stock":
                        badgeClass = "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100";
                        statusLabel = wardStoreDict.statuses.lowStock;
                        break;
                    case "Out Of Stock":
                        badgeClass = "bg-red-50 text-red-600 border-red-100 hover:bg-red-100";
                        statusLabel = wardStoreDict.statuses.outOfStock;
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-3 py-1 rounded-full whitespace-nowrap`}>
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
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Data Table */}
            <div className="">
                <div className="overflow-x-auto">
                    <ResponsiveDataTable
                        columns={columns}
                        data={tableData}
                        striped
                        loading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};
