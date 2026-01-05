"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { NurseNote } from "./NurseNote";
import { Button } from "@workspace/ui/components/button";

interface ViewNurseNoteModalProps {
  note: NurseNote | null;
  open: boolean;
  onClose: () => void;
}

export function ViewNurseNoteModal({
  note,
  open,
  onClose,
}: ViewNurseNoteModalProps) {
  if (!note) return null;

  const createdAt = note.created_at ? new Date(note.created_at) : null;
  const createdBy = note.createdBy?.name ?? "Unknown";

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Nurse Note Details"
      description="View detailed information about this nurse note"
      headerColor="white"
      maxWidth="md:max-w-2xl"
    >
      <div className="space-y-6">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Date</label>
            <p className="text-base mt-1">
              {createdAt ? format(createdAt, "MMMM dd, yyyy") : "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Time</label>
            <p className="text-base mt-1">
              {createdAt ? format(createdAt, "hh:mm a") : "N/A"}
            </p>
          </div>
        </div>

        {/* Recorded By */}
        <div>
          <label className="text-sm font-medium text-gray-500">
            Recorded By
          </label>
          <div className="flex items-center gap-3 mt-2">
            {note.createdBy?.avatar ? (
              <img
                src={note.createdBy.avatar}
                alt={createdBy}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                {createdBy
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-base font-medium">{createdBy}</p>
              {note.createdBy?.email && (
                <p className="text-sm text-gray-500">{note.createdBy.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div>
          <label className="text-sm font-medium text-gray-500">
            Nurse Note
          </label>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {note.note}
            </p>
          </div>
        </div>

        {/* Patient Info (if available) */}
        {note.patient && (
          <div>
            <label className="text-sm font-medium text-gray-500">Patient</label>
            <p className="text-base mt-1">
              {note.patient.first_name} {note.patient.last_name}
            </p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
