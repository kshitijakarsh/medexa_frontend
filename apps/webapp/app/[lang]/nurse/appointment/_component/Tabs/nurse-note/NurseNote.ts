export interface NurseNote {
  id: string;
  note: string;
  created_at: string;

  createdBy?: {
    id: number;
    name: string;
    email: string;
    avatar?:string;
  };

  patient?: {
    first_name: string;
    last_name: string;
  };
}
