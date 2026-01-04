// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { SlidersHorizontal } from "lucide-react";

// import { Header } from "@/components/header";
// import { PageHeader } from "@/components/common/PageHeader";
// import { Button } from "@workspace/ui/components/button";
// import { DataTable } from "@/components/common/data-table";
// import SearchInput from "@/components/common/search-input";
// import NewButton from "@/components/common/new-button";
// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

// import { RowActionMenu } from "./_components/RowActionMenu";
// import { QuickActionsMenu } from "./_components/QuickActionsMenu";
// import { AddDialog } from "./_components/AddDialog";
// import { FilterDialog } from "./_components/FilterDialog";

// // Mock data generator
// function getMockOperations(mode: string) {
//     if (mode === "operation") {
//         return [
//             { sno: 1, name: "Facelift Surgery", category: "Plastic Surgery", status: "Active" },
//             { sno: 2, name: "Tooth Extraction", category: "ENT and Oral Surgery", status: "Active" },
//             { sno: 3, name: "Cataract Extraction", category: "Ophthalmology", status: "Active" },
//             { sno: 4, name: "Arthroscopic Surgery", category: "ENT and Oral Surgery", status: "Active" },
//             { sno: 5, name: "Coronary Artery Bypass", category: "Thoracic Surgery", status: "Active" },
//             { sno: 6, name: "Bronchoscopy", category: "Urology", status: "Active" },
//             { sno: 7, name: "Dilation and Curettage", category: "Gynaecology", status: "Active" },
//         ];
//     }

//     return [
//         { sno: 1, category: "General Surgery", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
//         { sno: 2, category: "Urology", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
//         { sno: 3, category: "ENT and Oral Surgery", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
//         { sno: 4, category: "Ophthalmology", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
//         { sno: 5, category: "Thoracic Surgery", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
//     ];
// }

// const operationTabs = [
//     { key: "operation", label: "Operation" },
//     { key: "operationCategory", label: "Operation Category" },
// ];

// export default function OperationManagementPage() {
//     const router = useRouter();
//     const [activeTab, setActiveTab] = useState<"operation" | "operationCategory">("operation");
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState<any[]>([]);
//     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//     const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//     const [filters, setFilters] = useState<any>({});

//     useEffect(() => {
//         setLoading(true);
//         const timer = setTimeout(() => {
//             setData(getMockOperations(activeTab));
//             setLoading(false);
//         }, 500);
//         return () => clearTimeout(timer);
//     }, [activeTab]);

//     // 🧾 Define table columns dynamically
//     const getColumns = () => {
//         if (activeTab === "operation") {
//             return [
//                 { key: "sno", label: "S.No", render: (r: any) => <span>{r.sno}</span>, className: "text-center w-[60px]" },
//                 { key: "name", label: "Operation Name", render: (r: any) => r.name },
//                 { key: "category", label: "Operation Category", render: (r: any) => r.category },
//                 {
//                     key: "status",
//                     label: "Operation Status",
//                     render: (r: any) => <span className="text-green-600">{r.status}</span>,
//                     className: "w-[120px]",
//                 },
//                 {
//                     key: "action",
//                     label: "Action",
//                     render: (r: any) => (
//                         <RowActionMenu
//                             onEdit={() => console.log("Edit operation:", r.name)}
//                             onView={() => { }}
//                             onDelete={() => console.log("Delete operation:", r.name)}
//                         />
//                     ),
//                     className: "text-center w-[80px]",
//                 },
//             ];
//         }

