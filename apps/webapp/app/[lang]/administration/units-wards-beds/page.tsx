// // // // // // "use client";

// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Button } from "@workspace/ui/components/button";
// // // // // // import { MoveLeft, Plus, Search, Loader2, SlidersHorizontal } from "lucide-react";
// // // // // // import { DataTable } from "@/components/common/data-table";
// // // // // // import { Header } from "@/components/header";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { QuickActionsMenu } from "./_components/QuickActionsMenu";
// // // // // // import { RowActionMenu } from "./_components/RowActionMenu";
// // // // // // import SearchInput from "@/components/common/search-input";
// // // // // // import { FilterDialog } from "./_components/FilterDialog";
// // // // // // import { AddBedDialog } from "./_components/AddBedDialog";
// // // // // // import NewButton from "@/components/common/new-button";

// // // // // // interface Bed {
// // // // // //   id: number;
// // // // // //   bedNo: string;
// // // // // //   bedType: string;
// // // // // //   ward: string;
// // // // // //   floor: string;
// // // // // //   status: "Active" | "Inactive";
// // // // // //   createdOn: string;
// // // // // //   addedBy: string;
// // // // // // }

// // // // // // export default function BedsPage() {
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [beds, setBeds] = useState<Bed[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// // // // // //   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
// // // // // //   const router = useRouter();
// // // // // //   const [addMode, setAddMode] = useState<
// // // // // //     "bed" | "bedType" | "ward" | "floor" | null
// // // // // //   >("bed");

// // // // // //   const addOptions = [
// // // // // //     { key: "bed", title: "Bed", value: "bed" },
// // // // // //     { key: "bedType", title: "Bed type", value: "bedType" },
// // // // // //     { key: "ward", title: "Ward", value: "ward" },
// // // // // //     { key: "floor", title: "Floor", value: "floor" },
// // // // // //   ];

// // // // // //   // Simulated API call
// // // // // //   useEffect(() => {
// // // // // //     setLoading(true);
// // // // // //     const timer = setTimeout(() => {
// // // // // //       setBeds([
// // // // // //         {
// // // // // //           id: 1,
// // // // // //           bedNo: "101",
// // // // // //           bedType: "ICU",
// // // // // //           ward: "General Ward",
// // // // // //           floor: "Ground Floor",
// // // // // //           status: "Active",
// // // // // //           createdOn: "2025-09-27 19:30",
// // // // // //           addedBy: "Dr. Ahmed Al-Mansouri",
// // // // // //         },
// // // // // //         {
// // // // // //           id: 2,
// // // // // //           bedNo: "G-11",
// // // // // //           bedType: "VIP",
// // // // // //           ward: "VIP",
// // // // // //           floor: "1st Floor",
// // // // // //           status: "Inactive",
// // // // // //           createdOn: "2025-09-27 19:30",
// // // // // //           addedBy: "Dr. Ahmed Al-Mansouri",
// // // // // //         },
// // // // // //         {
// // // // // //           id: 3,
// // // // // //           bedNo: "G-12",
// // // // // //           bedType: "VIP",
// // // // // //           ward: "VIP",
// // // // // //           floor: "VIP",
// // // // // //           status: "Active",
// // // // // //           createdOn: "2025-09-27 19:30",
// // // // // //           addedBy: "Dr. Ahmed Al-Mansouri",
// // // // // //         },
// // // // // //       ]);
// // // // // //       setLoading(false);
// // // // // //     }, 1000);

// // // // // //     return () => clearTimeout(timer);
// // // // // //   }, []);

// // // // // //   // ✅ Table Columns
// // // // // //   const columns = [
// // // // // //     {
// // // // // //       key: "id",
// // // // // //       label: "Sr.No",
// // // // // //       render: (row: Bed) => row.id,
// // // // // //       className: "w-[60px] text-center",
// // // // // //     },
// // // // // //     {
// // // // // //       key: "bedNo",
// // // // // //       label: "Bed No",
// // // // // //       render: (row: Bed) => (
// // // // // //         <span className="font-medium text-gray-700">{row.bedNo}</span>
// // // // // //       ),
// // // // // //     },
// // // // // //     {
// // // // // //       key: "bedType",
// // // // // //       label: "Bed Type",
// // // // // //       render: (row: Bed) => row.bedType,
// // // // // //     },
// // // // // //     {
// // // // // //       key: "ward",
// // // // // //       label: "Ward",
// // // // // //       render: (row: Bed) => row.ward,
// // // // // //     },
// // // // // //     {
// // // // // //       key: "floor",
// // // // // //       label: "Floor",
// // // // // //       render: (row: Bed) => row.floor,
// // // // // //     },
// // // // // //     {
// // // // // //       key: "status",
// // // // // //       label: "Status",
// // // // // //       render: (row: Bed) => (
// // // // // //         <span
// // // // // //           className={`font-semibold ${row.status === "Active" ? "text-green-500" : "text-red-500"
// // // // // //             }`}
// // // // // //         >
// // // // // //           {row.status}
// // // // // //         </span>
// // // // // //       ),
// // // // // //     },
// // // // // //     {
// // // // // //       key: "createdOn",
// // // // // //       label: "Created On",
// // // // // //       render: (row: Bed) => (
// // // // // //         <span className="text-gray-600">{row.createdOn}</span>
// // // // // //       ),
// // // // // //     },
// // // // // //     {
// // // // // //       key: "addedBy",
// // // // // //       label: "Added By",
// // // // // //       render: (row: Bed) => (
// // // // // //         <span className="text-gray-700">{row.addedBy}</span>
// // // // // //       ),
// // // // // //     },
// // // // // //     {
// // // // // //       key: "action",
// // // // // //       label: "Action",
// // // // // //       render: (row: Bed) => (
// // // // // //         <RowActionMenu
// // // // // //           onEdit={() => console.log("Edit", row.bedNo)}
// // // // // //           onDelete={() => console.log("Delete", row.bedNo)}
// // // // // //         />
// // // // // //       ),
// // // // // //       className: "text-center w-[80px]",
// // // // // //     },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <main className="min-h-svh w-full">
// // // // // //       <Header />

// // // // // //       <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
// // // // // //         {/* Title & Back */}
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <Button
// // // // // //             variant="ghost"
// // // // // //             className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
// // // // // //             onClick={() => router.back()}
// // // // // //           >
// // // // // //             <MoveLeft className="w-5 h-5" />
// // // // // //           </Button>
// // // // // //           <h1 className="text-xl font-semibold text-gray-800">
// // // // // //             Units / Wards / Beds
// // // // // //           </h1>
// // // // // //         </div>

// // // // // //         {/* Card */}
// // // // // //         <div className="space-y-4 bg-white p-5 rounded-md shadow-sm">
// // // // // //           {/* Header Actions */}
// // // // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // // // // //             <div className="flex flex-wrap gap-2">
// // // // // //               {addOptions.map((opt) => (
// // // // // //                 <Button
// // // // // //                   key={opt.key}
// // // // // //                   type="button"
// // // // // //                   onClick={() => { setAddMode(opt.value as any); }}
// // // // // //                   // onClick={() => { setAddMode(opt.value as any); setIsAddDialogOpen(true); }}
// // // // // //                   className={`px-3 py-1 rounded-full text-sm bg-white border border-gray-200  text-gray-600 hover:bg-blue-100 hover:text-gray-700 flex items-center gap-2 cursor-pointer ${addMode ===opt.value && " bg-blue-600 hover:bg-blue-600 text-white hover:text-white" }`}
// // // // // //                 >
// // // // // //                   {opt.title}
// // // // // //                 </Button>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <Button
// // // // // //                 onClick={() => setIsFilterDialogOpen(true)}
// // // // // //                 variant="outline"
// // // // // //                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
// // // // // //               >
// // // // // //                 Filter
// // // // // //                 <SlidersHorizontal className="w-5 h-5" />
// // // // // //               </Button>

// // // // // //               <SearchInput
// // // // // //                 value={search}
// // // // // //                 onChange={setSearch}
// // // // // //                 placeholder="Search beds..."
// // // // // //               />

// // // // // //               <QuickActionsMenu />

// // // // // //               {/* <Button
// // // // // //                 onClick={() => setIsAddDialogOpen(true)}
// // // // // //                 className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2 pr-0 rounded-[5.6rem]"
// // // // // //               >
// // // // // //                 Add New
// // // // // //                 <span className="p-2 bg-green-600 rounded-full"><Plus className="text-green-600 w-4 h-4 bg-white rounded-full" /></span>
// // // // // //               </Button> */}
// // // // // //               <NewButton handleClick={() => setIsAddDialogOpen(true)} className="cursor-pointer"/>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Table */}
// // // // // //           <div className="mt-2">

// // // // // //             <DataTable columns={columns} data={beds} loading={loading} striped />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Add Bed Drawer */}
// // // // // //       <AddBedDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

// // // // // //       {/* Filter Drawer */}
// // // // // //       <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} />
// // // // // //     </main>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { Button } from "@workspace/ui/components/button";
// // // // // import { MoveLeft, SlidersHorizontal } from "lucide-react";
// // // // // import { Header } from "@/components/header";
// // // // // import { DataTable } from "@/components/common/data-table";
// // // // // import { QuickActions } from "./_components/QuickActions";
// // // // // import { RowActionMenu } from "./_components/RowActionMenu";
// // // // // import { FilterDialog } from "./_components/FilterDialog";
// // // // // import { AddDialog } from "./_components/AddDialog";
// // // // // import SearchInput from "@/components/common/search-input";
// // // // // import NewButton from "@/components/common/new-button";
// // // // // import { getMockData } from "./_components/api";
// // // // // import { AddBedDialog } from "./_components/AddBedDialog";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { PageHeader } from "@/components/common/PageHeader";
// // // // // import FilterButton from "@/components/common/filter-button";
// // // // // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // // // // import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";

// // // // // const UnitsWardsBedsSection = [
// // // // //   { key: "bed", label: "Bed" },
// // // // //   { key: "bedType", label: "Bed Type" },
// // // // //   { key: "ward", label: "Ward" },
// // // // //   { key: "floor", label: "Floor" },
// // // // // ];

// // // // // export default function BedsPage() {
// // // // //   const router = useRouter();
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [data, setData] = useState<any[]>([]);
// // // // //   const [addMode, setAddMode] = useState<"bed" | "bedType" | "ward" | "floor">("bed");
// // // // //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// // // // //   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
// // // // //   const [filters, setFilters] = useState<any>({});

// // // // //   // Simulated API data fetching
// // // // //   useEffect(() => {
// // // // //     setLoading(true);
// // // // //     const timer = setTimeout(() => {
// // // // //       setData(getMockData(addMode));
// // // // //       setLoading(false);
// // // // //     }, 800);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [addMode]);

// // // // //   // Columns change slightly based on mode
// // // // //   const getColumns = () => {
// // // // //     if (addMode === "bed") {
// // // // //       return [
// // // // //         { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
// // // // //         { key: "bedNo", label: "Bed No", render: (row: any) => row.bedNo },
// // // // //         { key: "bedType", label: "Bed Type", render: (row: any) => row.bedType },
// // // // //         { key: "ward", label: "Ward", render: (row: any) => row.ward },
// // // // //         { key: "floor", label: "Floor", render: (row: any) => row.floor },
// // // // //         { key: "status", label: "Status", render: (row: any) => <span className={row.status === "Active" ? "text-green-500" : "text-red-500"}>{row.status}</span> },
// // // // //         { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
// // // // //         { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
// // // // //         { key: "action", label: "Action", render: (row: any) => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />, className: "text-center w-[80px]" },
// // // // //       ];
// // // // //     }

// // // // //     return [
// // // // //       { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
// // // // //       { key: "name", label: addMode === "floor" ? "Floor" : addMode === "ward" ? "Ward" : "Bed Type", render: (row: any) => row.name },
// // // // //       { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
// // // // //       { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
// // // // //       { key: "action", label: "Action", render: (row: any) => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />, className: "text-center w-[80px]" },
// // // // //     ];
// // // // //   };

// // // // //   return (
// // // // //     <>

// // // // //       <div className="p-5 space-y-8">
// // // // //         {/* Title + Back */}
// // // // //         {/* <div className="flex items-center gap-3">
// // // // //           <Button
// // // // //             variant="ghost"
// // // // //             className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
// // // // //             onClick={() => router.back()}
// // // // //           >
// // // // //             <MoveLeft className="w-5 h-5" />
// // // // //           </Button>
// // // // //           <h1 className="text-xl font-semibold text-gray-800">Units / Wards / Beds</h1>
// // // // //         </div> */}
// // // // //         <PageHeader title="Units / Wards / Beds" />

// // // // //         {/* Main Card */}
// // // // //         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
// // // // //           {/* Tabs + Actions */}
// // // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // // // //             {/* Tabs */}
// // // // //             <div className="flex flex-wrap gap-2">
// // // // //               {/* {["bed", "bedType", "ward", "floor"].map((mode) => (
// // // // //                 <Button
// // // // //                   key={mode}
// // // // //                   type="button"
// // // // //                   onClick={() => setAddMode(mode as any)}
// // // // //                   className={`px-3 py-1 rounded-full text-sm border border-gray-200 cursor-pointer ${addMode === mode ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white" : "bg-white text-gray-600 hover:bg-blue-100"
// // // // //                     }`}
// // // // //                 >
// // // // //                   {mode === "bed" ? "Bed" : mode === "bedType" ? "Bed Type" : mode === "ward" ? "Ward" : "Floor"}
// // // // //                 </Button>
// // // // //               ))} */}
// // // // //               <DynamicTabs
// // // // //                 tabs={UnitsWardsBedsSection}
// // // // //                 defaultTab="bed"
// // // // //                 onChange={(tabKey) => setAddMode(tabKey as any)}
// // // // //               />
// // // // //             </div>

// // // // //             {/* Right Actions */}
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* <Button
// // // // //                 onClick={() => setIsFilterDialogOpen(true)}
// // // // //                 variant="outline"
// // // // //                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
// // // // //               >
// // // // //                 Filter
// // // // //                 <SlidersHorizontal className="w-5 h-5" />
// // // // //               </Button> */}
// // // // //               <FilterButton onClick={() => setIsFilterDialogOpen(true)} />

// // // // //               <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
// // // // //               <QuickActions />

// // // // //               <NewButton handleClick={() => setIsAddDialogOpen(true)} className="cursor-pointer" />
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Table */}
// // // // //           <ResponsiveDataTable columns={getColumns()} data={data} loading={loading} striped />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Dialogs */}
// // // // //       {addMode === "bed" ? (
// // // // //         <AddBedDialog
// // // // //           open={isAddDialogOpen}
// // // // //           onClose={() => setIsAddDialogOpen(false)}
// // // // //         />
// // // // //       ) : (
// // // // //         <AddDialog
// // // // //           open={isAddDialogOpen}
// // // // //           onClose={() => setIsAddDialogOpen(false)}
// // // // //           mode={addMode}
// // // // //         />
// // // // //       )}
// // // // //       {/* <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} /> */}
// // // // //       <FilterDialog
// // // // //         open={isFilterDialogOpen}
// // // // //         onClose={() => setIsFilterDialogOpen(false)}
// // // // //         mode={addMode}
// // // // //         onApply={(values) => setFilters(values)}
// // // // //         isLoading={false}
// // // // //       />
// // // // //     </>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { PageHeader } from "@/components/common/PageHeader";
// // // // import SearchInput from "@/components/common/search-input";
// // // // import { QuickActions } from "./_components/QuickActions";
// // // // import { RowActionMenu } from "./_components/RowActionMenu";
// // // // import FilterButton from "@/components/common/filter-button";
// // // // import NewButton from "@/components/common/new-button";
// // // // import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// // // // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // // // import { FilterDialog } from "./_components/FilterDialog";
// // // // import { AddBedDialog } from "./_components/AddBedDialog";
// // // // import { AddDialog } from "./_components/AddDialog";
// // // // import { AddFloorDialog } from "./_components/AddFloorDialog"; // <-- dedicated floor dialog

