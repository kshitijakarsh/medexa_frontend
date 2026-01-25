"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@workspace/ui/components/input";
import { Header } from "@/components/header";
import {
  SearchIcon,
  Building2,
  Activity,
  Pill,
  FileText,
  Boxes,
  BarChart3,
  Settings,
  Cog,
  Calendar,
  Users,
  FlaskConical,
  Briefcase,
  IdCard,
  Syringe,
  Building,
  Stethoscope,
  Scissors,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { useDictionary } from "@/i18n/use-dictionary";
import { Card, CardContent } from "@workspace/ui/components/card";

// --- Types ---

interface Module {
  label: string;
  moduleKey: string;
  icon: React.ElementType;
  path: string;
}

// --- Constants (Aligned with SectionDropdown.tsx) ---

const MODULE_CONFIGS = {
  icons: {
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
    surgery: Scissors,
    laboratory: Activity,
  } as Record<string, React.ElementType>,

  paths: {
    administration: "/administration/organization-setup",
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
    surgery: "/surgery/dashboard",
    laboratory: "/laboratory/dashboard",
  } as Record<string, string>,
};

const ModuleCard = ({ module, onClick }: { module: Module; onClick: () => void }) => {
  const Icon = module.icon;
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors">
          <Icon className="h-8 w-8 text-[#062e65]" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {module.label}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Access your {module.label.toLowerCase()} tools
          </p>
        </div>
      </CardContent>
    </Card>
  );
};


export default function MastersPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { withLocale } = useLocaleRoute();
  const dict = useDictionary();

  const user = useUserStore((s) => s.user);

  const authorizedModules = useMemo(() => {
    if (!user) return [];

    const permissions = user.role?.permissions || [];
    const t = (dict.modules as Record<string, string>) || {};


    const permissionStrings = permissions.map((p: any) =>
      typeof p === "string" ? p : p.name
    );

    const uniqueKeys = new Set(
      permissionStrings
        .filter((p): p is string => !!p)
        .map((p) => p.split(":")[0])
        .filter((key): key is string => !!key && key in MODULE_CONFIGS.paths && key !== "common")
    );

    return Array.from(uniqueKeys)
      .map((key) => ({
        label: t[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        moduleKey: key,
        icon: MODULE_CONFIGS.icons[key] || Cog,
        path: MODULE_CONFIGS.paths[key] || `/${key}`,
      }))
      .filter((mod) =>
        mod.label.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [user, dict.modules, search]);

  return (
    <main className="min-h-svh w-full">
      <div className="p-6 md:p-10 space-y-10 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-[calc(100vh-3.5rem)]">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <header>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Medexa</h1>
            <p className="text-gray-600 mt-1">Select a module to get started with your workflow</p>
          </header>

          <div className="relative w-full md:w-80">
            <Input
              placeholder="Search modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 h-11 bg-white border-none shadow-sm rounded-xl focus-visible:ring-blue-500"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {authorizedModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl backdrop-blur-sm border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              {search
                ? `No modules found matching "${search}"`
                : "It looks like you don't have access to any modules yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authorizedModules.map((module) => (
              <ModuleCard
                key={module.moduleKey}
                module={module}
                onClick={() => router.push(withLocale(module.path))}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
