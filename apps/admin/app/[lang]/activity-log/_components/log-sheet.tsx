// // "use client"

// // import { useMemo } from "react"
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetDescription,
// //   SheetHeader,
// //   SheetTitle,
// // } from "@workspace/ui/components/sheet"
// // import { Badge } from "@workspace/ui/components/badge"
// // import type { AuditLog } from "./data"

// // type Props = {
// //   open: boolean
// //   onOpenChange: (v: boolean) => void
// //   log?: AuditLog | null
// // }

// // export function LogSheet({ open, onOpenChange, log }: Props) {
// //   const dateTime = useMemo(
// //     () => (log ? new Date(log.timestamp).toLocaleString() : ""),
// //     [log]
// //   )

// //   return (
// //     <Sheet open={open} onOpenChange={onOpenChange}>
// //       <SheetContent side="right" className="sm:max-w-md">
// //         <SheetHeader>
// //           <SheetTitle className="text-xl">Activity Details</SheetTitle>
// //           <SheetDescription>
// //             More context for the selected event
// //           </SheetDescription>
// //         </SheetHeader>

// //         {log ? (
// //           <div className="space-y-6 px-4 pb-4">
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">Type</div>
// //                 <Badge variant="outline">{log.type}</Badge>
// //               </div>
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">Status</div>
// //                 {log.status === "Failed" ? (
// //                   <Badge variant="destructive">Failed</Badge>
// //                 ) : (
// //                   <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
// //                     Success
// //                   </Badge>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="space-y-1">
// //               <div className="text-sm text-muted-foreground">Action Name</div>
// //               <div className="font-medium">{log.action}</div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">Hospital</div>
// //                 <div className="font-medium">{log.hospital}</div>
// //               </div>
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">
// //                   Performed By
// //                 </div>
// //                 <div className="font-medium">{log.performedBy}</div>
// //               </div>
// //             </div>

// //             <div className="space-y-1">
// //               <div className="text-sm text-muted-foreground">Date & Time</div>
// //               <div className="font-medium">{dateTime}</div>
// //             </div>

// //             {log.description ? (
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">Description</div>
// //                 <div className="text-sm leading-relaxed">{log.description}</div>
// //               </div>
// //             ) : null}

// //             {log.ipAddress ? (
// //               <div className="space-y-1">
// //                 <div className="text-sm text-muted-foreground">IP Address</div>
// //                 <div className="font-medium">{log.ipAddress}</div>
// //               </div>
// //             ) : null}
// //           </div>
// //         ) : null}
// //       </SheetContent>
// //     </Sheet>
// //   )
// // }




// "use client"

// import { useMemo } from "react"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@workspace/ui/components/sheet"
// import { Badge } from "@workspace/ui/components/badge"
// import type { AuditLog } from "./data"

// type Props = {
//   open: boolean
//   onOpenChange: (v: boolean) => void
//   log?: AuditLog | null
// }

// export function LogSheet({ open, onOpenChange, log }: Props) {
//   const dateTime = useMemo(
//     () => (log ? new Date(log.created_at).toLocaleString() : ""),
//     [log]
//   )

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent side="right" className="sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle className="text-xl">Activity Details</SheetTitle>
//           <SheetDescription>
//             More context for the selected event
//           </SheetDescription>
//         </SheetHeader>

//         {log ? (
//           <div className="space-y-6 px-4 pb-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <div className="text-sm text-muted-foreground">Type</div>
//                 <Badge variant="outline">{log.resource_type}</Badge>
//               </div>
//               <div className="space-y-1">
//                 <div className="text-sm text-muted-foreground">Status</div>
//                 {log.status === "failed" ? (
//                   <Badge variant="destructive">Failed</Badge>
//                 ) : (
//                   <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
//                     Success
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-1">
//               <div className="text-sm text-muted-foreground">Action</div>
//               <div className="font-medium">{log.action}</div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <div className="text-sm text-muted-foreground">Hospital</div>
//                 <div className="font-medium">{log.tenant.name_en}</div>
//               </div>
//               <div className="space-y-1">
//                 <div className="text-sm text-muted-foreground">Performed By</div>
//                 <div className="font-medium">{log.actor_type}</div>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <div className="text-sm text-muted-foreground">Date & Time</div>
//               <div className="font-medium">{dateTime}</div>
//             </div>

//             {log.before_detail || log.after_detail ? (
//               <div className="space-y-1">
//                 <div className="text-sm text-muted-foreground">Before Detail</div>
//                 <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
//                   {JSON.stringify(log.before_detail, null, 2)}
//                 </pre>

//                 <div className="text-sm text-muted-foreground">After Detail</div>
//                 <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
//                   {JSON.stringify(log.after_detail, null, 2)}
//                 </pre>
//               </div>
//             ) : null}
//           </div>
//         ) : null}
//       </SheetContent>
//     </Sheet>
//   )
// }



"use client"

import { useMemo } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Badge } from "@workspace/ui/components/badge"
import { AuditLog } from "@/lib/api/activity-logs/activity-logs"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  log?: AuditLog | null
}

export function LogSheet({ open, onOpenChange, log }: Props) {
  const dateTime = useMemo(
    () => (log ? new Date(log.created_at).toLocaleString() : ""),
    [log]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-md flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">Activity Details</SheetTitle>
          <SheetDescription>
            More context for the selected event
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-6">
          {log ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <Badge variant="outline">{log.resource_type}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  {log.status === "failed" ? (
                    <Badge variant="destructive">Failed</Badge>
                  ) : (
                    <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Success
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Action</div>
                <div className="font-medium">{log.action}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Hospital</div>
                  <div className="font-medium">{log.tenant.name_en}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Performed By</div>
                  <div className="font-medium">{log.actor_type}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div className="font-medium">{dateTime}</div>
              </div>

              {log.before_detail || log.after_detail ? (
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Before Detail</div>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(log.before_detail, null, 2)}
                  </pre>

                  <div className="text-sm text-muted-foreground">After Detail</div>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(log.after_detail, null, 2)}
                  </pre>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}
