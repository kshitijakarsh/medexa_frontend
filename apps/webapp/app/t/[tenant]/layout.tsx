// export default function TenantLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return <>{children}</>
// }





import type { ReactNode } from "react"
import { Providers } from "@/components/providers"



export default async function TenantLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {


  return (
      <Providers >{children}</Providers>
  )
}
