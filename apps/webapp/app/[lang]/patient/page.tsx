"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"

import { DataTable } from "@/components/common/data-table"
import SearchInput from "@/components/common/search-input"
import NewButton from "@/components/common/new-button"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"
import { Button } from "@workspace/ui/components/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { SlidersHorizontal, ChevronsUpDown, MoreVertical } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

interface Patient {
  id: string
  name: string
  patientId: string
  dateOfBirth: string
  age: string
  phone: string
  email: string
  gender: "Male" | "Female"
  category: "VIP" | "Normal"
  status: "Active" | "Inactive"
}

export default function ManagePatientsPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("registered")
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  // Mock patient data
  const mockPatients: Patient[] = [
    {
      id: "1",
      name: "Ganguli Rathod",
      patientId: "PAT-65",
      dateOfBirth: "1982-06-15",
      age: "41 Year, 6 Month, 12 Day",
      phone: "(239) 555-0108",
      email: "tim.jennings@example.com",
      gender: "Male",
      category: "VIP",
      status: "Active",
    },
    {
      id: "2",
      name: "Nevaeh Simmons",
      patientId: "PAT-66",
      dateOfBirth: "1985-03-22",
      age: "38 Year, 9 Month, 5 Day",
      phone: "(319) 555-0115",
      email: "nevaeh.simmons@example.com",
      gender: "Female",
      category: "Normal",
      status: "Active",
    },
    {
      id: "3",
      name: "John Doe",
      patientId: "PAT-67",
      dateOfBirth: "1990-11-08",
      age: "33 Year, 1 Month, 19 Day",
      phone: "(555) 123-4567",
      email: "john.doe@example.com",
      gender: "Male",
      category: "Normal",
      status: "Active",
    },
    {
      id: "4",
      name: "Jane Smith",
      patientId: "PAT-68",
      dateOfBirth: "1988-07-14",
      age: "35 Year, 5 Month, 13 Day",
      phone: "(555) 987-6543",
      email: "jane.smith@example.com",
      gender: "Female",
      category: "VIP",
      status: "Active",
    },
    {
      id: "5",
      name: "Robert Johnson",
      patientId: "PAT-69",
      dateOfBirth: "1975-12-30",
      age: "48 Year, 0 Month, 7 Day",
      phone: "(555) 456-7890",
      email: "robert.johnson@example.com",
      gender: "Male",
      category: "Normal",
      status: "Active",
    },
  ]

  // Simulate API call
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setPatients(mockPatients)
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Filter patients based on search and tab
  const filteredPatients = useMemo(() => {
    let filtered = patients

    // Filter by tab
    if (activeTab === "incomplete") {
      // For incomplete, you might filter by missing required fields
      // For now, returning empty array as mock
      filtered = []
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchLower) ||
          patient.patientId.toLowerCase().includes(searchLower) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.phone.includes(search)
      )
    }

    return filtered
  }, [patients, search, activeTab])

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    const parts = name.split(" ").filter(Boolean)
    if (parts.length >= 2) {
      const first = parts[0]?.[0] || ""
      const last = parts[parts.length - 1]?.[0] || ""
      return `${first}${last}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const tabs = [
    { key: "registered", label: "Registered Patient" },
    { key: "incomplete", label: "Incomplete" },
  ]

  const quickActions = [
    { label: "Import Excel", onClick: () => console.log("Import Excel") },
    { label: "Export Excel", onClick: () => console.log("Export Excel") },
    {
      label: "Bulk Add Patient",
      onClick: () => console.log("Bulk Add Patient"),
    },
  ]

  const columns = [
    {
      key: "patient",
      label: "Patient",
      render: (row: Patient) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={undefined} alt={row.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{row.name}</span>
            <span className="text-sm text-gray-500">{row.patientId}</span>
          </div>
        </div>
      ),
      className: "min-w-[200px]",
    },
    {
      key: "dob",
      label: "Dob",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.age}</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.phone}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.email}</span>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.gender}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.category}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row: Patient) => (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-medium">{row.status}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 text-gray-600"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log("View", row.id)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Edit", row.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Delete", row.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "text-center w-[120px]",
    },
  ]

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Manage Patients" />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Tabs & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex-shrink-0">
              <DynamicTabs
                tabs={tabs}
                defaultTab="registered"
                onChange={(tabKey) => setActiveTab(tabKey)}
              />
            </div>

            {/* Right aligned actions */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <Button
                onClick={() => console.log("Filter")}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filter</span>
              </Button>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full bg-white border border-blue-200 text-gray-600 font-medium px-4 py-2 flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    Quick
                    <ChevronsUpDown className="w-4 h-4 text-[#0056D2]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-2 min-w-[180px] rounded-md border border-[#CFE7FF] bg-gradient-to-b from-[#ECFBFF] to-[#E8F6FF] shadow-sm p-1 space-y-1"
                >
                  {quickActions.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={item.onClick}
                      className="text-sm font-medium text-gray-700 rounded-md px-3 py-2 bg-white data-[highlighted]:bg-[#28B469] data-[highlighted]:text-white transition-colors"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <NewButton
                handleClick={() => router.push(`/${lang}/patient/add-patient`)}
                name="New Patient"
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-2">
            <DataTable
              columns={columns}
              data={filteredPatients}
              loading={loading}
              striped
            />
          </div>
        </div>
      </div>
    </main>
  )
}
