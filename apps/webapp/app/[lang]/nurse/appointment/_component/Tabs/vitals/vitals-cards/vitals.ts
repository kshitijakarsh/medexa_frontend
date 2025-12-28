export interface CreatedBy {
  id: number;
  name: string;
  email?: string;
}

export interface Vital {
  id: number;
  tenant_id: number;
  patient_id: number;
  visit_id: number;

  blood_pressure?: string | null;
  pulse_rate?: string | null;
  respiration_rate?: string | null;
  spo2?: string | null;

  systolic_left?: string | null;
  diastolic_left?: string | null;
  systolic_right?: string | null;
  diastolic_right?: string | null;

  temperature?: string | null;
  grbs?: string | null;
  hb?: string | null;
  height?: string | null;
  weight?: string | null;
  bmi?: string | null;
  ibw?: string | null;
  rbs?: string | null;

  additional_note?: string | null;

  created_at: string;
  updated_at?: string | null;

  createdBy?: CreatedBy | null;
}
