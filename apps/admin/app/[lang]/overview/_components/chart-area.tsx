"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "@workspace/ui/lib/rechart"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import { cn } from "@workspace/ui/lib/utils"
// import { Button } from "@workspace/ui/components/button"
// import { FileText } from "lucide-react"
import { useTenants } from "@/hooks/useTenants"

export const description = "An area chart showing onboarding trends"

const chartConfig = {
  hospitals: {
    label: "Hospitals",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ChartAreaGradient({ className }: { className?: string }) {
  const { data: tenantsData, isLoading } = useTenants({
    initialParams: { limit: 1000 }, // Fetch enough to calculate trends
  })

  const chartData = useMemo(() => {
    if (!tenantsData?.data) return []

    const tenants = tenantsData.data
    const today = new Date()
    const last6Months: { month: string; fullDate: Date; count: number }[] = []

    // Generate last 6 months buckets
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      last6Months.push({
        month: d.toLocaleString("default", { month: "long" }),
        fullDate: d,
        count: 0,
      })
    }

    // Aggregate counts
    tenants.forEach((tenant) => {
      if (!tenant.created_at) return
      const createdDate = new Date(tenant.created_at)

      const bucket = last6Months.find(
        (m) =>
          m.fullDate.getMonth() === createdDate.getMonth() &&
          m.fullDate.getFullYear() === createdDate.getFullYear()
      )

      if (bucket) {
        bucket.count++
      }
    })

    // Format for Recharts
    return last6Months.map((m) => ({
      month: m.month,
      hospitals: m.count,
    }))
  }, [tenantsData])

  return (
    <Card className={cn("@container/card", className)}>
      <div className="flex justify-between gap-2 px-6 pt-6">
        <CardHeader className="flex-1 px-0 py-0">
          <CardTitle>Onboarding Trend</CardTitle>
          <CardDescription>
            Showing hospitals onboarded per month
          </CardDescription>
        </CardHeader>
        {/* <Button variant="outline" size="sm" className="hidden sm:flex">
          <FileText className="mr-2 size-4" />
          Export PDF
        </Button> */}
      </div>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="h-72 w-full flex items-center justify-center text-muted-foreground">
            Loading trend data...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <defs>
                <linearGradient id="fillHospitals" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-hospitals)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-hospitals)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="hospitals"
                type="natural"
                fill="url(#fillHospitals)"
                fillOpacity={0.4}
                stroke="var(--color-hospitals)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
