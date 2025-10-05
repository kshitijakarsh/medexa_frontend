import { Button } from "@workspace/ui/components/button"
import { headers } from "next/headers"
import Link from "next/link"

export default async function Dashboard({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const headersList = await headers()
  const { tenant: paramTenant } = await params
  const tenant = headersList.get("x-tenant") ?? paramTenant

  return (
    <div className="min-h-svh p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Hospital: {tenant}</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Total Patients
            </h3>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-xs text-green-500 mt-2">+12% from last month</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Appointments Today
            </h3>
            <p className="text-3xl font-bold">56</p>
            <p className="text-xs text-blue-500 mt-2">8 pending confirmation</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Staff on Duty
            </h3>
            <p className="text-3xl font-bold">42</p>
            <p className="text-xs text-muted-foreground mt-2">
              Out of 68 total
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Add New Patient
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Reports
              </Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>New patient registered</span>
                <span className="text-muted-foreground">5 min ago</span>
              </div>
              <div className="flex justify-between">
                <span>Appointment completed</span>
                <span className="text-muted-foreground">12 min ago</span>
              </div>
              <div className="flex justify-between">
                <span>Lab result uploaded</span>
                <span className="text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
