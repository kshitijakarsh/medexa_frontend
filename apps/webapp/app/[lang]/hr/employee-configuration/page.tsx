// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { SlidersHorizontal } from "lucide-react";
// import { Header } from "@/components/header";
// import { DataTable } from "@/components/common/data-table";
// import { QuickActionsMenu } from "./_components/QuickActionsMenu";
// import { RowActionMenu } from "./_components/RowActionMenu";
// import { FilterDialog } from "./_components/FilterDialog";
// import { AddDialog } from "./_components/AddDialog"; // ✅ New one we just made
// import SearchInput from "@/components/common/search-input";
// import NewButton from "@/components/common/new-button";
// import { getMockEmployees } from "./_components/api";
// import { PageHeader } from "@/components/common/PageHeader";
// import { useRouter } from "next/navigation";

// const employeeConfigurationSection = [
//   { key: "humanResources", label: "Human Resources" },
//   { key: "designation", label: "Designation Master" },
//   { key: "specialization", label: "Specialization" },
//   { key: "roles", label: "User Roles" },
// ];

// export default function EmployeeConfigurationPage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<
//     "humanResources" | "designation" | "specialization" | "roles"
//   >("humanResources");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//   const [filters, setFilters] = useState<any>({});

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setData(getMockEmployees(activeTab));
//       setLoading(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [activeTab]);

//   const getColumns = () => {
//     // Customize columns based on section
//     if (activeTab === "humanResources") {
//       return [
//         {
//           key: "humanResources",
//           label: "Human Resources",
//           render: (row: any) => (
//             <div className="flex items-center gap-3">
//               <img
//                 src={row.avatar}
//                 alt={row.name}
//                 className="w-10 h-10 rounded-full border border-gray-200"
//               />
//               <div>
//                 <p className="font-medium text-gray-800">{row.name}</p>
//                 <p className="text-xs text-gray-500">{row.id}</p>
//               </div>
//             </div>
//           ),
//         },
//         {
//           key: "designation",
//           label: "Designation",
//           render: (row: any) => row.designation,
//         },
//         { key: "department", label: "Department", render: (row: any) => row.department },
//         { key: "contact", label: "Contact", render: (row: any) => row.contact },
//         { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
//         { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
//         {
//           key: "status",
//           label: "Status",
//           render: (row: any) => (
//             <span className={row.status === "Active" ? "text-green-600" : "text-red-500"}>
//               {row.status}
//             </span>
//           ),
//         },
//         {
//           key: "action",
//           label: "Action",
//           render: (row: any) => (
//             <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />
//           ),
//           className: "text-center w-[80px]",
//         },
//       ];
//     } else {
//       // ✅ For designation / specialization / roles
//       return [
//         { key: "name", label: activeTab === "roles" ? "User Role" : "Name", render: (r: any) => r.name },
//         { key: "status", label: "Billing Status", render: (r: any) => (
//             <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>
//               {r.status}
//             </span>
//           )},
//         { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
//         { key: "addedBy", label: "Added By", render: (r: any) => r.addedBy },
//         {
//           key: "action",
//           label: "Action",
//           render: (r: any) => (
//             <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />
//           ),
//           className: "text-center w-[80px]",
//         },
//       ];
//     }
//   };

//   // ✅ New handler
//   const handleNew = () => {
//     if (activeTab === "humanResources") {
//       router.push("/employee-configuration/add");
//     } else {
//       setIsAddDialogOpen(true);
//     }
//   };

//   // ✅ On save — just push new mock record into the table (temporary)
//   const handleSave = (values: any) => {
//     const newRow = {
//       id: data.length + 1,
//       name: values.name,
//       status: values.active ? "Active" : "Inactive",
//       createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
//       addedBy: "Dr. Ahmed Al-Mansouri",
//     };
//     setData((prev) => [...prev, newRow]);
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <Header />

//       <div className="p-5 space-y-8">
//         <PageHeader title="Employee Configuration" />

