// app/doctor-dashboard/api.ts
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

  const avatar =
    "https://randomuser.me/api/portraits/women/44.jpg"; // working image URL

export const getTodayOverview = async () => {
  await delay(800);
  return { total: 8, completed: 3, pending: 5 };
};

export const getPatientTypes = async () => {
  await delay(800);
  return { newCount: 2, followUpCount: 6 };
};

export const getWorkloadStats = async () => {
  await delay(800);
  return { pendingResults: 4, prescriptionsIssued: 12 };
};

// export const getAlerts = async () => {
//   await delay(900);
//   return [
//     { id: 1, type: "emergency", title: "Emergency Patient Arrived", subtitle: "Yousef Al-Ghanim in ER-2" },
//     { id: 2, type: "emergency", title: "Emergency Patient Arrived", subtitle: "Yousef Al-Ghanim in ER-2" },
//     { id: 3, type: "insurance", title: "Insurance Pending", subtitle: "Jatinet Manam Khan (MRN-2S03)" }
//   ];
// };

export const getAlerts = async () => {
  await new Promise((r) => setTimeout(r, 700));

  return [
    {
      id: 1,
      type: "emergency",
      title: "Emergency Patient Arrived",
      subtitle: "Yousef Al-Ghanim in ER-2"
    },
    {
      id: 2,
      type: "patient",
      title: "Emergency Patient Arrived",
      subtitle: "Yousef Al-Ghanim in ER-2"
    },
    {
      id: 3,
      type: "insurance",
      title: "Insurance Pending",
      subtitle: "Jatient Manam Khan (MRN-2SO3)"
    }
  ];
};


export const getEmergencyPatients = async () => {
  await delay(900);
  return [
    { id: 1, name: "Fatima Al-Sabah", mrn: "2501", status: "In progress", time: "09:00", room: "T-101", type: "Emergency", avatar: "/images/avatars/1.png" },
    { id: 2, name: "Fatima Al-Sabah", mrn: "2501", status: "Waiting", time: "09:00", room: "T-101", type: "Emergency", avatar: "/images/avatars/1.png" },
    { id: 3, name: "Fatima Al-Sabah", mrn: "2501", status: "Waiting", time: "09:00", room: "T-101", type: "Emergency", avatar: "/images/avatars/1.png" }
  ];
};

