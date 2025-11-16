// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { MoveLeft, Plus, Search, Loader2, SlidersHorizontal } from "lucide-react";
// import { DataTable } from "@/components/common/data-table";
// import { Header } from "@/components/header";
// import { useRouter } from "next/navigation";
// import { QuickActionsMenu } from "./_components/QuickActionsMenu";
// import { RowActionMenu } from "./_components/RowActionMenu";
// import SearchInput from "@/components/common/search-input";
// import { FilterDialog } from "./_components/FilterDialog";
// import { AddBedDialog } from "./_components/AddBedDialog";
// import NewButton from "@/components/common/new-button";

// interface Bed {
//   id: number;
//   bedNo: string;
//   bedType: string;
//   ward: string;
//   floor: string;
//   status: "Active" | "Inactive";
//   createdOn: string;
//   addedBy: string;
// }

// export default function BedsPage() {
//   const [search, setSearch] = useState("");
//   const [beds, setBeds] = useState<Bed[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//   const router = useRouter();
//   const [addMode, setAddMode] = useState<
//     "bed" | "bedType" | "ward" | "floor" | null
//   >("bed");

//   const addOptions = [
//     { key: "bed", title: "Bed", value: "bed" },
//     { key: "bedType", title: "Bed type", value: "bedType" },
//     { key: "ward", title: "Ward", value: "ward" },
//     { key: "floor", title: "Floor", value: "floor" },
//   ];

