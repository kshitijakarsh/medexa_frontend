"use client"

import { useState } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { FileText, Clock, CheckCircle, XCircle, Search, MoreVertical, Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { useRequests, useDeleteRequest } from "../_hooks/useRequest"
import { Request } from "@/lib/api/request-api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { RequestModal } from "./modals/request-modal"

export function ApprovalManagement() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "approved" | "rejected" | "completed">("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create")

  const deleteMutation = useDeleteRequest()

  // Fetch all requests
  const { data: responseData, isLoading } = useRequests({ 
    page, 
    limit: 10,
    status: filterTab !== "all" ? filterTab : undefined,
  })

  const requests: Request[] = Array.isArray(responseData?.data?.requests) ? responseData.data.requests : []

  // Filter requests based on active tab and search
  const filteredRequests = requests.filter(request => {
    // Apply search filter
    if (search && !request.request_number.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // Apply tab filter
    if (filterTab !== "all" && request.status !== filterTab) {
      return false
    }
    
    return true
  })

  // Calculate metrics from data
  const totalRequests = requests.length
  const pendingCount = requests.filter(r => r.status === "pending").length
  const approvedCount = requests.filter(r => r.status === "approved").length
  const rejectedCount = requests.filter(r => r.status === "rejected").length

  const handleCreateRequest = () => {
    setSelectedRequest(null)
    setModalMode("create")
    setModalOpen(true)
  }

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request)
    setModalMode("view")
    setModalOpen(true)
  }

  const handleEditRequest = (request: Request) => {
    setSelectedRequest(request)
    setModalMode("edit")
    setModalOpen(true)
  }

  const handleDeleteRequest = async (request: Request) => {
    if (confirm(`Are you sure you want to delete request ${request.request_number}?`)) {
      await deleteMutation.mutateAsync(request.id)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string; label: string }> = {
      pending: { className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100", label: "Pending" },
      approved: { className: "bg-green-100 text-green-700 hover:bg-green-100", label: "Approved" },
      rejected: { className: "bg-red-100 text-red-700 hover:bg-red-100", label: "Rejected" },
      completed: { className: "bg-blue-100 text-blue-700 hover:bg-blue-100", label: "Completed" },
    }

    const config = statusConfig[status] ?? statusConfig.pending
    return <Badge className={config?.className}>{config?.label}</Badge>
  }

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null

    const priorityConfig: Record<string, { className: string }> = {
      low: { className: "bg-gray-100 text-gray-700" },
      medium: { className: "bg-blue-100 text-blue-700" },
      high: { className: "bg-orange-100 text-orange-700" },
      urgent: { className: "bg-red-100 text-red-700" },
    }

    const config = priorityConfig[priority] ?? priorityConfig.medium
    return <Badge className={config?.className}>{priority.toUpperCase()}</Badge>
  }

  const columns = [
    {
      key: "request_number",
      label: "Request Number",
      render: (row: Request) => (
        <div>
          <div className="font-medium">{row.request_number}</div>
          <div className="text-xs text-gray-500">ID: {row.id}</div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row: Request) => (
        <span className="capitalize font-medium">{row.type}</span>
      ),
    },
    {
      key: "request_items",
      label: "Items",
      render: (row: Request) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="font-semibold">{row.request_items?.length || 0}</span>
          <span className="text-xs text-gray-500">batches</span>
        </div>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row: Request) => getPriorityBadge(row.priority),
    },
    {
      key: "request_date",
      label: "Request Date",
      render: (row: Request) => (
        <span>
          {row.request_date ? new Date(row.request_date).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Request) => getStatusBadge(row.status),
    },
    {
      key: "reason",
      label: "Reason",
      render: (row: Request) => (
        <div className="max-w-xs truncate" title={row.reason}>
          {row.reason || "N/A"}
        </div>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row: Request) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewRequest(row)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditRequest(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Request
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteRequest(row)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          variant={filterTab === "pending" ? "default" : "outline"}
          onClick={() => setFilterTab("pending")}
          className={filterTab === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
        >
          Pending
          {pendingCount > 0 && (
            <Badge className="ml-2 bg-white text-yellow-600">{pendingCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "approved" ? "default" : "outline"}
          onClick={() => setFilterTab("approved")}
          className={filterTab === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Approved
          {approvedCount > 0 && (
            <Badge className="ml-2 bg-white text-green-600">{approvedCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "rejected" ? "default" : "outline"}
          onClick={() => setFilterTab("rejected")}
          className={filterTab === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Rejected
          {rejectedCount > 0 && (
            <Badge className="ml-2 bg-white text-red-600">{rejectedCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "completed" ? "default" : "outline"}
          onClick={() => setFilterTab("completed")}
          className={filterTab === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Completed
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Requests</div>
              <div className="text-2xl font-bold">{totalRequests}</div>
              <div className="text-xs text-blue-600">All approvals</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Pending</div>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <div className="text-xs text-yellow-600">Awaiting review</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Approved</div>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <div className="text-xs text-green-600">Approved requests</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Rejected</div>
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <div className="text-xs text-red-600">Rejected requests</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Approval Requests</h3>
            <Button onClick={handleCreateRequest} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Request
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by request number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredRequests}
            loading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Request Modal */}
      <RequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        request={selectedRequest}
        mode={modalMode}
      />
    </div>
  )
}
