"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import {
  Building2,
  Activity,
  Pill,
  FileText,
  Boxes,
  BarChart3,
  Settings,
  Cog,
  ChevronDown,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

const sections = [
  { label: "Hospital", icon: Building2 },
  { label: "Diagnostics", icon: Activity },
  { label: "Pharmacy", icon: Pill },
  { label: "Billing & Insurance", icon: FileText },
  { label: "Inventory", icon: Boxes },
  { label: "Reports & Analytics", icon: BarChart3 },
  { label: "Administration", icon: Cog },
  { label: "Settings", icon: Settings },
];

export function SectionDropdown() {
  const [selected, setSelected] = React.useState("Administration");

  return (
    <div className="flex flex-col items-center mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
          >
            <Cog className="h-4 w-4 text-green-300" />
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = selected === section.label;
            return (
              <DropdownMenuItem
                key={section.label}
                onClick={() => setSelected(section.label)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] cursor-pointer transition-colors",
                  isActive
                    ? "bg-green-500 text-white font-medium"
                    : "hover:bg-green-50 text-gray-700"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-white" : "text-gray-600"
                  )}
                />
                {section.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}




// "use client";

// import * as React from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { Button } from "@workspace/ui/components/button";
// import { ChevronDown, Loader2, Settings } from "lucide-react";
// import { cn } from "@workspace/ui/lib/utils";
// import Image from "next/image";
// import { useQuery } from "@tanstack/react-query";
// import { TenantModule } from "@/lib/api/tenants";
// import { getTenantData, getTenantId } from "@/lib/api/onboarding";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { refreshCognitoToken } from "@/lib/api/auth";

// // interface SectionDropdownProps {
// //   tenantId: string;
// //   authToken: string;
// // }

// export function SectionDropdown() {
//   const [selected, setSelected] = React.useState<string>("");
//   const [isLoadings, setIsLoadings] = React.useState(true)
//   const [tenantId, setTenantId] = React.useState<string | null>(null)
//   const [errors, setErrors] = React.useState<string | null>(null)
//   const router = useRouter()
//   const params = useParams()
//   const tenant = params?.tenant as string
//   // const { data, isLoading, error } = useQuery({
//   //   queryKey: ["tenant-modules", tenantId],
//   //   queryFn: async () => {
//   //     const api = createTenantsApiClient({ authToken });
//   //     const response = await api.getTenantById(tenantId);
//   //     return response.data.data.tenant_modules || [];
//   //   },
//   //   enabled: !!tenantId,
//   // });


//   // Fetch tenant data with all related arrays using React Query
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["tenant", tenant],
//     queryFn: async () => {
//       if (!tenant) throw new Error("Tenant ID is required")
//       return await getTenantData(tenant)
//     },
//     enabled: !!tenant,
//   })

//   // Helper function to check if authentication token exists
//   const hasAuthToken = async (): Promise<boolean> => {
//     try {
//       await refreshCognitoToken()
//       return true
//     } catch {
//       return false
//     }
//   }


//   // Helper function to get base domain URL for error redirect
//   const getBaseDomainUrl = (path: string): string => {
//     if (typeof window === "undefined") return path
//     const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "lvh.me"
//     const protocol = window.location.protocol
//     const port = window.location.port ? `:${window.location.port}` : ""
//     return `${protocol}//${baseDomain}${port}${path}`
//   }

//   // Fetch tenant ID
//   React.useEffect(() => {
//     const initialize = async () => {
//       try {
//         // Check if authentication token exists
//         const tokenExists = await hasAuthToken()

//         if (!tenant) {
//           // No tenant parameter - redirect based on token existence
//           window.location.href = getBaseDomainUrl("/error/no-tenant")
//           return
//         }

//         // Get tenant ID from tenant slug
//         try {
//           const id = await getTenantId(tenant)
//           if (!id) {
//             // No tenant ID found - redirect based on token existence
//             if (!tokenExists) {
//               // No token, redirect to error page on base domain
//               router.push("/login")
//             } else {
//               // Token exists, redirect to login page
//               // window.location.href = getBaseDomainUrl("/error/no-tenant")
//             }
//             return
//           }
//           setTenantId(id)
//         } catch (error) {
//           console.error("Failed to get tenant ID:", error)
//           // getTenantId failed - redirect based on token existence
//           if (!tokenExists) {
//             // No token, redirect to error page on base domain
//             router.push("/login")
//           } else {
//             // Token exists, redirect to login page
//             // window.location.href = getBaseDomainUrl("/error/no-tenant")
//           }
//         }
//       } catch (error) {
//         console.error("Failed to initialize:", error)
//         setErrors("Failed to initialize. Please try again.")
//       } finally {
//         setIsLoadings(false)
//       }
//     }

//     initialize()
//   }, [tenant, router])


//   console.log(data)


//   // const modules = (data ?? []) as TenantModule[];
//   console.log(data)
//   // const modules = (data ?? []) as TenantModule[];


//   // React.useEffect(() => {
//   //   if (modules.length > 0 && !selected) {
//   //     setSelected(modules[0].name_en);
//   //   }
//   // }, [modules, selected]);

//   return (
//     <div className="flex flex-col items-center mt-0">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="default"
//             className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
//           >
//             {isLoading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Settings className="h-4 w-4 text-green-300" />
//             )}
//             <span>{selected || "Select Module"}</span>
//             <ChevronDown className="h-4 w-4 ml-1" />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
//         >
//           {isLoading && (
//             <div className="p-3 text-center text-sm text-gray-500">
//               Loading modules...
//             </div>
//           )}

//           {error && (
//             <div className="p-3 text-center text-sm text-red-500">
//               Failed to load modules
//             </div>
//           )}

//           {/* {!isLoading && modules.length === 0 && !error && (
//             <div className="p-3 text-center text-sm text-gray-500">
//               No modules found
//             </div>
//           )}

//           {!isLoading &&
//             !error &&
//             modules.map((mod) => {
//               const isActive = selected === mod.name_en;
//               return (
//                 <DropdownMenuItem
//                   key={mod.id}
//                   onClick={() => setSelected(mod.name_en)}
//                   className={cn(
//                     "flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] cursor-pointer transition-colors",
//                     isActive
//                       ? "bg-green-500 text-white font-medium"
//                       : "hover:bg-green-50 text-gray-700"
//                   )}
//                 >
//                   {mod.icon_url ? (
//                     <Image
//                       src={mod.icon_url}
//                       alt={mod.name_en}
//                       width={18}
//                       height={18}
//                       className={cn(
//                         "rounded-sm",
//                         isActive ? "opacity-100" : "opacity-80"
//                       )}
//                     />
//                   ) : (
//                     <span className="w-4 h-4 bg-gray-300 rounded-sm" />
//                   )}
//                   {mod.name_en}
//                 </DropdownMenuItem>
//               );
//             })} */}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }
