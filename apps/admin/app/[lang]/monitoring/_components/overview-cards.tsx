import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { OVERVIEW_METRICS } from "./data"
import { Activity, Building2, Users, Zap } from "lucide-react"

export function MonitoringOverviewCards() {
  const metrics = OVERVIEW_METRICS

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Activity className="size-5" />
            </div>
            <span>System Uptime</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {metrics.systemUptime}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">Last 30 days</Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Building2 className="size-5" />
            </div>
            <span>Active Hospitals</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {metrics.activeHospitals}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">Currently online</Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Users className="size-5" />
            </div>
            <span>Concurrent Users</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {metrics.concurrentUsers.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">Real-time</Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Zap className="size-5" />
            </div>
            <span>Avg API Response</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {metrics.avgApiResponseTime}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">Excellent</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
