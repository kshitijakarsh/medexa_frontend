// // "use client"

// // import { useState } from "react"
// // import { Button } from "@workspace/ui/components/button"
// // import { Input } from "@workspace/ui/components/input"
// // import { MoveLeft, Plus, Search } from "lucide-react"
// // import { DataTable } from "@/components/common/data-table"
// // import { Header } from "@/components/header"

// // interface Department {
// //     id: number
// //     name: string
// //     status: "Active" | "Inactive"
// //     createdOn: string
// //     addedBy: string
// // }

// // export default function DepartmentsPage() {
// //     const [search, setSearch] = useState("")
// //     const [loading, setLoading] = useState(false)

// //     // Simulated API data
// //     const departments: Department[] = [
// //         {
// //             id: 1,
// //             name: "Neuro surgery",
// //             status: "Active",
// //             createdOn: "2025-09-27 19:30",
// //             addedBy: "Dr. Ahmed Al-Mansouri",
// //         },
// //         {
// //             id: 2,
// //             name: "Dental",
// //             status: "Active",
// //             createdOn: "2025-09-27 19:30",
// //             addedBy: "Dr. Ahmed Al-Mansouri",
// //         },
// //         {
// //             id: 3,
// //             name: "Urology",
// //             status: "Active",
// //             createdOn: "2025-09-27 19:30",
// //             addedBy: "Dr. Ahmed Al-Mansouri",
// //         },
// //         {
// //             id: 4,
// //             name: "Hematology",
// //             status: "Active",
// //             createdOn: "2025-09-27 19:30",
// //             addedBy: "Dr. Ahmed Al-Mansouri",
// //         },
// //     ]

// //     const columns = [
// //         {
// //             key: "id",
// //             label: "Sr.No",
// //             render: (row: Department) => row.id,
// //             className: "w-[60px] text-center",
// //         },
// //         {
// //             key: "name",
// //             label: "Department Name",
// //             render: (row: Department) => (
// //                 <span className="font-medium text-gray-700">{row.name}</span>
// //             ),
// //         },
// //         {
// //             key: "status",
// //             label: "Department Status",
// //             render: (row: Department) => (
// //                 <span
// //                     className={`font-semibold ${row.status === "Active" ? "text-green-500" : "text-red-500"
// //                         }`}
// //                 >
// //                     {row.status}
// //                 </span>
// //             ),
// //         },
// //         {
// //             key: "createdOn",
// //             label: "Created On",
// //             render: (row: Department) => (
// //                 <span className="text-gray-600">{row.createdOn}</span>
// //             ),
// //         },
// //         {
// //             key: "addedBy",
// //             label: "Added By",
// //             render: (row: Department) => (
// //                 <span className="text-gray-700">{row.addedBy}</span>
// //             ),
// //         },
// //         {
// //             key: "action",
// //             label: "Action",
// //             render: () => (
// //                 <div className="flex justify-center items-center">
// //                     <Button
// //                         variant="ghost"
// //                         size="icon"
// //                         className="hover:bg-gray-100 text-gray-600"
// //                     >
// //                         ⋮
// //                     </Button>
// //                 </div>
// //             ),
// //             className: "text-center w-[80px]",
// //         },
// //     ]

// //     return (
// //         <main className="min-h-svh w-full">
// //             <Header />
// //             <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
// //                 <h1 className="text-xl font-semibold text-gray-800"><span className="bg-blue-600 text-white x-2"><MoveLeft/></span> <span>Departments</span></h1>
// //                 <div className="space-y-4 bg-white p-4 rounded-md">
// //                     {/* Header Section */}
// //                     <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">

// //                         <div className="flex items-center gap-3">
// //                             {/* Search */}
// //                             <div className="relative">
// //                                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
// //                                 <Input
// //                                     placeholder="Search"
// //                                     className="pl-9 pr-3 py-2 w-[220px] rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
// //                                     value={search}
// //                                     onChange={(e) => setSearch(e.target.value)}
// //                                 />
// //                             </div>

// //                             {/* Quick Dropdown Placeholder */}
// //                             <Button
// //                                 variant="outline"
// //                                 className="text-gray-700 border-gray-300 hover:bg-gray-50"
// //                             >
// //                                 Quick
// //                             </Button>

// //                             {/* Add New Button */}
// //                             <Button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2">
// //                                 <Plus className="w-4 h-4" />
// //                                 Add New
// //                             </Button>
// //                         </div>
// //                     </div>

// //                     {/* Table */}
// //                     <DataTable
// //                         columns={columns}
// //                         data={departments}
// //                         loading={loading}
// //                         striped
// //                     />

// //                 </div>
// //             </div>
// //         </main>
// //     )
// // }



// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@workspace/ui/components/button"
// import { Input } from "@workspace/ui/components/input"
// import { MoveLeft, Plus, Search, Loader2 } from "lucide-react"
// import { DataTable } from "@/components/common/data-table"
// import { Header } from "@/components/header"
// import { useRouter } from "next/navigation"

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
//   const router = useRouter()

