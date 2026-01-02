import { Header } from "@/components/header"
import { ReactNode } from "react"

export default async function TenantLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {


    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />
            {children}
        </main>
    )
}
