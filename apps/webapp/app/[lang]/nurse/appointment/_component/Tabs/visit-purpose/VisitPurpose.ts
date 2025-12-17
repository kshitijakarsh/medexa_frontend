// types/VisitPurpose.ts

export interface VisitPurposeData {
  chiefComplaint: string;   
  history: string;
  onset: string;
  duration: string;
  severity: string;
  additional_notes: string;
}

export interface VisitPurposeFormProps {
  data: VisitPurposeData;
  setData: React.Dispatch<React.SetStateAction<VisitPurposeData>>;
  setDirty: (dirty: boolean) => void;
}

export interface VisitPurposeErrors {
  chiefComplaint?: string;
  history?: string;
  onset?: string;
  duration?: string;
  severity?: string;
  additional_notes?: string;
}
