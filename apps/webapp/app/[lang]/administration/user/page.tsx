"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@workspace/ui/lib/sonner"
import { QuickActions } from "./_components/QuickActions"
import EmployeeRowActions from "./_components/EmployeeRowActions"
import FilterDialog from "./_components/FilterDialog"
import AddDialog from "./_components/AddDialog"
import EditDialog from "./_components/EditDialog"
import SearchInput from "@/components/common/search-input"
import NewButton from "@/components/common/new-button"
import { PageHeader } from "@/components/common/page-header"
import FilterButton from "@/components/common/filter-button"
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable"
import { PaginationControls } from "@/components/common/data-table/PaginationControls"
import { createUserApiClient } from "@/lib/api/administration/users"
import type { UserItem } from "@/lib/api/administration/users"

const limit = 10

interface TableUserRow {
  id: number
  role: string
  email: string
  phone: string
  status: "Active" | "Inactive"
  createdOn: string
  addedBy: string | null
}

function EmployeeConfigurationPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  /* ----------------------------------
          URL State
    ----------------------------------- */
  const initialPage = parseInt(searchParams.get("page") || "1")
  const [page, setPage] = useState(initialPage)

  /* Search */
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  /* Filters */
  const [filters, setFilters] = useState<{ status?: string; role?: string }>({})

  /* Dialogs */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)

  /* API Clients */
  const userApi = createUserApiClient({})

  /* Update URL on page change */
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("page", page.toString())
    router.replace(`?${params.toString()}`)
  }, [page, router])

  /* ----------------------------------
          Fetch Users (with search + filters) - Client-side pagination
    ----------------------------------- */
  const {
    data: usersData,
    isLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users", searchQuery, filters],
    queryFn: async () => {
      const response = await userApi.getUsers({
        search: searchQuery.length >= 2 ? searchQuery : undefined,
        status:
          filters.status === "Active"
            ? "active"
            : filters.status === "Inactive"
              ? "inactive"
              : undefined,
      })
      return response.data
    },
  })

  /* Client-side pagination */
  const allUsers = usersData?.data || []
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = allUsers.slice(startIndex, endIndex)
  const totalPages = Math.ceil(allUsers.length / limit)

  /* Map API response to table format */
  const usersMap = new Map<number, UserItem>()
  const tableData: TableUserRow[] = paginatedUsers.map((user: UserItem) => {
    usersMap.set(user.id, user)
    return {
      id: user.id,
      role: user.role?.name || "—",
      email: user.email,
      phone: user.phone,
      status: user.status === "active" ? "Active" : "Inactive",
      createdOn: new Date(user.created_at).toLocaleString(),
      addedBy: user.added_by ? String(user.added_by) : null,
    }
  })

  /* ----------------------------------
          Delete User Mutation
    ----------------------------------- */
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await userApi.deleteUser(id)
    },
    onSuccess: () => {
      toast.success("User deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete user")
    },
  })

  const handleDelete = (user: TableUserRow) => {
    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      deleteUserMutation.mutate(user.id.toString())
    }
  }

  const columns = [
    {
      key: "role",
      label: "Role",
      render: (r: TableUserRow) => (
        <span className="text-gray-800 font-medium">{r.role}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (r: TableUserRow) => <span>{r.email}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (r: TableUserRow) => <span>{r.phone}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (r: TableUserRow) => (
        <span
          className={r.status === "Active" ? "text-green-600" : "text-red-500"}
        >
          {r.status}
        </span>
      ),
      className: "w-[80px]",
    },
    {
      key: "createdOn",
      label: "Created On",
      render: (r: TableUserRow) => r.createdOn,
      className: "w-[140px]",
    },
    {
      key: "addedBy",
      label: "Added By",
      render: (r: TableUserRow) => r.addedBy ?? "—",
      className: "max-w-[140px] min-w-[100px]",
    },
    {
      key: "action",
      label: "Action",
      render: (r: TableUserRow) => (
        <EmployeeRowActions
          onEdit={() => {
            const user = usersMap.get(r.id)
            if (user) {
              setSelectedUser(user)
              setIsEditDialogOpen(true)
            }
          }}
          onDelete={() => handleDelete(r)}
        />
      ),
      className: "text-center w-[80px]",
    },
  ]

  const handleSave = (addedUsers: any[]) => {
    // Mutation is handled in AddDialog component
    // This callback is kept for compatibility
  }

  const handleApplyFilters = (f: any) => {
    setFilters(f)
    setPage(1) // Reset to first page when filters change
  }

  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title="User Management" />
        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          <div className="flex justify-end">
            <div className="flex flex-wrap items-center justify-end gap-3 w-full lg:w-auto">
              <FilterButton onClick={() => setIsFilterDialogOpen(true)} />

              <div className="min-w-[200px] md:min-w-[200px]">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  onSearch={setSearchQuery}
                  placeholder="Search by email, phone, role..."
                  minChars={2}
                />
              </div>

              <QuickActions />

              <NewButton handleClick={() => setIsAddDialogOpen(true)} />
            </div>
          </div>

          {usersError ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load users. Please try again.</p>
            </div>
          ) : (
            <>
              <ResponsiveDataTable
                columns={columns}
                data={tableData}
                loading={isLoading}
                striped
                pagination={
                  <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                }
              />
            </>
          )}
        </div>
      </div>

      <AddDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSave}
      />

      <EditDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
      />

      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  )
}

export default function EmployeeConfigurationPage() {
  return (
    <Suspense fallback={<div className="p-5">Loading...</div>}>
      <EmployeeConfigurationPageContent />
    </Suspense>
  )
}
