"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { X, Plus } from "lucide-react"
import { useCreateRequest, useUpdateRequest, useRequest } from "../../_hooks/useRequest"
import { useBatches } from "../../_hooks/useBatch"
import { Request } from "@/lib/api/request-api"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"

interface RequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request?: Request | null
  mode?: "create" | "edit" | "view"
}

interface RequestItemInput {
  medicine_batch_id: number
  batch_number?: string
  medicineBatch?: any
}

export function RequestModal({ open, onOpenChange, request, mode = "create" }: RequestModalProps) {
  const [formData, setFormData] = useState({
    request_number: "",
    type: "",
    request_date: "",
    reason: "",
    priority: "",
    location: "",
    cert_number: "",
    notes: "",
    status: "pending",
  })

  const [requestItems, setRequestItems] = useState<RequestItemInput[]>([])
  const [showBatchSelector, setShowBatchSelector] = useState(false)
  const [selectedBatchId, setSelectedBatchId] = useState<string>("")

  const createMutation = useCreateRequest()
  const updateMutation = useUpdateRequest()
  
  // Fetch full request data with nested relations for edit/view mode
  const { data: fullRequestData } = useRequest(
    request?.id || 0,
    (mode === "edit" || mode === "view") && !!request?.id
  )
  const fullRequest = fullRequestData?.data
  
  const { data: batchesData } = useBatches({ page: 1, limit: 100 })
  const batches = Array.isArray(batchesData?.data) ? batchesData.data : []

  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"

  useEffect(() => {
    if (fullRequest && (isEditMode || isViewMode)) {
      // Format date from ISO to YYYY-MM-DD
      const formattedDate = fullRequest.request_date
        ? fullRequest.request_date.split("T")[0]
        : ""
      
      setFormData({
        request_number: fullRequest.request_number || "",
        type: fullRequest.type || "",
        request_date: formattedDate || "",
        reason: fullRequest.reason || "",
        priority: fullRequest.priority || "",
        location: fullRequest.location || "",
        cert_number: fullRequest.cert_number || "",
        notes: fullRequest.notes || "",
        status: fullRequest.status || "pending",
      })
      
      const items = fullRequest.requestItems || fullRequest.request_items
      if (items && Array.isArray(items)) {
        setRequestItems(
          items.map((item: any) => ({
            medicine_batch_id: item.medicine_batch_id,
            batch_number: item.medicineBatch?.batch_number,
            medicineBatch: item.medicineBatch,
          }))
        )
      }
    } else if (mode === "create") {
      // Reset for create mode
      setFormData({
        request_number: `REQ-${Date.now()}`,
        type: "",
        request_date: new Date().toISOString().split("T")[0] || "",
        reason: "",
        priority: "medium",
        location: "",
        cert_number: "",
        notes: "",
        status: "pending",
      })
      setRequestItems([])
    }
  }, [fullRequest, mode, open])

  const handleAddRequestItem = () => {
    if (!selectedBatchId) return

    const batchId = parseInt(selectedBatchId)
    const batch = batches.find((b) => b.id === batchId)

    if (batch && !requestItems.find((item) => item.medicine_batch_id === batchId)) {
      setRequestItems([
        ...requestItems,
        {
          medicine_batch_id: batchId,
          batch_number: batch.batch_number,
        },
      ])
      setSelectedBatchId("")
      setShowBatchSelector(false)
    }
  }

  const handleRemoveRequestItem = (batchId: number) => {
    setRequestItems(requestItems.filter((item) => item.medicine_batch_id !== batchId))
  }

  const handleSubmit = async () => {
    if (requestItems.length === 0) {
      return
    }

    const payload = {
      ...formData,
      request_items: requestItems.map((item) => ({
        medicine_batch_id: item.medicine_batch_id,
      })),
    }

    try {
      if (isEditMode && request) {
        await updateMutation.mutateAsync({ id: request.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save request:", error)
    }
  }

  const getBatchInfo = (batchId: number) => {
    const requestItem = requestItems.find((item) => item.medicine_batch_id === batchId)
    if (requestItem?.medicineBatch) {
      return requestItem.medicineBatch
    }
    
    // Otherwise check in the loaded batches
    return batches.find((b) => b.id === batchId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isViewMode ? "View Request" : isEditMode ? "Edit Request" : "Create New Request"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Request Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="request_number">Request Number</Label>
              <Input
                id="request_number"
                value={formData.request_number}
                onChange={(e) => setFormData({ ...formData, request_number: e.target.value })}
                disabled={isViewMode}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                disabled={isViewMode}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disposal">Disposal</SelectItem>
                  <SelectItem value="return">Return</SelectItem>
                  <SelectItem value="quarantine">Quarantine</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Request Date and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="request_date">Request Date</Label>
              <Input
                id="request_date"
                type="date"
                value={formData.request_date}
                onChange={(e) => setFormData({ ...formData, request_date: e.target.value })}
                disabled={isViewMode}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                disabled={isViewMode}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location and Certificate Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={isViewMode}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert_number">Certificate Number</Label>
              <Input
                id="cert_number"
                value={formData.cert_number}
                onChange={(e) => setFormData({ ...formData, cert_number: e.target.value })}
                disabled={isViewMode}
              />
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              disabled={isViewMode}
              rows={2}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              disabled={isViewMode}
              rows={2}
            />
          </div>

          {/* Status (for edit/view mode) */}
          {(isEditMode || isViewMode) && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={isViewMode}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Request Items Section */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Request Items (Batches)</Label>
              {!isViewMode && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBatchSelector(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Batch
                </Button>
              )}
            </div>

            {/* Batch Selector */}
            {showBatchSelector && !isViewMode && (
              <Card className="p-4 bg-gray-50">
                <div className="flex gap-2">
                  <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches
                        .filter((batch) => !requestItems.find((item) => item.medicine_batch_id === batch.id))
                        .map((batch) => (
                          <SelectItem key={batch.id} value={batch.id.toString()}>
                            {batch.batch_number} - Medicine ID: {batch.medicine_id} (Qty: {batch.quantity})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddRequestItem} disabled={!selectedBatchId}>
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowBatchSelector(false)
                      setSelectedBatchId("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Request Items List */}
            <div className="space-y-2">
              {requestItems.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-8 border-2 border-dashed rounded-lg">
                  No batches added yet. Click "Add Batch" to add request items.
                </div>
              ) : (
                requestItems.map((item) => {
                  const batch = getBatchInfo(item.medicine_batch_id)
                  return (
                    <Card key={item.medicine_batch_id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">
                            {batch?.batch_number || `Batch ID: ${item.medicine_batch_id}`}
                          </div>
                          {batch && (
                            <div className="text-sm text-gray-600 space-y-1 mt-1">
                              <div>Medicine ID: {batch.medicine_id}</div>
                              <div className="flex gap-4">
                                <span>Quantity: {batch.quantity}</span>
                                <span>Location: {batch.location || "N/A"}</span>
                                <span>Expiry: {new Date(batch.expiry_date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        {!isViewMode && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRequestItem(item.medicine_batch_id)}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
          {!isViewMode && (
            <Button
              onClick={handleSubmit}
              disabled={
                createMutation.isPending ||
                updateMutation.isPending ||
                requestItems.length === 0 ||
                !formData.request_number ||
                !formData.type
              }
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : isEditMode
                ? "Update Request"
                : "Create Request"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
