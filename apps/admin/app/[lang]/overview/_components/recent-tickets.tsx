import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  getRecentTickets,
  type SupportTicket,
} from "../../support/_components/data"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  ArrowRightIcon,
} from "lucide-react"
import { LocaleLink } from "@/components/locale-link"

function getPriorityIcon(priority: SupportTicket["priority"]) {
  switch (priority) {
    case "Critical":
      return <AlertCircle className="size-4 text-destructive" />
    case "High":
      return <AlertTriangle className="size-4 text-orange-500" />
    case "Medium":
      return <Info className="size-4 text-blue-500" />
    case "Low":
      return <Clock className="size-4 text-muted-foreground" />
  }
}

function getStatusIcon(status: SupportTicket["status"]) {
  switch (status) {
    case "Open":
      return <AlertCircle className="size-4" />
    case "Pending":
      return <Clock className="size-4" />
    case "Resolved":
      return <CheckCircle2 className="size-4" />
    case "Closed":
      return <CheckCircle2 className="size-4" />
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

function getPriorityVariant(
  priority: SupportTicket["priority"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (priority) {
    case "Critical":
      return "destructive"
    case "High":
      return "destructive"
    case "Medium":
      return "secondary"
    case "Low":
      return "outline"
  }
}

function getStatusVariant(
  status: SupportTicket["status"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Open":
      return "outline"
    case "Pending":
      return "secondary"
    case "Resolved":
      return "default"
    case "Closed":
      return "outline"
  }
}

export function RecentTicketsCard() {
  const tickets = getRecentTickets(5)

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-2">Recent Support Tickets</CardTitle>
            <CardDescription>Latest support requests</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <LocaleLink
              href="/support"
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
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-0.5 flex-shrink-0 size-8 rounded-full bg-muted flex items-center justify-center">
                {getPriorityIcon(ticket.priority)}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm leading-tight">
                    {ticket.issue}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimeAgo(ticket.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{ticket.id}</span>
                  <span>•</span>
                  <span className="truncate">{ticket.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={getStatusVariant(ticket.status)}
                    className="text-xs"
                  >
                    {getStatusIcon(ticket.status)}
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant={getPriorityVariant(ticket.priority)}
                    className="text-xs"
                  >
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
