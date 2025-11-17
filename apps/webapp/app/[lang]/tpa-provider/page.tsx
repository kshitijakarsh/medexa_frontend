"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { PageHeader } from "@/components/common/PageHeader";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { DataTable } from "@/components/common/data-table";
import { getMockProviders } from "./_components/api";
import { QuickActionsMenu } from "./_components/QuickActionsMenu";
import { RowActionMenu } from "./_components/RowActionMenu";
import { FilterDialog } from "./_components/FilterDialog";
import { useRouter } from "next/navigation";

export default function TpaProviderListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(getMockProviders());
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterApply = (filters: any) => {
    setIsFilterOpen(false);
    let filtered = getMockProviders();

    if (filters.providerName)
      filtered = filtered.filter((d) =>
        d.providerName
          .toLowerCase()
          .includes(filters.providerName.toLowerCase())
      );
    // if (filters.companyName)
    //   filtered = filtered.filter((d) =>
    //     d.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
    //   );
    // if (filters.city)
    //   filtered = filtered.filter((d) =>
    //     d.address.toLowerCase().includes(filters.city.toLowerCase())
    //   );
    if (filters.status)
      filtered = filtered.filter((d) => d.status === filters.status);

    setData(filtered);
  };

  const columns = [
    { key: "sr", label: "Sr.No", render: (r: any) => r.sr, className: "w-[70px]" },
    { key: "chartOfAccount", label: "Chart Of Account", render: (r: any) => r.chartOfAccount },
    { key: "providerName", label: "Provider Name", render: (r: any) => r.providerName },
    { key: "shortName", label: "Short Name", render: (r: any) => r.shortName },
    { key: "email", label: "Email", render: (r: any) => r.email },
    { key: "phone", label: "Phone", render: (r: any) => r.phone },
    {
      key: "status",
      label: "Status",
      render: (r: any) => (
        <span
          className={
            r.status === "Active" ? "text-green-600 font-medium" : "text-red-500 font-medium"
          }
        >
          {r.status}
        </span>
      ),
      className: "w-[90px] text-center",
    },
    {
      key: "action",
      label: "Action",
      className: "w-[70px] text-center",
      render: (r: any) => (
        <RowActionMenu
          onView={() => router.push(`/tpa-provider/${r.id}`)}
          onEdit={() => alert(`Edit ${r.providerName}`)}
          onDelete={() => setData((prev) => prev.filter((x) => x.id !== r.id))}
        />
      ),
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />
      <div className="p-5 space-y-6">
        <PageHeader title="TPA / Provider List" />

        <div className="bg-white rounded-md shadow-sm p-5 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {/* Tab or back button placeholder */}
              {/* <button className="px-3 py-1 bg-[#EAF3FF] text-[#1B4DB1] text-sm font-medium rounded-md">
                TPA / Provider List
              </button> */}
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>

              <div className="min-w-[220px]">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by Provider, Email or Phone..."
                />
              </div>

              <QuickActionsMenu />
              <NewButton handleClick={() => router.push("/tpa-provider/add")} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-md">
            <DataTable columns={columns} data={data} loading={loading} striped />
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
      />
    </main>
  );
}
