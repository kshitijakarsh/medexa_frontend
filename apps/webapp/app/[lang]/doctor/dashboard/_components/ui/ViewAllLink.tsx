"use client";

import Link from "next/link";

interface ViewAllLinkProps {
  href: string;
  label?: string;
  className?: string;
  disabled?: boolean; // NEW
}

export function ViewAllLink({
  href,
  label = "View All",
  className = "",
  disabled = false,
}: ViewAllLinkProps) {
  if (disabled) {
    return (
      <span
        className={`text-sm font-medium text-gray-400 cursor-not-allowed opacity-60 ${className}`}
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`text-sm text-[#0B84FF] font-medium hover:underline cursor-pointer ${className}`}
    >
      {label}
    </Link>
  );
}
