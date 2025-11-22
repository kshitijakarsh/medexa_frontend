// lib/appointmentApi.ts

export async function getAppointments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Fatima Al-Sabah",
          mrn: "2501",
          avatar: "/avatar.png",
          vip: false,
          type: "emergency",
          room: "T-101",
          time: "09:00",
          status: "in-progress",
          note: "Stomach discomfort for 2 weeks",
          insurance: "Kuwait Insurance",
          age: "55Y / Male",
          phone: "283041234567",
        },

        {
          id: "2",
          name: "Fatima Al-Sabah",
          mrn: "2501",
          avatar: "/avatar.png",
          vip: true,
          type: "vip",
          room: "T-101",
          time: "09:00",
          status: "waiting",
          note: "Follow up",
          insurance: "Gulf Insurance",
        },

        {
          id: "3",
          name: "Fatima Al-Sabah",
          mrn: "2501",
          avatar: "/avatar.png",
          vip: false,
          type: "general",
          room: "T-101",
          time: "09:00",
          status: "waiting",
        },
      ]);
    }, 900);
  });
}
