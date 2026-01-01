// "use client"

// import type { ReactNode } from "react"
// import { Suspense } from "react"
// import Link from "next/link"
// import { useParams, usePathname, useSearchParams } from "next/navigation"
// import { Header } from "@/components/header"
// import { FormHeader } from "@/app/[lang]/onboarding/_components/ui/FormHeader"
// import { cn } from "@workspace/ui/lib/utils"
// import type { Dictionary } from "@/i18n/get-dictionary"

// const STEPS = [
//   { slug: "modules", key: "modulesAssignment" },
//   { slug: "payment", key: "paymentDetails" },
//   { slug: "licence-history", key: "licenceHistory" },
//   { slug: "regulatory-docs", key: "regulatoryDocuments" },
// ] as const

// type StepKey = (typeof STEPS)[number]["key"]

// interface OnboardingShellProps {
//   children: ReactNode
//   dict: Dictionary
// }

// function OnboardingShellContent({ children, dict }: OnboardingShellProps) {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const hospitalId = searchParams.get("hospitalId") || ""
//   const type = searchParams.get("type")
//   const isEditMode = type === "edit"
//   const params = useParams<{ lang: string }>()
//   const lang = params?.lang ?? "en"
//   const basePath = `/${lang}/onboarding`

//   const t = dict.pages.onboarding

//   const currentIndex = Math.max(
//     STEPS.findIndex((step) =>
//       pathname?.includes(`/onboarding/${step.slug}`)
//     ),
//     0
//   )

//   const currentStep = STEPS[currentIndex] ?? STEPS[0]!  /*assuming that currentIndex is valid and will never be empty */

//   const buildHref = (slug: string) => {
//     const path = `${basePath}/${slug}`
//     if (!hospitalId) return path
//     const query = new URLSearchParams({ hospitalId })
//     if (isEditMode) query.set("type", "edit")
//     return `${path}?${query.toString()}`
//   }

"use client"

import type { ReactNode } from "react"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { FormHeader } from "@/app/[lang]/onboarding/_components/ui/FormHeader"
import { cn } from "@workspace/ui/lib/utils"
import type { Dictionary } from "@/i18n/get-dictionary"

const STEPS = [
  { slug: "modules", key: "modulesAssignment" },
  { slug: "payment", key: "paymentDetails" },
  { slug: "licence-history", key: "licenceHistory" },
  { slug: "regulatory-docs", key: "regulatoryDocuments" },
] as const

type StepKey = (typeof STEPS)[number]["key"]

export function OnboardingShellInner({
  children,
  dict,
}: {
  children: ReactNode
  dict: Dictionary
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hospitalId = searchParams.get("hospitalId") || ""
  const type = searchParams.get("type")
  const isEditMode = type === "edit"
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"
  const basePath = `/${lang}/onboarding`

  const t = dict.pages.onboarding

  const currentIndex = Math.max(
    STEPS.findIndex((step) =>
      pathname?.includes(`/onboarding/${step.slug}`)
    ),
    0
  )

  const currentStep = STEPS[currentIndex] ?? STEPS[0]!

    const buildHref = (slug: string) => {
    const path = `${basePath}/${slug}`
    if (!hospitalId) return path
    const query = new URLSearchParams({ hospitalId })
    if (isEditMode) query.set("type", "edit")
    return `${path}?${query.toString()}`
  }

  return (
    <main className="min-h-svh w-full">
      <Header />

      <div className="flex flex-col items-start justify-between mb-6">
        <FormHeader
          title={
            isEditMode
              ? t.editOnboardingTitle
              : t.onboardingTitle
          }
          backHref={isEditMode ? undefined : `/${lang}/hospitals`}
        />

        {/* Step Indicator */}
        <div className="w-full px-4 pb-3 pt-7">
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((step, index) => {
              const status =
                index === currentIndex
                  ? "current"
                  : index < currentIndex
                  ? "complete"
                  : "upcoming"

              const stepNode = (
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    status === "current" && "bg-blue-600 text-white",
                    status === "complete" && "bg-green-500 text-white",
                    status === "upcoming" && "bg-slate-200 text-slate-600"
                  )}
                  aria-current={status === "current" ? "step" : undefined}
                >
                  {index + 1}
                </div>
              )

              return (
                <div key={step.slug} className="flex items-center">
                  {hospitalId ? (
                    <Link href={buildHref(step.slug)}>
                      {stepNode}
                    </Link>
                  ) : (
                    stepNode
                  )}

                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "w-12 h-1",
                        status === "complete"
                          ? "bg-green-500"
                          : status === "current"
                          ? "bg-blue-400"
                          : "bg-slate-200"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center mt-2 text-sm text-slate-600">
            {t.stepLabel
              .replace("{{current}}", String(currentIndex + 1))
              .replace("{{total}}", String(STEPS.length))
              .replace(
                "{{step}}",
                t.steps[currentStep.key]
              )}
          </div>
        </div>

        <div className="p-4 w-full py-3">
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </main>
  )
}

