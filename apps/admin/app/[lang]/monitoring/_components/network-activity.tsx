import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { NETWORK_ACTIVITY } from "./data"
import { ArrowDown, ArrowUp, Network, TrendingUp } from "lucide-react"

function getTrendIcon(trendType: "up" | "down" | "neutral") {
  switch (trendType) {
    case "up":
      return <ArrowUp className="size-4 text-emerald-500" />
    case "down":
      return <ArrowDown className="size-4 text-destructive" />
    case "neutral":
      return <TrendingUp className="size-4 text-muted-foreground" />
  }
}

export function NetworkActivity() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Network className="size-5" />
          <CardTitle>Network Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {NETWORK_ACTIVITY.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
          >
            <div className="space-y-0.5">
              <div className="font-medium">{metric.label}</div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {getTrendIcon(metric.trendType)}
                <span>{metric.trend}</span>
              </div>
            </div>
            <div className="text-xl font-bold">{metric.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
