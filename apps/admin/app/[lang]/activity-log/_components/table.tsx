// "use client"

// import { Button } from "@workspace/ui/components/button"
// import { Badge } from "@workspace/ui/components/badge"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@workspace/ui/components/table"
// import type { AuditLog } from "./data"
// import { AUDIT_LOGS } from "./data"
// import { FilterInput } from "@/components/filter-input"
// import { useState } from "react"
// import { LogSheet } from "./log-sheet"

// function StatusBadge({ status }: { status: AuditLog["status"] }) {
//   if (status === "Failed") {
//     return <Badge variant="destructive">Failed</Badge>
//   }
//   return (
//     <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
//       Success
//     </Badge>
//   )
// }

// export function AuditLogTable() {
//   const rows = AUDIT_LOGS.slice().sort(
//     (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
//   )
//   const [open, setOpen] = useState(false)
//   const [selected, setSelected] = useState<AuditLog | null>(null)

//   return (
//     <div className="space-y-4 border rounded-xl p-4 bg-white">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-medium">Activity Log</h2>
//         <div className="flex items-center gap-4">
//           <FilterInput placeholder="Search" />
//         </div>
//       </div>
//       <Table>
//         <TableHeader className="bg-background [&_tr]:border-none">
//           <TableRow className="hover:bg-transparent">
//             <TableHead>Type</TableHead>
//             <TableHead>Action</TableHead>
//             <TableHead>Hospital</TableHead>
//             <TableHead>Performed By</TableHead>
//             <TableHead>Date & Time</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
//           {rows.map((log) => (
//             <TableRow
//               key={log.id}
//               className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
//             >
//               <TableCell className="py-2.5">
//                 <Badge variant="outline">{log.type}</Badge>
//               </TableCell>
//               <TableCell className="py-2.5 font-medium">{log.action}</TableCell>
//               <TableCell className="py-2.5">{log.hospital}</TableCell>
//               <TableCell className="py-2.5 text-muted-foreground">
//                 {log.performedBy}
//               </TableCell>
//               <TableCell className="py-2.5 text-muted-foreground">
//                 {new Date(log.timestamp).toLocaleString()}
//               </TableCell>
//               <TableCell className="py-2.5">
//                 <StatusBadge status={log.status} />
//               </TableCell>
//               <TableCell className="py-2.5 text-right">
//                 <Button
//                   variant="link"
//                   size="sm"
//                   onClick={() => {
//                     setSelected(log)
//                     setOpen(true)
//                   }}
//                 >
//                   View
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <LogSheet open={open} onOpenChange={setOpen} log={selected} />
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
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
import { FilterInput } from "@/components/filter-input"
import { LogSheet } from "./log-sheet"
import { AuditLog, createAuditLogsApiClient } from "@/lib/api/activity-logs/activity-logs"
import { EyeIcon, Loader2 } from "lucide-react"

function StatusBadge({ status }: { status: AuditLog["status"] }) {
  if (status === "failed") {
    return <Badge variant="destructive">Failed</Badge>
  }
  return (
    <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
      Success
    </Badge>
  )
}

export function AuditLogTable() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<AuditLog | null>(null)

  const { data: logs = [], isLoading } = useQuery<AuditLog[]>({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const client = createAuditLogsApiClient({ authToken: "dev-token" })
      const response = await client.getAuditLogs()
      return response.data.data
    },
  })

  // Sort descending by created_at
  const sortedLogs = logs.slice().sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  )

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Activity Log</h2>
        <div className="flex items-center gap-4">
          <FilterInput placeholder="Search" />
        </div>
      </div>

      {/* {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      ) : sortedLogs.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500 text-sm">
          No audit logs found.
        </div>
      ) : ( */}
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading Activity logs...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : sortedLogs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No activity logs found.
              </TableCell>
            </TableRow>
          ) : (
            sortedLogs.map((log) => (
              <TableRow
                key={log.id}
                className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
              >
                <TableCell className="py-2.5">
                  <Badge variant="outline">{log.resource_type}</Badge>
                </TableCell>
                <TableCell className="py-2.5 font-medium">{log.action}</TableCell>
                <TableCell className="py-2.5">{log.tenant.name_en}</TableCell>
                <TableCell className="py-2.5 text-muted-foreground">
                  {log.actor_type}
                </TableCell>
                <TableCell className="py-2.5 text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={log.status} />
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      setSelected(log)
                      setOpen(true)
                    }}
                    className="cursor-pointer text-sidebar "
                  >
                    <EyeIcon className="w-4 h-4 "/>
                  </Button>
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>
      {/* )} */}

      <LogSheet open={open} onOpenChange={setOpen} log={selected} />
    </div>
  )
}
