import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { summarizeTickets, SUPPORT_TICKETS } from "./data"
import { CheckCircle2, AlertCircle, Ticket, Clock } from "lucide-react"

export function SupportOverviewCards() {
  const summary = summarizeTickets(SUPPORT_TICKETS)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Ticket className="size-5" />
            </div>
            <span>Total Tickets</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">All time</Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <AlertCircle className="size-5" />
            </div>
            <span>Open Tickets</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.open}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">Needs attention</Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
            <span>Resolved</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.resolved}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            Resolution rate{" "}
            {Math.round((summary.resolved / Math.max(summary.total, 1)) * 100)}%
          </Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Clock className="size-5" />
            </div>
            <span>Critical Issues</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.critical}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            {summary.critical > 0 ? "Urgent attention required" : "All clear"}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
