// // // // import { Button } from "@workspace/ui/components/button"
// // // // import { headers } from "next/headers"
// // // // import Link from "next/link"

// // // // export default async function Dashboard({
// // // //   params,
// // // // }: {
// // // //   params: Promise<{ tenant: string }>
// // // // }) {
// // // //   const headersList = await headers()
// // // //   const { tenant: paramTenant } = await params
// // // //   const tenant = headersList.get("x-tenant") ?? paramTenant

// // // //   return (
// // // //     <div className="min-h-svh p-8">
// // // //       <div className="max-w-7xl mx-auto">
// // // //         <div className="flex items-center justify-between mb-8">
// // // //           <div>
// // // //             <h1 className="text-3xl font-bold">Dashboard</h1>
// // // //             <p className="text-muted-foreground">Hospital: {tenant}</p>
// // // //           </div>
// // // //           <Link href="/">
// // // //             <Button variant="outline">Back to Home</Button>
// // // //           </Link>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // // //           <div className="p-6 border rounded-lg">
// // // //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// // // //               Total Patients
// // // //             </h3>
// // // //             <p className="text-3xl font-bold">1,234</p>
// // // //             <p className="text-xs text-green-500 mt-2">+12% from last month</p>
// // // //           </div>
// // // //           <div className="p-6 border rounded-lg">
// // // //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// // // //               Appointments Today
// // // //             </h3>
// // // //             <p className="text-3xl font-bold">56</p>
// // // //             <p className="text-xs text-blue-500 mt-2">8 pending confirmation</p>
// // // //           </div>
// // // //           <div className="p-6 border rounded-lg">
// // // //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// // // //               Staff on Duty
// // // //             </h3>
// // // //             <p className="text-3xl font-bold">42</p>
// // // //             <p className="text-xs text-muted-foreground mt-2">
// // // //               Out of 68 total
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           <div className="p-6 border rounded-lg">
// // // //             <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
// // // //             <div className="space-y-2">
// // // //               <Button variant="outline" className="w-full justify-start">
// // // //                 Add New Patient
// // // //               </Button>
// // // //               <Button variant="outline" className="w-full justify-start">
// // // //                 Schedule Appointment
// // // //               </Button>
// // // //               <Button variant="outline" className="w-full justify-start">
// // // //                 View Reports
// // // //               </Button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="p-6 border rounded-lg">
// // // //             <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
// // // //             <div className="space-y-3 text-sm">
// // // //               <div className="flex justify-between">
// // // //                 <span>New patient registered</span>
// // // //                 <span className="text-muted-foreground">5 min ago</span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span>Appointment completed</span>
// // // //                 <span className="text-muted-foreground">12 min ago</span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span>Lab result uploaded</span>
// // // //                 <span className="text-muted-foreground">1 hour ago</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }


// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { Input } from "@/components/ui/input";
// // // import { DashboardSection } from "./_components/dashboard-section";
// // // import { Header } from "@/components/header";
// // // import { fetchMasters } from "./_components/fecth-master";
// // // import { SearchIcon } from "lucide-react";

// // // interface MasterData {
// // //   title: string;
// // //   subtitle: string;
// // //   active: number;
// // //   category: string;
// // // }

// // // export default function MastersPage() {
// // //   const [data, setData] = useState<MasterData[]>([]);
// // //   const [search, setSearch] = useState("");

// // //   useEffect(() => {
// // //     fetchMasters().then(setData);
// // //   }, []);

// // //   const filtered = data.filter((d) =>
// // //     d.title.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
// // //     acc[curr.category] = acc[curr.category] || [];
// // //     acc[curr.category].push(curr);
// // //     return acc;
// // //   }, {});

// // //   return (
// // //     <main className="min-h-svh w-full">
// // //       <Header />
// // //       <div className="p-6 space-y-8 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
// // //         <div className="flex justify-between items-center">
// // //           <h1 className="text-2xl font-semibold">Masters Setup</h1>
// // //           <div>
// // //             <Input
// // //               placeholder="Search..."
// // //               value={search}
// // //               onChange={(e) => setSearch(e.target.value)}
// // //               className="w-64"
// // //             />
// // //             <SearchIcon />
// // //           </div>

// // //         </div>

// // //         {Object.entries(grouped).map(([category, items]) => (
// // //           <DashboardSection key={category} title={category} items={items} />
// // //         ))}
// // //       </div>
// // //     </main>
// // //   );
// // // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import { Input } from "@workspace/ui/components/input";
// // import { DashboardSection } from "./_components/dashboard-section";
// // import { Header } from "@/components/header";
// // import { fetchMasters } from "./_components/fecth-master";
// // import { SearchIcon } from "lucide-react";
// // import { Skeleton } from "@workspace/ui/components/skeleton";

// // interface MasterData {
// //   title: string;
// //   subtitle: string;
// //   active: number;
// //   category: string;
// // }

// // export default function MastersPage() {
// //   const [data, setData] = useState<MasterData[]>([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const load = async () => {
// //       setLoading(true);
// //       const masters = await fetchMasters();
// //       // simulate delay
// //       // setTimeout(() => {
// //       setData(masters);
// //       setLoading(false);
// //       // }, 1200);
// //     };
// //     load();
// //   }, []);

// //   const filtered = data.filter((d) =>
// //     d.title.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
// //   //   acc[curr.category] = acc[curr.category] || [];
// //   //   acc[curr.category].push(curr);
// //   //   return acc;
// //   // }, {});

// //   const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
// //     (acc[curr.category] ??= []).push(curr);
// //     return acc;
// //   }, {});


// //   return (
// //     <main className="min-h-svh w-full">
// //       <Header />
// //       <div className="p-6 space-y-0 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
// //         {/* Header Row */}

// //         {/* Search with icon inside */}
// //         {/* <div className="flex justify-end items-center">
// //           <div className="relative w-64 ">
// //             <Input
// //               placeholder="Search..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="pr-9 bg-white"
// //             />
// //             <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
// //           </div>
// //         </div> */}

// //         {/* Floating Search Bar */}
// //         {/* Search Area (floating absolute inside container) */}
// //         <div className="relative">
// //           {/* Floating Search Box */}
// //           <div className="absolute top-0 right-6 z-20">
// //             <div className="relative w-64">
// //               <Input
// //                 placeholder="Search..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 className="pr-9 bg-white shadow-lg border border-gray-200 focus:ring-1 focus:ring-blue-300"
// //               />
// //               <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
// //             </div>
// //           </div>
// //         </div>


// //         {/* Loading State */}
// //         {loading ? (
// //           <div className="space-y-10">
// //             {[1, 2, 3].map((section) => (
// //               <div key={section} className="space-y-4">
// //                 <Skeleton className="h-6 w-48 bg-gray-200" />
// //                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //                   {Array.from({ length: 4 }).map((_, i) => (
// //                     <Skeleton
// //                       key={i}
// //                       className="h-32 rounded-lg bg-gray-200"
// //                     />
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           Object.entries(grouped).map(([category, items]) => (
// //             <DashboardSection key={category} title={category} items={items} />
// //           ))
// //         )}
// //       </div>
// //     </main>
// //   );
// // }



// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Input } from "@workspace/ui/components/input";
// import { DashboardSection } from "./_components/dashboard-section";
// import { Header } from "@/components/header";
// import { fetchMasters } from "./_components/fecth-master";
// import { SearchIcon } from "lucide-react";
// import { Skeleton } from "@workspace/ui/components/skeleton";
// import { masterConfig } from "./_components/fecth-master";
// import { useUserStore } from "@/store/useUserStore";

// interface MasterData {
//   title: string;
//   subtitle: string;
//   active: number;
//   category: string;
//   route?: string;
//   addOptions?: string[];
//   moduleKey?: string;
// }

// // ✔ Identify module from route
// function getModuleFromRoute(route: string) {
//   if (!route) return "other";

//   if (route.startsWith("/administration")) return "administration";
//   if (route.startsWith("/employee-configuration")) return "administration";
//   if (route.startsWith("/masters")) return "masters";

//   return "other";
// }

// export default function MastersPage() {
//   const user = useUserStore((s) => s.user);

//   const [data, setData] = useState<MasterData[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ✔ Extract module names from permissions
//   const userModules = useMemo(() => {
//     const permissions = (user?.role?.permissions || []) as string[];

//     return Array.from(
//       new Set(permissions.map((p) => p.split(":")[0])) // "administration" from "administration:bed:view"
//     );
//   }, [user]);

//   // ✔ Load and filter masters based on module access
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);

//       const masters = await fetchMasters();

//       // Add moduleKey from masterConfig.route
//       const mastersWithModule = masters.map((m) => {
//         const config = masterConfig[m.title];
//         const route = config?.route;

//         return {
//           ...m,
//           route,
//           addOptions: config?.addOptions,
//           moduleKey: route ? getModuleFromRoute(route) : "other",
//         };
//       });

//       // Filter based on user module permissions
//       const visibleMasters = mastersWithModule.filter((m) =>
//         userModules.includes(m.moduleKey!)
//       );

//       setData(visibleMasters);

//       setLoading(false);
//     };

//     load();
//   }, [userModules]);

//   // ✔ Apply search filter
//   const filtered = data.filter((d) =>
//     d.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // ✔ Group by category
//   const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
//     (acc[curr.category] ??= []).push(curr);
//     return acc;
//   }, {});

//   return (
//     <main className="min-h-svh w-full">
//       <Header />

//       <div className="p-6 space-y-0 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">

//         {/* Floating Search Box */}
//         <div className="relative">
//           <div className="absolute top-0 right-6 z-20">
//             <div className="relative w-64">
//               <Input
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pr-9 bg-white shadow-lg border border-gray-200 focus:ring-1 focus:ring-blue-300"
//               />
//               <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         {/* Loading Skeleton */}
//         {loading ? (
//           <div className="space-y-10">
//             {[1, 2, 3].map((section) => (
//               <div key={section} className="space-y-4">
//                 <Skeleton className="h-6 w-48 bg-gray-200" />
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                   {Array.from({ length: 4 }).map((_, i) => (
//                     <Skeleton
//                       key={i}
//                       className="h-32 rounded-lg bg-gray-200"
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           Object.entries(grouped).map(([category, items]) => (
//             <DashboardSection key={category} title={category} items={items} />
//           ))
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { DashboardSection } from "./_components/dashboard-section";
import { Header } from "@/components/header";
import { fetchMasters } from "./_components/fecth-master";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { masterConfig } from "./_components/fecth-master";
import { useUserStore } from "@/store/useUserStore";
import { Dictionary } from "@/i18n/get-dictionary";
import { useDictionary } from "@/i18n/use-dictionary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";
import { createDepartmentApiClient } from "@/lib/api/administration/department";
import { createWardApiClient } from "@/lib/api/administration/wards";
import AddDepartmentModal from "../department/_components/AddDepartmentModal";
import { AddWardDialog } from "../units-wards-beds/_components/AddWardDialog";
import { AddBedDialog } from "../units-wards-beds/_components/AddBedDialog";
import { AddBedTypeDialog } from "../units-wards-beds/_components/AddBedTypeDialog";
import { AddFloorDialog } from "../units-wards-beds/_components/AddFloorDialog";
import { AddOperationTheatreDialog } from "../operation-theatres/_components/AddOperationTheatreDialog";
import { AddDialog as AddUserDialog } from "../user/_components/AddDialog";
import { AddDialog as AddOperationDialog } from "../operation/_components/AddDialog";
import { AddRoleDialog } from "../roles/_components/AddDialog";
import AddChargeDialog from "../charges/_components/AddSingleDialog";

import { createRoleApiClient } from "@/lib/api/administration/roles";
import { getAuthToken } from "@/app/utils/onboarding";
import { getIdToken } from "@/app/utils/auth";
import { createOperationTheatreApiClient } from "@/lib/api/administration/operation-theatres";

/* ------------------------------------------------------------
    Modals & Actions
------------------------------------------------------------ */

interface MasterData {
  id: string;
  title: string;
  subtitle: string;
  active: number;
  category: string;
  route?: string;
  addOptions?: string[];
  // submoduleKey?: string;
  submoduleKeys?: string[];
}

export default function MastersPage() {
  const user = useUserStore((s) => s.user);

  const [data, setData] = useState<MasterData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dict = useDictionary();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      setAuthToken(token);
    };
    loadToken();
  }, []);

  /* ------------------------------------------------------------
      Extract allowed submodules from user permissions
      administration:department:view → department
  ------------------------------------------------------------ */
  // const allowedSubmodules = useMemo(() => {
  //   const permissions = (user?.role?.permissions || []) as string[];

  //   return Array.from(
  //     new Set(
  //       permissions
  //         .filter((p) => p.startsWith("administration:"))
  //         .map((p) => p.split(":")[1]) // extract submodule
  //     )
  //   );
  // }, [user]);

  // Required for all 
  // const allowedSubmodules = useMemo(() => {
  //   const permissionStrings = (user?.role?.permissions || []).map((p: any) =>
  //     typeof p === "string" ? p : p.name
  //   );

  //   return Array.from(
  //     new Set(
  //       permissionStrings
  //         .filter((p) => p.startsWith("administration:"))
  //         .map((p) => p.split(":")[1]) // extract submodule
  //     )
  //   );
  // }, [user]);

  // temprerory fix
  const allowedSubmodules = useMemo(() => {
    const permissionStrings = (user?.role?.permissions || []).map((p: any) =>
      typeof p === "string" ? p : p.name
    );

    // normal extraction (your existing logic)
    const subs = Array.from(
      new Set(
        permissionStrings
          .filter((p) => p.startsWith("administration:"))
          .map((p) => p.split(":")[1])
      )
    );

    // SPECIAL RULE FOR "user" SUBMODULE
    const userPermissions = permissionStrings.filter((p) =>
      p.startsWith("administration:user:")
    );

    const hasOnlyViewOne =
      userPermissions.length === 1 &&
      userPermissions[0].endsWith("viewOne");

    // If user ONLY has viewOne → remove "user" from allowed list
    if (hasOnlyViewOne) {
      return subs.filter((s) => s !== "user");
    }

    return subs;
  }, [user]);

  /* ------------------------------------------------------------
      Load masters and assign submoduleKey from masterConfig
  ------------------------------------------------------------ */
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const masters = await fetchMasters({ dict });

      // attach config and submoduleKey
      const mastersWithKeys = masters
        .map((m) => {
          const config = masterConfig[m.id];
          // console.log("masterConfig:", m.id, config);
          if (!config) return null;

          return {
            ...m,
            route: config.route,
            addOptions: config.addOptions,
            submoduleKeys: config.submoduleKeys,
          };
        })
        .filter(Boolean) as MasterData[];

      // debug: show masters mapped to submodule keys
      // if (typeof console !== "undefined") {
      //   console.log(
      //     "mastersWithKeys:",
      //     mastersWithKeys.map((m) => ({ title: m.title, submoduleKeys: m.submoduleKeys }))
      //   );
      // }
      // filter by allowed submodules
      // const visibleMasters = mastersWithKeys.filter((m) =>
      //   allowedSubmodules.includes(m.submoduleKey!)
      // );
      const visibleMasters = mastersWithKeys.filter((m) =>
        m.submoduleKeys?.some((key) => allowedSubmodules.includes(key))
      );

      // if (typeof console !== "undefined") {
      //   console.log("visibleMasters:", visibleMasters.map((m) => m.title));
      // }
      setData(visibleMasters);
      setLoading(false);
    };

    load();
  }, [allowedSubmodules]);

  /* ------------------------------------------------------------
      Search filter
  ------------------------------------------------------------ */
  const filtered = data.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ------------------------------------------------------------
      Group by category
  ------------------------------------------------------------ */
  const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
    (acc[curr.category] ??= []).push(curr);
    return acc;
  }, {});

  /* ------------------------------------------------------------
      Modals & Actions
  ------------------------------------------------------------ */
  const [activeModal, setActiveModal] = useState<{ type: string; props?: any } | null>(null);

  const handleAction = (id: string, option: string) => {
    // console.log("Action:", id, option);
    if (id === "Departments" && option === "Department") {
      setActiveModal({ type: "DEPARTMENT" });
    }
    if (id === "Ward/ Beds") {
      if (option === "Ward") setActiveModal({ type: "WARD" });
      if (option === "Bed") setActiveModal({ type: "BED" });
      if (option === "Bed Type") setActiveModal({ type: "BED_TYPE" });
      if (option === "Floor") setActiveModal({ type: "FLOOR" });
    }
    if (id === "Operation Theatres / Procedure Rooms") {
      if (option === "Theatre") setActiveModal({ type: "OT" });
      // if (option === "Procedure Room") setActiveModal({ type: "PROCEDURE_ROOM" }); // Todo
    }
    if (id === "User" && option === "User") {
      setActiveModal({ type: "USER" });
    }
    if (id === "Operation / Operation Category") {
      if (option === "Operation") setActiveModal({ type: "OPERATION" });
      if (option === "Operation Category") setActiveModal({ type: "OPERATION_CATEGORY" });
    }
    if (id === "Roles" && option === "Roles") {
      setActiveModal({ type: "ROLE" });
    }
    if (id === "Charges") {
      if (option === "Category") setActiveModal({ type: "CHARGE_CATEGORY" });
      if (option === "Tax") setActiveModal({ type: "CHARGE_TAX" });
      if (option === "Unit") setActiveModal({ type: "CHARGE_UNIT" });
    }
  };

  /* -------------------- API Clients -------------------- */
  const queryClient = useQueryClient();
  const departmentApi = authToken ? createDepartmentApiClient({ authToken }) : null;
  const wardApi = authToken ? createWardApiClient({}) : null;
  const roleApi = createRoleApiClient({});
  const otApi = createOperationTheatreApiClient({ baseUrl: undefined });

  /* -------------------- Mutations (Departments) -------------------- */
  const createDeptMutation = useMutation({
    mutationFn: async (payload: any) => departmentApi!.createDepartment(payload),
    onSuccess: () => {
      toast.success("Department added successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  /* -------------------- Mutations (Wards/Beds) -------------------- */
  // NOTE: Assuming createWardApiClient has methods like createWard, createBed, etc.
  // If not, we might need to verify the API client structure.

  const createWardMutation = useMutation({
    mutationFn: async (payload: any) => wardApi!.createWard(payload),
    onSuccess: () => {
      toast.success("Ward added successfully");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const createBedMutation = useMutation({
    mutationFn: async (payload: any) => wardApi!.createBed(payload),
    onSuccess: () => {
      toast.success("Bed added successfully");
      queryClient.invalidateQueries({ queryKey: ["beds"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const createBedTypeMutation = useMutation({
    mutationFn: async (payload: any) => wardApi!.createBedType(payload),
    onSuccess: () => {
      toast.success("Bed Type added successfully");
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const createFloorMutation = useMutation({
    mutationFn: async (payload: any) => wardApi!.createFloor(payload),
    onSuccess: () => {
      toast.success("Floor added successfully");
      queryClient.invalidateQueries({ queryKey: ["floors"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const createOTMutation = useMutation({
    mutationFn: async (payload: any) => otApi.create(payload),
    onSuccess: () => {
      toast.success("Operation Theatre added successfully");
      queryClient.invalidateQueries({ queryKey: ["operationTheatres"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const createRoleMutation = useMutation({
    mutationFn: async (payload: any) => roleApi.createRole(payload),
    onSuccess: () => {
      toast.success("Role added successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setActiveModal(null);
    },
    onError: (err: any) => toast.error(err.message),
  });


  /* ------------------------------------------------------------
      Render
  ------------------------------------------------------------ */
  return (
    <main className="min-h-svh w-full">
      <div className="p-6 space-y-0 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">

        {/* Floating Search Box */}
        <div className="relative">
          <div className="absolute top-0 right-6 z-20">
            <div className="relative w-64">
              <Input
                placeholder={dict.common.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 bg-white shadow-lg border border-gray-200 focus:ring-1 focus:ring-blue-300"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-10 mt-10">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-6 w-48 bg-gray-200" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-lg bg-gray-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <DashboardSection
              key={category}
              title={category}
              id={category}
              items={items}
              onAction={handleAction}
            />
          ))
        )}
      </div>

      {/* DEPARTMENT MODAL */}
      {activeModal?.type === "DEPARTMENT" && (
        <AddDepartmentModal
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(departments) => {
            departments.forEach((d) =>
              createDeptMutation.mutate({
                department_name: d.name,
                status: d.active ? "active" : "inactive",
              })
            );
          }}
        />
      )}

      {/* WARD MODAL */}
      {activeModal?.type === "WARD" && (
        <AddWardDialog
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(v) => createWardMutation.mutate(v)}
          wardTypes={[]} // TODO: Fetch ward types
          floors={[]}    // TODO: Fetch floors
        />
      )}

      {/* BED MODAL */}
      {activeModal?.type === "BED" && (
        <AddBedDialog
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(v) => createBedMutation.mutate(v)}
        />
      )}

      {/* BED TYPE MODAL */}
      {activeModal?.type === "BED_TYPE" && (
        <AddBedTypeDialog
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(v) => createBedTypeMutation.mutate(v)}
        />
      )}

      {/* FLOOR MODAL */}
      {activeModal?.type === "FLOOR" && (
        <AddFloorDialog
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(v) => createFloorMutation.mutate(v)}
        />
      )}

      {/* OPERATION THEATRE MODAL */}
      {activeModal?.type === "OT" && (
        <AddOperationTheatreDialog
          open={true}
          onClose={() => setActiveModal(null)}
          onSave={(v) => createOTMutation.mutate(v)}
        />
      )}

      {/* USER MODAL */}
      {activeModal?.type === "USER" && (
        <AddUserDialog
          open={true}
          onClose={() => setActiveModal(null)}
          mode="users"
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setActiveModal(null);
          }}
        />
      )}

      {/* OPERATION MODAL */}
      {(activeModal?.type === "OPERATION" || activeModal?.type === "OPERATION_CATEGORY") && (
        <AddOperationDialog
          open={true}
          onClose={() => setActiveModal(null)}
          mode={activeModal.type === "OPERATION" ? "operation" : "operationCategory"}
          onSave={() => {
            // AddDialog handles mutation internally but calls onSave
            queryClient.invalidateQueries({ queryKey: ["operations"] });
            setActiveModal(null);
          }}
        />
      )}

      {/* ROLE MODAL */}
      {activeModal?.type === "ROLE" && (
        <AddRoleDialog
          open={true}
          onClose={() => setActiveModal(null)}
          mode="add"
          onSave={(v) => createRoleMutation.mutate({ ...v, status: v.active ? "active" : "inactive" })}
        />
      )}

      {/* CHARGE MODAL */}
      {(activeModal?.type === "CHARGE_CATEGORY" || activeModal?.type === "CHARGE_TAX" || activeModal?.type === "CHARGE_UNIT") && (
        <AddChargeDialog
          open={true}
          onClose={() => setActiveModal(null)}
          mode={
            activeModal.type === "CHARGE_CATEGORY" ? "category" :
              activeModal.type === "CHARGE_TAX" ? "tax" : "unit"
          }
          onSaved={() => {
            queryClient.invalidateQueries({ queryKey: ["charges"] });
            setActiveModal(null);
          }}
        />
      )}
    </main>
  );
}
