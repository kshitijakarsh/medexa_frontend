// "use client";

// import { useEffect, useState } from "react";
// import { Header } from "@/components/header";
// import { PageHeader } from "@/components/common/page-header";
// import SearchInput from "@/components/common/search-input";
// import NewButton from "@/components/common/new-button";
// import FilterButton from "@/components/common/filter-button";
// import { QuickActions } from "./_components/QuickActions";
// import { RowActionMenu } from "./_components/RowActionMenu";
// import AddDepartmentModal from "./_components/AddDepartmentModal";
// import FilterDialog from "./_components/FilterDialog";
// import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAuthToken } from "@/app/utils/onboarding";
// import { createDepartmentApiClient } from "@/lib/api/administration/department";
// import { toast } from "@workspace/ui/lib/sonner";
// import { getIdToken } from "@/app/utils/auth";
// import { format } from "@workspace/ui/hooks/use-date-fns";


// interface DepartmentRow {
//   id: string;
//   name: string;
//   status: string;
//   createdOn: string;
//   addedBy: string;
// }


// export default function DepartmentsPage() {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);   // page starts from 1
//   const [limit, setLimit] = useState(10);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [authToken, setAuthToken] = useState("");
//   const [editingRow, setEditingRow] = useState<any>(null);
//   const [filterParams, setFilterParams] = useState<any>({});
//   const queryClient = useQueryClient();
//   const [filters, setFilters] = useState<any>({});

//   /* ---------------------------------------
//          Filter Clearing
//    ---------------------------------------- */
//   const clearAllFilters = () => {
//     setFilters({})
//   }

//   /* ------------------------
//      AUTH TOKEN
//   -------------------------*/
//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await getAuthToken();
//       await getIdToken()
//       setAuthToken(token);
//     };
//     loadToken();
//   }, []);

//   const api = authToken ? createDepartmentApiClient({ authToken }) : null;

//   // const { data: departmentList = [], isLoading } = useQuery({
//   //   queryKey: ["departments", filterParams],
//   //   enabled: !!authToken,          // depends only on token
//   //   queryFn: async () => {
//   //     const client = createDepartmentApiClient({ authToken });
//   //     const res = await client.getDepartments(filterParams);
//   //     return res.data.data.map((item) => ({
//   //       id: item.id,
//   //       name: item.department_name,
//   //       status: item.status === "active" ? "Active" : "Inactive",
//   //       createdOn: item?.created_at ?? "—",
//   //       addedBy: item.createdBy?.name || "—",
//   //     }));
//   //   },
//   // });

//   const { data, isLoading } = useQuery({
//     queryKey: ["departments", filterParams, page, limit],
//     enabled: !!authToken,
//     queryFn: async () => {
//       const client = createDepartmentApiClient({ authToken });

//       const res = await client.getDepartments({
//         ...filterParams,
//         limit,
//         offset: (page - 1) * limit,
//       });

//       const rawList = res.data.data;

//       return {
//         list: rawList.map((item) => ({
//           id: item.id,
//           name: item.department_name,
//           status: item.status === "active" ? "Active" : "Inactive",
//           createdOn: item.created_at ?? "—",
//           addedBy: item.createdBy?.name ?? "—",
//         })),
//         pagination: res.data.pagination,
//       };
//     },
//   });



//   /* ------------------------
//      CREATE DEPARTMENT
//   -------------------------*/
//   const createMutation = useMutation({
//     mutationFn: async (payload: any) => {
//       return api!.createDepartment(payload);
//     },
//     onSuccess: () => {
//       toast.success("Department added successfully");
//       queryClient.invalidateQueries({ queryKey: ["departments"] });
//       setIsAddModalOpen(false);
//     },
//     onError: (err: any) => toast.error(err.message),
//   });


