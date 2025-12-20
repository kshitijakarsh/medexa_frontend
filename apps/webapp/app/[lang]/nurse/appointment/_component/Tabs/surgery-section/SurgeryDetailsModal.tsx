import { AppDialog } from "@/components/common/app-dialog";

export default function SurgeryDetailsModal({ open, onClose, surgery } : any) {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Surgery Details"
      maxWidth="max-w-5xl"
    >
      <div className="p-4">
        <p className="text-gray-600">Surgery details page coming next…</p>
      </div>
    </AppDialog>
  );
}
