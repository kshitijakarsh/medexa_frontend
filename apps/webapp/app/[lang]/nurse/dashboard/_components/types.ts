export interface VisitPatient {
  id: number;
  first_name: string;
  last_name: string;
  civil_id: string;
  mobile_number: string;
}




export interface VisitDepartment {
  id: number;
  department_name: string;
}


export interface VisitCharge {
  id: number;
  amount: number;
  status: string;
}



export interface VisitDoctorInfo {
  id: string;
  name: string;
  email: string;
}



export interface VisitItem {
  id: string;
  patient_id: string;
  department_id: string;
  procedure_type: string;
  machine_room: string;
  nurse_room: string;
  communication_mode: string;

  doctor_ids: VisitDoctorInfo[];

  visit_date: string;
  time_slot: string;
  shift: string;

  status: string;
  visit_type: string;
  patient_visit_type: string;

  tenant_id: string;
  created_at: string;
  updated_at: string;

  created_by: string;
  updated_by: string;

  patient: VisitPatient;
  department: VisitDepartment;
  charges: VisitCharge[];
}


export interface VisitPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}




export interface UseDoctorVisitsQueryProps {
  page?: number;
  limit?: number;
  status?: string;
  department_id?: string;
  patient_id?: string;
  enabled?: boolean;
  authToken?: string;
}


export interface DoctorVisitsResponse {
  success: boolean;
  message: string;
  data: VisitItem[];
  pagination: VisitPagination;
}
