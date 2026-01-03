// // /app/charges/_components/api.ts
// type EntityBase = {
//   id: number;
//   sno: number;
//   name?: string;
//   createdOn: string;
//   addedBy: string;
//   status: "Active" | "Inactive";
// };

// export type UnitItem = EntityBase & { unit: string };
// export type TaxItem = EntityBase & { taxName: string; percentage: number };
// export type ChargeCategoryItem = EntityBase & { chargeName: string; description?: string };
// export type ServiceItem = EntityBase & {
//   serviceName: string;
//   chargeCategory: string; // value
//   chargeCategoryLabel?: string;
//   unit: string; // value
//   unitLabel?: string;
//   tax: string; // tax id or name
//   standardCharge: number;
// };

// let nextId = 100;

// const base = {
//   createdOn: "2025-09-27 19:30",
//   addedBy: "Dr. Ahmed Al-Mansouri",
// };

// const units: UnitItem[] = [
//   { id: 1, sno: 1, unit: "per hour", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
//   { id: 2, sno: 2, unit: "per day", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
//   { id: 3, sno: 3, unit: "mg", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
// ];

// const taxes: TaxItem[] = [
//   { id: 1, sno: 1, taxName: "VAT - Standard Rate", percentage: 5, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
//   { id: 2, sno: 2, taxName: "VAT - Zero Rated", percentage: 0, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
//   { id: 3, sno: 3, taxName: "Exempt - Healthcare Core", percentage: 0, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
// ];

// const categories: ChargeCategoryItem[] = [
//   { id: 1, sno: 1, chargeName: "OPD Service", description: "Outpatient department consultation and diagnostic services.", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
//   { id: 2, sno: 2, chargeName: "Histopathology", description: "Microscopic study of tissue samples.", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
// ];

// const services: ServiceItem[] = [
//   {
//     id: 1,
//     sno: 1,
//     serviceName: "Cylinder Charges",
//     chargeCategory: "opd-service",
//     chargeCategoryLabel: "OPD Service",
//     unit: "per hour",
//     unitLabel: "per hour",
//     tax: "VAT - Standard Rate",
//     standardCharge: 429,
//     createdOn: base.createdOn,
//     addedBy: base.addedBy,
//     status: "Active",
//   },
//   {
//     id: 2,
//     sno: 2,
//     serviceName: "Radiology Charges",
//     chargeCategory: "histopathology",
//     chargeCategoryLabel: "Histopathology",
//     unit: "per day",
//     unitLabel: "per day",
//     tax: "VAT - Standard Rate",
//     standardCharge: 540,
//     createdOn: base.createdOn,
//     addedBy: base.addedBy,
//     status: "Active",
//   },
// ];

// function now() {
//   return new Date().toISOString().slice(0, 16).replace("T", " ");
// }

// function refreshSno(list: any[]) {
//   list.forEach((it, idx) => (it.sno = idx + 1));
// }

// export async function fetchUnits(): Promise<UnitItem[]> {
//   return new Promise((res) => setTimeout(() => res([...units]), 350));
// }
// export async function fetchTaxes(): Promise<TaxItem[]> {
//   return new Promise((res) => setTimeout(() => res([...taxes]), 350));
// }
// export async function fetchCategories(): Promise<ChargeCategoryItem[]> {
//   return new Promise((res) => setTimeout(() => res([...categories]), 350));
// }
// export async function fetchServices(): Promise<ServiceItem[]> {
//   return new Promise((res) => setTimeout(() => res([...services]), 450));
// }

// export async function addUnits(newItems: Omit<UnitItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<UnitItem[]> {
//   return new Promise((res) =>
//     setTimeout(() => {
//       const added = newItems.map((n) => {
//         const id = ++nextId;
//         const item: UnitItem = { id, sno: units.length + 1, unit: n.unit, createdOn: now(), addedBy: "You", status: n.status || "Active" };
//         units.push(item);
//         return item;
//       });
//       refreshSno(units);
//       res(added);
//     }, 400)
//   );
// }

