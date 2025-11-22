// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@workspace/ui/components/button"
// import { Input } from "@workspace/ui/components/input"
// import { MoveLeft, Plus, Search, Loader2 } from "lucide-react"
// import { DataTable } from "@/components/common/data-table"
// import { Header } from "@/components/header"
// import { useRouter } from "next/navigation"
// import AddDepartmentModal from "./_components/AddDepartmentModal"
// import { QuickActionsMenu } from "./_components/QuickActionsMenu"
// import { RowActionMenu } from "./_components/RowActionMenu"
// import SearchInput from "@/components/common/search-input"
// import { PageHeader } from "@/components/common/PageHeader"
// import NewButton from "@/components/common/new-button"

// interface Department {
//   id: number
//   name: string
//   status: "Active" | "Inactive"
//   createdOn: string
//   addedBy: string
// }

// export default function DepartmentsPage() {
//   const [search, setSearch] = useState("")
//   const [departments, setDepartments] = useState<Department[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const router = useRouter()

//   // Simulated API call
//   useEffect(() => {
//     setLoading(true)
//     const timer = setTimeout(() => {
//       setDepartments([
//         {
//           id: 1,
//           name: "Neuro surgery",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//         {
//           id: 2,
//           name: "Dental",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//         {
//           id: 3,
//           name: "Urology",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//       ])
//       setLoading(false)
//     }, 1200)

//     return () => clearTimeout(timer)
//   }, [])

//   const columns = [
//     {
//       key: "id",
//       label: "Sr.No",
//       render: (row: Department) => row.id,
//       className: "w-[60px] text-center",
//     },
//     {
//       key: "name",
//       label: "Department Name",
//       render: (row: Department) => (
//         <span className="font-medium text-gray-700">{row.name}</span>
//       ),
//     },
//     {
//       key: "status",
//       label: "Department Status",
//       render: (row: Department) => (
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
//       render: (row: Department) => (
//         <span className="text-gray-600">{row.createdOn}</span>
//       ),
//     },
//     {
//       key: "addedBy",
//       label: "Added By",
//       render: (row: Department) => (
//         <span className="text-gray-700">{row.addedBy}</span>
//       ),
//     },
//     // {
//     //   key: "action",
//     //   label: "Action",
//     //   render: () => (
//     //     <div className="flex justify-center items-center">
//     //       <Button
//     //         variant="ghost"
//     //         size="icon"
//     //         className="hover:bg-gray-100 text-gray-600"
//     //       >
//     //         ⋮
//     //       </Button>
//     //     </div>
//     //   ),
//     //   className: "text-center w-[80px]",
//     // },
//     {
//       key: "action",
//       label: "Action",
//       render: (row: Department) => (
//         <RowActionMenu
//           onEdit={() => console.log("Edit", row.name)}
//           onDelete={() => console.log("Delete", row.name)}
//         />
//       ),
//       className: "text-center w-[80px]",
//     }

//   ]

//   return (
// <>

//       <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
//         {/* Title & Back */}
//         {/* <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
//             onClick={() => router.back()}
//           >
//             <MoveLeft className="w-5 h-5" />
//           </Button>
//           <h1 className="text-xl font-semibold text-gray-800">Departments</h1>
//         </div> */}
//         <PageHeader title="Departments" />

//         {/* Card */}
//         <div className="space-y-4 bg-white p-5 rounded-md shadow-sm">
//           {/* Header Actions */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
//             <div className="flex items-center gap-3">

//               {/* Customized with a different icon, width, and placeholder */}
//               <SearchInput
//                 value={search}
//                 onChange={setSearch}
//                 placeholder="Search users..."
//               />

//               <QuickActionsMenu />

//               <NewButton handleClick={() => setIsAddModalOpen(true)} className="cursor-pointer" />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="mt-2">
//             <DataTable
//               columns={columns}
//               data={departments}
//               loading={loading}
//               striped
//             />
//           </div>
//         </div>
//       </div>

//       {/* Add Department Modal */}
//       <AddDepartmentModal
//         open={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//       />
//     </>
//   )
// }




"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { PageHeader } from "@/components/common/page-header";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { DataTable } from "@/components/common/data-table";
import { QuickActions } from "./_components/QuickActions";
import { RowActionMenu } from "./_components/RowActionMenu";
import AddDepartmentModal from "./_components/AddDepartmentModal";
import FilterDialog from "./_components/FilterDialog";
import { fetchDepartments, filterDepartments } from "./_components/api";
import FilterButton from "@/components/common/filter-button";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";

interface Department {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  createdOn: string;
  addedBy: string;
}

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch initial department list
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    const res = await fetchDepartments();
    setDepartments(res);
    setLoading(false);
  };

  // Apply Filters
  const handleApplyFilters = async (filterValues: any) => {
    setLoading(true);
    const filtered = await filterDepartments(filterValues);
    setDepartments(filtered);
    setLoading(false);
  };

  // Table Columns
  const columns = [
    {
      key: "id",
      label: "Sr.No",
      render: (row: Department) => row.id,
      className: "w-[60px] text-center",
    },
    {
      key: "name",
      label: "Department Name",
      render: (row: Department) => (
        <span className="font-medium text-gray-700">{row.name}</span>
      ),
    },
    {
      key: "status",
      label: "Department Status",
      render: (row: Department) => (
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
      render: (row: Department) => (
        <span className="text-gray-600">{row.createdOn}</span>
      ),
    },
    {
      key: "addedBy",
      label: "Added By",
      render: (row: Department) => (
        <span className="text-gray-700">{row.addedBy}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row: Department) => (
        <RowActionMenu
          onEdit={() => console.log("Edit:", row)}
          onDelete={() => console.log("Delete:", row)}
        />
      ),
      className: "text-center w-[80px]",
    },
  ];

  return (
    <>
      <div className="py-6 px-3 md:px-6 min-h-screen space-y-8">
        {/* Page Title */}
        <PageHeader title="Departments" />

        {/* Card */}
        <div className="bg-white p-5 rounded-md shadow-sm space-y-5">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4">
            <div className="flex items-center gap-3">
              <FilterButton onClick={() => setIsFilterOpen(true)} />

              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search departments..."
              />

              <QuickActions />

              <NewButton
                handleClick={() => setIsAddModalOpen(true)}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Table */}
          {/* <DataTable
            columns={columns}
            data={
              search
                ? departments.filter((d) =>
                    d.name.toLowerCase().includes(search.toLowerCase())
                  )
                : departments
            }
            loading={loading}
            striped
          /> */}
          <ResponsiveDataTable
            columns={columns}
            data={
              search
                ? departments.filter((d) =>
                  d.name.toLowerCase().includes(search.toLowerCase())
                )
                : departments
            }
            loading={loading}
            striped
          />

        </div>
      </div>

      {/* Add Modal */}
      <AddDepartmentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Filter Modal */}
      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        isLoading={loading}
      />
    </>
  );
}
