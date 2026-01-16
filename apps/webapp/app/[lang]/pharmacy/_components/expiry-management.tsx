"use client"

import { useState } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Package, AlertTriangle, XCircle, Archive, Search, MoreVertical, Eye } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { useBatches } from "../_hooks/useBatch"
import { Batch } from "@/lib/api/batch-api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export function ExpiryManagement() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filterTab, setFilterTab] = useState<"all" | "quarantined" | "returned" | "disposed">("all")

  // Fetch all batches - filter will be applied client-side or via API params
  const { data, isLoading } = useBatches({ 
    page, 
    limit: 10,
    // You can add status filter here when API supports it
    // status: filterTab !== "all" ? filterTab : undefined,
  })

  const batches: Batch[] = data?.data ?? []

  // Filter batches based on active tab
  const filteredBatches = batches.filter(batch => {
    // Apply search filter
    if (search && !batch.batch_number.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // Apply tab filter
    if (filterTab === "quarantined") {
      // Filter for quarantined batches
      return batch.status === "quarantined"
    }
    
    if (filterTab === "returned") {
      // Assuming there's a status field or similar
      return batch.status === "returned"
    }
    
    if (filterTab === "disposed") {
      return batch.status === "disposed"
    }
    
    return true // "all" tab
  })

  // Use KPIs from API response, fallback to calculated values
  const totalBatches = data?.kpis?.totalBatches ?? batches.length
  const quarantinedCount = data?.kpis?.quarantined ?? batches.filter(b => b.status === "quarantined").length
  const returnedCount = data?.kpis?.returned ?? batches.filter(b => b.status === "returned").length
  const disposedCount = data?.kpis?.disposed ?? batches.filter(b => b.status === "disposed").length

  const calculateDaysToExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getApiStatusBadge = (status?: string) => {
    if (!status) return null
    
    const statusConfig: Record<string, { className: string; label: string }> = {
      active: { className: "bg-green-100 text-green-700 hover:bg-green-100", label: "Active" },
      inactive: { className: "bg-gray-100 text-gray-700 hover:bg-gray-100", label: "Inactive" },
      quarantined: { className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100", label: "Quarantined" },
      disposed: { className: "bg-gray-100 text-gray-700 hover:bg-gray-100", label: "Disposed" },
      returned: { className: "bg-blue-100 text-blue-700 hover:bg-blue-100", label: "Returned" },
    }
    
    const config = statusConfig[status] ?? { className: "bg-gray-100 text-gray-700", label: status.toUpperCase() }
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getExpiryStatusBadge = (expiryDate: string, status?: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    
    if (expiry < now) {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Expired</Badge>
    }
    if (expiry <= threeMonthsFromNow) {
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Expiring Soon</Badge>
    }
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Valid</Badge>
  }

  const columns = [
    {
      key: "batch_number",
      label: "Batch",
      render: (row: Batch) => {
        const initials = row.batch_number.substring(0, 2).toUpperCase()
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{row.batch_number}</div>
              <div className="text-xs text-gray-500">ID: {row.id}</div>
            </div>
          </div>
        )
      },
    },
    {
      key: "medicine",
      label: "Medicine",
      render: (row: Batch) => (
        <div>
          <div className="font-medium text-gray-900">{row.medicine?.medicine || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.medicine?.type || ''}</div>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (row: Batch) => (
        <span className="font-semibold text-gray-900">{row.quantity}</span>
      ),
    },
    {
      key: "expiry_date",
      label: "Expiry Date",
      render: (row: Batch) => {
        const daysToExpiry = calculateDaysToExpiry(row.expiry_date)
        return (
          <div>
            <div className="font-medium text-gray-900">{new Date(row.expiry_date).toLocaleDateString()}</div>
            <div className="text-xs text-gray-500">
              {daysToExpiry > 0 ? `${daysToExpiry} days` : daysToExpiry === 0 ? 'Expires today' : `Expired`}
            </div>
          </div>
        )
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row: Batch) => (
        <div className="flex flex-col gap-1">
          {getApiStatusBadge(row.status)}
          {getExpiryStatusBadge(row.expiry_date)}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Batch) => (
        <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-blue-50">
          <Eye className="h-4 w-4 text-blue-600" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filterTab === "all" ? "default" : "outline"}
          onClick={() => setFilterTab("all")}
          className={filterTab === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          All
        </Button>
        <Button
          variant={filterTab === "quarantined" ? "default" : "outline"}
          onClick={() => setFilterTab("quarantined")}
          className={filterTab === "quarantined" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
        >
          Quarantined
          {quarantinedCount > 0 && (
            <Badge className="ml-2 bg-white text-yellow-600">{quarantinedCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "returned" ? "default" : "outline"}
          onClick={() => setFilterTab("returned")}
          className={filterTab === "returned" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Returned
          {returnedCount > 0 && (
            <Badge className="ml-2 bg-white text-blue-600">{returnedCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "disposed" ? "default" : "outline"}
          onClick={() => setFilterTab("disposed")}
          className={filterTab === "disposed" ? "bg-gray-600 hover:bg-gray-700" : ""}
        >
          Disposed
          {disposedCount > 0 && (
            <Badge className="ml-2 bg-white text-gray-600">{disposedCount}</Badge>
          )}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Batches</div>
              <div className="text-2xl font-bold">{totalBatches}</div>
              <div className="text-xs text-blue-600">All inventory</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Quarantined</div>
              <div className="text-2xl font-bold">{quarantinedCount}</div>
              <div className="text-xs text-yellow-600">Under review</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Archive className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Returned</div>
              <div className="text-2xl font-bold">{returnedCount}</div>
              <div className="text-xs text-blue-600">Return requests</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <XCircle className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Disposed</div>
              <div className="text-2xl font-bold">{disposedCount}</div>
              <div className="text-xs text-gray-600">Disposal records</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batches Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Batch Expiry Management</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by batch number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredBatches}
            loading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
