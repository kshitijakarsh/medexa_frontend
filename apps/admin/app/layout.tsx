import { Geist, Geist_Mono } from "next/font/google"
import { Metadata } from "next"
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { CustomToaster } from "@/components/ui/custom-toaster"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "MedExe - Admin",
  description: "Admin Portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
          <CustomToaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
