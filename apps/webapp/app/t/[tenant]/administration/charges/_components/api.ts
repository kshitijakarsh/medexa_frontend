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

export async function fetchUnits(): Promise<UnitItem[]> {
  return new Promise((res) => setTimeout(() => res([...units]), 250));
}
export async function fetchTaxes(): Promise<TaxItem[]> {
  return new Promise((res) => setTimeout(() => res([...taxes]), 250));
}
export async function fetchCategories(): Promise<ChargeCategoryItem[]> {
  return new Promise((res) => setTimeout(() => res([...categories]), 250));
}
export async function fetchServices(): Promise<ServiceItem[]> {
  return new Promise((res) => setTimeout(() => res([...services]), 350));
}

export async function addUnits(newItems: Omit<UnitItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<UnitItem[]> {
  return new Promise((res) =>
    setTimeout(() => {
      const added = newItems.map((n) => {
        const id = ++nextId;
        const item: UnitItem = { id, sno: units.length + 1, unit: n.unit, createdOn: now(), addedBy: "You", status: n.status || "Active" };
        units.push(item);
        return item;
      });
      refreshSno(units);
      res(added);
    }, 350)
  );
}

export async function addTaxes(newItems: Omit<TaxItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<TaxItem[]> {
  return new Promise((res) =>
    setTimeout(() => {
      const added = newItems.map((n) => {
        const id = ++nextId;
        const item: TaxItem = { id, sno: taxes.length + 1, taxName: n.taxName, percentage: n.percentage, createdOn: now(), addedBy: "You", status: n.status || "Active" };
        taxes.push(item);
        return item;
      });
      refreshSno(taxes);
      res(added);
    }, 350)
  );
}

export async function addCategories(newItems: Omit<ChargeCategoryItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ChargeCategoryItem[]> {
  return new Promise((res) =>
    setTimeout(() => {
      const added = newItems.map((n) => {
        const id = ++nextId;
        const item: ChargeCategoryItem = { id, sno: categories.length + 1, chargeName: n.chargeName, description: n.description || "", createdOn: now(), addedBy: "You", status: n.status || "Active" };
        categories.push(item);
        return item;
      });
      refreshSno(categories);
      res(added);
    }, 350)
  );
}

export async function addServices(newItems: Omit<ServiceItem, "id" | "sno" | "createdOn" | "addedBy">[]): Promise<ServiceItem[]> {
  return new Promise((res) =>
    setTimeout(() => {
      const added = newItems.map((n) => {
        const id = ++nextId;
        const categoryLabel = categories.find((c) => c.chargeName === n.chargeCategory)?.chargeName ?? n.chargeCategory;
        const unitLabel = units.find((u) => u.unit === n.unit)?.unit ?? n.unit;
        const taxLabel = taxes.find((t) => t.taxName === n.tax)?.taxName ?? n.tax;
        const item: ServiceItem = {
          id,
          sno: services.length + 1,
          serviceName: n.serviceName,
          chargeType: n.chargeType,
          chargeCategory: n.chargeCategory,
          chargeCategoryLabel: categoryLabel,
          unit: n.unit,
          unitLabel,
          tax: n.tax,
          taxLabel,
          standardCharge: n.standardCharge,
          description: n.description,
          createdOn: now(),
          addedBy: "You",
          status: n.status || "Active",
          priceVaryOn: n.priceVaryOn ?? false,
          priceVaryOptions: n.priceVaryOptions ?? {},
        };
        services.push(item);
        return item;
      });
      refreshSno(services);
      res(added);
    }, 450)
  );
}

export async function deleteById(mode: "unit" | "tax" | "category" | "service", id: number) {
  return new Promise((res) =>
    setTimeout(() => {
      if (mode === "unit") {
        const idx = units.findIndex((u) => u.id === id);
        if (idx >= 0) units.splice(idx, 1), refreshSno(units);
      }
      if (mode === "tax") {
        const idx = taxes.findIndex((u) => u.id === id);
        if (idx >= 0) taxes.splice(idx, 1), refreshSno(taxes);
      }
      if (mode === "category") {
        const idx = categories.findIndex((u) => u.id === id);
        if (idx >= 0) categories.splice(idx, 1), refreshSno(categories);
      }
      if (mode === "service") {
        const idx = services.findIndex((u) => u.id === id);
        if (idx >= 0) services.splice(idx, 1), refreshSno(services);
      }
      res(true);
    }, 300)
  );
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
  return fetchUnits().then((u) => u.map((x) => ({ label: x.unit, value: x.unit })));
}
export async function getCategoriesDropdown() {
  return fetchCategories().then((c) => c.map((x) => ({ label: x.chargeName, value: x.chargeName })));
}
export async function getTaxesDropdown() {
  return fetchTaxes().then((t) => t.map((x) => ({ label: x.taxName, value: x.taxName })));
}

export async function getServiceById(id: number): Promise<ServiceItem | undefined> {
  return new Promise((res) => setTimeout(() => res(services.find((s) => s.id === id)), 300));
}
