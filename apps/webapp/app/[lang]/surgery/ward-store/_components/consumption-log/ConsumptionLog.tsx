"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import ActionMenu from "@/components/common/action-menu";

// --- Types ---
export type ConsumptionLogItem = {
    id: string;
    date: string;
    itemName: string;
    quantity: number;
    usageType: "Patient" | "Ward";
    patient?: {
        name: string;
        mrn: string;
    };
    loggedBy: string;
    note: string;
};

import { ConsumptionLog as ConsumptionLogType } from "@/lib/api/surgery/ward";

import { useDictionary } from "@/i18n/use-dictionary";

export const ConsumptionLog = ({
    data,
    isLoading,
    onEdit,
    onDelete,
}: {
    data?: ConsumptionLogType[];
    isLoading: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}) => {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const commonDict = dict.pages.surgery.common;

    // Map API data (snake_case) to table display format
    const tableData: ConsumptionLogItem[] = React.useMemo(() => {
        if (!data) return [];
        return data.map((log) => ({
            id: log.id,
            date: log.date || "-",
            itemName: log.item_name,
            quantity: log.quantity,
            usageType: (log.usage_type.charAt(0).toUpperCase() + log.usage_type.slice(1)) as "Patient" | "Ward",
            patient: log.patient
                ? {
                    name: `${log.patient.first_name} ${log.patient.last_name}`,
                    mrn: log.patient.mrn || "N/A",
                }
                : undefined,
            loggedBy: log.logged_by
                ? `${log.logged_by.first_name} ${log.logged_by.last_name}`
                : "Unknown",
            note: log.notes || "-",
        }));
    }, [data]);

    const columns = [
        {
            key: "date",
            label: dict.common.date,
        },
        {
            key: "itemName",
            label: wardStoreDict.columns.itemName,
        },
        {
            key: "quantity",
            label: dict.common.quantity,
        },
        {
            key: "usageType",
            label: wardStoreDict.columns.usageType,
        },
        {
            key: "patient",
            label: dict.table.patient,
            render: (row: ConsumptionLogItem) => {
                if (row.patient) {
                    return (
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-700">{row.patient.name}</span>
                            <span className="text-xs text-slate-400 font-normal">MRN -{row.patient.mrn}</span>
                        </div>
                    );
                }
                return <span className="text-slate-300">---</span>;
            },
        },
        {
            key: "loggedBy",
            label: dict.table.addedBy,
        },
        {
            key: "note",
            label: dict.common.note,
        },
        {
            key: "action",
            label: dict.table.action,
            render: (row: ConsumptionLogItem) => (
                <ActionMenu actions={[
                    {
                        label: dict.common.view,

                    },
                    {
                        label: dict.common.edit,
                        onClick: () => {
                            if (onEdit) onEdit(row.id);
                        }
                    },
                    {
                        label: dict.common.delete,
                        onClick: () => {
                            if (onDelete) onDelete(row.id);
                        }
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />
            ),
        },
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
