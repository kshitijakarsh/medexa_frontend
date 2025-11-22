// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { SlidersHorizontal } from "lucide-react";
// import { Header } from "@/components/header";
// import { DataTable } from "@/components/common/data-table";
// import { QuickActionsMenu } from "./_components/QuickActionsMenu";
// import { RowActionMenu } from "./_components/RowActionMenu";
// import { FilterDialog } from "./_components/FilterDialog";
// import { AddDialog } from "./_components/AddDialog"; // ✅ New one we just made
// import SearchInput from "@/components/common/search-input";
// import NewButton from "@/components/common/new-button";
// import { getMockEmployees } from "./_components/api";
// import { PageHeader } from "@/components/common/PageHeader";
// import { useRouter } from "next/navigation";

// const employeeConfigurationSection = [
//   { key: "humanResources", label: "Human Resources" },
//   { key: "designation", label: "Designation Master" },
//   { key: "specialization", label: "Specialization" },
//   { key: "roles", label: "User Roles" },
// ];

// export default function EmployeeConfigurationPage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<
//     "humanResources" | "designation" | "specialization" | "roles"
//   >("humanResources");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//   const [filters, setFilters] = useState<any>({});

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setData(getMockEmployees(activeTab));
//       setLoading(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [activeTab]);

//   const getColumns = () => {
//     // Customize columns based on section
//     if (activeTab === "humanResources") {
//       return [
//         {
//           key: "humanResources",
//           label: "Human Resources",
//           render: (row: any) => (
//             <div className="flex items-center gap-3">
//               <img
//                 src={row.avatar}
//                 alt={row.name}
//                 className="w-10 h-10 rounded-full border border-gray-200"
//               />
//               <div>
//                 <p className="font-medium text-gray-800">{row.name}</p>
//                 <p className="text-xs text-gray-500">{row.id}</p>
//               </div>
//             </div>
//           ),
//         },
//         {
//           key: "designation",
//           label: "Designation",
//           render: (row: any) => row.designation,
//         },
//         { key: "department", label: "Department", render: (row: any) => row.department },
//         { key: "contact", label: "Contact", render: (row: any) => row.contact },
//         { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
//         { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
//         {
//           key: "status",
//           label: "Status",
//           render: (row: any) => (
//             <span className={row.status === "Active" ? "text-green-600" : "text-red-500"}>
//               {row.status}
//             </span>
//           ),
//         },
//         {
//           key: "action",
//           label: "Action",
//           render: (row: any) => (
//             <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />
//           ),
//           className: "text-center w-[80px]",
//         },
//       ];
//     } else {
//       // ✅ For designation / specialization / roles
//       return [
//         { key: "name", label: activeTab === "roles" ? "User Role" : "Name", render: (r: any) => r.name },
//         { key: "status", label: "Billing Status", render: (r: any) => (
//             <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>
//               {r.status}
//             </span>
//           )},
//         { key: "createdOn", label: "Created On", render: (r: any) => r.createdOn },
//         { key: "addedBy", label: "Added By", render: (r: any) => r.addedBy },
//         {
//           key: "action",
//           label: "Action",
//           render: (r: any) => (
//             <RowActionMenu onEdit={() => {}} onDelete={() => {}} onView={() => {}} />
//           ),
//           className: "text-center w-[80px]",
//         },
//       ];
//     }
//   };

//   // ✅ New handler
//   const handleNew = () => {
//     if (activeTab === "humanResources") {
//       router.push("/employee-configuration/add");
//     } else {
//       setIsAddDialogOpen(true);
//     }
//   };

//   // ✅ On save — just push new mock record into the table (temporary)
//   const handleSave = (values: any) => {
//     const newRow = {
//       id: data.length + 1,
//       name: values.name,
//       status: values.active ? "Active" : "Inactive",
//       createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
//       addedBy: "Dr. Ahmed Al-Mansouri",
//     };
//     setData((prev) => [...prev, newRow]);
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <Header />

//       <div className="p-5 space-y-8">
//         <PageHeader title="Employee Configuration" />

//         <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
//           {/* Tabs and Actions */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex flex-wrap gap-2">
//               {employeeConfigurationSection.map((tab) => (
//                 <Button
//                   key={tab.key}
//                   type="button"
//                   onClick={() => setActiveTab(tab.key as any)}
//                   className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer ${
//                     activeTab === tab.key
//                       ? "bg-blue-600 text-white hover:bg-blue-600"
//                       : "bg-white text-gray-600 hover:bg-blue-100"
//                   }`}
//                 >
//                   {tab.label}
//                 </Button>
//               ))}
//             </div>

//             {/* Right Side Controls */}
//             <div className="flex items-center gap-3">
//               <Button
//                 onClick={() => setIsFilterDialogOpen(true)}
//                 variant="outline"
//                 className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//               >
//                 Filter
//                 <SlidersHorizontal className="w-5 h-5" />
//               </Button>
//               <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
//               <QuickActionsMenu />
//               <NewButton handleClick={handleNew} />
//             </div>
//           </div>

//           {/* Table */}
//           <DataTable columns={getColumns()} data={data} loading={loading} striped />
//         </div>
//       </div>

//       {/* ✅ Dialog */}
//       <AddDialog
//         open={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         mode={activeTab}
//         onSave={handleSave}
//       />

//       <FilterDialog
//         open={isFilterDialogOpen}
//         onClose={() => setIsFilterDialogOpen(false)}
//         mode={activeTab}
//         onApply={(values) => setFilters(values)}
//         isLoading={false}
//       />
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { DataTable } from "@/components/common/data-table";
import { QuickActionsMenu } from "./_components/QuickActionsMenu";
import { RowActionMenu } from "./_components/RowActionMenu";
import { FilterDialog } from "./_components/FilterDialog";
import { AddDialog } from "./_components/AddDialog";
import SearchInput from "@/components/common/search-input";
import NewButton from "@/components/common/new-button";
import { getMockEmployees } from "./_components/api";
import { PageHeader } from "@/components/common/page-header";
import { useRouter } from "next/navigation";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";

const employeeConfigurationSection = [
    { key: "humanResources", label: "Human Resources" },
    { key: "designation", label: "Designation Master" },
    { key: "specialization", label: "Specialization" },
    { key: "roles", label: "User Roles" },
];

