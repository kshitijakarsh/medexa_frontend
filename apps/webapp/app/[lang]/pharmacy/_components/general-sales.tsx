"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Search, Plus, Minus, Trash2, ShoppingCart as CartIcon, ArrowLeft, CheckCircle, Printer, Download } from "lucide-react"
import { useMedicines } from "../_hooks/useMedicine"
import { useQueryClient } from "@tanstack/react-query"
import type { Medicine } from "@/lib/api/medicine-api"
import { generatePharmacyBillPDF, printPharmacyBillPDF, type BillData } from "@/lib/utils/pdf-generator"

interface CartItem extends Medicine {
  quantity: number
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
  const observerTarget = useRef<HTMLDivElement>(null)

  const limit = 10

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
      alert("Cart is empty")
      return
    }
    setIsCheckout(true)
  }, [cart.length])

  const handleBackToShopping = useCallback(() => {
    setIsCheckout(false)
  }, [])

  const handleConfirmSale = useCallback(() => {
    setCart([])
    setIsCheckout(false)
  }, [cart])

  const handlePrint = useCallback(() => {
    if (cart.length === 0) {
      alert("Cart is empty")
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
      customerName: 'Walk-in Customer',
      customerPhone: 'N/A',
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
      pharmacyLicense: 'License No: PH-2024-MEDEXA'
    }

    printPharmacyBillPDF(billData)
  }, [cart])

  const handleDownloadPDF = useCallback(() => {
    if (cart.length === 0) {
      alert("Cart is empty")
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
      customerName: 'Walk-in Customer',
      customerPhone: 'N/A',
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
      pharmacyLicense: 'License No: PH-2024-MEDEXA'
    }

    generatePharmacyBillPDF(billData)
  }, [cart])

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
            <h1 className="text-3xl font-bold">Order Review</h1>
            <p className="text-gray-600 mt-1">Review and confirm your sale</p>
          </div>
          <Button onClick={handleBackToShopping} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({cart.length})</CardTitle>
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
                          Qty: <span className="font-medium">{item.quantity}</span> × $
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
                Print Invoice
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF Invoice
              </Button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-white font-semibold text-base"
                  onClick={handleConfirmSale}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm Sale
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleBackToShopping}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
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
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Available Medicines</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines by name, generic, or category..."
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
                <div className="text-gray-500">Loading medicines...</div>
              </div>
            ) : allMedicines.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">No medicines found</div>
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
                          In Stock: <span className="font-medium text-black">{medicine.total_stock}</span>
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
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Infinite scroll trigger */}
            <div ref={observerTarget} className="h-10 flex items-center justify-center">
              {isFetching && page > 1 && (
                <div className="text-sm text-gray-500">Loading more...</div>
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
                Shopping Cart
              </h2>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-600">
                  Clear All
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
                <p className="text-gray-500">Cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add medicines to start a sale</p>
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
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 h-12"
              disabled={cart.length === 0}
              onClick={handleCompleteSale}
            >
              Complete Sale
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