//   // 🔄 Simulated API call
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
//         {
//           id: 4,
//           name: "Hematology",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//         {
//           id: 5,
//           name: "Orthopedics",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//       ])
//       setLoading(false)
//     }, 1500)

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
//           className={`font-semibold ${
//             row.status === "Active" ? "text-green-500" : "text-red-500"
//           }`}
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
//     {
//       key: "action",
//       label: "Action",
//       render: () => (
//         <div className="flex justify-center items-center">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="hover:bg-gray-100 text-gray-600"
//           >
//             ⋮
//           </Button>
//         </div>
//       ),
//       className: "text-center w-[80px]",
//     },
//   ]

//   return (
//     <main className="min-h-svh w-full">
//       <Header />

//       {/* Background section */}
//       <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
//         {/* Page Title with Back Button */}
//         <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
//             onClick={() => router.back()}
//           >
//             <MoveLeft className="w-5 h-5" />
//           </Button>
//           <h1 className="text-xl font-semibold text-gray-800">Departments</h1>
//         </div>

//         {/* Content Card */}
//         <div className="space-y-4 bg-white p-5 rounded-md shadow-sm">
//           {/* Header Section */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
//             <div className="flex items-center gap-3">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search"
//                   className="pl-9 pr-3 py-2 w-[220px] rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Quick Dropdown Placeholder */}
//               <Button
//                 variant="outline"
//                 className="text-gray-700 border-gray-300 hover:bg-gray-50"
//               >
//                 Quick
//               </Button>

//               {/* Add New Button */}
//               <Button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 Add New
//               </Button>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="mt-2">
//             {/* {loading ? (
//               <div className="flex justify-center py-10">
//                 <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//               </div>
//             ) : ( */}
//               <DataTable
//                 columns={columns}
//                 data={departments}
//                 loading={loading}
//                 striped
//               />
//             {/* )} */}
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { MoveLeft, Plus, Search, Loader2 } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import AddDepartmentModal from "./_components/AddDepartmentModal"
import { QuickActionsMenu } from "./_components/QuickActionsMenu"
import { RowActionMenu } from "./_components/RowActionMenu"
import SearchInput from "@/components/common/search-input"
import { PageHeader } from "@/components/common/PageHeader"
import NewButton from "@/components/common/new-button"

interface Department {
  id: number
  name: string
  status: "Active" | "Inactive"
  createdOn: string
  addedBy: string
}

export default function DepartmentsPage() {
  const [search, setSearch] = useState("")
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const router = useRouter()

  // Simulated API call
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setDepartments([
        {
          id: 1,
          name: "Neuro surgery",
          status: "Active",
          createdOn: "2025-09-27 19:30",
          addedBy: "Dr. Ahmed Al-Mansouri",
        },
        {
          id: 2,
          name: "Dental",
          status: "Active",
          createdOn: "2025-09-27 19:30",
          addedBy: "Dr. Ahmed Al-Mansouri",
        },
        {
          id: 3,
          name: "Urology",
          status: "Active",
          createdOn: "2025-09-27 19:30",
          addedBy: "Dr. Ahmed Al-Mansouri",
        },
      ])
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

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
    // {
    //   key: "action",
    //   label: "Action",
    //   render: () => (
    //     <div className="flex justify-center items-center">
    //       <Button
    //         variant="ghost"
    //         size="icon"
    //         className="hover:bg-gray-100 text-gray-600"
    //       >
    //         ⋮
    //       </Button>
    //     </div>
    //   ),
    //   className: "text-center w-[80px]",
    // },
    {
      key: "action",
      label: "Action",
      render: (row: Department) => (
        <RowActionMenu
          onEdit={() => console.log("Edit", row.name)}
          onDelete={() => console.log("Delete", row.name)}
        />
      ),
      className: "text-center w-[80px]",
    }

  ]

  return (
    <main className="min-h-svh w-full">
      <Header />

      <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        {/* Title & Back */}
        {/* <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
            onClick={() => router.back()}
          >
            <MoveLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Departments</h1>
        </div> */}
        <PageHeader title="Departments" />

        {/* Card */}
        <div className="space-y-4 bg-white p-5 rounded-md shadow-sm">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
            <div className="flex items-center gap-3">
              {/* <div className="relative">
                
                <Input
                  placeholder="Search"
                  className="pr-9 pl-3 py-2 w-[220px] rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div> */}

              {/* Customized with a different icon, width, and placeholder */}
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search users..."
              // width="300px"
              // icon={<User className="h-4 w-4 text-gray-400" />}
              />

              {/* <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Quick
              </Button> */}
              <QuickActionsMenu />


              {/* <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New
              </Button> */}
              <NewButton handleClick={() => setIsAddModalOpen(true)} className="cursor-pointer" />
            </div>
          </div>

          {/* Table */}
          <div className="mt-2">
            <DataTable
              columns={columns}
              data={departments}
              loading={loading}
              striped
            />
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      <AddDepartmentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </main>
  )
}
