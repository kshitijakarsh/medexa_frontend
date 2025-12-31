import { ROUTES } from "@/lib/routes";
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary";
import { Key } from "lucide-react";

// Simulated API call
export async function fetchMasters({ dict }: { dict: DictionaryType }) {

  const t = dict.pages.organizationSetupCards;
  // await new Promise((res) => setTimeout(res, 800)); // simulate delay
  return [
    {
     id: "Departments",
      title: t.items.departments.title,
      subtitle: t.items.departments.subtitle,
      active: 120,
      category: t.categories.organizationSetup,
    },
    {
     id: "Ward/ Beds",
      title: t.items.wardsBeds.title,
      subtitle: t.items.wardsBeds.subtitle,
      active: 130,
      category: t.categories.organizationSetup,
    },
    {
     id: "Operation Theatres / Procedure Rooms",
      title: t.items.operationTheatres.title,
      subtitle: t.items.operationTheatres.subtitle,
      active: 120,
      category: t.categories.organizationSetup,
    },
    {
     id: "User",
      title: t.items.users.title,
      subtitle: t.items.users.subtitle,
      active: 10,
      category: t.categories.organizationSetup,
    },
    // {
    //   title: "Insurance",
    //   subtitle: "Health Insurance, Life Insurance, etc.",
    //   active: 90,
    //   category: "Organization Setup",
    // },
    {
     id: "Employees",
      title: t.items.employees.title,
      subtitle: t.items.employees.subtitle,
      active: 10,
      category: t.categories.organizationSetup,
    },
    {
     id: "Charges",
      title: t.items.charges.title,
      subtitle: t.items.charges.subtitle,
      active: 10,
      category: t.categories.organizationSetup,
    },
    {
     id: "Patients",
      title: t.items.patients.title,
      subtitle: t.items.patients.subtitle,
      active: 120,
      category: t.categories.organizationSetup,
    },
    {
     id: "Operation / Operation Category",
      title: t.items.operationCategory.title,
      subtitle: t.items.operationCategory.subtitle,
      active: 120,
      category: t.categories.organizationSetup,
    },
    {
     id: "Human Resource",
      title: t.items.humanResource.title,
      subtitle: t.items.humanResource.subtitle,
      active: 100,
      category: t.categories.staffRoles,
    },
    {
     id: "Roles",
      title: t.items.roles.title,
      subtitle: t.items.roles.subtitle,
      active: 100,
      category: t.categories.staffRoles,
    },
    {
     id: "Shifts & Attendance Configuration",
      title: t.items.shiftsAttendance.title,
      subtitle: t.items.shiftsAttendance.subtitle,
      active: 120,
      category: t.categories.staffRoles,
    },
    {
     id: "Insurance",
      title: t.items.insurance.title,
      subtitle: t.items.insurance.subtitle,
      active: 90,
      category: t.categories.servicesProcedure,
    },

    {
     id: "Medical Procedure / Treatment Master",
      title: t.items.medicalProcedure.title,
      subtitle: t.items.medicalProcedure.subtitle,
      active: 120,
      category: t.categories.servicesProcedure,
    },
    {
     id: "Lab Test Master",
      title: t.items.labTest.title,
      subtitle: t.items.labTest.subtitle,
      active: 120,
      category: t.categories.servicesProcedure,
    },
    {
     id: "Radiology / Imaging Test Master",
      title: t.items.radiology.title,
      subtitle: t.items.radiology.subtitle,
      active: 120,
      category: t.categories.servicesProcedure,
    },
    {
     id: "Package / Scheme / Policy Setup",
      title: t.items.packageScheme.title,
      subtitle: t.items.packageScheme.subtitle,
      active: 120,
      category: t.categories.servicesProcedure,
    },
    {
     id: "Tariff / Pricing / Service Charges",
      title: t.items.tariffPricing.title,
      subtitle: t.items.tariffPricing.subtitle,
      active: 120,
      category: t.categories.servicesProcedure,
    },
    {
     id: "Inventory / Consumables Master",
      title: t.items.inventory.title,
      subtitle: t.items.inventory.subtitle,
      active: 120,
      category: t.categories.inventoryPharmacy,
    },
    {
     id: "Equipment / Asset Master",
      title: t.items.equipment.title,
      subtitle: t.items.equipment.subtitle,
      active: 120,
      category: t.categories.inventoryPharmacy,
    },
    {
     id: "Medicine / Drug Master",
      title: t.items.medicine.title,
      subtitle: t.items.medicine.subtitle,
      active: 120,
      category: t.categories.inventoryPharmacy,
    },
    {
     id: "Supplier / Vendor Master",
      title: t.items.supplier.title,
      subtitle: t.items.supplier.subtitle,
      active: 120,
      category: t.categories.inventoryPharmacy,
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

