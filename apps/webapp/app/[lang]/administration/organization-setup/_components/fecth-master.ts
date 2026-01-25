import { ROUTES } from "@/lib/routes";
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary";
import { createDepartmentApiClient } from "@/lib/api/administration/department";
import { createWardApiClient } from "@/lib/api/administration/wards";
import { createOperationApiClient } from "@/lib/api/administration/operation";
import { createUserApiClient } from "@/lib/api/administration/users";
import { createEmployeeApiClient } from "@/lib/api/employees";
import { createChargesApiClient } from "@/lib/api/administration/charges";
import { createPatientCategoryApiClient } from "@/lib/api/administration/patients";
import { createRoleApiClient } from "@/lib/api/administration/roles";
import { createInsuranceApiClient } from "@/lib/api/administration/insurance";
import { createMedicineApiClient } from "@/lib/api/medicine-api";

// API Clients - Initialize with empty config as they get token internally
const deptApi = createDepartmentApiClient({ authToken: "" });
const wardApi = createWardApiClient();
const opApi = createOperationApiClient();
const userApi = createUserApiClient();
const empApi = createEmployeeApiClient({ authToken: "" });
const chargesApi = createChargesApiClient({});
const patientCatApi = createPatientCategoryApiClient();
const roleApi = createRoleApiClient();
const insuranceApi = createInsuranceApiClient({ authToken: "" });
const medicineApi = createMedicineApiClient({});

export async function fetchMasters({ dict }: { dict: DictionaryType }) {
  const t = dict.pages.organizationSetupCards;

  // Fetch all counts in parallel with active filter
  const results = await Promise.allSettled([
    deptApi.getDepartments({ limit: 1, status: "active" }), // 0
    wardApi.getWards({ limit: 1, status: "active" }),      // 1
    opApi.getAll({ limit: 1, status: "active" }),          // 2
    userApi.getUsers({ limit: 10 }), // 3: Test without filter and more limit
    empApi.getEmployees({ limit: 1, status: "active" }),   // 4
    chargesApi.getCharges({ limit: 1, status: "active" }), // 5
    patientCatApi.getPatientCategories({ limit: 1, status: "active" }), // 6
    roleApi.getRoles({ limit: 1, status: "active" }),      // 7
    insuranceApi.getInsuranceProviders({ limit: 1, status: "active" }), // 8
    medicineApi.getAll({ limit: 1, status: "active" }),    // 9
  ]);

  // Helper to extract count from PromiseSettledResult
  const getCount = (index: number, defaultVal: number = 0, label?: string) => {
    const res = results[index];
    if (res && res.status === "fulfilled") {
      const data = res.value.data as any;
      if (label === "User") {
        console.log("User API Response Details:", {
          success: data?.success,
          hasPagination: !!data?.pagination,
          paginationTotal: data?.pagination?.totalData ?? data?.pagination?.total,
          dataLength: Array.isArray(data?.data) ? data.data.length : 'not an array'
        });
      }
      if (data && data.success) {
        const pagination = data.pagination;
        // 1. Try pagination object (preferred)
        const countFromPagination = pagination?.totalData ?? pagination?.total;
        if (typeof countFromPagination === "number") return countFromPagination;

        // 2. Try root level total fields
        const countFromRoot = data.totalData ?? data.total ?? data.total_records;
        if (typeof countFromRoot === "number") return countFromRoot;

        // 3. Fallback to data array length
        if (Array.isArray(data.data)) {
          return data.data.length;
        }
      }
    } else if (res && res.status === "rejected") {
      console.error(`API ${label || index} failed:`, res.reason);
    }
    return defaultVal;
  };

  return [
    {
      id: "Departments",
      title: t.items.departments.title,
      subtitle: t.items.departments.subtitle,
      active: getCount(0, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Ward/ Beds",
      title: t.items.wardsBeds.title,
      subtitle: t.items.wardsBeds.subtitle,
      active: getCount(1, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Operation Theatres / Procedure Rooms",
      title: t.items.operationTheatres.title,
      subtitle: t.items.operationTheatres.subtitle,
      active: getCount(2, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "User",
      title: t.items.users.title,
      subtitle: t.items.users.subtitle,
      active: getCount(3, 0, "User"),
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
      active: getCount(4, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Charges",
      title: t.items.charges.title,
      subtitle: t.items.charges.subtitle,
      active: getCount(5, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Patients",
      title: t.items.patients.title,
      subtitle: t.items.patients.subtitle,
      active: getCount(6, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Operation / Operation Category",
      title: t.items.operationCategory.title,
      subtitle: t.items.operationCategory.subtitle,
      active: getCount(2, 0),
      category: t.categories.organizationSetup,
    },
    {
      id: "Human Resource",
      title: t.items.humanResource.title,
      subtitle: t.items.humanResource.subtitle,
      active: getCount(4, 0), // Use same as Employees
      category: t.categories.staffRoles,
    },
    {
      id: "Roles",
      title: t.items.roles.title,
      subtitle: t.items.roles.subtitle,
      active: getCount(7, 0),
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
      active: getCount(8, 0),
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
      active: getCount(9, 0),
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
  { route: string; addOptions?: string[], submoduleKeys?: string[]; }
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
    // addOptions: ["Insurance"],
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
    // addOptions: ["Doctor", "Nurse", "Designation", "Role"],
  },

  "Roles": {
    route: ROUTES.ADMINISTRATION_ROLES,
    addOptions: ["Roles"],
    submoduleKeys: ["role"]

  },
  "Shifts & Attendance Configuration": {
    route: "/masters/shifts",
    // addOptions: ["Shift", "Attendance Type"],
  },
  "Medical Procedure / Treatment Master": {
    route: "/masters/procedures",
    // addOptions: ["Treatment Type", "Specialization"],
  },
  "Lab Test Master": {
    route: "/masters/lab-test",
    // addOptions: ["Test Category", "Test Type"],
  },
  "Radiology / Imaging Test Master": {
    route: "/masters/radiology",
    // addOptions: ["Imaging Test", "Modality"],
  },
  "Package / Scheme / Policy Setup": {
    route: "/masters/packages",
    // addOptions: ["Package", "Scheme", "Policy"],
  },
  "Charges": {
    route: ROUTES.ADMINISTRATION_CHARGES,
    addOptions: ["Category", "Tax", "Unit"], // Removed "Service"
    submoduleKeys: ["charge", "chargeCategory", "taxCategory", "chargeUnit"]
  },
  "Patients": {
    route: ROUTES.ADMINISTRATION_PATIENTS,
    // addOptions: ["Patient Category"],
    submoduleKeys: ["patientCategory"]
  },
  "Tariff / Pricing / Service Charges": {
    route: "/masters/tariff",
    // addOptions: ["Service", "Charge"],
  },
  "Inventory / Consumables Master": {
    route: "/masters/inventory",
    // addOptions: ["Consumable", "Category"],
  },
  "Equipment / Asset Master": {
    route: "/masters/equipment",
    // addOptions: ["Equipment", "Asset Type"],
  },
  "Medicine / Drug Master": {
    route: "/masters/medicine",
    // addOptions: ["Medicine", "Drug Type"],
  },
  "Supplier / Vendor Master": {
    route: "/masters/suppliers",
    // addOptions: ["Supplier", "Vendor"],
  },
};

