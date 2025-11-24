// // app/doctor-dashboard/api.ts
// export async function delay(ms = 700) { return new Promise(r => setTimeout(r, ms)); }

// export async function getAppointments() {
//   await delay(800);
//   return [
//     { id: 1, name: "Fatima Al-Sabah", mrn: "2501", time: "09:00", room: "T-101", type: "New", status: "Waiting", avatar: "/images/avatars/1.png", vip: false },
//     { id: 2, name: "Arlene McCoy", mrn: "2502", time: "09:10", room: "T-102", type: "VIP", status: "In progress", avatar: "/images/avatars/2.png", vip: true },
//     { id: 3, name: "Robert Fox", mrn: "2503", time: "09:20", room: "T-103", type: "Follow Up", status: "Waiting", avatar: "/images/avatars/3.png", vip: false },
//     // ... add more items to match screenshot, repeat with varied types
//   ];
// }


// app/doctor-dashboard/api.ts
export async function delay(ms = 700) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getAppointments() {
  await delay(800);

  return [
    // ROW 1
    { id: 1,  name: "Fatima Al-Sabah",   mrn: "2501", time: "09:00", room: "T-101", type: "New",        status: "Next",          avatar: "/images/avatars/1.png", vip: true },
    { id: 2,  name: "Arlene McCoy",      mrn: "2502", time: "09:05", room: "T-102", type: "Emergency",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 3,  name: "Robert Fox",        mrn: "2503", time: "09:10", room: "T-103", type: "VIP",        status: "In progress",   avatar: "/images/avatars/1.png", vip: true },
    { id: 4,  name: "Eleanor Pena",      mrn: "2504", time: "09:15", room: "T-104", type: "Waiting",    status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 5,  name: "Jane Cooper",       mrn: "2505", time: "09:20", room: "T-105", type: "New",        status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },

    // ROW 2
    { id: 6,  name: "Bessie Cooper",     mrn: "2506", time: "09:25", room: "T-106", type: "Follow Up",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 7,  name: "Dianne Russell",    mrn: "2507", time: "09:30", room: "T-107", type: "New",        status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 8,  name: "Savannah Nguyen",   mrn: "2508", time: "09:35", room: "T-108", type: "Follow Up",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 9,  name: "Ralph Edwards",     mrn: "2509", time: "09:40", room: "T-109", type: "VIP",        status: "In progress",   avatar: "/images/avatars/1.png", vip: true },
    { id: 10, name: "Jerome Bell",       mrn: "2510", time: "09:45", room: "T-110", type: "Standard",   status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },

    // ROW 3
    { id: 11, name: "Brooklyn Simmons",  mrn: "2511", time: "09:50", room: "T-111", type: "Emergency",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 12, name: "Wade Warren",       mrn: "2512", time: "09:55", room: "T-112", type: "VIP",        status: "In progress",   avatar: "/images/avatars/1.png", vip: true },
    { id: 13, name: "Theresa Webb",      mrn: "2513", time: "10:00", room: "T-113", type: "Follow Up",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 14, name: "Courtney Henry",    mrn: "2514", time: "10:05", room: "T-114", type: "New",        status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 15, name: "Albert Flores",     mrn: "2515", time: "10:10", room: "T-115", type: "Emergency",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },

    // ROW 4
    { id: 16, name: "Leslie Alexander",  mrn: "2516", time: "10:15", room: "T-116", type: "VIP",        status: "In Consultation", avatar: "/images/avatars/1.png", vip: true },
    { id: 17, name: "Jenny Wilson",      mrn: "2517", time: "10:20", room: "T-117", type: "Standard",   status: "Waiting",        avatar: "/images/avatars/1.png", vip: false },
    { id: 18, name: "Devon Lane",        mrn: "2518", time: "10:25", room: "T-118", type: "Follow Up",  status: "Waiting",        avatar: "/images/avatars/1.png", vip: false },
    { id: 19, name: "Cameron Williamson",mrn: "2519", time: "10:30", room: "T-119", type: "New",        status: "Waiting",        avatar: "/images/avatars/1.png", vip: false },
    { id: 20, name: "Guy Hawkins",       mrn: "2520", time: "10:35", room: "T-120", type: "VIP",        status: "In progress",    avatar: "/images/avatars/1.png", vip: true },

    // ROW 5
    { id: 21, name: "Jacob Jones",       mrn: "2521", time: "10:40", room: "T-121", type: "Emergency",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 22, name: "Kristin Watson",    mrn: "2522", time: "10:45", room: "T-122", type: "Follow Up",  status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 23, name: "Jane Cooper",       mrn: "2523", time: "10:50", room: "T-123", type: "Standard",   status: "Waiting",       avatar: "/images/avatars/1.png", vip: false },
    { id: 24, name: "Esther Howard",     mrn: "2524", time: "10:55", room: "T-124", type: "VIP",        status: "In Consultation", avatar: "/images/avatars/1.png", vip: true },
    { id: 25, name: "Philip Jones",      mrn: "2525", time: "11:00", room: "T-125", type: "New",        status: "Waiting",        avatar: "/images/avatars/1.png", vip: false },
  ];
}
