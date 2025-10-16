import type { ReactNode } from "react"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"
import { OnboardingShell } from "./_components/OnboardingShell"

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const dict = await getDictionary("en")

  return (
    <Providers dict={dict}>
      <OnboardingShell>{children}</OnboardingShell>
    </Providers>
  )
}