//         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
//           {/* Tabs and Actions */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex flex-wrap gap-2">
//               {employeeConfigurationSection.map((tab) => (
//                 <Button
//                   key={tab.key}
//                   type="button"
//                   onClick={() => setActiveTab(tab.key as any)}
//                   className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer ${
//                     activeTab === tab.key
//                       ? "bg-blue-600 text-white hover:bg-blue-600"
//                       : "bg-white text-gray-600 hover:bg-blue-100"
//                   }`}
//                 >
//                   {tab.label}
//                 </Button>
//               ))}
//             </div>

//             {/* Right Side Controls */}
//             <div className="flex items-center gap-3">
//               <Button
//                 onClick={() => setIsFilterDialogOpen(true)}
//                 variant="outline"
//                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//               >
//                 Filter
//                 <SlidersHorizontal className="w-5 h-5" />
//               </Button>
//               <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
//               <QuickActionsMenu />
//               <NewButton handleClick={handleNew} />
//             </div>
//           </div>

//           {/* Table */}
//           <DataTable columns={getColumns()} data={data} loading={loading} striped />
//         </div>
//       </div>

//       {/* ✅ Dialog */}
//       <AddDialog
//         open={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         mode={activeTab}
//         onSave={handleSave}
//       />

//       <FilterDialog
//         open={isFilterDialogOpen}
//         onClose={() => setIsFilterDialogOpen(false)}
//         mode={activeTab}
//         onApply={(values) => setFilters(values)}
//         isLoading={false}
//       />
//     </main>
//   );
// }

"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@workspace/ui/components/button"
import { SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { DataTable } from "@/components/common/data-table"
import { QuickActions } from "./_components/QuickActionsMenu"
import { EmployeeConfigurationRowActions } from "./_components/EmployeeConfigurationRowActions"
import { FilterDialog } from "./_components/FilterDialog"
import { AddDialog } from "./_components/AddDialog"
import { EditSpecializationDialog } from "./_components/EditSpecializationDialog"
import { EditRoleDialog } from "./_components/EditRoleDialog"
import { EditDesignationDialog } from "./_components/EditDesignationDialog"
import SearchInput from "@/components/common/search-input"
import NewButton from "@/components/common/new-button"
import { getMockEmployees } from "./_components/api"
import { PageHeader } from "@/components/common/page-header"
import { useRouter } from "next/navigation"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createSpecialisationApiClient } from "@/lib/api/specialisations"
import type { Specialisation } from "@/lib/api/specialisations"
import { createRoleApiClient } from "@/lib/api/roles"
import type { Role } from "@/lib/api/roles"
import { createDesignationApiClient } from "@/lib/api/designations"
import type { Designation } from "@/lib/api/designations"
import { createEmployeeApiClient } from "@/lib/api/employees"
import { getAuthToken } from "@/app/utils/onboarding"
import { useUserStore } from "@/store/useUserStore"
import { PERMISSIONS } from "@/app/utils/permissions"
import FilterButton from "@/components/common/filter-button"
import { Can } from "@/components/common/app-can"

const employeeConfigurationSection = [
  { key: "humanResources", label: "Employee" },
  { key: "designation", label: "Designation Master" },
  { key: "specialization", label: "Specialization" },
  { key: "roles", label: "User Roles" },
]
const PERMISSION_MAP = {
  humanResources: PERMISSIONS.EMPLOYEE,
  designation: PERMISSIONS.DESIGNATION,
  specialization: PERMISSIONS.SPECIALISATION,
  roles: PERMISSIONS.ROLE,
};


