"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MoreVertical, SlidersHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import ActionMenu from "@/components/common/action-menu";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useDictionary } from "@/i18n/use-dictionary";
import { RequestStockModal } from "../_components/ward-stock/RequestStockModal";

export type StockRequestStatus = "Issued" | "Pending" | "Approved" | "Rejected" | "Partially Approved";

export type StockRequest = {
    id: string;
    requestId: string;
    itemName: string;
    quantity: number;
    requestedDate: string;
    requestedBy: string;
    status: StockRequestStatus;
    storeRemarks: string;
};

import { createWardApiClient, StockRequest as StockRequestType } from "@/lib/api/surgery/ward";
import { useQuery } from "@tanstack/react-query";

export default function StockRequestsPage() {
    const dict = useDictionary();
    const { lang } = useParams();
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("Stock Requests");
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const wardApi = createWardApiClient({});

    const { data: stockRequestsResponse, isLoading, refetch } = useQuery({
        queryKey: ["stock-requests", statusFilter, search],
        queryFn: async () => {
            const status = statusFilter === "Stock Requests" ? undefined : statusFilter;
            const response = await wardApi.getStockRequests({
                status,
                search: search || undefined,
            });
            return response.data;
        },
    });

    const tableData: StockRequest[] = React.useMemo(() => {
        if (!stockRequestsResponse?.data) return [];
        return (stockRequestsResponse.data as StockRequestType[]).map((req) => ({
            id: req.id,
            requestId: req.request_id,
            itemName: req.item_name,
            quantity: req.quantity,
            requestedDate: req.requested_date,
            requestedBy: req.requested_by
                ? `${req.requested_by.first_name} ${req.requested_by.last_name}`
                : "Unknown",
            status: req.status,
            storeRemarks: req.store_remarks || "—",
        }));
    }, [stockRequestsResponse]);

    const handleAddRequest = (data: any) => {
        console.log("Saving request:", data);
        // Here you would typically call an API
    };

    interface Column<T> {
        key: keyof T | string;
        label: string;
        render?: (row: T) => React.ReactNode;
        className?: string;
    }

    const columns: Column<StockRequest>[] = [
        {
            key: "requestId",
            label: dict.pages.surgery.wardStore.stockRequests.table.requestId
        },
        {
            key: "itemName",
            label: dict.pages.surgery.wardStore.stockRequests.table.itemName
        },
        {
            key: "quantity",
            label: dict.pages.surgery.wardStore.stockRequests.table.quantity
        },
        {
            key: "requestedDate",
            label: dict.pages.surgery.wardStore.stockRequests.table.requestedDate
        },
        {
            key: "requestedBy",
            label: dict.pages.surgery.wardStore.stockRequests.table.requestedBy
        },
        {
            key: "status",
            label: dict.pages.surgery.wardStore.stockRequests.table.status,
            render: (row) => {
                let badgeClass = "";
                let label = "";
                switch (row.status) {
                    case "Issued":
                        badgeClass = "bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] hover:bg-[#EEFBF3]";
                        label = dict.pages.surgery.wardStore.stockRequests.tabs.issued;
                        break;
                    case "Pending":
                        badgeClass = "bg-[#FFF6E9] text-[#FBAD37] border-[#FFE7C8] hover:bg-[#FFF6E9]";
                        label = dict.pages.surgery.wardStore.stockRequests.tabs.pending;
                        break;
                    case "Approved":
                        badgeClass = "bg-[#EEFBF3] text-[#34C759] border-[#D1F2DE] hover:bg-[#EEFBF3]";
                        label = dict.pages.surgery.wardStore.stockRequests.tabs.approved;
                        break;
                    case "Partially Approved":
                        badgeClass = "bg-[#EBF5FF] text-[#007AFF] border-[#CDE5FF] hover:bg-[#EBF5FF]";
                        label = dict.pages.surgery.wardStore.stockRequests.tabs.partiallyApproved;
                        break;
                    case "Rejected":
                        badgeClass = "bg-[#FFF2F2] text-[#FF3B30] border-[#FFDADA] hover:bg-[#FFF2F2]";
                        label = dict.pages.surgery.wardStore.stockRequests.tabs.rejected;
                        break;
                }
                return (
                    <Badge variant="outline" className={`${badgeClass} font-normal px-4 py-1.5 rounded-full whitespace-nowrap text-xs`}>
                        {label}
                    </Badge>
                );
            },
        },
        {
            key: "storeRemarks",
            label: dict.pages.surgery.wardStore.stockRequests.table.storeRemarks
        },
        {
            key: "action",
            label: dict.pages.surgery.wardStore.stockRequests.table.action,
            render: (row) => (
                <ActionMenu actions={[
                    {
                        label: "View",
                        onClick: () => {
                            router.push(`/${lang}/surgery/ot-setting/teams/${row.id}`);
                        }
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
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-lg font-medium text-slate-900">{dict.pages.surgery.wardStore.stockRequests.title}</h1>
            </div>

            {/* Actions Bar */}
            <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center">
                        <DynamicTabs
                            defaultTab={statusFilter}
                            tabs={[
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.all, key: "Stock Requests" },
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.issued, key: "Issued" },
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.pending, key: "Pending" },
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.approved, key: "Approved" },
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.rejected, key: "Rejected" },
                                { label: dict.pages.surgery.wardStore.stockRequests.tabs.partiallyApproved, key: "Partially Approved" },
                            ]}
                            onChange={setStatusFilter}
                        />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <FilterButton onClick={() => refetch()} />
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder={dict.common?.search || "Search"}
                            className="rounded-lg bg-white border-slate-200"
                        />
                        <NewButton
                            name={dict.pages.surgery.wardStore.stockRequests.addRequest}
                            handleClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="">
                <ResponsiveDataTable
                    columns={columns}
                    data={tableData}
                    striped
                    loading={isLoading}
                />
            </div>

            <RequestStockModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleAddRequest}
            />
        </div>
    );
}
