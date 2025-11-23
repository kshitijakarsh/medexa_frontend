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
