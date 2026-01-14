"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Input } from "@workspace/ui/components/input"
import { Search, User, Calendar, FileText, Bed, ArrowLeft, Download, Printer, CheckCircle } from "lucide-react"
import { usePrescriptions } from "../_hooks/usePrescription"
import type { Prescription } from "@/lib/api/prescription-api"
import type { Medicine } from "@/lib/api/medicine-api"
import { useCreateOrder } from "../_hooks/useOrder"
import type { CreateOrderPayload } from "@/lib/api/order-api"
import { generatePharmacyBillPDF, printPharmacyBillPDF, type BillData } from "@/lib/utils/pdf-generator"
import { useDictionary } from "@/i18n/use-dictionary"

interface CartItem extends Medicine {
  quantity: number
}

export function IPDPharmacy() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showBilling, setShowBilling] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.ipd
  const phCommonDict = dict.pages.pharmacy.common
  const commonFields = dict.pages.common.fields
  const commonDict = dict.common

  const createOrderMutation = useCreateOrder()

  // Fetch IPD prescriptions
  const { data, isLoading } = usePrescriptions({
    search: searchQuery || undefined,
    limit: 50,
  })

  // Filter prescriptions that have ipd_id (IPD)
  const prescriptions = (data?.data || []).filter(p => p.ipd_id)

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return <Badge className="bg-red-500">{pDict.status.critical}</Badge>
    } else if (status === "active") {
      return <Badge className="bg-yellow-500">{phCommonDict.pending}</Badge>
    } else {
      return <Badge className="bg-green-500">{pDict.status.ready}</Badge>
    }
  }

  const selectedPrescriptionItems = selectedPrescription?.prescription_items || []

  const handleDispenseAndBill = useCallback(() => {
    if (!selectedPrescription || !selectedPrescription.prescription_items) return

    // Convert prescription items to cart items
    const cartItems: CartItem[] = selectedPrescription.prescription_items
      .filter(item => item.medicine)
      .map(item => ({
        id: item.medicine!.id,
        tenant_id: 0,
        medicine_category_id: 0,
        medicine: item.medicine!.medicine,
        type: item.medicine!.type,
        content: item.medicine!.content || '',
        quantity: 1,
        total_stock: 999,
        min_level: 0,
        unit_price: 0,
        selling_price: 0,
        status: 'active',
        is_deleted: false,
      }))

    setCart(cartItems)
    setShowBilling(true)
  }, [selectedPrescription])

  const handleBackToPrescription = useCallback(() => {
    setShowBilling(false)
    setCart([])
  }, [])

  const handleConfirmSale = useCallback(async () => {
    if (cart.length === 0 || !selectedPrescription) {
      alert(dict.pages.pharmacy.opd.alerts.cartEmpty)
      return
    }

    try {
      const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
      const tax = subtotal * 0.05
      const total = subtotal + tax

      const orderPayload: CreateOrderPayload = {
        patient_id: selectedPrescription.patient_id,
        prescription_id: selectedPrescription.id,
        status: "completed",
        payment_status: "paid",
        payment_method: "Cash",
        notes: pDict.ipdPrescriptionOrder.replace("{{id}}", selectedPrescription.id.toString()),
        order_items: cart.map(item => ({
          medicine_id: item.id,
          quantity: item.quantity,
          price_at_sale: item.selling_price,
        }))
      }

      const response = await createOrderMutation.mutateAsync(orderPayload)
      alert(dict.pages.pharmacy.opd.alerts.orderSuccess.replace("{{id}}", response.data.id.toString()))

      // Reset
      setCart([])
      setShowBilling(false)
      setSelectedPrescription(null)
    } catch (error: any) {
      console.error("Failed to create order:", error)
      alert(dict.pages.pharmacy.opd.alerts.orderFailed.replace("{{message}}", error.response?.data?.message || error.message))
    }
  }, [cart, selectedPrescription, createOrderMutation])

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
        : dict.pages.pharmacy.opd.checkout.walkInCustomer,
      customerPhone: selectedPrescription.patient?.mobile_number || commonDict.noData,
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
      paymentMethod: dict.pages.pharmacy.opd.checkout.cash,
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: `RX-${selectedPrescription.id}`
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
        : dict.pages.pharmacy.opd.checkout.walkInCustomer,
      customerPhone: selectedPrescription.patient?.mobile_number || commonDict.noData,
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
      paymentMethod: dict.pages.pharmacy.opd.checkout.cash,
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: `RX-${selectedPrescription.id}`
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
  const tax = subtotal * 0.05
  const total = subtotal + tax

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Sidebar - IPD Prescriptions */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{pDict.prescriptionQueue}</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={pDict.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">{phCommonDict.loadingPrescriptions}</div>
              ) : prescriptions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">{pDict.noPrescriptionsFound}</div>
              ) : (
                prescriptions.map((prescription) => {
                  const patientName = prescription.patient
                    ? `${prescription.patient.first_name} ${prescription.patient.last_name}`
                    : dict.pages.surgery.common.fallbacks.unknownPatient
                  const patientInitials = patientName.split(" ").map(n => n[0]).join("").substring(0, 2)

                  return (
                    <div
                      key={prescription.id}
                      onClick={() => setSelectedPrescription(prescription)}
                      className={`flex items-center gap-3 p-4 border-b cursor-pointer transition-colors ${selectedPrescription?.id === prescription.id
                        ? "bg-blue-50 border-l-4 border-l-blue-600"
                        : "hover:bg-gray-50"
                        }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {patientInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{patientName}</div>
                        <div className="text-xs text-gray-600">{dict.common.employeeId}: {prescription.patient_id}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(prescription.prescription_date).toLocaleDateString()}
                        </div>
                      </div>
                      {getStatusBadge(prescription.status)}
                    </div>
                  )
                })
              )}
            </div>
            <div className="p-4 border-t">
              <Button variant="link" className="text-blue-600 p-0">{phCommonDict.viewAll} →</Button>
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
                    {dict.pages.pharmacy.opd.checkout.backToPrescription}
                  </Button>
                  <CardTitle>{dict.pages.pharmacy.opd.checkout.title} - {pDict.title} RX-{selectedPrescription.id}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Prescription Banner */}
                <div className="mb-4 p-4 bg-purple-50 border-l-4 border-purple-600 rounded-r">
                  <div className="flex items-center gap-2 text-purple-900">
                    <Bed className="h-5 w-5" />
                    <span className="font-medium">
                      {pDict.ipdPrescriptionOrder.replace("{{id}}", selectedPrescription.id.toString())}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-purple-700">
                    {dict.table.patient}: {selectedPrescription.patient
                      ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}`
                      : commonDict.noData
                    }
                  </div>
                </div>

                {/* Order Items Grid */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {cart.map((item) => (
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
                            <p className="text-sm text-muted-foreground">{dict.pages.charges.columns.standardCharge}</p>
                            <p className="font-medium">KWD {item.selling_price.toFixed(3)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right min-w-[80px]">
                            <p className="text-sm text-muted-foreground">{dict.pages.pharmacy.opd.checkout.total}</p>
                            <p className="font-medium">KWD {(item.selling_price * item.quantity).toFixed(3)}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    {dict.pages.pharmacy.opd.checkout.printBill}
                  </Button>
                  <Button variant="outline" onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    {dict.pages.pharmacy.opd.checkout.downloadPdf}
                  </Button>
                </div>

                {/* Order Summary - Right Sidebar */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">{dict.pages.pharmacy.opd.checkout.summary}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{phCommonDict.subtotal}</span>
                        <span>KWD {subtotal.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{phCommonDict.tax}</span>
                        <span>KWD {tax.toFixed(3)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>{dict.pages.pharmacy.opd.checkout.total}</span>
                        <span className="text-xl text-green-600">KWD {total.toFixed(3)}</span>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                        onClick={handleConfirmSale}
                        disabled={createOrderMutation.isPending}
                      >
                        {createOrderMutation.isPending ? phCommonDict.processing : phCommonDict.confirmSale}
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
                  <CardTitle className="text-base">{pDict.detailsTitle}</CardTitle>

                  {/* Patient Details */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">{commonFields.patientInfo}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-600">{dict.table.patient}:</span>
                        <span className="font-medium">
                          {selectedPrescription.patient
                            ? `${selectedPrescription.patient.first_name} ${selectedPrescription.patient.last_name}`
                            : commonDict.noData
                          }
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonFields.mrn}:</span>
                        <span className="font-medium">{selectedPrescription.patient_id}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonFields.civilId}:</span>
                        <span className="font-medium">{selectedPrescription.patient?.civil_id || commonDict.noData}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonFields.phone}:</span>
                        <span className="font-medium">{selectedPrescription.patient?.mobile_number || commonDict.noData}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonFields.email}:</span>
                        <span className="font-medium">{selectedPrescription.patient?.email || commonDict.noData}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonFields.gender}:</span>
                        <span className="font-medium capitalize">{selectedPrescription.patient?.gender || commonDict.noData}</span>
                      </div>
                      {selectedPrescription.patient?.dob && (
                        <div className="flex gap-2">
                          <span className="text-gray-600">{commonFields.dob}:</span>
                          <span className="font-medium">
                            {new Date(selectedPrescription.patient.dob).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* IPD Details */}
                  {selectedPrescription.ipd && (
                    <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Bed className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-purple-900">IPD Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-gray-600">{dict.common.employeeId}:</span>
                          <span className="font-medium">{selectedPrescription.ipd.id}</span>
                        </div>
                        {selectedPrescription.ipd.bed_id && (
                          <div className="flex gap-2">
                            <span className="text-gray-600">{commonFields.bedId}:</span>
                            <span className="font-medium">{selectedPrescription.ipd.bed_id}</span>
                          </div>
                        )}
                        {selectedPrescription.ipd.admission_date && (
                          <div className="flex gap-2">
                            <span className="text-gray-600">Admission Date:</span>
                            <span className="font-medium">
                              {new Date(selectedPrescription.ipd.admission_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {selectedPrescription.ipd.discharge_date && (
                          <div className="flex gap-2">
                            <span className="text-gray-600">Discharge Date:</span>
                            <span className="font-medium">
                              {new Date(selectedPrescription.ipd.discharge_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prescription Info */}
                  <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">{commonFields.prescriptionInfo}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-600">{dict.common.date}:</span>
                        <span className="font-medium">
                          {new Date(selectedPrescription.prescription_date).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">{commonDict.status}:</span>
                        {getStatusBadge(selectedPrescription.status)}
                      </div>
                      {selectedPrescription.diagnosis && (
                        <div className="flex gap-2 col-span-2">
                          <span className="text-gray-600">{commonFields.diagnosis}:</span>
                          <span className="font-medium">{selectedPrescription.diagnosis}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-600">{commonFields.prescriptionId}</div>
                  <div className="font-medium">IPD-{selectedPrescription.id}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {selectedPrescriptionItems.length > 0 ? (
                <>
                  {/* Medications Table */}
                  <div className="space-y-3">
                    <div className="font-medium">{pDict.medicationsToDispense}</div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.medication}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.typeContent}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.dosage}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.route}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.frequency}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.duration}</th>
                            <th className="text-left p-3 font-medium text-gray-700">{commonFields.instructions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPrescriptionItems.map((item, index) => (
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
                              <td className="p-3 text-gray-600">{item.frequency || "N/A"}</td>
                              <td className="p-3">{item.duration || "N/A"}</td>
                              <td className="p-3 text-gray-600 text-xs max-w-xs">
                                {item.medication_instructions || "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {selectedPrescription.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md border">
                      <div className="text-sm font-medium text-gray-700 mb-1">{phCommonDict.additionalNotes}</div>
                      <div className="text-sm text-gray-600">{selectedPrescription.notes}</div>
                    </div>
                  )}

                  {/* Note */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                    <p>✓ {pDict.labelInstruction}</p>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 flex justify-between items-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      IPD
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">{phCommonDict.totalMedications}</div>
                      <div className="text-3xl font-bold text-purple-600">{selectedPrescriptionItems.length}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                      onClick={handleDispenseAndBill}
                      disabled={selectedPrescriptionItems.length === 0}
                    >
                      {phCommonDict.dispenseAndBill}
                    </Button>
                    <Button variant="outline" className="px-8 h-12 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                      {phCommonDict.printLabel}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>{phCommonDict.noMedications}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="text-center text-muted-foreground p-6">
              <p className="text-lg">{pDict.selectOrder}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
