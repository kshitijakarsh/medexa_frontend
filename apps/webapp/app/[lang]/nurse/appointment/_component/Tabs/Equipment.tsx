"use client";

import { useParams } from "next/navigation";
import NewButton from "@/components/common/new-button";
import { SectionWrapper } from "./common/SectionWrapper";

import {
  useEquipmentsByVisitId,
  useDeleteEquipment,
} from "./_hooks/useEquipment";

import { useState } from "react";
import AddEquipmentModal from "./equipment/AddEquipmentModal";
import EditEquipmentModal from "./equipment/EditEquipmentModal";
import EquipmentPreviewModal from "./equipment/EquipmentPreviewModal";
import { EquipmentGridSkeleton } from "./equipment/EquipmentGridSkeleton";
import { Stethoscope, MoreVertical, Trash2, Edit, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";

export default function Equipment({ patientId }: { patientId: string }) {
  const { id: visitId } = useParams() as { id: string };

  const { data, isLoading, refetch } = useEquipmentsByVisitId(visitId);
  const deleteEquipment = useDeleteEquipment(visitId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const equipments = data ?? [];

  const formatDateTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "returned":
        return "bg-green-100 text-green-700";
      case "processing":
      case "in use":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <SectionWrapper
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Equipment</h2>
            <NewButton
              name="Add Equipment"
              handleClick={() => setShowAddModal(true)}
            />
          </div>
        }
      >
        <div className="min-h-[240px]">
          {isLoading ? (
            <EquipmentGridSkeleton />
          ) : equipments.length === 0 ? (
            <EmptyEquipment onAdd={() => setShowAddModal(true)} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3 font-semibold text-sm">Sl No</th>
                    <th className="text-left p-3 font-semibold text-sm">Item Name</th>
                    <th className="text-left p-3 font-semibold text-sm">Asset ID</th>
                    <th className="text-left p-3 font-semibold text-sm">Issue Date & Time</th>
                    <th className="text-left p-3 font-semibold text-sm">Cost</th>
                    <th className="text-left p-3 font-semibold text-sm">Status</th>
                    <th className="text-left p-3 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {equipments.map((item: any, index: number) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{index + 1}</td>
                      <td className="p-3 text-sm">{item.item_name}</td>
                      <td className="p-3 text-sm">{item.asset_id || "N/A"}</td>
                      <td className="p-3 text-sm">{formatDateTime(item.created_at)}</td>
                      <td className="p-3 text-sm">{item.cost || "N/A"}</td>
                      <td className="p-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status || "Processing")}`}>
                          {item.status || "Processing"}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Action <MoreVertical size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setPreviewItem(item)} className="cursor-pointer">
                              <Eye size={16} className="mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditItem(item)} className="cursor-pointer">
                              <Edit size={16} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteEquipment.mutate(item.id)} 
                              className="cursor-pointer text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <AddEquipmentModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          visitId={visitId}
          patientId={patientId}
        />

        {editItem && (
          <EditEquipmentModal
            open={true}
            onClose={() => setEditItem(null)}
            equipment={editItem}
            onSuccess={() => refetch()}
          />
        )}

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
      </SectionWrapper>
    </>
  );
}

function EmptyEquipment({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-72 text-gray-500">
      <Stethoscope size={50} />
      <p>No equipment recorded.</p>
      <button
        onClick={onAdd}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
      >
        Add Equipment
      </button>
    </div>
  );
}
