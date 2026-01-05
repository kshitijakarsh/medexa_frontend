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

// --- Mock Data ---
const CONSUMPTION_LOG_DATA: ConsumptionLogItem[] = [
    {
        id: "1",
        date: "2024-12-03 14:30",
        itemName: "Injection",
        quantity: 1,
        usageType: "Patient",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        note: "IV Cannula Insertion",
    },
    {
        id: "2",
        date: "2024-12-03 14:30",
        itemName: "Sanitizer Use",
        quantity: 100,
        usageType: "Ward",
        loggedBy: "Nurse Fatima",
        note: "Nurse Hand Cleaning",
    },
    {
        id: "3",
        date: "2024-12-03 14:30",
        itemName: "Injection",
        quantity: 1,
        usageType: "Ward",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        note: "IV Cannula Insertion",
    },
    {
        id: "4",
        date: "2024-12-03 14:30",
        itemName: "Sanitizer Use",
        quantity: 100,
        usageType: "Ward",
        loggedBy: "Nurse Fatima",
        note: "Nurse Hand Cleaning",
    },
    {
        id: "5",
        date: "2024-12-03 14:30",
        itemName: "Injection",
        quantity: 1,
        usageType: "Ward",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        note: "IV Cannula Insertion",
    },
    {
        id: "6",
        date: "2024-12-03 14:30",
        itemName: "Injection",
        quantity: 1,
        usageType: "Ward",
        patient: {
            name: "Ganguli Rathod",
            mrn: "1222",
        },
        loggedBy: "Nurse Fatima",
        note: "IV Cannula Insertion",
    },
    {
        id: "7",
        date: "2024-12-03 14:30",
        itemName: "Sanitizer Use",
        quantity: 100,
        usageType: "Ward",
        loggedBy: "Nurse Fatima",
        note: "Nurse Hand Cleaning",
    },
    {
        id: "8",
        date: "2024-12-03 14:30",
        itemName: "Sanitizer Use",
        quantity: 100,
        usageType: "Ward",
        loggedBy: "Nurse Fatima",
        note: "Nurse Hand Cleaning",
    },
];

import { ConsumptionLog as ConsumptionLogType } from "@/lib/api/surgery/ward";

export const ConsumptionLog = ({
    data,
    isLoading,
}: {
    data?: ConsumptionLogType[];
    isLoading: boolean;
}) => {
    // Map API data (snake_case) to table display format
    const tableData: ConsumptionLogItem[] = React.useMemo(() => {
        if (!data) return [];
        return data.map((log) => ({
            id: log.id,
            date: log.date,
            itemName: log.item_name,
            quantity: log.quantity,
            usageType: log.usage_type,
            patient: log.patient
                ? {
                    name: `${log.patient.first_name} ${log.patient.last_name}`,
                    mrn: log.patient.mrn || "N/A",
                }
                : undefined,
            loggedBy: log.logged_by
                ? `${log.logged_by.first_name} ${log.logged_by.last_name}`
                : "Unknown",
            note: log.note || "-",
        }));
    }, [data]);

    const columns = [
        {
            key: "date",
            label: "Date",
        },
        {
            key: "itemName",
            label: "Item Name",
        },
        {
            key: "quantity",
            label: "Quantity",
        },
        {
            key: "usageType",
            label: "Usage Type",
        },
        {
            key: "patient",
            label: "Patient",
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
            label: "Logged By",
        },
        {
            key: "note",
            label: "Note",
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
