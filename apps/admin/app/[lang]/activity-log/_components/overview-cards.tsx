"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { summarizeLogs } from "./data"
import {
  CheckCheck,
  Loader2,
  Logs,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { createAuditLogsApiClient, AuditLog } from "@/lib/api/activity-logs/activity-logs"

export function ActivityOverviewCards() {
  const searchParams = useSearchParams()
  const range = searchParams.get("range") || "all"

  const { data: logs = [], isLoading, isError } = useQuery<AuditLog[]>({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const client = createAuditLogsApiClient({ authToken: "dev-token" })
      const response = await client.getAuditLogs()
      return response.data.data
    },
  })

  // Filter logs based on range (Sync with table logic)
  const filteredLogs = logs.filter((log) => {
    if (range === "all") return true

    const logDate = new Date(log.created_at)
    const now = new Date()

    if (range === "today") {
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      return logDate >= startOfToday
    }

    if (range === "7days") {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return logDate >= sevenDaysAgo
    }

    if (range === "30days") {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return logDate >= thirtyDaysAgo
    }

    return true
  })

  const summary = summarizeLogs(filteredLogs)

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="@container/card gap-2 py-4 flex flex-col items-center justify-center min-h-[160px] border-red-200 bg-red-50">
            <TrendingDown className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm text-red-600 font-medium">Failed to load data</p>
          </Card>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="@container/card gap-2 py-4 flex items-center justify-center min-h-[160px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Logs className="size-5" />
            </div>
            <span>Total Logs</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp /> Updated recently
          </Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <CheckCheck className="size-5" />
            </div>
            <span>Success</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.success}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp /> Rate{" "}
            {summary.total > 0 ? Math.round((summary.success / summary.total) * 100) : 0}%
          </Badge>
        </CardFooter>
      </Card>

      <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <TrendingDown className="size-5" />
            </div>
            <span>Failed</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.failed}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingDown />{" "}
            {summary.failed > 0 ? "Needs attention" : "Healthy"}
          </Badge>
        </CardFooter>
      </Card>

      {/* <Card className="@container/card gap-2 py-4">
        <CardHeader className="px-4">
          <CardDescription className="flex items-center gap-2 text-lg text-primary font-semibold">
            <div className="size-9 rounded-md bg-primary/10 flex items-center justify-center">
              <Hospital className="size-5" />
            </div>
            <span>Hospitals Affected</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl mt-2">
            {summary.hospitals}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-4">
          <Badge variant="outline">
            <TrendingUp /> Unique hospitals
          </Badge>
        </CardFooter>
      </Card> */}
    </div>
  )
}
