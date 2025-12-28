"use client"

import { useState, useMemo } from "react"
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
import { usePatients, useDeletePatient } from "./_hooks/usePatient"
import { Patient } from "@/lib/api/patient-api"

export default function ManagePatientsPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("registered")

  // Fetch patients from API
  const { data: patientsData, isLoading: loading } = usePatients({
    page: 1,
    limit: 100,
    search: search || undefined,
    status: activeTab === "incomplete" ? "incomplete" : undefined,
  })

  const deleteMutation = useDeletePatient()

  const patients = patientsData?.data ?? []

  const handleDelete = async (patientId: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      try {
        await deleteMutation.mutateAsync(patientId)
        alert("Patient deleted successfully")
      } catch (error) {
        alert("Failed to delete patient")
        console.error(error)
      }
    }
  }

  // Calculate age from date of birth
  const calculateAge = (dob?: string) => {
    if (!dob) return "N/A"
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return `${age} Years`
  }

  // Transform API data to match UI expectations
  const filteredPatients = useMemo(() => {
    return patients
  }, [patients])

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
      render: (row: Patient) => {
        const name = row.full_name || `${row.first_name} ${row.last_name || ""}`.trim()
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row.photo_url} alt={name} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{name}</span>
              <span className="text-sm text-gray-500">{row.civil_id}</span>
            </div>
          </div>
        )
      },
      className: "min-w-[200px]",
    },
    {
      key: "dob",
      label: "Age",
      render: (row: Patient) => (
        <span className="text-gray-700">{calculateAge(row.dob)}</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.mobile_number || "N/A"}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (row: Patient) => (
        <span className="text-gray-700">{row.email || "N/A"}</span>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (row: Patient) => (
        <span className="text-gray-700 capitalize">{row.gender || "N/A"}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row: Patient) => {
        const category = typeof row.category === 'object' ? (row.category as any)?.name || 'General' : row.category || 'General';
        return <span className="text-gray-700 capitalize">{category}</span>;
      },
    },
    {
      key: "action",
      label: "Action",
      render: (row: Patient) => {
        const status = typeof row.status === 'object' ? (row.status as any)?.name || 'Active' : row.status || 'Active';
        return (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-medium capitalize">
            {status}
          </span>
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
              <DropdownMenuItem onClick={() => router.push(`/${lang}/patient/${row.id}`)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/${lang}/patient/edit/${row.id}`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(row.id)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        );
      },
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