// // // // // API
// // // // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // // // import { toast } from "@workspace/ui/lib/sonner";

// // // // // Dummy API
// // // // import { getMockData } from "./_components/api";
// // // // import { createFloorApiClient } from "@/lib/api/administration/floors";

// // // // const UnitsWardsBedsSection = [
// // // //   { key: "bed", label: "Bed" },
// // // //   { key: "bedType", label: "Bed Type" },
// // // //   { key: "ward", label: "Ward" },
// // // //   { key: "floor", label: "Floor" },
// // // // ];

// // // // export default function BedsPage() {
// // // //   const queryClient = useQueryClient();
// // // //   const api = createFloorApiClient({});

// // // //   const [search, setSearch] = useState("");
// // // //   const [addMode, setAddMode] = useState<"bed" | "bedType" | "ward" | "floor">("bed");
// // // //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// // // //   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

// // // //   /* -----------------------------
// // // //         FETCH FLOORS
// // // //   ------------------------------ */
// // // //   const { data: floors, isLoading: isFloorLoading } = useQuery({
// // // //     queryKey: ["floors"],
// // // //     enabled: addMode === "floors",
// // // //     queryFn: async () => {
// // // //       const res = await api.getFloors();
// // // //       return res.data.data;
// // // //     },
// // // //   });

// // // //   /* -----------------------------
// // // //         CREATE FLOOR
// // // //   ------------------------------ */
// // // //   const createFloorMutation = useMutation({
// // // //     mutationFn: async (values: any) =>
// // // //       api.createFloor({
// // // //         floor_name: values.floor_name,
// // // //         status: values.status ? "active" : "inactive",
// // // //       }),
// // // //     onSuccess: () => {
// // // //       toast.success("Floor created successfully");
// // // //       queryClient.invalidateQueries(["floors"]);
// // // //     },
// // // //     onError: (err: any) => toast.error(err.message),
// // // //   });

// // // //   /* -----------------------------
// // // //         DELETE FLOOR
// // // //   ------------------------------ */
// // // //   const deleteFloorMutation = useMutation({
// // // //     mutationFn: async (id: string) => api.deleteFloor(id),
// // // //     onSuccess: () => {
// // // //       toast.success("Floor deleted");
// // // //       queryClient.invalidateQueries(["floors"]);
// // // //     },
// // // //     onError: (err: any) => toast.error(err.message),
// // // //   });

// // // //   /* -----------------------------
// // // //         TABLE COLUMNS
// // // //   ------------------------------ */
// // // //   const getColumns = () => {
// // // //     if (addMode === "bed") {
// // // //       return [
// // // //         { key: "id", label: "Sr.No", render: (row: any) => row.id, className: "w-[60px] text-center" },
// // // //         { key: "bedNo", label: "Bed No", render: (row: any) => row.bedNo },
// // // //         { key: "bedType", label: "Bed Type", render: (row: any) => row.bedType },
// // // //         { key: "ward", label: "Ward", render: (row: any) => row.ward },
// // // //         { key: "floor", label: "Floor", render: (row: any) => row.floor },
// // // //         {
// // // //           key: "status",
// // // //           label: "Status",
// // // //           render: (row: any) => (
// // // //             <span className={row.status === "Active" ? "text-green-500" : "text-red-500"}>
// // // //               {row.status}
// // // //             </span>
// // // //           ),
// // // //         },
// // // //         { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
// // // //         { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
// // // //         {
// // // //           key: "action",
// // // //           label: "Action",
// // // //           render: (row: any) => <RowActionMenu onEdit={() => {}} onDelete={() => {}} />,
// // // //           className: "text-center w-[80px]",
// // // //         },
// // // //       ];
// // // //     }

