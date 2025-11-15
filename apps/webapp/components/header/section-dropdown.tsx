"use client"

import * as React from "react"
import { useParams } from "next/navigation"
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
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { getAuthToken } from "@/app/utils/onboarding"
import { getTenantId } from "@/lib/api/onboarding"
import { createTenantApiClient } from "@/lib/api/tenant"
import { createModulesApiClient, type Module } from "@/lib/api/module"
import type { LucideIcon } from "lucide-react"

interface Section {
  label: string
  icon: LucideIcon
  moduleKey?: string
}

// Mapping from module_key to icon (case-insensitive, handles both formats)
const moduleIconMap: Record<string, LucideIcon> = {
  // Actual module keys from API (uppercase with underscores)
  analytics: BarChart3,
  appointment: Calendar,
  billing: FileText,
  patient_mgmt: Users,
  hr_payroll: Briefcase,
  lab: FlaskConical,
  pharmacy: Pill,
  // Legacy/alternative keys (lowercase, no underscores)
  hospital: Building2,
  diagnostics: Activity,
  insurance: FileText,
  inventory: Boxes,
  reports: BarChart3,
  administration: Cog,
  admin: Cog,
  settings: Settings,
}

// Default icon for unmapped modules
const DefaultIcon = Cog

export function SectionDropdown() {
  const params = useParams()
  const tenantSlug = params?.tenant as string

  const [selected, setSelected] = React.useState("Administration")
  const [sections, setSections] = React.useState<Section[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!tenantSlug) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get auth token
        const token = await getAuthToken()

        // Get tenant ID
        const tenantId = await getTenantId(tenantSlug)

        // Fetch tenant data and all modules in parallel
        const tenantClient = createTenantApiClient({ authToken: token })
        const modulesClient = createModulesApiClient({ authToken: token })

        const [tenantResponse, modulesResponse] = await Promise.all([
          tenantClient.getTenantById(tenantId),
          modulesClient.getModules(),
        ])

        const tenant = tenantResponse.data.data
        const modules = modulesResponse.data.data

        // Get tenant modules
        const tenantModules = tenant.tenant_modules || []

        // Create a map of module id to module for quick lookup
        const moduleMap = new Map<string, Module>()
        modules.forEach((module) => {
          moduleMap.set(String(module.id), module)
        })

        // Match tenant_modules.module_id to modules.id and create sections
        const dynamicSections: Section[] = []
        for (const tenantModule of tenantModules) {
          // Match by module_id (from tenant_modules) to id (from modules)
          // tenant_modules contains objects with module_id field, not full Module objects
          const moduleId = String(
            (tenantModule as any).module_id || (tenantModule as any).id
          )
          const module = moduleMap.get(moduleId)

          if (!module) {
            continue
          }

          // Get icon from mapping or use default
          const icon =
            moduleIconMap[module.module_key.toLowerCase()] || DefaultIcon

          // Use module name_en as label, or fallback to module_key
          const label = module.name_en || module.module_key

          if (!label) {
            continue
          }

          dynamicSections.push({
            label,
            icon,
            moduleKey: module.module_key,
          })
        }

        // If no sections found, use default sections
        if (dynamicSections.length === 0) {
          setSections([
            { label: "Administration", icon: Cog, moduleKey: "administration" },
          ])
        } else {
          setSections(dynamicSections)
        }

        // Set default selected to first module in the array
        if (dynamicSections.length > 0 && dynamicSections[0]) {
          setSelected(dynamicSections[0].label)
        }
      } catch (err) {
        console.error("Failed to fetch sections:", err)
        setError(err instanceof Error ? err.message : "Failed to load sections")
        // Fallback to default sections on error
        setSections([
          { label: "Administration", icon: Cog, moduleKey: "administration" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenantSlug])

  // Get icon for selected section
  const selectedSection = sections.find((s) => s.label === selected)
  const SelectedIcon = selectedSection?.icon || Cog

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-0">
        <Button
          variant="default"
          disabled
          className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
        >
          <Loader2 className="h-4 w-4 text-green-300 animate-spin" />
          <span>Loading...</span>
        </Button>
      </div>
    )
  }

  if (error && sections.length === 0) {
    return (
      <div className="flex flex-col items-center mt-0">
        <Button
          variant="default"
          className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
        >
          <Cog className="h-4 w-4 text-green-300" />
          <span>Administration</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="bg-[#062e65] text-white hover:bg-[#031f47] flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
          >
            <SelectedIcon className="h-4 w-4 text-green-300" />
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56 mt-2 rounded-2xl p-1 bg-white/90 backdrop-blur-md shadow-lg"
        >
          {sections.length === 0 ? (
            <DropdownMenuItem
              disabled
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] text-gray-500"
            >
              No sections available
            </DropdownMenuItem>
          ) : (
            sections.map((section) => {
              const Icon = section.icon
              const isActive = selected === section.label
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
              )
            })
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
