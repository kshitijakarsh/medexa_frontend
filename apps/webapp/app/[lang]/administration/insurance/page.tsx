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
import { useDictionary } from "@/i18n/use-dictionary";

export default function CompanyListPage() {
    const userPermissions = useUserStore((s) => s.user?.role.permissions);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});
    const dict = useDictionary();
    const trans = dict.pages.insurance;

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
        { key: "sno", label: trans.table.sno, render: (r: any) => r.sr, className: "w-[60px]" },
        { key: "providerName", label: trans.table.providerName, render: (r: any) => r.providerName },
        { key: "companyName", label: trans.table.insuranceCompanyName, render: (r: any) => r.companyName },
        { key: "approvalUrl", label: trans.table.approvalURL, render: (r: any) => <a className="text-blue-600 underline" href={r.approvalUrl} target="_blank" rel="noreferrer">{r.approvalUrl}</a> },
        { key: "address", label: trans.table.address, render: (r: any) => r.address },
        { key: "trn", label: trans.table.trn, render: (r: any) => r.trn },
        { key: "status", label: trans.table.status, render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span>, className: "w-[80px] text-center" },
        {
            key: "action",
            label: trans.table.action,
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
                <PageHeader title={trans.title} />
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
                                <SearchInput value={search} onChange={setSearch} placeholder={trans.table.placeholderSearch} />
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
