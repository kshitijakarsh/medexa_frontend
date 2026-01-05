// /app/charges/page.tsx
"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/common/data-table"
import FilterDialog from "./_components/FilterDialog"
import AddSingleDialog from "./_components/AddSingleDialog"
import AddBulkDialog from "./_components/AddBulkDialog"
import EditSingleDialog from "./_components/EditSingleDialog"
import EditServiceDialog from "./_components/EditServiceDialog"
import SearchInput from "@/components/common/search-input"
import NewButton from "@/components/common/new-button"
import {
  fetchUnits,
  fetchTaxes,
  fetchCategories,
  fetchServices,
  deleteById,
  updateStatus,
} from "./_components/api"
import { PageHeader } from "@/components/common/page-header"
import { useRouter } from "next/navigation"
import ChargesRowActions from "./_components/ChargesRowActions"
import TabSwitcher from "@/components/common/tab-switcher-menu"
import { QuickActions } from "./_components/QuickActions"
import FilterButton from "@/components/common/filter-button"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable"
import { useUserStore } from "@/store/useUserStore"
import { PERMISSIONS } from "@/app/utils/permissions"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"

import { PermissionGuard } from "@/components/auth/PermissionGuard"
import { normalizePermissionList } from "@/app/utils/permissions";
import { useDictionary } from "@/i18n/use-dictionary";
import { useParams } from "next/navigation";

const ChargesSection = [
  { key: "service", label: "Service and Charge" },
  { key: "category", label: "Charges Category" },
  { key: "tax", label: "Tax Category" },
  { key: "unit", label: "Unit Type" },
] as const;

// will get used in translation 
const LABEL_TO_TRANSLATION_KEY = {
  "Service and Charge": "service",
  "Charges Category": "category",
  "Tax Category": "tax",
  "Unit Type": "unit",
} as const;

const PERMISSION_MAP = {
  service: PERMISSIONS.CHARGE,
  category: PERMISSIONS.CHARGE_CATEGORY,
  tax: PERMISSIONS.TAX_CATEGORY,
  unit: PERMISSIONS.CHARGE_UNIT,
}

export default function ChargesPage() {
  const VIEW_PERMISSIONS = [
    PERMISSIONS.CHARGE.VIEW,
    PERMISSIONS.CHARGE_CATEGORY.VIEW,
    PERMISSIONS.TAX_CATEGORY.VIEW,
    PERMISSIONS.CHARGE_UNIT.VIEW,
  ];

  return (
    <PermissionGuard permission={VIEW_PERMISSIONS} requireAll={false}>
      <ChargesPageContent />
    </PermissionGuard>
  )
}

