// export function getMockEmployees(mode: string) {
//   if (mode === "humanResources") {
//     return Array.from({ length: 7 }).map((_, i) => ({
//       id: `ID12233${i}`,
//       name: "Dheeraj Acharya",
//       designation: i % 2 === 0 ? "Doctor" : "Nurse",
//       department: "Cardiology",
//       contact: "28765432154",
//       createdOn: "2025-09-27 19:30",
//       addedBy: "Dr. Ahmed Al-Mansouri",
//       status: "Active",
//       avatar: "https://i.pravatar.cc/100?img=" + (i + 1),
//     }));
//   }

//   // 🧩 Designation Master Data
//   if (mode === "designation") {
//     return [
//       { id: 1, name: "Dentist", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 2, name: "Doctor", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 3, name: "Accountant", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 4, name: "Lab Technician", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 5, name: "Billing Executive", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 6, name: "Designation Name", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//     ];
//   }

//   // 🧩 Specialization Data
//   if (mode === "specialization") {
//     return [
//       { id: 1, name: "Dentist", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 2, name: "Front Office", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 3, name: "Nurse", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 4, name: "Consultant", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 5, name: "Staff", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 6, name: "Specialization", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//     ];
//   }

//   // 🧩 User Roles Data
//   if (mode === "roles") {
//     return [
//       { id: 1, name: "Admin", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 2, name: "Doctor", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 3, name: "Receptionist", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 4, name: "Pharmacist", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//       { id: 5, name: "Cashier", status: "Active", createdOn: "2025-09-27 19:30", addedBy: "Dr. Ahmed Al-Mansouri" },
//     ];
//   }

//   // Default (empty)
//   return [];
// }



export function getMockEmployees(mode: string) {
  if (mode === "humanResources") {
    return Array.from({ length: 7 }).map((_, i) => ({
      id: `EMP12233${i}`,
      name: "Dheeraj Acharya",
      designation: i % 2 === 0 ? "Doctor" : "Nurse",
      department: "Cardiology",
      contact: "28765432154",
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=" + (i + 1),
    }));
  }

  // 🧩 Designation Master Data
  if (mode === "designation") {
    const data = [
      { name: "Dentist", status: "Active" },
      { name: "Doctor", status: "Active" },
      { name: "Accountant", status: "Active" },
      { name: "Lab Technician", status: "Active" },
      { name: "Billing Executive", status: "Active" },
      { name: "Designation Name", status: "Active" },
    ];

    // add serial number, createdOn, addedBy
    return data.map((item, index) => ({
      sno: index + 1,
      id: index + 1,
      ...item,
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    }));
  }

  // 🧩 Specialization Data
  if (mode === "specialization") {
    const data = [
      { name: "Dentist", status: "Active" },
      { name: "Front Office", status: "Active" },
      { name: "Nurse", status: "Active" },
      { name: "Consultant", status: "Active" },
      { name: "Staff", status: "Active" },
      { name: "Specialization", status: "Active" },
    ];

    return data.map((item, index) => ({
      sno: index + 1,
      id: index + 1,
      ...item,
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    }));
  }

  // 🧩 User Roles Data
  if (mode === "roles") {
    const data = [
      { name: "Admin", status: "Active" },
      { name: "Doctor", status: "Active" },
      { name: "Receptionist", status: "Active" },
      { name: "Pharmacist", status: "Active" },
      { name: "Cashier", status: "Active" },
    ];

    return data.map((item, index) => ({
      sno: index + 1,
      id: index + 1,
      ...item,
      createdOn: "2025-09-27 19:30",
      addedBy: "Dr. Ahmed Al-Mansouri",
    }));
  }

  // Default (empty)
  return [];
}
