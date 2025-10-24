"use client"

import { Badge } from "@workspace/ui/components/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import type { SupportTicket } from "./data"
import { SUPPORT_TICKETS } from "./data"
import { FilterInput } from "@/components/filter-input"
import { Button } from "@workspace/ui/components/button"
import { useState } from "react"
import { TicketSheet } from "./ticket-sheet"
import { EyeIcon } from "lucide-react"

function StatusBadge({ status }: { status: SupportTicket["status"] }) {
  switch (status) {
    case "Open":
      return <Badge variant="secondary">Open</Badge>
    case "Pending":
      return <Badge variant="secondary">Pending</Badge>
    case "Resolved":
      return <Badge variant="secondary">Resolved</Badge>
    case "Closed":
      return <Badge variant="secondary">Closed</Badge>
  }
}

function PriorityBadge({ priority }: { priority: SupportTicket["priority"] }) {
  switch (priority) {
    // case "Critical":
    //   return <Badge variant="destructive"   className="emerald-400">Critical</Badge>
    case "High":
      return <Badge variant="default" className="bg-rose-700">High</Badge>
    case "Medium":
      return <Badge variant="secondary" className="bg-amber-300">Medium</Badge>
    case "Low":
      return <Badge variant="default" className="bg-emerald-400 ">Low</Badge>
  }
}

export function SupportTable() {
  const rows = SUPPORT_TICKETS.slice().sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  )
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SupportTicket | null>(null)

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Support Tickets</h2>
        <div className="flex items-center gap-4">
          <FilterInput placeholder="Search tickets" />
        </div>
      </div>
      <Table>
        <TableHeader className="bg-background [&_tr]:border-none">
          <TableRow className="hover:bg-transparent">
            <TableHead>Ticket ID</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {rows.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
            >
              <TableCell className="py-2.5 font-medium">{ticket.id}</TableCell>
              <TableCell className="py-2.5">{ticket.issue}</TableCell>
              <TableCell className="py-2.5">{ticket.hospital}</TableCell>
              <TableCell className="py-2.5">
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell className="py-2.5">
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell className="py-2.5 text-muted-foreground">
                {new Date(ticket.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSelected(ticket)
                    setOpen(true)
                  }}
                >
                  <EyeIcon className="w-4 h-4 " />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TicketSheet
        open={open}
        onOpenChange={setOpen}
        ticket={selected}
        onAddComment={(id, message) => {
          // noop for mock data; could update local state if needed
          console.log("add-comment", id, message)
        }}
        onChangeStatus={(id, status) => {
          console.log("change-status", id, status)
        }}
      />
    </div>
  )
}
