import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { DATABASE_HEALTH } from "./data"
import { Database } from "lucide-react"

export function DatabaseHealth() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="size-5" />
          <CardTitle>Database Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {DATABASE_HEALTH.map((metric) => (
          <div
            key={metric.name}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
          >
            <div className="font-medium">{metric.name}</div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{metric.value}</div>
              {metric.status === "good" && (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent"
                >
                  {metric.status}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
