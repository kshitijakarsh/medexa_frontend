import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MedExe - Hospital Portal",
  description: "Hospital management portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
