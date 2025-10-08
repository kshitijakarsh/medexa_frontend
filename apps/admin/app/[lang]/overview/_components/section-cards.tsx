import {
  Banknote,
  CalendarSync,
  CheckCheck,
  Hospital,
  MonitorCog,
  Ticket,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Hospital className="size-5" />
            </div>
            <span>Total Hospitals</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            30
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp />
            +25%
          </Badge>
          <div className="line-clamp-1 flex gap-2 font-medium text-sm">
            +12 new this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <CalendarSync className="size-5" />
            </div>
            <span>Subscriptions</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            30
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp />
            +17%
          </Badge>
          <div className="line-clamp-1 flex gap-2 font-medium text-sm">
            +5 new customers
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Banknote className="size-5" />
            </div>
            <span>Monthly Revenue</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            $1,250.00
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
          <div className="line-clamp-1 flex gap-2 font-medium text-sm">
            +$125.00 vs last month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <MonitorCog className="size-5" />
            </div>
            <span>System Uptime</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            30
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <CheckCheck />
            99.9%
          </Badge>
          <div className="line-clamp-1 flex gap-2 font-medium text-sm">
            No downtime this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Ticket className="size-5" />
            </div>
            <span>Support Tickets</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            55
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingDown />
            -23%
          </Badge>
          <div className="line-clamp-1 flex gap-2 font-medium text-sm">
            +12 new this month
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
