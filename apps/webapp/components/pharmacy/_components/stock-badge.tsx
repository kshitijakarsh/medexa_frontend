import { Badge } from "@workspace/ui/components/badge"

interface StockBadgeProps {
  current: number
  minimum: number
}

export function StockBadge({ current, minimum }: StockBadgeProps) {
  const percentage = Math.round((current / Math.max(minimum, 1)) * 100)
  
  let variant: "default" | "outline" = "outline"
  let className = ""

  if (current >= minimum * 1.5) {
    className = "bg-green-50 text-green-700 border-green-200"
  } else if (current >= minimum) {
    className = "bg-blue-50 text-blue-700 border-blue-200"
  } else if (current > 0) {
    className = "bg-yellow-50 text-yellow-700 border-yellow-200"
  } else {
    className = "bg-red-50 text-red-700 border-red-200"
  }

  return (
    <div className="flex flex-col">
      <Badge variant={variant} className={className}>
        {current} units
      </Badge>
      <span className="text-xs text-muted-foreground mt-1">Min: {minimum}</span>
    </div>
  )
}
