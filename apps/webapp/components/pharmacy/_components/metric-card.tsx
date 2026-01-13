import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  valueColor?: string
}

export function MetricCard({ title, value, subtitle, valueColor = "text-blue-600" }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
