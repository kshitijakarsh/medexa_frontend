"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeft, CheckCircle, Printer, Download } from "lucide-react"
import type { Medicine } from "@/lib/api/medicine-api"
import { generatePharmacyBillPDF, printPharmacyBillPDF, type BillData } from "@/lib/utils/pdf-generator"

interface CartItem extends Medicine {
  quantity: number
}

export function GeneralSalesCheckout() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse cart data from URL params
  const cartJson = searchParams.get("cart")
  let cart: CartItem[] = []
  let subtotal = 0
  let tax = 0
  let total = 0

  try {
    if (cartJson) {
      cart = JSON.parse(decodeURIComponent(cartJson))
      subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
      tax = subtotal * 0.05
      total = subtotal + tax
    }
  } catch (e) {
    console.error("[GeneralSalesCheckout] Failed to parse cart:", e)
  }

  if (cart.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[600px]">
        <div className="text-gray-500 mb-4">No items to checkout</div>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Button>
      </div>
    )
  }

  const handleConfirmSale = () => {
    console.log("[GeneralSalesCheckout] Sale confirmed with items:", cart)
    // TODO: Call API to save the sale
    alert("Sale completed successfully!")
    router.push("/en/pharmacy/general-sales")
  }

  const handlePrint = () => {
    const billData = prepareBillData()
    printPharmacyBillPDF(billData)
  }

  const handleDownloadPDF = () => {
    const billData = prepareBillData()
    generatePharmacyBillPDF(billData)
  }

  const prepareBillData = (): BillData => {
    const now = new Date()
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    
    return {
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
      pharmacyAddress: '123 Healthcare Street, Medical District, Dubai, UAE',
      pharmacyPhone: '+971 4 123 4567',
      pharmacyLicense: 'License No: PH-2024-12345'
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order Review</h1>
          <p className="text-gray-600 mt-1">Review and confirm your sale</p>
        </div>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
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

          {/* Actions */}
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
              Download PDF
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
                onClick={() => router.back()}
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