// // // //     if (addMode === "floor") {
// // // //       return [
// // // //         { key: "id", label: "ID", render: (row: any) => row.id },
// // // //         { key: "floor_name", label: "Floor Name", render: (row: any) => row.floor_name },
// // // //         {
// // // //           key: "status",
// // // //           label: "Status",
// // // //           render: (row: any) => (
// // // //             <span className={row.status === "active" ? "text-green-500" : "text-red-500"}>
// // // //               {row.status}
// // // //             </span>
// // // //           ),
// // // //         },
// // // //         { key: "created_at", label: "Created On", render: (row: any) => row.created_at },
// // // //         {
// // // //           key: "action",
// // // //           label: "Action",
// // // //           render: (row: any) => (
// // // //             <RowActionMenu
// // // //               onEdit={() => {}}
// // // //               onDelete={() => deleteFloorMutation.mutate(row.id)}
// // // //             />
// // // //           ),
// // // //         },
// // // //       ];
// // // //     }

// // // //     // bedType & ward (mock for now)
// // // //     return [
// // // //       { key: "id", label: "Sr.No", render: (row: any) => row.id },
// // // //       { key: "name", label: addMode === "ward" ? "Ward" : "Bed Type", render: (row: any) => row.name },
// // // //       { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
// // // //       { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
// // // //       {
// // // //         key: "action",
// // // //         label: "Action",
// // // //         render: (row: any) => <RowActionMenu onEdit={() => {}} onDelete={() => {}} />,
// // // //       },
// // // //     ];
// // // //   };

// // // //   /* -----------------------------
// // // //         DETERMINE TABLE DATA
// // // //   ------------------------------ */
// // // //   const tableData =
// // // //     addMode === "floor"
// // // //       ? floors || []
// // // //       : getMockData(addMode).filter((item) =>
// // // //           search ? item.name?.toLowerCase().includes(search.toLowerCase()) : true
// // // //         );

// // // //   const tableLoading = addMode === "floor" ? isFloorLoading : false;

// // // //   return (
// // // //     <>
// // // //       <div className="p-5 space-y-8">
// // // //         <PageHeader title="Units / Wards / Beds" />

// // // //         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">

// // // //           {/* Tabs + Actions */}
// // // //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // // //             <DynamicTabs
// // // //               tabs={UnitsWardsBedsSection}
// // // //               defaultTab="bed"
// // // //               onChange={(tabKey) => setAddMode(tabKey as any)}
// // // //             />

// // // //             <div className="flex items-center gap-3">
// // // //               <FilterButton onClick={() => setIsFilterDialogOpen(true)} />
// // // //               <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
// // // //               <QuickActions />
// // // //               <NewButton handleClick={() => setIsAddDialogOpen(true)} />
// // // //             </div>
// // // //           </div>

// // // //           {/* Table */}
// // // //           <ResponsiveDataTable
// // // //             columns={getColumns()}
// // // //             data={tableData}
// // // //             loading={tableLoading}
// // // //             striped
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* Dialogs */}
// // // //       {addMode === "bed" ? (
// // // //         <AddBedDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
// // // //       ) : addMode === "floor" ? (
// // // //         <AddFloorDialog
// // // //           open={isAddDialogOpen}
// // // //           onClose={() => setIsAddDialogOpen(false)}
// // // //           onSave={(values) => createFloorMutation.mutate(values)}
// // // //         />
// // // //       ) : (
// // // //         <AddDialog
// // // //           open={isAddDialogOpen}
// // // //           onClose={() => setIsAddDialogOpen(false)}
// // // //           mode={addMode}
// // // //         />
// // // //       )}

// // // //       <FilterDialog
// // // //         open={isFilterDialogOpen}
// // // //         onClose={() => setIsFilterDialogOpen(false)}
// // // //         mode={addMode}
// // // //         onApply={() => {}}
// // // //         isLoading={false}
// // // //       />
// // // //     </>
// // // //   );
// // // // }

// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { PageHeader } from "@/components/common/PageHeader";
// // // import SearchInput from "@/components/common/search-input";
// // // import { QuickActions } from "./_components/QuickActions";
// // // import { RowActionMenu } from "./_components/RowActionMenu";
// // // import FilterButton from "@/components/common/filter-button";
// // // import NewButton from "@/components/common/new-button";
// // // import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// // // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // // import { FilterDialog } from "./_components/FilterDialog";
// // // import { AddBedDialog } from "./_components/AddBedDialog";
// // // import { AddFloorDialog } from "./_components/AddFloorDialog";
// // // import { AddBedTypeDialog } from "./_components/AddBedTypeDialog";
// // // import { AddWardTypeDialog } from "./_components/AddWardTypeDialog";

// // // // API clients
// // // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // // import { createFloorApiClient } from "@/lib/api/administration/floors";
// // // import { createBedTypeApiClient } from "@/lib/api/administration/bedTypes";
// // // import { createWardTypeApiClient } from "@/lib/api/administration/wardTypes";

// // // import { toast } from "@workspace/ui/lib/sonner";
// // // import { getMockData } from "./_components/api";
// // // import { PaginationControls } from "@/components/common/data-table/PaginationControls";
// // // import { format } from "@workspace/ui/hooks/use-date-fns";

// // // const Tabs = [
// // //   { key: "bed", label: "Bed" },
// // //   { key: "bedType", label: "Bed Type" },
// // //   { key: "wardType", label: "Ward Type" },
// // //   { key: "floor", label: "Floor" },
// // // ];

// // // const formatDate = (d: string) =>
// // //   d ? format(new Date(d), "dd MMM yyyy, hh:mm a") : "—";

// // // export default function UnitsWardsBedsPage() {
// // //   const queryClient = useQueryClient();

// // //   const floorApi = createFloorApiClient({});
// // //   const bedTypeApi = createBedTypeApiClient({});
// // //   const wardTypeApi = createWardTypeApiClient({});

// // //   const [addMode, setAddMode] = useState("bed");
// // //   const [search, setSearch] = useState("");

// // //   const [page, setPage] = useState(1);
// // //   const limit = 10;

// // //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// // //   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

// // //   /* ---------------------------------------
// // //       FETCH FLOOR PAGINATION
// // //   ---------------------------------------- */
// // //   const { data: floors, isLoading: floorsLoading } = useQuery({
// // //     queryKey: ["floors", page, search],
// // //     enabled: addMode === "floor",
// // //     queryFn: async () => {
// // //       const res = await floorApi.getFloors({
// // //         page,
// // //         limit,
// // //         search,
// // //       });
// // //       return res.data;
// // //     },
// // //   });

// // //   /* ---------------------------------------
// // //       FETCH BED TYPE PAGINATION
// // //   ---------------------------------------- */
// // //   const { data: bedTypes, isLoading: bedTypeLoading } = useQuery({
// // //     queryKey: ["bedTypes", page, search],
// // //     enabled: addMode === "bedType",
// // //     queryFn: async () => {
// // //       const res = await bedTypeApi.getBedTypes({
// // //         page,
// // //         limit,
// // //         search,
// // //       });
// // //       return res.data;
// // //     },
// // //   });

// // //   /* ---------------------------------------
// // //       FETCH WARD TYPE PAGINATION
// // //   ---------------------------------------- */
// // //   const { data: wardTypes, isLoading: wardTypeLoading } = useQuery({
// // //     queryKey: ["wardTypes", page, search],
// // //     enabled: addMode === "wardType",
// // //     queryFn: async () => {
// // //       const res = await wardTypeApi.getWardTypes({
// // //         page,
// // //         limit,
// // //         search,
// // //       });
// // //       return res.data;
// // //     },
// // //   });

// // //   /* ---------------------------------------
// // //           CREATE Mutations
// // //   ---------------------------------------- */
// // //   const createFloorMutation = useMutation({
// // //     mutationFn: (values) =>
// // //       floorApi.createFloor({
// // //         floor_name: values.floor_name,
// // //         status: values.active ? "active" : "inactive",
// // //       }),
// // //     onSuccess: () => {
// // //       toast.success("Floor created");
// // //       queryClient.invalidateQueries(["floors"]);
// // //     },
// // //   });

// // //   const createBedTypeMutation = useMutation({
// // //     mutationFn: (values) =>
// // //       bedTypeApi.createBedType({
// // //         name: values.name,
// // //         status: values.active ? "active" : "inactive",
// // //       }),
// // //     onSuccess: () => {
// // //       toast.success("Bed Type created");
// // //       queryClient.invalidateQueries(["bedTypes"]);
// // //     },
// // //   });

// // //   const createWardTypeMutation = useMutation({
// // //     mutationFn: (values) =>
// // //       wardTypeApi.createWardType({
// // //         name: values.name,
// // //         status: values.active ? "active" : "inactive",
// // //       }),
// // //     onSuccess: () => {
// // //       toast.success("Ward Type created");
// // //       queryClient.invalidateQueries(["wardTypes"]);
// // //     },
// // //   });

// // //   /* ---------------------------------------
// // //           DELETE Mutations
// // //   ---------------------------------------- */
// // //   const deleteFloorMutation = useMutation({
// // //     mutationFn: (id: string) => floorApi.deleteFloor(id),
// // //     onSuccess: () => {
// // //       toast.success("Floor deleted");
// // //       queryClient.invalidateQueries(["floors"]);
// // //     },
// // //   });

// // //   /* ---------------------------------------
// // //           DETERMINE TABLE DATA
// // //   ---------------------------------------- */
// // //   const tableData =
// // //     addMode === "floor"
// // //       ? floors?.data || []
// // //       : addMode === "bedType"
// // //         ? bedTypes?.data || []
// // //         : addMode === "wardType"
// // //           ? wardTypes?.data || []
// // //           : getMockData("bed");

// // //   const loading =
// // //     addMode === "floor"
// // //       ? floorsLoading
// // //       : addMode === "bedType"
// // //         ? bedTypeLoading
// // //         : addMode === "wardType"
// // //           ? wardTypeLoading
// // //           : false;

