"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form";

import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";

import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { useCreateNurseOrder } from "../_hooks/useNurseOrders";
import { useState } from "react";
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
import { useDictionary } from "@/i18n/dictionary-context";

interface AddNurseOrderModalProps {
  visitId: string;
  patientId: string;
  open: boolean;
  onClose: () => void;
}

export default function AddNurseOrderModal({
  visitId,
  patientId,
  open,
  onClose,
}: AddNurseOrderModalProps) {
  const dict = useDictionary();
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>("iv_fluids");
  const createNurseOrder = useCreateNurseOrder(visitId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      await createNurseOrder.mutateAsync({
        visit_id: visitId,
        patient_id: patientId,
        order_type: selectedOrderType,
        urgency: formData.urgency,
        status: formData.status || "pending",
        details: formData.details,
        notes: formData.notes,
      });

      setSelectedOrderType("iv_fluids");
      onClose();
    } catch (error) {
      console.error("Error creating nurse order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderOrderForm = () => {
    switch (selectedOrderType) {
      case "iv_fluids":
        return <IVFluidsForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "medication":
        return <MedicationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "wound_dressing":
        return <WoundDressingForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "oxygen_therapy":
        return <OxygenTherapyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "special_notes":
        return <SpecialNotesForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "monitoring":
        return <MonitoringForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      case "catheter_care":
        return <CatheterCareForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onCancel={onClose} />;
      default:
        return null;
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={() => {
        setSelectedOrderType("iv_fluids");
        onClose();
      }}
      title={dict.pages.doctor.appointment.tabsContent.nurseOrders.modal.title}
    >
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">{dict.pages.doctor.appointment.tabsContent.nurseOrders.modal.orderType}</label>
          <Select value={selectedOrderType} onValueChange={(value) => setSelectedOrderType(value as OrderType)}>
            <SelectTrigger>
              <SelectValue placeholder={dict.pages.doctor.appointment.tabsContent.nurseOrders.modal.selectOrderType} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(ORDER_TYPE_LABELS).map((key) => (
                <SelectItem key={key} value={key}>
                  {(dict.pages.doctor.appointment.tabsContent.nurseOrders.orderTypes as any)[key]}
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
