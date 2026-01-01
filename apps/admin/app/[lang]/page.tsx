export const dynamic = "force-dynamic" /* temporary fix for suspense */
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/overview")
}
