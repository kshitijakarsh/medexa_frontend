"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"

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
  const params = useParams<{ lang: string }>()
  const lang = params?.lang || "en"

  // Add locale prefix to the href
  const localizedHref = href.startsWith("/")
    ? `/${lang}${href}`
    : `/${lang}/${href}`

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
