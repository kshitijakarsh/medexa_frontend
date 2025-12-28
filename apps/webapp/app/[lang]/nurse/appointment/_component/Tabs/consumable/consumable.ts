export interface Consumable {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;

  item_name: string;
  quantity: number;
  unit: string;
  description?: string;

  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;

  createdBy?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}