function ChargesPageContent() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions)
  const { withLocale } = useLocaleRoute()
  const permissionStrings = normalizePermissionList(userPermissions)

  const router = useRouter()
  const [tab, setTab] = useState<"service" | "category" | "tax" | "unit">(
    "service"
  )
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isBulkOpen, setIsBulkOpen] = useState(false)
  const [bulkMode, setBulkMode] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [editMode, setEditMode] = useState<
    "service" | "category" | "tax" | "unit"
  >("service")

  const params = useParams();
  const lang = params.lang as string;
  const dict = useDictionary();
  const trans = dict.pages.charges;
  /* -------------------- Filters -------------------- */
  const [filters, setFilters] = useState<any>({})

  const translatedTabs = ChargesSection.map((tab) => ({
    key: tab.key,
    label: trans.tabs[LABEL_TO_TRANSLATION_KEY[tab.label]],
  }));

  /* Filter Tabs based on Permissions */
  const filteredTabs = translatedTabs.filter((t) => {
    const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP];
    return perm?.VIEW ? permissionStrings.includes(perm.VIEW) : false;
  });

  /* Ensure selected tab is permitted */
  useEffect(() => {
    if (filteredTabs.length > 0) {
      const isCurrentTabPermitted = filteredTabs.some(t => t.key === tab);
      if (!isCurrentTabPermitted) {
        setTab(filteredTabs[0]?.key as any);
      }
    }
  }, [filteredTabs, tab]);


  useEffect(() => {
    // Only load if tab is valid
    if (filteredTabs.some(t => t.key === tab)) {
      load()
    }
  }, [tab, search, filters])

  const load = async () => {
    setLoading(true)
    try {
      if (tab === "service") {
        // Build query params from filters and search
        const params: any = {
          page: 1,
          limit: 100,
        }
        if (search) params.search = search
        if (filters.status)
          params.status = filters.status === "Active" ? "active" : "inactive"
        if (filters.category_id) params.category_id = filters.category_id
        if (filters.unit_id) params.unit_id = filters.unit_id
        if (filters.tax_id) params.tax_id = filters.tax_id

        const s = await fetchServices(params)
        setData(s)
      } else if (tab === "category") {
        // Build query params from filters and search
        const categoryParams: any = {
          page: 1,
          limit: 100,
        }
        if (search) categoryParams.search = search
        if (filters.status)
          categoryParams.status =
            filters.status === "Active" ? "active" : "inactive"
        const c = await fetchCategories(categoryParams)
        setData(c)
      } else if (tab === "tax") {
        // Build query params from filters and search
        const taxParams: any = {
          page: 1,
          limit: 100,
        }
        if (search) taxParams.search = search
        if (filters.status)
          taxParams.status = filters.status === "Active" ? "active" : "inactive"
        const t = await fetchTaxes(taxParams)
        setData(t)
      } else if (tab === "unit") {
        // Build query params from filters and search
        const unitParams: any = {
          page: 1,
          limit: 100,
        }
        if (search) unitParams.search = search
        if (filters.status)
          unitParams.status =
            filters.status === "Active" ? "active" : "inactive"
        const u = await fetchUnits(unitParams)
        setData(u)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    await deleteById(
      tab === "unit"
        ? "unit"
        : tab === "tax"
          ? "tax"
          : tab === "category"
            ? "category"
            : "service",
      id
    )
    load()
  }

  const toggleStatus = async (id: number, status: "Active" | "Inactive") => {
    await updateStatus(
      tab === "unit"
        ? "unit"
        : tab === "tax"
          ? "tax"
          : tab === "category"
            ? "category"
            : "service",
      id,
      status
    )
    load()
  }

  const columnsFor = (t: typeof tab) => {
    if (t === "service") {
      return [
        {
          key: "sno",
          label: trans.columns.srNo,
          render: (r: any) => r.sno,
          className: "w-[60px] text-center",
        },
        {
          key: "serviceName",
          label: trans.columns.serviceName,
          render: (r: any) => r.serviceName,
        },
        {
          key: "chargeCategory",
          label: trans.columns.chargeCategory,
          render: (r: any) => r.chargeCategoryLabel || r.chargeCategory,
        },
        {
          key: "unit",
          label: trans.columns.unit,
          render: (r: any) => r.unitLabel || r.unit,
        },
        {
          key: "tax",
          label: trans.columns.tax,
          render: (r: any) => r.taxLabel || r.tax || "",
        },
        {
          key: "standardCharge",
          label: trans.columns.standardCharge,
          render: (r: any) => r.standardCharge,
        },
        {
          key: "status",
          label: trans.columns.status,
          render: (r: any) => (
            <span
              className={
                r.status === "Active" ? "text-green-600" : "text-red-500"
              }
            >
              {r.status}
            </span>
          ),
        },
        {
          key: "action",
          label: trans.columns.action,
          render: (r: any) => (
            <ChargesRowActions
              onEdit={() => {
                setEditItem(r)
                setEditMode(tab)
                setIsEditOpen(true)
              }}
              onView={() => router.push(withLocale(`/administration/charges/${r.id}`))}
              onDelete={() => handleDelete(r.id)}
              userPermissions={permissionStrings}
              mode={tab}
            />
          ),
          className: "text-center w-[80px]",
        },
      ]
    }

    if (t === "tax") {
      // category / tax / unit table
      return [
        {
          key: "sno",
          label: trans.columns.srNo,
          render: (r: any) => r.sno,
          className: "w-[60px] text-center",
        },
        {
          key: "name",
          label: t === "tax" ? trans.columns.taxName : trans.columns.chargeName,
          render: (r: any) => (t === "tax" ? r.taxName : r.chargeName),
        },
        {
          key: "createdOn",
          label: trans.columns.createdOn,
          render: (r: any) => r.createdOn,
        },
        {
          key: "percentage",
          label: trans.columns.percentage,
          render: (r: any) => (t === "tax" ? `${r.percentage}%` : ""),
        },
        {
          key: "status",
          label: trans.columns.status,
          render: (r: any) => (
            <span
              className={
                r.status === "Active" ? "text-green-600" : "text-red-500"
              }
            >
              {r.status}
            </span>
          ),
        },
        {
          key: "action",
          label: trans.columns.action,
          render: (r: any) => (
            <ChargesRowActions
              onEdit={() => {
                setEditItem(r)
                setEditMode(tab)
                setIsEditOpen(true)
              }}
              onDelete={() => handleDelete(r.id)}
              userPermissions={permissionStrings}
              mode={tab}
            />
          ),
          className: "text-center w-[80px]",
        },
      ]
    }
    if (t === "category") {
      // category / tax / unit table
      return [
        {
          key: "sno",
          label: trans.columns.srNo,
          render: (r: any) => r.sno,
          className: "w-[60px] text-center",
        },
        { key: "name", label: trans.columns.chargeName, render: (r: any) => r.chargeName },
        {
          key: "createdOn",
          label: trans.columns.createdOn,
          render: (r: any) => r.createdOn,
        },
        // { key: "percentage", label: trans.columns.percentage, render: (r: any) => (t === "tax" ? `${r.percentage}%` : "") },
        {
          key: "status",
          label: trans.columns.status,
          render: (r: any) => (
            <span
              className={
                r.status === "Active" ? "text-green-600" : "text-red-500"
              }
            >
              {r.status}
            </span>
          ),
        },
        {
          key: "action",
          label: trans.columns.action,
          render: (r: any) => (
            <ChargesRowActions
              onEdit={() => {
                setEditItem(r)
                setEditMode(tab)
                setIsEditOpen(true)
              }}
              onDelete={() => handleDelete(r.id)}
              userPermissions={permissionStrings}
              mode={tab}
            />
          ),
          className: "text-center w-[80px]",
        },
      ]
    }
    if (t === "unit") {
      // category / tax / unit table
      return [
        {
          key: "sno",
          label: trans.columns.srNo,
          render: (r: any) => r.sno,
          className: "w-[60px] text-center",
        },
        { key: "name", label: trans.columns.unitType, render: (r: any) => r.unit },
        {
          key: "createdOn",
          label: trans.columns.createdOn,
          render: (r: any) => r.createdOn,
        },
        {
          key: "status",
          label: trans.columns.status,
          render: (r: any) => (
            <span
              className={
                r.status === "Active" ? "text-green-600" : "text-red-500"
              }
            >
              {r.status}
            </span>
          ),
        },
        {
          key: "action",
          label: trans.columns.action,
          render: (r: any) => (
            <ChargesRowActions
              onEdit={() => {
                setEditItem(r)
                setEditMode(tab)
                setIsEditOpen(true)
              }}
              onDelete={() => handleDelete(r.id)}
              userPermissions={permissionStrings}
              mode={tab}
            />
          ),
          className: "text-center w-[80px]",
        },
      ]
    }

    return []

  };

  const onApplyFilters = (f: any) => {
    // simple client-side filter demo
    setLoading(true)
    fetchFiltered(f)
  }

  const fetchFiltered = async (f: any) => {
    setLoading(true)
    try {
      if (tab === "service") {
        // Use API query params for filtering
        const params: any = {
          page: 1,
          limit: 100,
        }
        if (search) params.search = search
        if (f.status)
          params.status = f.status === "Active" ? "active" : "inactive"
        if (f.category_id) params.category_id = f.category_id
        if (f.unit_id) params.unit_id = f.unit_id
        if (f.tax_id) params.tax_id = f.tax_id
        if (f.name) params.search = f.name // Use search param for name filter

        const all = await fetchServices(params)
        setData(all)
      } else if (tab === "category") {
        // Use API query params for filtering categories
        const categoryParams: any = {
          page: 1,
          limit: 100,
        }
        if (search || f.name) categoryParams.search = f.name || search
        if (f.status)
          categoryParams.status = f.status === "Active" ? "active" : "inactive"

        const all = await fetchCategories(categoryParams)
        setData(all)
      } else if (tab === "tax") {
        // Use API query params for filtering tax categories
        const taxParams: any = {
          page: 1,
          limit: 100,
        }
        if (search || f.name) taxParams.search = f.name || search
        if (f.status)
          taxParams.status = f.status === "Active" ? "active" : "inactive"

        const all = await fetchTaxes(taxParams)
        setData(all)
      } else if (tab === "unit") {
        // Use API query params for filtering units
        const unitParams: any = {
          page: 1,
          limit: 100,
        }
        if (search || f.name) unitParams.search = f.name || search
        if (f.status)
          unitParams.status = f.status === "Active" ? "active" : "inactive"

        const all = await fetchUnits(unitParams)
        setData(all)
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="p-5 space-y-8">
        <div className="flex justify-between items-center">
          <PageHeader title={trans.title} />

        </div>
        <div className="bg-white p-5 rounded-md shadow-sm">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <DynamicTabs
              tabs={filteredTabs}
              defaultTab="service"
              onChange={(tabKey) => setTab(tabKey as any)}
            />

            {/* Filters / Search / Actions */}
            <div className="flex justify-end items-center gap-3 ">

              {/* <FilterButton onClick={() => setIsFilterOpen(true)} /> */}
              <FilterButton
                filters={filters}
                onClick={() => setIsFilterOpen(true)}
                onClear={() => setFilters({})}
                inverted={true}
              />

              <div className="min-w-[220px]">
                <SearchInput
                  value={search}
                  onChange={(v: any) => setSearch(v)}
                  placeholder={dict.common.search}
                />
              </div>

              <QuickActions />
              <NewButton
                handleClick={() => {
                  if (tab === "service")
                    router.push(withLocale(`/administration/charges/add`))
                  else if (bulkMode) setIsBulkOpen(true)
                  else setIsAddOpen(true)
                }}
              />
            </div>
          </div>
          {/* Table */}
          <ResponsiveDataTable
            columns={columnsFor(tab)}
            data={data}
            loading={loading}
            striped
          />
        </div>
      </div>

      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={onApplyFilters}
      />
      <AddSingleDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        mode={tab === "category" ? "category" : tab === "tax" ? "tax" : "unit"}
        onSaved={load}
      />
      <AddBulkDialog
        open={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        mode={tab === "category" ? "category" : tab === "tax" ? "tax" : "unit"}
        onSaved={load}
      />
      {editMode === "service" ? (
        <EditServiceDialog
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false)
            setEditItem(null)
          }}
          item={editItem}
          onSaved={load}
        />
      ) : (
        <EditSingleDialog
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false)
            setEditItem(null)
          }}
          mode={editMode}
          item={editItem}
          onSaved={load}
        />
      )}
    </>
  )
}