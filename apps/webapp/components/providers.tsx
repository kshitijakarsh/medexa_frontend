// "use client"

// import * as React from "react"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { SidebarProvider } from "@workspace/ui/components/sidebar"
// import { usePathname } from "next/navigation"
// import { Toaster } from "@workspace/ui/components/sonner"
// import { AppSidebar } from "./app-sidebar"

// interface ProvidersProps {
//   children: React.ReactNode
// }

// export function Providers({ children }: ProvidersProps) {
//   const pathname = usePathname()
//   // Check if the path (without locale) is /login
//   const isStandalonePage = pathname.includes("/login")
//   const [queryClient] = React.useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60 * 1000,
//             refetchOnWindowFocus: false,
//           },
//         },
//       })
//   )

//   if (isStandalonePage) {
//     return (
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     )
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <NextThemesProvider
//         attribute="class"
//         defaultTheme="light"
//         enableSystem
//         disableTransitionOnChange
//         enableColorScheme
//       >
//         <Toaster position="top-right" richColors closeButton expand />
//         <SidebarProvider>
//           <AppSidebar />
//           {children}
//         </SidebarProvider>
//       </NextThemesProvider>
//     </QueryClientProvider>
//   )
// }

"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "@workspace/ui/components/sonner"
import { AppSidebar } from "./app-sidebar"
import type { Dictionary } from "@/i18n/get-dictionary"

interface ProvidersProps {
  children: React.ReactNode
  dict?: Dictionary
}

export function Providers({ children, dict }: ProvidersProps) {
  const pathname = usePathname()
  const isStandalonePage =
    pathname.includes("/login") || pathname.includes("/onboarding")

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

  if (isStandalonePage) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

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
        <SidebarProvider>
          {/* ✅ Add a proper flex layout */}
          {/* <div className="flex h-screen w-full overflow-hidden"> */}
          <AppSidebar />
          {/* <main className="flex-1 overflow-y-auto bg-background"> */}
          {children}
          {/* </main> */}
          {/* </div> */}
        </SidebarProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