//   /* ------------------------
//      UPDATE DEPARTMENT
//   -------------------------*/
//   const updateMutation = useMutation({
//     mutationFn: async (payload: any) => {
//       return api!.updateDepartment(payload.id, {
//         department_name: payload.name,
//         status: payload.active ? "active" : "inactive",
//       });
//     },
//     onSuccess: () => {
//       toast.success("Department updated");
//       queryClient.invalidateQueries({ queryKey: ["departments"] });
//       setIsAddModalOpen(false);
//       setEditingRow(null);
//     },
//     onError: (err: any) => toast.error(err.message),
//   });


//   /* ------------------------
//      DELETE DEPARTMENT
//   -------------------------*/
//   const deleteMutation = useMutation({
//     mutationFn: async (id: string) => api!.deleteDepartment(id),
//     onSuccess: () => {
//       toast.success("Department deleted");
//       queryClient.invalidateQueries({ queryKey: ["departments"] });
//     },
//     onError: (err: any) => toast.error(err.message),
//   });

//   /* ------------------------
//      APPLY FILTERS
//   -------------------------*/
//   const handleApplyFilters = (values: any) => {
//     setFilterParams(values);
//   };

//   /* ------------------------------------------
//      FILTERED LIST
//   ---------------------------------------------*/
//   const filteredList: DepartmentRow[] = search
//     ? departmentList.filter((d) =>
//       d.name.toLowerCase().includes(search.toLowerCase())
//     )
//     : departmentList

//   /* ------------------------------------------
//    TABLE COLUMNS (WITH PROPER TYPES)
// ---------------------------------------------*/
//   const columns = [
//     // {
//     //   key: "id",
//     //   label: "Sr.No",
//     //   render: (row: DepartmentRow) => row.id,
//     //   className: "w-[60px] text-center",
//     // },
//     {
//       key: "sno",
//       label: "S.No",
//       // render: (_: any, index: number) => index + 1 + (page - 1) * limit,
//       render: (_: any, index?: number) => {
//         const safeIndex = typeof index === "number" ? index : 0
//         const sno =
//           Number.isFinite(safeIndex) &&
//             Number.isFinite(page) &&
//             Number.isFinite(limit)
//             ? safeIndex + 1 + (page - 1) * limit
//             : "-"
//         return sno
//       },
//       className: "text-center w-[60px]",
//     },
//     {
//       key: "name",
//       label: "Department Name",
//       render: (row: DepartmentRow) => (
//         <span className="font-medium text-gray-700">{row.name}</span>
//       ),
//     },
//     {
//       key: "status",
//       label: "Department Status",
//       render: (row: DepartmentRow) => (
//         <span
//           className={`font-semibold ${row.status === "Active" ? "text-green-500" : "text-red-500"
//             }`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       key: "createdOn",
//       label: "Created On",
//       render: (row: DepartmentRow) => (
//         <span className="text-gray-600">{format(row.createdOn, "dd MMM yyyy, hh:mm a")}</span>
//       ),
//     },
//     {
//       key: "addedBy",
//       label: "Added By",
//       render: (row: DepartmentRow) => (
//         <span className="text-gray-700">{row.addedBy}</span>
//       ),
//     },
//     {
//       key: "action",
//       label: "Action",
//       render: (row: DepartmentRow) => (
//         <RowActionMenu
//           onEdit={() => {
//             setEditingRow(row);
//             setIsAddModalOpen(true);
//           }}
//           onDelete={() => deleteMutation.mutate(row.id)}
//         />
//       ),
//       className: "text-center w-[80px]",
//     },
//   ];


//   return (
//     <>
//       <div className="py-6 px-3 md:px-6 min-h-screen space-y-8">
//         <PageHeader title="Departments" />

//         <div className="bg-white p-5 rounded-md shadow-sm space-y-5">
//           {/* Top Actions */}
//           <div className="flex flex-wrap md:flex-row gap-4 justify-end">
//             <FilterButton
//               filters={filters}
//               onClick={() => setIsFilterOpen(true)}
//               onClear={() => clearAllFilters()}

