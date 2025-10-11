import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { SERVICES } from "./data"
import { Activity, CheckCircle2 } from "lucide-react"

export function ServiceStatus() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="size-5" />
          <CardTitle>Service Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="flex items-start gap-3 p-4 rounded-lg border bg-muted/20"
            >
              <div className="mt-0.5 flex-shrink-0">
                <CheckCircle2 className="size-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-medium">{service.name}</div>
                <div className="text-xs text-muted-foreground">
                  Uptime: {service.uptime} • {service.lastChecked}
                </div>
                <Badge
                  variant="outline"
                  className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent"
                >
                  {service.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
