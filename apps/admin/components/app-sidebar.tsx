"use client"
import { Hospital, Handshake, Activity, LayoutDashboard } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { LocaleLink } from "./locale-link"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"

interface AppSidebarProps {
  dict: DictionaryType
  isStandalonePage: boolean
}

export function AppSidebar({ isStandalonePage, dict }: AppSidebarProps) {
  const pathname = usePathname()

  const items = [
    {
      title: dict.nav.overview,
      url: "/",
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
  ]

  const isActive = (url: string) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
    return url === "/"
      ? pathWithoutLocale === "" || pathWithoutLocale === "/"
      : pathWithoutLocale.startsWith(url)
  }

  return (
    <Sidebar collapsible={isStandalonePage ? "icon" : "offcanvas"}>
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
