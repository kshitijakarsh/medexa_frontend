import { Header } from "@/components/header"
import { ReactNode } from "react"

export default async function SurgeryLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] overflow-x-hidden">
            <Header />
            <div className="w-full p-3">
                {children}
            </div>
        </main>
    )
}
