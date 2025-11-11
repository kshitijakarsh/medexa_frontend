"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"

interface LocaleLinkProps extends Omit<LinkProps, "href"> {
  href: any
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

  // Add locale prefix to the href
  const localizedHref = href.startsWith("/")
    ? `/${href}`
    : `/${href}`

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}
