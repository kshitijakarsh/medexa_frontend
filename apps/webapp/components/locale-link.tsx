// "use client"

// import Link, { LinkProps } from "next/link"
// import { useParams } from "next/navigation"
// import { defaultLocale } from "@/i18n/locales"

// interface LocaleLinkProps extends Omit<LinkProps, "href"> {
//   href: string
//   children: React.ReactNode
//   className?: string
// }

// export function LocaleLink({
//   href,
//   children,
//   className,
//   ...props
// }: LocaleLinkProps) {
//   const params = useParams<{ lang?: string }>()
//   const lang = params?.lang || defaultLocale

//   // Construct URL with lang: /[lang]/[path] or just /[path] for default locale
//   const localizedHref =
//     lang === defaultLocale
//       ? href.startsWith("/")
//         ? href
//         : `/${href}`
//       : href.startsWith("/")
//         ? `/${lang}${href}`
//         : `/${lang}/${href}`

//   return (
//     <Link href={localizedHref} className={className} {...props}>
//       {children}
//     </Link>
//   )
// }

"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import { defaultLocale, locales } from "@/i18n/locales"

interface LocaleLinkProps extends Omit<LinkProps, "href"> {
  href: string
  children: React.ReactNode
  className?: string
}

export function LocaleLink({
  href,
  children,
  className,
  ...props
}: LocaleLinkProps) {
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || defaultLocale

  const normalize = (path: string) => {
    if (!path.startsWith("/")) return `/${path}`
    return path
  }

  const localizedHref = (() => {
    const cleanHref = normalize(href)
    const segments = cleanHref.split("/").filter(Boolean)
    const first = segments[0]

    // If already localized → return as-is
    if (locales.includes(first as any)) {
      return cleanHref
    }

    // Default locale → no prefix
    if (lang === defaultLocale) {
      return cleanHref
    }

    // Add locale
    return `/${lang}${cleanHref}`
  })()

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
