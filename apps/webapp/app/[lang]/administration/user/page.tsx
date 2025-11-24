// /app/.../EmployeeConfigurationPage.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { DataTable } from "@/components/common/data-table";
import { QuickActions } from "./_components/QuickActions";
import EmployeeRowActions from "./_components/EmployeeRowActions";
import FilterDialog from "./_components/FilterDialog";
import AddDialog from "./_components/AddDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { fetchUsers, fetchUserRoles, addUsers } from "./_components/api";
import { PageHeader } from "@/components/common/page-header";
import { useRouter } from "next/navigation";
import FilterButton from "@/components/common/filter-button";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";

export default function EmployeeConfigurationPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});
    const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        loadRoles();
        loadUsers();
    }, []);

    const loadRoles = async () => {
        const r = await fetchUserRoles();
        setRoleOptions(r);
    };

    const loadUsers = async () => {
        setLoading(true);
        fetchUsers().then((res: any) => {
            setData(res);
            setLoading(false);
        });
    };

    const getColumns = () => [
        {
            key: "sno",
            label: "S.No",
            render: (r: any) => <span>{r.sno}</span>,
            className: "text-center w-[60px]",
        },
        {
            key: "roleLabel",
            label: "Role",
            render: (r: any) => <span className="text-gray-800 font-medium">{r.roleLabel ?? r.role}</span>,
        },
        {
            key: "email",
            label: "Email",
            render: (r: any) => <span>{r.email}</span>,
        },
        {
            key: "phone",
            label: "Phone",
            render: (r: any) => <span>{r.phone}</span>,
        },
        {
            key: "status",
            label: "Status",
            render: (r: any) => (
                <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span>
            ),
            className: "w-[80px]",
        },
        {
            key: "createdOn",
            label: "Created On",
            render: (r: any) => r.createdOn,
            className: "w-[140px]",
        },
        {
            key: "addedBy",
            label: "Added By",
            render: (r: any) => r.addedBy,
            className: "max-w-[140px] min-w-[100px]",
        },
        {
            key: "action",
            label: "Action",
            render: (r: any) => (
                <EmployeeRowActions
                    onEdit={() => console.log("Edit", r)}
                    onView={() => console.log("View", r)}
                    onPermission={() => router.push(`/roles/permissions/${r.id}`)}
                    onDelete={() => {
                        // simple in-memory delete (for demo)
                        setData((prev) => prev.filter((x) => x.id !== r.id).map((u, idx) => ({ ...u, sno: idx + 1 })));
                    }}
                />
            ),
            className: "text-center w-[80px]",
        },
    ];

    const handleSave = (addedUsers: any[]) => {
        // addUsers already added them server-side (in mock), just refresh list
        loadUsers();
    };

    const handleApplyFilters = (f: any) => {
        setFilters(f);
        // Basic client-side filtering for demo:
        setLoading(true);
        fetchUsers().then((all: any[]) => {
            let filtered = all;
            if (f.role) filtered = filtered.filter((u) => u.role === f.role);
            if (f.email) filtered = filtered.filter((u) => u.email.includes(f.email));
            if (f.phone) filtered = filtered.filter((u) => u.phone.includes(f.phone));
            if (f.status) filtered = filtered.filter((u) => u.status === f.status);
            if (f.date) filtered = filtered.filter((u) => u.createdOn.startsWith(f.date));
            if (search) filtered = filtered.filter((u) => [u.email, u.phone, u.roleLabel, u.addedBy].join(" ").toLowerCase().includes(search.toLowerCase()));
            setData(filtered);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="p-5 space-y-8">
                <PageHeader title="User Management" />
                <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
                    <div className="flex justify-end">
                        <div className="flex flex-wrap items-center justify-end gap-3 w-full lg:w-auto">
                            {/* <Button onClick={() => setIsFilterDialogOpen(true)} variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filter</span>
                            </Button> */}
                            <FilterButton onClick={() => setIsFilterDialogOpen(true)} />

                            <div className="min-w-[200px] md:min-w-[200px]">
                                <SearchInput value={search} onChange={(v) => { setSearch(v); }} placeholder="Search by email, phone, role..." />
                            </div>

                            <QuickActions />

                            <NewButton handleClick={() => setIsAddDialogOpen(true)} />
                        </div>
                    </div>

                    <ResponsiveDataTable columns={getColumns()} data={data} loading={loading} striped />
                </div>
            </div>

            <AddDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSave={handleSave}
            />

            <FilterDialog
                open={isFilterDialogOpen}
                onClose={() => setIsFilterDialogOpen(false)}
                onApply={handleApplyFilters}
            />
        </>
    );
}
