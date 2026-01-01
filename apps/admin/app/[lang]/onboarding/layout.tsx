// import type { ReactNode } from "react"
// import { OnboardingShell } from "./_components/OnboardingShell"

// export default function OnboardingLayout({
//   children,
// }: {
//   children: ReactNode
// }) {
//   return <OnboardingShell>{children}</OnboardingShell>
// }

import type { ReactNode } from "react"
import { OnboardingShell } from "./_components/OnboardingShell"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

interface OnboardingLayoutProps {
  children: ReactNode
  params: Promise<{
    lang: Locale
  }>
}

export default async function OnboardingLayout({
  children,
  params,
}: OnboardingLayoutProps) {
  const dict = await getDictionary((await params).lang)

  return (
    <OnboardingShell dict={dict}>
      {children}
    </OnboardingShell>
  )
}

