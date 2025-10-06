import { Header } from "@/components/header"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

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
      </div>
    </main>
  )
}