// export async function addTaxes(newItems: Omit<TaxItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<TaxItem[]> {
//   return new Promise((res) =>
//     setTimeout(() => {
//       const added = newItems.map((n) => {
//         const id = ++nextId;
//         const item: TaxItem = { id, sno: taxes.length + 1, taxName: n.taxName, percentage: n.percentage, createdOn: now(), addedBy: "You", status: n.status || "Active" };
//         taxes.push(item);
//         return item;
//       });
//       refreshSno(taxes);
//       res(added);
//     }, 400)
//   );
// }

// export async function addCategories(newItems: Omit<ChargeCategoryItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ChargeCategoryItem[]> {
//   return new Promise((res) =>
//     setTimeout(() => {
//       const added = newItems.map((n) => {
//         const id = ++nextId;
//         const item: ChargeCategoryItem = { id, sno: categories.length + 1, chargeName: n.chargeName, description: n.description || "", createdOn: now(), addedBy: "You", status: n.status || "Active" };
//         categories.push(item);
//         return item;
//       });
//       refreshSno(categories);
//       res(added);
//     }, 400)
//   );
// }

// export async function addServices(newItems: Omit<ServiceItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ServiceItem[]> {
//   return new Promise((res) =>
//     setTimeout(() => {
//       const added = newItems.map((n) => {
//         const id = ++nextId;
//         const categoryLabel = categories.find((c) => c.chargeName === n.chargeCategory || c.id === Number(n.chargeCategory))?.chargeName ?? n.chargeCategory;
//         const unitLabel = units.find((u) => u.unit === n.unit || u.id === Number(n.unit))?.unit ?? n.unit;
//         const item: ServiceItem = {
//           id,
//           sno: services.length + 1,
//           serviceName: n.serviceName,
//           chargeCategory: n.chargeCategory,
//           chargeCategoryLabel: categoryLabel,
//           unit: n.unit,
//           unitLabel,
//           tax: n.tax,
//           standardCharge: n.standardCharge,
//           createdOn: now(),
//           addedBy: "You",
//           status: n.status || "Active",
//         };
//         services.push(item);
//         return item;
//       });
//       refreshSno(services);
//       res(added);
//     }, 500)
//   );
// }

// export async function deleteById(mode: "unit" | "tax" | "category" | "service", id: number) {
//   return new Promise((res) =>
//     setTimeout(() => {
//       if (mode === "unit") {
//         const idx = units.findIndex((u) => u.id === id);
//         if (idx >= 0) units.splice(idx, 1), refreshSno(units);
//       }
//       if (mode === "tax") {
//         const idx = taxes.findIndex((u) => u.id === id);
//         if (idx >= 0) taxes.splice(idx, 1), refreshSno(taxes);
//       }
//       if (mode === "category") {
//         const idx = categories.findIndex((u) => u.id === id);
//         if (idx >= 0) categories.splice(idx, 1), refreshSno(categories);
//       }
//       if (mode === "service") {
//         const idx = services.findIndex((u) => u.id === id);
//         if (idx >= 0) services.splice(idx, 1), refreshSno(services);
//       }
//       res(true);
//     }, 300)
//   );
// }

// export async function updateStatus(mode: "unit" | "tax" | "category" | "service", id: number, status: "Active" | "Inactive") {
//   return new Promise((res) =>
//     setTimeout(() => {
//       let list: any[] = [];
//       if (mode === "unit") list = units;
//       if (mode === "tax") list = taxes;
//       if (mode === "category") list = categories;
//       if (mode === "service") list = services;
//       const it = list.find((x) => x.id === id);
//       if (it) it.status = status;
//       res(it);
//     }, 300)
//   );
// }

// /** dropdown helpers for DynamicSelect */
// export async function getUnitsDropdown() {
//   return fetchUnits().then((u) => u.map((x) => ({ label: x.unit, value: x.unit })));
// }
// export async function getCategoriesDropdown() {
//   return fetchCategories().then((c) => c.map((x) => ({ label: x.chargeName, value: x.chargeName })));
// }
// export async function getTaxesDropdown() {
//   return fetchTaxes().then((t) => t.map((x) => ({ label: x.taxName, value: x.taxName })));
// }


