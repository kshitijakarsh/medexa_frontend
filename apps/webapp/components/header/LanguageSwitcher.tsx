"use client"

import { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Globe2, ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLang = pathname.startsWith("/ar") ? "ar" : "en"
  const basePath = pathname.replace(/^\/(en|ar)/, "")
  console.log("Base Path:", basePath);
  const query = searchParams.toString()
  const suffix = query ? `?${query}` : ""

  return (
    <div className="relative">
      {/* Button */}
      <Button
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        className="bg-blue-50 hover:bg-blue-100 text-gray-700 rounded-full px-3 py-1.5 flex items-center gap-2 h-auto shadow-sm transition-all"
      >
        <span className="bg-green-500 text-white rounded-full p-1">
          <Globe2 className="h-3.5 w-3.5" />
        </span>

        <span className="text-sm font-medium">
          {currentLang === "ar" ? "العربية" : "English"}
        </span>

        <ChevronDown className="h-4 w-4 opacity-70" />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          <Link
            href={`/en${basePath}${suffix}`}
            onClick={() => setOpen(false)}
            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLang === "en" ? "font-semibold bg-gray-50" : ""
            }`}
          >
            English
          </Link>

          <Link
            href={`/ar${basePath}${suffix}`}
            onClick={() => setOpen(false)}
            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLang === "ar" ? "font-semibold bg-gray-50" : ""
            }`}
          >
            العربية
          </Link>
        </div>
      )}
    </div>
  )
}
