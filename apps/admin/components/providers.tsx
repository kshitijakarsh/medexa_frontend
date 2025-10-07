"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"

interface ProvidersProps {
  children: React.ReactNode
  dict: DictionaryType
}

export function Providers({ children, dict }: ProvidersProps) {
  const pathname = usePathname()
  // Check if the path (without locale) is /login
  const isStandalonePage = !pathname.includes("/login")

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SidebarProvider defaultOpen={isStandalonePage}>
        <AppSidebar isStandalonePage={isStandalonePage} dict={dict} />
        {children}
      </SidebarProvider>
    </NextThemesProvider>
  )
}
