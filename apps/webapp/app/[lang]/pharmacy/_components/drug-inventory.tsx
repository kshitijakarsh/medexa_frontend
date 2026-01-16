"use client"

import { useState } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, Edit, Trash2, PackagePlus, Loader2, Phone } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { useMedicines, useDeleteMedicine, useCreateMedicine, useUpdateMedicine } from "../_hooks/useMedicine"
import { useBatches, useCreateBatch, useUpdateBatch, useDeleteBatch } from "../_hooks/useBatch"
import { Medicine } from "@/lib/api/medicine-api"
import { Batch } from "@/lib/api/batch-api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function DrugInventory() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filterTab, setFilterTab] = useState<"all" | "low-stock" | "expiring">("all")
  const [showBatchPage, setShowBatchPage] = useState(false)
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null)
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    medicine: "",
    type: "",
    content: "",
    total_stock: 0,
    min_level: 0,
    unit_price: 0,
    selling_price: 0,
    tax_rate: 0,
    medicine_category_id: 1,
  })
  const [error, setError] = useState<string | null>(null)
  
  const { data, isLoading } = useMedicines({ page, limit: 10, search: search || undefined })
  const deleteM = useDeleteMedicine()
  const createM = useCreateMedicine()
  const updateM = useUpdateMedicine()

  const medicines: Medicine[] = data?.data ?? []

  // Filter medicines based on active tab
  const filteredMedicines = medicines.filter(medicine => {
    if (filterTab === "low-stock") {
      return medicine.total_stock <= medicine.min_level
    }
    if (filterTab === "expiring") {
      return medicine.total_stock <= medicine.min_level * 1.5 && medicine.total_stock > medicine.min_level
    }
    return true
  })

  // Calculate metrics from actual data
  const totalItems = medicines.length
  const lowStockCount = medicines.filter(m => m.total_stock <= m.min_level).length
  const fastMovingCount = medicines.filter(m => m.total_stock > m.min_level * 2).length
  const slowMovingCount = medicines.filter(m => m.total_stock > m.min_level && m.total_stock <= m.min_level * 2).length
  
  // Modal handlers
  const handleCreateClick = () => {
    setFormData({
      medicine: "",
      type: "",
      content: "",
      total_stock: 0,
      min_level: 0,
      unit_price: 0,
      selling_price: 0,
      medicine_category_id: 1,
    })
    setCreateModalOpen(true)
  }
  
  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setFormData({
      medicine: medicine.medicine,
      type: medicine.type,
      content: medicine.content || "",
      total_stock: medicine.total_stock,
      min_level: medicine.min_level,
      unit_price: medicine.unit_price,
      selling_price: medicine.selling_price,
      tax_rate: medicine.tax_rate || 0,
      medicine_category_id: medicine.medicine_category_id,
    })
    setEditModalOpen(true)
  }
  
  const handleDeleteClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setDeleteModalOpen(true)
  }
  
  const handleCreateSubmit = async () => {
    try {
      setError(null)
      
      // Validation
      if (!formData.medicine.trim()) {
        setError("Medicine name is required")
        return
      }
      if (!formData.type) {
        setError("Type is required")
        return
      }
      
      await createM.mutateAsync(formData)
      setCreateModalOpen(false)
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Failed to create medicine"
      console.error("[DrugInventory] Create failed:", err)
      setError(message)
    }
  }
  
  const handleEditSubmit = async () => {
    try {
      setError(null)
      
      // Validation
      if (!formData.medicine.trim()) {
        setError("Medicine name is required")
        return
      }
      if (!formData.type) {
        setError("Type is required")
        return
      }
      
      if (selectedMedicine) {
        await updateM.mutateAsync({
          id: selectedMedicine.id,
          payload: formData,
        })
      }
      setEditModalOpen(false)
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Failed to update medicine"
      console.error("[DrugInventory] Update failed:", err)
      setError(message)
    }
  }
  
  const handleDeleteConfirm = () => {
    if (selectedMedicine) {
      deleteM.mutate(selectedMedicine.id)
    }
    setDeleteModalOpen(false)
  }
  
  if (showBatchPage && selectedMedicineId) {
    return <DrugInventoryBatch medicineId={selectedMedicineId} onBack={() => setShowBatchPage(false)} />
  }

  const getStockBadge = (stock: number, minLevel: number) => {
    if (stock <= minLevel) return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Low Stock</Badge>
    if (stock <= minLevel * 1.5) return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Medium</Badge>
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>
  }

  const columns = [
    {
      key: "medicine",
      label: "Medicine Name",
      render: (row: Medicine) => {
        const initials = row.medicine.substring(0, 2).toUpperCase()
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{row.medicine}</div>
              <div className="text-xs text-gray-500">ID: {row.id}</div>
            </div>
          </div>
        )
      },
    },
    {
      key: "type",
      label: "Type",
      render: (row: Medicine) => (
        <div>
          <div className="font-medium text-gray-900">{row.type}</div>
          {row.content && <div className="text-xs text-gray-500">{row.content}</div>}
        </div>
      ),
    },
    {
      key: "total_stock",
      label: "Stock",
      render: (row: Medicine) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{row.total_stock}</span>
          {getStockBadge(row.total_stock, row.min_level)}
        </div>
      ),
    },
    {
      key: "selling_price",
      label: "Price",
      render: (row: Medicine) => (
        <span className="font-semibold text-gray-900">KWD {row.selling_price.toFixed(3)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Medicine) => (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-green-50" onClick={() => handleEditClick(row)}>
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-9 w-9 p-0 hover:bg-red-50"
            onClick={() => handleDeleteClick(row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-9 w-9 p-0 hover:bg-blue-50"
            onClick={() => {
              setSelectedMedicineId(row.id)
              setShowBatchPage(true)
            }}
            title="Manage Batches"
          >
            <PackagePlus className="h-4 w-4 text-green-600" />
          </Button>
        </div>
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
          All Medicines
        </Button>
        <Button
          variant={filterTab === "low-stock" ? "default" : "outline"}
          onClick={() => setFilterTab("low-stock")}
          className={filterTab === "low-stock" ? "bg-orange-600 hover:bg-orange-700" : ""}
        >
          Low Stock
          {lowStockCount > 0 && (
            <Badge className="ml-2 bg-white text-orange-600">{lowStockCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "expiring" ? "default" : "outline"}
          onClick={() => setFilterTab("expiring")}
          className={filterTab === "expiring" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Expiring Soon
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
              <div className="text-sm text-gray-600">Total Items</div>
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="text-xs text-green-600">+12% from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Low Stock Alerts</div>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <div className="text-xs text-orange-600">Requires attention</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Fast Moving Items</div>
              <div className="text-2xl font-bold">{fastMovingCount}</div>
              <div className="text-xs text-green-600">High turnover</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Slow Moving Items</div>
              <div className="text-2xl font-bold">{slowMovingCount}</div>
              <div className="text-xs text-gray-600">Review required</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Drug Inventory</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by medicine name, category, or manufacturer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredMedicines}
            loading={isLoading}
          />
        </CardContent>
      </Card>
      
      {/* Create Medicine Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new medicine to the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="medicine">Medicine Name *</Label>
              <Input
                id="medicine"
                value={formData.medicine}
                onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                placeholder="Enter medicine name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Ointment">Ointment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content/Strength</Label>
              <Input
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="e.g., 500mg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_stock">Total Stock *</Label>
              <Input
                id="total_stock"
                type="number"
                value={formData.total_stock}
                onChange={(e) => setFormData({ ...formData, total_stock: parseInt(e.target.value) || 0 })}
                placeholder="Enter stock quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min_level">Minimum Level *</Label>
              <Input
                id="min_level"
                type="number"
                value={formData.min_level}
                onChange={(e) => setFormData({ ...formData, min_level: parseInt(e.target.value) || 0 })}
                placeholder="Enter minimum level"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit_price">Unit Price *</Label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter unit price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selling_price">Selling Price *</Label>
              <Input
                id="selling_price"
                type="number"
                step="0.01"
                value={formData.selling_price}
                onChange={(e) => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter selling price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_rate">Tax Rate (%) *</Label>
              <Input
                id="tax_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax_rate}
                onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                placeholder="Enter tax rate"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm mb-4">
              {error}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)} disabled={createM.isPending}>
              Cancel
            </Button>
            <Button onClick={handleCreateSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={createM.isPending}>
              {createM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Medicine Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
            <DialogDescription>
              Update the medicine details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-medicine">Medicine Name *</Label>
              <Input
                id="edit-medicine"
                value={formData.medicine}
                onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                placeholder="Enter medicine name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Ointment">Ointment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content/Strength</Label>
              <Input
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="e.g., 500mg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-total_stock">Total Stock *</Label>
              <Input
                id="edit-total_stock"
                type="number"
                value={formData.total_stock}
                onChange={(e) => setFormData({ ...formData, total_stock: parseInt(e.target.value) || 0 })}
                placeholder="Enter stock quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-min_level">Minimum Level *</Label>
              <Input
                id="edit-min_level"
                type="number"
                value={formData.min_level}
                onChange={(e) => setFormData({ ...formData, min_level: parseInt(e.target.value) || 0 })}
                placeholder="Enter minimum level"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-unit_price">Unit Price *</Label>
              <Input
                id="edit-unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter unit price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-selling_price">Selling Price *</Label>
              <Input
                id="edit-selling_price"
                type="number"
                step="0.01"
                value={formData.selling_price}
                onChange={(e) => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter selling price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tax_rate">Tax Rate (%) *</Label>
              <Input
                id="edit-tax_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax_rate}
                onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                placeholder="Enter tax rate"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm mb-4">
              {error}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)} disabled={updateM.isPending}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={updateM.isPending}>
              {updateM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Medicine</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this medicine? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>Medicine:</strong> {selectedMedicine?.medicine}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {selectedMedicine?.type} | <strong>Stock:</strong> {selectedMedicine?.total_stock}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Batch Management Component
function DrugInventoryBatch({ medicineId, onBack }: { medicineId: number; onBack: () => void }) {
  const [search, setSearch] = useState("")
  const [createBatchOpen, setCreateBatchOpen] = useState(false)
  const [editBatchOpen, setEditBatchOpen] = useState(false)
  const [deleteBatchOpen, setDeleteBatchOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  
  const [batchFormData, setBatchFormData] = useState({
    batch_number: "",
    quantity: 0,
    location: "",
    expiry_date: "",
    total_value: 0,
    status: "active",
    medicine_id: medicineId,
  })

  const { data: batchesData, isLoading } = useBatches({ medicine_id: medicineId })
  const createBatch = useCreateBatch()
  const updateBatch = useUpdateBatch()
  const deleteBatch = useDeleteBatch()

  const batches: Batch[] = batchesData?.data ?? []
  
  const filteredBatches = batches.filter(batch => 
    batch.batch_number.toLowerCase().includes(search.toLowerCase()) ||
    batch.location.toLowerCase().includes(search.toLowerCase())
  )

  // Use KPIs from API response, fallback to calculated values
  const totalBatches = batchesData?.kpis?.totalBatches ?? batches.length
  const totalQuantity = batchesData?.kpis?.totalQuantity ?? batches.reduce((sum, b) => sum + b.quantity, 0)
  const expiringSoon = batchesData?.kpis?.expiringSoon ?? batches.filter(b => {
    const expiryDate = new Date(b.expiry_date)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiryDate <= threeMonthsFromNow && expiryDate > new Date()
  }).length
  const expired = batchesData?.kpis?.expired ?? batches.filter(b => new Date(b.expiry_date) < new Date()).length

  const handleCreateBatchClick = () => {
    setBatchFormData({
      batch_number: "",
      quantity: 0,
      location: "",
      expiry_date: "",
      total_value: 0,
      status: "active",
      medicine_id: medicineId,
    })
    setCreateBatchOpen(true)
  }

  const handleEditBatchClick = (batch: Batch) => {
    setSelectedBatch(batch)
    setBatchFormData({
      batch_number: batch.batch_number,
      quantity: batch.quantity,
      location: batch.location,
      expiry_date: batch.expiry_date?.split("T")[0] || "",
      total_value: batch.total_value,
      status: batch.status,
      medicine_id: medicineId,
    })
    setEditBatchOpen(true)
  }

  const handleDeleteBatchClick = (batch: Batch) => {
    setSelectedBatch(batch)
    setDeleteBatchOpen(true)
  }

  const handleCreateBatchSubmit = () => {
    createBatch.mutate(batchFormData)
    setCreateBatchOpen(false)
  }

  const handleEditBatchSubmit = () => {
    if (selectedBatch) {
      updateBatch.mutate({ 
        id: selectedBatch.id, 
        payload: {
          batch_number: batchFormData.batch_number,
          quantity: batchFormData.quantity,
          location: batchFormData.location,
          expiry_date: batchFormData.expiry_date,
          total_value: batchFormData.total_value,
          status: batchFormData.status,
        }
      })
    }
    setEditBatchOpen(false)
  }

  const handleDeleteBatchConfirm = () => {
    if (selectedBatch) {
      deleteBatch.mutate(selectedBatch.id)
    }
    setDeleteBatchOpen(false)
  }

  const getBatchStatusBadge = (expiryDate: string) => {
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

  const getResponseStatusBadge = (status?: string) => {
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

  const batchColumns = [
    {
      key: "batch_number",
      label: "Batch Number",
      render: (row: Batch) => (
        <div>
          <div className="font-medium">{row.batch_number}</div>
          <div className="text-xs text-gray-500">{row.location || "N/A"}</div>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (row: Batch) => <span className="font-semibold">{row.quantity}</span>,
    },
    {
      key: "location",
      label: "Location",
      render: (row: Batch) => <span>{row.location}</span>,
    },
    {
      key: "status",
      label: "Status (API)",
      render: (row: Batch) => getResponseStatusBadge(row.status),
    },
    {
      key: "expiry_date",
      label: "Expiry Status",
      render: (row: Batch) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">{new Date(row.expiry_date).toLocaleDateString()}</span>
            {getBatchStatusBadge(row.expiry_date)}
          </div>
        </div>
      ),
    },
    {
      key: "total_value",
      label: "Total Value",
      render: (row: Batch) => <span className="font-semibold text-blue-600">${row.total_value.toFixed(2)}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Batch) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditBatchClick(row)}>
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0"
            onClick={() => handleDeleteBatchClick(row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back to Inventory
        </Button>
        <h2 className="text-xl font-semibold">Medicine Batches</h2>
      </div>

      {/* Batch Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Batches</div>
              <div className="text-2xl font-bold">{totalBatches}</div>
              <div className="text-xs text-blue-600">Active batches</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Quantity</div>
              <div className="text-2xl font-bold">{totalQuantity}</div>
              <div className="text-xs text-green-600">Units available</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
              <div className="text-2xl font-bold">{expiringSoon}</div>
              <div className="text-xs text-orange-600">Within 3 months</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Expired</div>
              <div className="text-2xl font-bold">{expired}</div>
              <div className="text-xs text-red-600">Requires action</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batches Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Batch Records</h3>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateBatchClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add Batch
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by batch number or supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <DataTable
            columns={batchColumns}
            data={filteredBatches}
            loading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Create Batch Modal */}
      <Dialog open={createBatchOpen} onOpenChange={setCreateBatchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Batch</DialogTitle>
            <DialogDescription>
              Fill in the batch details to add new stock to the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="batch_number">Batch Number *</Label>
              <Input
                id="batch_number"
                value={batchFormData.batch_number}
                onChange={(e) => setBatchFormData({ ...batchFormData, batch_number: e.target.value })}
                placeholder="Enter batch number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={batchFormData.quantity}
                onChange={(e) => setBatchFormData({ ...batchFormData, quantity: parseInt(e.target.value) || 0 })}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={batchFormData.location}
                onChange={(e) => setBatchFormData({ ...batchFormData, location: e.target.value })}
                placeholder="Enter storage location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date *</Label>
              <Input
                id="expiry_date"
                type="date"
                value={batchFormData.expiry_date}
                onChange={(e) => setBatchFormData({ ...batchFormData, expiry_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_value">Total Value *</Label>
              <Input
                id="total_value"
                type="number"
                step="0.01"
                value={batchFormData.total_value}
                onChange={(e) => setBatchFormData({ ...batchFormData, total_value: parseFloat(e.target.value) || 0 })}
                placeholder="Enter total batch value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={batchFormData.status}
                onChange={(e) => setBatchFormData({ ...batchFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateBatchOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBatchSubmit} className="bg-blue-600 hover:bg-blue-700">
              Add Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Batch Modal */}
      <Dialog open={editBatchOpen} onOpenChange={setEditBatchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogDescription>
              Update the batch details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-batch_number">Batch Number *</Label>
              <Input
                id="edit-batch_number"
                value={batchFormData.batch_number}
                onChange={(e) => setBatchFormData({ ...batchFormData, batch_number: e.target.value })}
                placeholder="Enter batch number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Quantity *</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={batchFormData.quantity}
                onChange={(e) => setBatchFormData({ ...batchFormData, quantity: parseInt(e.target.value) || 0 })}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location *</Label>
              <Input
                id="edit-location"
                value={batchFormData.location}
                onChange={(e) => setBatchFormData({ ...batchFormData, location: e.target.value })}
                placeholder="Enter storage location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-expiry_date">Expiry Date *</Label>
              <Input
                id="edit-expiry_date"
                type="date"
                value={batchFormData.expiry_date}
                onChange={(e) => setBatchFormData({ ...batchFormData, expiry_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-total_value">Total Value *</Label>
              <Input
                id="edit-total_value"
                type="number"
                step="0.01"
                value={batchFormData.total_value}
                onChange={(e) => setBatchFormData({ ...batchFormData, total_value: parseFloat(e.target.value) || 0 })}
                placeholder="Enter total batch value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status *</Label>
              <select
                id="edit-status"
                value={batchFormData.status}
                onChange={(e) => setBatchFormData({ ...batchFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBatchOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBatchSubmit} className="bg-blue-600 hover:bg-blue-700">
              Update Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Batch Confirmation Modal */}
      <Dialog open={deleteBatchOpen} onOpenChange={setDeleteBatchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Batch</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this batch? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>Batch Number:</strong> {selectedBatch?.batch_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Quantity:</strong> {selectedBatch?.quantity} | <strong>Expiry:</strong> {selectedBatch?.expiry_date && new Date(selectedBatch.expiry_date).toLocaleDateString()}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteBatchOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteBatchConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
