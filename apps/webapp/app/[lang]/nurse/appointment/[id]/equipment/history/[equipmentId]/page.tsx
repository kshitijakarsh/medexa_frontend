"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { EquipmentHistoryDetailsSkeleton } from "../_components/HistorySkeletons";
import { useEquipmentHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useEquipment";
import { useState } from "react";
import EquipmentCard from "../../../../_component/Tabs/equipment/EquipmentCard";
import EquipmentPreviewModal from "../../../../_component/Tabs/equipment/EquipmentPreviewModal";

export default function EquipmentHistoryDetails() {
  const { equipmentId: visitId } = useParams() as { equipmentId: string };

  const { data, isLoading } = useEquipmentHistoryOneVisitId(visitId);

  const [previewItem, setPreviewItem] = useState<any>(null);

  if (isLoading) return <EquipmentHistoryDetailsSkeleton />;

  const equipments = data ?? [];

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Equipment Details" />

      {equipments.length === 0 ? (
        <p className="text-sm text-gray-500">
          No equipment found for this visit.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {equipments.map((item: any) => (
            <EquipmentCard
              key={item.id}
              data={{
                item_name: item.item_name,
                asset_tag: item.asset_tag,
                asset_id: item.asset_id,
                cost: item.cost,
                status: item.status || "Processing",
                created_at: item.created_at,
                condition_before_use: item.condition_before_use,
                notes: item.notes,
              }}
              onView={() => setPreviewItem(item)}
              // No delete in history view
            />
          ))}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewItem && (
        <EquipmentPreviewModal
          open={true}
          onClose={() => setPreviewItem(null)}
          equipment={{
            item_name: previewItem.item_name,
            asset_tag: previewItem.asset_tag,
            asset_id: previewItem.asset_id,
            cost: previewItem.cost,
            status: previewItem.status || "Processing",
            condition_before_use: previewItem.condition_before_use,
            start_time: previewItem.start_time,
            end_time: previewItem.end_time,
            notes: previewItem.notes,
          }}
        />
      )}
    </div>
  );
}
