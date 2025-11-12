// // import { Button } from "@workspace/ui/components/button"
// // import { headers } from "next/headers"
// // import Link from "next/link"

// // export default async function Dashboard({
// //   params,
// // }: {
// //   params: Promise<{ tenant: string }>
// // }) {
// //   const headersList = await headers()
// //   const { tenant: paramTenant } = await params
// //   const tenant = headersList.get("x-tenant") ?? paramTenant

// //   return (
// //     <div className="min-h-svh p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex items-center justify-between mb-8">
// //           <div>
// //             <h1 className="text-3xl font-bold">Dashboard</h1>
// //             <p className="text-muted-foreground">Hospital: {tenant}</p>
// //           </div>
// //           <Link href="/">
// //             <Button variant="outline">Back to Home</Button>
// //           </Link>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <div className="p-6 border rounded-lg">
// //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// //               Total Patients
// //             </h3>
// //             <p className="text-3xl font-bold">1,234</p>
// //             <p className="text-xs text-green-500 mt-2">+12% from last month</p>
// //           </div>
// //           <div className="p-6 border rounded-lg">
// //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// //               Appointments Today
// //             </h3>
// //             <p className="text-3xl font-bold">56</p>
// //             <p className="text-xs text-blue-500 mt-2">8 pending confirmation</p>
// //           </div>
// //           <div className="p-6 border rounded-lg">
// //             <h3 className="text-sm font-medium text-muted-foreground mb-2">
// //               Staff on Duty
// //             </h3>
// //             <p className="text-3xl font-bold">42</p>
// //             <p className="text-xs text-muted-foreground mt-2">
// //               Out of 68 total
// //             </p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="p-6 border rounded-lg">
// //             <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
// //             <div className="space-y-2">
// //               <Button variant="outline" className="w-full justify-start">
// //                 Add New Patient
// //               </Button>
// //               <Button variant="outline" className="w-full justify-start">
// //                 Schedule Appointment
// //               </Button>
// //               <Button variant="outline" className="w-full justify-start">
// //                 View Reports
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="p-6 border rounded-lg">
// //             <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
// //             <div className="space-y-3 text-sm">
// //               <div className="flex justify-between">
// //                 <span>New patient registered</span>
// //                 <span className="text-muted-foreground">5 min ago</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Appointment completed</span>
// //                 <span className="text-muted-foreground">12 min ago</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Lab result uploaded</span>
// //                 <span className="text-muted-foreground">1 hour ago</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { DashboardSection } from "./_components/dashboard-section";
// import { Header } from "@/components/header";
// import { fetchMasters } from "./_components/fecth-master";
// import { SearchIcon } from "lucide-react";

// interface MasterData {
//   title: string;
//   subtitle: string;
//   active: number;
//   category: string;
// }

// export default function MastersPage() {
//   const [data, setData] = useState<MasterData[]>([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchMasters().then(setData);
//   }, []);

//   const filtered = data.filter((d) =>
//     d.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
//     acc[curr.category] = acc[curr.category] || [];
//     acc[curr.category].push(curr);
//     return acc;
//   }, {});

//   return (
//     <main className="min-h-svh w-full">
//       <Header />
//       <div className="p-6 space-y-8 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold">Masters Setup</h1>
//           <div>
//             <Input
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-64"
//             />
//             <SearchIcon />
//           </div>

//         </div>

//         {Object.entries(grouped).map(([category, items]) => (
//           <DashboardSection key={category} title={category} items={items} />
//         ))}
//       </div>
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { DashboardSection } from "./_components/dashboard-section";
import { Header } from "@/components/header";
import { fetchMasters } from "./_components/fecth-master";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface MasterData {
  title: string;
  subtitle: string;
  active: number;
  category: string;
}

export default function MastersPage() {
  const [data, setData] = useState<MasterData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const masters = await fetchMasters();
      // simulate delay
      // setTimeout(() => {
      setData(masters);
      setLoading(false);
      // }, 1200);
    };
    load();
  }, []);

  const filtered = data.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  // const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
  //   acc[curr.category] = acc[curr.category] || [];
  //   acc[curr.category].push(curr);
  //   return acc;
  // }, {});

  const grouped = filtered.reduce<Record<string, MasterData[]>>((acc, curr) => {
    (acc[curr.category] ??= []).push(curr);
    return acc;
  }, {});


  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 space-y-0 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        {/* Header Row */}

        {/* Search with icon inside */}
        {/* <div className="flex justify-end items-center">
          <div className="relative w-64 ">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 bg-white"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div> */}

        {/* Floating Search Bar */}
        {/* Search Area (floating absolute inside container) */}
        <div className="relative">
          {/* Floating Search Box */}
          <div className="absolute top-0 right-6 z-20">
            <div className="relative w-64">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 bg-white shadow-lg border border-gray-200 focus:ring-1 focus:ring-blue-300"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>


        {/* Loading State */}
        {loading ? (
          <div className="space-y-10">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-6 w-48 bg-gray-200" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-32 rounded-lg bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <DashboardSection key={category} title={category} items={items} />
          ))
        )}
      </div>
    </main>
  );
}
