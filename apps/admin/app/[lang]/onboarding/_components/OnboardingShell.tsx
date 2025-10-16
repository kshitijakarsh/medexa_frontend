"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { FormHeader } from "@/app/[lang]/onboarding/_components/ui/FormHeader"
import { cn } from "@workspace/ui/lib/utils"

const STEPS = [
  { slug: "modules", label: "Module Assignment" },
  { slug: "payment", label: "Payment Details" },
  { slug: "licence-history", label: "Licence History" },
  { slug: "regulatory-docs", label: "Regulatory Documents" },
]

interface OnboardingShellProps {
  children: ReactNode
}

export function OnboardingShell({ children }: OnboardingShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hospitalId = searchParams.get("hospitalId") || ""
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"
  const basePath = `/${lang}/onboarding`

  const currentIndex = Math.max(
    STEPS.findIndex((step) => pathname?.includes(`/onboarding/${step.slug}`)),
    0
  )
  const currentStep = STEPS[currentIndex] ?? STEPS[0]

  const buildHref = (slug: string) => {
    const path = `${basePath}/${slug}`
    if (!hospitalId) return path
    const query = new URLSearchParams({ hospitalId })
    return `${path}?${query.toString()}`
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="">
        <div className="flex flex-col items-start justify-between mb-6">
          <FormHeader
            title="Hospital Onboarding"
            backHref={`/${lang}/hospitals`}
          />

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

                const showConnector = index < STEPS.length - 1

                return (
                  <div key={step.slug} className="flex items-center">
                    {hospitalId ? (
                      <Link
                        href={buildHref(step.slug)}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                      >
                        {stepNode}
                      </Link>
                    ) : (
                      stepNode
                    )}

                    {showConnector && (
                      <div
                        className={cn(
                          "w-12 h-1 transition-colors",
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
              Step {Math.min(currentIndex + 1, STEPS.length)} of {STEPS.length}: {" "}
              {currentStep?.label}
            </div>
          </div>

          <div className="p-4 w-full py-3">
            <div className="space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
