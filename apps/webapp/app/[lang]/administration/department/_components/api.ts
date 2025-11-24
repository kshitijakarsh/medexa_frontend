// Mock Database
let departments = [
  {
    id: 1,
    name: "Neuro Surgery",
    status: "Active",
    createdOn: "2025-09-27",
    addedBy: "Dr. Ahmed Al-Mansouri",
  },
  {
    id: 2,
    name: "Dental",
    status: "Active",
    createdOn: "2025-09-27",
    addedBy: "Dr. Ahmed Al-Mansouri",
  },
  {
    id: 3,
    name: "Urology",
    status: "Inactive",
    createdOn: "2025-09-28",
    addedBy: "Dr. Ahmed Al-Mansouri",
  },
];

export async function fetchDepartments() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(departments), 500);
  });
}

export async function filterDepartments(filters: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...departments];

      if (filters.name) {
        data = data.filter((d) =>
          d.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      if (filters.status) {
        data = data.filter((d) => d.status === filters.status);
      }

      if (filters.date) {
        data = data.filter((d) => d.createdOn.startsWith(filters.date));
      }

      resolve(data);
    }, 300);
  });
}
