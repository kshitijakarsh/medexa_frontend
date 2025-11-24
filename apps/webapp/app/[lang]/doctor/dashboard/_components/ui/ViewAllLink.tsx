"use client";

import Link from "next/link";

interface ViewAllLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function ViewAllLink({
  href,
  label = "View All",
  className = "",
}: ViewAllLinkProps) {
  return (
    <Link
      href={href}
      className={`
        text-sm text-[#0B84FF] font-medium hover:underline cursor-pointer
        ${className}
      `}
    >
      {label}
    </Link>
  );
}
