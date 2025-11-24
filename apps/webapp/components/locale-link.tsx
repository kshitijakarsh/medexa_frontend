"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import { defaultLocale } from "@/i18n/locales"

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

  // Construct URL with lang: /[lang]/[path] or just /[path] for default locale
  const localizedHref =
    lang === defaultLocale
      ? href.startsWith("/")
        ? href
        : `/${href}`
      : href.startsWith("/")
        ? `/${lang}${href}`
        : `/${lang}/${href}`

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
