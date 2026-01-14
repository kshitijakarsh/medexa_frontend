"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { 
  Search, 
  Eye, 
  Trash2, 
  Package, 
  Calendar,
  DollarSign,
  User,
  Filter,
  Download,
  RefreshCw,
  ShoppingCart
} from "lucide-react"
import { useOrders, useDeleteOrder } from "../_hooks/useOrder"
import type { Order } from "@/lib/api/order-api"
import { DataTable } from "@/components/common/data-table"
import { ViewOrderModal } from "./modals/view-order-modal"
import { DeleteOrderModal } from "./modals/delete-order-modal"

export function Orders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const limit = 20

  // Fetch orders with filters
  const { data, isLoading, isFetching, refetch } = useOrders({
    page,
    limit,
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    payment_status: paymentStatusFilter !== "all" ? paymentStatusFilter : undefined,
  })

  const deleteOrderMutation = useDeleteOrder()

  const orders = data?.data ?? []
  const pagination = data?.pagination

  const handleViewClick = (order: Order) => {
    setSelectedOrder(order)
    setViewModalOpen(true)
  }

  const handleDeleteClick = (order: Order) => {
    setSelectedOrder(order)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedOrder) return
    
    try {
      await deleteOrderMutation.mutateAsync(selectedOrder.id)
      alert("Order deleted successfully!")
      setDeleteModalOpen(false)
      setSelectedOrder(null)
    } catch (error: any) {
      alert(`Failed to delete order: ${error.response?.data?.message || error.message}`)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Pending", variant: "outline" },
      processing: { label: "Processing", variant: "secondary" },
      completed: { label: "Completed", variant: "default" },
      cancelled: { label: "Cancelled", variant: "destructive" },
    }
    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status?: string | null) => {
    if (!status) return <Badge variant="outline">N/A</Badge>
    
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      paid: { label: "Paid", variant: "default" },
      pending: { label: "Pending", variant: "outline" },
      partial: { label: "Partial", variant: "secondary" },
      refunded: { label: "Refunded", variant: "destructive" },
    }
    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  // Define table columns
  const columns = [
    {
      key: "id",
      label: "Order ID",
      render: (row: Order) => (
        <div>
          <div className="font-semibold text-blue-600">#{row.id}</div>
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(row.order_date).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      key: "patient",
      label: "Patient",
      render: (row: Order) => (
        <div>
          <div className="font-medium flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-400" />
            {row.patient 
              ? `${row.patient.first_name} ${row.patient.last_name}`
              : "Walk-in Customer"
            }
          </div>
          {row.patient?.phone && (
            <div className="text-xs text-gray-500 mt-1">{row.patient.phone}</div>
          )}
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (row: Order) => (
        <div className="flex items-center">
          <ShoppingCart className="h-4 w-4 mr-1 text-gray-400" />
          <span className="font-medium">{row.orderItems?.length || 0}</span>
        </div>
      ),
    },
    {
      key: "payment_method",
      label: "Payment Method",
      render: (row: Order) => (
        <span className="text-sm">{row.payment_method || "N/A"}</span>
      ),
    },
    {
      key: "total_amount",
      label: "Total Amount",
      render: (row: Order) => (
        <div className="font-bold text-lg text-green-600 flex items-center">
          <DollarSign className="h-4 w-4" />
          {row.total_amount.toFixed(2)}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Order) => (
        <div className="space-y-1">
          {getStatusBadge(row.status)}
          {getPaymentStatusBadge(row.payment_status)}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Order) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleViewClick(row)}
            title="View Details"
          >
            <Eye className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleDeleteClick(row)}
            disabled={deleteOrderMutation.isPending}
            title="Delete Order"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-gray-600 mt-1">View and manage pharmacy orders</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, patient name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Order Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Status</label>
                  <select
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearch("")
                      setStatusFilter("all")
                      setPaymentStatusFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Orders List</h3>
        </div>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Loading orders...</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No orders found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={orders}
              loading={isLoading}
            />
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {orders.length} of {pagination.total} orders
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(page - 1)}
              disabled={!pagination.hasPrevPage || isFetching}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => {
                  // Show first, last, current, and adjacent pages
                  return p === 1 || 
                         p === pagination.totalPages || 
                         Math.abs(p - page) <= 1
                })
                .map((p, idx, arr) => (
                  <div key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      disabled={isFetching}
                    >
                      {p}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasNextPage || isFetching}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      <ViewOrderModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        order={selectedOrder}
      />

      {/* Delete Confirmation Modal */}
      <DeleteOrderModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        order={selectedOrder}
        onConfirm={handleDelete}
        isDeleting={deleteOrderMutation.isPending}
      />
    </div>
  )
}
