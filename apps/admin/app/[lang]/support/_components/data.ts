export type TicketStatus = "Open" | "Pending" | "Resolved" | "Closed"
export type TicketPriority = "Low" | "Medium" | "High" | "Critical"

export type SupportTicket = {
  id: string
  issue: string
  hospital: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string // ISO timestamp
}

function iso(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000)
  return d.toISOString()
}

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "TKT-1001",
    issue: "Unable to access patient records module",
    hospital: "Al Hayat Clinic",
    status: "Open",
    priority: "Critical",
    createdAt: iso(15),
  },
  {
    id: "TKT-1002",
    issue: "Billing system showing incorrect totals",
    hospital: "Doha Medical Center",
    status: "Pending",
    priority: "High",
    createdAt: iso(45),
  },
  {
    id: "TKT-1003",
    issue: "Lab results not syncing with HIE",
    hospital: "Al Noor Hospital",
    status: "Open",
    priority: "High",
    createdAt: iso(90),
  },
  {
    id: "TKT-1004",
    issue: "User permission error for admin accounts",
    hospital: "Al Rayyan Health Center",
    status: "Resolved",
    priority: "Medium",
    createdAt: iso(180),
  },
  {
    id: "TKT-1005",
    issue: "System performance degradation during peak hours",
    hospital: "MediQ Hospital",
    status: "Open",
    priority: "Critical",
    createdAt: iso(240),
  },
  {
    id: "TKT-1006",
    issue: "Email notifications not being delivered",
    hospital: "Al Hayat Medical Center",
    status: "Pending",
    priority: "Medium",
    createdAt: iso(320),
  },
  {
    id: "TKT-1007",
    issue: "Dashboard widgets not loading properly",
    hospital: "Doha General Hospital",
    status: "Resolved",
    priority: "Low",
    createdAt: iso(480),
  },
  {
    id: "TKT-1008",
    issue: "Cannot generate monthly reports",
    hospital: "Qatar Medical Center",
    status: "Pending",
    priority: "High",
    createdAt: iso(600),
  },
  {
    id: "TKT-1009",
    issue: "Mobile app login issues on iOS devices",
    hospital: "Al Wakra Medical Complex",
    status: "Closed",
    priority: "Medium",
    createdAt: iso(720),
  },
  {
    id: "TKT-1010",
    issue: "Need training for new staff members",
    hospital: "Sidra Medical Center",
    status: "Open",
    priority: "Low",
    createdAt: iso(900),
  },
  {
    id: "TKT-1011",
    issue: "Appointment scheduling conflicts",
    hospital: "Hamad General Hospital",
    status: "Resolved",
    priority: "Medium",
    createdAt: iso(1080),
  },
  {
    id: "TKT-1012",
    issue: "Data export feature not working",
    hospital: "The Cuban Hospital",
    status: "Open",
    priority: "High",
    createdAt: iso(1200),
  },
]

export function getRecentTickets(limit = 10): SupportTicket[] {
  return [...SUPPORT_TICKETS]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit)
}

export function summarizeTickets(tickets: SupportTicket[]) {
  const total = tickets.length
  const open = tickets.filter((t) => t.status === "Open").length
  const resolved = tickets.filter((t) => t.status === "Resolved").length
  const critical = tickets.filter((t) => t.priority === "Critical").length
  const pending = tickets.filter((t) => t.status === "Pending").length
  return { total, open, resolved, critical, pending }
}
