"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { cn } from "@workspace/ui/lib/utils";
import { EquipmentUsageLog } from "@/lib/api/surgery/ward";
import ActionMenu from "@/components/common/action-menu";

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

// --- Mock Data ---
const EQUIPMENT_USAGE_DATA: EquipmentUsageItem[] = [
    {
        id: "1",
        equipmentName: "Oxygen Cylinder",
        assetId: "Oxy-004",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        startTime: "Dec 1, 08:00 AM",
        endTime: "Running...",
        duration: "26h 0m",
        status: "Running",
    },
    {
        id: "2",
        equipmentName: "Oxygen Cylinder",
        assetId: "Oxy-004",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        startTime: "Dec 1, 08:00 AM",
        endTime: "Running...",
        duration: "26h 0m",
        status: "Running",
    },
    {
        id: "3",
        equipmentName: "Oxygen Cylinder",
        assetId: "Oxy-004",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        startTime: "Dec 1, 08:00 AM",
        endTime: "Dec 2, 10:00 AM",
        duration: "26h 0m",
        status: "Completed",
    },
    {
        id: "4",
        equipmentName: "Oxygen Cylinder",
        assetId: "Oxy-004",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        startTime: "Dec 1, 08:00 AM",
        endTime: "Dec 2, 10:00 AM",
        duration: "26h 0m",
        status: "Completed",
    },
    {
        id: "5",
        equipmentName: "Oxygen Cylinder",
        assetId: "Oxy-004",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        startTime: "Dec 1, 08:00 AM",
        endTime: "Dec 2, 10:00 AM",
        duration: "26h 0m",
        status: "Completed",
    },
];

export const EquipmentUsageLogs = ({
    data,
    isLoading,
}: {
    data?: EquipmentUsageLog[];
    isLoading: boolean;
}) => {
    const tableData: EquipmentUsageItem[] = React.useMemo(() => {
        if (!data) return [];
        return data.map((log) => ({
            id: log.id,
            equipmentName: log.equipment_name,
            assetId: log.asset_id,
            patient: {
                name: log.patient ? `${log.patient.first_name} ${log.patient.last_name}` : "Unknown Patient",
                mrn: log.patient?.mrn || "N/A",
            },
            loggedBy: log.logged_by ? `${log.logged_by.first_name} ${log.logged_by.last_name}` : "Unknown",
            startTime: log.start_time,
            endTime: log.end_time || "Running...",
            duration: log.duration || "-",
            status: log.status,
        }));
    }, [data]);

    const columns = [
        {
            key: "equipmentName",
            label: "Equipment Name",
        },
        {
            key: "assetId",
            label: "Asset Id",
        },
        {
            key: "patient",
            label: "Patient",
            render: (row: EquipmentUsageItem) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-700">{row.patient.name}</span>
                    <span className="text-xs text-slate-400 font-normal">MRN -{row.patient.mrn}</span>
                </div>
            ),
        },
        {
            key: "loggedBy",
            label: "Logged By",
        },
        {
            key: "time",
            label: "Start Time - End time",
            render: (row: EquipmentUsageItem) => (
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <span>{row.startTime}</span>
                    <span>→</span>
                    <span className={cn(row.endTime === "Running..." ? "text-green-500" : "")}>
                        {row.endTime}
                    </span>
                </div>
            ),
        },
        {
            key: "duration",
            label: "Duration",
        },
        {
            key: "status",
            label: "Status",
            render: (row: EquipmentUsageItem) => (
                <div
                    className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        row.status === "Running"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                    )}
                >
                    {row.status}
                </div>
            ),
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
                data={tableData}
                striped
                loading={isLoading}
            />
        </div>
    );
};