// // //   /* ---------------------------------------
// // //           COLUMNS
// // //   ---------------------------------------- */
// // //   const columns =
// // //     addMode === "floor"
// // //       ? [
// // //         { key: "id", label: "ID", render: (r) => r.id },
// // //         { key: "floor_name", label: "Floor Name", render: (r) => r.floor_name },
// // //         {
// // //           key: "status",
// // //           label: "Status",
// // //           render: (r) => (
// // //             <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
// // //               {r.status}
// // //             </span>
// // //           ),
// // //         },
// // //         { key: "created_at", label: "Created On", render: (r) => formatDate(r.created_at) },
// // //         {
// // //           key: "action",
// // //           label: "Action",
// // //           render: (r) => (
// // //             <RowActionMenu
// // //               onEdit={() => { }}
// // //               onDelete={() => deleteFloorMutation.mutate(r.id)}
// // //             />
// // //           ),
// // //         },
// // //       ]
// // //       : [
// // //         { key: "id", label: "ID", render: (r) => r.id },
// // //         { key: "name", label: addMode === "wardType" ? "Ward" : "Bed Type", render: (r) => r.name },
// // //         {
// // //           key: "status",
// // //           label: "Status",
// // //           render: (r) => (
// // //             <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
// // //               {r.status}
// // //             </span>
// // //           ),
// // //         },
// // //         { key: "created_at", label: "Created On", render: (r) => formatDate(r.created_at) },
// // //         {
// // //           key: "action",
// // //           label: "Action",
// // //           render: () => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />,
// // //         },
// // //       ];

// // //   /* ---------------------------------------
// // //           TOTAL PAGES
// // //   ---------------------------------------- */
// // //   const totalPages =
// // //     addMode === "floor"
// // //       ? floors?.pagination?.totalPages || 1
// // //       : addMode === "bedType"
// // //         ? bedTypes?.pagination?.totalPages || 1
// // //         : addMode === "wardType"
// // //           ? wardTypes?.pagination?.totalPages || 1
// // //           : 1;

// // //   return (
// // //     <>
// // //       <div className="p-5 space-y-8">
// // //         <PageHeader title="Units / Wards / Beds" />

// // //         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">

// // //           {/* Tabs + Actions */}
// // //           <div className="flex flex-col md:flex-row justify-between gap-4">
// // //             <DynamicTabs tabs={Tabs} defaultTab="bed" onChange={(key) => setAddMode(key)} />

// // //             <div className="flex gap-3">
// // //               <FilterButton onClick={() => setIsFilterDialogOpen(true)} />
// // //               <SearchInput value={search} onChange={setSearch} />
// // //               <QuickActions />
// // //               <NewButton handleClick={() => setIsAddDialogOpen(true)} />
// // //             </div>
// // //           </div>

// // //           {/* TABLE */}
// // //           <ResponsiveDataTable
// // //             columns={columns}
// // //             data={tableData}
// // //             loading={loading}
// // //             striped
// // //           />

// // //           {/* PAGINATION */}
// // //           {(addMode === "floor" || addMode === "bedType" || addMode === "wardType") && (
// // //             <PaginationControls
// // //               page={page}
// // //               totalPages={totalPages}
// // //               onPageChange={setPage}
// // //             />
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ADD DIALOG SWITCH */}
// // //       {addMode === "bed" && (
// // //         <AddBedDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
// // //       )}

// // //       {addMode === "floor" && (
// // //         <AddFloorDialog
// // //           open={isAddDialogOpen}
// // //           onClose={() => setIsAddDialogOpen(false)}
// // //           onSave={(v) => createFloorMutation.mutate(v)}
// // //         />
// // //       )}

// // //       {addMode === "bedType" && (
// // //         <AddBedTypeDialog
// // //           open={isAddDialogOpen}
// // //           onClose={() => setIsAddDialogOpen(false)}
// // //           onSave={(v) => createBedTypeMutation.mutate(v)}
// // //         />
// // //       )}

// // //       {addMode === "wardType" && (
// // //         <AddWardTypeDialog
// // //           open={isAddDialogOpen}
// // //           onClose={() => setIsAddDialogOpen(false)}
// // //           onSave={(v) => createWardTypeMutation.mutate(v)}
// // //         />
// // //       )}

// // //       <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} mode={addMode} />
// // //     </>
// // //   );
// // // }

// // "use client";

// // import { useState } from "react";
// // import { PageHeader } from "@/components/common/PageHeader";
// // import SearchInput from "@/components/common/search-input";
// // import { QuickActions } from "./_components/QuickActions";
// // import { RowActionMenu } from "./_components/RowActionMenu";
// // import FilterButton from "@/components/common/filter-button";
// // import NewButton from "@/components/common/new-button";
// // import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // import { FilterDialog } from "./_components/FilterDialog";
// // import { AddFloorDialog } from "./_components/AddFloorDialog";
// // import { AddBedTypeDialog } from "./_components/AddBedTypeDialog";
// // import { AddWardTypeDialog } from "./_components/AddWardTypeDialog";
// // import { AddWardDialog } from "./_components/AddWardDialog";

// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { createFloorApiClient } from "@/lib/api/administration/floors";
// // import { createBedTypeApiClient } from "@/lib/api/administration/bedTypes";
// // import { createWardTypeApiClient } from "@/lib/api/administration/wardTypes";
// // import { createWardApiClient } from "@/lib/api/administration/wards";

// // import { PaginationControls } from "@/components/common/data-table/PaginationControls";
// // import { toast } from "@workspace/ui/lib/sonner";
// // import { format } from "@workspace/ui/hooks/use-date-fns";

// // /* ---------------------------------------
// //       TABS
// // ---------------------------------------- */
// // const Tabs = [
// //   { key: "ward", label: "Ward" },
// //   { key: "bedType", label: "Bed Type" },
// //   { key: "wardType", label: "Ward Type" },
// //   { key: "floor", label: "Floor" },
// // ];

// // const formatDate = (d: string) =>
// //   d ? format(new Date(d), "dd MMM yyyy, hh:mm a") : "—";

// // export default function UnitsWardsBedsPage() {
// //   const queryClient = useQueryClient();

// //   const floorApi = createFloorApiClient({});
// //   const bedTypeApi = createBedTypeApiClient({});
// //   const wardTypeApi = createWardTypeApiClient({});
// //   const wardApi = createWardApiClient({});

// //   const [addMode, setAddMode] = useState("ward");
// //   const [search, setSearch] = useState("");

// //   const [page, setPage] = useState(1);
// //   const limit = 10;

// //   const [filters, setFilters] = useState({});

// //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// //   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

// //   /* ---------------------------------------
// //       FETCH FLOORS
// //   ---------------------------------------- */
// //   const { data: floors } = useQuery({
// //     queryKey: ["floors-list"],
// //     queryFn: async () => {
// //       const res = await floorApi.getFloors({ page: 1, limit: 100 });
// //       return res.data?.data || [];
// //     },
// //   });

// //   /* ---------------------------------------
// //       FETCH WARD TYPES
// //   ---------------------------------------- */
// //   const { data: wardTypesList } = useQuery({
// //     queryKey: ["wardTypes-list"],
// //     queryFn: async () => {
// //       const res = await wardTypeApi.getWardTypes({ page: 1, limit: 100 });
// //       return res.data?.data || [];
// //     },
// //   });

// //   /* ---------------------------------------
// //       FETCH Ward PAGINATION
// //   ---------------------------------------- */
// //   const { data: wards, isLoading: wardLoading } = useQuery({
// //     queryKey: ["wards", page, search],
// //     enabled: addMode === "ward",
// //     queryFn: async () =>
// //       (await wardApi.getWards({ page, limit, search })).data,
// //   });

// //   /* ---------------------------------------
// //       FETCH BED TYPE PAGINATION
// //   ---------------------------------------- */
// //   const { data: bedTypes, isLoading: bedTypeLoading } = useQuery({
// //     queryKey: ["bedTypes", page, search],
// //     enabled: addMode === "bedType",
// //     queryFn: async () =>
// //       (await bedTypeApi.getBedTypes({ page, limit, search })).data,
// //   });

// //   /* ---------------------------------------
// //       FETCH WARD TYPE PAGINATION
// //   ---------------------------------------- */
// //   const { data: wardTypes, isLoading: wardTypeLoading } = useQuery({
// //     queryKey: ["wardTypes", page, search],
// //     enabled: addMode === "wardType",
// //     queryFn: async () =>
// //       (await wardTypeApi.getWardTypes({ page, limit, search })).data,
// //   });

// //   /* ---------------------------------------
// //       CREATE Ward
// //   ---------------------------------------- */
// //   const createWardMutation = useMutation({
// //     mutationFn: (v: any) =>
// //       wardApi.createWard({
// //         ward_number: v.ward_number,
// //         ward_type_id: v.ward_type_id,
// //         floor_id: v.floor_id,
// //         status: v.active ? "active" : "inactive",
// //       }),
// //     onSuccess: () => {
// //       toast.success("Ward created");
// //       queryClient.invalidateQueries(["wards"]);
// //     },
// //   });

// //   /* ---------------------------------------
// //       DELETE Ward
// //   ---------------------------------------- */
// //   const deleteWardMutation = useMutation({
// //     mutationFn: (id: string) => wardApi.deleteWard(id),
// //     onSuccess: () => {
// //       toast.success("Ward deleted");
// //       queryClient.invalidateQueries(["wards"]);
// //     },
// //   });

// //   /* ---------------------------------------
// //       FLOOR, BED TYPE, WARD TYPE CREATE
// //   ---------------------------------------- */
// //   const createFloorMutation = useMutation({
// //     mutationFn: (values: any) =>
// //       floorApi.createFloor({
// //         floor_name: values.floor_name,
// //         status: values.active ? "active" : "inactive",
// //       }),
// //     onSuccess: () => {
// //       toast.success("Floor created");
// //       queryClient.invalidateQueries(["floors"]);
// //     },
// //   });

