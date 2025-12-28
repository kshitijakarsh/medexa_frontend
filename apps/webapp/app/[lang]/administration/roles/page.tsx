// // "use client";

// // import { useEffect, useState } from "react";
// // import { Button } from "@workspace/ui/components/button";
// // import { SlidersHorizontal } from "lucide-react";
// // import { Header } from "@/components/header";
// // import { DataTable } from "@/components/common/data-table";
// // import { QuickActions } from "./_components/QuickActions";
// // import { EmployeeRowActions } from "./_components/EmployeeRowActions";
// // import { FilterDialog } from "./_components/FilterDialog";
// // import { AddDialog } from "./_components/AddDialog";
// // import SearchInput from "@/components/common/search-input";
// // import NewButton from "@/components/common/new-button";
// // import { getMockEmployees } from "./_components/api";
// // import { PageHeader } from "@/components/common/PageHeader";
// // import { useRouter } from "next/navigation";
// // import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";

// // export default function EmployeeConfigurationPage() {
// //     const router = useRouter();
// //     const [search, setSearch] = useState("");
// //     const [loading, setLoading] = useState(true);
// //     const [data, setData] = useState<any[]>([]);
// //     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// //     const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
// //     const [filters, setFilters] = useState<any>({});

// //     useEffect(() => {
// //         setLoading(true);
// //         const timer = setTimeout(() => {
// //             setData(getMockEmployees("roles"));
// //             setLoading(false);
// //         }, 800);
// //         return () => clearTimeout(timer);
// //     }, []);

// //     const getColumns = () => [
// //         {
// //             key: "sno",
// //             label: "S.No",
// //             render: (r: any) => <span>{r.sno}</span>,
// //             className: "text-center w-[60px]",
// //         },
// //         {
// //             key: "name",
// //             label: "User Role",
// //             render: (r: any) => <span className="text-gray-800 font-medium">{r.name}</span>,
// //         },
// //         {
// //             key: "status",
// //             label: "Billing Status",
// //             render: (r: any) => (
// //                 <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>
// //                     {r.status}
// //                 </span>
// //             ),
// //             className: "w-[80px]",
// //         },
// //         {
// //             key: "createdOn",
// //             label: "Created On",
// //             render: (r: any) => r.createdOn,
// //             className: "w-[80px]",
// //         },
// //         {
// //             key: "addedBy",
// //             label: "Added By",
// //             render: (r: any) => r.addedBy,
// //             className: "max-w-[100px] min-w-[80px]",
// //         },
// //         {
// //             key: "action",
// //             label: "Action",
// //             render: (r: any) =>
// //             <EmployeeRowActions
// //                 onEdit={() => console.log("Edit", r.name)}
// //                 onView={() => console.log("View", r.name)}
// //                 onPermission={() => router.push(`/roles/permissions/${r.id}`)}
// //                 onDelete={() => console.log("Delete", r.name)}
// //             />,
// //             //   <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />,
// //             className: "text-center w-[80px]",
// //         },
// //     ];

// //     const handleSave = (values: any[]) => {
// //         const newEntries = values.map((v, idx) => ({
// //             id: data.length + idx + 1,
// //             name: v.name,
// //             status: v.active ? "Active" : "Inactive",
// //             createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
// //             addedBy: "Dr. Ahmed Al-Mansouri",
// //         }));
// //         setData((prev) => [...prev, ...newEntries]);
// //     };

// //     return (
// //         <>
// //             <div className="p-5 space-y-8">
// //                 <PageHeader title="User Roles Configuration" />

// //                 <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
// //                     {/* ✅ Right-aligned Top Controls */}
// //                     <div className="flex justify-end">
// //                         <div className="flex flex-wrap items-center justify-end gap-3 w-full lg:w-auto">
// //                             {/* Filter */}
// //                             <Button
// //                                 onClick={() => setIsFilterDialogOpen(true)}
// //                                 variant="outline"
// //                                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
// //                             >
// //                                 <SlidersHorizontal className="w-5 h-5" />
// //                                 <span>Filter</span>
// //                             </Button>

// //                             {/* Search */}
// //                             <div className="min-w-[200px] md:min-w-[200px]">
// //                                 <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
// //                             </div>

// //                             {/* Quick Actions */}
// //                             <QuickActions />

// //                             {/* Add New Button */}
// //                             <NewButton handleClick={() => setIsAddDialogOpen(true)} />
// //                         </div>
// //                     </div>

// //                     {/* Data Table */}
// //                     <ResponsiveDataTable columns={getColumns()} data={data} loading={loading} striped />
// //                 </div>
// //             </div>

// //             {/* Add Dialog */}
// //             <AddDialog
// //                 open={isAddDialogOpen}
// //                 onClose={() => setIsAddDialogOpen(false)}
// //                 mode="roles"
// //                 onSave={handleSave}
// //             />

// //             {/* Filter Dialog */}
// //             <FilterDialog
// //                 open={isFilterDialogOpen}
// //                 onClose={() => setIsFilterDialogOpen(false)}
// //                 mode="roles"
// //                 onApply={(values) => setFilters(values)}
// //                 isLoading={false}
// //             />
// //         </>
// //     );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Button } from "@workspace/ui/components/button";
// import { SlidersHorizontal } from "lucide-react";
// import { toast } from "@workspace/ui/lib/sonner";

// import { PageHeader } from "@/components/common/PageHeader";
// import SearchInput from "@/components/common/search-input";
// import NewButton from "@/components/common/new-button";
// import FilterButton from "@/components/common/filter-button";
// import { QuickActions } from "./_components/QuickActions";
// import { EmployeeRowActions } from "./_components/EmployeeRowActions";
// import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// import { PaginationControls } from "@/components/common/data-table/PaginationControls";

// import { FilterDialog } from "./_components/FilterDialog";

// import { createRoleApiClient } from "@/lib/api/administration/roles";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { AddRoleDialog } from "./_components/AddDialog";

// const limit = 10;

// export default function RolesPage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const searchParams = useSearchParams();

//   /* ----------------------------------
//         URL State
//   ----------------------------------- */
//   const initialPage = parseInt(searchParams.get("page") || "1");

//   const [page, setPage] = useState(initialPage);
//   const [search, setSearch] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState<any>({});

//   /* Dialog Controls */
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

//   /* Edit Controls */
//   const [editData, setEditData] = useState<any>(null);
//   const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

//   /* API Client */
//   const roleApi = createRoleApiClient({});

//   /* Update URL on page change */
//   useEffect(() => {
//     const params = new URLSearchParams();
//     params.set("page", page.toString());
//     router.replace(`?${params.toString()}`);
//   }, [page]);

//   /* ----------------------------------
//         Fetch Roles List
//   ----------------------------------- */
//   const { data: rolesData, isLoading } = useQuery({
//     queryKey: ["roles", page, searchQuery, filters],
//     queryFn: async () =>
//       (
//         await roleApi.getRoles({
//           page,
//           limit,
//           search: searchQuery,
//           status: filters.status,
//         })
//       ).data,
//   });

//   const tableData = rolesData?.data || [];
//   const totalPages = rolesData?.pagination?.totalPages || 1;

//   /* ----------------------------------
//         Mutations (Create / Update / Delete)
//   ----------------------------------- */

//   const createRoleMutation = useMutation({
//     mutationFn: (v: any) =>
//       roleApi.createRole({
//         name: v.name,
//         status: v.active ? "active" : "inactive",
//         permissions: v.permissions || [],
//       }),
//     onSuccess: () => {
//       toast.success("Role created");
//       setIsAddDialogOpen(false);
//       queryClient.invalidateQueries({ queryKey: ["roles"] });
//     },
//     onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
//   });

//   const updateRoleMutation = useMutation({
//     mutationFn: (v: any) =>
//       roleApi.updateRole(v.id, {
//         name: v.name,
//         status: v.active ? "active" : "inactive",
//         permissions: v.permissions || [],
//       }),
//     onSuccess: () => {
//       toast.success("Role updated");
//       setIsAddDialogOpen(false);
//       queryClient.invalidateQueries({ queryKey: ["roles"] });
//     },
//     onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
//   });

//   const deleteRoleMutation = useMutation({
//     mutationFn: (id: string) => roleApi.deleteRole(id),
//     onSuccess: () => {
//       toast.success("Role deleted");
//       queryClient.invalidateQueries({ queryKey: ["roles"] });
//     },
//     onError: (err: any) => toast.error(err?.response?.data?.message || "Failed"),
//   });

//   /* ----------------------------------
//         Columns
//   ----------------------------------- */

