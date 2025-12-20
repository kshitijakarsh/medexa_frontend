// "use client";

// import { useParams } from "next/navigation";
// import { format } from "@workspace/ui/hooks/use-date-fns";
// import { PageHeader } from "@/components/common/page-header";
// import { AttachmentHistoryDetailsSkeleton } from "../_components/AttachmentHistoryDetailsSkeleton";
// import {  useAttachmentHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useAttachments";
// import { Button } from "@workspace/ui/components/button";

// export default function AttachmentHistoryDetails() {
//   const { attachmentId } = useParams() as { attachmentId: string };

//   const { data, isLoading } = useAttachmentHistoryOneVisitId(attachmentId);
//   console.log(data)

//   if (isLoading || !data) return <AttachmentHistoryDetailsSkeleton />;

//   const createdAt = data.created_at ? new Date(data.created_at) : null;

//   return (
//     <div className="space-y-6 p-2">
//       <PageHeader title="Attachment Details" />

//       <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
//         <p className="font-semibold">
//           {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
//         </p>

//         <p className="text-xs text-gray-500">
//           Uploaded by{" "}
//           {data.createdBy
//             ? `${data.createdBy.first_name} ${data.createdBy.last_name}`
//             : "Unknown"}
//           {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
//         </p>

//         <div className="mt-6 bg-white border rounded-xl p-4">
//           <img
//             src={data.s3_url}
//             alt={data.title}
//             className="w-full rounded-lg"
//           />
//         </div>

//         <div className="mt-4 text-right">
//           <Button
//             className="bg-blue-600 text-white"
//             onClick={() => window.open(data.s3_url, "_blank")}
//           >
//             Download Document
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { AttachmentHistoryDetailsSkeleton } from "../_components/AttachmentHistoryDetailsSkeleton";
import { useAttachmentHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useAttachments";
import { useState } from "react";
import AttachmentCard from "../../../../_component/Tabs/attachment/AttachmentCard";
import AttachmentPreviewModal from "../../../../_component/Tabs/attachment/AttachmentPreviewModal";

export default function AttachmentHistoryDetails() {
  const { attachmentId: visitId } = useParams() as { attachmentId: string };

  const { data, isLoading } =
    useAttachmentHistoryOneVisitId(visitId);

  const [previewItem, setPreviewItem] = useState<any>(null);

  if (isLoading) return <AttachmentHistoryDetailsSkeleton />;

  const attachments = data ?? [];

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Attachment Details" />

      {attachments.length === 0 ? (
        <p className="text-sm text-gray-500">
          No attachments found for this visit.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {attachments.map((item: any) => (
            <AttachmentCard
              key={item.id}
              data={{
                title: item.title,
                preview: item.s3_url,
              }}
              onView={() => setPreviewItem(item)}
              // onDelete={() => {}} // ❌ No delete in history view
            />
          ))}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewItem && (
        <AttachmentPreviewModal
          open={true}
          onClose={() => setPreviewItem(null)}
          attachment={{
            title: previewItem.title,
            fileUrl: previewItem.s3_url,
            preview: previewItem.s3_url,
          }}
        />
      )}
    </div>
  );
}