// //   const createBedTypeMutation = useMutation({
// //     mutationFn: (values) =>
// //       bedTypeApi.createBedType({
// //         name: values.name,
// //         status: values.active ? "active" : "inactive",
// //       }),
// //     onSuccess: () => {
// //       toast.success("Bed Type created");
// //       queryClient.invalidateQueries(["bedTypes"]);
// //     },
// //   });

// //   const createWardTypeMutation = useMutation({
// //     mutationFn: (values) =>
// //       wardTypeApi.createWardType({
// //         name: values.name,
// //         status: values.active ? "active" : "inactive",
// //       }),
// //     onSuccess: () => {
// //       toast.success("Ward Type created");
// //       queryClient.invalidateQueries(["wardTypes"]);
// //     },
// //   });

// //   /* ---------------------------------------
// //       TABLE DATA
// //   ---------------------------------------- */
// //   const tableData =
// //     addMode === "ward"
// //       ? wards?.data || []
// //       : addMode === "bedType"
// //         ? bedTypes?.data || []
// //         : addMode === "wardType"
// //           ? wardTypes?.data || []
// //           : floors || [];

// //   const loading =
// //     addMode === "ward"
// //       ? wardLoading
// //       : addMode === "bedType"
// //         ? bedTypeLoading
// //         : addMode === "wardType"
// //           ? wardTypeLoading
// //           : false;

// //   /* ---------------------------------------
// //       COLUMNS
// //   ---------------------------------------- */
// //   const columns =
// //     addMode === "ward"
// //       ? [
// //         { key: "id", label: "ID", render: (r) => r.id },
// //         { key: "ward_number", label: "Ward Number", render: (r) => r.ward_number },
// //         {
// //           key: "ward_type_id",
// //           label: "Ward Type",
// //           render: (r) => r.ward_type?.name || "—",
// //         },
// //         {
// //           key: "floor_id",
// //           label: "Floor",
// //           render: (r) => r.floor?.floor_name || "—",
// //         },
// //         {
// //           key: "status",
// //           label: "Status",
// //           render: (r) => (
// //             <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
// //               {r.status}
// //             </span>
// //           ),
// //         },
// //         {
// //           key: "created_at",
// //           label: "Created On",
// //           render: (r) => formatDate(r.created_at),
// //         },
// //         {
// //           key: "action",
// //           label: "Action",
// //           render: (r) => (
// //             <RowActionMenu
// //               onEdit={() => { }}
// //               onDelete={() => deleteWardMutation.mutate(r.id)}
// //             />
// //           ),
// //         },
// //       ]
// //       : addMode === "bedType" || addMode === "wardType"
// //         ? [
// //           { key: "id", label: "ID", render: (r) => r.id },
// //           { key: "name", label: "Name", render: (r) => r.name },
// //           {
// //             key: "status",
// //             label: "Status",
// //             render: (r) => (
// //               <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
// //                 {r.status}
// //               </span>
// //             ),
// //           },
// //           {
// //             key: "created_at",
// //             label: "Created On",
// //             render: (r) => formatDate(r.created_at),
// //           },
// //           {
// //             key: "action",
// //             label: "Action",
// //             render: (r) => <RowActionMenu onEdit={() => { }} onDelete={() => { }} />,
// //           },
// //         ]
// //         : [
// //           { key: "id", label: "ID", render: (r) => r.id },
// //           { key: "floor_name", label: "Floor", render: (r) => r.floor_name },
// //           {
// //             key: "status",
// //             label: "Status",
// //             render: (r) => (
// //               <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
// //                 {r.status}
// //               </span>
// //             ),
// //           },
// //           {
// //             key: "created_at",
// //             label: "Created On",
// //             render: (r) => formatDate(r.created_at),
// //           },
// //         ];

// //   /* ---------------------------------------
// //       PAGINATION
// //   ---------------------------------------- */
// //   const totalPages =
// //     addMode === "ward"
// //       ? wards?.pagination?.totalPages || 1
// //       : addMode === "bedType"
// //         ? bedTypes?.pagination?.totalPages || 1
// //         : addMode === "wardType"
// //           ? wardTypes?.pagination?.totalPages || 1
// //           : 1;

// //   return (
// //     <>
// //       <div className="p-5 space-y-8">
// //         <PageHeader title="Units / Wards / Beds" />

// //         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
// //           {/* Tabs + Actions */}
// //           <div className="flex flex-col md:flex-row justify-between gap-4">
// //             <DynamicTabs tabs={Tabs} defaultTab="ward" onChange={(key) => setAddMode(key)} />

// //             <div className="flex gap-3">
// //               <FilterButton onClick={() => setIsFilterDialogOpen(true)} />
// //               <SearchInput value={search} onChange={setSearch} />
// //               <QuickActions />
// //               <NewButton handleClick={() => setIsAddDialogOpen(true)} />
// //             </div>
// //           </div>

// //           <ResponsiveDataTable columns={columns} data={tableData} loading={loading} striped />

// //           {(addMode === "ward" ||
// //             addMode === "bedType" ||
// //             addMode === "wardType") && (
// //               <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
// //             )}
// //         </div>
// //       </div>

// //       {/* ADD DIALOG SWITCH */}
// //       {addMode === "ward" && (
// //         <AddWardDialog
// //           open={isAddDialogOpen}
// //           onClose={() => setIsAddDialogOpen(false)}
// //           wardTypes={wardTypesList || []}
// //           floors={floors || []}
// //           onSave={(v) => createWardMutation.mutate(v)}
// //         />
// //       )}

// //       {addMode === "floor" && (
// //         <AddFloorDialog
// //           open={isAddDialogOpen}
// //           onClose={() => setIsAddDialogOpen(false)}
// //           onSave={(v) => createFloorMutation.mutate(v)}
// //         />
// //       )}

// //       {addMode === "bedType" && (
// //         <AddBedTypeDialog
// //           open={isAddDialogOpen}
// //           onClose={() => setIsAddDialogOpen(false)}
// //           onSave={(v) => createBedTypeMutation.mutate(v)}
// //         />
// //       )}

// //       {addMode === "wardType" && (
// //         <AddWardTypeDialog
// //           open={isAddDialogOpen}
// //           onClose={() => setIsAddDialogOpen(false)}
// //           onSave={(v) => createWardTypeMutation.mutate(v)}
// //         />
// //       )}

// //       {/* <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} mode={addMode} /> */}
// //       <FilterDialog
// //         open={isFilterDialogOpen}
// //         onClose={() => setIsFilterDialogOpen(false)}
// //         mode={addMode}
// //         onApply={(values) => {
// //           setFilters(values);
// //           setPage(1);
// //         }}
// //         isLoading={false}
// //         floors={floors?.data || []}
// //         wardTypes={wardTypes?.data || []}
// //       />

// //     </>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// import { PageHeader } from "@/components/common/PageHeader";
// import SearchInput from "@/components/common/search-input";
// import FilterButton from "@/components/common/filter-button";
// import NewButton from "@/components/common/new-button";
// import { QuickActions } from "./_components/QuickActions";
// import { RowActionMenu } from "./_components/RowActionMenu";
// import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
// import { PaginationControls } from "@/components/common/data-table/PaginationControls";
// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

// import { FilterDialog } from "./_components/FilterDialog";
// import { AddFloorDialog } from "./_components/AddFloorDialog";
// import { AddBedTypeDialog } from "./_components/AddBedTypeDialog";
// import { AddWardTypeDialog } from "./_components/AddWardTypeDialog";
// import { AddWardDialog } from "./_components/AddWardDialog";

// import { format } from "@workspace/ui/hooks/use-date-fns";
// import { toast } from "@workspace/ui/lib/sonner";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// // APIs
// import { createFloorApiClient } from "@/lib/api/administration/floors";
// import { createBedTypeApiClient } from "@/lib/api/administration/bedTypes";
// import { createWardTypeApiClient } from "@/lib/api/administration/wardTypes";
// import { createWardApiClient } from "@/lib/api/administration/wards";

// const Tabs = [
//   { key: "ward", label: "Ward" },
//   { key: "bedType", label: "Bed Type" },
//   { key: "wardType", label: "Ward Type" },
//   { key: "floor", label: "Floor" },
// ];

// const formatDate = (d?: string) =>
//   d ? format(new Date(d), "dd MMM yyyy, hh:mm a") : "—";

// export default function UnitsWardsBedsPage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const searchParams = useSearchParams();

//   /* ---------------------------------------
//           READ URL QUERY
//   ---------------------------------------- */
//   const initialTab = searchParams.get("tab") || "ward";
//   const initialPage = parseInt(searchParams.get("page") || "1");

//   const [addMode, setAddMode] = useState(initialTab);
//   const [page, setPage] = useState(initialPage);

//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState<any>({});

//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

//   const limit = 10;

//   const [editData, setEditData] = useState(null);
//   const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

//   /* ---------------------------------------
//          Filter Clearing
//    ---------------------------------------- */
//   const clearAllFilters = () => {
//     setFilters({})
//   }

//   /* ---------------------------------------
//         UPDATE URL on tab / page change
//   ---------------------------------------- */
//   useEffect(() => {
//     const params = new URLSearchParams();
//     params.set("tab", addMode);
//     params.set("page", page.toString());

//     router.replace(`?${params.toString()}`);
//   }, [addMode, page]);

//   /* ---------------------------------------
//         API CLIENTS
//   ---------------------------------------- */
//   const floorApi = createFloorApiClient({});
//   const bedTypeApi = createBedTypeApiClient({});
//   const wardTypeApi = createWardTypeApiClient({});
//   const wardApi = createWardApiClient({});

//   /* ---------------------------------------
//         STATIC LISTS (for dropdowns)
//   ---------------------------------------- */
//   const { data: floorsList = [] } = useQuery({
//     queryKey: ["floors-list"],
//     queryFn: async () => (await floorApi.getFloors({ page: 1, limit: 100 })).data.data,
//   });

