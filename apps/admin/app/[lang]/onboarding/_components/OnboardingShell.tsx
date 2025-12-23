import { Suspense } from "react"
import type { ReactNode } from "react"
import type { Dictionary } from "@/i18n/get-dictionary"
import { OnboardingShellInner } from "./OnboardingShellInner"

export function OnboardingShell({
  children,
  dict,
}: {
  children: ReactNode
  dict: Dictionary
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-svh w-full flex items-center justify-center">
          <div className="text-slate-600">{dict.common.loading}</div>
        </main>
      }
    >
      <OnboardingShellInner dict={dict}>{children}</OnboardingShellInner>
    </Suspense>
  )
}