export default function EmployeeConfigurationPage() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const router = useRouter()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<
    "humanResources" | "designation" | "specialization" | "roles"
  >("humanResources")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [filters, setFilters] = useState<any>({})
  const [editingSpecialization, setEditingSpecialization] =
    useState<Specialisation | null>(null)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [editingDesignation, setEditingDesignation] =
    useState<Designation | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [isEditDesignationDialogOpen, setIsEditDesignationDialogOpen] =
    useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [debouncedSearch, setDebouncedSearch] = useState("")


  /* ---------------------------------------
        FILTER TABS AS PER PEMISSION
  ---------------------------------------- */
  // const filteredTabs = Tabs.filter((t) => {
  //   const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP]
  //   return perm?.VIEW ? userPermissions?.includes(perm.VIEW) : true
  // })
  const permissionStrings =
    (userPermissions?.map((p: any) => typeof p === "string" ? p : p.name) ?? []);

  const filteredTabs = employeeConfigurationSection.filter((t) => {
    const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP];
    return perm?.VIEW ? permissionStrings.includes(perm.VIEW) : false;
  });



  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // Reset to first page on search
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filters.status])

  // Get auth token for API calls
  const [authToken, setAuthToken] = useState<string>("")

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAuthToken()
        setAuthToken(token)
      } catch (error) {
        console.error("Failed to get auth token:", error)
      }
    }
    fetchToken()
  }, [])

  // React Query for specialisations
  const specialisationClient = useMemo(() => {
    if (!authToken) return null
    return createSpecialisationApiClient({ authToken })
  }, [authToken])

  // React Query for roles
  const roleClient = useMemo(() => {
    if (!authToken) return null
    return createRoleApiClient({ authToken })
  }, [authToken])

  // React Query for designations
  const designationClient = useMemo(() => {
    if (!authToken) return null
    return createDesignationApiClient({ authToken })
  }, [authToken])

  // React Query for employees
  const employeeClient = useMemo(() => {
    if (!authToken) return null
    return createEmployeeApiClient({ authToken })
  }, [authToken])

  const {
    data: specialisationsData,
    isLoading: isLoadingSpecialisations,
    error: specialisationsError,
  } = useQuery({
    queryKey: ["specialisations", page, limit, filters.status, debouncedSearch],
    queryFn: async () => {
      if (!specialisationClient) throw new Error("API client not initialized")
      const response = await specialisationClient.getSpecialisations({
        page,
        limit,
        status: filters.status as "active" | "inactive" | undefined,
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
      })
      return response.data
    },
    enabled: activeTab === "specialization" && !!specialisationClient,
  })

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useQuery({
    queryKey: ["roles", page, limit, filters.status, debouncedSearch],
    queryFn: async () => {
      if (!roleClient) throw new Error("API client not initialized")
      const response = await roleClient.getRoles({
        page,
        limit,
        status: filters.status as "active" | "inactive" | undefined,
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
      })
      return response.data
    },
    enabled: activeTab === "roles" && !!roleClient,
  })

  const {
    data: designationsData,
    isLoading: isLoadingDesignations,
    error: designationsError,
  } = useQuery({
    queryKey: ["designations", page, limit, debouncedSearch],
    queryFn: async () => {
      if (!designationClient) throw new Error("API client not initialized")
      const response = await designationClient.getDesignations({
        page,
        limit,
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
      })
      return response.data
    },
    enabled: activeTab === "designation" && !!designationClient,
  })

  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    error: employeesError,
  } = useQuery({
    queryKey: ["employees", page, limit, filters.status, debouncedSearch],
    queryFn: async () => {
      if (!employeeClient) throw new Error("API client not initialized")
      const response = await employeeClient.getEmployees({
        page,
        limit,
        status: filters.status as "active" | "inactive" | undefined,
        search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
      })
      return response.data
    },
    enabled: activeTab === "humanResources" && !!employeeClient,
  })

  // Create mutation for specialisations
  const createMutation = useMutation({
    mutationFn: async (items: Array<{ name: string; active: boolean }>) => {
      if (!specialisationClient) throw new Error("API client not initialized")
      const promises = items.map((item) =>
        specialisationClient.createSpecialisation({
          name: item.name,
          status: item.active ? "active" : "inactive",
        })
      )
      await Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialisations"] })
    },
  })

  // Create mutation for roles
  const createRoleMutation = useMutation({
    mutationFn: async (item: { name: string; active: boolean }) => {
      if (!roleClient) throw new Error("API client not initialized")
      await roleClient.createRole({
        name: item.name,
        status: item.active ? "active" : "inactive",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })

  // Create mutation for designations
  const createDesignationMutation = useMutation({
    mutationFn: async (items: Array<{ name: string }>) => {
      if (!designationClient) throw new Error("API client not initialized")
      const promises = items.map((item) =>
        designationClient.createDesignation({
          name: item.name,
        })
      )
      await Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] })
    },
  })

  // Update mutation for specialisations
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      active,
    }: {
      id: number
      name: string
      active: boolean
    }) => {
      if (!specialisationClient) throw new Error("API client not initialized")
      await specialisationClient.updateSpecialisation(id, {
        name,
        status: active ? "active" : "inactive",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialisations"] })
    },
  })

  // Update mutation for roles
  const updateRoleMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      active,
    }: {
      id: number
      name: string
      active: boolean
    }) => {
      if (!roleClient) throw new Error("API client not initialized")
      await roleClient.updateRole(id, {
        name,
        status: active ? "active" : "inactive",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })

  // Update mutation for designations
  const updateDesignationMutation = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      if (!designationClient) throw new Error("API client not initialized")
      await designationClient.updateDesignation(id, {
        name,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] })
    },
  })

  // Delete mutation for specialisations
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!specialisationClient) throw new Error("API client not initialized")
      await specialisationClient.deleteSpecialisation(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialisations"] })
    },
  })

  // Delete mutation for roles
  const deleteRoleMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!roleClient) throw new Error("API client not initialized")
      await roleClient.deleteRole(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })

  // Delete mutation for designations
  const deleteDesignationMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!designationClient) throw new Error("API client not initialized")
      await designationClient.deleteDesignation(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] })
    },
  })

  // Delete mutation for employees
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!employeeClient) throw new Error("API client not initialized")
      await employeeClient.deleteEmployee(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })

  // Map employees data to table format
  useEffect(() => {
    if (activeTab === "humanResources" && employeesData) {
      const mappedData = employeesData.data.map((item, index) => {
        const date = item.created_at ? new Date(item.created_at) : new Date()
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`

        return {
          id: item.id,
          name: `${item.first_name} ${item.last_name}`,
          designation: item.designation_id?.toString() || "N/A",
          department: item.department_id?.toString() || "N/A",
          contact: item.phone || "N/A",
          createdOn: formattedDate,
          addedBy: item.created_by ? `User ${item.created_by}` : "N/A",
          status: item.status === "active" ? "Active" : "Inactive",
          avatar:
            item.employee_photo ||
            "https://i.pravatar.cc/100?img=" + (index + 1),
          _raw: item, // Store raw data for mutations
        }
      })
      setData(mappedData)
      setLoading(false)
    } else if (
      activeTab !== "specialization" &&
      activeTab !== "roles" &&
      activeTab !== "designation" &&
      activeTab !== "humanResources"
    ) {
      setLoading(false)
    }
  }, [employeesData, activeTab, page, limit])

  // Map specialisations data to table format
  useEffect(() => {
    if (activeTab === "specialization" && specialisationsData) {
      const mappedData = specialisationsData.data.map((item, index) => {
        const date = new Date(item.created_at)
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`

        return {
          sno: (page - 1) * limit + index + 1,
          id: item.id,
          name: item.name,
          status: item.status === "active" ? "Active" : "Inactive",
          createdOn: formattedDate,
          addedBy: `User ${item.created_by}`,
          _raw: item, // Store raw data for mutations
        }
      })
      setData(mappedData)
      setLoading(false)
    }
  }, [specialisationsData, activeTab, page, limit])

  // Map roles data to table format
  useEffect(() => {
    if (activeTab === "roles" && rolesData) {
      const mappedData = rolesData.data.map((item, index) => {
        const date = new Date(item.created_at)
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`

        return {
          sno: (page - 1) * limit + index + 1,
          id: item.id,
          name: item.name,
          status: item.status === "active" ? "Active" : "Inactive",
          createdOn: formattedDate,
          addedBy: `User ${item.created_by}`,
          _raw: item, // Store raw data for mutations
        }
      })
      setData(mappedData)
      setLoading(false)
    }
  }, [rolesData, activeTab, page, limit])

  // Map designations data to table format
  useEffect(() => {
    if (activeTab === "designation" && designationsData) {
      const mappedData = designationsData.data.map((item, index) => {
        const date = new Date(item.created_at)
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`

        return {
          sno: (page - 1) * limit + index + 1,
          id: item.id,
          name: item.name,
          status: "Active", // API doesn't have status field, defaulting to Active
          createdOn: formattedDate,
          addedBy: `User ${item.created_by}`,
          _raw: item, // Store raw data for mutations
        }
      })
      setData(mappedData)
      setLoading(false)
    }
  }, [designationsData, activeTab, page, limit])

  const getColumns = () => {
    // 👩‍⚕️ Human Resources section stays same
    if (activeTab === "humanResources") {
      return [
        {
          key: "humanResources",
          label: "Human Resources",
          render: (row: any) => (
            <div className="flex items-center gap-3">
              <img
                src={row.avatar}
                alt={row.name}
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <div>
                <p className="font-medium text-gray-800">{row.name}</p>
                <p className="text-xs text-gray-500">{row.id}</p>
              </div>
            </div>
          ),
        },
        {
          key: "designation",
          label: "Designation",
          render: (row: any) => row.designation,
        },
        {
          key: "department",
          label: "Department",
          render: (row: any) => row.department,
        },
        { key: "contact", label: "Contact", render: (row: any) => row.contact },
        {
          key: "createdOn",
          label: "Created On",
          render: (row: any) => row.createdOn,
        },
        {
          key: "addedBy",
          label: "Added By",
          render: (row: any) => row.addedBy,
        },
        {
          key: "status",
          label: "Status",
          render: (row: any) => (
            <span
              className={
                row.status === "Active" ? "text-green-600" : "text-red-500"
              }
            >
              {row.status}
            </span>
          ),
        },
        {
          key: "action",
          label: "Action",
          render: (r: any) => (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/employee-configuration/${r.id}`)}
                className="text-blue-600 hover:text-blue-700"
              >
                View
              </Button>
              <EmployeeConfigurationRowActions
                onEdit={() => {
                  if (r._raw) {
                    router.push(`/employee-configuration/${r._raw.id}/edit`)
                  }
                }}
                onDelete={() => {
                  if (
                    r._raw &&
                    confirm("Are you sure you want to delete this employee?")
                  ) {
                    deleteEmployeeMutation.mutate(r._raw.id)
                  }
                }}
                userPermissions={userPermissions}
                mode={activeTab}
              />
            </div>
          ),
          className: "text-center w-[80px]",
        },
      ]
    }

    // 🧾 For Designation / Specialization / Roles
    return [
      {
        key: "sno",
        label: "S.No",
        render: (r: any) => <span>{r.sno}</span>,
        className: "text-center w-[60px]",
      },
      {
        key: "name",
        label:
          activeTab === "roles"
            ? "User Role"
            : activeTab === "specialization"
              ? "Specialization"
              : activeTab === "designation"
                ? "Designation Name"
                : "Name",
        render: (r: any) => (
          <span className="text-gray-800 font-medium">{r.name}</span>
        ),
      },
      {
        key: "status",
        label: "Billing Status",
        render: (r: any) => (
          <span
            className={
              r.status === "Active" ? "text-green-600" : "text-red-500"
            }
          >
            {r.status}
          </span>
        ),
        className: "w-[80px]",
      },
      {
        key: "createdOn",
        label: "Created On",
        render: (r: any) => r.createdOn,
        className: "w-[80px]",
      },
      {
        key: "addedBy",
        label: "Added By",
        render: (r: any) => r.addedBy,
        className: "max-w-[100px] min-w-[80px] ",
      },
      {
        key: "action",
        label: "Action",
        render: (r: any) => (
          <EmployeeConfigurationRowActions
            onEdit={() => {
              if (activeTab === "specialization" && r._raw) {
                setEditingSpecialization(r._raw)
                setIsEditDialogOpen(true)
              } else if (activeTab === "roles" && r._raw) {
                setEditingRole(r._raw)
                setIsEditRoleDialogOpen(true)
              } else if (activeTab === "designation" && r._raw) {
                setEditingDesignation(r._raw)
                setIsEditDesignationDialogOpen(true)
              }
            }}
            onDelete={() => {
              if (activeTab === "specialization" && r._raw) {
                if (
                  confirm(
                    "Are you sure you want to delete this specialization?"
                  )
                ) {
                  deleteMutation.mutate(r._raw.id)
                }
              } else if (activeTab === "roles" && r._raw) {
                if (confirm("Are you sure you want to delete this role?")) {
                  deleteRoleMutation.mutate(r._raw.id)
                }
              } else if (activeTab === "designation" && r._raw) {
                if (
                  confirm("Are you sure you want to delete this designation?")
                ) {
                  deleteDesignationMutation.mutate(r._raw.id)
                }
              }
            }}
            userPermissions={userPermissions}
            mode={activeTab}
          />
        ),
        className: "text-center w-[80px]",
      },
    ]
  }

  const handleNew = () => {
    if (activeTab === "humanResources") {
      router.push("/employee-configuration/add")
    } else {
      setIsAddDialogOpen(true)
    }
  }

  const handleSave = async (values: any[]) => {
    if (activeTab === "specialization") {
      await createMutation.mutateAsync(values)
    } else if (activeTab === "roles") {
      // Roles only accepts single entry (first item)
      if (values.length > 0) {
        await createRoleMutation.mutateAsync(values[0])
      }
    } else if (activeTab === "designation") {
      // Designations only accept name field (no status)
      const designationValues = values.map((v) => ({ name: v.name }))
      await createDesignationMutation.mutateAsync(designationValues)
    } else {
      // Mock data for other tabs
      const newEntries = values.map((v, idx) => ({
        id: data.length + idx + 1,
        name: v.name,
        status: v.active ? "Active" : "Inactive",
        createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
        addedBy: "Dr. Ahmed Al-Mansouri",
      }))
      setData((prev) => [...prev, ...newEntries])
    }
  }

  const handleEditSave = async (values: { name: string; active: boolean }) => {
    if (!editingSpecialization) return
    await updateMutation.mutateAsync({
      id: editingSpecialization.id,
      name: values.name,
      active: values.active,
    })
    setIsEditDialogOpen(false)
    setEditingSpecialization(null)
  }

  const handleEditRoleSave = async (values: {
    name: string
    active: boolean
  }) => {
    if (!editingRole) return
    await updateRoleMutation.mutateAsync({
      id: editingRole.id,
      name: values.name,
      active: values.active,
    })
    setIsEditRoleDialogOpen(false)
    setEditingRole(null)
  }

  const handleEditDesignationSave = async (values: { name: string }) => {
    if (!editingDesignation) return
    await updateDesignationMutation.mutateAsync({
      id: editingDesignation.id,
      name: values.name,
    })
    setIsEditDesignationDialogOpen(false)
    setEditingDesignation(null)
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-8">
        <PageHeader title="Human Resources" />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Tabs and Actions */}
          {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <DynamicTabs
                            tabs={employeeConfigurationSection}
                            defaultTab="humanResources"
                            onChange={(tabKey) => setActiveTab(tabKey as any)}
                        /> */}

          {/* Right Side Controls */}
          {/* <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setIsFilterDialogOpen(true)}
                                variant="outline"
                                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Filter
                                <SlidersHorizontal className="w-5 h-5" />
                            </Button>
                            <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
                            <QuickActionsMenu />
                            <NewButton handleClick={handleNew} />
                        </div>
                    </div> */}

          {/* Tabs + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <DynamicTabs
                tabs={filteredTabs}
                defaultTab="humanResources"
                onChange={(tabKey) => setActiveTab(tabKey as any)}
              />
            </div>

            {/* Right Side Controls */}
            {/* <div
              className="
        flex flex-wrap items-center justify-start lg:justify-end
        gap-3 flex-1
      "
            > */}
            <div className="flex gap-3">
              {/* Filter */}
              {/* <Button
                onClick={() => setIsFilterDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filter</span>
              </Button> */}
              <FilterButton onClick={() => setIsFilterDialogOpen(true)} />

              {/* Search Input */}
              {/* <div className="flex-grow min-w-[180px] sm:min-w-[220px] md:min-w-[260px]"> */}
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search..."
              />
              {/* </div> */}

              {/* Quick Actions */}
              <QuickActions />
              <Can
                permission={PERMISSION_MAP[activeTab as keyof typeof PERMISSION_MAP]?.CREATE}
                userPermissions={userPermissions}
              >
                {/* New Button */}
                <div className="ml-auto w-full sm:w-auto flex justify-end">
                  <NewButton handleClick={handleNew} />
                </div>
              </Can>

            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={getColumns()}
            data={data}
            loading={
              loading ||
              isLoadingSpecialisations ||
              isLoadingRoles ||
              isLoadingDesignations ||
              isLoadingEmployees
            }
            error={
              specialisationsError
                ? specialisationsError instanceof Error
                  ? specialisationsError.message
                  : "Failed to load specialisations"
                : rolesError
                  ? rolesError instanceof Error
                    ? rolesError.message
                    : "Failed to load roles"
                  : designationsError
                    ? designationsError instanceof Error
                      ? designationsError.message
                      : "Failed to load designations"
                    : employeesError
                      ? employeesError instanceof Error
                        ? employeesError.message
                        : "Failed to load employees"
                      : null
            }
            pagination={
              (activeTab === "specialization" &&
                specialisationsData?.pagination) ||
                (activeTab === "roles" && rolesData?.pagination) ||
                (activeTab === "designation" && designationsData?.pagination) ||
                (activeTab === "humanResources" && employeesData?.pagination)
                ? (() => {
                  const paginationData =
                    activeTab === "specialization"
                      ? specialisationsData?.pagination
                      : activeTab === "roles"
                        ? rolesData?.pagination
                        : activeTab === "designation"
                          ? designationsData?.pagination
                          : employeesData?.pagination
                  if (!paginationData) return null
                  return (
                    <div className="flex items-center justify-between pb-4 px-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {data.length} of{" "}
                        {paginationData.totalData}{" "}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1 || loading}
                        >
                          Previous
                        </Button>
                        <div className="text-sm">
                          Page {page} of {paginationData.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setPage((p) =>
                              Math.min(paginationData.totalPages, p + 1)
                            )
                          }
                          disabled={
                            page === paginationData.totalPages || loading
                          }
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )
                })()
                : undefined
            }
            striped
          />
        </div>
      </div>

      {/* ✅ Add Dialog */}
      <AddDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode={activeTab as "designation" | "specialization" | "roles"}
        onSave={handleSave}
        isLoading={
          activeTab === "specialization"
            ? createMutation.isPending
            : activeTab === "roles"
              ? createRoleMutation.isPending
              : activeTab === "designation"
                ? createDesignationMutation.isPending
                : false
        }
      />

      {/* ✅ Edit Specialization Dialog */}
      <EditSpecializationDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingSpecialization(null)
        }}
        specialization={editingSpecialization}
        onSave={handleEditSave}
        isLoading={updateMutation.isPending}
      />

      {/* ✅ Edit Role Dialog */}
      <EditRoleDialog
        open={isEditRoleDialogOpen}
        onClose={() => {
          setIsEditRoleDialogOpen(false)
          setEditingRole(null)
        }}
        role={editingRole}
        onSave={handleEditRoleSave}
        isLoading={updateRoleMutation.isPending}
      />

      {/* ✅ Edit Designation Dialog */}
      <EditDesignationDialog
        open={isEditDesignationDialogOpen}
        onClose={() => {
          setIsEditDesignationDialogOpen(false)
          setEditingDesignation(null)
        }}
        designation={editingDesignation}
        onSave={handleEditDesignationSave}
        isLoading={updateDesignationMutation.isPending}
      />

      {/* ✅ Filter Dialog */}
      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        mode={activeTab}
        onApply={(values) => setFilters(values)}
        isLoading={false}
      />
    </main>
  )
}
