"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, Plus } from "lucide-react";
import { Header } from "@/components/header";
import { PageHeader } from "@/components/common/page-header";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { DataTable } from "@/components/common/data-table";
import { getMockCompanies } from "./_components/api";
import { QuickActions } from "./_components/QuickActions";
import { InsuranceRowActionMenu } from "./_components/InsuranceRowActionMenu";
import { AddDialog } from "./_components/AddDialog";
import { FilterDialog } from "./_components/FilterDialog";
import { useRouter } from "next/navigation";
import FilterButton from "@/components/common/filter-button";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { PERMISSIONS } from "@/app/utils/permissions";
import { Can } from "@/components/common/app-can";
import { useUserStore } from "@/store/useUserStore";

export default function CompanyListPage() {
    const userPermissions = useUserStore((s) => s.user?.role.permissions);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => {
            setData(getMockCompanies());
            setLoading(false);
        }, 300);
        return () => clearTimeout(t);
    }, []);

    const applyFilters = (values: any) => {
        setFilters(values);
        setIsFilterOpen(false);
        // For demo: filter on company name
        if (!values?.companyName) {
            setData(getMockCompanies());
            return;
        }
        setData(getMockCompanies().filter((c) => c.companyName.toLowerCase().includes(values.companyName.toLowerCase())));
    };

    const handleSave = (values: any) => {
        // Add new company to table
        const newRow = {
            id: `CMP${Date.now()}`,
            providerName: values.providerName,
            companyName: values.companyName,
            approvalUrl: values.approvalUrl,
            address: values.address,
            trn: values.trn || "",
            status: values.active ? "Active" : "Inactive",
            createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
        };
        setData((p) => [newRow, ...p]);
        setIsAddOpen(false);
    };

    const columns = [
        { key: "sno", label: "Sr.No", render: (r: any) => r.sr, className: "w-[60px]" },
        { key: "providerName", label: "Provider Name", render: (r: any) => r.providerName },
        { key: "companyName", label: "Insurance Company Name", render: (r: any) => r.companyName },
        { key: "approvalUrl", label: "Approval URL", render: (r: any) => <a className="text-blue-600 underline" href={r.approvalUrl} target="_blank" rel="noreferrer">{r.approvalUrl}</a> },
        { key: "address", label: "Address", render: (r: any) => r.address },
        { key: "trn", label: "TRN", render: (r: any) => r.trn },
        { key: "status", label: "Status", render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span>, className: "w-[80px] text-center" },
        {
            key: "action",
            label: "Action",
            render: (r: any) => (
                <InsuranceRowActionMenu
                    onView={() => router.push(`/insurance/${r.id}`)}
                    onEdit={() => alert(`Edit ${r.companyName} (not implemented)`)}
                    onDelete={() => setData((p) => p.filter((x) => x.id !== r.id))}
                    userPermissions={userPermissions}
                />
            ),
            className: "w-[80px] text-center",
        },
    ];

    const handleNew = () => {
        router.push("/insurance/add");

    };


    return (
        <>
            <div className="p-5 space-y-6">
                <PageHeader title="Company List" />
                <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex gap-2 flex-wrap">
                            {/* Placeholder for tabs if needed */}
                        </div>

                        <div className="flex items-center gap-3 flex-1 justify-end">
                            {/* <button onClick={() => setIsFilterOpen(true)} className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm hover:bg-gray-50">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter
                            </button> */}

                            <FilterButton onClick={() => setIsFilterOpen(true)} />


                            <div className="min-w-[220px]">
                                <SearchInput value={search} onChange={setSearch} placeholder="Search by provider or company..." />
                            </div>

                            <QuickActions />

                            <div>
                                {/* <button onClick={() => setIsAddOpen(true)} className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600">
                  <Plus className="w-4 h-4" />
                  Add New
                </button> */}
                                <Can
                                    permission={PERMISSIONS.INSURANCE.CREATE}
                                    userPermissions={userPermissions}
                                >
                                    <NewButton handleClick={handleNew} />
                                </Can>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ResponsiveDataTable columns={columns} data={data} loading={loading} striped />
                    </div>
                </div>
            </div>

            {/* <AddDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleSave} /> */}
            <FilterDialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={applyFilters} />
        </>
    );
}