//         return [
//             { key: "sno", label: "S.No", render: (r: any) => <span>{r.sno}</span>, className: "text-center w-[60px]" },
//             { key: "category", label: "Operation Category", render: (r: any) => r.category },
//             { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
//             { key: "addedBy", label: "Added By", render: (r: any) => r.addedBy },
//             {
//                 key: "status",
//                 label: "Unit Status",
//                 render: (r: any) => <span className="text-green-600">{r.status}</span>,
//                 className: "w-[100px]",
//             },
//             {
//                 key: "action",
//                 label: "Action",
//                 render: (r: any) => (
//                     <RowActionMenu
//                         onEdit={() => console.log("Edit category:", r.category)}
//                         onView={() => { }}
//                         onDelete={() => console.log("Delete category:", r.category)}
//                     />
//                 ),
//                 className: "text-center w-[80px]",
//             },
//         ];
//     };

//     const handleSave = (values: any[]) => {
//         const newEntries = values.map((v, idx) => ({
//             sno: data.length + idx + 1,
//             name: v.name || v.category,
//             category: v.category || "-",
//             status: v.active ? "Active" : "Inactive",
//             createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
//             addedBy: "Dr. Ahmed Al-Mansouri",
//         }));
//         setData((prev) => [...prev, ...newEntries]);
//     };

//     return (
//         <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//             <Header />

//             <div className="p-5 space-y-8">
//                 <PageHeader title="Operation Management" />

//                 <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
//                     {/* Tabs and Actions */}
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                         <div className="flex-shrink-0 w-full lg:w-auto">
//                             <DynamicTabs
//                                 tabs={operationTabs}
//                                 defaultTab="operation"
//                                 onChange={(tabKey) => setActiveTab(tabKey as any)}
//                             />
//                         </div>

//                         {/* Filter + Search + Actions */}
//                         <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 flex-1">
//                             <Button
//                                 onClick={() => setIsFilterDialogOpen(true)}
//                                 variant="outline"
//                                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//                             >
//                                 <SlidersHorizontal className="w-5 h-5" />
//                                 <span>Filter</span>
//                             </Button>

//                             <div className="flex-grow min-w-[180px] sm:min-w-[220px] md:min-w-[260px]">
//                                 <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
//                             </div>

//                             <QuickActionsMenu />
//                             <div className="ml-auto w-full sm:w-auto flex justify-end">
//                                 <NewButton handleClick={() => setIsAddDialogOpen(true)} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Table */}
//                     <DataTable columns={getColumns()} data={data} loading={loading} striped />
//                 </div>
//             </div>

//             {/* Add Dialog */}
//             <AddDialog
//                 open={isAddDialogOpen}
//                 onClose={() => setIsAddDialogOpen(false)}
//                 mode={activeTab}
//                 onSave={handleSave}
//             />

//             {/* Filter Dialog */}
//             <FilterDialog
//                 open={isFilterDialogOpen}
//                 onClose={() => setIsFilterDialogOpen(false)}
//                 mode={activeTab}
//                 onApply={(values) => setFilters(values)}
//                 isLoading={false}
//             />
//         </main>
//     );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import { Header } from "@/components/header";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { QuickActions } from "./_components/QuickActions";
import { OperationRowActionMenu } from "./_components/OperationRowActionMenu";
import { AddDialog } from "./_components/AddDialog";
import { FilterDialog } from "./_components/FilterDialog";
import FilterButton from "@/components/common/filter-button";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { useUserStore } from "@/store/useUserStore";
import { PERMISSIONS } from "@/app/utils/permissions";
import { useDictionary } from "@/i18n/use-dictionary";  

function getOperationTabs(trans: any) {
  return [
    { key: "operation", label: trans.tabs.operation },
    { key: "operationCategory", label: trans.tabs.operationCategory },
  ];
}

