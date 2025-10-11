"use client"
import {
  Hospital,
  Handshake,
  Activity,
  LayoutDashboard,
  Monitor,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { LocaleLink } from "./locale-link"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"
import { LOGOS } from "@/lib/logos"
import Image from "next/image"
import { useSidebar } from "@workspace/ui/components/sidebar"

interface AppSidebarProps {
  dict: DictionaryType
  isStandalonePage: boolean
}

export function AppSidebar({ isStandalonePage, dict }: AppSidebarProps) {
  const pathname = usePathname()

  const items = [
    {
      title: dict.nav.overview,
      url: "/overview",
      icon: LayoutDashboard,
    },
    {
      title: dict.nav.hospitals,
      url: "/hospitals",
      icon: Hospital,
    },
    {
      title: dict.nav.support,
      url: "/support",
      icon: Handshake,
    },
    {
      title: dict.nav.activityLog,
      url: "/activity-log",
      icon: Activity,
    },
    {
      title: dict.nav.monitoring,
      url: "/monitoring",
      icon: Monitor,
    },
  ]

  const isActive = (url: string) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
    return url === "/"
      ? pathWithoutLocale === "" || pathWithoutLocale === "/"
      : pathWithoutLocale.startsWith(url)
  }

  const sidebarState = useSidebar().state

  return (
    <Sidebar collapsible={isStandalonePage ? "icon" : "offcanvas"}>
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <Image
            src={LOGOS.main}
            alt="MedExe"
            width={130}
            height={50}
            className={`transition-all duration-300 ease-in-out ${
              sidebarState === "expanded"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75 absolute"
            }`}
            priority
          />
          <Image
            src={LOGOS.small}
            alt="MedExe"
            width={30}
            height={25}
            className={`transition-all duration-300 ease-in-out ${
              sidebarState === "collapsed"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75 absolute"
            }`}
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{dict.nav.application}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <LocaleLink href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </LocaleLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
