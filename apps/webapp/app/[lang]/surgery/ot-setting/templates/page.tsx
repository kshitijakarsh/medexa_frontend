"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDictionary } from "@/i18n/use-dictionary";
import { ResponsiveDataTable as DataTable, Column } from "@/components/common/data-table/ResponsiveDataTable";
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";

import {
    BriefcaseMedical,
    Stethoscope,
    CalendarDays,
    Ellipsis
} from "lucide-react";
import ActionMenu from "@/components/common/action-menu";
import { FilterDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/FilterDropdown";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DateRangeDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/DateRangeDropdown";
import { useSurgeryTemplates } from "@/app/[lang]/surgery/_hooks/useSurgeryTemplate";
import { SurgeryTemplate } from "@/lib/api/surgery/templates";

interface TemplateTableRow {
    id: string;
    templateName: string;
    procedure: string;
    leadSurgeon: {
        name: string;
        department: string;
    };
    createdOn: string;
    createdBy: {
        name: string;
        department: string;
    };
    status: "Active" | "Inactive";
}

export default function TemplatesList() {
    const router = useRouter();
    const params = useParams();
    const lang = params.lang as string;
    const dict = useDictionary();

    // State
    const [searchType, setSearchType] = useState({ label: dict.pages.surgery.otSetting.templates.searchLabels.templateName, value: "templateName" });
    const [searchValue, setSearchValue] = useState("");
    const [sortOrder, setSortOrder] = useState<"nearest" | "farthest">("nearest");
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    // Filter States
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const {
        data: templatesResponse,
        isLoading,
        error: templatesError,
        refetch,
    } = useSurgeryTemplates({
        search: searchValue.length >= 2 ? searchValue : undefined,
        status: selectedStatus || undefined,
    });

    const templatesData = templatesResponse?.data || [];

    // Map API data to table format
    const tableData: TemplateTableRow[] = templatesData.map((template: SurgeryTemplate) => ({
        id: template.id,
        templateName: template.name || "—",
        procedure: template.procedure?.name || "—",
        leadSurgeon: {
            name: template.lead_surgeon?.name || "Not Assigned",
            department: template.lead_surgeon?.department || "—",
        },
        createdOn: template.created_at
            ? new Date(template.created_at).toLocaleString()
            : "—",
        createdBy: {
            name: template.createdBy?.name || "System",
            department: template.createdBy?.department || "—",
        },
        status: template.status === 'active' ? 'Active' : 'Inactive',
    }));

    // Memoized Filter Options
    const departments = useMemo(() => {
        const uniqueValues = new Set(tableData.map((t) => t.leadSurgeon.department).filter(d => d !== "—"));
        return Array.from(uniqueValues);
    }, [tableData]);

    const doctors = useMemo(() => {
        const uniqueValues = new Set(tableData.map((t) => t.leadSurgeon.name).filter(n => n !== "Not Assigned"));
        return Array.from(uniqueValues);
    }, [tableData]);

    const searchOptions = [
        { label: dict.pages.surgery.otSetting.templates.searchLabels.templateName, value: "templateName" },
        { label: dict.pages.surgery.otSetting.templates.searchLabels.procedure, value: "procedure" },
        { label: dict.pages.surgery.otSetting.templates.searchLabels.surgeon, value: "surgeon" },
    ];

    const columns: Column<TemplateTableRow>[] = [
        {
            key: "templateName",
            label: dict.pages.surgery.otSetting.templates.columns.templateName,
        },
        {
            key: "procedure",
            label: dict.pages.surgery.otSetting.templates.columns.procedure,
        },
        {
            key: "leadSurgeon",
            label: dict.pages.surgery.otSetting.templates.columns.leadSurgeon,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.leadSurgeon.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.leadSurgeon.department}
                    </span>
                </div>
            )
        },
        {
            key: "createdOn",
            label: dict.pages.surgery.otSetting.templates.columns.createdOn,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm text-slate-700">{row.createdOn}</span>
                </div>
            )
        },
        {
            key: "createdBy",
            label: dict.pages.surgery.otSetting.templates.columns.createdBy,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.createdBy.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.createdBy.department}
                    </span>
                </div>
            )
        },
        {
            key: "status",
            label: dict.pages.surgery.otSetting.templates.columns.status,
            render: (row) => (
                <span
                    className={`
                  ${row.status === 'Active'
                            ? 'text-emerald-600'
                            : 'text-rose-600'}
                  font-medium
                `}
                >
                    {row.status === 'Active' ? dict.pages.surgery.common.status.active : dict.pages.surgery.common.status.inactive}
                </span>
            )
        },
        {
            key: "actions",
            label: dict.table.action,
            render: (row) => (
                <ActionMenu actions={[
                    {
                        label: dict.common.view,
                        // onClick: () => {
                        //     router.push(`/${lang}/surgery/ot-setting/templates/${row.id}`);
                        // }
                    },
                    {
                        label: dict.common.edit,
                        // onClick: () => {
                        //     router.push(`/${lang}/surgery/ot-setting/templates/${row.id}/edit`);
                        // }
                    },
                    {
                        label: dict.common.delete,
                        // onClick: () => {
                        //     // Handle delete
                        // }
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />
            )
        }
    ];

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="font-medium text-base text-slate-800">{dict.pages.surgery.otSetting.templates.title}</h1>

                {/* Filters + Calendar toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
                        <DateRangeDropdown
                            label={dict.pages.surgery.otSchedule.dateRange}
                            value={dateRange}
                            onSelect={setDateRange}
                        />
                        <FilterDropdown
                            icon={<BriefcaseMedical size={16} />}
                            label={dict.pages.surgery.common.department}
                            options={departments}
                            value={selectedDept}
                            onSelect={setSelectedDept}
                        />
                        <FilterDropdown
                            icon={<Stethoscope size={16} />}
                            label={dict.pages.surgery.common.doctor}
                            options={doctors}
                            value={selectedDoctor}
                            onSelect={setSelectedDoctor}
                        />
                        <FilterDropdown
                            icon={<Ellipsis size={16} />}
                            label={dict.common.status}
                            options={[dict.pages.surgery.common.status.active, dict.pages.surgery.common.status.inactive]}
                            value={selectedStatus}
                            onSelect={setSelectedStatus}
                        />
                    </div>

                    {/* View Toggle */}
                    <StatusToggle
                        variant="simple"
                        isActive={isCalendarView}
                        onToggle={setIsCalendarView}
                        label={
                            <>
                                <CalendarDays size={18} className="text-blue-500" />
                                {dict.pages.surgery.common.calendarView}
                            </>
                        }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-2">
                {/* LEFT */}
                <div className="flex shrink-0 items-center gap-3">
                    <FilterButton onClick={() => refetch()} className="bg-blue-500 text-white hover:bg-blue-600 border-none" />
                </div>

                {/* RIGHT */}
                <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
                    {/* Search */}
                    <div className="w-auto">
                        <SearchWithDropdown
                            options={searchOptions}
                            selectedOption={searchType}
                            onOptionSelect={setSearchType}
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            placeholder={dict.pages.surgery.otSetting.templates.searchTemplates}
                        />
                    </div>

                    {/* Quick filter (Sort) */}
                    <DateFilter
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Add Button */}
                    <NewButton
                        name={dict.pages.surgery.otSetting.templates.addTemplate}
                        className="h-9 text-sm"
                        handleClick={() => {
                            router.push(`/${lang}/surgery/ot-setting/templates/new`);
                        }}
                    ></NewButton>

                    {/* View mode toggle */}
                    <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={tableData}
                loading={isLoading}
            />
        </div>
    );
}
