// Simulated API call
export async function fetchMasters() {
  await new Promise((res) => setTimeout(res, 800)); // simulate delay
  return [
    {
      title: "Departments",
      subtitle: "Eg: Cardiology, Neurology, Orthopedics, etc.",
      active: 120,
      category: "Organization Setup",
    },
    {
      title: "Ward/ Beds",
      subtitle: "ICU, General Ward, Maternity Ward, etc.",
      active: 130,
      category: "Organization Setup",
    },
    {
      title: "Operation Theatres / Procedure Rooms",
      subtitle: "OT1, OT2, minor procedure rooms, etc.",
      active: 120,
      category: "Organization Setup",
    },
    {
      title: "Human Resource",
      subtitle: "Eg: Doctor, Nurse, Designation, etc.",
      active: 100,
      category: "Staff & Roles",
    },
    {
      title: "Shifts & Attendance Configuration",
      subtitle: "Eg: General Ward, Maternity Ward, etc.",
      active: 120,
      category: "Staff & Roles",
    },
    {
      title: "Medical Procedure / Treatment Master",
      subtitle: "Cardiology, Neuro, Ortho, etc.",
      active: 120,
      category: "Services & Procedure",
    },
    {
      title: "Lab Test Master",
      subtitle: "CBC, Lipid panel, Widal, Maternity etc.",
      active: 120,
      category: "Services & Procedure",
    },
    {
      title: "Radiology / Imaging Test Master",
      subtitle: "X-Ray, MRI, CT-Scan, etc.",
      active: 120,
      category: "Services & Procedure",
    },
    {
      title: "Package / Scheme / Policy Setup",
      subtitle: "OP, IP, minor procedure etc.",
      active: 120,
      category: "Services & Procedure",
    },
    {
      title: "Tariff / Pricing / Service Charges",
      subtitle: "Cardiology, Neuro, Ortho, etc.",
      active: 120,
      category: "Services & Procedure",
    },
    {
      title: "Inventory / Consumables Master",
      subtitle: "Eg: Syringe, Gauze, Cotton, etc.",
      active: 120,
      category: "Inventory & Pharmacy Master",
    },
    {
      title: "Equipment / Asset Master",
      subtitle: "Eg: ECG, MRI, Ventilator, etc.",
      active: 120,
      category: "Inventory & Pharmacy Master",
    },
    {
      title: "Medicine / Drug Master",
      subtitle: "Eg: Paracetamol, Aspirin, etc.",
      active: 120,
      category: "Inventory & Pharmacy Master",
    },
    {
      title: "Supplier / Vendor Master",
      subtitle: "Eg: Apollo, MedPlus, etc.",
      active: 120,
      category: "Inventory & Pharmacy Master",
    },
  ];
}
