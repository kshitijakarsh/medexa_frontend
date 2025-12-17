"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { Button } from "@workspace/ui/components/button";

interface AttachmentPreviewModalProps {
  open: boolean,
  onClose: () => void,
  attachment: any
}

export default function AttachmentPreviewModal({
  open,
  onClose,
  attachment,
}: AttachmentPreviewModalProps) {
  const downloadFile = () => {
    const a = document.createElement("a");
    a.href = attachment.fileUrl;
    a.download = attachment.title ?? "attachment";
    a.click();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={attachment.title}
      // headerRight={
      //   <Button className="bg-blue-600 text-white" onClick={downloadFile}>
      //     Download Document
      //   </Button>
      // }
      maxWidth="max-w-3xl"
    >
      <div className="flex justify-end w-full">
        <Button className="bg-blue-600 text-white" onClick={downloadFile}>
          Download Document
        </Button>
      </div>
      <div className="p-4 max-h-[70vh] overflow-auto">
        <img
          src={attachment.preview}
          alt="Attachment Preview"
          className="w-full rounded-lg"
        />
      </div>
    </AppDialog>
  );
}
