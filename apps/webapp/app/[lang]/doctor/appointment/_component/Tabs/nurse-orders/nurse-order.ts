export interface NurseOrder {
  id: string;
  patient_id: string;
  visit_id: string;
  order_type: string;
  urgency: string;
  status: string;
  details: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  createdBy?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export type OrderType =
  | "iv_fluids"
  | "medication"
  | "wound_dressing"
  | "oxygen_therapy"
  | "special_notes"
  | "monitoring"
  | "catheter_care";

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  iv_fluids: "IV Fluids",
  medication: "Medication",
  wound_dressing: "Wound Dressing",
  oxygen_therapy: "Oxygen Therapy",
  special_notes: "Special Notes",
  monitoring: "Monitoring",
  catheter_care: "Catheter Care",
};
