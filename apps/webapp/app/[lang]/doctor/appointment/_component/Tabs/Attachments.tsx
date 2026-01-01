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
import { AttachmentsHistory } from "./attachment/AttachmentsHistory";
import { usePermissionGuard } from "@/app/hooks/usePermissionGuard";
import { FileStack } from "lucide-react";
import { PERMISSIONS, hasPermission, normalizePermissionList } from "@/app/utils/permissions";
import { Can } from "@/components/common/app-can";
import { useUserStore } from "@/store/useUserStore";

export default function Attachments({ patientId }: { patientId: string }) {
  const { id: visitId } = useParams() as { id: string };
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  const { data, isLoading } = useAttachmentsByVisitId(visitId);
  const deleteAttachment = useDeleteAttachment(visitId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const attachments = data ?? [];

  // PERMISSIONS
  // const { can } = usePermissionGuard();
  const rawPermissions = useUserStore((s) => s.user?.role.permissions);
  const normalizedPermissions = normalizePermissionList(rawPermissions);

  const canCreate = hasPermission(normalizedPermissions, PERMISSIONS.DOCTOR.ATTACHMENTS.CREATE);
  const canDelete = hasPermission(normalizedPermissions, PERMISSIONS.DOCTOR.ATTACHMENTS.DELETE);

  return (
    <>
      <SectionWrapper
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Attachments</h2>
            <Can
              permission={PERMISSIONS.DOCTOR.ATTACHMENTS.CREATE}
              userPermissions={userPermissions}
            >
              <NewButton
                name="Add Attachments"
                handleClick={() => setShowAddModal(true)}
              />
            </Can>
          </div>
        }
      >
        <div className="min-h-[240px]">
          {isLoading ? (
            <AttachmentGridSkeleton />
          ) : attachments.length === 0 ? (
            <EmptyAttachments
              onAdd={() => setShowAddModal(true)}
              canCreate={canCreate}
            />
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
                  canDelete={canDelete}
                />
              ))}
            </div>
          )}
        </div>

        {canCreate && (
          <AddAttachmentModal
            open={showAddModal}
            onClose={() => setShowAddModal(false)}
            visitId={visitId}
            patientId={patientId}
          />
        )}

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

function EmptyAttachments({
  onAdd,
  canCreate,
}: {
  onAdd: () => void;
  canCreate?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-72 text-gray-500">
      <FileStack size={50} />
      <p>There are no files attached.</p>
      {canCreate && (
        <button
          onClick={onAdd}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
        >
          Add Attachments
        </button>
      )}
    </div>
  );
}

