import { ReactNode } from "react"
import { Header } from "@/components/header"

export default function PharmacyLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <div className="w-full min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#E8F4FD] to-[#E0F7FA]">
        {children}
      </div>
      </div>
    </>
  )
}
