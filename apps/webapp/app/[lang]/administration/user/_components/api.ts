// /app/.../_components/api.ts
// DUMMY API SIMULATION FOR DYNAMIC ROLE LIST & USERS

type RoleOption = { label: string; value: string };
type User = {
  id: number;
  sno: number;
  role: string; // role value
  roleLabel?: string; // friendly label for display
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  password?: string; // stored but not displayed
  createdOn: string;
  addedBy: string;
};

let nextUserId = 6;

const roles: RoleOption[] = [
  { label: "Admin", value: "admin" },
  { label: "Doctor", value: "doctor" },
  { label: "Nurse", value: "nurse" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Pharmacist", value: "pharmacist" },
  { label: "Cashier", value: "cashier" },
];

const users: User[] = [
  {
    id: 1,
    sno: 1,
    role: "admin",
    roleLabel: "Admin",
    email: "admin@example.com",
    phone: "+971500000001",
    status: "Active",
    password: "Admin@123",
    createdOn: "2025-09-27 19:30",
    addedBy: "System",
  },
  {
    id: 2,
    sno: 2,
    role: "doctor",
    roleLabel: "Doctor",
    email: "doc1@example.com",
    phone: "+971500000002",
    status: "Active",
    password: "Doc@123",
    createdOn: "2025-09-27 19:35",
    addedBy: "Dr. Ahmed Al-Mansouri",
  },
  {
    id: 3,
    sno: 3,
    role: "receptionist",
    roleLabel: "Receptionist",
    email: "rec1@example.com",
    phone: "+971500000003",
    status: "Active",
    password: "Rec@123",
    createdOn: "2025-09-27 19:40",
    addedBy: "Admin",
  },
  {
    id: 4,
    sno: 4,
    role: "pharmacist",
    roleLabel: "Pharmacist",
    email: "pharm1@example.com",
    phone: "+971500000004",
    status: "Inactive",
    password: "Pharm@123",
    createdOn: "2025-09-27 19:45",
    addedBy: "Admin",
  },
  {
    id: 5,
    sno: 5,
    role: "cashier",
    roleLabel: "Cashier",
    email: "cash1@example.com",
    phone: "+971500000005",
    status: "Active",
    password: "Cash@123",
    createdOn: "2025-09-27 19:50",
    addedBy: "Admin",
  },
];

export async function fetchUserRoles(): Promise<RoleOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roles), 500);
  });
}

export async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users.map((u) => ({ ...u }))), 600);
  });
}

export async function addUsers(newUsers: Omit<User, "id" | "sno" | "createdOn" | "addedBy">[], addedBy = "You"): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const added: User[] = newUsers.map((nu) => {
        const id = nextUserId++;
        const createdOn = new Date().toISOString().slice(0, 16).replace("T", " ");
        const roleLabel = roles.find((r) => r.value === nu.role)?.label ?? nu.role;
        const user: User = {
          id,
          sno: users.length + 1,
          role: nu.role,
          roleLabel,
          email: nu.email,
          phone: nu.phone,
          status: nu.status,
          password: nu.password,
          createdOn,
          addedBy,
        };
        users.push(user);
        return user;
      });
      // refresh sno values
      users.forEach((u, idx) => (u.sno = idx + 1));
      resolve(added);
    }, 600);
  });
}
