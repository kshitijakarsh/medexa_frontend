export interface AppointmentItem {
  id: string;
  name: string;
  mrn: string;
  avatar: string;
  vip?: boolean;
  type: string;
  room: string;
  time: string;
  status: string;
}
