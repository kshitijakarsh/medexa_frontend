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
import { useDictionary } from "@/i18n/use-dictionary"
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
  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.inventory
  const phCommonDict = dict.pages.pharmacy.common
  const commonDict = dict.common

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
      tax_rate: 0,
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
        setError(phCommonDict.nameRequired)
        return
      }
      if (!formData.type) {
        setError(phCommonDict.typeRequired)
        return
      }

      await createM.mutateAsync(formData)
      setCreateModalOpen(false)
    } catch (err: any) {
      const message = err instanceof Error ? err.message : phCommonDict.saveFailed
      console.error("[DrugInventory] Create failed:", err)
      setError(message)
    }
  }

  const handleEditSubmit = async () => {
    try {
      setError(null)

      // Validation
      if (!formData.medicine.trim()) {
        setError(phCommonDict.nameRequired)
        return
      }
      if (!formData.type) {
        setError(phCommonDict.typeRequired)
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
      const message = err instanceof Error ? err.message : phCommonDict.updateFailed
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
    if (stock <= minLevel) return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{pDict.lowStock}</Badge>
    if (stock <= minLevel * 1.5) return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">{pDict.medium}</Badge>
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{phCommonDict.inStock}</Badge>
  }

  const columns = [
    {
      key: "medicine",
      label: pDict.fields.medicineName,
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
      label: commonDict.type,
      render: (row: Medicine) => (
        <div>
          <div className="font-medium text-gray-900">{row.type}</div>
          {row.content && <div className="text-xs text-gray-500">{row.content}</div>}
        </div>
      ),
    },
    {
      key: "total_stock",
      label: phCommonDict.inStock,
      render: (row: Medicine) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{row.total_stock}</span>
          {getStockBadge(row.total_stock, row.min_level)}
        </div>
      ),
    },
    {
      key: "selling_price",
      label: phCommonDict.price,
      render: (row: Medicine) => (
        <span className="font-semibold text-gray-900">KWD {row.selling_price.toFixed(3)}</span>
      ),
    },
    {
      key: "actions",
      label: dict.table.actions,
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
            title={pDict.manageBatches}
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
          {pDict.allMedicines}
        </Button>
        <Button
          variant={filterTab === "low-stock" ? "default" : "outline"}
          onClick={() => setFilterTab("low-stock")}
          className={filterTab === "low-stock" ? "bg-orange-600 hover:bg-orange-700" : ""}
        >
          {pDict.lowStock}
          {lowStockCount > 0 && (
            <Badge className="ml-2 bg-white text-orange-600">{lowStockCount}</Badge>
          )}
        </Button>
        <Button
          variant={filterTab === "expiring" ? "default" : "outline"}
          onClick={() => setFilterTab("expiring")}
          className={filterTab === "expiring" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          {pDict.expiringSoon}
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
              <div className="text-sm text-gray-600">{pDict.totalItems}</div>
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="text-xs text-green-600">{pDict.trends?.increase || "+12%"} {pDict.trends?.vsLastMonth || "from last month"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.lowStockAlerts}</div>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <div className="text-xs text-orange-600">{pDict.requiresAttention}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.fastMovingItems}</div>
              <div className="text-2xl font-bold">{fastMovingCount}</div>
              <div className="text-xs text-green-600">{pDict.highTurnover}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.slowMovingItems}</div>
              <div className="text-2xl font-bold">{slowMovingCount}</div>
              <div className="text-xs text-gray-600">{pDict.reviewRequired}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{pDict.title}</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {commonDict.status}
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateClick}>
                <Plus className="mr-2 h-4 w-4" />
                {pDict.addMedicine}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={pDict.placeholders.search}
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
            <DialogTitle>{pDict.modals.create.title}</DialogTitle>
            <DialogDescription>
              {pDict.modals.create.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="medicine">{pDict.fields.medicineName}</Label>
              <Input
                id="medicine"
                value={formData.medicine}
                onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                placeholder={pDict.placeholders.medicineName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">{pDict.fields.type}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={pDict.placeholders.selectType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">{pDict.fields.tablet}</SelectItem>
                  <SelectItem value="Capsule">{pDict.fields.capsule}</SelectItem>
                  <SelectItem value="Syrup">{pDict.fields.syrup}</SelectItem>
                  <SelectItem value="Injection">{pDict.fields.injection}</SelectItem>
                  <SelectItem value="Ointment">{pDict.fields.ointment}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">{pDict.fields.content}</Label>
              <Input
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={pDict.placeholders.content}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_stock">{pDict.fields.totalStock}</Label>
              <Input
                id="total_stock"
                type="number"
                value={formData.total_stock}
                onChange={(e) => setFormData({ ...formData, total_stock: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.stock}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min_level">{pDict.fields.minLevel}</Label>
              <Input
                id="min_level"
                type="number"
                value={formData.min_level}
                onChange={(e) => setFormData({ ...formData, min_level: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.minLevel}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit_price">{pDict.fields.unitPrice}</Label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.placeholders.unitPrice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selling_price">{pDict.fields.sellingPrice}</Label>
              <Input
                id="selling_price"
                type="number"
                step="0.01"
                value={formData.selling_price}
                onChange={(e) => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.placeholders.sellingPrice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_rate">{commonDict.taxRate}</Label>
              <Input
                id="tax_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax_rate}
                onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                placeholder={commonDict.enterTaxRate}
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
              {commonDict.cancel}
            </Button>
            <Button onClick={handleCreateSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={createM.isPending}>
              {createM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pDict.addMedicine}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Medicine Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{pDict.modals.edit.title}</DialogTitle>
            <DialogDescription>
              {pDict.modals.edit.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-medicine">{pDict.fields.medicineName}</Label>
              <Input
                id="edit-medicine"
                value={formData.medicine}
                onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                placeholder={pDict.placeholders.medicineName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">{pDict.fields.type}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={pDict.placeholders.selectType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">{pDict.fields.tablet}</SelectItem>
                  <SelectItem value="Capsule">{pDict.fields.capsule}</SelectItem>
                  <SelectItem value="Syrup">{pDict.fields.syrup}</SelectItem>
                  <SelectItem value="Injection">{pDict.fields.injection}</SelectItem>
                  <SelectItem value="Ointment">{pDict.fields.ointment}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">{pDict.fields.content}</Label>
              <Input
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={pDict.placeholders.content}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-total_stock">{pDict.fields.totalStock}</Label>
              <Input
                id="edit-total_stock"
                type="number"
                value={formData.total_stock}
                onChange={(e) => setFormData({ ...formData, total_stock: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.stock}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-min_level">{pDict.fields.minLevel}</Label>
              <Input
                id="edit-min_level"
                type="number"
                value={formData.min_level}
                onChange={(e) => setFormData({ ...formData, min_level: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.minLevel}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-unit_price">{pDict.fields.unitPrice}</Label>
              <Input
                id="edit-unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.placeholders.unitPrice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-selling_price">{pDict.fields.sellingPrice}</Label>
              <Input
                id="edit-selling_price"
                type="number"
                step="0.01"
                value={formData.selling_price}
                onChange={(e) => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.placeholders.sellingPrice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tax_rate">{commonDict.taxRate}</Label>
              <Input
                id="edit-tax_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax_rate}
                onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                placeholder={commonDict.enterTaxRate}
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
              {commonDict.cancel}
            </Button>
            <Button onClick={handleEditSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={updateM.isPending}>
              {updateM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pDict.updateMedicine}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{pDict.modals.delete.title}</DialogTitle>
            <DialogDescription>
              {pDict.modals.delete.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>{pDict.medicineName}:</strong> {selectedMedicine?.medicine}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{commonDict.type}:</strong> {selectedMedicine?.type} | <strong>{pDict.currentStock}:</strong> {selectedMedicine?.total_stock}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              {commonDict.cancel}
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              {commonDict.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Batch Management Component
function DrugInventoryBatch({ medicineId, onBack }: { medicineId: number; onBack: () => void }) {
  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.inventory
  const phCommonDict = dict.pages.pharmacy.common
  const commonDict = dict.common

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
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{pDict.batches.expired}</Badge>
    }
    if (expiry <= threeMonthsFromNow) {
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">{pDict.expiringSoon}</Badge>
    }
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{pDict.batches.valid}</Badge>
  }

  const getResponseStatusBadge = (status?: string) => {
    if (!status) return null

    const statusConfig: Record<string, { className: string; label: string }> = {
      active: { className: "bg-green-100 text-green-700 hover:bg-green-100", label: commonDict.approved },
      inactive: { className: "bg-gray-100 text-gray-700 hover:bg-gray-100", label: commonDict.completed }, // map or keep
      quarantined: { className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100", label: dict.pages.pharmacy.expiry.quarantined },
      disposed: { className: "bg-gray-100 text-gray-700 hover:bg-gray-100", label: dict.pages.pharmacy.expiry.disposed },
      returned: { className: "bg-blue-100 text-blue-700 hover:bg-blue-100", label: dict.pages.pharmacy.expiry.returned },
    }

    const config = statusConfig[status] ?? { className: "bg-gray-100 text-gray-700", label: status.toUpperCase() }
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const batchColumns = [
    {
      key: "batch_number",
      label: pDict.batches.batchNumber,
      render: (row: Batch) => (
        <div>
          <div className="font-medium">{row.batch_number}</div>
          <div className="text-xs text-gray-500">{row.location || dict.common.noData}</div>
        </div>
      ),
    },
    {
      key: "quantity",
      label: commonDict.quantity,
      render: (row: Batch) => <span className="font-semibold">{row.quantity}</span>,
    },
    {
      key: "location",
      label: pDict.batches.location,
      render: (row: Batch) => <span>{row.location}</span>,
    },
    {
      key: "status",
      label: pDict.batches.statusApi,
      render: (row: Batch) => getResponseStatusBadge(row.status),
    },
    {
      key: "expiry_date",
      label: pDict.batches.expiryStatus,
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
      label: pDict.batches.totalValue,
      render: (row: Batch) => <span className="font-semibold text-blue-600">${row.total_value.toFixed(2)}</span>,
    },
    {
      key: "actions",
      label: dict.table.actions,
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
          ← {dict.common.back}
        </Button>
        <h2 className="text-xl font-semibold">{pDict.batches.title}</h2>
      </div>

      {/* Batch Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.batches.totalBatches}</div>
              <div className="text-2xl font-bold">{totalBatches}</div>
              <div className="text-xs text-blue-600">{pDict.batches.allInventory}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.batches.totalQuantity}</div>
              <div className="text-2xl font-bold">{totalQuantity}</div>
              <div className="text-xs text-green-600">{phCommonDict.inStock}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.expiringSoon}</div>
              <div className="text-2xl font-bold">{expiringSoon}</div>
              <div className="text-xs text-orange-600">{pDict.batches.within3Months || "Within 3 months"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{pDict.batches.expired}</div>
              <div className="text-2xl font-bold">{expired}</div>
              <div className="text-xs text-red-600">{pDict.requiresAttention}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batches Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{pDict.batches.title}</h3>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateBatchClick}>
              <Plus className="mr-2 h-4 w-4" />
              {pDict.batches.addBatch}
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={dict.pages.pharmacy.expiry.searchPlaceholder}
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
            <DialogTitle>{pDict.batches.addBatch}</DialogTitle>
            <DialogDescription>
              {pDict.batches.addBatchDesc || "Fill in the batch details to add new stock to the inventory."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="batch_number">{pDict.batches.batchNumber} *</Label>
              <Input
                id="batch_number"
                value={batchFormData.batch_number}
                onChange={(e) => setBatchFormData({ ...batchFormData, batch_number: e.target.value })}
                placeholder={pDict.batches.batchNumberPlaceholder || "Enter batch number"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">{commonDict.quantity} *</Label>
              <Input
                id="quantity"
                type="number"
                value={batchFormData.quantity}
                onChange={(e) => setBatchFormData({ ...batchFormData, quantity: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.stock}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{pDict.batches.location} *</Label>
              <Input
                id="location"
                value={batchFormData.location}
                onChange={(e) => setBatchFormData({ ...batchFormData, location: e.target.value })}
                placeholder={pDict.batches.locationPlaceholder || "Enter storage location"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">{dict.pages.pharmacy.expiry.expiryDate} *</Label>
              <Input
                id="expiry_date"
                type="date"
                value={batchFormData.expiry_date}
                onChange={(e) => setBatchFormData({ ...batchFormData, expiry_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_value">{pDict.batches.totalValue} *</Label>
              <Input
                id="total_value"
                type="number"
                step="0.01"
                value={batchFormData.total_value}
                onChange={(e) => setBatchFormData({ ...batchFormData, total_value: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.batches.totalValuePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{commonDict.status} *</Label>
              <select
                id="status"
                value={batchFormData.status}
                onChange={(e) => setBatchFormData({ ...batchFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="active">{commonDict.active}</option>
                <option value="inactive">{commonDict.completed}</option>
                <option value="expired">{pDict.batches.expired}</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateBatchOpen(false)}>
              {commonDict.cancel}
            </Button>
            <Button onClick={handleCreateBatchSubmit} className="bg-blue-600 hover:bg-blue-700">
              {pDict.batches.addBatch}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Batch Modal */}
      <Dialog open={editBatchOpen} onOpenChange={setEditBatchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{pDict.batches.editBatch}</DialogTitle>
            <DialogDescription>
              {pDict.batches.editBatchDesc || "Update the batch details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-batch_number">{pDict.batches.batchNumber} *</Label>
              <Input
                id="edit-batch_number"
                value={batchFormData.batch_number}
                onChange={(e) => setBatchFormData({ ...batchFormData, batch_number: e.target.value })}
                placeholder={pDict.batches.batchNumberPlaceholder || "Enter batch number"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">{commonDict.quantity} *</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={batchFormData.quantity}
                onChange={(e) => setBatchFormData({ ...batchFormData, quantity: parseInt(e.target.value) || 0 })}
                placeholder={pDict.placeholders.stock}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">{pDict.batches.location} *</Label>
              <Input
                id="edit-location"
                value={batchFormData.location}
                onChange={(e) => setBatchFormData({ ...batchFormData, location: e.target.value })}
                placeholder={pDict.batches.locationPlaceholder || "Enter storage location"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-expiry_date">{dict.pages.pharmacy.expiry.expiryDate} *</Label>
              <Input
                id="edit-expiry_date"
                type="date"
                value={batchFormData.expiry_date}
                onChange={(e) => setBatchFormData({ ...batchFormData, expiry_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-total_value">{pDict.batches.totalValue} *</Label>
              <Input
                id="edit-total_value"
                type="number"
                step="0.01"
                value={batchFormData.total_value}
                onChange={(e) => setBatchFormData({ ...batchFormData, total_value: parseFloat(e.target.value) || 0 })}
                placeholder={pDict.batches.totalValuePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">{commonDict.status} *</Label>
              <select
                id="edit-status"
                value={batchFormData.status}
                onChange={(e) => setBatchFormData({ ...batchFormData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="active">{commonDict.active}</option>
                <option value="inactive">{commonDict.completed}</option>
                <option value="expired">{pDict.batches.expired}</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBatchOpen(false)}>
              {commonDict.cancel}
            </Button>
            <Button onClick={handleEditBatchSubmit} className="bg-blue-600 hover:bg-blue-700">
              {pDict.batches.editBatch}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Batch Confirmation Modal */}
      <Dialog open={deleteBatchOpen} onOpenChange={setDeleteBatchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{pDict.batches.deleteBatch}</DialogTitle>
            <DialogDescription>
              {pDict.batches.deleteBatchDesc || "Are you sure you want to delete this batch? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              <strong>{pDict.batches.batchNumber}:</strong> {selectedBatch?.batch_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{commonDict.quantity}:</strong> {selectedBatch?.quantity} | <strong>{dict.pages.pharmacy.expiry.expiryDate}:</strong> {selectedBatch?.expiry_date && new Date(selectedBatch.expiry_date).toLocaleDateString()}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteBatchOpen(false)}>
              {commonDict.cancel}
            </Button>
            <Button onClick={handleDeleteBatchConfirm} className="bg-red-600 hover:bg-red-700">
              {commonDict.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