function getMockOperations(mode: string) {
  if (mode === "operation") {
    return [
      { sno: 1, name: "Facelift Surgery", category: "Plastic Surgery", status: "Active" },
      { sno: 2, name: "Tooth Extraction", category: "ENT and Oral Surgery", status: "Active" },
      { sno: 3, name: "Cataract Extraction", category: "Ophthalmology", status: "Active" },
      { sno: 4, name: "Arthroscopic Surgery", category: "ENT and Oral Surgery", status: "Active" },
    ];
  }

  return [
    { sno: 1, category: "General Surgery", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
    { sno: 2, category: "Urology", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri", status: "Active" },
  ];
}

const PERMISSION_MAP = {
  operation: PERMISSIONS.OPERATION,
  operationCategory: PERMISSIONS.OPERATION_CATEGORY,
}

export default function OperationManagementPage() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"operation" | "operationCategory">("operation");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const dict = useDictionary();
  const trans = dict.pages.operation;

  const permissionStrings =
    (userPermissions?.map((p: any) => typeof p === "string" ? p : p.name) ?? []);

  const operationTabs = getOperationTabs(trans);

  const filteredTabs = operationTabs.filter((t) => {
    const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP];
    return perm?.VIEW ? permissionStrings.includes(perm.VIEW) : false;
  });



  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(getMockOperations(activeTab));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleSave = (values: any) => {
    const newEntry =
      activeTab === "operation"
        ? {
          sno: data.length + 1,
          name: values.name,
          category: values.category,
          status: "Active",
        }
        : {
          sno: data.length + 1,
          category: values.category,
          createdOn: values.createdOn,
          addedBy: values.addedBy,
          status: "Active",
        };

    setData((prev) => [...prev, newEntry]);
  };

  const getColumns = () => {
    if (activeTab === "operation") {
      return [
        { key: "sno", label: trans.table.sno, render: (r: any) => r.sno },
        { key: "name", label: trans.table.operationName, render: (r: any) => r.name },
        { key: "category", label: trans.table.operationCode, render: (r: any) => r.category },
        {
          key: "status",
          label: trans.table.operationStatus,
          render: (r: any) => <span className="text-green-600">{r.status}</span>,
        },
        {
          key: "action",
          label: trans.table.action,
          render: (r: any) => (
            <OperationRowActionMenu
              onEdit={() => console.log("Edit", r.name)}
              onView={() => { }}
              onDelete={() => console.log("Delete", r.name)}
              userPermissions={userPermissions}
              mode={activeTab}
            />
          ),
          className: "text-center w-[80px]",
        },
      ];
    }

    return [
      { key: "sno", label: trans.table.sno, render: (r: any) => r.sno },
      { key: "category", label: trans.table.category, render: (r: any) => r.category },
      { key: "createdOn", label: trans.table.createdOn, render: (r: any) => r.createdOn },
      { key: "addedBy", label: trans.table.addedBy, render: (r: any) => r.addedBy },
      {
        key: "status",
        label: trans.table.status,
        render: (r: any) => <span className="text-green-600">{r.status}</span>,
      },
      {
        key: "action",
        label: trans.table.action,
        render: (r: any) => (
          <OperationRowActionMenu
            onEdit={() => console.log("Edit", r.category)}
            onView={() => { }}
            onDelete={() => console.log("Delete", r.category)}
            userPermissions={userPermissions}
            mode={activeTab}
          />
        ),
        className: "text-center w-[80px]",
      },
    ];
  };

  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title={trans.title} />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Tabs & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex-shrink-0">
              <DynamicTabs
                tabs={filteredTabs}
                defaultTab="operation"
                onChange={(tabKey) => setActiveTab(tabKey as any)}
              />
            </div>

            {/* Right aligned actions */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {/* <Button
                onClick={() => setIsFilterDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filter</span>
              </Button> */}
              <FilterButton onClick={() => setIsFilterDialogOpen(true)}
                inverted={true}
              />
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder={dict.common.search}
              />
              <QuickActions />
              <NewButton handleClick={() => setIsAddDialogOpen(true)} />
            </div>
          </div>

          {/* Table */}
          <ResponsiveDataTable columns={getColumns()} data={data} loading={loading} striped />
        </div>
      </div>

      {/* Dialogs */}
      <AddDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode={activeTab}
        onSave={handleSave}
      />

      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        mode={activeTab}
        onApply={() => { }}
        isLoading={false}
      />
    </>
  );
}
