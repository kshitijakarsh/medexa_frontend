// "use client"

// import * as React from "react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu"
// import { Button } from "@workspace/ui/components/button"
// import {
//   Building2,
//   Activity,
//   Pill,
//   FileText,
//   Boxes,
//   BarChart3,
//   Settings,
//   Cog,
//   ChevronDown,
//   Loader2,
//   Calendar,
//   Users,
//   FlaskConical,
//   Briefcase,
// } from "lucide-react"
// import { cn } from "@workspace/ui/lib/utils"
// import { getAuthToken, getTenantFromHostname } from "@/app/utils/onboarding"
// import { getTenantId } from "@/lib/api/onboarding"
// import { createTenantApiClient } from "@/lib/api/tenant"
// import { createModulesApiClient, type Module } from "@/lib/api/module"
// import type { LucideIcon } from "lucide-react"

// interface Section {
//   label: string
//   icon: LucideIcon
//   moduleKey?: string
// }

// // Mapping from module_key to icon (case-insensitive, handles both formats)
// const moduleIconMap: Record<string, LucideIcon> = {
//   // Actual module keys from API (uppercase with underscores)
//   analytics: BarChart3,
//   appointment: Calendar,
//   billing: FileText,
//   patient_mgmt: Users,
//   hr_payroll: Briefcase,
//   lab: FlaskConical,
//   pharmacy: Pill,
//   // Legacy/alternative keys (lowercase, no underscores)
//   hospital: Building2,
//   diagnostics: Activity,
//   insurance: FileText,
//   inventory: Boxes,
//   reports: BarChart3,
//   administration: Cog,
//   admin: Cog,
//   settings: Settings,
// }

// // Default icon for unmapped modules
// const DefaultIcon = Cog

// export function SectionDropdown() {
//   const tenantSlug = getTenantFromHostname()

//   const [selected, setSelected] = React.useState("Administration")
//   const [sections, setSections] = React.useState<Section[]>([])
//   const [loading, setLoading] = React.useState(true)
//   const [error, setError] = React.useState<string | null>(null)

//   React.useEffect(() => {
//     if (!tenantSlug) {
//       setLoading(false)
//       return
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         // Get auth token
//         const token = await getAuthToken()

//         // Get tenant ID
//         const tenantId = await getTenantId(tenantSlug)

//         // Fetch tenant data and all modules in parallel
//         const tenantClient = createTenantApiClient({ authToken: token })
//         const modulesClient = createModulesApiClient({ authToken: token })

//         const [tenantResponse, modulesResponse] = await Promise.all([
//           tenantClient.getTenantById(tenantId),
//           modulesClient.getModules(),
//         ])

//         const tenant = tenantResponse.data.data
//         const modules = modulesResponse.data.data

//         // Get tenant modules
//         const tenantModules = tenant.tenant_modules || []

//         // Create a map of module id to module for quick lookup
//         const moduleMap = new Map<string, Module>()
//         modules.forEach((module) => {
//           moduleMap.set(String(module.id), module)
//         })

//         // Match tenant_modules.module_id to modules.id and create sections
//         const dynamicSections: Section[] = []
//         for (const tenantModule of tenantModules) {
//           // Match by module_id (from tenant_modules) to id (from modules)
//           // tenant_modules contains objects with module_id field, not full Module objects
//           const moduleId = String(
//             (tenantModule as any).module_id || (tenantModule as any).id
//           )
//           const module = moduleMap.get(moduleId)

//           if (!module) {
//             continue
//           }

//           // Get icon from mapping or use default
//           const icon =
//             moduleIconMap[module.module_key.toLowerCase()] || DefaultIcon

//           // Use module name_en as label, or fallback to module_key
//           const label = module.name_en || module.module_key

//           if (!label) {
//             continue
//           }

//           dynamicSections.push({
//             label,
//             icon,
//             moduleKey: module.module_key,
//           })
//         }

