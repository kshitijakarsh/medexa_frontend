"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { DataTable } from "@/components/common/data-table";
import { QuickActions } from "./_components/QuickActions";
import { OperationTheatresRowActionMenu } from "./_components/OperationTheatresRowActionMenu";
import { FilterDialog } from "./_components/FilterDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { getMockOperationTheatreData } from "./_components/api";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { AddOperationTheatreDialog } from "./_components/AddOperationTheatreDialog";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { useUserStore } from "@/store/useUserStore";
import FilterButton from "@/components/common/filter-button";
import { Can } from "@/components/common/app-can";
import { PERMISSIONS } from "@/app/utils/permissions";

export default function OperationTheatresPage() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Simulated API data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(getMockOperationTheatreData());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
    { key: "operationRoom", label: "Operation Room", render: (row: any) => row.operationRoom },
    { key: "roomName", label: "OT Room Name", render: (row: any) => row.roomName },
    { key: "floor", label: "Floor", render: (row: any) => row.floor },
    { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
    { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
    {
      key: "action",
      label: "Action",
      render: (row: any) => <OperationTheatresRowActionMenu onEdit={() => { }} onDelete={() => { }} userPermissions={userPermissions} />,
      className: "text-center w-[80px]",
    },
  ];

  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title="Operation Theatres / Procedure Rooms" />

        {/* Table Card */}
        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div></div>
            <div className="flex items-center gap-3">
              {/* <Button
                onClick={() => setIsFilterDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Filter
                <SlidersHorizontal className="w-5 h-5" />
              </Button> */}
              <FilterButton onClick={() => setIsFilterDialogOpen(true)} />
              <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
              <QuickActions />
              <Can
                permission={PERMISSIONS.OPERATION_THEATRES.CREATE}
                userPermissions={userPermissions}
              >
                <NewButton handleClick={() => setIsAddDialogOpen(true)} className="cursor-pointer" />
              </Can>

            </div>
          </div>

          {/* Table */}
          <ResponsiveDataTable columns={columns} data={data} loading={loading} striped />
        </div>
      </div>

      {/* Dialogs */}
      <AddOperationTheatreDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} isLoading={false} />
    </>
  );
}
