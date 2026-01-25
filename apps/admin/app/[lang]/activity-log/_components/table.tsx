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

import { useSearchParams } from "next/navigation"

import { DateRangeFilter } from "./date-range-filter"

export function AuditLogTable() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<AuditLog | null>(null)

  const searchParams = useSearchParams()
  const range = searchParams.get("range") || "all"

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data: logs = [], isLoading, isError } = useQuery<AuditLog[]>({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const client = createAuditLogsApiClient({ authToken: "dev-token" })
      const response = await client.getAuditLogs()
      return response.data.data
    },
  })

  // Filter logs based on range
  const filteredLogs = logs.filter((log) => {
    if (range === "all") return true

    const logDate = new Date(log.created_at)
    const now = new Date()

    if (range === "today") {
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      return logDate >= startOfToday
    }

    if (range === "7days") {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return logDate >= sevenDaysAgo
    }

    if (range === "30days") {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return logDate >= thirtyDaysAgo
    }

    return true
  })

  // Sort descending by created_at
  const sortedLogs = filteredLogs.slice().sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  )

  // Calculate pagination
  const totalData = sortedLogs.length
  const totalPages = Math.max(1, Math.ceil(totalData / itemsPerPage))

  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Activity Log</h2>
        <div className="flex items-center gap-4">
          <DateRangeFilter />
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading Activity logs...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-red-600 bg-red-50">
                <div className="flex items-center justify-center gap-2">
                  <span>Failed to load activity logs. Please try again.</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedLogs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No activity logs found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedLogs.map((log) => (
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
                    <EyeIcon className="w-4 h-4 " />
                  </Button>
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(itemsPerPage, totalData - (currentPage - 1) * itemsPerPage)} of {totalData}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <LogSheet open={open} onOpenChange={setOpen} log={selected} />
    </div>
  )
}
