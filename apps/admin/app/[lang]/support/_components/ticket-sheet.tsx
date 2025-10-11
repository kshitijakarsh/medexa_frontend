"use client"

import { useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import type { SupportTicket, TicketStatus } from "./data"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  ticket?: SupportTicket | null
  onAddComment?: (ticketId: string, message: string) => void
  onChangeStatus?: (ticketId: string, status: TicketStatus) => void
}

export function TicketSheet({
  open,
  onOpenChange,
  ticket,
  onAddComment,
  onChangeStatus,
}: Props) {
  const [comment, setComment] = useState("")
  const created = useMemo(
    () => (ticket ? new Date(ticket.createdAt).toLocaleString() : ""),
    [ticket]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">Ticket Details</SheetTitle>
          <SheetDescription>
            Full context of the selected ticket
          </SheetDescription>
        </SheetHeader>

        {ticket ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-6 px-4 pb-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Ticket ID</div>
                <div className="font-medium">{ticket.id}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Issue</div>
                <div className="font-medium">{ticket.issue}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Hospital</div>
                  <div className="font-medium">{ticket.hospital}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">{created}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant="secondary">{ticket.status}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <Badge
                    variant={
                      ticket.priority === "Critical"
                        ? "destructive"
                        : ticket.priority === "High"
                          ? "default"
                          : ticket.priority === "Medium"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {ticket.priority}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Reported By</div>
                <div className="flex gap-2 items-center">
                  <h3 className="font-medium">{ticket.reportedBy?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ticket.reportedBy?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="text-sm leading-relaxed">
                  {ticket.description}
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-medium">Comments</div>

                <div className="space-y-2">
                  {ticket.comments?.length ? (
                    ticket.comments?.map((c) => (
                      <div key={c.id} className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{c.author}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(c.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm mt-1">{c.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No comments yet
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="pr-20"
                    rows={3}
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      if (!comment.trim() || !ticket) return
                      onAddComment?.(ticket.id, comment.trim())
                      setComment("")
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t p-4 space-y-2">
              <Select
                value={ticket.status}
                onValueChange={(value) =>
                  onChangeStatus?.(ticket.id, value as TicketStatus)
                }
              >
                <SelectTrigger className="border-transparent bg-muted shadow-none w-full px-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
