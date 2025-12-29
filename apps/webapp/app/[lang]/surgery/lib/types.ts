
export enum SurgeryStatus {
  IN_PROGRESS = 'Surgery in Progress',
  PRE_OP = 'Pre-op Preparation',
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed'
}



export interface SurgeryRecord {
  otRoom: string;
  patient: Patient;
  time: string;
  procedure: string;
  surgeon: string;
  specialty: string;
  status: SurgeryStatus;
}

export interface EmergencySurgery {
  name: string;
  mrn: string;
  procedure: string;
  time: string;
  room: string;
  avatar: string;
}

export interface CriticalAlert {
  id: number;
  type: 'overrun' | 'sterilization' | 'clearance';
  title: string;
  sub: string;
}


// --- Types ---

export interface CheckItemData {
  id?: string;
  label: string;
  status: string;
  date?: string;
  user?: string;
  category?: string;
  urgency?: string;
  testType?: string;
  type?: "default" | "uploaded" | "ordered";
  actionOptions?: "full" | "view-only";
}

export interface PendingItemData {
  label: string;
  status: "Pending";
}

export type PreOpItem =
  | { kind: "check", data: CheckItemData }
  | { kind: "pending", data: PendingItemData };

export interface SectionData {
  title: string;
  statusSuffix?: string;
  countSuffix?: string;
  items: PreOpItem[];
}

export interface PreOpStat {
  label: string;
  completed: number;
  total: number;
}

export interface PreOpSidebarItem {
  label: string;
  completedCount: number;
  pendingCount: number;
}

export interface PreOpSidebarHeader {
  title: string;
  completedCount: number;
  pendingCount: number;
}

/**
 * Doctor
 */
export type Doctor = {
  id?: string;
  name: string;
  department?: string;
};

/**
 * Urgency levels (medical-correct)
 */
export enum UrgencyLevel {
  Stat = "Stat",
  Urgent = "Urgent",
  Elective = "Elective",
}

/**
 * Surgery request (pre-approval / workflow)
 */
export interface SurgeryRequest {
  id: string;
  patient: Patient;
  requestedDoctor: Doctor;
  surgeon: Doctor;
  procedure: string;
  requestedFor: string; // ISO date string
  urgency: UrgencyLevel;
}

/**
 * Scheduled surgery information
 */
export interface SurgeryInfo {
  procedure: string;
  department: string;
  urgency: UrgencyLevel;
  estimatedDuration: string;
  date: string;
  time: string;
  otRoom: string;
}

/**
 * Surgical team
 */
export interface SurgicalTeam {
  teamName: string;
  surgeon: Doctor;
  assistants: Doctor[];
  anaesthetist: Doctor;
  scrubNurse: string;
  circulatingNurse: string;
  otTechnician: string;
}


export type Gender = "Male" | "Female" | "Other";

export type InsuranceStatus = "Active" | "Inactive";

export type PatientStatus = "CRITICAL" | "NORMAL";

/**
 * Patient — single source of truth
 */
export interface Patient {
  id?: string;
  idNumber?: string;
  name: string;
  mrn: string;
  age?: number;
  gender?: Gender;
  phone?: string;
  email?: string;
  insuranceProvider?: string;
  insuranceStatus?: InsuranceStatus;
  avatarUrl?: string;
  imageUrl?: string;
  randomNumber?: string;
}

/**
 * Patient dashboard view model
 * (replaces old PatientInfo)
 */
export interface PatientDashboardInfo {
  patient: Patient;
  status: PatientStatus;
  ward: string;
  attendingDoctor: Doctor;
  admissionDate: string;
  admissionTime: string;
  stayDuration: string;
  complaint: string;
}

/**
 * Dashboard aggregate
 */
export interface DashboardData {
  patient: Patient;
  surgery: SurgeryInfo;
  team: SurgicalTeam;
  activeProblems: ClinicalItem[];
  allergies: ClinicalItem[];
  medications: Medication[];
}

export interface SelectOption {
  label: string;
  value: string;
}


export type ClinicalItemType = "problem" | "allergy" | "medication";

/**
 * Problems, allergies, medications (generic clinical item)
 */
export interface ClinicalItem {
  id: string;
  name: string;
  detail?: string;
  type?: ClinicalItemType;
  category?: string;
}

/**
 * Medication details
 */
export interface Medication {
  slNo?: number;
  name: string;
  dose?: string;
  frequency?: string;
  remainingDuration?: string;
  detail?: string;
  category?: string;
}
