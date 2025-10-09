import { Header } from "@/components/header"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"
import { ChartAreaGradient } from "./_components/chart-area"
import { ChartRadialText } from "./_components/radial-chart"
import { SectionCards } from "./_components/section-cards"

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 mx-auto">
        <h1 className="text-3xl font-bold">{dict.pages.overview.title}</h1>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChartAreaGradient className="lg:col-span-2 col-span-full" />
                <ChartRadialText className="lg:col-span-1 col-span-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
