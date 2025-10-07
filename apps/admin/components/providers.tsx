"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "@workspace/ui/lib/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  const isStandalonePage = usePathname() !== "/login"
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Toaster position="top-right" richColors closeButton expand />
      <SidebarProvider defaultOpen={isStandalonePage}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </NextThemesProvider>
  )
}
