// // // "use client"

// // // import * as React from "react"
// // // import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// // // import { ThemeProvider as NextThemesProvider } from "next-themes"
// // // import { SidebarProvider } from "@workspace/ui/components/sidebar"
// // // import { usePathname } from "next/navigation"
// // // import { Toaster } from "@workspace/ui/components/sonner"
// // // import { AppSidebar } from "./app-sidebar"

// // // interface ProvidersProps {
// // //   children: React.ReactNode
// // // }

// // // export function Providers({ children }: ProvidersProps) {
// // //   const pathname = usePathname()
// // //   // Check if the path (without locale) is /login
// // //   const isStandalonePage = pathname.includes("/login")
// // //   const [queryClient] = React.useState(
// // //     () =>
// // //       new QueryClient({
// // //         defaultOptions: {
// // //           queries: {
// // //             staleTime: 60 * 1000,
// // //             refetchOnWindowFocus: false,
// // //           },
// // //         },
// // //       })
// // //   )

// // //   if (isStandalonePage) {
// // //     return (
// // //       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// // //     )
// // //   }

// // //   return (
// // //     <QueryClientProvider client={queryClient}>
// // //       <NextThemesProvider
// // //         attribute="class"
// // //         defaultTheme="light"
// // //         enableSystem
// // //         disableTransitionOnChange
// // //         enableColorScheme
// // //       >
// // //         <Toaster position="top-right" richColors closeButton expand />
// // //         <SidebarProvider>
// // //           <AppSidebar />
// // //           {children}
// // //         </SidebarProvider>
// // //       </NextThemesProvider>
// // //     </QueryClientProvider>
// // //   )
// // // }

// // "use client"

// // import * as React from "react"
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// // import { ThemeProvider as NextThemesProvider } from "next-themes"
// // import { SidebarProvider } from "@workspace/ui/components/sidebar"
// // import { usePathname } from "next/navigation"
// // import { Toaster } from "@workspace/ui/components/sonner"
// // import { AppSidebar } from "./app-sidebar"
// // import type { Dictionary } from "@/i18n/get-dictionary"
// // import { UserLoader } from "./user-loader"

// // interface ProvidersProps {
// //   children: React.ReactNode
// //   dict?: Dictionary
// // }

// // export function Providers({ children, dict }: ProvidersProps) {
// //   const pathname = usePathname()
// //   const isStandalonePage =
// //     pathname.includes("/login") || pathname.includes("/onboarding")

// //   const [queryClient] = React.useState(
// //     () =>
// //       new QueryClient({
// //         defaultOptions: {
// //           queries: {
// //             staleTime: 60 * 1000,
// //             refetchOnWindowFocus: false,
// //           },
// //         },
// //       })
// //   )

// //   if (isStandalonePage) {
// //     return (
// //       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// //     )
// //   }

// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <NextThemesProvider
// //         attribute="class"
// //         defaultTheme="light"
// //         enableSystem
// //         disableTransitionOnChange
// //         enableColorScheme
// //       >
// //         <Toaster position="top-right" richColors closeButton expand />
// //         <SidebarProvider>
// //           {/* ✅ Add a proper flex layout */}
// //           {/* <div className="flex h-screen w-full overflow-hidden"> */}
// //           <UserLoader />
// //           <AppSidebar />
// //           {/* <main className="flex-1 overflow-y-auto bg-background"> */}
// //           {children}
// //           {/* </main> */}
// //           {/* </div> */}
// //         </SidebarProvider>
// //       </NextThemesProvider>
// //     </QueryClientProvider>
// //   )
// // }

// "use client"

// import * as React from "react"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { SidebarProvider } from "@workspace/ui/components/sidebar"
// import { usePathname } from "next/navigation"
// import { Toaster } from "@workspace/ui/components/sonner"
// import { AppSidebar } from "./app-sidebar"
// import type { Dictionary } from "@/i18n/get-dictionary"
// import { UserLoader } from "./user-loader"
// import { useUserStore } from "@/store/useUserStore"
// import { TenantStatusGuard } from "@/app/[lang]/components/tenant-status-guard"

// interface ProvidersProps {
//   children: React.ReactNode
//   dict?: Dictionary
// }

// export function Providers({ children, dict }: ProvidersProps) {
//   const pathname = usePathname()
//   const isStandalonePage =
//     pathname.includes("/login") || pathname.includes("/onboarding")

//   const [queryClient] = React.useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60000,
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
//         <UserLoader />
//         <TenantStatusGuard>
//           <SidebarWrapper>{children}</SidebarWrapper>
//         </TenantStatusGuard>
//       </NextThemesProvider>
//     </QueryClientProvider>
//   )
// }

// function SidebarWrapper({ children }: { children: React.ReactNode }) {
//   const loading = useUserStore((s) => s.loading)
//   const user = useUserStore((s) => s.user)

//   // 🔄 Show global loading UI until UserLoader finishes
//   if (loading || !user) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen w-full gap-3">
//         <div className="flex space-x-2">
//           <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
//           <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
//           <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
//         </div>
//         <p className="text-primary/80 text-sm">Loading your workspace…</p>
//       </div>
//     )
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       {children}
//     </SidebarProvider>
//   )
// }

"use client"

import * as React from "react"
import { createContext } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "@workspace/ui/components/sonner"
import { AppSidebar } from "./app-sidebar"
import type { Dictionary } from "@/i18n/get-dictionary"
import { UserLoader } from "./user-loader"
import { useUserStore } from "@/store/useUserStore"
import { TenantStatusGuard } from "@/app/[lang]/components/tenant-status-guard"

/* ------------------------------------------------------------
   Dictionary Context
------------------------------------------------------------ */

export const DictionaryContext = createContext<Dictionary | null>(null)

/* ------------------------------------------------------------
   Providers
------------------------------------------------------------ */

interface ProvidersProps {
  children: React.ReactNode
  dict: Dictionary
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
            staleTime: 60000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  const content = isStandalonePage ? (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ) : (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <Toaster position="top-right" richColors closeButton expand />
        <UserLoader />
        <TenantStatusGuard>
          <SidebarWrapper>{children}</SidebarWrapper>
        </TenantStatusGuard>
      </NextThemesProvider>
    </QueryClientProvider>
  )

  return (
    <DictionaryContext.Provider value={dict}>
      {content}
    </DictionaryContext.Provider>
  )
}

/* ------------------------------------------------------------
   Sidebar Wrapper
------------------------------------------------------------ */

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const loading = useUserStore((s) => s.loading)
  const user = useUserStore((s) => s.user)

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full gap-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
        </div>
        <p className="text-primary/80 text-sm">Loading your workspace…</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  )
}
