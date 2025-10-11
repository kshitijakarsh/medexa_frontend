export type TicketStatus = "Open" | "Pending" | "Resolved" | "Closed"
export type TicketPriority = "Low" | "Medium" | "High" | "Critical"

export type TicketComment = {
  id: string
  author: string
  message: string
  createdAt: string // ISO timestamp
}

export type SupportTicket = {
  id: string
  issue: string
  hospital: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string // ISO timestamp
  reportedBy: { name: string; email: string }
  description: string
  comments?: TicketComment[]
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
    reportedBy: { name: "Sarah Ali", email: "s.ali@alhayat.qa" },
    description:
      "When attempting to open the patient records module, users receive a 403 error. Affected for multiple admins since 5PM yesterday.",
    comments: [
      {
        id: "c1",
        author: "Sarah Ali",
        message: "Issue started after permission changes.",
        createdAt: iso(14),
      },
    ],
  },
  {
    id: "TKT-1002",
    issue: "Billing system showing incorrect totals",
    hospital: "Doha Medical Center",
    status: "Pending",
    priority: "High",
    createdAt: iso(45),
    reportedBy: { name: "Mohammed Khan", email: "mkhan@dmc.qa" },
    description:
      "Totals on the monthly billing report do not match itemized line items. Appears to be rounding issue.",
  },
  {
    id: "TKT-1003",
    issue: "Lab results not syncing with HIE",
    hospital: "Al Noor Hospital",
    status: "Open",
    priority: "High",
    createdAt: iso(90),
    reportedBy: { name: "Huda Nasser", email: "huda@alnoor.qa" },
    description:
      "Outbound HL7 interface queue shows retries with 504 gateway timeout.",
  },
  {
    id: "TKT-1004",
    issue: "User permission error for admin accounts",
    hospital: "Al Rayyan Health Center",
    status: "Resolved",
    priority: "Medium",
    createdAt: iso(180),
    reportedBy: { name: "Omar Saleh", email: "omar@arhc.qa" },
    description:
      "Admin role could not edit modules. Fixed after role policy sync.",
  },
  {
    id: "TKT-1005",
    issue: "System performance degradation during peak hours",
    hospital: "MediQ Hospital",
    status: "Open",
    priority: "Critical",
    createdAt: iso(240),
    reportedBy: { name: "Fatima Al-Ansari", email: "fatima@mediq.qa" },
    description:
      "Spike in response times between 10-12am. Possibly related to report exports.",
  },
  {
    id: "TKT-1006",
    issue: "Email notifications not being delivered",
    hospital: "Al Hayat Medical Center",
    status: "Pending",
    priority: "Medium",
    createdAt: iso(320),
    reportedBy: { name: "Dr. Ahmed", email: "ahmed@alhayatmed.qa" },
    description: "Password reset emails not received by users.",
  },
  {
    id: "TKT-1007",
    issue: "Dashboard widgets not loading properly",
    hospital: "Doha General Hospital",
    status: "Resolved",
    priority: "Low",
    createdAt: iso(480),
    reportedBy: { name: "Support Bot", email: "bot@dgh.qa" },
    description: "Widget cache invalidation fixed.",
  },
  {
    id: "TKT-1008",
    issue: "Cannot generate monthly reports",
    hospital: "Qatar Medical Center",
    status: "Pending",
    priority: "High",
    createdAt: iso(600),
    reportedBy: { name: "Laila Faris", email: "laila@qmc.qa" },
    description: "Report job fails with 500 error.",
  },
  {
    id: "TKT-1009",
    issue: "Mobile app login issues on iOS devices",
    hospital: "Al Wakra Medical Complex",
    status: "Closed",
    priority: "Medium",
    createdAt: iso(720),
    reportedBy: { name: "QA Team", email: "qa@awmc.qa" },
    description: "Patched in v2.1.1.",
  },
  {
    id: "TKT-1010",
    issue: "Need training for new staff members",
    hospital: "Sidra Medical Center",
    status: "Open",
    priority: "Low",
    createdAt: iso(900),
    reportedBy: { name: "HR Desk", email: "hr@sidra.qa" },
    description: "Requesting onboarding session next week.",
  },
  {
    id: "TKT-1011",
    issue: "Appointment scheduling conflicts",
    hospital: "Hamad General Hospital",
    status: "Resolved",
    priority: "Medium",
    createdAt: iso(1080),
    reportedBy: { name: "Reception", email: "reception@hgh.qa" },
    description: "Fixed by adjusting time slot overlap rules.",
  },
  {
    id: "TKT-1012",
    issue: "Data export feature not working",
    hospital: "The Cuban Hospital",
    status: "Open",
    priority: "High",
    createdAt: iso(1200),
    reportedBy: { name: "IT Desk", email: "it@tch.qa" },
    description: "Export worker crashes intermittently.",
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
