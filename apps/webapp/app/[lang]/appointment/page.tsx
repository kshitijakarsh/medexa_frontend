"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import { RowActionMenu } from "@/components/common/row-action-menu";
import FilterButton from "@/components/common/filter-button";
import { AppSelect } from "@/components/common/app-select";
import { Switch } from "@workspace/ui/components/switch";
import { Input } from "@workspace/ui/components/input";
import {
  CalendarDays,
  Search,
  Grid,
  List as ListIcon,
  Plus,
  Phone,
  LayoutGrid,
  Stethoscope,
  SlidersHorizontal,
  MoreVertical,
  X
} from "lucide-react";
import Image from "next/image";
import { useDoctors } from "@/hooks/use-doctors";
import { useDepartments } from "@/hooks/use-departments";
import { createVisitsApiClient, VisitItem } from "@/lib/api/visits-api";
import { useRouter } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { ROUTES } from "@/lib/routes";
import { AppointmentEntry, FilterState } from "./types";
import { AppointmentGridView } from "./_components/appointment-grid-view";
import { ContactPopover } from "./_components/contact-popover";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

// Options
const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Booked", value: "Booked" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Checked-In", value: "Checked-In" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function AppointmentPage() {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [appointments, setAppointments] = useState<AppointmentEntry[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    department: "",
    doctor: "",
    status: "",
    dateFilter: "all",
  });
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
  const [departmentSearchQuery, setDepartmentSearchQuery] = useState("");
  const [mrnSearch, setMrnSearch] = useState("");

  const { doctors: doctorOptions } = useDoctors(doctorSearchQuery);
  const { departments: departmentOptions } = useDepartments(departmentSearchQuery);

  const router = useRouter();
  const { withLocale } = useLocaleRoute();

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiClient = createVisitsApiClient();

        // Prepare params
        const params: any = {
          page: 1,
          limit: 50,
        };
        if (filters.status && filters.status !== "all") params.status = filters.status;
        // Use camelCase parameters to match backend convention (seen in slots-api)
        if (filters.department && filters.department !== "all-departments") params.departmentId = filters.department;
        if (filters.doctor && filters.doctor !== "all-doctors") params.doctorId = filters.doctor;
        // Date filter logic would go here if API supports it, currently using basic fetch

        const response = await apiClient.getVisits(params);

        if (response.data.success) {
          const mapped: AppointmentEntry[] = response.data.data.map((visit) => {
            // Map visit to AppointmentEntry
            // NOTE: Adjust fields based on actual API data availability vs UI requirements
            return {
              id: visit.id,
              appId: `APP-${String(visit.id).padStart(6, '0')}`, // Synthesized ID for display
              mrn: visit.emergency_guardian_mrn || `MRN-${visit.patient_id}`, // Fallback if no mrn
              patientName: visit.full_name || `${visit.patient?.first_name} ${visit.patient?.last_name}`,
              patientImg: undefined, // API doesn't seem to return image yet, fallback to avatar
              isVip: false, // API doesn't return VIP status yet, defaulting to false or randomize for demo? Keeping false for safety or mock some if needed.
              consultantDoctor: visit.doctor_ids?.[0]?.name || "Unknown Doctor",
              specialty: "General", // API missing specialty in top level, might need to infer or fetch
              appointmentDate: visit.time_slot_start.split('T')[0] || "",
              bookedSlot: new Date(visit.time_slot_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              serviceType: visit.visit_type === 'doctor_consultation' ? "Doctor Consultation" : visit.visit_type,
              visitType: visit.mode_of_arrival === 'Ambulance' ? "ER" : "Walk-in", // heuristic mapping
              paymentStatus: (visit.charges?.[0]?.status === 'pending' ? 'Pending' : 'Paid') as any,
              status: (visit.status.charAt(0).toUpperCase() + visit.status.slice(1)) as any,
              contactNumber: visit.phone_no,
              isNewConsultation: true
            };
          });
          setAppointments(mapped);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    // Reset to defaults
    setFilters({
      department: "",
      doctor: "", // "all-doctors" value is controlled primarily by the UI, but here we set to empty string which means 'All' in our logic
      status: "",
      dateFilter: "all",
    });
    setDepartmentSearchQuery("");
    setDoctorSearchQuery("");
    setMrnSearch("");
  };

  // Columns for List View
  const columns = [
    {
      key: "patient",
      label: "Patient",
      render: (row: AppointmentEntry) => (
        <div className="flex items-center gap-3 relative">
          {/* VIP Crown Icon - Absolute Top Left */}
          {row.isVip && (
            <div className="absolute -top-1.5 -left-1.5 z-10 w-4 h-4 rounded-full flex items-center justify-center bg-transparent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          )}

          <Avatar className="h-10 w-10 border border-gray-100">
            <AvatarImage src={row.patientImg} />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
              {row.patientName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-sm text-gray-900">{row.patientName}</div>
            </div>
            <div className="text-xs text-gray-500 flex gap-2">
              <span>{row.mrn}</span>
              <span className="text-blue-500">| {row.appId}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "doctor",
      label: "Consultant Doctor",
      render: (row: AppointmentEntry) => (
        <div>
          <div className="font-medium text-sm text-gray-900">{row.consultantDoctor}</div>
          <div className="text-xs text-gray-500">{row.specialty}</div>
        </div>
      )
    },
    {
      key: "date",
      label: "Appointments Date",
      render: (row: AppointmentEntry) => (
        <div className="text-sm text-gray-700">{row.appointmentDate}</div>
      )
    },
    {
      key: "slot",
      label: "Booked Slot",
      render: (row: AppointmentEntry) => (
        <div className="text-sm text-gray-700">{row.bookedSlot}</div>
      )
    },
    {
      key: "service",
      label: "Service Type",
      render: (row: AppointmentEntry) => (
        <div className="text-sm text-gray-700">{row.serviceType}</div>
      )
    },
    {
      key: "visit",
      label: "Visit Type",
      render: (row: AppointmentEntry) => (
        <div className={`text-sm ${row.visitType === 'ER' ? 'text-red-500' : 'text-orange-500'}`}>
          {row.visitType}
        </div>
      )
    },
    {
      key: "payment",
      label: "Payment",
      render: (row: AppointmentEntry) => (
        <span className="text-xs font-medium text-red-500">
          {row.paymentStatus}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row: AppointmentEntry) => (
        <span className={`text-xs font-medium 
              ${(row.status === 'Booked' || row.status === 'Pending') ? 'text-[#AF5A62]' :
            row.status === 'Confirmed' ? 'text-green-600' :
              'text-gray-600'}`}>
          {row.status}
        </span>
      )
    },
    {
      key: "contact",
      label: "Contact",
      render: (row: AppointmentEntry) => (
        <ContactPopover phoneNumber={row.contactNumber} />
      )
    },
    {
      key: "action",
      label: "Action",
      render: (row: AppointmentEntry) => (
        <div className="flex items-center gap-1 text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-700">
          Action
          <span className="flex items-center">
            <MoreVertical className="w-4 h-4" />
          </span>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#EAF2F6] p-4 md:p-6 pb-20">
      <div className="w-full max-w-[1700px] mx-auto space-y-4">

        {/* --- Top Header Row: Title & Dropdowns --- */}
        <div className="flex flex-col gap-4">
          {/* Section Title */}
          <h1 className="text-md font-semibold text-gray-800">Appointment</h1>

          <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
            {/* Filter Dropdowns Row - Transparent Background */}
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              {/* Date */}
              <div className="w-full sm:w-[200px]">
                <AppSelect
                  placeholder="Today's"
                  value={filters.dateFilter}
                  onChange={(val) => handleFilterChange("dateFilter", val)}
                  options={[
                    { label: "Today's", value: "today" },
                    { label: "Tomorrow", value: "tomorrow" },
                  ]}
                  icon={<CalendarDays className="w-5 h-5 text-gray-700" />}
                  triggerClassName="h-11 rounded-full border-blue-100 bg-white text-gray-900 font-medium pl-2 hover:border-blue-300 transition-colors shadow-sm"
                />
              </div>

              {/* Department */}
              <div className="w-full sm:w-[200px]">
                <AppSelect
                  placeholder="All Department"
                  value={filters.department}
                  onChange={(val) => handleFilterChange("department", val)}
                  options={departmentOptions}
                  icon={<Image src="/images/folder_supervised.png" alt="Department" width={18} height={18} />}
                  searchable={true}
                  searchPlaceholder="Search Department"
                  onSearchChange={setDepartmentSearchQuery}
                  triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full text-gray-900 pl-2 hover:border-blue-300 transition-colors shadow-sm"
                />
              </div>

              {/* Doctor */}
              <div className="w-full sm:w-[200px]">
                <AppSelect
                  placeholder="All Doctor"
                  value={filters.doctor}
                  onChange={(val) => handleFilterChange("doctor", val)}
                  options={doctorOptions}
                  icon={<Image src="/images/stethoscope.svg" alt="Doctor" width={18} height={18} />}
                  searchable={true}
                  searchPlaceholder="Search Doctor"
                  onSearchChange={setDoctorSearchQuery}
                  triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full text-gray-900 pl-2 hover:border-blue-300 transition-colors shadow-sm"
                />
              </div>

              {/* Status */}
              <div className="w-full sm:w-[200px]">
                <AppSelect
                  placeholder="All Status"
                  value={filters.status}
                  onChange={(val) => handleFilterChange("status", val)}
                  options={STATUS_OPTIONS}
                  icon={<Image src="/images/donut_large.svg" alt="Status" width={20} height={20} className="w-5 h-5" />}
                  triggerClassName="h-11 rounded-full border-blue-100 bg-white text-gray-900 font-medium pl-2 hover:border-blue-300 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Right Side: Calendar View Toggle */}
            <div className="flex items-center gap-3 ml-auto">
              <CalendarDays className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-800">Calendar View</span>
              <Switch
                checked={viewMode === "grid"}
                onCheckedChange={(checked) => setViewMode(checked ? "grid" : "list")}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>

        {/* --- Action Bar Row: Filter, Search, Action Buttons --- */}
        <div className="flex flex-col xl:flex-row gap-4 items-center justify-between pt-2">
          {/* Filter Toggle (Blue Button) */}
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <FilterButton
              onClick={handleClearFilters} // Correct if clicking filter acts as clear toggle? No, logic is confusing in Schedule page. It had onClick and onClear.
              // In Schedule: onClick={handleClearFilters} onClear={handleClearFilters}. This is redundant/weird but I'll stick to it or better:
              // Wait, FilterButton usually opens a drawer. Here, user just wants "Clear All".
              // Schedule page: `onClick={handleClearFilters}`.
              // I will use that.
              onClear={handleClearFilters}
              filters={{
                department: filters.department !== "all-departments" ? filters.department : "",
                doctor: filters.doctor !== "all-doctors" ? filters.doctor : "",
                status: filters.status !== "all" ? filters.status : "",
                dateFilter: filters.dateFilter !== "all" ? filters.dateFilter : ""
              }}
            />
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar">

            {/* MRN Search (Moved to right group) */}
            <div className="relative flex items-center bg-white rounded-full border border-blue-100 px-4 h-10 shadow-sm w-[280px] shrink-0">
              <div className="flex items-center gap-1 text-blue-500 text-sm font-medium border-r border-gray-200 pr-3 mr-3 cursor-pointer">
                <Search className="w-4 h-4" />
                MRN
                <span className="text-gray-400 text-[10px]">▼</span>
              </div>
              <input
                placeholder="Search MRN"
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 min-w-[80px]"
                value={mrnSearch}
                onChange={(e) => setMrnSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" className="rounded-full h-10 border-blue-100 bg-white text-gray-700 font-medium gap-1 min-w-[90px] shadow-sm hover:bg-gray-50 shrink-0">
              Quick <Image src="/images/unfold_more.svg" alt="Quick" width={14} height={14} className="w-3.5 h-3.5" />
            </Button>

            <Button
              onClick={() => router.push(withLocale("/appointment/book?visitType=emergency"))}
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full h-10 px-5 gap-2 font-medium shadow-sm shrink-0"
            >
              ER <div className="bg-white/20 p-0.5 rounded"><Image src="/images/emergency_home.svg" alt="ER" width={18} height={18} className="w-[18px] h-[18px]" /></div>
            </Button>

            <Button
              onClick={() => router.push(withLocale("/appointment/book?visitType=walkin"))}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full h-10 px-5 gap-2 font-medium shadow-sm shrink-0"
            >
              Walk-In <div className="bg-white/20 p-0.5 rounded-full"><Image src="/images/directions_run.svg" alt="Walk-In" width={18} height={18} className="w-[18px] h-[18px]" /></div>
            </Button>

            <Button
              onClick={() => router.push(withLocale("/appointment/book?visitType=appointment"))}
              className="bg-[#2CB470] hover:bg-[#259b60] text-white rounded-full h-10 px-5 gap-2 font-medium shadow-sm shrink-0"
            >
              Add Appointment <Plus className="w-4 h-4 bg-white text-[#2CB470] rounded-full p-0.5" />
            </Button>

            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 ml-2 shadow-sm shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-[#2CB470] text-white hover:bg-[#259b60] hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-[#2CB470] text-white hover:bg-[#259b60] hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === "list" ? (
          <div className="rounded-t-xl overflow-hidden mt-4 [&_thead_th]:font-normal">
            {!loading && appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-b-xl border border-gray-100 shadow-sm text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  We couldn't find any appointments matching your filters. Try clearing some filters or searching for something else.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="bg-[#0095FF] hover:bg-[#0080DD] text-white rounded-full px-6"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={appointments}
                loading={loading}
                striped={false}
              />
            )}
          </div>
        ) : (
          <div className="mt-4">
            <AppointmentGridView data={appointments} />
          </div>
        )}

      </div>
    </div>
  );
}
