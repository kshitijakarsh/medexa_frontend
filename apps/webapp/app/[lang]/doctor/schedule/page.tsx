"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import { RowActionMenu } from "@/components/common/row-action-menu";
import FilterButton from "@/components/common/filter-button";
import { AppSelect } from "@/components/common/app-select";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

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

// Dummy data - API compatible structure
const DUMMY_SCHEDULE_DATA: ScheduleEntry[] = [
  {
    id: "1",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "2",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "3",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "4",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "5",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "6",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "7",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "8",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "9",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "10",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
  {
    id: "11",
    date: "2024-11-19",
    dayOfWeek: "Wednesday",
    sessionStart: "08:00 am",
    sessionEnd: "04:00 pm",
    sessionType: "TO",
    step: 20,
    createdOn: "2025-09-27 19:30",
    addedBy: "Dr. Ahmed Al-Mansouri",
    departmentId: "dept1",
    doctorId: "doc1",
  },
];

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

const DOCTOR_OPTIONS = [
  { label: "All Doctors", value: "all-doctors" },
  { label: "Dr. Ahmed Al-Mansouri", value: "doc1" },
  { label: "Dr. Sarah Johnson", value: "doc2" },
  { label: "Dr. Michael Chen", value: "doc3" },
  { label: "Dr. Fatima Hassan", value: "doc4" },
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
  { label: "Today Appointments", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Custom Date", value: "custom" },
];

export default function DoctorSchedulePage() {
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleEntry[]>(
    DUMMY_SCHEDULE_DATA
  );
  const [filters, setFilters] = useState<Filters>({
    department: "all-departments",
    doctor: "all-doctors",
    year: "all-years",
    month: "all-months",
    dateFilter: "today",
  });


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
      doctor: "all-doctors",
      year: "all-years",
      month: "all-months",
      dateFilter: "today",
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

  // Handle add schedule
  const handleAddSchedule = () => {
    // TODO: Open add schedule modal/dialog
    console.log("Add schedule clicked");
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
          {`${row.sessionStart} To ${row.sessionEnd} ${row.sessionType}`}
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
              placeholder="Department"
              value={filters.department}
              onChange={(value) => handleFilterChange("department", value)}
              options={DEPARTMENT_OPTIONS}
              triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full"
              icon={
                <Image
                  src="/images/folder_supervised.png"
                  alt="Department"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
              }
            />
          </div>

          {/* Doctor Dropdown with Icon Inside */}
          <div className="flex-shrink-0">
            <AppSelect
              placeholder="Doctor"
              value={filters.doctor}
              onChange={(value) => handleFilterChange("doctor", value)}
              options={DOCTOR_OPTIONS}
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
      </div>
    </div>
  );
}

