export interface AppointmentItem {
  id: string;
  patient_id?: string;
  name: string;
  mrn: string;
  avatar: string;
  vip?: boolean;
  type: string;
  room?: string;
  time: string;
  status: string;
  insurance: string;
  details: string;
  insuranceName: string;
  permanent_address?:string;
  note: string;
  age: string;
  phone: string;
}


export interface SideBarAppointmentItem {
  id: string;          // visit id
  name: string;        // patient full name
  mrn: string;         // civil id
  avatar?: string;     // optional
  vip?: boolean;       // is VIP?
  type: string;        // visit type (vip, emergency, etc.)
  room?: string;       // optional
  time: string;        // time slot
  status: string;      // visit status
}
