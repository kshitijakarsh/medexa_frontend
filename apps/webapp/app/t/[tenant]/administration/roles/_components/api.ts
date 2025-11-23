export function getMockEmployees(mode: string) {
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

  return [];
}