//   const { data: wardTypesList = [] } = useQuery({
//     queryKey: ["wardTypes-list"],
//     queryFn: async () => (await wardTypeApi.getWardTypes({ page: 1, limit: 100 })).data.data,
//   });

//   /* ---------------------------------------
//         PAGINATED LISTS PER TAB
//   ---------------------------------------- */

//   // 1. Wards
//   const { data: wards, isLoading: wardLoading } = useQuery({
//     queryKey: ["wards", page, search, filters],
//     enabled: addMode === "ward",
//     queryFn: async () => {
//       const res = await wardApi.getWards({
//         page,
//         limit,
//         search,
//         floor_id: filters.floor_id,
//         ward_type_id: filters.ward_type_id,
//         status: filters.status,
//       });
//       return res.data;
//     },
//   });

//   // 2. Bed Types
//   const { data: bedTypes, isLoading: bedTypeLoading } = useQuery({
//     queryKey: ["bedTypes", page, search, filters],
//     enabled: addMode === "bedType",
//     queryFn: async () =>
//       (await bedTypeApi.getBedTypes({ page, limit, search, status: filters.status })).data,
//   });

//   // 3. Ward Types
//   const { data: wardTypes, isLoading: wardTypeLoading } = useQuery({
//     queryKey: ["wardTypes", page, search, filters],
//     enabled: addMode === "wardType",
//     queryFn: async () =>
//       (await wardTypeApi.getWardTypes({ page, limit, search, status: filters.status })).data,
//   });

//   // 4. Floors
//   const { data: floorsPaginated, isLoading: floorLoading } = useQuery({
//     queryKey: ["floors", page, search, filters],
//     enabled: addMode === "floor",
//     queryFn: async () =>
//       (await floorApi.getFloors({ page, limit, search, status: filters.status })).data,
//   });

//   /* ---------------------------------------
//         CREATE MUTATIONS
//   ---------------------------------------- */

//   const createWardMutation = useMutation({
//     mutationFn: (v: any) =>
//       wardApi.createWard({
//         ward_number: v.ward_number,
//         ward_type_id: v.ward_type_id,
//         floor_id: v.floor_id,
//         status: v.active ? "active" : "inactive",
//       }),
//     onSuccess: () => {
//       toast.success("Ward created");
//       queryClient.invalidateQueries({ queryKey: ["wards"] });
//     },
//   });

//   const createFloorMutation = useMutation({
//     mutationFn: (v: any) =>
//       floorApi.createFloor({
//         floor_name: v.floor_name,
//         status: v.active ? "active" : "inactive",
//       }),
//     onSuccess: () => {
//       toast.success("Floor created");
//       queryClient.invalidateQueries({ queryKey: ["floors"] });
//     },
//   });

//   const createBedTypeMutation = useMutation({
//     mutationFn: (v: any) =>
//       bedTypeApi.createBedType({
//         name: v.name,
//         status: v.active ? "active" : "inactive",
//       }),
//     onSuccess: () => {
//       toast.success("Bed Type created");
//       queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
//     },
//   });

//   const createWardTypeMutation = useMutation({
//     mutationFn: (v: any) =>
//       wardTypeApi.createWardType({
//         name: v.name,
//         status: v.active ? "active" : "inactive",
//       }),
//     onSuccess: () => {
//       toast.success("Ward Type created");
//       queryClient.invalidateQueries({ queryKey: ["wardTypes"] });
//     },
//   });

//   /* ---------------------------------------
//         UPDATE MUTATION
//   ---------------------------------------- */
//   const updateWardMutation = useMutation({
//   mutationFn: (v: any) =>
//     wardApi.updateWard(v.id, {
//       ward_number: v.ward_number,
//       ward_type_id: v.ward_type_id,
//       floor_id: v.floor_id,
//       status: v.active ? "active" : "inactive",
//     }),
//   onSuccess: () => {
//     toast.success("Ward updated");
//     queryClient.invalidateQueries({ queryKey: ["wards"] });
//   },
// });

//   /* ---------------------------------------
//         DELETE MUTATION
//   ---------------------------------------- */
//   const deleteWardMutation = useMutation({
//     mutationFn: (id: string) => wardApi.deleteWard(id),
//     onSuccess: () => {
//       toast.success("Ward deleted");
//       queryClient.invalidateQueries({ queryKey: ["wards"] });
//     },
//   });

//   const deleteBedTypeMutation = useMutation({
//     mutationFn: (id: string) => bedTypeApi.deleteBedType(id),
//     onSuccess: () => {
//       toast.success("Bed Type deleted");
//       queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
//     },
//   });

//   const deleteWardTypeMutation = useMutation({
//     mutationFn: (id: string) => wardTypeApi.deleteWardType(id),
//     onSuccess: () => {
//       toast.success("Ward Type deleted");
//       queryClient.invalidateQueries({ queryKey: ["wardTypes"] });
//     },
//   });

//   const deleteFloorMutation = useMutation({
//     mutationFn: (id: string) => floorApi.deleteFloor(id),
//     onSuccess: () => {
//       toast.success("Ward Type deleted");
//       queryClient.invalidateQueries({ queryKey: ["floors"] });
//     },
//   });

//   /* ---------------------------------------
//         TABLE DATA PER MODE
//   ---------------------------------------- */
//   const tableData =
//     addMode === "ward"
//       ? wards?.data || []
//       : addMode === "bedType"
//         ? bedTypes?.data || []
//         : addMode === "wardType"
//           ? wardTypes?.data || []
//           : floorsPaginated?.data || [];

//   /* ---------------------------------------
//         LOADING STATUS
//   ---------------------------------------- */
//   const loading =
//     wardLoading || bedTypeLoading || wardTypeLoading || floorLoading;

//   /* ---------------------------------------
//         COLUMNS PER TAB
//   ---------------------------------------- */
//   const columns =
//     addMode === "ward"
//       ? [
//         { key: "id", label: "ID", render: (r: any) => r.id },
//         { key: "ward_number", label: "Ward Number", render: (r: any) => r.ward_number },
//         { key: "ward_type", label: "Ward Type", render: (r: any) => r.ward_type?.name ?? "—" },
//         { key: "floor", label: "Floor", render: (r: any) => r.floor?.floor_name ?? "—" },
//         {
//           key: "status",
//           label: "Status",
//           render: (r: any) => (
//             <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
//               {r.status}
//             </span>
//           ),
//         },
//         { key: "created_at", label: "Created On", render: (r: any) => formatDate(r.created_at) },
//         {
//           key: "action",
//           label: "Action",
//           render: (r: any) => (
//             // <RowActionMenu
//             //   onEdit={() => { }}
//             //   onDelete={() => deleteWardMutation.mutate(r.id)}
//             // />
//             <RowActionMenu
//               onEdit={() => {
//                 setDialogMode("edit");
//                 setEditData(r);
//                 setIsAddDialogOpen(true);
//               }}
//               onDelete={() => deleteWardMutation.mutate(r.id)}
//             />

//           ),
//         },
//       ]
//       : addMode === "bedType" || addMode === "wardType"
//         ? [
//           { key: "id", label: "ID", render: (r: any) => r.id },
//           { key: "name", label: "Name", render: (r: any) => r.name },
//           {
//             key: "status",
//             label: "Status",
//             render: (r: any) => (
//               <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
//                 {r.status}
//               </span>
//             ),
//           },
//           { key: "created_at", label: "Created On", render: (r: any) => formatDate(r.created_at) },
//           {
//             key: "action",
//             label: "Action",
//             render: (r: any) => (
//               <RowActionMenu
//                 onEdit={() => { }}
//                 onDelete={() => { addMode === "wardType" ? deleteWardTypeMutation.mutate(r.id) : addMode === "bedType" ? deleteBedTypeMutation.mutate(r.id) : "" }}
//               />
//             ),
//           },
//         ]
//         : [
//           { key: "id", label: "ID", render: (r: any) => r.id },
//           { key: "floor_name", label: "Floor", render: (r: any) => r.floor_name },
//           {
//             key: "status",
//             label: "Status",
//             render: (r: any) => (
//               <span className={r.status === "active" ? "text-green-500" : "text-red-500"}>
//                 {r.status}
//               </span>
//             ),
//           },
//           { key: "created_at", label: "Created On", render: (r: any) => formatDate(r.created_at) },
//           {
//             key: "action",
//             label: "Action",
//             render: (r: any) => (
//               <RowActionMenu
//                 onEdit={() => { }}
//                 onDelete={() => deleteFloorMutation.mutate(r.id)}
//               />
//             ),
//           },
//         ];

//   /* ---------------------------------------
//         TOTAL PAGES PER TAB
//   ---------------------------------------- */
//   const totalPages =
//     addMode === "ward"
//       ? wards?.pagination?.totalPages || 1
//       : addMode === "bedType"
//         ? bedTypes?.pagination?.totalPages || 1
//         : addMode === "wardType"
//           ? wardTypes?.pagination?.totalPages || 1
//           : floorsPaginated?.pagination?.totalPages || 1;

//   /* ---------------------------------------
//                 UI
//   ---------------------------------------- */
//   return (
//     <>
//       <div className="p-5 space-y-8">
//         <PageHeader title="Units / Wards / Beds" />

//         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
//           {/* HEADER */}
//           <div className="flex flex-col md:flex-row justify-between gap-4">
//             <DynamicTabs
//               tabs={Tabs}
//               defaultTab={initialTab}
//               onChange={(key) => {
//                 setAddMode(key);
//                 setPage(1);
//                 setFilters({});
//               }}
//             />

//             <div className="flex gap-3">
//               {/* <FilterButton onClick={() => setIsFilterDialogOpen(true)} /> */}
//               <FilterButton
//                 filters={filters}
//                 onClick={() => setIsFilterDialogOpen(true)}
//                 onClear={() => clearAllFilters()}
//               />
//               <SearchInput value={search} onChange={setSearch} />
//               <QuickActions />
//               {/* <NewButton handleClick={() => setIsAddDialogOpen(true)} /> */}
//               <NewButton handleClick={() => {
//                 setDialogMode("add");
//                 setEditData(null);
//                 setIsAddDialogOpen(true);
//               }}
//               />
//             </div>
//           </div>

