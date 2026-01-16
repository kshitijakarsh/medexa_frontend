"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Search, Printer, CheckCircle, User, Calendar, FileText, ArrowLeft, Download } from "lucide-react"
import { usePrescriptions, useUpdatePrescription } from "../_hooks/usePrescription"
import { useMedicines } from "../_hooks/useMedicine"
import type { Prescription } from "@/lib/api/prescription-api"
import type { Medicine } from "@/lib/api/medicine-api"
import { useCreateOrder } from "../_hooks/useOrder"
import type { CreateOrderPayload } from "@/lib/api/order-api"
import { generatePharmacyBillPDF, printPharmacyBillPDF, type BillData } from "@/lib/utils/pdf-generator"

interface CartItem extends Medicine {
  quantity: number
}

export function OPDDispensing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showBilling, setShowBilling] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  
  const createOrderMutation = useCreateOrder()
  const updatePrescriptionMutation = useUpdatePrescription()
  
  // Fetch OPD prescriptions (visit-based)
  const { data, isLoading } = usePrescriptions({
    search: searchQuery || undefined,
    limit: 50,
  })
  
  // Fetch all medicines to get complete data including prices
  const { data: medicinesData } = useMedicines({
    limit: 100,
  })

  // Filter prescriptions that have visit_id (OPD)
  const prescriptions = (data?.data || []).filter(p => p.visit_id && !p.ipd_id)

  const getStatusBadge = (status: string) => {
    const isWaiting = status === "pending" || status === "active"
    return (
      <Badge
        variant="outline"
        className={
          isWaiting
            ? "bg-orange-50 text-orange-700 border-orange-200"
            : "bg-green-50 text-green-700 border-green-200"
        }
      >
        {status === "pending" ? "Waiting" : status === "active" ? "Active" : "Done"}
      </Badge>
    )
  }

  const selectedPrescriptionItems = selectedPrescription?.prescription_items || []
  
  const handleDispenseAndBill = useCallback(() => {
    if (!selectedPrescription || !selectedPrescription.prescription_items) return
    
    if (selectedPrescription.status === "completed") {
      alert("This prescription is already completed. This prescription has already been served.")
      return
    }
    
    // Get all medicines for lookup
    const allMedicines = medicinesData?.data || []
    
    // Convert prescription items to cart items
    // Calculate quantity as: dosage × frequency × duration
    const cartItems: CartItem[] = selectedPrescription.prescription_items
      .filter(item => item.medicine)
      .map(item => {
        const dosage = parseInt(String(item.dosage || 1))
        const frequency = parseInt(String(item.frequency || 1))
        const duration = parseInt(String(item.duration || 1))
        const calculatedQuantity = dosage * frequency * duration
        
        // Find the complete medicine data from the medicines list
        const fullMedicineData = allMedicines.find(m => m.id === item.medicine!.id)
        
        return {
          id: item.medicine!.id,
          tenant_id: fullMedicineData?.tenant_id || 0,
          medicine_category_id: fullMedicineData?.medicine_category_id || 0,
          medicine: item.medicine!.medicine,
          type: item.medicine!.type,
          content: item.medicine!.content || '',
          quantity: calculatedQuantity,
          total_stock: fullMedicineData?.total_stock || 999,
          min_level: fullMedicineData?.min_level || 0,
          unit_price: fullMedicineData?.unit_price || 0,
          selling_price: fullMedicineData?.selling_price || 0,
          tax_rate: fullMedicineData?.tax_rate || 5,
          status: fullMedicineData?.status || 'active',
          is_deleted: false,
        }
      })
    
    setCart(cartItems)
    setShowBilling(true)
  }, [selectedPrescription, medicinesData])

  const handleBackToPrescription = useCallback(() => {
    setShowBilling(false)
    setCart([])
  }, [])

  const handleConfirmSale = useCallback(async () => {
    if (cart.length === 0 || !selectedPrescription) {
      alert("Cart is empty")
      return
    }

    try {
      const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
      const tax = cart.reduce((sum, item) => {
        const itemTotal = item.selling_price * item.quantity
        const itemTax = itemTotal * ((item.tax_rate || 5) / 100)
        return sum + itemTax
      }, 0)
      const avgTaxRate = subtotal > 0 ? (tax / subtotal) * 100 : 5
      const total = subtotal + tax

      const orderPayload: CreateOrderPayload = {
        patient_id: selectedPrescription.patient_id,
        prescription_id: selectedPrescription.id,
        status: "completed",
        payment_status: "paid",
        payment_method: "Cash",
        notes: `OPD Prescription order - RX-${selectedPrescription.id}`,
        order_items: cart.map(item => ({
          medicine_id: item.id,
          quantity: item.quantity,
          price_at_sale: item.selling_price,
        }))
      }

      const response = await createOrderMutation.mutateAsync(orderPayload)
      
      // Update prescription status to completed
      try {
        await updatePrescriptionMutation.mutateAsync({
          id: selectedPrescription.id,
          payload: { status: "completed" }
        })
      } catch (updateError) {
        console.error("Failed to update prescription status:", updateError)
        // Continue even if status update fails
      }
      
      alert(`Order #${response.data.id} created successfully!`)
      
      // Reset
      setCart([])
      setShowBilling(false)
      setSelectedPrescription(null)
    } catch (error: any) {
      console.error("Failed to create order - Full error:", error)
      console.error("Error response:", error.response)
      console.error("Error message:", error.message)
      const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || error.message || "Unknown error"
      alert(`Failed to create order: ${errorMsg}`)
    }
  }, [cart, selectedPrescription, createOrderMutation, updatePrescriptionMutation])

  const handlePrint = useCallback(() => {
    if (cart.length === 0 || !selectedPrescription) return

    const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal + tax
    const now = new Date()
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    const billData: BillData = {
      invoiceNumber,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customerName: selectedPrescription.patient 
        ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}` 
        : 'Walk-in Customer',
      customerPhone: selectedPrescription.patient?.mobile_number || 'N/A',
      items: cart.map(item => ({
        id: item.id,
        medicine: item.medicine,
        type: item.type,
        content: item.content,
        quantity: item.quantity,
        selling_price: item.selling_price
      })),
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod: 'Cash',
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: `RX-${selectedPrescription.id}`,
      taxRate: Number(avgTaxRate.toFixed(2))
    }

    printPharmacyBillPDF(billData)
  }, [cart, selectedPrescription])

  const handleDownloadPDF = useCallback(() => {
    if (cart.length === 0 || !selectedPrescription) return

    const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal + tax
    const now = new Date()
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    const billData: BillData = {
      invoiceNumber,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customerName: selectedPrescription.patient 
        ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}` 
        : 'Walk-in Customer',
      customerPhone: selectedPrescription.patient?.mobile_number || 'N/A',
      items: cart.map(item => ({
        id: item.id,
        medicine: item.medicine,
        type: item.type,
        content: item.content,
        quantity: item.quantity,
        selling_price: item.selling_price
      })),
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod: 'Cash',
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: `RX-${selectedPrescription.id}`,
      taxRate: Number(avgTaxRate.toFixed(2))
    }

    generatePharmacyBillPDF(billData)
  }, [cart, selectedPrescription])

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
    )
  }, [])

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
  const tax = cart.reduce((sum, item) => {
    const itemTotal = item.selling_price * item.quantity
    const itemTax = itemTotal * ((item.tax_rate || 5) / 100)
    return sum + itemTax
  }, 0)
  const avgTaxRate = subtotal > 0 ? (tax / subtotal) * 100 : 5
  const total = subtotal + tax

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Sidebar - Prescription Queue */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prescription Queue</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient, ID, or prescription..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading prescriptions...</div>
              ) : prescriptions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No OPD prescriptions found</div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {prescriptions.map((prescription) => {
                    const patientName = prescription.patient
                      ? `${prescription.patient.first_name} ${prescription.patient.last_name}`
                      : "Unknown Patient"
                    const patientInitials = patientName.split(" ").map(n => n[0]).join("").substring(0, 2)
                    const prescriptionNumber = `RX${prescription.id}`
                    
                    return (
                      <Card
                        key={prescription.id}
                        onClick={() => {
                          if (prescription.status === "completed") {
                            alert("This prescription is already completed. This prescription has already been served.")
                            return
                          }
                          setSelectedPrescription(prescription)
                        }}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPrescription?.id === prescription.id
                            ? "border-blue-500 border-2 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                {patientInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-sm text-gray-900">{patientName}</h3>
                                  <p className="text-xs text-gray-600 mt-0.5">{prescriptionNumber}</p>
                                </div>
                                {getStatusBadge(prescription.status)}
                              </div>
                              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(prescription.prescription_date).toLocaleDateString()}</span>
                              </div>
                              <div className="mt-2">
                                <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Doctor Consultation</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Prescription Details OR Billing Screen */}
      <div className="col-span-9">
        {showBilling && selectedPrescription ? (
          /* Billing Screen - Reused from General Sales */
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToPrescription}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Prescription
                  </Button>
                  <CardTitle>Checkout - OPD Prescription RX-{selectedPrescription.id}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Prescription Banner */}
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r">
                  <div className="flex items-center gap-2 text-blue-900">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">
                      Prescription Order - RX-{selectedPrescription.id}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-blue-700">
                    Patient: {selectedPrescription.patient
                      ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}`
                      : "N/A"
                    }
                  </div>
                </div>

                {/* Order Items Grid */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {cart.map((item) => {
                    const itemSubtotal = item.selling_price * item.quantity
                    const itemTax = itemSubtotal * ((item.tax_rate || 0) / 100)
                    const itemTotal = itemSubtotal + itemTax
                    
                    return (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.medicine}</h3>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                          {item.content && (
                            <p className="text-xs text-muted-foreground">{item.content}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-medium">KWD {item.selling_price.toFixed(3)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Qty:</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                          <div className="text-right min-w-[100px]">
                            <p className="text-xs text-muted-foreground">Subtotal</p>
                            <p className="text-sm">KWD {itemSubtotal.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground mt-1">Tax ({item.tax_rate}%)</p>
                            <p className="text-sm">KWD {itemTax.toFixed(3)}</p>
                            <div className="border-t mt-1 pt-1">
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="font-bold text-blue-600">KWD {itemTotal.toFixed(3)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )})}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Bill
                  </Button>
                  <Button variant="outline" onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>

                {/* Order Summary - Right Sidebar */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal (Before Tax)</span>
                        <span>KWD {subtotal.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax ({avgTaxRate.toFixed(1)}%)</span>
                        <span>KWD {tax.toFixed(3)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>Total (After Tax)</span>
                        <span className="text-xl text-green-600">KWD {total.toFixed(3)}</span>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                        onClick={handleConfirmSale}
                        disabled={createOrderMutation.isPending}
                      >
                        {createOrderMutation.isPending ? "Processing..." : "Confirm Sale"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        ) : selectedPrescription ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">Prescription Details</CardTitle>
                  
                  {/* Patient Details */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Patient Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">
                          {selectedPrescription.patient
                            ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}`
                            : "N/A"
                          }
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Patient ID:</span>
                        <span className="font-medium">{selectedPrescription.patient_id}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Civil ID:</span>
                        <span className="font-medium">{selectedPrescription.patient?.civil_id || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Mobile:</span>
                        <span className="font-medium">{selectedPrescription.patient?.mobile_number || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedPrescription.patient?.email || "N/A"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{selectedPrescription.patient?.gender || "N/A"}</span>
                      </div>
                      {selectedPrescription.patient?.dob && (
                        <div className="flex gap-2">
                          <span className="text-gray-600">DOB:</span>
                          <span className="font-medium">
                            {new Date(selectedPrescription.patient.dob).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visit Details */}
                  {selectedPrescription.visit && (
                    <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Visit Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-gray-600">Visit ID:</span>
                          <span className="font-medium">{selectedPrescription.visit.id}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-600">Visit Type:</span>
                          <span className="font-medium capitalize">{selectedPrescription.visit.visit_type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-600">Appointment Time:</span>
                          <span className="font-medium">
                            {new Date(selectedPrescription.visit.time_slot_start).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prescription Info */}
                  <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Prescription Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-600">Prescription Date:</span>
                        <span className="font-medium">
                          {new Date(selectedPrescription.prescription_date).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedPrescription.status)}
                      </div>
                      {selectedPrescription.diagnosis && (
                        <div className="flex gap-2 col-span-2">
                          <span className="text-gray-600">Diagnosis:</span>
                          <span className="font-medium">{selectedPrescription.diagnosis}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-600">Prescription ID</div>
                  <div className="font-medium">RX-{selectedPrescription.id}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Medications Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Medication</th>
                      <th className="text-left p-3 font-medium text-gray-700">Type & Content</th>
                      <th className="text-left p-3 font-medium text-gray-700">Dosage</th>
                      <th className="text-left p-3 font-medium text-gray-700">Route</th>
                      <th className="text-left p-3 font-medium text-gray-700">Frequency</th>
                      <th className="text-left p-3 font-medium text-gray-700">Duration</th>
                      <th className="text-left p-3 font-medium text-gray-700">Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrescriptionItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">
                          No medications in this prescription
                        </td>
                      </tr>
                    ) : (
                      selectedPrescriptionItems.map((item, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium">
                              {item.medicine?.medicine || `Medicine ID: ${item.medicine_id}`}
                            </div>
                          </td>
                          <td className="p-3 text-gray-600">
                            {item.medicine?.type || "N/A"}
                            {item.medicine?.content && (
                              <div className="text-xs text-gray-500">{item.medicine.content}</div>
                            )}
                          </td>
                          <td className="p-3">{item.dosage || "N/A"}</td>
                          <td className="p-3">{item.route || "N/A"}</td>
                          <td className="p-3">{item.frequency || "N/A"}</td>
                          <td className="p-3">{item.duration || "N/A"}</td>
                          <td className="p-3 text-gray-600 text-xs max-w-xs">
                            {item.medication_instructions || "N/A"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Notes Section */}
              {selectedPrescription.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border">
                  <div className="text-sm font-medium text-gray-700 mb-1">Additional Notes:</div>
                  <div className="text-sm text-gray-600">{selectedPrescription.notes}</div>
                </div>
              )}

              {/* Summary Section */}
              <div className="mt-6 flex items-end justify-between">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  OPD
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Total Medications</div>
                  <div className="text-3xl font-bold text-green-600">{selectedPrescriptionItems.length}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                  onClick={handleDispenseAndBill}
                  disabled={selectedPrescriptionItems.length === 0}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Dispense & Bill
                </Button>
                <Button variant="outline" className="h-12 px-6">
                  <Printer className="mr-2 h-5 w-5" />
                  Print Label
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="text-center text-muted-foreground p-6">
              <p className="text-lg">Select a prescription from the queue to dispense</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