//             />
//             <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
//             <QuickActions />
//             <NewButton handleClick={() => setIsAddModalOpen(true)} />
//           </div>

//           {/* Table */}
//           <ResponsiveDataTable
//             columns={columns}
//             // data={
//             //   search
//             //     ? departmentList?.filter((d) =>
//             //         d.name.toLowerCase().includes(search.toLowerCase())
//             //       )
//             //     : departmentList || []
//             // }
//             // data={filteredList}
//             data={search ? filteredList : data?.list || []}
//             loading={isLoading}
//             striped
//           />
//         </div>
//       </div>

//       {/* Add Department */}
//       {/* <AddDepartmentModal
//         open={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSave={(departments) => {
//           departments.forEach((d) =>
//             createMutation.mutate({
//               department_name: d.name,
//               status: d.active ? "active" : "inactive",
//             })
//           );
//         }}
//       /> */}
//       <AddDepartmentModal
//         open={isAddModalOpen}
//         onClose={() => {
//           setIsAddModalOpen(false);
//           setEditingRow(null);
//         }}
//         editData={editingRow ? {
//           id: editingRow.id,
//           name: editingRow.name,
//           active: editingRow.status === "Active"
//         } : null}
//         onSave={(departments) => {
//           const first = departments?.[0];
//           if (!first) return;
//           if (editingRow) {
//             updateMutation.mutate({
//               id: editingRow.id,
//               name: first.name,
//               active: first.active,
//             });
//           } else {
//             // CREATE FLOW
//             departments.forEach((d) =>
//               createMutation.mutate({
//                 department_name: d.name,
//                 status: d.active ? "active" : "inactive",
//               })
//             );
//           }
//         }}
//       />


//       {/* Filters */}
//       <FilterDialog
//         open={isFilterOpen}
//         onClose={() => setIsFilterOpen(false)}
//         onApply={handleApplyFilters}
//         isLoading={isLoading}
//       />
//     </>
//   );
// }



"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "@workspace/ui/lib/sonner";

import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { QuickActions } from "./_components/QuickActions";
import { DepartmentRowActionMenu } from "./_components/DepartmentRowActionMenu";
import FilterDialog from "./_components/FilterDialog";
import AddDepartmentModal from "./_components/AddDepartmentModal";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

import { PageHeader } from "@/components/common/page-header";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { PaginationControls } from "@/components/common/data-table/PaginationControls";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartmentApiClient } from "@/lib/api/administration/department";

import { format } from "@workspace/ui/hooks/use-date-fns";
import { getAuthToken } from "@/app/utils/onboarding";
import { getIdToken } from "@/app/utils/auth";
import { useUserStore } from "@/store/useUserStore";
import { Can } from "@/components/common/app-can";
import { PERMISSIONS } from "@/app/utils/permissions";
import { useDictionary } from "@/i18n/use-dictionary";

const limit = 10;

