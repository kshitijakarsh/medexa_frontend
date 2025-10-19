"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { EllipsisVertical, Loader2 } from "lucide-react"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"
import { FilterInput } from "@/components/filter-input"
import { LocaleLink } from "@/components/locale-link"
import { createTenantApiClient, type Tenant } from "@/lib/api/tenant"

const getStatusBadgeVariant = (status: string) => {
  const statusLower = status.toLowerCase()
  switch (statusLower) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "inactive":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "suspended":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function HospitalsTable({ dict }: { dict: DictionaryType }) {
  const t = dict.pages.hospitals.table
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"

  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalData, setTotalData] = useState(0)

  const fetchTenants = async (page: number = 1, search: string = "") => {
    setLoading(true)
    setError(null)

    try {
      const tenantApiClient = createTenantApiClient({ authToken: "" })
      const response = await tenantApiClient.getTenants({
        page,
        limit: 10,
        search: search || undefined,
      })

      setTenants(response.data.data)
      setTotalPages(response.data.pagination.totalPages)
      setTotalData(response.data.pagination.totalData)
      setCurrentPage(response.data.pagination.page)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch hospitals"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTenants(currentPage, searchQuery)
  }, [currentPage])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
    fetchTenants(1, value)
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{t.activeHospitals}</h2>
        <div className="flex items-center gap-4">
          <FilterInput
            placeholder={t.searchPlaceholder}
            onValueChange={handleSearch}
          />
          <Button
            className=" bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            asChild
          >
            <LocaleLink href="/create-hospital">{t.onboardNew}</LocaleLink>
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <Table className="rounded">
        <TableHeader className="bg-background [&_tr]:border-none ">
          <TableRow className="bg-sidebar ">
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Hospital Name</TableHead>
            <TableHead className="text-white">Admin Name</TableHead>
            <TableHead  className="text-white">Email</TableHead>
            <TableHead  className="text-white">Status</TableHead>
            <TableHead className="text-right text-white" >Action</TableHead>
          </TableRow>
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading hospitals...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : tenants.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No hospitals found
              </TableCell>
            </TableRow>
          ) : (
            tenants.map((tenant) => (
              <TableRow
                key={tenant.id}
                className="odd:bg-[#F4FAFF] odd:hover:bg-muted/50 border-none hover:bg-transparent"
              >
                <TableCell className="py-2.5 font-medium">
                  {tenant.tenant_key || tenant.id}
                </TableCell>
                <TableCell className="py-2.5">{tenant.name_en}</TableCell>
                <TableCell className="py-2.5">
                  {tenant.primary_admin_name}
                </TableCell>
                <TableCell className="py-2.5">
                  {tenant.primary_admin_email}
                </TableCell>
                <TableCell className="py-2.5">
                  <Badge className={getStatusBadgeVariant(tenant.status)}>
                    {tenant.status.charAt(0).toUpperCase() +
                      tenant.status.slice(1).toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon-sm" variant="ghost">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {tenant.status.toLowerCase() === "pending" && (
                        <DropdownMenuItem asChild>
                          <LocaleLink
                            href={`/onboarding/modules?hospitalId=${tenant.id}`}
                          >
                            Get Onboarded
                          </LocaleLink>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {!loading && tenants.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {tenants.length} of {totalData} hospitals
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
