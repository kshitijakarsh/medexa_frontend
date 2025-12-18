"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import { RowActionMenu } from "@/components/common/row-action-menu";
import FilterButton from "@/components/common/filter-button";
import { AppSelect } from "@/components/common/app-select";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useDoctors } from "@/hooks/use-doctors";
import { useDepartments } from "@/hooks/use-departments";
import { createSlotApiClient } from "@/lib/api/doctor/slots-api";
import type { SlotItem } from "@/lib/api/doctor/slots-api";
import { useRouter } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { ROUTES } from "@/lib/routes";

// Types
interface ScheduleEntry {
  id: string;
  date: string;
  dayOfWeek: string;
  sessionStart: string;
  sessionEnd: string;
  sessionType: string;
  step: number;
  createdOn: string;
  addedBy: string;
  departmentId?: string;
  doctorId?: string;
}

interface Filters {
  department: string;
  doctor: string;
  year: string;
  month: string;
  dateFilter: string; // "today" | "tomorrow" | "custom"
  customDateRange?: { start: string; end: string };
}

// Dummy options for filters
// Note: Radix SelectItem cannot have an empty-string value,
// so we use explicit "all-*" values for the "no filter" options.
const DEPARTMENT_OPTIONS = [
  { label: "All Departments", value: "all-departments" },
  { label: "Cardiology", value: "dept1" },
  { label: "Neurology", value: "dept2" },
  { label: "Orthopedics", value: "dept3" },
  { label: "Pediatrics", value: "dept4" },
];


const YEAR_OPTIONS = [
  { label: "Year", value: "all-years" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
];

const MONTH_OPTIONS = [
  { label: "Month", value: "all-months" },
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const DATE_FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Today Appointments", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Custom Date", value: "custom" },
];

