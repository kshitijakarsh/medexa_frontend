"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { cn } from "@workspace/ui/lib/utils";
import { EquipmentUsageLog } from "@/lib/api/surgery/ward";
import ActionMenu from "@/components/common/action-menu";
import { useDictionary } from "@/i18n/use-dictionary";

// --- Types ---
export type EquipmentUsageItem = {
    id: string;
    equipmentName: string;
    assetId: string;
    patient: {
        name: string;
        mrn: string;
    };
    loggedBy: string;
    startTime: string;
    endTime: string;
    duration: string;
    status: "Running" | "Completed";
};


export const EquipmentUsageLogs = ({
    data,
    isLoading,
    onEdit,
    onDelete,
}: {
    data?: EquipmentUsageLog[];
    isLoading: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}) => {
    const dict = useDictionary();
    const wardStoreDict = dict.pages.surgery.wardStore;
    const commonDict = dict.pages.surgery.common;

    const tableData: EquipmentUsageItem[] = React.useMemo(() => {
        if (!data) return [];
        return data.map((log) => ({
            id: log.id,
            equipmentName: log.item_name,
            assetId: log.asset_id,
            patient: {
                name: log.patient ? `${log.patient.first_name} ${log.patient.last_name}` : "Unknown Patient",
                mrn: log.patient?.mrn || "N/A",
            },
            loggedBy: log.logged_by ? `${log.logged_by.first_name} ${log.logged_by.last_name}` : "Unknown",
            startTime: log.start_time,
            endTime: log.end_time || wardStoreDict.columns.running,
            duration: log.duration || "-",
            status: log.status,
        }));
    }, [data, wardStoreDict]);

    const columns = [
        {
            key: "equipmentName",
            label: wardStoreDict.columns.equipmentName,
        },
        {
            key: "assetId",
            label: wardStoreDict.columns.assetId,
        },
        {
            key: "patient",
            label: wardStoreDict.columns.patient,
            render: (row: EquipmentUsageItem) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-700">{row.patient.name}</span>
                    <span className="text-xs text-slate-400 font-normal">MRN -{row.patient.mrn}</span>
                </div>
            ),
        },
        {
            key: "loggedBy",
            label: wardStoreDict.columns.loggedBy,
        },
        {
            key: "time",
            label: wardStoreDict.columns.timeRange,
            render: (row: EquipmentUsageItem) => (
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <span>{row.startTime}</span>
                    <span>→</span>
                    <span className={cn(row.endTime === wardStoreDict.columns.running ? "text-green-500" : "")}>
                        {row.endTime}
                    </span>
                </div>
            ),
        },
        {
            key: "duration",
            label: wardStoreDict.columns.duration,
        },
        {
            key: "status",
            label: wardStoreDict.columns.status,
            render: (row: EquipmentUsageItem) => (
                <div
                    className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        row.status === "Running"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                    )}
                >
                    {row.status === "Running" ? wardStoreDict.statuses.running : wardStoreDict.statuses.completed}
                </div>
            ),
        },
        {
            key: "action",
            label: wardStoreDict.columns.action,
            render: (row: EquipmentUsageItem) => (
                <ActionMenu actions={[
                    {
                        label: wardStoreDict.actions.view,
                    },
                    {
                        label: wardStoreDict.actions.edit,
                        onClick: () => {
                            if (onEdit) onEdit(row.id);
                        }
                    },
                    {
                        label: wardStoreDict.actions.delete,
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