// /app/charges/_components/api.ts
import { createChargesApiClient } from "@/lib/api/administration/charges";
import { createChargeCategoriesApiClient } from "@/lib/api/administration/charge-categories";
import { createTaxCategoriesApiClient } from "@/lib/api/administration/tax-categories";
import { createChargeUnitsApiClient } from "@/lib/api/administration/charge-units";

type EntityBase = {
  id: number;
  sno: number;
  createdOn: string;
  addedBy: string;
  status: "Active" | "Inactive";
};

export type UnitItem = EntityBase & { unit: string };
export type TaxItem = EntityBase & { taxName: string; percentage: number };
export type ChargeCategoryItem = EntityBase & { chargeName: string; description?: string };
export type ServiceItem = EntityBase & {
  serviceName: string;
  chargeType?: string;
  chargeCategory: string;
  chargeCategoryLabel?: string;
  unit: string;
  unitLabel?: string;
  tax?: string;
  taxLabel?: string;
  standardCharge?: number;
  description?: string;
  priceVaryOn?: boolean;
  priceVaryOptions?: Record<string, number>;
};

// Initialize charges API client
const chargesApi = createChargesApiClient({});
const chargeCategoriesApi = createChargeCategoriesApiClient({});
const taxCategoriesApi = createTaxCategoriesApiClient({});
const chargeUnitsApi = createChargeUnitsApiClient({});

let nextId = 200;

const base = {
  createdOn: "2025-09-27 19:30",
  addedBy: "Dr. Ahmed Al-Mansouri",
};