export default function FrontofficeSchedulePage() {
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleEntry[]>([]);
  const [filters, setFilters] = useState<Filters>({
    department: "all-departments",
    doctor: "all-doctors",
    year: "all-years",
    month: "all-months",
    dateFilter: "all",
  });
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
  const [departmentSearchQuery, setDepartmentSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 10;

  // Calculate pagination
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  // paginatedData is now just scheduleData because the API returns only the current page
  const paginatedData = scheduleData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Helper to get start and end dates from filters
  const { doctors: doctorOptions, isLoading: doctorsLoading } = useDoctors(doctorSearchQuery);
  const { departments: departmentOptions, isLoading: departmentsLoading } = useDepartments(departmentSearchQuery);

  const getFilterDates = () => {
    let startDate: string | undefined;
    let endDate: string | undefined;
    const now = new Date();

    if (filters.dateFilter === "all") {
      // Continue to check Year/Month logic below
    } else if (filters.dateFilter === "today") {
      const today = new Date();
      startDate = today.toISOString().split('T')[0];
      endDate = startDate;
      return { startDate, endDate }; // Return immediately for specific date filters
    } else if (filters.dateFilter === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      startDate = tomorrow.toISOString().split('T')[0];
      endDate = startDate;
      return { startDate, endDate };
    } else if (filters.dateFilter === "custom" && filters.customDateRange) {
      startDate = filters.customDateRange.start;
      endDate = filters.customDateRange.end;
      return { startDate, endDate };
    }

    // Handle Year/Month logic (applies when dateFilter is 'all' or no specific date selected)
    let year = now.getFullYear();
    if (filters.year && filters.year !== "all-years") {
      year = parseInt(filters.year);
    }

    let startMonth = 0; // Jan
    let endMonth = 11; // Dec

    if (filters.month && filters.month !== "all-months") {
      startMonth = parseInt(filters.month) - 1; // 1-based to 0-based
      endMonth = startMonth;
    }

    const isYearSelected = filters.year && filters.year !== "all-years";
    const isMonthSelected = filters.month && filters.month !== "all-months";

    // Only apply filter if explicitly selected or default 'all' behavior is desired
    if (isYearSelected || isMonthSelected) {
      const startDetails = new Date(year, startMonth, 1);
      const endDetails = new Date(year, endMonth + 1, 0);

      const formatYMD = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      startDate = formatYMD(startDetails);
      endDate = formatYMD(endDetails);
    }

    return { startDate, endDate };
  };

  // Fetch slots from API
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const apiClient = createSlotApiClient();
        const { startDate, endDate } = getFilterDates();

        const response = await apiClient.getSlots({
          doctorId: filters.doctor !== "all-doctors" ? filters.doctor : undefined,
          departmentId: filters.department !== "all-departments" ? filters.department : undefined,
          startDate,
          endDate,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sortBy: 'date',
          sortOrder: 'asc',
        });

        // Update total items from API pagination
        setTotalItems(response.data.pagination.total);

        // Map API response to ScheduleEntry format
        const mappedData: ScheduleEntry[] = response.data.data.map((slot: SlotItem) => {
          const date = new Date(slot.date);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          const startTime = new Date(slot.startTime);
          const endTime = new Date(slot.endTime);

          return {
            id: slot.id,
            date: slot.date.split('T')?.[0] || slot.date,
            dayOfWeek: dayOfWeek,
            sessionStart: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            sessionEnd: endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            sessionType: slot.shift || 'Regular',
            step: slot.slots?.duration || 0,
            createdOn: new Date(slot.created_at).toLocaleString('en-US'),
            addedBy: slot.createdBy?.name || 'Unknown',
            doctorId: slot.doctorId,
          };
        });

        // Client-side sorting is likely still needed if the API doesn't guarantee sort order, 
        // OR we should remove this if the API is returning sorted data. 
        // Assuming API returns pagination based on its own sort, re-sorting here only sorts the *current page*.
        // If strict sorting is needed, it should be done on the backend.
        // For now, I'll keep the sort for the current page display consistency.

        mappedData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          if (dateA !== dateB) {
            return dateA - dateB;
          }
          return a.sessionStart.localeCompare(b.sessionStart);
        });

        setScheduleData(mappedData);
      } catch (error) {
        console.error('Error fetching slots:', error);
        // Show empty state on error
        setScheduleData([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [filters.doctor, filters.department, filters.year, filters.month, filters.dateFilter, currentPage]); // Added all filter dependencies


  // Format date for display
  const formatDate = (date: string, dayOfWeek: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    return `${day} ${month} (${dayOfWeek})`;
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // TODO: Call API with new filters
    // fetchScheduleData({ ...filters, [key]: value });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      department: "all-departments",
      doctor: "",
      year: "all-years",
      month: "all-months",
      dateFilter: "all",
    });
    // TODO: Call API with cleared filters
    // fetchScheduleData({});
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      filters.department !== "all-departments" ||
      filters.doctor !== "all-doctors" ||
      filters.year !== "all-years" ||
      filters.month !== "all-months" ||
      filters.dateFilter !== "today"
    );
  };

  // Handle add new schedule (navigate to time slots page)
  const router = useRouter();
  const { withLocale } = useLocaleRoute();

  const handleAddSchedule = () => {
    router.push(withLocale(ROUTES.FRONTOFFICE_TIME_SLOTS));
  };

  // Handle row actions
  const handleEdit = (row: ScheduleEntry) => {
    console.log("Edit schedule:", row);
    // TODO: Open edit modal with schedule data
  };

  const handleDelete = (row: ScheduleEntry) => {
    console.log("Delete schedule:", row);
    // TODO: Show confirmation and call delete API
  };

  const handleView = (row: ScheduleEntry) => {
    console.log("View schedule:", row);
    // TODO: Open view modal with schedule details
  };

  // Table columns configuration
  const columns = [
    {
      key: "date",
      label: "Date & Day",
      render: (row: ScheduleEntry) => (
        <div className="text-sm text-gray-900">
          {formatDate(row.date, row.dayOfWeek)}
        </div>
      ),
    },
    {
      key: "session",
      label: "Session",
      render: (row: ScheduleEntry) => (
        <div className="text-sm text-gray-900">
          {`${row.sessionStart} To ${row.sessionEnd}`} {/* ${row.sessionType} */}
        </div>
      ),
    },
    {
      key: "step",
      label: "Step",
      render: (row: ScheduleEntry) => (
        <div className="text-sm text-gray-900">{row.step}</div>
      ),
    },
    {
      key: "createdOn",
      label: "Created On",
      render: (row: ScheduleEntry) => (
        <div className="text-sm text-gray-900">{row.createdOn}</div>
      ),
    },
    {
      key: "addedBy",
      label: "Added By",
      render: (row: ScheduleEntry) => (
        <div className="text-sm text-gray-900">
          {row.addedBy}
        </div>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row: ScheduleEntry) => (
        <RowActionMenu
          actions={[
            {
              label: "View",
              onClick: () => handleView(row),
              variant: "info",
            },
            {
              label: "Edit",
              onClick: () => handleEdit(row),
              variant: "success",
            },
            {
              label: "Delete",
              onClick: () => handleDelete(row),
              variant: "danger",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full max-w-[1600px] mx-auto space-y-6">
        {/* Filter Section */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Filter Button */}
          <FilterButton
            onClick={handleClearFilters}
            onClear={handleClearFilters}
            filters={{
              department: filters.department !== "all-departments" ? filters.department : "",
              doctor: filters.doctor !== "all-doctors" ? filters.doctor : "",
              year: filters.year !== "all-years" ? filters.year : "",
              month: filters.month !== "all-months" ? filters.month : "",
            }}
          />

          {/* Department Dropdown with Icon Inside */}
          <div className="flex-shrink-0">
            <AppSelect
              placeholder="All Departments"
              value={filters.department}
              onChange={(value) => handleFilterChange("department", value)}
              options={departmentOptions}
              icon={<CalendarDays className="w-[18px] h-[18px] text-gray-500" />}
              searchable={true}
              searchPlaceholder="Search Department"
              onSearchChange={setDepartmentSearchQuery}
              triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full"
            />
          </div>

          {/* Doctor Dropdown with Icon Inside */}
          <div className="flex-shrink-0">
            <AppSelect
              placeholder="All Doctors"
              value={filters.doctor}
              onChange={(value) => handleFilterChange("doctor", value)}
              options={doctorOptions}
              searchable={true}
              searchPlaceholder="Search Doctor"
              onSearchChange={setDoctorSearchQuery}
              triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full"
              icon={
                <Image
                  src="/images/stethoscope.svg"
                  alt="Doctor"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
              }
            />
          </div>

          {/* Year Dropdown with Icon Inside */}
          <div className="flex-shrink-0">
            <AppSelect
              placeholder="Year"
              value={filters.year}
              onChange={(value) => handleFilterChange("year", value)}
              options={YEAR_OPTIONS}
              triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full"
              icon={<CalendarDays className="w-[18px] h-[18px] text-gray-500" />}
            />
          </div>

          {/* Month Dropdown with Icon Inside */}
          <div className="flex-shrink-0">
            <AppSelect
              placeholder="Month"
              value={filters.month}
              onChange={(value) => handleFilterChange("month", value)}
              options={MONTH_OPTIONS}
              triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full"
              icon={<CalendarDays className="w-[18px] h-[18px] text-gray-500" />}
            />
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Add Button */}
          <Button
            onClick={handleAddSchedule}
            className="bg-[#0095FF] hover:bg-[#0080DD] text-white h-10 px-6 rounded-full font-medium text-sm shadow-sm"
          >
            Add
          </Button>
        </div>

        {/* Table Section */}
        <div className="rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={scheduleData}
            loading={loading}
            striped={false}
          />
        </div>

        {/* Pagination Controls */}
        {!loading && scheduleData.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-6 pb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              &lt;
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              &gt;
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