//           <ResponsiveDataTable columns={columns} data={tableData} loading={loading} striped />

//           <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
//         </div>
//       </div>

//       {/* ADD DIALOGS */}
//       {addMode === "ward" && (
//         // <AddWardDialog
//         //   open={isAddDialogOpen}
//         //   onClose={() => setIsAddDialogOpen(false)}
//         //   floors={floorsList}
//         //   wardTypes={wardTypesList}
//         //   onSave={(v) => createWardMutation.mutate(v)}
//         // />
//         <AddWardDialog
//           open={isAddDialogOpen}
//           onClose={() => setIsAddDialogOpen(false)}
//           floors={floorsList}
//           wardTypes={wardTypesList}
//           initialData={editData}
//           mode={dialogMode}
//           onSave={(v) => {
//             if (dialogMode === "add") createWardMutation.mutate(v);
//             else updateWardMutation.mutate({ id: editData.id, ...v });
//           }}
//         />

//       )}

//       {addMode === "floor" && (
//         <AddFloorDialog
//           open={isAddDialogOpen}
//           onClose={() => setIsAddDialogOpen(false)}
//           onSave={(v) => createFloorMutation.mutate(v)}
//         />
//       )}

//       {addMode === "bedType" && (
//         <AddBedTypeDialog
//           open={isAddDialogOpen}
//           onClose={() => setIsAddDialogOpen(false)}
//           onSave={(v) => createBedTypeMutation.mutate(v)}
//         />
//       )}

//       {addMode === "wardType" && (
//         <AddWardTypeDialog
//           open={isAddDialogOpen}
//           onClose={() => setIsAddDialogOpen(false)}
//           onSave={(v) => createWardTypeMutation.mutate(v)}
//         />
//       )}

//       {/* FILTER */}
//       <FilterDialog
//         open={isFilterDialogOpen}
//         onClose={() => setIsFilterDialogOpen(false)}
//         mode={addMode as any}
//         onApply={(values) => {
//           setFilters(values);
//           setPage(1);
//         }}
//         filters={filters}
//         isLoading={false}
//         floors={floorsList}
//         wardTypes={wardTypesList}
//       />
//     </>
//   );
// }

"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { PageHeader } from "@/components/common/page-header"
import SearchInput from "@/components/common/search-input"
import FilterButton from "@/components/common/filter-button"
import NewButton from "@/components/common/new-button"
import { QuickActions } from "./_components/QuickActions"
import { UnitsWardsBedsRowActions } from "./_components/UnitsWardsBedsRowActions"
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable"
import { PaginationControls } from "@/components/common/data-table/PaginationControls"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"

import { FilterDialog } from "./_components/FilterDialog"
import { AddFloorDialog } from "./_components/AddFloorDialog"
import { AddBedTypeDialog } from "./_components/AddBedTypeDialog"
import { AddWardTypeDialog } from "./_components/AddWardTypeDialog"
import { AddWardDialog } from "./_components/AddWardDialog"

import { format } from "@workspace/ui/hooks/use-date-fns"
import { toast } from "@workspace/ui/lib/sonner"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// APIs
import { createFloorApiClient } from "@/lib/api/administration/floors"
import { createBedTypeApiClient } from "@/lib/api/administration/bedTypes"
import { createWardTypeApiClient } from "@/lib/api/administration/wardTypes"
import { createWardApiClient } from "@/lib/api/administration/wards"
import { useUserStore } from "@/store/useUserStore"
import { Can } from "@/components/common/app-can"
import { PERMISSIONS } from "@/app/utils/permissions"

const Tabs = [
  { key: "ward", label: "Ward" },
  { key: "bedType", label: "Bed Type" },
  { key: "wardType", label: "Ward Type" },
  { key: "floor", label: "Floor" },
]

const formatDate = (d?: string) =>
  d ? format(new Date(d), "dd MMM yyyy, hh:mm a") : "—"

const PERMISSION_MAP = {
  ward: PERMISSIONS.WARD,
  wardType: PERMISSIONS.WARD_TYPE,
  bedType: PERMISSIONS.BED_TYPE,
  floor: PERMISSIONS.FLOOR,
};


