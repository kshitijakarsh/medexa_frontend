"use client";

import { useEffect, useState } from "react";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import FilterButton from "@/components/common/filter-button";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { PageHeader } from "@/components/common/page-header";
import { QuickActions } from "./_components/QuickActions";
import ChargesRowActions from "./_components/ChargesRowActions";
import { createPatientCategoryApiClient } from "@/lib/api/administration/patients";
import { PERMISSIONS } from "@/app/utils/permissions";
import { useUserStore } from "@/store/useUserStore";
import { Can } from "@/components/common/app-can";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

import { useDictionary } from "@/i18n/use-dictionary";
/* ------------------------------------------
   API CLIENT
------------------------------------------- */
const api = createPatientCategoryApiClient({});

export default function PatientPage() {
  return (
    <PermissionGuard permission={PERMISSIONS.PATIENTS.VIEW}>
      <PatientPageContent />
    </PermissionGuard>
  )
}

function PatientPageContent() {

  const dict = useDictionary();
  const trans = dict.pages.patients;
  /* ------------------------------------------
     RBAC
  ------------------------------------------- */
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  /* ------------------------------------------
     STATE
  ------------------------------------------- */
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [patientType, setPatientType] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  /* ------------------------------------------
     LOAD DATA
  ------------------------------------------- */
  const load = async () => {
    try {
      setLoading(true);

      const res = await api.getPatientCategories({
        search,
        status: filters?.status,
        page: 1,
        limit: 50,
      });

      const formatted = res.data.data.map((item: any, index: number) => ({
        id: item.id,
        sno: index + 1,
        patientType: item.name ?? item.patient_type,
        createdOn: item.created_at ?? "-",
        addedBy: item.created_by ?? "-",
        status: item.status === "active" ? "Active" : "Inactive",
      }));

      setData(formatted);
    } catch (err) {
      console.error("Failed to load patient categories", err);
    } finally {
      setLoading(false);
    }
  };

  /* Load only after permissions/token are ready */
  useEffect(() => {
    if (!userPermissions) return;
    load();
  }, [userPermissions]);

  /* Reload on search / filter change */
  useEffect(() => {
    if (!userPermissions) return;
    load();
  }, [search, filters]);

  /* ------------------------------------------
     DELETE
  ------------------------------------------- */
  const handleDelete = async (id: number) => {
    await api.deletePatientCategory(String(id));
    await load();
  };

  /* ------------------------------------------
     STATUS UPDATE
  ------------------------------------------- */
  const toggleStatus = async (id: number, currentStatus: string) => {
    await api.updatePatientCategory(String(id), {
      status: currentStatus === "Active" ? "inactive" : "active",
    });
    await load();
  };

  /* ------------------------------------------
     CREATE
  ------------------------------------------- */
  const handleCreate = async () => {
    if (!patientType.trim()) return;

    await api.createPatientCategory({
      name: patientType,
      status,
    });

    setPatientType("");
    setStatus("active");
    setIsDrawerOpen(false);
    await load();
  };

  /* ------------------------------------------
     TABLE COLUMNS
  ------------------------------------------- */
  const columns = [
    {
      key: "sno",
      label: trans.table.sno,
      render: (r: any) => r.sno,
      className: "w-[60px]",
    },
    {
      key: "patientType",
      label: trans.patientTypes,
      render: (r: any) => r.patientType,
    },
    {
      key: "createdOn",
      label: trans.table.createdOn,
      render: (r: any) => r.createdOn,
    },
    {
      key: "addedBy",
      label: trans.table.addedBy,
      render: (r: any) => r.addedBy,
    },
    {
      key: "status",
      label: trans.table.status,
      render: (r: any) => (
        <span
          className={
            r.status === "Active"
              ? "text-green-600 font-medium"
              : "text-red-500"
          }
        >
          {r.status}
        </span>
      ),
    },
    {
      key: "action",
      label: trans.table.action,
      className: "text-right",
      render: (r: any) => (
        <ChargesRowActions
          onEdit={() => console.log("edit", r)}
          onView={() => console.log("view", r)}
          onDelete={() => handleDelete(r.id)}
          onToggleStatus={() => toggleStatus(r.id, r.status)}
          mode="patients"
          userPermissions={userPermissions}
        />
      ),
    },
  ];

  return (
    <div className="p-5 space-y-8">
      <PageHeader title={trans.title} />

      <div className="bg-white p-5 rounded-md shadow-sm">
        {/* ACTION BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm">
              {trans.patientTypes}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <FilterButton
              filters={filters}
              onClick={() => setIsFilterOpen(true)}
              onClear={() => setFilters({})}
              inverted={true}
            />

            <div className="min-w-[220px]">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder= {dict.common.search}
              />
            </div>

            <QuickActions />

            <Can
              permission={PERMISSIONS.PATIENTS?.CREATE}
              userPermissions={userPermissions}
            >
              <NewButton handleClick={() => setIsDrawerOpen(true)} />
            </Can>
          </div>
        </div>

        {/* TABLE */}
        <ResponsiveDataTable
          columns={columns}
          data={data}
          loading={loading}
          striped
        />
      </div>

      {/* ------------------------------------------
         RIGHT DRAWER
      ------------------------------------------- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-lg font-semibold">Add Patient Type</h2>
              <button onClick={() => setIsDrawerOpen(false)}>✕</button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {trans.patientTypes}
                </label>
                <input
                  value={patientType}
                  onChange={(e) => setPatientType(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Enter patient type"
                />
              </div>

              {/* STATUS TOGGLE */}
              <div className="rounded-lg bg-[#E0FBFF] px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                  {dict.common.status}
                </span>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-semibold ${status === "inactive"
                      ? "text-[#EA4B4B]"
                      : "text-gray-500"
                      }`}
                  >
                    {dict.common.inactive}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setStatus((prev) =>
                        prev === "active" ? "inactive" : "active"
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${status === "active" ? "bg-[#12B28C]" : "bg-gray-400"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${status === "active"
                          ? "translate-x-6"
                          : "translate-x-1"
                        }`}
                    />
                  </button>

                  <span
                    className={`text-sm font-semibold ${status === "active"
                      ? "text-[#12B28C]"
                      : "text-gray-500"
                      }`}
                  >
                    {dict.common.active}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-md text-sm"
                onClick={() => setIsDrawerOpen(false)}
              >
                {dict.common.cancel}
              </button>
              <button
                className="px-4 py-2 bg-[#12B28C] text-white rounded-md text-sm"
                onClick={handleCreate}
              >
                {dict.common.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
