

// /app/charges/page.tsx
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import FilterDialog from "./_components/FilterDialog";
import AddSingleDialog from "./_components/AddSingleDialog";
import AddBulkDialog from "./_components/AddBulkDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { fetchUnits, fetchTaxes, fetchCategories, fetchServices, deleteById, updateStatus } from "./_components/api";
import { PageHeader } from "@/components/common/page-header";
import { useRouter } from "next/navigation";
import ChargesRowActions from "./_components/ChargesRowActions";
import TabSwitcher from "@/components/common/tab-switcher-menu";
import { QuickActions } from "./_components/QuickActions";
import FilterButton from "@/components/common/filter-button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { useUserStore } from "@/store/useUserStore";
import { PERMISSIONS } from "@/app/utils/permissions";
import { Can } from "@/components/common/app-can";


const ChargesSection = [
  { key: "service", label: "Service and Charge" },
  { key: "category", label: "Charges Category" },
  { key: "tax", label: "Tax Category" },
  { key: "unit", label: "Unit Type" },
];
const PERMISSION_MAP = {
  service: PERMISSIONS.SERVICE,
  category: PERMISSIONS.CATEGORY,
  tax: PERMISSIONS.TAX,
  unit: PERMISSIONS.UNIT,
};



export default function ChargesPage() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  const router = useRouter();
  const [tab, setTab] = useState<"service" | "category" | "tax" | "unit">("service");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  /* -------------------- Filters -------------------- */
  const [filters, setFilters] = useState<any>({});
  useEffect(() => { load(); }, [tab]);

  const load = async () => {
    setLoading(true);
    if (tab === "service") {
      const s = await fetchServices();
      setData(s);
    } else if (tab === "category") {
      const c = await fetchCategories();
      setData(c);
    } else if (tab === "tax") {
      const t = await fetchTaxes();
      setData(t);
    } else {
      const u = await fetchUnits();
      setData(u);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await deleteById(tab === "unit" ? "unit" : tab === "tax" ? "tax" : tab === "category" ? "category" : "service", id);
    load();
  };

  const toggleStatus = async (id: number, status: "Active" | "Inactive") => {
    await updateStatus(tab === "unit" ? "unit" : tab === "tax" ? "tax" : tab === "category" ? "category" : "service", id, status);
    load();
  };

  const columnsFor = (t: typeof tab) => {
    if (t === "service") {
      return [
        { key: "sno", label: "Sr.No", render: (r: any) => r.sno, className: "w-[60px] text-center" },
        { key: "serviceName", label: "Service Name", render: (r: any) => r.serviceName },
        { key: "chargeCategory", label: "Charge Category", render: (r: any) => r.chargeCategoryLabel || r.chargeCategory },
        { key: "unit", label: "Unit", render: (r: any) => r.unitLabel || r.unit },
        { key: "tax", label: "Tax", render: (r: any) => r.taxLabel || r.tax || "" },
        { key: "standardCharge", label: "Standard Charge", render: (r: any) => r.standardCharge },
        { key: "status", label: "Service Status", render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span> },
        { key: "action", label: "Action", render: (r: any) => <ChargesRowActions onEdit={() => console.log("edit", r)} onView={() => router.push(`/administration/charges/${r.id}`)} onDelete={() => handleDelete(r.id)} userPermissions={userPermissions} mode={tab}/> , className: "text-center w-[80px]" },
      ];
    }
   
    if (t === "tax") {
      // category / tax / unit table
      return [
        { key: "sno", label: "Sr.No", render: (r: any) => r.sno, className: "w-[60px] text-center" },
        { key: "name", label:  t === "tax" ? "Tax Name" : "Charge Name", render: (r: any) => (t === "tax" ? r.taxName : r.chargeName) },
        { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
        { key: "percentage", label: "Percentage(%)", render: (r: any) => (t === "tax" ? `${r.percentage}%` : "") },
        { key: "status", label: "Service Status", render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span> },
        { key: "action", label: "Action", render: (r: any) => <ChargesRowActions onEdit={() => console.log("edit", r)} onDelete={() => handleDelete(r.id)} userPermissions={userPermissions} mode={tab}/>, className: "text-center w-[80px]" },
      ];
    }
    if (t === "category") {
      // category / tax / unit table
      return [
        { key: "sno", label: "Sr.No", render: (r: any) => r.sno, className: "w-[60px] text-center" },
        { key: "name", label:  "Charge Name", render: (r: any) => ( r.chargeName) },
        { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
        // { key: "percentage", label: "Percentage(%)", render: (r: any) => (t === "tax" ? `${r.percentage}%` : "") },
        { key: "status", label: "Service Status", render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span> },
        { key: "action", label: "Action", render: (r: any) => <ChargesRowActions onEdit={() => console.log("edit", r)} onDelete={() => handleDelete(r.id)} userPermissions={userPermissions} mode={tab}/>, className: "text-center w-[80px]" },
      ];
    }
    //  if (t === "unit") {
      // category / tax / unit table
      return [
        { key: "sno", label: "Sr.No", render: (r: any) => r.sno, className: "w-[60px] text-center" },
        { key: "name", label: t === "unit" ? "Unit Type" : t === "tax" ? "Tax Name" : "Charge Name", render: (r: any) => (t === "unit" ? r.unit : t === "tax" ? r.taxName : r.chargeName) },
        { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
        // { key: "percentage", label: "Percentage(%)", render: (r: any) => (t === "tax" ? `${r.percentage}%` : "") },
        { key: "status", label: "Service Status", render: (r: any) => <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>{r.status}</span> },
        { key: "action", label: "Action", render: (r: any) => <ChargesRowActions onEdit={() => console.log("edit", r)} onDelete={() => handleDelete(r.id)} userPermissions={userPermissions} mode={tab}/>, className: "text-center w-[80px]" },
      ];
    // }
  };

  const onApplyFilters = (f: any) => {
    // simple client-side filter demo
    setLoading(true);
    fetchFiltered(f);
  };

  const fetchFiltered = async (f: any) => {
    let all: any[] = [];
    if (tab === "service") all = await fetchServices();
    if (tab === "category") all = await fetchCategories();
    if (tab === "tax") all = await fetchTaxes();
    if (tab === "unit") all = await fetchUnits();

    let filtered = all;
    if (f.name) filtered = filtered.filter((x: any) => JSON.stringify(x).toLowerCase().includes((f.name as string).toLowerCase()));
    if (f.status) filtered = filtered.filter((x: any) => x.status === f.status);
    if (f.date) filtered = filtered.filter((x: any) => (x.createdOn || "").startsWith(f.date));
    setData(filtered);
    setLoading(false);
  };


  const permissionStrings =
    (userPermissions?.map((p: any) => typeof p === "string" ? p : p.name) ?? []);

  const filteredTabs = ChargesSection.filter((t) => {
    const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP];
    return perm?.VIEW ? permissionStrings.includes(perm.VIEW) : false;
  });


  return (
    < >
      <div className="p-5 space-y-8">
        <div className="flex justify-between items-center">
          <PageHeader title="Charges" />

        </div>
        {/* <div className="bg-white p-5 rounded-md shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={() => setTab("service")} className={`px-3 py-1 rounded-full ${tab === "service" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Service and Charge</Button>
            <Button onClick={() => setTab("category")} className={`px-3 py-1 rounded-full ${tab === "category" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Charges Category</Button>
            <Button onClick={() => setTab("tax")} className={`px-3 py-1 rounded-full ${tab === "tax" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Tax Category</Button>
            <Button onClick={() => setTab("unit")} className={`px-3 py-1 rounded-full ${tab === "unit" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Unit Type</Button>
          </div>

          <div className="flex justify-end items-center gap-3 mb-4">
            <Button onClick={() => setIsFilterOpen(true)} variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700">
              <SlidersHorizontal /> Filter
            </Button>

            <div className="min-w-[220px]">
              <SearchInput value={search} onChange={(v: any) => setSearch(v)} placeholder="Search..." />
            </div>

            <QuickActionsMenu />

            {/* <div className="flex items-center gap-2">
              <label className="text-sm">Bulk</label>
              <input type="checkbox" checked={bulkMode} onChange={(e)=>setBulkMode(e.target.checked)} />
            </div> 

            <NewButton handleClick={() => { if (tab === "service") router.push("/administration/charges/add"); else if (bulkMode) setIsBulkOpen(true); else setIsAddOpen(true); }} />
          </div>

          <DataTable columns={columnsFor(tab)} data={data} loading={loading} striped />
        </div> */}
        <div className="bg-white p-5 rounded-md shadow-sm">

          {/* Tabs */}
          {/* <TabSwitcher
            className="mb-0"
            active={tab}
            onChange={(v) => setTab(v as any)}
            items={ChargesSection}
          /> */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <DynamicTabs
              tabs={filteredTabs}
              defaultTab="service"
              onChange={(tabKey) => setTab(tabKey as any)}
            />

            {/* Filters / Search / Actions */}
            <div className="flex justify-end items-center gap-3 mb-4">
              {/* <Button
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700"
            >
              <SlidersHorizontal /> Filter
            </Button> */}

              {/* <FilterButton onClick={() => setIsFilterOpen(true)} /> */}
              <FilterButton
                filters={filters}
                onClick={() => setIsFilterOpen(true)}
                onClear={() => setFilters({})}
              />


              <div className="min-w-[220px]">
                <SearchInput
                  value={search}
                  onChange={(v: any) => setSearch(v)}
                  placeholder="Search..."
                />
              </div>

              <QuickActions />
              <Can
                permission={PERMISSION_MAP[tab as keyof typeof PERMISSION_MAP]?.CREATE}
                userPermissions={userPermissions}
              >
                <NewButton
                  handleClick={() => {
                    if (tab === "service") router.push("/administration/charges/add");
                    else if (bulkMode) setIsBulkOpen(true);
                    else setIsAddOpen(true);
                  }}
                />
              </Can>
            </div>
          </div>
          {/* Table */}
          <ResponsiveDataTable columns={columnsFor(tab)} data={data} loading={loading} striped />

        </div>

      </div>

      <FilterDialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={onApplyFilters} />
      <AddSingleDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} mode={tab === "category" ? "category" : tab === "tax" ? "tax" : "unit"} onSaved={load} />
      <AddBulkDialog open={isBulkOpen} onClose={() => setIsBulkOpen(false)} mode={tab === "category" ? "category" : tab === "tax" ? "tax" : "unit"} onSaved={load} />
    </>
  );
}