//         // If no sections found, use default sections
//         if (dynamicSections.length === 0) {
//           setSections([
//             { label: "Administration", icon: Cog, moduleKey: "administration" },
//           ])
//         } else {
//           setSections(dynamicSections)
//         }

//         // Set default selected to first module in the array
//         if (dynamicSections.length > 0 && dynamicSections[0]) {
//           setSelected(dynamicSections[0].label)
//         }
//       } catch (err) {
//         console.error("Failed to fetch sections:", err)
//         setError(err instanceof Error ? err.message : "Failed to load sections")
//         // Fallback to default sections on error
//         setSections([
//           { label: "Administration", icon: Cog, moduleKey: "administration" },
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [tenantSlug])

//   // Get icon for selected section
//   const selectedSection = sections.find((s) => s.label === selected)
//   const SelectedIcon = selectedSection?.icon || Cog

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center mt-0">
//         <Button
//           variant="default"
//           disabled
//           className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
//         >
//           <Loader2 className="h-4 w-4 text-green-300 animate-spin" />
//           <span>Loading...</span>
//         </Button>
//       </div>
//     )
//   }

//   if (error && sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center mt-0">
//         <Button
//           variant="default"
//           className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
//         >
//           <Cog className="h-4 w-4 text-green-300" />
//           <span>Administration</span>
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center mt-0">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="default"
//             className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
//           >
//             <SelectedIcon className="h-4 w-4 text-green-300" />
//             <span>{selected}</span>
//             <ChevronDown className="h-4 w-4 ml-1" />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
//         >
//           {sections.length === 0 ? (
//             <DropdownMenuItem
//               disabled
//               className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] text-gray-500"
//             >
//               No sections available
//             </DropdownMenuItem>
//           ) : (
//             sections.map((section) => {
//               const Icon = section.icon
//               const isActive = selected === section.label
//               return (
//                 <DropdownMenuItem
//                   key={section.label}
//                   onClick={() => setSelected(section.label)}
//                   className={cn(
//                     "flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] cursor-pointer transition-colors",
//                     isActive
//                       ? "bg-green-500 text-white font-medium"
//                       : "hover:bg-green-50 text-gray-700"
//                   )}
//                 >
//                   <Icon
//                     className={cn(
//                       "h-4 w-4",
//                       isActive ? "text-white" : "text-gray-600"
//                     )}
//                   />
//                   {section.label}
//                 </DropdownMenuItem>
//               )
//             })
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )
// }

// // "use client";

// // import * as React from "react";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@workspace/ui/components/dropdown-menu";
// // import { Button } from "@workspace/ui/components/button";
// // import { ChevronDown, Loader2, Settings } from "lucide-react";
// // import { cn } from "@workspace/ui/lib/utils";
// // import Image from "next/image";
// // import { useQuery } from "@tanstack/react-query";
// // import { TenantModule } from "@/lib/api/tenants";
// // import { getTenantData, getTenantId } from "@/lib/api/onboarding";
// // import { useParams } from "next/navigation";
// // import { useRouter } from "next/navigation";
// // import { refreshCognitoToken } from "@/lib/api/auth";

// // // interface SectionDropdownProps {
// // //   tenantId: string;
// // //   authToken: string;
// // // }

// // export function SectionDropdown() {
// //   const [selected, setSelected] = React.useState<string>("");
// //   const [isLoadings, setIsLoadings] = React.useState(true)
// //   const [tenantId, setTenantId] = React.useState<string | null>(null)
// //   const [errors, setErrors] = React.useState<string | null>(null)
// //   const router = useRouter()
// //   const params = useParams()
// //   const tenant = params?.tenant as string
// //   // const { data, isLoading, error } = useQuery({
// //   //   queryKey: ["tenant-modules", tenantId],
// //   //   queryFn: async () => {
// //   //     const api = createTenantsApiClient({ authToken });
// //   //     const response = await api.getTenantById(tenantId);
// //   //     return response.data.data.tenant_modules || [];
// //   //   },
// //   //   enabled: !!tenantId,
// //   // });