//   const columns = [
//     // {
//     //   key: "sno",
//     //   label: "S.No",
//     //   render: (_: any, index: number) => index + 1 + (page - 1) * limit,
//     //   className: "text-center w-[60px]",
//     // },
//     {
//       key: "name",
//       label: "Role",
//       render: (r: any) => <span className="font-medium">{r.name}</span>,
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (r: any) => (
//         <span className={r.status === "active" ? "text-green-600" : "text-red-500"}>
//           {r.status}
//         </span>
//       ),
//       className: "w-[80px]",
//     },
//     {
//       key: "created_at",
//       label: "Created On",
//       render: (r: any) => new Date(r.created_at).toLocaleString(),
//     },
//     {
//       key: "action",
//       label: "Action",
//       render: (r: any) => (
//         <EmployeeRowActions
//           onEdit={() => {
//             setDialogMode("edit");
//             setEditData(r);
//             setIsAddDialogOpen(true);
//           }}
//           onView={() => console.log("View", r)}
//           onPermission={() => router.push(`/administration/roles/permissions/${r.id}`)}
//           onDelete={() => deleteRoleMutation.mutate(r.id)}
//         />
//       ),
//       className: "text-center w-[80px]",
//     },
//   ];

//   return (
//     <>
//       <div className="p-5 space-y-8">
//         <PageHeader title="User Roles Configuration" />

//         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
//           {/* HEADER CONTROLS */}
//           <div className="flex flex-wrap justify-end gap-3">
//             <FilterButton
//               filters={filters}
//               onClick={() => setIsFilterDialogOpen(true)}
//               onClear={() => setFilters({})}
//             />

//             <SearchInput value={search} onChange={setSearch} onSearch={setSearchQuery} />

//             <QuickActions />

//             <NewButton
//               handleClick={() => {
//                 setDialogMode("add");
//                 setEditData(null);
//                 setIsAddDialogOpen(true);
//               }}
//             />
//           </div>

//           {/* TABLE */}
//           <ResponsiveDataTable columns={columns} data={tableData} loading={isLoading} striped />

//           {/* PAGINATION */}
//           <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
//         </div>
//       </div>

//       {/* ADD / EDIT DIALOG */}
//       <AddRoleDialog
//         open={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         mode={dialogMode}
//         initialData={editData}
//         // dialogMode={dialogMode}
//         onSave={(v) => {
//           if (dialogMode === "add") createRoleMutation.mutate(v);
//           else updateRoleMutation.mutate({ id: editData.id, ...v });
//         }}
//       />

//       {/* FILTER */}
//       <FilterDialog
//         open={isFilterDialogOpen}
//         onClose={() => setIsFilterDialogOpen(false)}
//         mode="roles"
//         filters={filters}
//         onApply={(v) => {
//           setFilters(v);
//           setPage(1);
//         }}
//       />
//     </>
//   );
// }

"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { toast } from "@workspace/ui/lib/sonner"

import SearchInput from "@/components/common/search-input"
import NewButton from "@/components/common/new-button"
import FilterButton from "@/components/common/filter-button"
import { QuickActions } from "./_components/QuickActions"
import { RoleRowActions } from "./_components/RoleRowActions"
import { FilterDialog } from "./_components/FilterDialog"
import { PageHeader } from "@/components/common/page-header"
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable"
import { PaginationControls } from "@/components/common/data-table/PaginationControls"
import { AddRoleDialog } from "./_components/AddDialog"

import { createRoleApiClient } from "@/lib/api/administration/roles"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useUserStore } from "@/store/useUserStore"
import { PERMISSIONS } from "@/app/utils/permissions"
import { Can } from "@/components/common/app-can"

const limit = 10

function RolesPageContent() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  /* ----------------------------------
          URL State
    ----------------------------------- */
  const initialPage = parseInt(searchParams.get("page") || "1")
  const [page, setPage] = useState(initialPage)

  /* Search */
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  /* Filters */
  const [filters, setFilters] = useState<{ status?: string }>({})

  /* Dialogs */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  /* Edit State */
  const [editData, setEditData] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")

  /* API Client */
  const roleApi = createRoleApiClient({})

  /* Update URL on page change */
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("page", page.toString())
    router.replace(`?${params.toString()}`)
  }, [page])

  /* ----------------------------------
          Fetch Roles (with search + filters)
    ----------------------------------- */
  const { data: rolesData, isLoading } = useQuery({
    queryKey: ["roles", page, searchQuery, filters],
    queryFn: async () =>
      (
        await roleApi.getRoles({
          page,
          limit,
          search: searchQuery.length >= 2 ? searchQuery : undefined,
          status:
            filters.status === "Active"
              ? "active"
              : filters.status === "Inactive"
                ? "inactive"
                : undefined,
        })
      ).data,
  })

  const tableData = rolesData?.data || []
  const totalPages = rolesData?.pagination?.totalPages || 1

  /* ----------------------------------
          Mutations
    ----------------------------------- */
  const createRoleMutation = useMutation({
    mutationFn: (v: any) =>
      roleApi.createRole({
        name: v.name,
        status: v.active ? "active" : "inactive",
        permissions: v.permissions || [],
      }),
    onSuccess: () => {
      toast.success("Role created")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message || "Failed"),
  })

  const updateRoleMutation = useMutation({
    mutationFn: (v: any) =>
      roleApi.updateRole(v.id, {
        name: v.name,
        status: v.active ? "active" : "inactive",
        permissions: v.permissions || [],
      }),
    onSuccess: () => {
      toast.success("Role updated")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message || "Failed"),
  })

  const deleteRoleMutation = useMutation({
    mutationFn: (id: string) => roleApi.deleteRole(id),
    onSuccess: () => {
      toast.success("Role deleted")
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message || "Failed"),
  })

  /* ----------------------------------
          Table Columns
    ----------------------------------- */
  const columns = [
    {
      key: "sno",
      label: "S.No",
      // render: (_: any, index: number) => index + 1 + (page - 1) * limit,
      render: (_: any, index?: number) => {
        const safeIndex = typeof index === "number" ? index : 0
        const sno =
          Number.isFinite(safeIndex) &&
            Number.isFinite(page) &&
            Number.isFinite(limit)
            ? safeIndex + 1 + (page - 1) * limit
            : "-"
        return sno
      },
      className: "text-center w-[60px]",
    },
    {
      key: "name",
      label: "Role",
      render: (r: any) => <span className="font-medium">{r.name}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (r: any) => (
        <span
          className={r.status === "active" ? "text-green-600" : "text-red-500"}
        >
          {r.status}
        </span>
      ),
      className: "w-[80px]",
    },
    {
      key: "created_at",
      label: "Created On",
      render: (r: any) => new Date(r.created_at).toLocaleString(),
      className: "w-[150px]",
    },
    {
      key: "action",
      label: "Action",
      render: (r: any) => (
        <RoleRowActions
          onEdit={() => {
            setDialogMode("edit")
            setEditData(r)
            setIsAddDialogOpen(true)
          }}
          // onView={() => console.log("View", r)}
          onPermission={() =>
            router.push(`/administration/roles/permissions/${r.id}`)
          }
          onDelete={() => deleteRoleMutation.mutate(r.id)}
          userPermissions={userPermissions}
        />
      ),
      className: "text-center w-[80px]",
    },
  ]

  /* ----------------------------------
                  UI
    ----------------------------------- */
  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title="User Roles Configuration" />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Header Controls */}
          <div className="flex flex-wrap justify-end gap-3">
            <FilterButton
              filters={filters}
              onClick={() => setIsFilterDialogOpen(true)}
              onClear={() => setFilters({})}
              inverted={true}
            />

            <SearchInput
              value={search}
              onChange={setSearch}
              onSearch={setSearchQuery}
              placeholder="Search roles..."
            />

            <QuickActions />
            <Can
              permission={PERMISSIONS.ROLE.CREATE}
              userPermissions={userPermissions}
            >
              <NewButton
                handleClick={() => {
                  setDialogMode("add")
                  setEditData(null)
                  setIsAddDialogOpen(true)
                }}
              />
            </Can>

          </div>

          {/* Table */}
          <ResponsiveDataTable
            columns={columns}
            data={tableData}
            loading={isLoading}
            striped
          />

          {/* Pagination */}
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* ADD / EDIT Role */}
      <AddRoleDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode={dialogMode}
        initialData={editData}
        onSave={(v) => {
          if (dialogMode === "add") createRoleMutation.mutate(v)
          else updateRoleMutation.mutate({ id: editData.id, ...v })
        }}
      />

      {/* FILTER */}
      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        mode="roles"
        onApply={(v) => {
          setFilters(v)
          setPage(1)
        }}
      />
    </>
  )
}

export default function RolesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RolesPageContent />
    </Suspense>
  )
}
