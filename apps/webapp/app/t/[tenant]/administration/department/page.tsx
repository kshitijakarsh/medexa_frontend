"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { QuickActions } from "./_components/QuickActions";
import { RowActionMenu } from "./_components/RowActionMenu";
import AddDepartmentModal from "./_components/AddDepartmentModal";
import FilterDialog from "./_components/FilterDialog";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/app/utils/onboarding";
import { createDepartmentApiClient } from "@/lib/api/administration/department";
import { toast } from "@workspace/ui/lib/sonner";
import { getIdToken } from "@/app/utils/auth";


interface DepartmentRow {
  id: string;
  name: string;
  status: string;
  createdOn: string;
  addedBy: string;
}


export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [editingRow, setEditingRow] = useState<any>(null);
  const [filterParams, setFilterParams] = useState<any>({});
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<any>({});

  /* ---------------------------------------
         Filter Clearing
   ---------------------------------------- */
  const clearAllFilters = () => {
    setFilters({})
  }

  /* ------------------------
     AUTH TOKEN
  -------------------------*/
  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      await getIdToken()
      setAuthToken(token);
    };
    loadToken();
  }, []);

  const api = authToken ? createDepartmentApiClient({ authToken }) : null;

  /* ------------------------
     QUERY: LIST DEPARTMENTS
  -------------------------*/
  // const { data: departmentList, isLoading } = useQuery({
  //   queryKey: ["departments", filterParams],
  //   enabled: !!api,
  //   queryFn: async () => {
  //     const res = await api!.getDepartments(filterParams);
  //     return res.data.data.map((item) => ({
  //       id: item.id,
  //       name: item.department_name,
  //       status: item.status === "active" ? "Active" : "Inactive",
  //       createdOn: "—",
  //       addedBy: item.addedBy?.name || "—",
  //     }));
  //   },
  // });

  // const { data: departmentList, isLoading } = useQuery<DepartmentRow[]>({
  //   queryKey: ["departments", filterParams],
  //   enabled: !!api,
  //   initialData: [], // ✅ FIX: ensures it's never undefined
  //   queryFn: async () => {
  //     const res = await api!.getDepartments(filterParams);
  //     return res.data.data.map((item) => ({
  //       id: item.id,
  //       name: item.department_name,
  //       status: item.status === "active" ? "Active" : "Inactive",
  //       createdOn: "—",
  //       addedBy: item.addedBy?.name || "—",
  //     }));
  //   },
  // });


  // const { data: departmentList, isLoading } = useQuery({
  //   queryKey: ["departments", filterParams, authToken],  // <-- important
  //   enabled: !!authToken,                                // <-- triggers when token exists
  //   initialData: [],
  //   queryFn: async () => {
  //     const res = await api!.getDepartments(filterParams);
  //     return res.data.data.map((item) => ({
  //       id: item.id,
  //       name: item.department_name,
  //       status: item.status === "active" ? "Active" : "Inactive",
  //       createdOn: "—",
  //       addedBy: item.addedBy?.name || "—",
  //     }));
  //   },
  // });

  const { data: departmentList = [], isLoading } = useQuery({
    queryKey: ["departments", filterParams],
    enabled: !!authToken,          // depends only on token
    queryFn: async () => {
      const client = createDepartmentApiClient({ authToken });
      const res = await client.getDepartments(filterParams);
      return res.data.data.map((item) => ({
        id: item.id,
        name: item.department_name,
        status: item.status === "active" ? "Active" : "Inactive",
        createdOn: "—",
        addedBy: item.addedBy?.name || "—",
      }));
    },
  });


  /* ------------------------
     CREATE DEPARTMENT
  -------------------------*/
  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      return api!.createDepartment(payload);
    },
    onSuccess: () => {
      toast.success("Department added successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setIsAddModalOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });


  /* ------------------------
     UPDATE DEPARTMENT
  -------------------------*/
  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      return api!.updateDepartment(payload.id, {
        department_name: payload.name,
        status: payload.active ? "active" : "inactive",
      });
    },
    onSuccess: () => {
      toast.success("Department updated");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setIsAddModalOpen(false);
      setEditingRow(null);
    },
    onError: (err: any) => toast.error(err.message),
  });


  /* ------------------------
     DELETE DEPARTMENT
  -------------------------*/
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api!.deleteDepartment(id),
    onSuccess: () => {
      toast.success("Department deleted");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  /* ------------------------
     APPLY FILTERS
  -------------------------*/
  const handleApplyFilters = (values: any) => {
    setFilterParams(values);
  };

  /* ------------------------------------------
     FILTERED LIST
  ---------------------------------------------*/
  const filteredList: DepartmentRow[] = search
    ? departmentList.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
    : departmentList

  /* ------------------------------------------
   TABLE COLUMNS (WITH PROPER TYPES)
---------------------------------------------*/
  const columns = [
    {
      key: "id",
      label: "Sr.No",
      render: (row: DepartmentRow) => row.id,
      className: "w-[60px] text-center",
    },
    {
      key: "name",
      label: "Department Name",
      render: (row: DepartmentRow) => (
        <span className="font-medium text-gray-700">{row.name}</span>
      ),
    },
    {
      key: "status",
      label: "Department Status",
      render: (row: DepartmentRow) => (
        <span
          className={`font-semibold ${row.status === "Active" ? "text-green-500" : "text-red-500"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "createdOn",
      label: "Created On",
      render: (row: DepartmentRow) => (
        <span className="text-gray-600">{row.createdOn}</span>
      ),
    },
    {
      key: "addedBy",
      label: "Added By",
      render: (row: DepartmentRow) => (
        <span className="text-gray-700">{row.addedBy}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row: DepartmentRow) => (
        <RowActionMenu
          onEdit={() => {
            setEditingRow(row);
            setIsAddModalOpen(true);
          }}
          onDelete={() => deleteMutation.mutate(row.id)}
        />
      ),
      className: "text-center w-[80px]",
    },
  ];


  return (
    <>
      <div className="py-6 px-3 md:px-6 min-h-screen space-y-8">
        <PageHeader title="Departments" />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-5">
          {/* Top Actions */}
          <div className="flex flex-wrap md:flex-row gap-4 justify-end">
            <FilterButton
              filters={filters}
              onClick={() => setIsFilterOpen(true)}
              onClear={() => clearAllFilters()}

            />
            <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
            <QuickActions />
            <NewButton handleClick={() => setIsAddModalOpen(true)} />
          </div>

          {/* Table */}
          <ResponsiveDataTable
            columns={columns}
            // data={
            //   search
            //     ? departmentList?.filter((d) =>
            //         d.name.toLowerCase().includes(search.toLowerCase())
            //       )
            //     : departmentList || []
            // }
            data={filteredList}
            loading={isLoading}
            striped
          />
        </div>
      </div>

      {/* Add Department */}
      {/* <AddDepartmentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(departments) => {
          departments.forEach((d) =>
            createMutation.mutate({
              department_name: d.name,
              status: d.active ? "active" : "inactive",
            })
          );
        }}
      /> */}
      <AddDepartmentModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRow(null);
        }}
        editData={editingRow ? {
          id: editingRow.id,
          name: editingRow.name,
          active: editingRow.status === "Active"
        } : null}
        onSave={(departments) => {
          const first = departments?.[0];
          if (!first) return;
          if (editingRow) {
            updateMutation.mutate({
              id: editingRow.id,
              name: first.name,
              active: first.active,
            });
          } else {
            // CREATE FLOW
            departments.forEach((d) =>
              createMutation.mutate({
                department_name: d.name,
                status: d.active ? "active" : "inactive",
              })
            );
          }
        }}
      />


      {/* Filters */}
      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        isLoading={isLoading}
      />
    </>
  );
}