export default function EmployeeConfigurationPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<
        "humanResources" | "designation" | "specialization" | "roles"
    >("humanResources");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setData(getMockEmployees(activeTab));
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const getColumns = () => {
        // 👩‍⚕️ Human Resources section stays same
        if (activeTab === "humanResources") {
            return [
                {
                    key: "humanResources",
                    label: "Human Resources",
                    render: (row: any) => (
                        <div className="flex items-center gap-3">
                            <img
                                src={row.avatar}
                                alt={row.name}
                                className="w-10 h-10 rounded-full border border-gray-200"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{row.name}</p>
                                <p className="text-xs text-gray-500">{row.id}</p>
                            </div>
                        </div>
                    ),
                },
                {
                    key: "designation",
                    label: "Designation",
                    render: (row: any) => row.designation,
                },
                { key: "department", label: "Department", render: (row: any) => row.department },
                { key: "contact", label: "Contact", render: (row: any) => row.contact },
                { key: "createdOn", label: "Created On", render: (row: any) => row.createdOn },
                { key: "addedBy", label: "Added By", render: (row: any) => row.addedBy },
                {
                    key: "status",
                    label: "Status",
                    render: (row: any) => (
                        <span className={row.status === "Active" ? "text-green-600" : "text-red-500"}>
                            {row.status}
                        </span>
                    ),
                },
                {
                    key: "action",
                    label: "Action",
                    render: (r: any) => (
                        <RowActionMenu
                            onEdit={() => {
                                // example placeholder
                                console.log("Edit clicked for:", r.name);
                            }}
                            onDelete={() => {
                                // example placeholder
                                console.log("Delete clicked for:", r.name);
                            }}
                            onView={() => {
                                if (activeTab === "humanResources") {
                                    // 👇 dynamically navigate to the employee details view
                                    router.push(`/employee-configuration/${r.id}`);
                                }
                            }}
                        />
                    ),
                    className: "text-center w-[80px]",
                },
            ];
        }

        // 🧾 For Designation / Specialization / Roles
        return [
            {
                key: "sno",
                label: "S.No",
                render: (r: any) => <span>{r.sno}</span>,
                className: "text-center w-[60px]",
            },
            {
                key: "name",
                label: activeTab === "roles" ? "User Role" : "Name",
                render: (r: any) => <span className="text-gray-800 font-medium">{r.name}</span>,
            },
            {
                key: "status",
                label: "Billing Status",
                render: (r: any) => (
                    <span className={r.status === "Active" ? "text-green-600" : "text-red-500"}>
                        {r.status}
                    </span>
                ),
                className: "w-[80px]"
            },
            {
                key: "createdOn",
                label: "Created On",
                render: (r: any) => r.createdOn,
                className: "w-[80px]"
            },
            {
                key: "addedBy",
                label: "Added By",
                render: (r: any) => r.addedBy,
                className: "max-w-[100px] min-w-[80px] "
            },
            {
                key: "action",
                label: "Action",
                render: (r: any) => (
                    <RowActionMenu onEdit={() => { }} onDelete={() => { }} onView={() => { }} />

                ),
                className: "text-center w-[80px]",
            },
        ];
    };

    const handleNew = () => {
        if (activeTab === "humanResources") {
            router.push("/employee-configuration/add");
        } else {
            setIsAddDialogOpen(true);
        }
    };

    const handleSave = (values: any[]) => {
        // Add one or more new rows from AddDialog
        const newEntries = values.map((v, idx) => ({
            id: data.length + idx + 1,
            name: v.name,
            status: v.active ? "Active" : "Inactive",
            createdOn: new Date().toISOString().slice(0, 16).replace("T", " "),
            addedBy: "Dr. Ahmed Al-Mansouri",
        }));
        setData((prev) => [...prev, ...newEntries]);
    };

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-8">
                <PageHeader title="Employee Configuration" />

                <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
                    {/* Tabs and Actions */}
                    {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <DynamicTabs
                            tabs={employeeConfigurationSection}
                            defaultTab="humanResources"
                            onChange={(tabKey) => setActiveTab(tabKey as any)}
                        /> */}

                    {/* Right Side Controls */}
                    {/* <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setIsFilterDialogOpen(true)}
                                variant="outline"
                                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Filter
                                <SlidersHorizontal className="w-5 h-5" />
                            </Button>
                            <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
                            <QuickActionsMenu />
                            <NewButton handleClick={handleNew} />
                        </div>
                    </div> */}

                    {/* Tabs + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Tabs */}
                        <div className="flex-shrink-0 w-full lg:w-auto">
                            <DynamicTabs
                                tabs={employeeConfigurationSection}
                                defaultTab="humanResources"
                                onChange={(tabKey) => setActiveTab(tabKey as any)}
                            />
                        </div>

                        {/* Right Side Controls */}
                        <div
                            className=" flex flex-wrap items-center justify-start lg:justify-end gap-3 flex-1"
                        >
                            {/* Filter */}
                            <Button
                                onClick={() => setIsFilterDialogOpen(true)}
                                variant="outline"
                                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filter</span>
                            </Button>

                            {/* Search Input */}
                            {/* <div className="flex-grow min-w-[180px] sm:min-w-[220px] md:min-w-[260px]"> */}
                                <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
                            {/* </div> */}

                            {/* Quick Actions */}
                            <QuickActionsMenu />

                            {/* New Button */}
                            {/* <div className="ml-auto w-full sm:w-auto flex justify-end"> */}
                                <NewButton handleClick={handleNew} />
                            {/* </div> */}
                        </div>
                    </div>




                    {/* Table */}
                    <DataTable columns={getColumns()} data={data} loading={loading} striped />
                </div>
            </div>

            {/* ✅ Add Dialog */}
            <AddDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                // mode={activeTab}
                mode={activeTab as "designation" | "specialization" | "roles"}
                onSave={handleSave}
            />

            {/* ✅ Filter Dialog */}
            <FilterDialog
                open={isFilterDialogOpen}
                onClose={() => setIsFilterDialogOpen(false)}
                mode={activeTab}
                onApply={(values) => setFilters(values)}
                isLoading={false}
            />
        </main>
    );
}
