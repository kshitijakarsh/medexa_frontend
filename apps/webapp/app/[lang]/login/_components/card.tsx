"use client"

import Image from "next/image"
import { Card, CardContent } from "@workspace/ui/components/card"
import { LoginForm } from "./form"
import { LOGOS } from "@/lib/logos"

export function LoginCard() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[387px]">
      {/* Background Decorative Shape */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[260px] bg-green-500 rounded-b-[60px] shadow-lg" /> */}

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-green-500 rounded-3xl shadow-lg pt-10">
          {/* Top Logo Panel */}
          <div className="absolute -top-[43px] left-1/2 -translate-x-1/2 bg-[#001A4D] rounded-t-2xl px-8 py-3 shadow-md min-w-[250px] w-full max-w-[337px] border-1 border-b-0 border-green-500">
            <div className="flex items-center justify-center">
              <Image
                src={LOGOS.main}
                alt="MedExa Logo"
                width={185}
                height={59}
                className="w-full max-w-[185px] h-auto"
                priority
              />
            </div>
          </div>

          {/* White Login Card */}
          <Card className="pt-6 rounded-3xl shadow-2xl border-none bg-white ">
            <CardContent className="px-8 pb-8">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subtle bottom blur for depth */}
      {/* <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-blue-100 to-transparent" /> */}
    </div>
  )
}
