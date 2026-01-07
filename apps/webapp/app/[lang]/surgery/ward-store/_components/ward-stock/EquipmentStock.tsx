"use client";

import React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { WardStockItem } from "./ConsumptionStock";
import ActionMenu from "@/components/common/action-menu";

import { WardStock } from "@/lib/api/surgery/ward";

interface EquipmentStockProps {
    data?: WardStock[];
    isLoading: boolean;
}

export const EquipmentStock = ({ data, isLoading }: EquipmentStockProps) => {
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
                <ActionMenu actions={[
                    {
                        label: "View",
                    },
                    {
                        label: "Edit",
                    },
                    {
                        label: "Delete",
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
