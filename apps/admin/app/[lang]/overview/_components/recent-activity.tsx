import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { getRecentLogs } from "../../activity-log/_components/data"
import {
  Plus,
  Settings,
  AlertTriangle,
  UserPlus,
  UserX,
  LogIn,
  CheckCircle2,
  Activity,
  ArrowRightIcon,
} from "lucide-react"
import { LocaleLink } from "@/components/locale-link"

function getActivityIcon(type: string, status: string) {
  if (status === "Failed") {
    return <AlertTriangle className="size-4 text-destructive" />
  }

  switch (type) {
    case "Create":
      return <Plus className="size-4 text-primary" />
    case "Update":
      return <Settings className="size-4 text-blue-500" />
    case "Admin":
      return <UserPlus className="size-4 text-purple-500" />
    case "Suspend":
      return <UserX className="size-4 text-orange-500" />
    case "Login":
      return <LogIn className="size-4 text-cyan-500" />
    case "HIE":
      return <Activity className="size-4 text-emerald-500" />
    case "System":
      return <CheckCircle2 className="size-4 text-green-500" />
    default:
      return <Activity className="size-4 text-muted-foreground" />
  }
}

function formatTimeAgo(timestamp: string) {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000)

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const RecentActivityCard = () => {
  const logs = getRecentLogs(5)

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2">Recent Activity</CardTitle>
            <CardDescription>
              Latest operations across hospitals
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <LocaleLink
              href="/activity-log"
              className="inline-flex items-center gap-1.5"
            >
              <span>View all</span>
              <ArrowRightIcon className="size-4" />
            </LocaleLink>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <div>
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-0.5 flex-shrink-0 size-8 rounded-full bg-muted flex items-center justify-center">
                {getActivityIcon(log.type, log.status)}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm leading-tight">
                    {log.action}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimeAgo(log.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{log.performedBy}</span>
                  <span>•</span>
                  <span className="truncate">{log.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {log.type}
                  </Badge>
                  {log.status === "Failed" && (
                    <Badge variant="destructive" className="text-xs">
                      Failed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivityCard
