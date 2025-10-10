import { Header } from "@/components/header"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"
import { SupportOverviewCards } from "./_components/overview-cards"
import { SupportTable } from "./_components/table"

const SupportPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 mx-auto">
        <h1 className="text-3xl font-bold">{dict.pages.support.title}</h1>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SupportOverviewCards />
              <SupportTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SupportPage
