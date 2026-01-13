"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Input } from "@workspace/ui/components/input"
import { Search } from "lucide-react"

// Types
interface MedicationOrder {
  id: string
  ward: string
  patientName: string
  mrn: string
  room: string
  admissionDate: string
  status: "Critical" | "Pending" | "Ready"
  medications: OrderMedication[]
  floor: string
  doctor: string
}

interface OrderMedication {
  name: string
  dosage: string
  note: string
  qty: number
  price: number
  total: number
}

// Dummy data
const wards = [
  { id: "ward-01", name: "Ward-01", count: 6 },
  { id: "icu", name: "ICU", count: 3 },
  { id: "general", name: "General Ward", count: 8 },
  { id: "ot", name: "OT", count: 2 },
]

const medicationOrders: MedicationOrder[] = [
  {
    id: "1",
    ward: "ward-01",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    room: "Bed 1",
    admissionDate: "2025-01-02",
    status: "Critical",
    floor: "2nd Floor",
    doctor: "Dr. Ali Hassan",
    medications: []
  },
  {
    id: "2",
    ward: "icu",
    patientName: "Ahmad Malik",
    mrn: "MRN-2502",
    room: "ICU-3",
    admissionDate: "2025-01-05",
    status: "Pending",
    floor: "3rd Floor",
    doctor: "Dr. Sarah Ahmed",
    medications: [
      { name: "Meropenem", dosage: "500 mg", note: "IV, Thrice daily, Post Meals", qty: 3, price: 35, total: 75 }
    ]
  },
  {
    id: "3",
    ward: "general",
    patientName: "Zainab Ibrahim",
    mrn: "MRN-2503",
    room: "G-204",
    admissionDate: "2025-01-08",
    status: "Ready",
    floor: "2nd Floor",
    doctor: "Dr. Hassan Ali",
    medications: []
  },
]

export function IPDPharmacy() {
  const [selectedWard, setSelectedWard] = useState("ward-01")
  const [selectedOrder, setSelectedOrder] = useState<MedicationOrder | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = medicationOrders.filter(order =>
    order.ward === selectedWard &&
    (order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     order.mrn.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const subtotal = selectedOrder?.medications.reduce((sum, med) => sum + med.total, 0) || 0
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Sidebar - Ward Selection & Orders */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Medication Orders</CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Ward Filters */}
            <div className="px-4 py-3 space-y-2 border-b bg-gray-50">
              {wards.map((ward) => (
                <div
                  key={ward.id}
                  onClick={() => setSelectedWard(ward.id)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    selectedWard === ward.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">{ward.name}</span>
                  <Badge
                    variant="outline"
                    className={selectedWard === ward.id ? "bg-white text-blue-600" : "bg-blue-50 text-blue-600 border-blue-200"}
                  >
                    {ward.count}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Orders List */}
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`flex items-center gap-3 p-4 border-b cursor-pointer transition-colors ${
                    selectedOrder?.id === order.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {order.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{order.patientName}</div>
                    <div className="text-xs text-gray-600">{order.mrn}</div>
                    <div className="text-xs text-gray-500">{order.room}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      order.status === "Critical"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : order.status === "Pending"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="link" className="text-blue-600 p-0">View All →</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Order Details */}
      <div className="col-span-9">
        {selectedOrder ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">IPD Medication Order</CardTitle>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{selectedOrder.room}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Admission Date:</span>
                      <span className="font-medium">{selectedOrder.admissionDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium">{selectedOrder.floor}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Ward:</span>
                      <span className="font-medium">{selectedOrder.ward.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Order ID</div>
                  <div className="font-medium">IPD-ARZA30448</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {selectedOrder.medications.length > 0 ? (
                <>
                  {/* Medications Table */}
                  <div className="space-y-3">
                    <div className="font-medium">Medications to Dispense</div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left p-3 font-medium text-gray-700">Medication</th>
                            <th className="text-left p-3 font-medium text-gray-700">Dosage</th>
                            <th className="text-left p-3 font-medium text-gray-700">Note</th>
                            <th className="text-right p-3 font-medium text-gray-700">Qty</th>
                            <th className="text-right p-3 font-medium text-gray-700">U/Price</th>
                            <th className="text-right p-3 font-medium text-gray-700">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.medications.map((med, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="p-3">{med.name}</td>
                              <td className="p-3">{med.dosage}</td>
                              <td className="p-3 text-gray-600">{med.note}</td>
                              <td className="p-3 text-right">{med.qty}</td>
                              <td className="p-3 text-right">${med.price}</td>
                              <td className="p-3 text-right font-medium">${med.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                    <p>✓ Please label the medication packet to deliver to patient's IPD room (specify the room and floor details on the label)</p>
                  </div>

                  {/* Payment Summary */}
                  <div className="mt-6 flex justify-end">
                    <div className="w-96 space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Tax (10%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-base font-bold">
                        <span>Total Amount</span>
                        <span className="text-green-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-12">
                      Complete & Dispatch
                    </Button>
                    <Button variant="outline" className="px-8 h-12 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                      Print Label
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Select a medication order to dispense</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
            <div className="text-center text-muted-foreground p-6">
              <p className="text-lg">Select a medication order to dispense</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
