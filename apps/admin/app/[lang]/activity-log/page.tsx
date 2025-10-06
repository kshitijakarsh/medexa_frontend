import { Header } from "@/components/header"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

const ActivityLogPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="max-w-7xl p-6 mx-auto">
        <h1 className="text-3xl font-bold">{dict.pages.activityLog.title}</h1>
      </div>
    </main>
  )
}

export default ActivityLogPage