export const getVipPatients = async () => {
  await delay(800);
  return [
    { id: 1, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress",  type: "Emergency", avatar: "/images/avatars/1.png" },
    { id: 2, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress",  type: "Emergency", avatar: "/images/avatars/1.png" },
    { id: 3, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress",   type: "Emergency", avatar: "/images/avatars/1.png" }
  ];
};

export const getFollowUpPatients = async () => {
  await delay(800);
  return [
    { id: 1, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress",  type: "Follow Up", avatar: "/images/avatars/1.png" },
    { id: 2, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress",  type: "Follow Up", avatar: "/images/avatars/1.png" },
    { id: 3, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", status: "In progress", type: "Follow Up", avatar: "/images/avatars/1.png" }
  ];
};

export const getAppointments = async () => {
  await delay(1100);
  // larger list to match screenshot
  return [
    { id: 1, token: "T-105", name: "Arlene McCoy", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "VIP", status: "In Consultation", avatar: "/images/avatars/1.png" },
    { id: 2, token: "T-105", name: "Robert Fox", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "VIP", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 3, token: "T-105", name: "Annette Black", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 4, token: "T-105", name: "Eleanor Pena", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 5, token: "T-105", name: "Jane Cooper", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 6, token: "T-105", name: "Bessie Cooper", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 7, token: "T-105", name: "Dianne Russell", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "New", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 8, token: "T-105", name: "Savannah Nguyen", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "Follow Up", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 9, token: "T-105", name: "Ralph Edwards", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "Follow Up", status: "Waiting", avatar: "/images/avatars/1.png" },
    { id: 10, token: "T-105", name: "Georgette Strobel", mrn: "MRN-2501", time: "10:30 pm", diagnosis: "Hypertension", type: "Follow Up", status: "Waiting", avatar: "/images/avatars/1.png" }
  ];
};


// Nurse Dashboard API Functions
export const getRecentVisits = async () => {
  await delay(900);
  return [
    {
      id: 1,
      patient: {
        id: 1,
        first_name: "Fatima",
        last_name: "Al-Sabah",
        gender: "Female",
        age: 45,
        mrn: "MRN-2501",
        avatar: "/images/avatars/1.png"
      },
      status: "critical",
      current_condition: "Post-operative monitoring",
      insurance: {
        provider: "Al Ahlia Insurance",
        policy_number: "POL-12345",
        status: "active"
      },
      nurse_room: "ICU-101",
      last_updated: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      patient: {
        id: 2,
        first_name: "Ahmed",
        last_name: "Al-Rashid",
        gender: "Male",
        age: 62,
        mrn: "MRN-2502",
        avatar: "/images/avatars/2.png"
      },
      status: "stable",
      current_condition: "Routine checkup",
      insurance: {
        provider: "Kuwait Insurance",
        policy_number: "POL-67890",
        status: "active"
      },
      nurse_room: "T-205",
      last_updated: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      patient: {
        id: 3,
        first_name: "Mariam",
        last_name: "Hassan",
        gender: "Female",
        age: 28,
        mrn: "MRN-2503",
        avatar: "/images/avatars/3.png"
      },
      status: "stable",
      current_condition: "Pre-natal care",
      insurance: {
        provider: "Gulf Insurance",
        policy_number: "POL-11223",
        status: "active"
      },
      nurse_room: "M-102",
      last_updated: "2024-01-15T08:45:00Z"
    },
    {
      id: 4,
      patient: {
        id: 4,
        first_name: "Yousef",
        last_name: "Al-Ghanim",
        gender: "Male",
        age: 55,
        mrn: "MRN-2504",
        avatar: "/images/avatars/4.png"
      },
      status: "critical",
      current_condition: "Emergency admission",
      insurance: {
        provider: "Warba Insurance",
        policy_number: "POL-44556",
        status: "active"
      },
      nurse_room: "ER-2",
      last_updated: "2024-01-15T11:00:00Z"
    }
  ];
};

export const getPriorityTasks = async () => {
  await delay(900);
  return [
    {
      id: 1,
      visit_id: 1,
      order_type: "iv_fluids",
      status: "pending",
      urgency: "stat",
      patient: {
        first_name: "Fatima",
        last_name: "Al-Sabah",
        mrn: "MRN-2501"
      },
      nurse_room: "ICU-101",
      details: {
        start_time: "2024-01-15T12:00:00Z",
        fluid_type: "Normal Saline",
        volume: "500ml"
      },
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      visit_id: 2,
      order_type: "medication",
      status: "pending",
      urgency: "urgent",
      patient: {
        first_name: "Ahmed",
        last_name: "Al-Rashid",
        mrn: "MRN-2502"
      },
      nurse_room: "T-205",
      details: {
        start_time: "2024-01-15T13:00:00Z",
        medication: "Paracetamol",
        dosage: "500mg"
      },
      created_at: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      visit_id: 3,
      order_type: "wound_dressing",
      status: "pending",
      urgency: "medium",
      patient: {
        first_name: "Mariam",
        last_name: "Hassan",
        mrn: "MRN-2503"
      },
      nurse_room: "M-102",
      details: {
        start_time: "2024-01-15T14:00:00Z",
        wound_location: "Left arm",
        dressing_type: "Gauze"
      },
      created_at: "2024-01-15T08:45:00Z"
    },
    {
      id: 4,
      visit_id: 4,
      order_type: "oxygen_therapy",
      status: "pending",
      urgency: "stat",
      patient: {
        first_name: "Yousef",
        last_name: "Al-Ghanim",
        mrn: "MRN-2504"
      },
      nurse_room: "ER-2",
      details: {
        start_time: "2024-01-15T11:30:00Z",
        flow_rate: "5L/min",
        delivery_method: "Nasal Cannula"
      },
      created_at: "2024-01-15T11:00:00Z"
    },
    {
      id: 5,
      visit_id: 1,
      order_type: "monitoring",
      status: "pending",
      urgency: "routine",
      patient: {
        first_name: "Fatima",
        last_name: "Al-Sabah",
        mrn: "MRN-2501"
      },
      nurse_room: "ICU-101",
      details: {
        start_time: "2024-01-15T15:00:00Z",
        vital_type: "Blood Pressure",
        frequency: "Every 2 hours"
      },
      created_at: "2024-01-15T10:30:00Z"
    }
  ];
};

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createDoctorVisitsApiClient } from "@/lib/api/doctor/dashboard";
import { createNurseVisitsApiClient } from "@/lib/api/nurse/dashboard";
import {
  DoctorVisitsResponse,
  UseDoctorVisitsQueryProps,
} from "./types";

export function useDoctorVisitsQuery(
  props: UseDoctorVisitsQueryProps
): UseQueryResult<DoctorVisitsResponse> {
  const {
    page = 1,
    limit = 10,
    status,
    department_id,
    patient_id,
    enabled = true,
    authToken ="",
  } = props;

  const doctorApi = createDoctorVisitsApiClient({});

  return useQuery<DoctorVisitsResponse>({
    queryKey: ["doctor-visits", page, status, department_id, patient_id],
    enabled: enabled || !!authToken,
    queryFn: async () => {
      const res = await doctorApi.getVisits({
        page,
        limit,
        status,
        department_id,
        patient_id,
      });
      return res.data;
    },
  });
}

export function useNurseVisitsQuery(
  props: UseDoctorVisitsQueryProps
): UseQueryResult<DoctorVisitsResponse> {
  const {
    page = 1,
    limit = 10,
    status,
    department_id,
    patient_id,
    enabled = true,
    authToken ="",
  } = props;

  const nurseApi = createNurseVisitsApiClient({});

  return useQuery<DoctorVisitsResponse>({
    queryKey: ["nurse-visits", page, status, department_id, patient_id],
    enabled: enabled || !!authToken,
    queryFn: async () => {
      const res = await nurseApi.getVisits({
        page,
        limit,
        status,
        department_id,
        patient_id,
      });
      return res.data;
    },
  });
}

export function useNurseAllVisitsQuery(
  props: UseDoctorVisitsQueryProps
): UseQueryResult<DoctorVisitsResponse> {
  const {
    page = 1,
    limit = 10,
    status,
    department_id,
    patient_id,
    enabled = true,
    authToken ="",
  } = props;

  const nurseApi = createNurseVisitsApiClient({});

  return useQuery<DoctorVisitsResponse>({
    queryKey: ["nurse-all-visits", page, status, department_id, patient_id],
    enabled: enabled || !!authToken,
    queryFn: async () => {
      const res = await nurseApi.getAllVisits({
        page,
        limit,
        status,
        department_id,
        patient_id,
      });
      return res.data;
    },
  });
}

export interface UseNurseOrdersQueryProps {
  page?: number;
  limit?: number;
  status?: string;
  urgency?: string;
  enabled?: boolean;
  authToken?: string;
}

export function useNurseOrdersQuery(
  props: UseNurseOrdersQueryProps
): UseQueryResult<any> {
  const {
    page = 1,
    limit = 10,
    status,
    urgency,
    enabled = true,
    authToken = "",
  } = props;

  const nurseApi = createNurseVisitsApiClient({});

  return useQuery<any>({
    queryKey: ["nurse-orders", page, status, urgency],
    enabled: enabled || !!authToken,
    queryFn: async () => {
      const res = await nurseApi.getNurseOrders({
        page,
        limit,
        status,
        urgency,
      });
      return res.data;
    },
  });
}

export function useAllNurseOrdersQuery(
  props: UseNurseOrdersQueryProps
): UseQueryResult<any> {
  const {
    page = 1,
    limit = 10,
    status,
    urgency,
    enabled = true,
    authToken = "",
  } = props;

  const nurseApi = createNurseVisitsApiClient({});

  return useQuery<any>({
    queryKey: ["nurse-orders-all", page, status, urgency],
    enabled: enabled || !!authToken,
    queryFn: async () => {
      const res = await nurseApi.getAllNurseOrders({
        page,
        limit,
        status,
        urgency,
      });
      return res.data;
    },
  });
}
