"use client"

import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import type { AuditLog } from "./data"
import { AUDIT_LOGS } from "./data"
import { FilterInput } from "@/components/filter-input"

function StatusBadge({ status }: { status: AuditLog["status"] }) {
  if (status === "Failed") {
    return <Badge variant="destructive">Failed</Badge>
  }
  return (
    <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
      Success
    </Badge>
  )
}

export function AuditLogTable() {
  const rows = AUDIT_LOGS.slice().sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
  )

  return (
    <div className="space-y-4 border rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Activity Log</h2>
        <div className="flex items-center gap-4">
          <FilterInput placeholder="Search" />
        </div>
      </div>
      <Table>
        <TableHeader className="bg-background [&_tr]:border-none">
          <TableRow className="hover:bg-transparent">
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Performed By</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {rows.map((log) => (
            <TableRow
              key={log.id}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
            >
              <TableCell className="py-2.5">
                <Badge variant="outline">{log.type}</Badge>
              </TableCell>
              <TableCell className="py-2.5 font-medium">{log.action}</TableCell>
              <TableCell className="py-2.5">{log.hospital}</TableCell>
              <TableCell className="py-2.5 text-muted-foreground">
                {log.performedBy}
              </TableCell>
              <TableCell className="py-2.5 text-muted-foreground">
                {new Date(log.timestamp).toLocaleString()}
              </TableCell>
              <TableCell className="py-2.5">
                <StatusBadge status={log.status} />
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <Button variant="link" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