function DepartmentsContent() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const dict = useDictionary();
  const trans = dict.pages.department;

  /* -------------------- URL Sync -------------------- */
  const initialPage = parseInt(searchParams.get("page") || "1");
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  }, [page]);

  /* -------------------- Search -------------------- */
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  /* -------------------- Filters -------------------- */
  const [filters, setFilters] = useState<any>({});

  /* -------------------- Dialogs -------------------- */
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  /* -------------------- Auth Token -------------------- */
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      await getIdToken();
      setAuthToken(token);
    };
    loadToken();
  }, []);

  const departmentApi = authToken
    ? createDepartmentApiClient({ authToken })
    : null;

  /* -------------------- Fetch Departments -------------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["departments", page, searchQuery, filters],
    enabled: !!authToken,
    queryFn: async () =>
      (
        await departmentApi!.getDepartments({
          limit,
          offset: (page - 1) * limit,
          search: searchQuery.length >= 2 ? searchQuery : undefined,
          status:
            filters?.status === "Active"
              ? "active"
              : filters?.status === "Inactive"
                ? "inactive"
                : undefined,
        })
      ).data,
  });

  const tableData = data?.data || [];
  const pagination = data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  /* -------------------- Mutations -------------------- */
  const createMutation = useMutation({
    mutationFn: async (payload: any) =>
      departmentApi!.createDepartment(payload),
    onSuccess: () => {
      toast.success("Department added");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setIsAddModalOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (v: any) =>
      departmentApi!.updateDepartment(v.id, {
        department_name: v.name,
        status: v.active ? "active" : "inactive",
      }),
    onSuccess: () => {
      toast.success("Department updated");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setIsAddModalOpen(false);
      setEditingRow(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => departmentApi!.deleteDepartment(id),
    onSuccess: () => {
      toast.success("Department deleted");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  /* -------------------- Table Columns -------------------- */
  const columns = [
    {
      key: "sno",
      label: trans.table.sno,
      render: (_: any, index?: number) =>
        typeof index === "number"
          ? index + 1 + (page - 1) * limit
          : "-",
      className: "text-center w-[60px]",
    },
    {
      key: "department_name",
      label: trans.table.departmentName,
      render: (row: any) => (
        <span className="font-medium text-gray-700">{row.department_name}</span>
      ),
    },
    {
      key: "status",
      label: trans.table.status,
      render: (row: any) => (
        <span
          className={
            row.status?.toLowerCase() === "active" ? "text-green-600" : "text-red-500"
          }
        >
          {row.status?.charAt(0).toUpperCase() + row.status?.slice(1)}
        </span>
      ),
    },
    {
      key: "created_at",
      label: trans.table.createdOn,
      render: (row: any) =>
        row.created_at !== "—"
          ? format(row.created_at, "dd MMM yyyy, hh:mm a")
          : "—",
    },
    {
      key: "addedBy",
      label: trans.table.addedBy,
      render: (row: any) => row.createdBy?.name || "—",
    },
    {
      key: "action",
      label: trans.table.action,
      render: (row: any) => (
        <DepartmentRowActionMenu
          onEdit={() => {
            setEditingRow(row);
            setIsAddModalOpen(true);
          }}
          onDelete={() => deleteMutation.mutate(row.id)}
          userPermissions={userPermissions}

        />
      ),
      className: "text-center w-[80px]",
    },
  ];

  /* -------------------- UI -------------------- */
  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title={trans.title} />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Header Controls */}
          <div className="flex flex-wrap justify-end gap-3">
            <FilterButton
              filters={filters}
              onClick={() => setIsFilterOpen(true)}
              onClear={() => setFilters({})}
              inverted={true}
            />

            <SearchInput
              value={search}
              onChange={setSearch}
              onSearch={setSearchQuery}
              placeholder={trans["Search departments…"]}
            />

            <QuickActions />

            <Can
              permission={PERMISSIONS.DEPARTMENT.CREATE}
              userPermissions={userPermissions}
            >
              <NewButton handleClick={() => setIsAddModalOpen(true)} />
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

      {/* Add/Edit Department */}
      <AddDepartmentModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRow(null);
        }}
        editData={
          editingRow
            ? {
              id: editingRow.id,
              name: editingRow.department_name,
              active: editingRow.status?.toLowerCase() === "active",
            }
            : null
        }
        onSave={(departments) => {
          const d = departments?.[0];
          if (!d) return;

          if (editingRow) {
            updateMutation.mutate({
              id: editingRow.id,
              name: d.name,
              active: d.active,
            });
          } else {
            createMutation.mutate({
              department_name: d.name,
              status: d.active ? "active" : "inactive",
            });
          }
        }}
      />

      {/* Filter Dialog */}
      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(v) => {
          setFilters(v);
          setPage(1);
        }}
      />
    </>
  );
}

export default function DepartmentsPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <PermissionGuard permission={PERMISSIONS.DEPARTMENT.VIEW}>
        <DepartmentsContent />
      </PermissionGuard>
    </Suspense>
  );
}