const units: UnitItem[] = [
  { id: 1, sno: 1, unit: "per hour", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
  { id: 2, sno: 2, unit: "per day", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
  { id: 3, sno: 3, unit: "mg", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
];

const taxes: TaxItem[] = [
  { id: 1, sno: 1, taxName: "VAT - Standard Rate", percentage: 5, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
  { id: 2, sno: 2, taxName: "VAT - Zero Rated", percentage: 0, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
  { id: 3, sno: 3, taxName: "Exempt - Healthcare Core", percentage: 0, createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
];

const categories: ChargeCategoryItem[] = [
  { id: 1, sno: 1, chargeName: "OPD Service", description: "Outpatient department consultation and diagnostic services.", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
  { id: 2, sno: 2, chargeName: "Histopathology", description: "Microscopic study of tissue samples.", createdOn: base.createdOn, addedBy: base.addedBy, status: "Active" },
];

const services: ServiceItem[] = [
  {
    id: 1,
    sno: 1,
    serviceName: "Cylinder Charges",
    chargeType: "Procedure",
    chargeCategory: "OPD Service",
    chargeCategoryLabel: "OPD Service",
    unit: "per hour",
    unitLabel: "per hour",
    tax: "VAT - Standard Rate",
    taxLabel: "VAT - Standard Rate",
    standardCharge: 429,
    description: "Cylinder related charges",
    createdOn: base.createdOn,
    addedBy: base.addedBy,
    status: "Active",
    priceVaryOn: false,
    priceVaryOptions: {},
  },
  {
    id: 2,
    sno: 2,
    serviceName: "General Physician Consultation",
    chargeType: "Consultation",
    chargeCategory: "OPD Service",
    chargeCategoryLabel: "OPD Service",
    unit: "per visit",
    unitLabel: "per visit",
    tax: "Exempt - Healthcare Core",
    taxLabel: "Exempt - Healthcare Core",
    standardCharge: 100,
    description: "General consultation for outpatients",
    createdOn: base.createdOn,
    addedBy: base.addedBy,
    status: "Active",
    priceVaryOn: true,
    priceVaryOptions: { standard: 100, normal: 150, vip: 250 },
  },
];

function now() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function refreshSno(list: any[]) {
  list.forEach((it, idx) => (it.sno = idx + 1));
}


/* ================= API DTO TYPES ================= */

type ApiBaseEntity = {
  id: number | string;
  status: "active" | "inactive";
  created_at: string;
  createdBy?: { name?: string };
  updatedBy?: { name?: string };
};

type ApiUnit = ApiBaseEntity & {
  name: string;
};

type ApiTax = ApiBaseEntity & {
  name: string;
  percent: number;
};

type ApiChargeCategory = ApiBaseEntity & {
  name: string;
  description?: string;
};

type ApiService = ApiBaseEntity & {
  name: string;
  category_id: number;
  unit_id: number;
  tax_id?: number;
  category?: { name?: string };
  unit?: { name?: string };
  tax?: { name?: string };
};


export async function fetchUnits(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  tenant_id?: string;
}): Promise<UnitItem[]> {
  try {
    const response = await chargeUnitsApi.getChargeUnits(params);
    const chargeUnits = response.data.data as ApiUnit[];

    // Transform API response to match UnitItem format
    return chargeUnits.map((unit, index) => ({
      id: Number(unit.id),
      sno: index + 1,
      unit: unit.name,
      status: unit.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(unit.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: unit.createdBy?.name || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching charge units:", error);
    return [];
  }
}
export async function fetchTaxes(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<TaxItem[]> {
  try {
    const response = await taxCategoriesApi.getTaxCategories(params);
    const taxCategories = response.data.data as ApiTax[];;

    // Transform API response to match TaxItem format
    return taxCategories.map((tax, index) => ({
      id: Number(tax.id),
      sno: index + 1,
      taxName: tax.name,
      percentage: tax.percent,
      status: tax.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(tax.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: tax.createdBy?.name || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching tax categories:", error);
    return [];
  }
}
export async function fetchCategories(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<ChargeCategoryItem[]> {
  try {
    const response = await chargeCategoriesApi.getChargeCategories(params);
    const chargeCategories = response.data.data as ApiChargeCategory[];

    // Transform API response to match ChargeCategoryItem format
    return chargeCategories.map((category, index) => ({
      id: Number(category.id),
      sno: index + 1,
      chargeName: category.name,
      description: category.description || "",
      status: category.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(category.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: category.createdBy?.name || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching charge categories:", error);
    return [];
  }
}
export async function fetchServices(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  category_id?: string;
  unit_id?: string;
  tax_id?: string;
}): Promise<ServiceItem[]> {
  try {
    const response = await chargesApi.getCharges(params);
    const charges = response.data.data;

    // Transform API response to match ServiceItem format
    return charges.map((charge, index) => ({
      id: Number(charge.id),
      sno: index + 1,
      serviceName: charge.name,
      chargeCategory: charge.category_id,
      chargeCategoryLabel: charge.category?.name || "",
      unit: charge.unit_id,
      unitLabel: charge.unit?.name || "",
      tax: charge.tax_id,
      taxLabel: charge.tax?.name || "",
      standardCharge: 0, // API doesn't return this field
      status: charge.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(charge.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: charge.createdBy?.name || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching charges:", error);
    return [];
  }
}

export async function addUnits(newItems: Omit<UnitItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<UnitItem[]> {
  try {
    const results: UnitItem[] = [];

    for (const item of newItems) {
      const payload = {
        name: item.unit,
        status: (item.status === "Active" ? "active" : "inactive") as "active" | "inactive",
      };

      const response = await chargeUnitsApi.createChargeUnit(payload);
      const unit = response.data.data;

      // Transform response back to UnitItem format
      results.push({
        id: Number(unit.id),
        sno: results.length + 1,
        unit: unit.name,
        status: unit.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
        createdOn: new Date(unit.created_at).toISOString().slice(0, 16).replace("T", " "),
        addedBy: unit.createdBy?.name || "Unknown",
      });
    }

    return results;
  } catch (error) {
    console.error("Error creating charge unit:", error);
    throw error;
  }
}

export async function addTaxes(newItems: Omit<TaxItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<TaxItem[]> {
  try {
    const results: TaxItem[] = [];

    for (const item of newItems) {
      const payload = {
        name: item.taxName,
        percent: item.percentage,
        status: (item.status === "Active" ? "active" : "inactive") as "active" | "inactive",
      };

      const response = await taxCategoriesApi.createTaxCategory(payload);
      const tax = response.data.data;

      // Transform response back to TaxItem format
      results.push({
        id: Number(tax.id),
        sno: results.length + 1,
        taxName: tax.name,
        percentage: tax.percent,
        status: tax.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
        createdOn: new Date(tax.created_at).toISOString().slice(0, 16).replace("T", " "),
        addedBy: tax.createdBy?.name || "Unknown",
      });
    }

    return results;
  } catch (error) {
    console.error("Error creating tax category:", error);
    throw error;
  }
}

export async function addCategories(newItems: Omit<ChargeCategoryItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ChargeCategoryItem[]> {
  try {
    const results: ChargeCategoryItem[] = [];

    for (const item of newItems) {
      const payload = {
        name: item.chargeName,
        description: item.description || "",
        status: (item.status === "Active" ? "active" : "inactive") as "active" | "inactive",
      };

      const response = await chargeCategoriesApi.createChargeCategory(payload);
      const category = response.data.data;

      // Transform response back to ChargeCategoryItem format
      results.push({
        id: Number(category.id),
        sno: results.length + 1,
        chargeName: category.name,
        description: category.description || "",
        status: category.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
        createdOn: new Date(category.created_at).toISOString().slice(0, 16).replace("T", " "),
        addedBy: category.createdBy?.name || "Unknown",
      });
    }

    return results;
  } catch (error) {
    console.error("Error creating charge category:", error);
    throw error;
  }
}

export async function addServices(newItems: Omit<ServiceItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ServiceItem[]> {
  try {
    const results: ServiceItem[] = [];

    for (const item of newItems) {
      // Map form values to API payload
      // Note: category_id, unit_id, tax_id need to be IDs, not names
      // For now, we'll need to find the IDs from the dropdowns
      // This assumes the form is passing IDs, but if it's passing names, we need to map them
      const payload = {
        name: item.serviceName,
        category_id: typeof item.chargeCategory === "string" ? Number(item.chargeCategory) || 0 : Number(item.chargeCategory),
        unit_id: typeof item.unit === "string" ? Number(item.unit) || 0 : Number(item.unit),
        tax_id: item.tax ? (typeof item.tax === "string" ? Number(item.tax) || 0 : Number(item.tax)) : 0,
        status: (item.status === "Active" ? "active" : "inactive") as "active" | "inactive",
      };

      const response = await chargesApi.createCharge(payload);
      const charge = response.data.data;

      // Transform response back to ServiceItem format
      results.push({
        id: Number(charge.id),
        sno: results.length + 1,
        serviceName: charge.name,
        chargeCategory: charge.category_id,
        chargeCategoryLabel: charge.category?.name || "",
        unit: charge.unit_id,
        unitLabel: charge.unit?.name || "",
        tax: charge.tax_id,
        taxLabel: charge.tax?.name || "",
        standardCharge: item.standardCharge || 0,
        description: item.description,
        status: charge.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
        createdOn: new Date(charge.created_at).toISOString().slice(0, 16).replace("T", " "),
        addedBy: charge.createdBy?.name || "Unknown",
        priceVaryOn: item.priceVaryOn ?? false,
        priceVaryOptions: item.priceVaryOptions ?? {},
      });
    }

    return results;
  } catch (error) {
    console.error("Error creating charge:", error);
    throw error;
  }
}

export async function deleteById(mode: "unit" | "tax" | "category" | "service", id: number) {
  if (mode === "service") {
    try {
      await chargesApi.deleteCharge(String(id));
      return true;
    } catch (error) {
      console.error("Error deleting charge:", error);
      throw error;
    }
  }

  if (mode === "category") {
    try {
      await chargeCategoriesApi.deleteChargeCategory(String(id));
      return true;
    } catch (error) {
      console.error("Error deleting charge category:", error);
      throw error;
    }
  }

  if (mode === "tax") {
    try {
      await taxCategoriesApi.deleteTaxCategory(String(id));
      return true;
    } catch (error) {
      console.error("Error deleting tax category:", error);
      throw error;
    }
  }

  if (mode === "unit") {
    try {
      await chargeUnitsApi.deleteChargeUnit(String(id));
      return true;
    } catch (error) {
      console.error("Error deleting charge unit:", error);
      throw error;
    }
  }

  return true;
}

export async function updateStatus(mode: "unit" | "tax" | "category" | "service", id: number, status: "Active" | "Inactive") {
  return new Promise((res) =>
    setTimeout(() => {
      let list: any[] = [];
      if (mode === "unit") list = units;
      if (mode === "tax") list = taxes;
      if (mode === "category") list = categories;
      if (mode === "service") list = services;
      const it = list.find((x) => x.id === id);
      if (it) it.status = status;
      res(it);
    }, 300)
  );
}

/** dropdown helpers for DynamicSelect */
export async function getUnitsDropdown() {
  return fetchUnits().then((u) => u.map((x) => ({ label: x.unit, value: String(x.id) })));
}
export async function getCategoriesDropdown() {
  return fetchCategories().then((c) => c.map((x) => ({ label: x.chargeName, value: String(x.id) })));
}
export async function getTaxesDropdown() {
  return fetchTaxes().then((t) => t.map((x) => ({ label: x.taxName, value: String(x.id) })));
}

export async function getServiceById(id: number): Promise<ServiceItem | undefined> {
  try {
    const response = await chargesApi.getChargeById(String(id));
    const charge = response.data.data;

    // Transform API response to ServiceItem format
    return {
      id: Number(charge.id),
      sno: 1,
      serviceName: charge.name,
      chargeCategory: charge.category_id,
      chargeCategoryLabel: charge.category?.name || "",
      unit: charge.unit_id,
      unitLabel: charge.unit?.name || "",
      tax: charge.tax_id,
      taxLabel: charge.tax?.name || "",
      standardCharge: 0,
      status: charge.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(charge.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: charge.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching charge by id:", error);
    return undefined;
  }
}

export async function getCategoryById(id: number): Promise<ChargeCategoryItem | undefined> {
  try {
    const response = await chargeCategoriesApi.getChargeCategoryById(String(id));
    const category = response.data.data;

    // Transform API response to ChargeCategoryItem format
    return {
      id: Number(category.id),
      sno: 1,
      chargeName: category.name,
      description: category.description || "",
      status: category.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(category.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: category.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching charge category by id:", error);
    return undefined;
  }
}

export async function updateCategory(id: number, item: Partial<Omit<ChargeCategoryItem, "id" | "sno" | "createdOn" | "addedBy">>): Promise<ChargeCategoryItem> {
  try {
    const payload: any = {};

    if (item.chargeName !== undefined) payload.name = item.chargeName;
    if (item.description !== undefined) payload.description = item.description || "";
    if (item.status !== undefined) {
      payload.status = (item.status === "Active" ? "active" : "inactive") as "active" | "inactive";
    }

    const response = await chargeCategoriesApi.updateChargeCategory(String(id), payload);
    const category = response.data.data;

    // Transform response back to ChargeCategoryItem format
    return {
      id: Number(category.id),
      sno: 1,
      chargeName: category.name,
      description: category.description || "",
      status: category.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(category.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: category.updatedBy?.name || category.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error updating charge category:", error);
    throw error;
  }
}

export async function getTaxById(id: number): Promise<TaxItem | undefined> {
  try {
    const response = await taxCategoriesApi.getTaxCategoryById(String(id));
    const tax = response.data.data;

    // Transform API response to TaxItem format
    return {
      id: Number(tax.id),
      sno: 1,
      taxName: tax.name,
      percentage: tax.percent,
      status: tax.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(tax.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: tax.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching tax category by id:", error);
    return undefined;
  }
}

export async function updateTax(id: number, item: Partial<Omit<TaxItem, "id" | "sno" | "createdOn" | "addedBy">>): Promise<TaxItem> {
  try {
    const payload: any = {};

    if (item.taxName !== undefined) payload.name = item.taxName;
    if (item.percentage !== undefined) payload.percent = item.percentage;
    if (item.status !== undefined) {
      payload.status = (item.status === "Active" ? "active" : "inactive") as "active" | "inactive";
    }

    const response = await taxCategoriesApi.updateTaxCategory(String(id), payload);
    const tax = response.data.data;

    // Transform response back to TaxItem format
    return {
      id: Number(tax.id),
      sno: 1,
      taxName: tax.name,
      percentage: tax.percent,
      status: tax.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(tax.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: tax.updatedBy?.name || tax.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error updating tax category:", error);
    throw error;
  }
}

export async function getUnitById(id: number): Promise<UnitItem | undefined> {
  try {
    const response = await chargeUnitsApi.getChargeUnitById(String(id));
    const unit = response.data.data;

    // Transform API response to UnitItem format
    return {
      id: Number(unit.id),
      sno: 1,
      unit: unit.name,
      status: unit.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(unit.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: unit.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching charge unit by id:", error);
    return undefined;
  }
}

export async function updateUnit(id: number, item: Partial<Omit<UnitItem, "id" | "sno" | "createdOn" | "addedBy">>): Promise<UnitItem> {
  try {
    const payload: any = {};

    if (item.unit !== undefined) payload.name = item.unit;
    if (item.status !== undefined) {
      payload.status = (item.status === "Active" ? "active" : "inactive") as "active" | "inactive";
    }

    const response = await chargeUnitsApi.updateChargeUnit(String(id), payload);
    const unit = response.data.data;

    // Transform response back to UnitItem format
    return {
      id: Number(unit.id),
      sno: 1,
      unit: unit.name,
      status: unit.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(unit.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: unit.updatedBy?.name || unit.createdBy?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error updating charge unit:", error);
    throw error;
  }
}

export async function updateCharge(id: number, item: Partial<Omit<ServiceItem, "id" | "sno" | "createdOn" | "addedBy">>): Promise<ServiceItem> {
  try {
    const payload: any = {};

    if (item.serviceName !== undefined) payload.name = item.serviceName;
    if (item.chargeCategory !== undefined) {
      payload.category_id = typeof item.chargeCategory === "string" ? Number(item.chargeCategory) || 0 : Number(item.chargeCategory);
    }
    if (item.unit !== undefined) {
      payload.unit_id = typeof item.unit === "string" ? Number(item.unit) || 0 : Number(item.unit);
    }
    if (item.tax !== undefined && item.tax !== null) {
      payload.tax_id = typeof item.tax === "string" ? Number(item.tax) || 0 : Number(item.tax);
    }
    if (item.status !== undefined) {
      payload.status = (item.status === "Active" ? "active" : "inactive") as "active" | "inactive";
    }

    const response = await chargesApi.updateCharge(String(id), payload);
    const charge = response.data.data;

    // Transform response back to ServiceItem format
    return {
      id: Number(charge.id),
      sno: 1,
      serviceName: charge.name,
      chargeCategory: charge.category_id,
      chargeCategoryLabel: charge.category?.name || "",
      unit: charge.unit_id,
      unitLabel: charge.unit?.name || "",
      tax: charge.tax_id,
      taxLabel: charge.tax?.name || "",
      standardCharge: item.standardCharge || 0,
      description: item.description,
      status: charge.status === "active" ? "Active" : "Inactive" as "Active" | "Inactive",
      createdOn: new Date(charge.created_at).toISOString().slice(0, 16).replace("T", " "),
      addedBy: charge.updatedBy?.name || charge.createdBy?.name || "Unknown",
      priceVaryOn: item.priceVaryOn ?? false,
      priceVaryOptions: item.priceVaryOptions ?? {},
    };
  } catch (error) {
    console.error("Error updating charge:", error);
    throw error;
  }
}