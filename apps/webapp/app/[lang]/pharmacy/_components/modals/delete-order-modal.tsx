"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import type { Order } from "@/lib/api/order-api"
import { useDictionary } from "@/i18n/use-dictionary"

interface DeleteOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onConfirm: () => void
  isDeleting?: boolean
}

export function DeleteOrderModal({
  open,
  onOpenChange,
  order,
  onConfirm,
  isDeleting = false
}: DeleteOrderModalProps) {
  const dict = useDictionary()
  const pDict = dict.pages.pharmacy.orders
  const phCommonDict = dict.pages.pharmacy.common
  const commonDict = dict.common

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{pDict.modals.delete.title}</DialogTitle>
          <DialogDescription>
            {pDict.modals.delete.description.replace("{{id}}", order?.id.toString() || "")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            {commonDict.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? pDict.modals.delete.deleting : pDict.modals.delete.button}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
