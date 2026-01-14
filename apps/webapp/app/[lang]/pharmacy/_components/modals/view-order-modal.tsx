"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { Calendar, User, DollarSign, FileText } from "lucide-react"
import type { Order } from "@/lib/api/order-api"

interface ViewOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function ViewOrderModal({ open, onOpenChange, order }: ViewOrderModalProps) {
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

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id}</DialogTitle>
          <DialogDescription>
            Complete information about this order
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Order ID</Label>
              <div className="mt-1 text-lg font-semibold text-blue-600">#{order.id}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Order Date</Label>
              <div className="mt-1 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{new Date(order.order_date).toLocaleString()}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Patient</Label>
              <div className="mt-1 flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span>
                  {order.patient 
                    ? `${order.patient.first_name} ${order.patient.last_name}`
                    : "Walk-in Customer"
                  }
                </span>
              </div>
              {order.patient?.phone && (
                <div className="text-sm text-gray-500 mt-1 ml-6">{order.patient.phone}</div>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Payment Method</Label>
              <div className="mt-1">
                <DollarSign className="h-4 w-4 inline mr-1 text-gray-400" />
                <span>{order.payment_method || "N/A"}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Order Status</Label>
              <div className="mt-1">{getStatusBadge(order.status)}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Payment Status</Label>
              <div className="mt-1">{getPaymentStatusBadge(order.payment_status)}</div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Notes</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                <FileText className="h-4 w-4 inline mr-2 text-gray-400" />
                <span className="text-sm">{order.notes}</span>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Order Items</Label>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Medicine</th>
                    <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Type</th>
                    <th className="text-center text-xs font-medium text-gray-600 px-4 py-3">Quantity</th>
                    <th className="text-right text-xs font-medium text-gray-600 px-4 py-3">Price</th>
                    <th className="text-right text-xs font-medium text-gray-600 px-4 py-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{item.medicine?.medicine || `Medicine ID: ${item.medicine_id}`}</div>
                          {item.medicine?.content && (
                            <div className="text-xs text-gray-500">{item.medicine.content}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{item.medicine?.type || "N/A"}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-medium">{item.quantity}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm">${item.price_at_sale.toFixed(2)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-semibold text-green-600">
                            ${(item.price_at_sale * item.quantity).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        No items in this order
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">
                ${order.total_amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
