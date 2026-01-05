import { Header } from "@/components/header"
import HospitalsTable from "./_components/table"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"
import { Suspense } from "react"

const HospitalsPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          {dict.pages.hospitals.title}
        </h1>

        <Suspense fallback={<div>Loading hospitals...</div>}>
          <HospitalsTable dict={dict} />
        </Suspense>
      </div>
    </main>
  )
}

export default HospitalsPage
