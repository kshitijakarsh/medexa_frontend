import { ROUTES } from "@/lib/routes";

// Simulated API call
export async function fetchMasters() {
  // await new Promise((res) => setTimeout(res, 800)); // simulate delay
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
      title: "User",
      subtitle: "User creation, etc.",
      active: 10,
      category: "Organization Setup",
    },
    // {
    //   title: "Insurance",
    //   subtitle: "Health Insurance, Life Insurance, etc.",
    //   active: 90,
    //   category: "Organization Setup",
    // },
    {
      title: "Employees",
      subtitle: "Employees creation, etc.",
      active: 10,
      category: "Organization Setup",
    },
    {
      title: "Charges",
      subtitle: "Adding charges tax units and categories",
      active: 10,
      category: "Organization Setup",
    },
    {
      title: "Patients",
      subtitle: "Eg. VIP, standard",
      active: 120,
      category: "Organization Setup",
    },
    {
      title: "Operation / Operation Category",
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
      title: "Roles",
      subtitle: "Eg: Roles, etc.",
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
      title: "Insurance",
      subtitle: "Health Insurance, Life Insurance, etc.",
      active: 90,
      category: "Services & Procedure",
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



export const masterConfig: Record<
  string,
  { route: string; addOptions: string[], submoduleKeys?: string[]; }
> = {
  "Departments": {
    route: ROUTES.ADMINISTRATION_DEPARTMENT,
    addOptions: ["Department"],
    submoduleKeys: ["department"]
  },
  "Ward/ Beds": {
    route: ROUTES.ADMINISTRATION_UNITS_WARDS_BEDS,
    addOptions: ["Bed", "Bed Type", "Ward", "Floor"],
    submoduleKeys: ["bed_type", "floor", "ward", "ward_type"]

  },
  "Operation Theatres / Procedure Rooms": {
    route: ROUTES.ADMINISTRATION_OPERATION_THEATRES,
    addOptions: ["Theatre", "Procedure Room"],
    submoduleKeys: ["operationTheatres"]

  },
  "Insurance": {
    route: ROUTES.ADMINISTRATION_INSURANCE,
    addOptions: ["Insurance"],
    submoduleKeys: ["insurance"]

  },
  "User": {
    route: ROUTES.ADMINISTRATION_USER,
    addOptions: ["User"],
    submoduleKeys: ["user"]
  },
  "Operation / Operation Category": {
    route: ROUTES.ADMINISTRATION_OPERATION,
    addOptions: ["Operation", "Operation Category"],
    submoduleKeys: ["operationCategory"]

  },
  "Human Resource": {
    route: "/employee-configuration",
    addOptions: ["Doctor", "Nurse", "Designation", "Role"],
  },

  "Roles": {
    route: ROUTES.ADMINISTRATION_ROLES,
    addOptions: ["Roles"],
    submoduleKeys: ["role"]

  },
  "Shifts & Attendance Configuration": {
    route: "/masters/shifts",
    addOptions: ["Shift", "Attendance Type"],
  },
  "Medical Procedure / Treatment Master": {
    route: "/masters/procedures",
    addOptions: ["Treatment Type", "Specialization"],
  },
  "Lab Test Master": {
    route: "/masters/lab-test",
    addOptions: ["Test Category", "Test Type"],
  },
  "Radiology / Imaging Test Master": {
    route: "/masters/radiology",
    addOptions: ["Imaging Test", "Modality"],
  },
  "Package / Scheme / Policy Setup": {
    route: "/masters/packages",
    addOptions: ["Package", "Scheme", "Policy"],
  },
  "Charges": {
    route: ROUTES.ADMINISTRATION_CHARGES,
    addOptions: ["Service", "Category", "Tax", "Unit"],
    submoduleKeys: ["charges"]
  },
  "Patients": {
    route: ROUTES.ADMINISTRATION_PATIENTS,
    addOptions: ["Patient Category"],
    submoduleKeys: ["patientCategory"]
  },
  "Tariff / Pricing / Service Charges": {
    route: "/masters/tariff",
    addOptions: ["Service", "Charge"],
  },
  "Inventory / Consumables Master": {
    route: "/masters/inventory",
    addOptions: ["Consumable", "Category"],
  },
  "Equipment / Asset Master": {
    route: "/masters/equipment",
    addOptions: ["Equipment", "Asset Type"],
  },
  "Medicine / Drug Master": {
    route: "/masters/medicine",
    addOptions: ["Medicine", "Drug Type"],
  },
  "Supplier / Vendor Master": {
    route: "/masters/suppliers",
    addOptions: ["Supplier", "Vendor"],
  },
};
