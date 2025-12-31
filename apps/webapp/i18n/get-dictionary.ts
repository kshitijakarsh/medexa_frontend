// import "server-only"
// import type { Locale } from "./locales"

// const dictionaries = {
//   en: () => import("./dictionaries/en.json").then((m) => m.default),
//   ar: () => import("./dictionaries/ar.json").then((m) => m.default),
// }

// export async function getDictionary(locale: Locale) {
//   return dictionaries[locale]()
// }

// export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

import "server-only"
import type { Locale } from "./locales"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
} as const

export async function getDictionary(locale: Locale) {
  const loader = dictionaries[locale]

  if (!loader) {
    throw new Error(`No dictionary found for locale: ${locale}`)
  }

  return loader()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
