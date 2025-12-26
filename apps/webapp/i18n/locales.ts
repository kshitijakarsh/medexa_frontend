export const locales = ["en", "nl", "ar"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
