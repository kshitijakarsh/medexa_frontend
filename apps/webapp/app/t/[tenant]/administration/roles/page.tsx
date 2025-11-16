"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { DataTable } from "@/components/common/data-table";
import { QuickActions } from "./_components/QuickActions";
import { EmployeeRowActions } from "./_components/EmployeeRowActions";
import { FilterDialog } from "./_components/FilterDialog";
import { AddDialog } from "./_components/AddDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { getMockEmployees } from "./_components/api";
import { PageHeader } from "@/components/common/PageHeader";
import { useRouter } from "next/navigation";

export default function EmployeeConfigurationPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setData(getMockEmployees("roles"));
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const getColumns = () => [
        {
            key: "sno",
            label: "S.No",
            render: (r: any) => <span>{r.sno}</span>,
            className: "text-center w-[60px]",
        },
        {
            key: "name",
            label: "User Role",
            render: (r: any) => <span className="text-gray-800 font-medium">{r.name}</span>,
        },
        {
            key: "status",
            label: "Billing Status",
            render: (r: any) => (
                <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>
                    {r.status}
                </span>
            ),
            className: "w-[80px]",
        },
        {
            key: "createdOn",
            label: "Created On",
            render: (r: any) => r.createdOn,
            className: "w-[80px]",
        },
        {
            key: "addedBy",
            label: "Added By",
            render: (r: any) => r.addedBy,
            className: "max-w-[100px] min-w-[80px]",
        },
        {
            key: "action",
            label: "Action",
            render: (r: any) => <EmployeeRowActions
                onEdit={() => console.log("Edit", r.name)}
                onView={() => console.log("View", r.name)}
                onPermission={() => router.push(`/roles/permissions/${r.id}`)}
                onDelete={() => console.log("Delete", r.name)}
            />,
            //   <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />,
            className: "text-center w-[80px]",
        },
    ];

    const handleSave = (values: any[]) => {
        const newEntries = values.map((v, idx) => ({
            id: data.length + idx + 1,
            name: v.name,
            status: v.active ? "Active" : "Inactive",
            createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
            addedBy: "Dr. Ahmed Al-Mansouri",
        }));
        setData((prev) => [...prev, ...newEntries]);
    };

    return (
        <>
            <div className="p-5 space-y-8">
                <PageHeader title="User Roles Configuration" />

                <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
                    {/* ✅ Right-aligned Top Controls */}
                    <div className="flex justify-end">
                        <div className="flex flex-wrap items-center justify-end gap-3 w-full lg:w-auto">
                            {/* Filter */}
                            <Button
                                onClick={() => setIsFilterDialogOpen(true)}
                                variant="outline"
                                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filter</span>
                            </Button>

                            {/* Search */}
                            <div className="min-w-[200px] md:min-w-[200px]">
                                <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
                            </div>

                            {/* Quick Actions */}
                            <QuickActions />

                            {/* Add New Button */}
                            <NewButton handleClick={() => setIsAddDialogOpen(true)} />
                        </div>
                    </div>

                    {/* Data Table */}
                    <DataTable columns={getColumns()} data={data} loading={loading} striped />
                </div>
            </div>

            {/* Add Dialog */}
            <AddDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                mode="roles"
                onSave={handleSave}
            />

            {/* Filter Dialog */}
            <FilterDialog
                open={isFilterDialogOpen}
                onClose={() => setIsFilterDialogOpen(false)}
                mode="roles"
                onApply={(values) => setFilters(values)}
                isLoading={false}
            />
        </>
    );
}
