"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Search, Printer, CheckCircle } from "lucide-react"

// Types
interface Prescription {
  id: string
  patientName: string
  mrn: string
  cabinId: string
  time: string
  date: string
  status: "Waiting" | "Done"
  doctor: string
  medications: Medication[]
}

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  qty: number
  price: number
  status: string
}

// Dummy data
const prescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    cabinId: "CAB-123456",
    time: "09:00",
    date: "2025-01-02",
    status: "Waiting",
    doctor: "Dr. Ali Hassan",
    medications: [
      { name: "Augmentin 625mg", dosage: "1 tab", frequency: "Twice daily", duration: "7 days", qty: 14, price: 8.45, status: "In Stock" },
      { name: "Vitamin D3 1000 IU", dosage: "1 cap", frequency: "Once daily", duration: "30 days", qty: 30, price: 9.15, status: "In Stock" },
    ]
  },
  {
    id: "2",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    cabinId: "CAB-123456",
    time: "09:00",
    date: "T-101",
    status: "Waiting",
    doctor: "Dr. Ali Hassan",
    medications: []
  },
  {
    id: "3",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    cabinId: "CAB-123456",
    time: "09:00",
    date: "T-161",
    status: "Waiting",
    doctor: "Dr. Ali Hassan",
    medications: []
  },
  {
    id: "4",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    cabinId: "CAB-123456",
    time: "09:00",
    date: "T-161",
    status: "Done",
    doctor: "Dr. Ali Hassan",
    medications: []
  },
  {
    id: "5",
    patientName: "Fatima Al-Sabah",
    mrn: "MRN-2501",
    cabinId: "CAB-123456",
    time: "09:00",
    date: "T-161",
    status: "Done",
    doctor: "Dr. Ali Hassan",
    medications: []
  },
]

export function OPDDispensing() {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(prescriptions[0] || null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrescriptions = prescriptions.filter(p =>
    p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const subtotal = selectedPrescription?.medications.reduce((sum, med) => sum + (med.price * med.qty), 0) || 0
  const total = subtotal

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
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  onClick={() => setSelectedPrescription(prescription)}
                  className={`flex items-center gap-3 p-4 border-b cursor-pointer transition-colors ${
                    selectedPrescription?.id === prescription.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {prescription.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{prescription.patientName}</div>
                    <div className="text-xs text-gray-600">{prescription.mrn}</div>
                    <div className="text-xs text-gray-500">{prescription.time} | {prescription.date}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      prescription.status === "Waiting"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {prescription.status}
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

      {/* Right Panel - Prescription Details */}
      <div className="col-span-9">
        {selectedPrescription ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">Prescription Details</CardTitle>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Patient Name:</span>
                      <span className="font-medium">{selectedPrescription.patientName}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Cabin ID:</span>
                      <span className="font-medium">{selectedPrescription.cabinId}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Dr. Ali Hassan</span>
                      <span className="font-medium">{selectedPrescription.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Prescription ID</div>
                  <div className="font-medium">RX-2401-234</div>
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
                      <th className="text-left p-3 font-medium text-gray-700">Dosage</th>
                      <th className="text-left p-3 font-medium text-gray-700">Frequency</th>
                      <th className="text-left p-3 font-medium text-gray-700">Duration</th>
                      <th className="text-right p-3 font-medium text-gray-700">Qty</th>
                      <th className="text-right p-3 font-medium text-gray-700">Price</th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrescription.medications.map((med, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-3">{med.name}</td>
                        <td className="p-3">{med.dosage}</td>
                        <td className="p-3">{med.frequency}</td>
                        <td className="p-3">{med.duration}</td>
                        <td className="p-3 text-right">{med.qty}</td>
                        <td className="p-3 text-right">${med.price.toFixed(2)}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            {med.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Section */}
              <div className="mt-6 flex items-end justify-between">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  G
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                  <div className="text-3xl font-bold text-green-600">${total.toFixed(2)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-12">
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
