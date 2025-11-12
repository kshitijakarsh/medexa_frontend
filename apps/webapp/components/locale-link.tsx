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
  const params = useParams<{ lang?: string }>()

  // Add locale prefix to the href if locale exists in params
  const localizedHref = params?.lang
    ? href.startsWith("/")
      ? `/${params.lang}${href}`
      : `/${params.lang}/${href}`
    : href.startsWith("/")
    ? href
    : `/${href}`

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
