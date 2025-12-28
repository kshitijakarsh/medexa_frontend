"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { ConsumableHistoryDetailsSkeleton } from "../_components/HistorySkeletons";
import { useConsumableHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useConsumables";
import { useState } from "react";
import ConsumableCard from "../../../../_component/Tabs/consumable/ConsumableCard";
import ConsumablePreviewModal from "../../../../_component/Tabs/consumable/ConsumablePreviewModal";

export default function ConsumableHistoryDetails() {
  const { consumableId: visitId } = useParams() as { consumableId: string };

  const { data, isLoading } = useConsumableHistoryOneVisitId(visitId);

  const [previewItem, setPreviewItem] = useState<any>(null);

  if (isLoading) return <ConsumableHistoryDetailsSkeleton />;

  const consumables = data ?? [];

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Consumable Details" />

      {consumables.length === 0 ? (
        <p className="text-sm text-gray-500">
          No consumables found for this visit.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {consumables.map((item: any) => (
            <ConsumableCard
              key={item.id}
              data={{
                item_name: item.item_name,
                quantity: item.quantity,
                cost: item.cost,
                status: item.status || "Processing",
                created_at: item.created_at,
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
        <ConsumablePreviewModal
          open={true}
          onClose={() => setPreviewItem(null)}
          consumable={{
            item_name: previewItem.item_name,
            quantity: previewItem.quantity,
            cost: previewItem.cost,
            status: previewItem.status || "Processing",
            notes: previewItem.notes,
          }}
        />
      )}
    </div>
  );
}