function UnitsWardsBedsPageContent() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  /* ---------------------------------------
          URL STATE
  ---------------------------------------- */
  const initialTab = searchParams.get("tab") || "ward"
  const initialPage = parseInt(searchParams.get("page") || "1")

  const [addMode, setAddMode] = useState(initialTab)
  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<any>({})

  /* Dialog State */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  /* Edit State */
  const [editData, setEditData] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")

  const limit = 10

  const clearAllFilters = () => setFilters({})

  /* ---------------------------------------
        FILTER TABS AS PER PEMISSION
  ---------------------------------------- */
  // const filteredTabs = Tabs.filter((t) => {
  //   const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP]
  //   return perm?.VIEW ? userPermissions?.includes(perm.VIEW) : true
  // })
  const permissionStrings =
    (userPermissions?.map((p: any) => typeof p === "string" ? p : p.name) ?? []);

  const filteredTabs = Tabs.filter((t) => {
    const perm = PERMISSION_MAP[t.key as keyof typeof PERMISSION_MAP];
    return perm?.VIEW ? permissionStrings.includes(perm.VIEW) : false;
  });


  console.log(filteredTabs, Tabs, userPermissions)


  /* ---------------------------------------
        UPDATE URL
  ---------------------------------------- */
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("tab", addMode)
    params.set("page", page.toString())
    router.replace(`?${params.toString()}`)
  }, [addMode, page])

  /* ---------------------------------------
        API CLIENTS
  ---------------------------------------- */
  const floorApi = createFloorApiClient({})
  const bedTypeApi = createBedTypeApiClient({})
  const wardTypeApi = createWardTypeApiClient({})
  const wardApi = createWardApiClient({})

  /* ---------------------------------------
        STATIC DROPDOWN LISTS
  ---------------------------------------- */
  const { data: floorsList = [] } = useQuery({
    queryKey: ["floors-list"],
    queryFn: async () =>
      (await floorApi.getFloors({ page: 1, limit: 100 })).data.data,
  })

  const { data: wardTypesList = [] } = useQuery({
    queryKey: ["wardTypes-list"],
    queryFn: async () =>
      (await wardTypeApi.getWardTypes({ page: 1, limit: 100 })).data.data,
  })

  // // ward types
  // const fetchWardTypesPaged = async ({ page, limit, search }) => {
  //   const res = await wardTypeApi.getWardTypes({
  //     page,
  //     limit,
  //     search,
  //   });

  //   return res.data.data.map((w) => ({
  //     label: w.name,
  //     value: w.id,
  //   }));
  // };

  // // floors
  // const fetchFloorsPaged = async ({ page, limit, search }) => {
  //   const res = await floorApi.getFloors({
  //     page,
  //     limit,
  //     search,
  //   });

  //   return res.data.data.map((f) => ({
  //     label: f.floor_name,
  //     value: f.id,
  //   }));
  // };

  /* ---------------------------------------
        PAGINATED LISTS
  ---------------------------------------- */

  const { data: wards, isLoading: loadingWard } = useQuery({
    queryKey: ["wards", page, searchQuery, filters],
    enabled: addMode === "ward",
    queryFn: async () =>
      (
        await wardApi.getWards({
          page,
          limit,
          search,
          ward_type_id: filters.ward_type_id,
          floor_id: filters.floor_id,
          status: filters.status,
        })
      ).data,
  })

  const { data: bedTypes, isLoading: loadingBedTypes } = useQuery({
    queryKey: ["bedTypes", page, searchQuery, filters],
    enabled: addMode === "bedType",
    queryFn: async () =>
      (
        await bedTypeApi.getBedTypes({
          page,
          limit,
          search,
          status: filters.status,
        })
      ).data,
  })

  const { data: wardTypes, isLoading: loadingWardTypes } = useQuery({
    queryKey: ["wardTypes", page, searchQuery, filters],
    enabled: addMode === "wardType",
    queryFn: async () =>
      (
        await wardTypeApi.getWardTypes({
          page,
          limit,
          search,
          status: filters.status,
        })
      ).data,
  })

  const { data: floorsPaginated, isLoading: loadingFloors } = useQuery({
    queryKey: ["floors", page, searchQuery, filters],
    enabled: addMode === "floor",
    queryFn: async () =>
      (
        await floorApi.getFloors({
          page,
          limit,
          search,
          status: filters.status,
        })
      ).data,
  })

  /* ---------------------------------------
      CREATE MUTATIONS
---------------------------------------- */

  const createWardMutation = useMutation({
    mutationFn: (v: any) =>
      wardApi.createWard({
        ward_number: v.ward_number,
        ward_type_id: v.ward_type_id,
        floor_id: v.floor_id,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Ward created")
      setIsAddDialogOpen(false) // CLOSE dialog
      queryClient.invalidateQueries({ queryKey: ["wards"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create ward")
    },
  })

  const createBedTypeMutation = useMutation({
    mutationFn: (v: any) =>
      bedTypeApi.createBedType({
        name: v.name,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Bed Type created")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create bed type")
    },
  })

  const createWardTypeMutation = useMutation({
    mutationFn: (v: any) =>
      wardTypeApi.createWardType({
        name: v.name,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Ward Type created")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["wardTypes"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create ward type")
    },
  })

  const createFloorMutation = useMutation({
    mutationFn: (v: any) =>
      floorApi.createFloor({
        floor_name: v.floor_name,
        status: v.status ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Floor created")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create floor")
    },
  })

  /* ---------------------------------------
        UPDATE MUTATIONS
  ---------------------------------------- */

  const updateWardMutation = useMutation({
    mutationFn: (v: any) =>
      wardApi.updateWard(v.id, {
        ward_number: v.ward_number,
        ward_type_id: v.ward_type_id,
        floor_id: v.floor_id,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Ward updated")
      setIsAddDialogOpen(false) // CLOSE dialog on success
      queryClient.invalidateQueries({ queryKey: ["wards"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update ward")
    },
  })

  const updateBedTypeMutation = useMutation({
    mutationFn: (v: any) =>
      bedTypeApi.updateBedType(v.id, {
        name: v.name,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Bed Type updated")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update bed type")
    },
  })

  const updateWardTypeMutation = useMutation({
    mutationFn: (v: any) =>
      wardTypeApi.updateWardType(v.id, {
        name: v.name,
        status: v.active ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Ward Type updated")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["wardTypes"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update ward type")
    },
  })

  const updateFloorMutation = useMutation({
    mutationFn: (v: any) =>
      floorApi.updateFloor(v.id, {
        floor_name: v.floor_name,
        status: v.status ? "active" : "inactive",
      }),

    onSuccess: () => {
      toast.success("Floor updated")
      setIsAddDialogOpen(false)
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update floor")
    },
  })

  /* ---------------------------------------
        DELETE MUTATIONS
  ---------------------------------------- */
  const deleteWardMutation = useMutation({
    mutationFn: (id: string) => wardApi.deleteWard(id),
    onSuccess: () => {
      toast.success("Ward deleted")
      queryClient.invalidateQueries({ queryKey: ["wards"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete ward")
    },
  })

  const deleteBedTypeMutation = useMutation({
    mutationFn: (id: string) => bedTypeApi.deleteBedType(id),
    onSuccess: () => {
      toast.success("Bed Type deleted")
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete bed")
    },
  })

  const deleteWardTypeMutation = useMutation({
    mutationFn: (id: string) => wardTypeApi.deleteWardType(id),
    onSuccess: () => {
      toast.success("Ward Type deleted")
      queryClient.invalidateQueries({ queryKey: ["wardTypes"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete ward type")
    },
  })

  const deleteFloorMutation = useMutation({
    mutationFn: (id: string) => floorApi.deleteFloor(id),
    onSuccess: () => {
      toast.success("Floor deleted")
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete floor")
    },
  })

  /* ---------------------------------------
        TABLE DATA
  ---------------------------------------- */
  const tableData =
    addMode === "ward"
      ? wards?.data || []
      : addMode === "bedType"
        ? bedTypes?.data || []
        : addMode === "wardType"
          ? wardTypes?.data || []
          : floorsPaginated?.data || []

  const loading =
    loadingWard || loadingBedTypes || loadingWardTypes || loadingFloors

  const totalPages =
    addMode === "ward"
      ? (wards?.pagination?.totalPages ?? 1)
      : addMode === "bedType"
        ? (bedTypes?.pagination?.totalPages ?? 1)
        : addMode === "wardType"
          ? (wardTypes?.pagination?.totalPages ?? 1)
          : (floorsPaginated?.pagination?.totalPages ?? 1)

  /* ---------------------------------------
        TABLE COLUMNS
  ---------------------------------------- */
  const columns =
    addMode === "ward"
      ? [
        { key: "id", label: "ID", render: (r: any) => r.id },
        {
          key: "ward_number",
          label: "Ward Number",
          render: (r: any) => r.ward_number,
        },
        {
          key: "ward_type",
          label: "Ward Type",
          render: (r: any) => r.wardType?.name ?? "—",
        },
        {
          key: "floor",
          label: "Floor",
          render: (r: any) => r.floor?.floor_name ?? "—",
        },
        {
          key: "status",
          label: "Status",
          render: (r: any) => (
            <span
              className={
                r.status === "active" ? "text-green-500" : "text-red-500"
              }
            >
              {r.status}
            </span>
          ),
        },
        {
          key: "created_at",
          label: "Created On",
          render: (r: any) => formatDate(r.created_at),
        },
        {
          key: "action",
          label: "Action",
          render: (r: any) => (
            <UnitsWardsBedsRowActions
              onEdit={() => {
                setDialogMode("edit")
                setEditData(r)
                setIsAddDialogOpen(true)
              }}
              onDelete={() => deleteWardMutation.mutate(r.id)}
              userPermissions={userPermissions}
              mode={addMode}
            />
          ),
        },
      ]
      : addMode === "bedType"
        ? [
          { key: "id", label: "ID", render: (r: any) => r.id },
          { key: "name", label: "Name", render: (r: any) => r.name },
          {
            key: "status",
            label: "Status",
            render: (r: any) => (
              <span
                className={
                  r.status === "active" ? "text-green-500" : "text-red-500"
                }
              >
                {r.status}
              </span>
            ),
          },
          {
            key: "created_at",
            label: "Created On",
            render: (r: any) => formatDate(r.created_at),
          },
          {
            key: "action",
            label: "Action",
            render: (r: any) => (
              <UnitsWardsBedsRowActions
                onEdit={() => {
                  setDialogMode("edit")
                  setEditData(r)
                  setIsAddDialogOpen(true)
                }}
                onDelete={() => deleteBedTypeMutation.mutate(r.id)}
                userPermissions={userPermissions}
                mode={addMode}
              />
            ),
          },
        ]
        : addMode === "wardType"
          ? [
            { key: "id", label: "ID", render: (r: any) => r.id },
            { key: "name", label: "Name", render: (r: any) => r.name },
            {
              key: "status",
              label: "Status",
              render: (r: any) => (
                <span
                  className={
                    r.status === "active" ? "text-green-500" : "text-red-500"
                  }
                >
                  {r.status}
                </span>
              ),
            },
            {
              key: "created_at",
              label: "Created On",
              render: (r: any) => formatDate(r.created_at),
            },
            {
              key: "action",
              label: "Action",
              render: (r: any) => (
                <UnitsWardsBedsRowActions
                  onEdit={() => {
                    setDialogMode("edit")
                    setEditData(r)
                    setIsAddDialogOpen(true)
                  }}
                  onDelete={() => deleteWardTypeMutation.mutate(r.id)}
                  userPermissions={userPermissions}
                  mode={addMode}
                />
              ),
            },
          ]
          : [
            // floors
            { key: "id", label: "ID", render: (r: any) => r.id },
            {
              key: "floor_name",
              label: "Floor",
              render: (r: any) => r.floor_name,
            },
            {
              key: "status",
              label: "Status",
              render: (r: any) => (
                <span
                  className={
                    r.status === "active" ? "text-green-500" : "text-red-500"
                  }
                >
                  {r.status}
                </span>
              ),
            },
            {
              key: "created_at",
              label: "Created On",
              render: (r: any) => formatDate(r.created_at),
            },
            {
              key: "action",
              label: "Action",
              render: (r: any) => (
                <UnitsWardsBedsRowActions
                  onEdit={() => {
                    setDialogMode("edit")
                    setEditData(r)
                    setIsAddDialogOpen(true)
                  }}
                  onDelete={() => deleteFloorMutation.mutate(r.id)}
                  userPermissions={userPermissions}
                  mode={addMode}
                />
              ),
            },
          ]



  /* ---------------------------------------
                UI
  ---------------------------------------- */
  return (
    <>
      <div className="p-5 space-y-8">
        <PageHeader title="Units / Wards / Beds" />
        <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <DynamicTabs
              tabs={filteredTabs}
              defaultTab={initialTab}
              onChange={(key) => {
                setAddMode(key)
                setPage(1)
                setFilters({})
                setEditData(null)
                setDialogMode("add")
              }}
            />

            <div className="flex gap-3">
              <FilterButton
                filters={filters}
                onClick={() => setIsFilterDialogOpen(true)}
                onClear={clearAllFilters}
              />

              <SearchInput
                value={search}
                onChange={setSearch}
                onSearch={setSearchQuery}
              />

              <QuickActions />
              <Can
                permission={PERMISSION_MAP[addMode as keyof typeof PERMISSION_MAP]?.CREATE}
                userPermissions={userPermissions}
              >
                <NewButton
                  handleClick={() => {
                    setDialogMode("add")
                    setEditData(null)
                    setIsAddDialogOpen(true)
                  }}
                />
              </Can>

            </div>
          </div>

          <ResponsiveDataTable
            columns={columns}
            data={tableData}
            loading={loading}
            striped
          />

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* --- ALL DIALOGS --- */}

      {/* WARD */}
      {addMode === "ward" && (
        <AddWardDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          floors={floorsList}
          wardTypes={wardTypesList}
          initialData={editData}
          mode={dialogMode}
          onSave={(v) => {
            if (dialogMode === "add") createWardMutation.mutate(v)
            else updateWardMutation.mutate({ id: editData.id, ...v })
          }}
        />
      )}

      {/* BED TYPE */}
      {addMode === "bedType" && (
        <AddBedTypeDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          initialData={editData}
          mode={dialogMode}
          onSave={(v) => {
            if (dialogMode === "add") createBedTypeMutation.mutate(v)
            else updateBedTypeMutation.mutate({ id: editData.id, ...v })
          }}
        />
      )}

      {/* WARD TYPE */}
      {addMode === "wardType" && (
        <AddWardTypeDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          initialData={editData}
          mode={dialogMode}
          onSave={(v) => {
            if (dialogMode === "add") createWardTypeMutation.mutate(v)
            else updateWardTypeMutation.mutate({ id: editData.id, ...v })
          }}
        />
      )}

      {/* FLOOR */}
      {addMode === "floor" && (
        <AddFloorDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          initialData={editData}
          mode={dialogMode}
          onSave={(v) => {
            if (dialogMode === "add") createFloorMutation.mutate(v)
            else updateFloorMutation.mutate({ id: editData.id, ...v })
          }}
        />
      )}

      {/* FILTER */}
      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        mode={addMode as any}
        onApply={(v) => {
          setFilters(v)
          setPage(1)
        }}
        filters={filters}
        isLoading={false}
        floors={floorsList}
        wardTypes={wardTypesList}
      />
    </>
  )
}

export default function UnitsWardsBedsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnitsWardsBedsPageContent />
    </Suspense>
  )
}
