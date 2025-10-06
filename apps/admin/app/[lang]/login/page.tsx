import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

const LoginPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <div>{dict.pages.login.title}</div>
}

export default LoginPage
