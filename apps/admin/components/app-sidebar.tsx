"use client"
import {
  Hospital,
  Handshake,
  Activity,
  LayoutDashboard,
  Monitor,
  User2,
  ChevronUp,
  LogOut,
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
  SidebarFooter,
} from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { LocaleLink } from "./locale-link"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"
import { LOGOS } from "@/lib/logos"
import Image from "next/image"
import { useSidebar } from "@workspace/ui/components/sidebar"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { DropdownMenu } from "@workspace/ui/components/dropdown-menu"
import { logoutCognitoUser } from "@/lib/api"
import { Button } from "@workspace/ui/components/button"

interface AppSidebarProps {
  dict: DictionaryType
}

export function AppSidebar({ dict }: AppSidebarProps) {
  const pathname = usePathname()

  const items = [
    {
      title: dict.nav.overview,
      url: ["/overview"],
      icon: LayoutDashboard,
    },
    {
      title: dict.nav.hospitals,
      url: [
        "/hospitals",
        "/create-hospital",
        "/onboarding/modules",
        "/onboarding/payment",
        "/onboarding/licence-history",
        "/onboarding/regulatory-docs",
      ], // multiple URLs
      icon: Hospital,
    },
    // {
    //   title: dict.nav.support,
    //   url: ["/support"],
    //   icon: Handshake,
    // },
    {
      title: dict.nav.activityLog,
      url: ["/activity-log"],
      icon: Activity,
    },
    // {
    //   title: dict.nav.monitoring,
    //   url: ["/monitoring"],
    //   icon: Monitor,
    // },
  ]

  // const isActive = (url: string) => {
  //   // Remove locale prefix from pathname for comparison
  //   const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
  //   return url === "/"
  //     ? pathWithoutLocale === "" || pathWithoutLocale === "/"
  //     : pathWithoutLocale.startsWith(url)
  // }
  const isActive = (urls: string[] | string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")

    if (Array.isArray(urls)) {
      return urls.some((url) =>
        url === "/"
          ? pathWithoutLocale === "" || pathWithoutLocale === "/"
          : pathWithoutLocale.startsWith(url)
      )
    }

    return urls === "/"
      ? pathWithoutLocale === "" || pathWithoutLocale === "/"
      : pathWithoutLocale.startsWith(urls)
  }

  const sidebarState = useSidebar().state

  const handleLogout = () => {
    logoutCognitoUser()
    window.location.href = "/login" // full page reload
  }

  const groups = [
    items.slice(0, 1), // first group
    items.slice(1, 3), // second group
    items.slice(3, 5), // second group
  ]

  return (
    <Sidebar
      collapsible={"icon"}
      className="[&[data-state=collapsed]]:!w-[7rem]"
    >
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
      {/* <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{dict.nav.application}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.[0].map((item) => (
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
      </SidebarContent> */}
      <SidebarContent className="gap-0">
        {groups.map((group, index) => (
          <SidebarGroup key={index} className="mb-0">
            <SidebarGroupLabel>
              {index === 0
                ? dict.nav.application
                : index === 1
                  ? dict.nav.management
                  // : dict.nav.monitor}
                  : ""}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`bg-[linear-gradient(90deg,_#07235B_0%,_#001A4D_100%)] rounded  ${sidebarState === "collapsed" && "ms-2"}`}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className="text-sm p-3"
                    >
                      <LocaleLink href={item.url[0] /* main URL for link */}>
                        <item.icon
                          className={`transition-transform duration-300 ${
                            sidebarState === "collapsed" ? "w-7 h-7" : "w-5 h-5"
                          }`}
                        />
                        <span className="text-base">{item.title}</span>
                      </LocaleLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem
            className={`bg-[linear-gradient(90deg,_#07235B_0%,_#001A4D_100%)] rounded  ${sidebarState === "collapsed" && "ms-2"}`}
          >
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={handleLogout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <SidebarMenuButton
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
