"use client"

import { useState } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Search, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useMedicines } from "../_hooks/useMedicine"
import { Medicine } from "@/lib/api/medicine-api"
import { useDictionary } from "@/i18n/use-dictionary"

interface CartItem extends Medicine {
  cartQuantity: number
}

export function AvailableMedicines() {
  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.generalSales
  const phCommonDict = dict.pages.pharmacy.common
  const invDict = dict.pages.pharmacy.inventory
  const opdDict = dict.pages.pharmacy.opd

  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])

  // Fetch medicines from API
  const { data: medicinesData, isLoading } = useMedicines({
    page: 1,
    limit: 100,
    search: searchQuery || undefined,
  })

  const medicines = medicinesData?.data ?? []

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find((item) => item.id === medicine.id)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...medicine, cartQuantity: 1 }])
    }
  }

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, cartQuantity: quantity } : item))
      )
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicine.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Panel - Available Medicines */}
      <div className="col-span-8">
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-3">{pDict.availableMedicines}</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={pDict.medicineSearchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <CardContent className="p-4">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredMedicines.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">{invDict.noMedicinesFound}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredMedicines.map((medicine) => (
                  <Card key={medicine.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm line-clamp-1">{medicine.medicine}</h4>
                          <p className="text-xs text-gray-600">{medicine.type}</p>
                          <p className="text-xs text-gray-500">{medicine.content || '100ml, Syrup'}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <div className="text-xs text-gray-600">{phCommonDict.inStock}</div>
                            <div className="font-medium">{medicine.total_stock}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">{phCommonDict.price}</div>
                            <div className="font-semibold text-blue-600">${medicine.selling_price.toFixed(2)}</div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-blue-500 hover:bg-blue-600"
                          onClick={() => addToCart(medicine)}
                          disabled={medicine.total_stock <= 0}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          {pDict.addToCart}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Shopping Cart */}
      <div className="col-span-4">
        <Card className="sticky top-4">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-semibold">{pDict.shoppingCart}</h3>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-3" />
              <p className="text-gray-500">{opdDict.alerts.cartEmpty}</p>
              <p className="text-sm text-gray-400 mt-1">{pDict.addMedicinesToStart}</p>
            </div>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <div className="font-medium text-sm line-clamp-1">{item.medicine}</div>
                        <div className="text-xs text-gray-600">{item.type}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                          className="h-7 w-7 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-sm">{item.cartQuantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm font-semibold">
                        ${(item.selling_price * item.cartQuantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{phCommonDict.subtotal}:</span>
                    <span className="font-medium">
                      ${cart.reduce((sum, item) => sum + item.selling_price * item.cartQuantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{phCommonDict.tax} (10%):</span>
                    <span className="font-medium">
                      ${(cart.reduce((sum, item) => sum + item.selling_price * item.cartQuantity, 0) * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>{opdDict.checkout.total}:</span>
                    <span className="text-green-600">
                      ${(cart.reduce((sum, item) => sum + item.selling_price * item.cartQuantity, 0) * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => { }}>
                  {opdDict.checkout.confirmDispense}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
