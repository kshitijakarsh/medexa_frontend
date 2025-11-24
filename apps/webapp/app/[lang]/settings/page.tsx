import { Button } from "@workspace/ui/components/button"
import { headers } from "next/headers"
import Link from "next/link"

export default async function Settings({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const headersList = await headers()
  const { tenant: paramTenant } = await params
  const tenant = headersList.get("x-tenant") ?? paramTenant

  return (
    <div className="min-h-svh p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Hospital: {tenant}</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Hospital Name
                </label>
                <p className="mt-1 text-lg capitalize">
                  {tenant.replace(/-/g, " ")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tenant Slug
                </label>
                <p className="mt-1 font-mono text-sm">{tenant}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Domain
                </label>
                <p className="mt-1 font-mono text-sm">{tenant}.domain.com</p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about appointments
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">User Management</p>
                  <p className="text-sm text-muted-foreground">
                    Manage staff and user roles
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security</p>
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication and security settings
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg border-destructive/50">
            <h2 className="text-xl font-semibold mb-4 text-destructive">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">
                    Download all hospital data
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
