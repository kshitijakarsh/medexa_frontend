"use client";

import { useParams } from "next/navigation";
import { SectionWrapper } from "./common/SectionWrapper";
import { useNurseOrdersByVisitId } from "@/app/[lang]/doctor/appointment/_component/Tabs/_hooks/useNurseOrders";
import { useState } from "react";
import ViewNurseOrderModal from "@/app/[lang]/doctor/appointment/_component/Tabs/nurse-orders/ViewNurseOrderModal";
import { ClipboardList, MoreVertical, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { ORDER_TYPE_LABELS } from "@/app/[lang]/doctor/appointment/_component/Tabs/nurse-orders/nurse-order";
import { StatusUpdateModal } from "@/app/[lang]/nurse/dashboard/_components/StatusUpdateModal";

export default function NurseOrders({ patientId }: { patientId: string }) {
  const { id: visitId } = useParams() as { id: string };

  const { data, isLoading } = useNurseOrdersByVisitId(visitId);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [viewOrder, setViewOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = data ?? [];

  const handleView = (order: any) => {
    setViewOrder(order);
    setShowViewModal(true);
  };

  const handleStatusUpdate = (order: any) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

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
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "ordered":
        return "bg-orange-100 text-orange-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "stat":
        return "text-red-600 font-semibold";
      case "urgent":
        return "text-orange-600 font-semibold";
      case "routine":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getOrderDetails = (order: any) => {
    const details = order.details || {};
    switch (order.order_type) {
      case "wound_dressing":
        return details.wound_location || "N/A";
      case "medication":
        return details.medication_name || "N/A";
      case "iv_fluids":
        return details.fluid_type || "N/A";
      case "oxygen_therapy":
        return details.oxygen_delivery_type || "N/A";
      case "monitoring":
        return details.parameter_to_monitor || "N/A";
      case "catheter_care":
        return details.catheter_type || "N/A";
      case "special_notes":
        return details.note_type || "N/A";
      default:
        return "N/A";
    }
  };

  const getFrequencyOrTime = (order: any) => {
    const details = order.details || {};
    return details.frequency || details.start_time || "N/A";
  };

  return (
    <>
      <SectionWrapper
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Nurse Orders</h2>
          </div>
        }
      >
        <div className="min-h-[240px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-72">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <EmptyNurseOrders />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3 font-semibold text-sm">Sl No</th>
                    <th className="text-left p-3 font-semibold text-sm">Order Type</th>
                    <th className="text-left p-3 font-semibold text-sm">Details</th>
                    <th className="text-left p-3 font-semibold text-sm">Urgency</th>
                    <th className="text-left p-3 font-semibold text-sm">Frequency/Time</th>
                    <th className="text-left p-3 font-semibold text-sm">Date & Time</th>
                    <th className="text-left p-3 font-semibold text-sm">Doctor</th>
                    <th className="text-left p-3 font-semibold text-sm">Status</th>
                    <th className="text-left p-3 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any, index: number) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{index + 1}</td>
                      <td className="p-3 text-sm">
                        {ORDER_TYPE_LABELS[order.order_type as keyof typeof ORDER_TYPE_LABELS] || order.order_type}
                      </td>
                      <td className="p-3 text-sm">{getOrderDetails(order)}</td>
                      <td className={`p-3 text-sm ${getUrgencyColor(order.urgency || "routine")}`}>
                        {order.urgency || "Routine"}
                      </td>
                      <td className="p-3 text-sm">{getFrequencyOrTime(order)}</td>
                      <td className="p-3 text-sm">
                        {order.created_at ? formatDateTime(order.created_at) : "N/A"}
                      </td>
                      <td className="p-3 text-sm">
                        {order.createdBy?.name
                          ? order.createdBy.name
                          : order.createdBy && order.createdBy.first_name
                          ? `Dr. ${order.createdBy.first_name} ${order.createdBy.last_name}`
                          : "N/A"}
                      </td>
                      <td className="p-3 text-sm">
                        <button
                          onClick={() => handleStatusUpdate(order)}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getStatusColor(order.status || "pending")}`}
                        >
                          {order.status || "Pending"}
                        </button>
                      </td>
                      <td className="p-3 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Action <MoreVertical size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleView(order)} 
                              className="cursor-pointer"
                            >
                              <Eye size={16} className="mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order)} 
                              className="cursor-pointer"
                            >
                              Update Status
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

        <ViewNurseOrderModal
          open={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setViewOrder(null);
          }}
          order={viewOrder}
        />

        {selectedOrder && (
          <StatusUpdateModal
            isOpen={showStatusModal}
            onClose={() => {
              setShowStatusModal(false);
              setSelectedOrder(null);
            }}
            task={selectedOrder}
          />
        )}
      </SectionWrapper>
    </>
  );
}

function EmptyNurseOrders() {
  return (
    <div className="flex flex-col justify-center items-center h-72 text-gray-500">
      <ClipboardList size={50} />
      <p>No nurse orders recorded.</p>
    </div>
  );
}
