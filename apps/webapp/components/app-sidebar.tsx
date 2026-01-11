"use client"
import {
  Hospital,
  Handshake,
  LayoutDashboard,
  Monitor,
  User2,
  ChevronUp,
  LogOut,
  Settings,
  IdCard,
  BriefcaseMedical,
  Calendar,
  BedDouble,
  Users,
  Scissors,
  Wrench,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@workspace/ui/components/sidebar"
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { LOGOS } from "@/lib/logos"
import Image from "next/image"
import { useSidebar } from "@workspace/ui/components/sidebar"
import { LocaleLink } from "./locale-link"
import {
  ADMINISTRATION_BASE,
  DOCTOR_BASE,
  HR,
  ROUTES,
  FRONTOFFICE_BASE,
  SURGERY_BASE,
  NURSE_BASE,
} from "@/lib/routes"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"
import { useDictionary } from "@/i18n/use-dictionary"

export function AppSidebar({ }) {
  const pathname = usePathname()
  const { withLocale } = useLocaleRoute()
  const dict = useDictionary()

  const modulesAvailable = {
    administration: pathname.includes(ADMINISTRATION_BASE),
    doctor: pathname.includes(DOCTOR_BASE),
    nurse: pathname.includes(NURSE_BASE),
    hr: pathname.includes(HR),
    // frontoffice: pathname.includes(FRONTOFFICE_BASE) || pathname.includes("/appointment"),
    frontoffice: pathname.includes(FRONTOFFICE_BASE) || (pathname.includes("/appointment") && !pathname.includes(DOCTOR_BASE)) && !pathname.includes(NURSE_BASE),
    surgery: pathname.includes(SURGERY_BASE),
  }

  const items = [
    ...(!modulesAvailable.frontoffice && !modulesAvailable.doctor && !modulesAvailable.nurse && !modulesAvailable.hr && !modulesAvailable.surgery
      ? [
        {
          title: dict.nav.organizationSetup,
          url: [
            withLocale(ROUTES.ORGANIZATION),
            withLocale(ROUTES.ADMINISTRATION_DEPARTMENT),
            withLocale(ROUTES.ADMINISTRATION_CHARGES),
            withLocale(ROUTES.ADMINISTRATION_ROLES),
            withLocale(ROUTES.ADMINISTRATION_OPERATION_THEATRES),
            withLocale(ROUTES.ADMINISTRATION_OPERATION),
            withLocale(ROUTES.ADMINISTRATION_UNITS_WARDS_BEDS),
            withLocale(ROUTES.ADMINISTRATION_ROLES_PERMISSIONS),
            withLocale(ROUTES.ADMINISTRATION_INSURANCE),
            withLocale(ROUTES.ADMINISTRATION_USER),
            withLocale(ROUTES.ADMINISTRATION_CHARGES),
            withLocale(ROUTES.ADMINISTRATION_CHARGES_ADD),
          ],
          icon: Settings,
        },
      ]
      : []),

    ...(modulesAvailable.hr
      ? [
        {
          title: "HR Management",
          url: [withLocale(ROUTES.HR)],
          icon: IdCard,
        },

      ]
      : []),

    ...(modulesAvailable.doctor
      ? [
        {
          title: "Dashboard",
          url: [withLocale(ROUTES.DOCTOR_DASHBOARD)],
          icon: LayoutDashboard,
          exactMatch: true,
        },
        {
          title: "Appointment",
          icon: Calendar,
          url: [], // Group header
          items: [
            {
              title: "View All",
              url: [withLocale(ROUTES.DOCTOR_VIEW_ALL)],
            },
            {
              title: "VIP",
              url: [withLocale(`${ROUTES.DOCTOR_VIEW_ALL}?tab=vip`)],
            },
            {
              title: "Follow Up",
              url: [withLocale(`${ROUTES.DOCTOR_VIEW_ALL}?tab=follow`)],
            },
            {
              title: "Emergency",
              url: [withLocale(`${ROUTES.DOCTOR_VIEW_ALL}?tab=emergency`)],
            },


          ]
        },
      ]
      : []),
    ...(modulesAvailable.nurse
      ? [
        {
          title: "Dashboard",
          url: [withLocale(ROUTES.NURSE_DASHBOARD)],
          icon: LayoutDashboard,
          exactMatch: true,
        },
        {
          title: "Patient Visits",
          url: [withLocale(ROUTES.NURSE_RECENT_PATIENTS)],
          icon: User2,
        },
      ]
      : []),
    ...(modulesAvailable.frontoffice
      ? [
        {
          title: "Dashboard",
          url: [ROUTES.FRONTOFFICE_DASHBOARD],
          icon: LayoutDashboard,
          exactMatch: true,
        },
        {
          title: "Patient Record",
          url: [ROUTES.FRONTOFFICE_PATIENT_REGISTRATION],
          icon: User2,
        },
        {
          title: "Appointment",
          icon: "/images/appoint.svg",
          url: [],
          items: [
            {
              title: "Appointment",
              url: [ROUTES.FRONTOFFICE_APPOINTMENT],
            },
            {
              title: "Completed log",
              url: [`${ROUTES.FRONTOFFICE_APPOINTMENT}?tab=completed`],
            },
            {
              title: "Appointment Schedule",
              url: [ROUTES.FRONTOFFICE_SCHEDULE],
            }
          ]
        },
        {
          title: "OPD",
          url: [],
          icon: "/images/opd.svg",
          items: [
            {
              title: "Patients Que",
              url: [`${ROUTES.FRONTOFFICE_OPD}?view=queue`],
            },
            {
              title: "Completed",
              url: [`${ROUTES.FRONTOFFICE_OPD}?view=completed`],
            },
            {
              title: "Doctor Instructions",
              url: [`${ROUTES.FRONTOFFICE_OPD}?view=instructions`],
            },
          ]
        },
        {
          title: "IPD",
          url: [],
          icon: "/images/ipd.svg",
          items: [
            {
              title: "Admitted Patients",
              url: [`${ROUTES.FRONTOFFICE_IPD}?view=admitted`],
            },
            {
              title: "Bed & Ward Management",
              url: [`${ROUTES.FRONTOFFICE_IPD}?view=bed-management`],
            },
            {
              title: "Discharged Patients",
              url: [`${ROUTES.FRONTOFFICE_IPD}?view=discharged`],
            },
            {
              title: "Doctor Instructions",
              url: [`${ROUTES.FRONTOFFICE_IPD}?view=instructions`],
            },
          ]
        },
      ]
      : []),
    ...(modulesAvailable.surgery
      ? [
        {
          title: "Dashboard",
          url: [withLocale(ROUTES.SURGERY_DASHBOARD)],
          icon: LayoutDashboard,
          exactMatch: true,
        },
        {
          title: "Surgery",
          icon: Scissors,
          url: [],
          items: [
            {
              title: "OT Schedule",
              url: [withLocale(ROUTES.SURGERY_OT_SCHEDULE)],
            },
            {
              title: "Pre-Op Checklist",
              url: [withLocale(ROUTES.SURGERY_PRE_OP)],
            },
            {
              title: "Intra-Op Notes",
              url: [withLocale(ROUTES.SURGERY_PRE_OP)],
            },
            {
              title: "Post-Op Notes",
              url: [withLocale(ROUTES.SURGERY_PRE_OP)],
            }
          ]
        },
        {
          title: "OT Setting",
          icon: Wrench,
          url: [],
          items: [
            {
              title: "Teams",
              url: [withLocale(ROUTES.SURGERY_OT_TEAMS)],
            },
            {
              title: "Templates",
              url: [withLocale(ROUTES.SURGERY_OT_TEMPLATES)],
            },
          ]
        },
        {
          title: "Ward Store",
          url: [withLocale(ROUTES.SURGERY_WARD_STORE)],
          icon: BriefcaseMedical,
        }
      ]
      : []),
    // {
    //   title: "Hospital",
    //   url: [
    //     "/hospitals",
    //     "/create-hospital",
    //     "/onboarding/modules",
    //     "/onboarding/payment",
    //     "/onboarding/licence-history",
    //     "/onboarding/regulatory-docs",
    //   ], // multiple URLs
    //   icon: Hospital,
    // },
    // {
    //   title: "Support",
    //   url: ["/support"],
    //   icon: Handshake,
    // },
    // {
    //   title: "Activity",
    //   url: ["/activity-log"],
    //   icon: Activity,
    // },
    // {
    //   title: "Monitor",
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
  const searchParams = useSearchParams()
  const isActive = (urls: string[] | string, exact = false) => {
    // Remove locale prefix from pathname for comparison if present
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/)/, "")
    const fullPath = pathWithoutLocale + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    const checkUrl = (url: string) => {
      // Also remove locale prefix from item URL for comparison
      const urlWithoutLocale = url.replace(/^\/[a-z]{2}(?=\/)/, "")

      if (url.includes("?")) {
        // Compare without locale
        return fullPath === urlWithoutLocale
      }

      if (exact) {
        return pathWithoutLocale === urlWithoutLocale
      }

      // Simple fix: If current URL has `tab=completed`, then `/appointment` should NOT be active?
      if (urlWithoutLocale.endsWith("/appointment") && searchParams?.has("tab")) {
        return false
      }

      return urlWithoutLocale === "/"
        ? pathWithoutLocale === "" || pathWithoutLocale === "/"
        : pathWithoutLocale.startsWith(urlWithoutLocale)
    }

    if (Array.isArray(urls)) {
      return urls.some(checkUrl)
    }

    return checkUrl(urls)
  }

  const sidebarState = useSidebar().state

  const handleLogout = () => {
    // logoutCognitoUser()
    window.location.href = "/login" // full page reload
  }

  const groups = [
    items.slice(0, 1), // first group
    items.slice(1), // remaining items
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
            className={`transition-all duration-300 ease-in-out ${sidebarState === "expanded"
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
            className={`transition-all duration-300 ease-in-out ${sidebarState === "collapsed"
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
            <SidebarGroupContent>
              <SidebarMenu>
                {group.map((item) => (
                  <SidebarNavItem key={item.title} item={item} isActive={isActive} sidebarState={sidebarState} />
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


            {/* <SidebarMenuButton
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function SidebarNavItem({ item, isActive, sidebarState }: { item: any; isActive: (url: string | string[], exact?: boolean) => boolean; sidebarState: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isGroupActive = item.items?.some((sub: any) => isActive(sub.url, sub.exactMatch))

  useEffect(() => {
    if (isGroupActive) {
      setIsOpen(true)
    }
  }, [isGroupActive])

  // Check if this item should have green styling
  const isGreenItem = item.title === "Appointment" || item.title === "Patient Record" || item.title === "OPD" || item.title === "IPD"

  if (item.items) {
    return (
      <SidebarMenuItem
        className={`rounded mb-1 ${!isGreenItem ? "bg-[linear-gradient(90deg,_#07235B_0%,_#001A4D_100%)]" : ""} ${sidebarState === "collapsed" && "ms-2"}`}
      >
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          isActive={isGroupActive}
          className={`text-sm p-3 w-full justify-between ${isGreenItem && isGroupActive
            ? "!bg-[#34D399] hover:!bg-[#2EB886] !text-white"
            : isGreenItem
              ? "bg-transparent hover:bg-[#34D399]/20 text-white"
              : ""
            }`}
        >
          <div className="flex items-center gap-2">
            {item.icon && (
              typeof item.icon === 'string' ? (
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={item.icon === "/images/appoint.svg"
                    ? (sidebarState === "expanded" ? 20 : 24)
                    : (sidebarState === "expanded" ? 28 : 32)
                  }
                  height={item.icon === "/images/appoint.svg"
                    ? (sidebarState === "expanded" ? 20 : 24)
                    : (sidebarState === "expanded" ? 28 : 32)
                  }
                  className="transition-all duration-300"
                />
              ) : (
                <item.icon
                  className={`transition-transform duration-300 ${sidebarState === "collapsed" ? "w-7 h-7" : "w-5 h-5"}`}
                />
              )
            )}
            {sidebarState === "expanded" && <span className="text-base font-medium">{item.title}</span>}
          </div>
          {sidebarState === "expanded" && <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />}
        </SidebarMenuButton>
        {isOpen && (
          <SidebarMenuSub className="mx-0 px-0 ml-5 border-l border-blue-900/40 space-y-0 mt-3">
            {item.items.map((subItem: any) => (
              <SidebarMenuItem key={subItem.title} className="relative">
                {/* Horizontal connector */}
                <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-blue-900/40 -translate-y-1/2 -translate-x-[1px]" />
                <SidebarMenuButton
                  asChild
                  isActive={isActive(subItem.url, subItem.exactMatch)}
                  className="text-sm p-3 pl-6 h-10 ml-0 bg-[#001740] hover:bg-[#07235B] data-[active=true]:bg-[#0d3480] data-[active=true]:text-white rounded-none w-full border-none shadow-none flex items-center justify-between"
                >
                  <LocaleLink href={subItem.url[0] || ""} className="flex items-center justify-between w-full">
                    <span>{subItem.title}</span>
                    {isActive(subItem.url, subItem.exactMatch) && <ChevronRight className="w-4 h-4 text-[#34D399] -rotate-45" />}
                  </LocaleLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem
      className={`rounded mb-1 ${!isGreenItem ? "bg-[linear-gradient(90deg,_#07235B_0%,_#001A4D_100%)]" : ""} ${sidebarState === "collapsed" && "ms-2"}`}
    >
      <SidebarMenuButton
        asChild
        isActive={isActive(item.url, item.exactMatch)}
        className={`text-sm p-3 ${isGreenItem && isActive(item.url, item.exactMatch)
          ? "bg-[#34D399] hover:bg-[#2EB886] text-white data-[active=true]:bg-[#34D399] data-[active=true]:text-white hover:text-white"
          : isGreenItem
            ? "bg-transparent hover:bg-[#34D399]/20 text-white"
            : ""
          }`}
      >
        <LocaleLink href={item.url[0] || ""}>
          {item.icon && (
            typeof item.icon === 'string' ? (
              <Image
                src={item.icon}
                alt={item.title}
                width={item.icon === "/images/appoint.svg"
                  ? (sidebarState === "expanded" ? 20 : 24)
                  : (sidebarState === "expanded" ? 28 : 32)
                }
                height={item.icon === "/images/appoint.svg"
                  ? (sidebarState === "expanded" ? 20 : 24)
                  : (sidebarState === "expanded" ? 28 : 32)
                }
                className="transition-all duration-300"
              />
            ) : (
              <item.icon
                className={`transition-transform duration-300 ${sidebarState === "collapsed" ? "w-7 h-7" : "w-5 h-5"}`}
              />
            )
          )}
          {sidebarState === "expanded" && <span className="text-base">{item.title}</span>}
        </LocaleLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
