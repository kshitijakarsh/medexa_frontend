import { Button } from "@workspace/ui/components/button"
import { headers } from "next/headers"
import Link from "next/link"

export default async function TenantHome({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const headersList = await headers()
  const tenantFromHeader = headersList.get("x-tenant")
  const { tenant: paramTenant } = await params
  const tenant = tenantFromHeader ?? paramTenant

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">MedExe</h1>
          <p className="text-xl text-muted-foreground">Hospital: {tenant}</p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-center text-muted-foreground">
            Welcome to your hospital management portal
          </p>

          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline">Settings</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg w-full">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tenant Slug</p>
              <p className="font-mono">{tenant}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="text-green-500">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
