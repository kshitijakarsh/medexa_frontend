"use client"

import { useState, useEffect } from "react"
import { Batch } from "@/lib/api/batch-api"
import { useCreateRequest } from "../../_hooks/useRequest"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { Loader2 } from "lucide-react"

type RequestType = "dispose" | "return" | "quarantine";

interface AddRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
}

export function AddRequestModal({
  open,
  onOpenChange,
  batch,
}: AddRequestModalProps) {
  const [requestType, setRequestType] = useState<RequestType>("dispose");
  const createRequest = useCreateRequest();

  // Common fields
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  // Dispose-specific fields
  const [disposalMethod, setDisposalMethod] = useState("");
  const [disposalDate, setDisposalDate] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [disposalLocation, setDisposalLocation] = useState("");

  // Return-specific fields
  const [returnTo, setReturnTo] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  // Quarantine-specific fields
  const [quarantineArea, setQuarantineArea] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [quarantineReason, setQuarantineReason] = useState("");
  const [qualityIssue, setQualityIssue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!batch) return;

    const basePayload: any = {
      batch_id: batch.id,
      request_type: requestType,
      quantity: parseInt(quantity),
      reason,
      notes,
    };

    if (requestType === "dispose") {
      basePayload.disposal_method = disposalMethod;
      basePayload.disposal_date = disposalDate;
      basePayload.authorized_by = authorizedBy;
      basePayload.disposal_location = disposalLocation;
    } else if (requestType === "return") {
      basePayload.return_to = returnTo;
      basePayload.return_reason = returnReason;
      basePayload.credit_amount = parseFloat(creditAmount);
      basePayload.tracking_number = trackingNumber;
    } else if (requestType === "quarantine") {
      basePayload.quarantine_area = quarantineArea;
      basePayload.review_date = reviewDate;
      basePayload.quarantine_reason = quarantineReason;
      basePayload.quality_issue = qualityIssue;
    }

    try {
      await createRequest.mutateAsync(basePayload);
      alert("Request created successfully!");
      onOpenChange(false);
    } catch (error) {
      alert("Failed to create request. Please try again.");
      console.error(error);
    }
  };

  const renderRequestTypeFields = () => {
    if (requestType === "dispose") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="disposalMethod">Disposal Method</Label>
            <Input
              id="disposalMethod"
              value={disposalMethod}
              onChange={(e) => setDisposalMethod(e.target.value)}
              placeholder="Enter disposal method"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disposalDate">Disposal Date</Label>
            <Input
              id="disposalDate"
              type="date"
              value={disposalDate}
              onChange={(e) => setDisposalDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorizedBy">Authorized By</Label>
            <Input
              id="authorizedBy"
              value={authorizedBy}
              onChange={(e) => setAuthorizedBy(e.target.value)}
              placeholder="Enter authorizer name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disposalLocation">Disposal Location</Label>
            <Input
              id="disposalLocation"
              value={disposalLocation}
              onChange={(e) => setDisposalLocation(e.target.value)}
              placeholder="Enter disposal location"
              required
            />
          </div>
        </>
      );
    }

    if (requestType === "return") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="returnTo">Return To</Label>
            <Input
              id="returnTo"
              value={returnTo}
              onChange={(e) => setReturnTo(e.target.value)}
              placeholder="Enter return destination"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnReason">Return Reason</Label>
            <Input
              id="returnReason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Enter return reason"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="creditAmount">Credit Amount</Label>
            <Input
              id="creditAmount"
              type="number"
              step="0.01"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              placeholder="Enter credit amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trackingNumber">Tracking Number</Label>
            <Input
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              required
            />
          </div>
        </>
      );
    }

    if (requestType === "quarantine") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="quarantineArea">Quarantine Area</Label>
            <Input
              id="quarantineArea"
              value={quarantineArea}
              onChange={(e) => setQuarantineArea(e.target.value)}
              placeholder="Enter quarantine area"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reviewDate">Review Date</Label>
            <Input
              id="reviewDate"
              type="date"
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quarantineReason">Quarantine Reason</Label>
            <Input
              id="quarantineReason"
              value={quarantineReason}
              onChange={(e) => setQuarantineReason(e.target.value)}
              placeholder="Enter quarantine reason"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualityIssue">Quality Issue</Label>
            <Input
              id="qualityIssue"
              value={qualityIssue}
              onChange={(e) => setQualityIssue(e.target.value)}
              placeholder="Describe quality issue"
              required
            />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Request</DialogTitle>
          <DialogDescription>
            Submit a new request for batch management
          </DialogDescription>
        </DialogHeader>

        {batch && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Batch Number:</span>{" "}
                {batch.batch_number}
              </div>
              <div>
                <span className="font-semibold">Medicine ID:</span>{" "}
                {batch.medicine_id}
              </div>
              <div>
                <span className="font-semibold">Available Quantity:</span>{" "}
                {batch.quantity}
              </div>
              <div>
                <span className="font-semibold">Expiry Date:</span>{" "}
                {batch.expiry_date && new Date(batch.expiry_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <Select
              value={requestType}
              onValueChange={(value) => setRequestType(value as RequestType)}
            >
              <SelectTrigger id="requestType">
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dispose">Dispose</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter additional notes"
              rows={3}
            />
          </div>

          {renderRequestTypeFields()}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending ? "Creating..." : "Create Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
