// "use client";

// import { useState } from "react";
// import NewButton from "@/components/common/new-button";
// import AddAttachmentModal from "./attachment/AddAttachmentModal";
// import AttachmentCard from "./attachment/AttachmentCard";
// import AttachmentPreviewModal from "./attachment/AttachmentPreviewModal";
// import { SectionWrapper } from "./common/SectionWrapper";
// import { FileStack } from "lucide-react";

// export default function Attachments() {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [previewItem, setPreviewItem] = useState(null);

//   const [attachments, setAttachments] = useState([
//     // Example:
//     // {
//     //   id: 1,
//     //   title: "Lab Report",
//     //   fileUrl: "/reports/lab.png",
//     //   preview: "/reports/lab.png"
//     // }
//   ]);

//   const addAttachment = (fileData) => {
//     setAttachments((prev) => [
//       ...prev,
//       { id: prev.length + 1, ...fileData },
//     ]);
//   };

//   return (
//     <SectionWrapper
//       header={
//         <div className="flex justify-between items-center">
//           {/* Header */}
//           <h2 className="text-lg font-semibold">Attachments</h2>

//           <NewButton
//             name="Add Attachments"
//             handleClick={() => setShowAddModal(true)}
//           />
//         </div>
//       }
//     >
//       {/* CONTENT */}
//       <div className="min-h-[240px]">

//         {/* Body */}
//         {attachments.length === 0 ? (
//           <EmptyAttachments onAdd={() => setShowAddModal(true)} />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {attachments.map((a) => (
//               <AttachmentCard
//                 key={a.id}
//                 data={a}
//                 onView={() => setPreviewItem(a)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Modals */}
//       <AddAttachmentModal
//         open={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={addAttachment}
//       />

//       {previewItem && (
//         <AttachmentPreviewModal
//           open={true}
//           onClose={() => setPreviewItem(null)}
//           attachment={previewItem}
//         />
//       )}
//     </SectionWrapper>
//   );
// }

// function EmptyAttachments({ onAdd }) {
//   return (
//     <div className="flex flex-col justify-center items-center h-72 text-gray-500">
//       <FileStack size={50} />
//       <p>There are no files attached.</p>

//       <button
//         onClick={onAdd}
//         className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
//       >
//         Add Attachments
//       </button>
//     </div>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import NewButton from "@/components/common/new-button";
import { SectionWrapper } from "./common/SectionWrapper";

import {
  useAttachmentsByVisitId,
  useDeleteAttachment,
} from "./_hooks/useAttachments";

import { useState } from "react";
import AttachmentCard from "./attachment/AttachmentCard";
import AddAttachmentModal from "./attachment/AddAttachmentModal";
import AttachmentPreviewModal from "./attachment/AttachmentPreviewModal";
import { AttachmentGridSkeleton } from "./attachment/AttachmentGridSkeleton";
import { FileStack } from "lucide-react";
import { AttachmentsHistory } from "./attachment/AttachmentsHistory";

export default function Attachments({ patientId }: { patientId: string }) {
  const { id: visitId } = useParams() as { id: string };

  const { data, isLoading } = useAttachmentsByVisitId(visitId);
  const deleteAttachment = useDeleteAttachment(visitId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const attachments = data ?? [];

  return (
    <>  
      <SectionWrapper
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Attachments</h2>
            <NewButton
              name="Add Attachments"
              handleClick={() => setShowAddModal(true)}
            />
          </div>
        }
      >
        <div className="min-h-[240px]">
          {isLoading ? (
            <AttachmentGridSkeleton />
          ) : attachments.length === 0 ? (
            <EmptyAttachments onAdd={() => setShowAddModal(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {attachments.map((a) => (
                <AttachmentCard
                  key={a.id}
                  data={{
                    title: a.title,
                    preview: a.s3_url,
                  }}
                  onView={() => setPreviewItem(a)}
                  onDelete={() => deleteAttachment.mutate(a.id)}
                />
              ))}
            </div>
          )}
        </div>

        <AddAttachmentModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          visitId={visitId}
          patientId={patientId}
        />

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
      </SectionWrapper>
      <AttachmentsHistory patientId={patientId} />
    </>
  );
}

function EmptyAttachments({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-72 text-gray-500">
      <FileStack size={50} />
      <p>There are no files attached.</p>
      <button
        onClick={onAdd}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
      >
        Add Attachments
      </button>
    </div>
  );
}
