"use client"

import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { useParams } from "next/navigation"

export default function FrontOfficeDashboardPage() {
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F3F9FF] to-[#E3F6FE] p-6 flex justify-center">
      {/* Main Grid Container */}
      <div className="w-full max-w-[1600px] grid grid-cols-12 gap-6 items-start">
        {/* --- MAIN CONTENT AREA --- */}
        <div className="col-span-12 space-y-6">
          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appointment Book Card */}
            <Link href={`/${lang}/appointment/book`}>
              <div className="border border-[#CFE9FF] bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col items-center justify-center min-h-[200px]">
                <Calendar className="w-12 h-12 text-[#2CB470] mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Appointment Book
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Book new appointments
                </p>
              </div>
            </Link>

            {/* Patient Card */}
            <Link href={`/${lang}/patient`}>
              <div className="border border-[#CFE9FF] bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col items-center justify-center min-h-[200px]">
                <Users className="w-12 h-12 text-[#2CB470] mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Patient</h3>
                <p className="text-sm text-gray-500 mt-2">Manage patients</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
