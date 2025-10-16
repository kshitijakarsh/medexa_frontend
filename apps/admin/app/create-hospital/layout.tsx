import type { ReactNode } from "react"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"

export default async function CreateHospitalLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const dict = await getDictionary("en")

  return <Providers dict={dict}>{children}</Providers>
}