//   // Simulated API call
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setBeds([
//         {
//           id: 1,
//           bedNo: "101",
//           bedType: "ICU",
//           ward: "General Ward",
//           floor: "Ground Floor",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//         {
//           id: 2,
//           bedNo: "G-11",
//           bedType: "VIP",
//           ward: "VIP",
//           floor: "1st Floor",
//           status: "Inactive",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//         {
//           id: 3,
//           bedNo: "G-12",
//           bedType: "VIP",
//           ward: "VIP",
//           floor: "VIP",
//           status: "Active",
//           createdOn: "2025-09-27 19:30",
//           addedBy: "Dr. Ahmed Al-Mansouri",
//         },
//       ]);
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // ✅ Table Columns
//   const columns = [
//     {
//       key: "id",
//       label: "Sr.No",
//       render: (row: Bed) => row.id,
//       className: "w-[60px] text-center",
//     },
//     {
//       key: "bedNo",
//       label: "Bed No",
//       render: (row: Bed) => (
//         <span className="font-medium text-gray-700">{row.bedNo}</span>
//       ),
//     },
//     {
//       key: "bedType",
//       label: "Bed Type",
//       render: (row: Bed) => row.bedType,
//     },
//     {
//       key: "ward",
//       label: "Ward",
//       render: (row: Bed) => row.ward,
//     },
//     {
//       key: "floor",
//       label: "Floor",
//       render: (row: Bed) => row.floor,
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (row: Bed) => (
//         <span
//           className={`font-semibold ${row.status === "Active" ? "text-green-500" : "text-red-500"
//             }`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       key: "createdOn",
//       label: "Created On",
//       render: (row: Bed) => (
//         <span className="text-gray-600">{row.createdOn}</span>
//       ),
//     },
//     {
//       key: "addedBy",
//       label: "Added By",
//       render: (row: Bed) => (
//         <span className="text-gray-700">{row.addedBy}</span>
//       ),
//     },
//     {
//       key: "action",
//       label: "Action",
//       render: (row: Bed) => (
//         <RowActionMenu
//           onEdit={() => console.log("Edit", row.bedNo)}
//           onDelete={() => console.log("Delete", row.bedNo)}
//         />
//       ),
//       className: "text-center w-[80px]",
//     },
//   ];

//   return (
//     <main className="min-h-svh w-full">
//       <Header />

//       <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
//         {/* Title & Back */}
//         <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
//             onClick={() => router.back()}
//           >
//             <MoveLeft className="w-5 h-5" />
//           </Button>
//           <h1 className="text-xl font-semibold text-gray-800">
//             Units / Wards / Beds
//           </h1>
//         </div>

//         {/* Card */}
//         <div className="space-y-4 bg-white p-5 rounded-md shadow-sm">
//           {/* Header Actions */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex flex-wrap gap-2">
//               {addOptions.map((opt) => (
//                 <Button
//                   key={opt.key}
//                   type="button"
//                   onClick={() => { setAddMode(opt.value as any); }}
//                   // onClick={() => { setAddMode(opt.value as any); setIsAddDialogOpen(true); }}
//                   className={`px-3 py-1 rounded-full text-sm bg-white border border-gray-200  text-gray-600 hover:bg-blue-100 hover:text-gray-700 flex items-center gap-2 cursor-pointer ${addMode ===opt.value && " bg-blue-600 hover:bg-blue-600 text-white hover:text-white" }`}
//                 >
//                   {opt.title}
//                 </Button>
//               ))}
//             </div>
//             <div className="flex items-center gap-3">
//               <Button
//                 onClick={() => setIsFilterDialogOpen(true)}
//                 variant="outline"
//                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//               >
//                 Filter
//                 <SlidersHorizontal className="w-5 h-5" />
//               </Button>

//               <SearchInput
//                 value={search}
//                 onChange={setSearch}
//                 placeholder="Search beds..."
//               />

//               <QuickActionsMenu />

//               {/* <Button
//                 onClick={() => setIsAddDialogOpen(true)}
//                 className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2 pr-0 rounded-[5.6rem]"
//               >
//                 Add New
//                 <span className="p-2 bg-green-600 rounded-full"><Plus className="text-green-600 w-4 h-4 bg-white rounded-full" /></span>
//               </Button> */}
//               <NewButton handleClick={() => setIsAddDialogOpen(true)} className="cursor-pointer"/>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="mt-2">

//             <DataTable columns={columns} data={beds} loading={loading} striped />
//           </div>
//         </div>
//       </div>

//       {/* Add Bed Drawer */}
//       <AddBedDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

//       {/* Filter Drawer */}
//       <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} />
//     </main>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { MoveLeft, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { DataTable } from "@/components/common/data-table";
import { QuickActions } from "./_components/QuickActions";
import { RowActionMenu } from "./_components/RowActionMenu";
import { FilterDialog } from "./_components/FilterDialog";
import { AddDialog } from "./_components/AddDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { getMockData } from "./_components/api";
import { AddBedDialog } from "./_components/AddBedDialog";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import FilterButton from "@/components/common/filter-button";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

const UnitsWardsBedsSection = [
  { key: "bed", label: "Bed" },
  { key: "bedType", label: "Bed Type" },
  { key: "ward", label: "Ward" },
  { key: "floor", label: "Floor" },
];


export default function BedsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [addMode, setAddMode] = useState<"bed" | "bedType" | "ward" | "floor">("bed");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  // Simulated API data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(getMockData(addMode));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [addMode]);

  // Columns change slightly based on mode
  const getColumns = () => {
    if (addMode === "bed") {
      return [
        { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
        { key: "bedNo", label: "Bed No", render: (row: any) => row.bedNo },
        { key: "bedType", label: "Bed Type", render: (row: any) => row.bedType },
        { key: "ward", label: "Ward", render: (row: any) => row.ward },
        { key: "floor", label: "Floor", render: (row: any) => row.floor },
        { key: "status", label: "Status", render: (row: any) => <span className={row.status === "Active" ? "text-green-500" : "text-red-500"}>{row.status}</span> },
        { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
        { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
        { key: "action", label: "Action", render: (row: any) => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />, className: "text-center w-[80px]" },
      ];
    }

    return [
      { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
      { key: "name", label: addMode === "floor" ? "Floor" : addMode === "ward" ? "Ward" : "Bed Type", render: (row: any) => row.name },
      { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
      { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
      { key: "action", label: "Action", render: (row: any) => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />, className: "text-center w-[80px]" },
    ];
  };

  return (
    <>

      <div className="p-5 space-y-8">
        {/* Title + Back */}
        {/* <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
            onClick={() => router.back()}
          >
            <MoveLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Units / Wards / Beds</h1>
        </div> */}
        <PageHeader title="Units / Wards / Beds" />

        {/* Main Card */}
        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* Tabs + Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {/* {["bed", "bedType", "ward", "floor"].map((mode) => (
                <Button
                  key={mode}
                  type="button"
                  onClick={() => setAddMode(mode as any)}
                  className={`px-3 py-1 rounded-full text-sm border border-gray-200 cursor-pointer ${addMode === mode ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white" : "bg-white text-gray-600 hover:bg-blue-100"
                    }`}
                >
                  {mode === "bed" ? "Bed" : mode === "bedType" ? "Bed Type" : mode === "ward" ? "Ward" : "Floor"}
                </Button>
              ))} */}
              <DynamicTabs
                tabs={UnitsWardsBedsSection}
                defaultTab="bed"
                onChange={(tabKey) => setAddMode(tabKey as any)}
              />
            </div>

            {/* Right Actions */}
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

              <NewButton handleClick={() => setIsAddDialogOpen(true)} className="cursor-pointer" />
            </div>
          </div>

          {/* Table */}
          <DataTable columns={getColumns()} data={data} loading={loading} striped />
        </div>
      </div>

      {/* Dialogs */}
      {addMode === "bed" ? (
        <AddBedDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
      ) : (
        <AddDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          mode={addMode}
        />
      )}
      {/* <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} /> */}
      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        mode={addMode}
        onApply={(values) => setFilters(values)}
        isLoading={false}
      />
    </>
  );
}