// //   // Fetch tenant data with all related arrays using React Query
// //   const { data, isLoading, error } = useQuery({
// //     queryKey: ["tenant", tenant],
// //     queryFn: async () => {
// //       if (!tenant) throw new Error("Tenant ID is required")
// //       return await getTenantData(tenant)
// //     },
// //     enabled: !!tenant,
// //   })

// //   // Helper function to check if authentication token exists
// //   const hasAuthToken = async (): Promise<boolean> => {
// //     try {
// //       await refreshCognitoToken()
// //       return true
// //     } catch {
// //       return false
// //     }
// //   }

// //   // Helper function to get base domain URL for error redirect
// //   const getBaseDomainUrl = (path: string): string => {
// //     if (typeof window === "undefined") return path
// //     const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "lvh.me"
// //     const protocol = window.location.protocol
// //     const port = window.location.port ? `:${window.location.port}` : ""
// //     return `${protocol}//${baseDomain}${port}${path}`
// //   }

// //   // Fetch tenant ID
// //   React.useEffect(() => {
// //     const initialize = async () => {
// //       try {
// //         // Check if authentication token exists
// //         const tokenExists = await hasAuthToken()

// //         if (!tenant) {
// //           // No tenant parameter - redirect based on token existence
// //           window.location.href = getBaseDomainUrl("/error/no-tenant")
// //           return
// //         }

// //         // Get tenant ID from tenant slug
// //         try {
// //           const id = await getTenantId(tenant)
// //           if (!id) {
// //             // No tenant ID found - redirect based on token existence
// //             if (!tokenExists) {
// //               // No token, redirect to error page on base domain
// //               router.push("/login")
// //             } else {
// //               // Token exists, redirect to login page
// //               // window.location.href = getBaseDomainUrl("/error/no-tenant")
// //             }
// //             return
// //           }
// //           setTenantId(id)
// //         } catch (error) {
// //           console.error("Failed to get tenant ID:", error)
// //           // getTenantId failed - redirect based on token existence
// //           if (!tokenExists) {
// //             // No token, redirect to error page on base domain
// //             router.push("/login")
// //           } else {
// //             // Token exists, redirect to login page
// //             // window.location.href = getBaseDomainUrl("/error/no-tenant")
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Failed to initialize:", error)
// //         setErrors("Failed to initialize. Please try again.")
// //       } finally {
// //         setIsLoadings(false)
// //       }
// //     }

// //     initialize()
// //   }, [tenant, router])

// //   console.log(data)

// //   // const modules = (data ?? []) as TenantModule[];
// //   console.log(data)
// //   // const modules = (data ?? []) as TenantModule[];

// //   // React.useEffect(() => {
// //   //   if (modules.length > 0 && !selected) {
// //   //     setSelected(modules[0].name_en);
// //   //   }
// //   // }, [modules, selected]);

// //   return (
// //     <div className="flex flex-col items-center mt-0">
// //       <DropdownMenu>
// //         <DropdownMenuTrigger asChild>
// //           <Button
// //             variant="default"
// //             className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
// //           >
// //             {isLoading ? (
// //               <Loader2 className="h-4 w-4 animate-spin" />
// //             ) : (
// //               <Settings className="h-4 w-4 text-green-300" />
// //             )}
// //             <span>{selected || "Select Module"}</span>
// //             <ChevronDown className="h-4 w-4 ml-1" />
// //           </Button>
// //         </DropdownMenuTrigger>

// //         <DropdownMenuContent
// //           align="start"
// //           className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
// //         >
// //           {isLoading && (
// //             <div className="p-3 text-center text-sm text-gray-500">
// //               Loading modules...
// //             </div>
// //           )}

// //           {error && (
// //             <div className="p-3 text-center text-sm text-red-500">
// //               Failed to load modules
// //             </div>
// //           )}

// //           {/* {!isLoading && modules.length === 0 && !error && (
// //             <div className="p-3 text-center text-sm text-gray-500">
// //               No modules found
// //             </div>
// //           )}

