"use client";

import { useParams } from "next/navigation";
import NewButton from "@/components/common/new-button";
import { SectionWrapper } from "./common/SectionWrapper";

import {
  useNurseOrdersByVisitId,
  useDeleteNurseOrder,
} from "./_hooks/useNurseOrders";

import { useState } from "react";
import AddNurseOrderModal from "./nurse-orders/AddNurseOrderModal";
import EditNurseOrderModal from "./nurse-orders/EditNurseOrderModal";
import ViewNurseOrderModal from "./nurse-orders/ViewNurseOrderModal";
import { ClipboardList, MoreVertical, Trash2, Edit, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { ORDER_TYPE_LABELS } from "./nurse-orders/nurse-order";

import { useDictionary } from "@/i18n/dictionary-context";

export default function NurseOrders({ patientId }: { patientId: string }) {
  const { id: visitId } = useParams() as { id: string };
  const dict = useDictionary();

  const { data, isLoading, refetch } = useNurseOrdersByVisitId(visitId);
  const deleteNurseOrder = useDeleteNurseOrder(visitId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [viewOrder, setViewOrder] = useState<any>(null);

  const orders = data ?? [];

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleView = (order: any) => {
    setViewOrder(order);
    setShowViewModal(true);
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
            <h2 className="text-lg font-semibold">{dict.pages.doctor.appointment.tabsContent.nurseOrders.title}</h2>
            <NewButton
              name={dict.pages.doctor.appointment.tabsContent.nurseOrders.add}
              handleClick={() => setShowAddModal(true)}
            />
          </div>
        }
      >
        <div className="min-h-[240px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-72">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <EmptyNurseOrders onAdd={() => setShowAddModal(true)} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.slNo}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.orderType}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.details}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.urgency}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.frequencyTime}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.dateTime}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.doctor}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.status}</th>
                    <th className="text-left p-3 font-semibold text-sm">{dict.pages.doctor.appointment.tabsContent.nurseOrders.table.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any, index: number) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{index + 1}</td>
                      <td className="p-3 text-sm">
                        {(dict.pages.doctor.appointment.tabsContent.nurseOrders.orderTypes as any)[order.order_type] || order.order_type}
                      </td>
                      <td className="p-3 text-sm">{getOrderDetails(order)}</td>
                      <td className={`p-3 text-sm ${getUrgencyColor(order.urgency)}`}>
                        {(dict.pages.doctor.appointment.tabsContent.nurseOrders.form.options as any)[order.urgency?.toLowerCase()] || order.urgency}
                      </td>
                      <td className="p-3 text-sm">{getFrequencyOrTime(order)}</td>
                      <td className="p-3 text-sm">{formatDateTime(order.created_at)}</td>
                      <td className="p-3 text-sm">
                        {order.createdBy && (order.createdBy as any).name
                          ? (order.createdBy as any).name
                          : order.created_by && typeof order.created_by === "object" && (order.created_by as any).name
                            ? (order.created_by as any).name
                            : order.createdBy && order.createdBy.first_name
                              ? `Dr. ${order.createdBy.first_name} ${order.createdBy.last_name}`
                              : "N/A"}
                      </td>
                      <td className="p-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || "pending")}`}>
                          {(dict.pages.doctor.appointment.tabsContent.nurseOrders.form.options as any)[order.status?.toLowerCase() || "pending"] || order.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.action} <MoreVertical size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleView(order)}
                              className="cursor-pointer"
                            >
                              <Eye size={16} className="mr-2" />
                              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(order)}
                              className="cursor-pointer"
                            >
                              <Edit size={16} className="mr-2" />
                              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteNurseOrder.mutate(order.id)}
                              className="cursor-pointer text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              {dict.pages.doctor.appointment.tabsContent.nurseOrders.table.delete}
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

        <AddNurseOrderModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          visitId={visitId}
          patientId={patientId}
        />

        <EditNurseOrderModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedOrder(null);
          }}
          visitId={visitId}
          order={selectedOrder}
        />

        <ViewNurseOrderModal
          open={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setViewOrder(null);
          }}
          order={viewOrder}
        />
      </SectionWrapper>
    </>
  );
}

function EmptyNurseOrders({ onAdd }: { onAdd: () => void }) {
  const dict = useDictionary();
  return (
    <div className="flex flex-col justify-center items-center h-72 text-gray-500">
      <ClipboardList size={50} />
      <p>{dict.pages.doctor.appointment.tabsContent.nurseOrders.empty}</p>
      <button
        onClick={onAdd}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
      >
        {dict.pages.doctor.appointment.tabsContent.nurseOrders.add}
      </button>
    </div>
  );
}
