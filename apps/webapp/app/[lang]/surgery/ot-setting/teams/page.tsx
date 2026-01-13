"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { PaginationControls } from "@/components/common/data-table/PaginationControls";
import { useDictionary } from "@/i18n/use-dictionary";
import ActionMenu from "@/components/common/action-menu";
import { useSurgeryTeams, useDeleteSurgeryTeam } from "@/app/[lang]/surgery/_hooks/useSurgeryTeam";
import { SurgeryTeam } from "@/lib/api/surgery/teams";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { toast } from "@workspace/ui/lib/sonner";
import {
    Calendar,
    BriefcaseMedical,
    Stethoscope,
    CalendarDays,
    MoreVertical,
    Ellipsis
} from "lucide-react";
import { FilterDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/FilterDropdown";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DateRangeDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/DateRangeDropdown";
import { DateRange } from "react-day-picker";

const limit = 10;

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface TeamTableRow {
    id: string;
    teamName: string;
    leadSurgeon: {
        name: string;
        // department: string;
    };
    membersCount: number;
    speciality: string;
    createdOn: string;
    createdBy: {
        name: string;
        // department: string;
    };
    status: "Active" | "Inactive";
}

function TeamsListContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { lang } = useParams();
    const dict = useDictionary();

    const initialPage = parseInt(searchParams.get("page") || "1");
    const [page, setPage] = useState(initialPage);

    /* Search */
    const [searchType, setSearchType] = useState({ label: "MRN", value: "mrn" });
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    /* View toggles */
    const [sortOrder, setSortOrder] = useState<"nearest" | "farthest">("nearest");
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    /* Filter states */
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    /* Update URL on page change */
    useEffect(() => {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        router.replace(`?${params.toString()}`);
    }, [page, router]);

    // Deletion
    const deleteTeamMutation = useDeleteSurgeryTeam();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState<{ id: string; name: string } | null>(null);

    const handleDeleteConfirmed = () => {
        if (!teamToDelete) return;

        deleteTeamMutation.mutate(teamToDelete.id, {
            onSuccess: () => {
                toast.success(dict.toast.deleted);
                setDeleteDialogOpen(false);
                setTeamToDelete(null);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || error?.message || dict.toast.failed);
            }
        });
    };

    const {
        data: teamsData,
        isLoading,
        error: teamsError,
        refetch,
    } = useSurgeryTeams({
        search: searchQuery.length >= 2 ? searchQuery : undefined,
        status: selectedStatus || undefined,
    });

    const extractTeams = () => {
        if (!teamsData) return [];
        if (Array.isArray(teamsData)) return teamsData;
        if (Array.isArray(teamsData.data)) return teamsData.data;
        return [];
    };
    const allTeams = extractTeams();
    console.log("Extracted teams:", allTeams);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTeams = allTeams.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allTeams.length / limit);

    /* Extract unique values for filters */
    const departments = useMemo(() => {
        const uniqueValues = new Set(allTeams.map((t: any) => t.speciality || t.department || "Unknown"));
        return Array.from(uniqueValues) as string[];
    }, [allTeams]);

    const doctors = useMemo(() => {
        const uniqueValues = new Set(allTeams.map((t: any) => t.lead_surgeon?.name || t.name || "Unknown"));
        return Array.from(uniqueValues) as string[];
    }, [allTeams]);

    /* Map API response to table format */
    const tableData: TeamTableRow[] = paginatedTeams.map((team: SurgeryTeam) => ({
        id: team.id.toString(),
        teamName: team.name || "Unknown Team",
        leadSurgeon: {
            name: team.lead_surgeon?.name || "Not Assigned",
            // department: team.speciality || "—",
        },
        membersCount: team.members?.length || 0,
        speciality: team.speciality || "General",
        createdOn: team.created_at
            ? new Date(team.created_at).toLocaleString()
            : "—",
        createdBy: {
            name: team.createdBy?.name || "System",
            // department: "Administration",
        },
        status: team.status === "active" ? "Active" : "Inactive",
    }));

    const searchOptions = [
        { label: dict.pages.surgery.otSetting.teams.searchLabels.mrn, value: "mrn" },
        { label: dict.pages.surgery.otSetting.teams.searchLabels.name, value: "name" },
        { label: dict.pages.surgery.otSetting.teams.searchLabels.team, value: "team" },
    ];

    const columns: Column<TeamTableRow>[] = [
        {
            key: "teamName",
            label: dict.pages.surgery.otSetting.teams.columns.teamName,
        },
        {
            key: "leadSurgeon",
            label: dict.pages.surgery.otSetting.teams.columns.leadSurgeon,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">
                            {row.leadSurgeon.name}
                        </span>
                        {/* <span className="text-xs text-slate-500">
                            {row.leadSurgeon.department}
                        </span> */}
                    </div>
                </div>
            )
        },
        {
            key: "membersCount",
            label: dict.pages.surgery.otSetting.teams.columns.membersCount,
            render: (row) => (
                <div className="flex items-center gap-1">
                    <span>{row.membersCount}</span>
                </div>
            )
        },
        {
            key: "speciality",
            label: dict.pages.surgery.otSetting.teams.columns.speciality,
        },
        {
            key: "createdOn",
            label: dict.pages.surgery.otSetting.teams.columns.createdOn,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm text-slate-700">{row.createdOn}</span>
                </div>
            )
        },
        {
            key: "createdBy",
            label: dict.pages.surgery.otSetting.teams.columns.createdBy,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.createdBy.name}
                    </span>
                    {/* <span className="text-xs text-slate-500">
                        {row.createdBy.department}
                    </span> */}
                </div>
            )
        },
        {
            key: "status",
            label: dict.pages.surgery.otSetting.teams.columns.status,
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
                        onClick: () => {
                            router.push(`/${lang}/surgery/ot-setting/teams/${row.id}`);
                        }
                    },
                    {
                        label: dict.common.edit,
                        onClick: () => {
                            router.push(`/${lang}/surgery/ot-setting/teams/new?id=${row.id}`);
                        }
                    },
                    {
                        label: dict.common.delete,
                        onClick: () => {
                            setTeamToDelete({ id: row.id.toString(), name: row.teamName });
                            setDeleteDialogOpen(true);
                        },
                        variant: "danger"
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />
            )
        }
    ];


    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="font-medium text-base">Teams</h1>

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
                            options={departments.length > 0 ? departments : ["No Departments"]}
                            value={selectedDept}
                            onSelect={setSelectedDept}
                        />
                        <FilterDropdown
                            icon={<Stethoscope size={16} />}
                            label={dict.pages.surgery.common.doctor}
                            options={doctors.length > 0 ? doctors : ["No Doctors"]}
                            value={selectedDoctor}
                            onSelect={setSelectedDoctor}
                        />
                        <FilterDropdown
                            icon={<Ellipsis size={16} />}
                            label={dict.common.status}
                            options={["Active", "Inactive"]}
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
                                Calendar View
                            </>
                        }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-2">
                {/* LEFT */}
                <div className="flex shrink-0 items-center gap-3">
                    <FilterButton onClick={() => refetch()} className="bg-blue-500 text-white hover:none" />
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
                            onSearchChange={(val) => {
                                setSearchValue(val);
                                if (val.length >= 2) {
                                    setSearchQuery(val);
                                } else if (val.length === 0) {
                                    setSearchQuery("");
                                }
                            }}
                            placeholder="Search Teams"
                        />
                    </div>

                    {/* Quick filter (Sort) */}
                    <DateFilter
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Add Button */}
                    <NewButton
                        name="Add Team"
                        className="h-9 text-sm"
                        handleClick={() => {
                            router.push(`/${lang}/surgery/ot-setting/teams/new`);
                        }}
                    ></NewButton>

                    {/* View mode toggle */}
                    <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
                </div>
            </div>

            {teamsError ? (
                <div className="text-center py-8 text-red-600">
                    <p>Failed to load teams. Please try again.</p>
                </div>
            ) : (
                <ResponsiveDataTable
                    columns={columns}
                    data={tableData}
                    loading={isLoading}
                    striped
                    pagination={
                        totalPages > 1 ? (
                            <PaginationControls
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        ) : undefined
                    }
                />
            )}

            <ConfirmDialog
                open={deleteDialogOpen}
                title={dict.common.delete}
                description={`Are you sure you want to delete the team "${teamToDelete?.name}"?`}
                confirmText={dict.common.delete}
                cancelText={dict.common.cancel}
                loading={deleteTeamMutation.isPending}
                onConfirm={handleDeleteConfirmed}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setTeamToDelete(null);
                }}
            />
        </div>
    );
}

export default function TeamsList() {
    return (
        <Suspense fallback={<div className="p-5">Loading...</div>}>
            <TeamsListContent />
        </Suspense>
    );
}