// //           {!isLoading &&
// //             !error &&
// //             modules.map((mod) => {
// //               const isActive = selected === mod.name_en;
// //               return (
// //                 <DropdownMenuItem
// //                   key={mod.id}
// //                   onClick={() => setSelected(mod.name_en)}
// //                   className={cn(
// //                     "flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] cursor-pointer transition-colors",
// //                     isActive
// //                       ? "bg-green-500 text-white font-medium"
// //                       : "hover:bg-green-50 text-gray-700"
// //                   )}
// //                 >
// //                   {mod.icon_url ? (
// //                     <Image
// //                       src={mod.icon_url}
// //                       alt={mod.name_en}
// //                       width={18}
// //                       height={18}
// //                       className={cn(
// //                         "rounded-sm",
// //                         isActive ? "opacity-100" : "opacity-80"
// //                       )}
// //                     />
// //                   ) : (
// //                     <span className="w-4 h-4 bg-gray-300 rounded-sm" />
// //                   )}
// //                   {mod.name_en}
// //                 </DropdownMenuItem>
// //               );
// //             })} */}
// //         </DropdownMenuContent>
// //       </DropdownMenu>
// //     </div>
// //   );
// // }

"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
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
  Loader2,
  Calendar,
  Users,
  FlaskConical,
  Briefcase,
  BriefcaseMedical,
  IdCard,
  Syringe,
  Building,
  Stethoscope,
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useUserStore } from "@/store/useUserStore"
import { usePathname, useRouter } from "next/navigation"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"
import { Locale, locales } from "@/i18n/locales"
import { useDictionary } from "@/i18n/use-dictionary"


const moduleIconMap: Record<string, any> = {
  analytics: BarChart3,
  appointment: Calendar,
  billing: FileText,
  patient_mgmt: Users,
  hr_payroll: Briefcase,
  hr: IdCard,
  lab: FlaskConical,
  pharmacy: Pill,
  doctor: Stethoscope,

  hospital: Building2,
  diagnostics: Activity,
  insurance: FileText,
  inventory: Boxes,
  reports: BarChart3,
  administration: Cog,
  settings: Settings,
  frontoffice: Building,
  nurse: Syringe,
}

const DefaultIcon = Cog

// Map moduleKey → landing route
const moduleLandingPath: Record<string, string> = {
  administration: "/organization-setup",
  doctor: "/doctor/dashboard",
  nurse: "/nurse/dashboard",
  frontoffice: "/frontoffice/dashboard",
  appointment: "/appointment/calendar",
  patient_mgmt: "/patient_mgmt",
  billing: "/billing",
  lab: "/lab/dashboard",
  pharmacy: "/pharmacy",
  inventory: "/inventory",
  analytics: "/analytics",
  hr: "/hr/employee-configuration",
  // hr_payroll: "/hr-payroll",
  // add more when developed…
}

