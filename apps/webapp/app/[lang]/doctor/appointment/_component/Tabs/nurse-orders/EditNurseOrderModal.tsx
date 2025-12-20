"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useUpdateNurseOrder } from "../_hooks/useNurseOrders";
import { useState, useEffect } from "react";
import { OrderType, ORDER_TYPE_LABELS } from "./nurse-order";

// IV Fluids Form
import IVFluidsForm from "./IVFluidsForm";
// Medication Form
import MedicationForm from "./MedicationForm";
// Wound Dressing Form
import WoundDressingForm from "./WoundDressingForm";
// Oxygen Therapy Form
import OxygenTherapyForm from "./OxygenTherapyForm";
// Special Notes Form
import SpecialNotesForm from "./SpecialNotesForm";
// Monitoring Form
import MonitoringForm from "./MonitoringForm";
// Catheter Care Form
import CatheterCareForm from "./CatheterCareForm";

interface EditNurseOrderModalProps {
  visitId: string;
  order: any | null;
  open: boolean;
  onClose: () => void;
}

export default function EditNurseOrderModal({
  visitId,
  order,
  open,
  onClose,
}: EditNurseOrderModalProps) {
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>("iv_fluids");
  const updateNurseOrder = useUpdateNurseOrder(visitId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update order type when order changes
  useEffect(() => {
    if (order) {
      setSelectedOrderType(order.order_type as OrderType);
    }
  }, [order]);

  const handleSubmit = async (formData: any) => {
    if (!order) return;

    try {
      setIsSubmitting(true);
      await updateNurseOrder.mutateAsync({
        id: order.id,
        payload: {
          order_type: selectedOrderType,
          urgency: formData.urgency,
          status: formData.status || order.status || "pending",
          details: formData.details,
          notes: formData.notes,
        },
      });

      onClose();
    } catch (error) {
      console.error("Error updating nurse order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitialValues = () => {
    if (!order) return {};

    return {
      urgency: order.urgency || "",
      status: order.status || "pending",
      notes: order.notes || "",
      ...order.details,
    };
  };

  const renderOrderForm = () => {
    if (!order) return null;

    const initialValues = getInitialValues();

    switch (selectedOrderType) {
      case "iv_fluids":
        return (
          <IVFluidsForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "medication":
        return (
          <MedicationForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "wound_dressing":
        return (
          <WoundDressingForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "oxygen_therapy":
        return (
          <OxygenTherapyForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "special_notes":
        return (
          <SpecialNotesForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "monitoring":
        return (
          <MonitoringForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      case "catheter_care":
        return (
          <CatheterCareForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={onClose}
            initialValues={initialValues}
            submitLabel="Update"
          />
        );
      default:
        return null;
    }
  };

  if (!order) return null;

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Edit Nurse Order"
    >
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Type</label>
          <Select
            value={selectedOrderType}
            onValueChange={(value) => setSelectedOrderType(value as OrderType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ORDER_TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {renderOrderForm()}
      </div>
    </AppDialog>
  );
}
