export interface Equipment {
  id: string;
  tenant_id: string;
  patient_id: string;
  visit_id: string;

  equipment_name: string;
  equipment_type: string;
  serial_number?: string;
  status: string;
  usage_duration?: string;
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
