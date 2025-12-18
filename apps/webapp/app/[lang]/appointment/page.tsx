"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import FilterButton from "@/components/common/filter-button"
import SearchInput from "@/components/common/search-input"
import QuickActionsMenu from "@/components/common/quick-actions-menu"
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable"
import { RowActionMenu } from "@/components/common/row-action-menu"
import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell"
import { StatusPill } from "@/components/common/pasient-card/status-pill"
import { TypeBadge } from "@/components/common/pasient-card/type-badge"
import { AppSelect } from "@/components/common/app-select"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Calendar,
  Stethoscope,
  CircleDot,
  ChevronDown,
  Search,
  Grid3x3,
  List,
  Phone,
  MoreVertical,
  Gem,
  User,
  Plus,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"
import { getAuthToken } from "@/app/utils/onboarding"
import { createVisitsApiClient, Visit } from "@/lib/api/visits"

interface Appointment {
  id: string
  patientName: string
  mrn: string
  appointmentId: string
  doctorName: string
  department: string
  appointmentDate: string
  bookedSlot: string
  serviceType: string
  visitType: "Walk-in" | "ER" | "Appointment"
  payment: string
  status: "Booked" | "Confirmed" | "Checked-In"
  contact: string
  vip?: boolean
}

export default function AppointmentPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"

  // Filter states
  const [dateFilter, setDateFilter] = useState("Today's")
  const [departmentFilter, setDepartmentFilter] = useState("All Department")
  const [doctorFilter, setDoctorFilter] = useState("All Doctor")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("MRN")
  const [calendarView, setCalendarView] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Map API visit to Appointment interface
  const mapVisitToAppointment = (visit: Visit): Appointment => {
    // Format date from ISO string to DD-MM-YYYY
    const formatDate = (isoString: string) => {
      const date = new Date(isoString)
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    }

    // Format time from ISO string to HH:MM AM/PM
    const formatTime = (isoString: string) => {
      const date = new Date(isoString)
      let hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, "0")
      const period = hours >= 12 ? "PM" : "AM"
      hours = hours % 12 || 12
      return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`
    }

    // Map patient_visit_type to display format
    const mapVisitType = (type: string): "Walk-in" | "ER" | "Appointment" => {
      switch (type.toLowerCase()) {
        case "walk_in":
        case "walk-in":
          return "Walk-in"
        case "er":
        case "emergency":
          return "ER"
        case "appointment":
        default:
          return "Appointment"
      }
    }

    // Map status to display format
    const mapStatus = (
      status: string
    ): "Booked" | "Confirmed" | "Checked-In" => {
      switch (status.toLowerCase()) {
        case "active":
          return "Booked"
        case "confirmed":
          return "Confirmed"
        case "in_consultation":
        case "checked_in":
          return "Checked-In"
        default:
          return "Booked"
      }
    }

    // Get doctor name (first doctor from doctor_ids array)
    const doctorName =
      visit.doctor_ids && visit.doctor_ids.length > 0 && visit.doctor_ids[0]
        ? `Dr. ${visit.doctor_ids[0].id}` // You may need to fetch doctor details separately
        : "N/A"

    // Get patient name
    const patientName = visit.patient
      ? `${visit.patient.first_name} ${visit.patient.last_name}`
      : visit.full_name || "N/A"

    // Get MRN from patient_id (or you may need to fetch from patient details)
    const mrn = visit.patient_id.toString().padStart(8, "0")

    return {
      id: visit.id.toString(),
      patientName,
      mrn,
      appointmentId: `APP-${visit.id.toString().padStart(6, "0")}`,
      doctorName,
      department: "N/A", // Department not in API response, may need separate fetch
      appointmentDate: formatDate(visit.time_slot_start),
      bookedSlot: formatTime(visit.time_slot_start),
      serviceType: visit.visit_type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      visitType: mapVisitType(visit.patient_visit_type),
      payment: "Pending", // Payment info not in API response
      status: mapStatus(visit.status),
      contact: visit.phone_no || "+974 1234 5678",
      vip: false, // VIP status not in API response
    }
  }

  // Fetch visits from API
  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true)
      try {
        const token = await getAuthToken()
        const client = createVisitsApiClient({ authToken: token })

        const params: any = {
          page: currentPage,
          limit: 20,
        }

        // Add filters based on state
        if (statusFilter !== "All Status") {
          params.status = statusFilter.toLowerCase().replace(" ", "_")
        }
        if (doctorFilter !== "All Doctor") {
          // You may need to map doctor name to ID
          // params.doctor_id = doctorFilter
        }
        if (departmentFilter !== "All Department") {
          // You may need to map department name to ID
          // params.department_id = departmentFilter
        }

        const response = await client.getVisits(params)
        const mappedAppointments = response.data.data.map(mapVisitToAppointment)
        setAppointments(mappedAppointments)
        setTotalPages(response.data.pagination.totalPages)
      } catch (error) {
        console.error("Failed to fetch visits:", error)
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [currentPage, statusFilter, doctorFilter, departmentFilter])

  const handleERClick = () => {
    // Go directly to Book New Appointment with Emergency pre-selected
    router.push(`/${lang}/appointment/book?visitType=emergency`)
  }

  const handleWalkInClick = () => {
    // Go directly to Book New Appointment with Walk-in pre-selected
    router.push(`/${lang}/appointment/book?visitType=walkin`)
  }

  const handleAddAppointmentClick = () => {
    // Go directly to Book New Appointment with Standard Appointment pre-selected
    router.push(`/${lang}/appointment/book?visitType=appointment`)
  }

  const quickActions = [
    {
      label: "Export Excel",
      onClick: () => console.log("Export Excel"),
      highlightColor: "#28B469",
    },
    {
      label: "Import Excel",
      onClick: () => console.log("Import Excel"),
      highlightColor: "#28B469",
    },
  ]

  const getVisitTypeColor = (type: string) => {
    switch (type) {
      case "Walk-in":
        return "text-orange-600"
      case "ER":
        return "text-red-600"
      case "Appointment":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const columns = [
    {
      key: "patient",
      label: "Patient",
      render: (row: Appointment) => (
        <AppointmentPatientCell
          name={row.patientName}
          mrn={`MRN ${row.mrn} | ${row.appointmentId}`}
          vip={row.vip}
        />
      ),
    },
    {
      key: "doctor",
      label: "Consultant Doctor",
      render: (row: Appointment) => (
        <div>
          <div className="font-medium text-sm">{row.doctorName}</div>
          <div className="text-xs text-gray-500">{row.department}</div>
        </div>
      ),
    },
    {
      key: "date",
      label: "Appointments Date",
      render: (row: Appointment) => (
        <span className="text-sm">{row.appointmentDate}</span>
      ),
    },
    {
      key: "slot",
      label: "Booked Slot",
      render: (row: Appointment) => (
        <span className="text-sm">{row.bookedSlot}</span>
      ),
    },
    {
      key: "service",
      label: "Service Type",
      render: (row: Appointment) => (
        <TypeBadge type={row.serviceType} />
      ),
    },
    {
      key: "visitType",
      label: "Visit Type",
      render: (row: Appointment) => (
        <span className={cn("text-sm font-medium", getVisitTypeColor(row.visitType))}>
          {row.visitType}
        </span>
      ),
    },
    {
      key: "payment",
      label: "Payment",
      render: (row: Appointment) => (
        <span className="text-sm text-red-600">{row.payment}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Appointment) => <StatusPill status={row.status} />,
    },
    {
      key: "contact",
      label: "Contact",
      render: (row: Appointment) => (
        <Phone className="w-5 h-5 text-green-600 cursor-pointer" />
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row: Appointment) => (
        <RowActionMenu
          actions={[
            { label: "View Details", onClick: () => console.log("View", row.id) },
            { label: "Edit", onClick: () => console.log("Edit", row.id) },
            {
              label: "Cancel",
              onClick: () => console.log("Cancel", row.id),
              variant: "danger",
            },
          ]}
        />
      ),
    },
  ]

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-6 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Appointment" />

        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Top Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Side - Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-gray-600" />
                    {dateFilter}
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateFilter("Today's")}>
                    Today's
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("This Week")}>
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("This Month")}>
                    This Month
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Department Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2"
                  >
                    {departmentFilter}
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setDepartmentFilter("All Department")}
                  >
                    All Department
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDepartmentFilter("Cardiology")}
                  >
                    Cardiology
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDepartmentFilter("Neurology")}
                  >
                    Neurology
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Doctor Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2"
                  >
                    <Stethoscope className="w-4 h-4 text-gray-600" />
                    {doctorFilter}
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDoctorFilter("All Doctor")}>
                    All Doctor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDoctorFilter("Dr.Kiran Madha")}
                  >
                    Dr.Kiran Madha
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2"
                  >
                    <CircleDot className="w-4 h-4 text-gray-600" />
                    {statusFilter}
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("All Status")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Booked")}>
                    Booked
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Confirmed")}>
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Checked-In")}>
                    Checked-In
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right Side - Calendar View Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setCalendarView(!calendarView)}
                className={cn(
                  "h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2",
                  calendarView && "bg-blue-50 border-blue-300"
                )}
              >
                <Calendar className="w-4 h-4 text-gray-600" />
                Calendar View
              </Button>
            </div>
          </div>

          {/* Second Row - Filter, Search, Quick Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left - Filter Button */}
            <div className="flex items-center gap-3">
              <FilterButton onClick={() => console.log("Filter clicked")} />
            </div>

            {/* Middle - Search */}
            <div className="flex-1 max-w-md flex items-center gap-2">
              <div className="flex-1">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search MRN"
                  width="100%"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-sm bg-white border-gray-300 rounded-lg flex items-center gap-2"
                  >
                    {searchType}
                    <Search className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSearchType("MRN")}>
                    MRN
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchType("Name")}>
                    Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchType("Phone")}>
                    Phone
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right - Quick Actions and Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <QuickActionsMenu actions={quickActions} />
              <Button
                onClick={handleERClick}
                className="h-9 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
              >
                <Gem className="w-4 h-4" />
                ER
              </Button>
              <Button
                onClick={handleWalkInClick}
                className="h-9 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Walk-In
              </Button>
              <Button
                onClick={handleAddAppointmentClick}
                className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Appointment
              </Button>
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "h-7 w-7",
                    viewMode === "grid" && "bg-blue-100"
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "h-7 w-7",
                    viewMode === "list" && "bg-blue-100"
                  )}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4">
            <ResponsiveDataTable
              columns={columns}
              data={appointments}
              loading={loading}
              striped
            />
          </div>
        </div>
      </div>
    </main>
  )
}

