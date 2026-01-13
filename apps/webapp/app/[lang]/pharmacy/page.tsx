"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function PharmacyPage() {
  const router = useRouter()
  const params = useParams()
  const lang = params?.lang || "en"

  useEffect(() => {
    router.replace(`/${lang}/pharmacy/dashboard`)
  }, [router, lang])

  return null
}
