"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Search, Plus, Minus, Trash2, ShoppingCart as CartIcon, ArrowLeft, CheckCircle, Printer, Download, User } from "lucide-react"
import { useMedicines } from "../_hooks/useMedicine"
import { usePatients } from "../_hooks/usePatient"
import { useQueryClient } from "@tanstack/react-query"
import type { Medicine } from "@/lib/api/medicine-api"
import type { Patient } from "@/lib/api/patient-api"
import { generatePharmacyBillPDF, printPharmacyBillPDF, type BillData } from "@/lib/utils/pdf-generator"
import { useCreateOrder } from "../_hooks/useOrder"
import { useDictionary } from "@/i18n/use-dictionary"
import type { CreateOrderPayload } from "@/lib/api/order-api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Label } from "@workspace/ui/components/label"

interface CartItem extends Medicine {
  quantity: number
}

interface PrescriptionBillData {
  prescription: any
  prescriptionItems: any[]
  patient: any
  prescriptionId: number
}

export function GeneralSales() {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)
  const [allMedicines, setAllMedicines] = useState<Medicine[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckout, setIsCheckout] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patientSearch, setPatientSearch] = useState("")
  const [debouncedPatientSearch, setDebouncedPatientSearch] = useState("")
  const [showPatientDropdown, setShowPatientDropdown] = useState(false)
  const [prescriptionId, setPrescriptionId] = useState<number | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.generalSales
  const opdDict = dict.pages.pharmacy.opd
  const phCommonDict = dict.pages.pharmacy.common
  const commonFields = dict.pages.common.fields
  const commonDict = dict.common

  const createOrderMutation = useCreateOrder()
  const limit = 10

  // Load prescription data from localStorage on mount
  useEffect(() => {
    const billDataStr = localStorage.getItem('pharmacy_bill_data')
    if (billDataStr) {
      try {
        const billData: PrescriptionBillData = JSON.parse(billDataStr)

        // Set patient if available
        if (billData.patient) {
          setSelectedPatient(billData.patient as Patient)
        }

        // Set prescription ID for order creation
        if (billData.prescriptionId) {
          setPrescriptionId(billData.prescriptionId)
        }

        // Pre-fill cart with prescription items
        if (billData.prescriptionItems && billData.prescriptionItems.length > 0) {
          // We need to convert prescription items to cart items
          // Since prescription items don't have full medicine pricing, we'll need to fetch those
          const prescriptionMedicineIds = billData.prescriptionItems.map(item => item.medicine_id)
          console.log('[GeneralSales] Loading prescription medicines:', prescriptionMedicineIds)

          // For now, create cart items from prescription data
          // We'll need to update prices when medicines are fetched
          const cartItems: CartItem[] = billData.prescriptionItems
            .filter(item => item.medicine)
            .map(item => ({
              id: item.medicine.id,
              tenant_id: 0, // Will be set by backend
              medicine_category_id: 0, // Will be set when medicine data is fetched
              medicine: item.medicine.medicine,
              type: item.medicine.type,
              content: item.medicine.content || '',
              quantity: 1, // Default quantity, can be adjusted
              total_stock: 999, // Placeholder
              min_level: 0,
              unit_price: 0,
              selling_price: 0, // Will be updated when medicine data is fetched
              status: 'active',
              is_deleted: false,
            }))

          setCart(cartItems)
          setIsCheckout(true) // Go directly to checkout for prescription orders
        }

        // Clear the data after loading
        localStorage.removeItem('pharmacy_bill_data')
      } catch (error) {
        console.error('[GeneralSales] Error loading prescription data:', error)
      }
    }
  }, [])

  // Debounce patient search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPatientSearch(patientSearch)
    }, 300)
    return () => clearTimeout(timer)
  }, [patientSearch])

  // Fetch patients for dropdown
  const { data: patientsData } = usePatients({
    limit: 10,
    search: debouncedPatientSearch || undefined,
    enabled: showPatientDropdown || !!debouncedPatientSearch,
  })

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
      // Only clear medicines when search actually changes, not on initial mount
      if (search !== debouncedSearch) {
        setAllMedicines([])
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [search, debouncedSearch])

  const queryParams: { page: number; limit: number; search?: string; enabled?: boolean } = { page, limit, enabled: true }
  if (debouncedSearch.trim() !== "") queryParams.search = debouncedSearch
  const { data, isLoading, isFetching } = useMedicines(queryParams)

  // Append new medicines to the list
  useEffect(() => {
    if (data) {
      console.log("[GeneralSales] Setting medicines, page:", page, "data:", data)
      const medicinesData = data.data || data
      if (Array.isArray(medicinesData)) {
        setAllMedicines((prev) => {
          if (page === 1) {
            console.log("[GeneralSales] Page 1, setting fresh data:", medicinesData)
            return medicinesData
          }
          const existingIds = new Set(prev.map((m) => m.id))
          const newMedicines = medicinesData.filter((m) => !existingIds.has(m.id))
          console.log("[GeneralSales] Appending medicines, new count:", newMedicines.length)
          return [...prev, ...newMedicines]
        })
      }
    }
  }, [data, page])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetching) {
          // Check if there's a next page: current page < total pages
          const hasNextPage = data?.pagination && data.pagination.page < data.pagination.totalPages
          console.log("[GeneralSales] Scroll check - hasNextPage:", hasNextPage, "pagination:", data?.pagination)
          if (hasNextPage) {
            setPage((prev) => prev + 1)
          }
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [data?.pagination, isFetching])

  const addToCart = useCallback((medicine: Medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === medicine.id)
      if (existing) {
        return prev.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...medicine, quantity: 1 }]
    })
  }, [])

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  // Handle checkout
  const handleCompleteSale = useCallback(() => {
    if (cart.length === 0) {
      alert(opdDict.alerts.cartEmpty)
      return
    }
    setIsCheckout(true)
  }, [cart.length, opdDict.alerts.cartEmpty])

  const handleBackToShopping = useCallback(() => {
    setIsCheckout(false)
  }, [])

  const handleConfirmSale = useCallback(async () => {
    if (cart.length === 0) {
      alert(opdDict.alerts.cartEmpty)
      return
    }

    try {
      const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
      const tax = subtotal * 0.05
      const total = subtotal + tax

      // Prepare order payload
      const orderPayload: CreateOrderPayload = {
        patient_id: selectedPatient ? Number(selectedPatient.id) : undefined,
        prescription_id: prescriptionId || undefined,
        status: "completed",
        payment_status: "paid",
        payment_method: "Cash",
        notes: prescriptionId ? pDict.prescriptionOrder.replace("{{id}}", prescriptionId.toString()) : pDict.generalSalesOrder,
        order_items: cart.map(item => ({
          medicine_id: item.id,
          quantity: item.quantity,
          price_at_sale: item.selling_price,
        }))
      }

      console.log("[GeneralSales] Creating order with payload:", orderPayload)

      // Create the order
      const response = await createOrderMutation.mutateAsync(orderPayload)

      console.log("[GeneralSales] Order created successfully:", response)
      alert(opdDict.alerts.orderSuccess.replace("{{id}}", response.data.id.toString()))

      // Clear cart, prescription ID, and go back to shopping
      setCart([])
      setSelectedPatient(null)
      setPatientSearch("")
      setPrescriptionId(null)
      setIsCheckout(false)
    } catch (error: any) {
      console.error("[GeneralSales] Failed to create order:", error)
      alert(opdDict.alerts.orderFailed.replace("{{message}}", error.response?.data?.message || error.message))
    }
  }, [cart, createOrderMutation, selectedPatient, prescriptionId])

  const handlePrint = useCallback(() => {
    if (cart.length === 0) {
      alert(opdDict.alerts.cartEmpty)
      return
    }

    const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal + tax
    const now = new Date()
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    const billData: BillData = {
      invoiceNumber,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customerName: selectedPatient
        ? `${selectedPatient.first_name} ${selectedPatient.last_name}`
        : opdDict.checkout.walkInCustomer,
      customerPhone: selectedPatient?.mobile_number || commonDict.noData,
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
      paymentMethod: opdDict.checkout.cash,
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: prescriptionId ? `RX-${prescriptionId}` : undefined
    }

    printPharmacyBillPDF(billData)
  }, [cart, selectedPatient, prescriptionId])

  const handleDownloadPDF = useCallback(() => {
    if (cart.length === 0) {
      alert(opdDict.alerts.cartEmpty)
      return
    }

    const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal + tax
    const now = new Date()
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    const billData: BillData = {
      invoiceNumber,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customerName: selectedPatient
        ? `${selectedPatient.first_name} ${selectedPatient.last_name}`
        : opdDict.checkout.walkInCustomer,
      customerPhone: selectedPatient?.mobile_number || commonDict.noData,
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
      paymentMethod: opdDict.checkout.cash,
      pharmacyName: 'Medexa Pharmacy',
      pharmacyAddress: 'Healthcare Excellence Center, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 XXX XXXX',
      pharmacyLicense: 'License No: PH-2024-MEDEXA',
      prescriptionRef: prescriptionId ? `RX-${prescriptionId}` : undefined
    }

    generatePharmacyBillPDF(billData)
  }, [cart, selectedPatient, prescriptionId])

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  // Checkout View
  if (isCheckout) {
    return (
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {prescriptionId ? pDict.prescriptionOrderReview : pDict.orderReview}
            </h1>
            <p className="text-gray-600 mt-1">
              {prescriptionId
                ? `${pDict.dispensingPrescription.replace("{{id}}", prescriptionId.toString())}`
                : pDict.reviewAndConfirm}
            </p>
          </div>
          <Button onClick={handleBackToShopping} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {pDict.backToShopping}
          </Button>
        </div>

        {/* Prescription Info Banner */}
        {prescriptionId && selectedPatient && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  Rx
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-blue-900">
                    {pDict.prescriptionOrderReview} - RX-{prescriptionId}
                  </div>
                  <div className="text-sm text-blue-700">
                    {dict.table.patient}: {selectedPatient.first_name} {selectedPatient.last_name}
                    {selectedPatient.mobile_number && ` • ${selectedPatient.mobile_number}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{pDict.orderItems.replace("{{count}}", cart.length.toString())}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{item.medicine}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.type} {item.content && `• ${item.content}`}
                        </p>
                        <div className="text-sm text-gray-600 mt-2">
                          {phCommonDict.qty}: <span className="font-medium">{item.quantity}</span> × $
                          {item.selling_price.toFixed(2)} = ${(item.selling_price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          ${(item.selling_price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handlePrint}
              >
                <Printer className="mr-2 h-4 w-4" />
                {pDict.printInvoice}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                {pDict.downloadPdfInvoice}
              </Button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{opdDict.checkout.summary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{phCommonDict.subtotal}</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{phCommonDict.tax}</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 text-lg font-bold">
                    <span>{opdDict.checkout.total}</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-white font-semibold text-base"
                  onClick={handleConfirmSale}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {phCommonDict.confirmSale}
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleBackToShopping}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {pDict.continueShopping}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left: Medicine List */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <div className="p-6 border-b space-y-4">
            <h2 className="text-lg font-semibold">{pDict.availableMedicines}</h2>

            {/* Patient Selection */}
            <div>
              <Label className="text-sm font-medium mb-2 block">{phCommonDict.selectPatient}</Label>
              {selectedPatient ? (
                <div className="p-3 bg-blue-50 rounded-md border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-blue-900">
                        {selectedPatient.first_name} {selectedPatient.last_name}
                      </div>
                      <div className="text-xs text-blue-600">
                        {selectedPatient.mobile_number}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    onClick={() => {
                      setSelectedPatient(null)
                      setPatientSearch("")
                      setShowPatientDropdown(false)
                    }}
                  >
                    {dict.common.clear}
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    placeholder={pDict.patientSearchPlaceholder}
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value)
                      setShowPatientDropdown(true)
                    }}
                    onFocus={() => setShowPatientDropdown(true)}
                    className="pl-10"
                  />
                  {showPatientDropdown && patientSearch && patientsData?.data && patientsData.data.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      {patientsData.data.map((patient) => (
                        <button
                          key={patient.id}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b last:border-b-0"
                          onClick={() => {
                            setSelectedPatient(patient)
                            setPatientSearch("")
                            setShowPatientDropdown(false)
                          }}
                        >
                          <div className="font-medium text-sm">
                            {patient.first_name} {patient.last_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {patient.mobile_number} {patient.civil_id && `• ${patient.civil_id}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Medicine Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={pDict.medicineSearchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {(() => {
              console.log("[GeneralSales] Rendering - allMedicines count:", allMedicines.length, "isLoading:", isLoading, "page:", page)
              return null
            })()}
            {isLoading && page === 1 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">{phCommonDict.loadingMedicines}</div>
              </div>
            ) : allMedicines.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">{phCommonDict.noMedicinesFound}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allMedicines.map((medicine) => (
                  <Card key={medicine.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{medicine.medicine}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {medicine.type} {medicine.content && `• ${medicine.content}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600">
                          {phCommonDict.inStock}: <span className="font-medium text-black">{medicine.total_stock}</span>
                        </div>
                        <div className="text-base font-bold text-blue-600">
                          ${medicine.selling_price.toFixed(2)}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => addToCart(medicine)}
                        disabled={medicine.total_stock <= 0}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {pDict.addToCart}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Infinite scroll trigger */}
            <div ref={observerTarget} className="h-10 flex items-center justify-center">
              {isFetching && page > 1 && (
                <div className="text-sm text-gray-500">{dict.common.loading}...</div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Right: Shopping Cart */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CartIcon className="h-5 w-5" />
                {pDict.shoppingCart}
              </h2>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-600">
                  {phCommonDict.clearAll}
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <CartIcon className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500">{opdDict.alerts.cartEmpty}</p>
                <p className="text-sm text-gray-400 mt-1">{pDict.addMedicinesToStart}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.medicine}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          ${item.selling_price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.total_stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="font-bold text-blue-600">
                        ${(item.selling_price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Total Section */}
          <div className="border-t p-6">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{phCommonDict.subtotal}</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{phCommonDict.tax}</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 text-lg font-bold">
                <span>{phCommonDict.totalAmount}</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 h-12"
              disabled={cart.length === 0}
              onClick={handleCompleteSale}
            >
              {pDict.completeSale}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
