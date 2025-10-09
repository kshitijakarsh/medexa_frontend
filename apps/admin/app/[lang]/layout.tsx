import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/styles/admin.css"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"
import { locales, type Locale } from "@/i18n/locales"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers dict={dict}>{children}</Providers>
      </body>
    </html>
  )
}