export function SectionDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const { withLocale } = useLocaleRoute()
  const dict = useDictionary()
  const t: Partial<Record<string, string>> = dict.modules


  // ⬅️ GET USER FROM ZUSTAND (NOT VIA API)
  const user = useUserStore((s) => s.user)
  const loading = useUserStore((s) => s.loading)

  // === LOADING UI ===
  if (loading || !user) {
    return (
      <div className="flex justify-center">
        <Button
          variant="default"
          disabled
          className="bg-[#062e65] text-white flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <Loader2 className="h-4 w-4 animate-spin text-green-300" />
          <span>{dict.common.loading}</span>
        </Button>
      </div>
    )
  }

  // Extract modules from permissions
  const permissions = user.role?.permissions || []

  // // const modules = Array.from(
  // //   new Map(
  // //     permissions.map((p) => [
  // //       p.permission.module_key,
  // //       p.permission.module_key,
  // //     ])
  // //   ).values()
  // // )

  // // Build dropdown sections
  // const sections = [
  //   { label: "Administration", icon: Cog, moduleKey: "administration" },
  //   // ...modules.map((moduleKey) => ({
  //   //   label: moduleKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  //   //   moduleKey,
  //   //   icon: moduleIconMap[moduleKey] || DefaultIcon,
  //   // })),
  // ]

  // Convert PermissionItem[] or string[] → string[]
  const permissionStrings = permissions.map((p: any) =>
    typeof p === "string" ? p : p.name
  )
  // permissionStrings.push("doctor:check:view");

  // Get unique module names
  // const moduleKeys = Array.from(
  //   new Set(permissionStrings.map((p) => p.split(":")[0]))
  // )

  type ModuleKey = keyof typeof moduleLandingPath

  const moduleKeys = Array.from(
    new Set(permissionStrings.map((p) => p.split(":")[0]))
  ).filter((k): k is ModuleKey => k in moduleLandingPath)


  // Build dropdown sections dynamically
  // const sections = moduleKeys.map((moduleKey) => ({
  //   label: moduleKey
  //     .replace(/_/g, " ")
  //     .replace(/\b\w/g, (c: any) => c.toUpperCase()),
  //   moduleKey,
  //   icon: moduleIconMap[moduleKey] || DefaultIcon,
  // }))

  const sections = moduleKeys.map((moduleKey) => ({
  label:
    t?.[moduleKey] ??
    moduleKey.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
  moduleKey,
  icon: moduleIconMap[moduleKey] || DefaultIcon,
}))


  // console.log(user)

  // React.useEffect(() => {
  //   if (!pathname || moduleKeys.length === 0) return

  //   // Get first segment from URL → "/administration/users" → "administration"
  //   const firstSegment = pathname.split("/")[1] ?? ""

  //   // Match with moduleKeys
  //   const matched = moduleKeys.find(
  //     (m) => m.toLowerCase() === firstSegment.toLowerCase()
  //   )

  //   if (matched) {
  //     setSelected(
  //       matched.replace(/_/g, " ").replace(/\b\w/g, (c: any) => c.toUpperCase())
  //     )
  //   } else {
  //     // If nothing matches, fallback to first module
  //     setSelected(sections[0]?.label ?? "Administration")
  //   }
  // }, [pathname, moduleKeys, sections])

  React.useEffect(() => {
    if (!pathname || moduleKeys.length === 0) return

    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return

    const firstSegment = segments[0]

    const hasLocale = locales.includes(firstSegment as Locale)
    const moduleSegment = hasLocale ? segments[1] : segments[0]

    if (!moduleSegment) return

    const matched = moduleKeys.find(
      (m) => m.toLowerCase() === moduleSegment.toLowerCase()
    )

    if (matched) {
      setSelected(
        matched
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase())
      )
    } else {
      setSelected(sections[0]?.label ?? "Administration")
    }
  }, [pathname, moduleKeys, sections])


  // const [selected, setSelected] = React.useState(sections[0].label)
  const [selected, setSelected] = React.useState(
    sections[0]?.label ?? "Administration"
  )
  const SelectedIcon = sections.find((s) => s.label === selected)?.icon || Cog

  // ⭐ NEW — Handle navigation
  const handleSelect = (section: any) => {
    setSelected(section.label)

    const path = moduleLandingPath[section.moduleKey]
    console.log(path)
    if (path) {
      router.push(withLocale(path))
    } else {
      // fallback if no path defined
      router.push(`${withLocale(`/${section.moduleKey}`)}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="bg-[#062e65] text-white flex items-center gap-2 px-4 py-2 rounded-full"
          >
            <SelectedIcon className="h-4 w-4 text-green-300" />
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56 mt-2 rounded-2xl p-1 bg-white shadow-lg"
        >
          {sections.map((section) => {
            const Icon = section.icon
            const active = selected === section.label
            return (
              <DropdownMenuItem
                key={section.moduleKey}
                // onClick={() => setSelected(section.label)}
                onClick={() => handleSelect(section)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2",
                  active
                    ? "bg-green-500 text-white font-medium"
                    : "hover:bg-green-50 text-gray-700"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-white" : "text-gray-600"
                  )}
                />
                {section.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
