"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"
import { Toaster } from "@workspace/ui/components/sonner"

interface ProvidersProps {
  children: React.ReactNode
  dict: DictionaryType
}

export function Providers({ children, dict }: ProvidersProps) {
  const pathname = usePathname()
  // Check if the path (without locale) is /login
  const isStandalonePage = !pathname.includes("/login")

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <Toaster position="top-right" richColors closeButton expand />
        <SidebarProvider defaultOpen={isStandalonePage}>
          <AppSidebar isStandalonePage={isStandalonePage} dict={dict} />
          {children}
        </SidebarProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
