

// // export interface PermissionNode {
// //   key: string;
// //   label: string;
// //   actions?: string[];
// //   children?: PermissionNode[];
// // }

// // export const permissionModules: PermissionNode[] = [
// //   {
// //     key: "hr",
// //     label: "Human Resources",
// //     actions: ["view", "create", "edit", "delete"],
// //     children: [
// //       {
// //         key: "employee",
// //         label: "Employee Management",
// //         actions: ["view", "create", "edit", "delete"],
// //       },
// //       {
// //         key: "attendance",
// //         label: "Attendance",
// //         actions: ["view", "create", "edit", "delete"],
// //       },
// //     ],
// //   },
// //   {
// //     key: "billing",
// //     label: "Billing & Insurance",
// //     actions: ["view", "create", "edit", "delete"],
// //     children: [
// //       {
// //         key: "claims",
// //         label: "Claims Processing",
// //         actions: ["view", "create", "edit", "delete"],
// //       },
// //     ],
// //   },
// //   {
// //     key: "pharmacy",
// //     label: "Pharmacy",
// //     actions: ["view", "create", "edit", "delete", "export_pdf", "import_excel"],
// //   },
// // ];


// export interface PermissionNode {
//   key: string;
//   label: string;
//   actions?: string[];
//   children?: PermissionNode[];
// }

// export interface MainModule {
//   key: string;
//   label: string;
//   icon?: string;
//   subModules: PermissionNode[];
// }

// export const mainModules: MainModule[] = [
//   {
//     key: "administration",
//     label: "Administration",
//     icon: "⚙️",
//     subModules: [
//       {
//         key: "hr",
//         label: "Human Resources",
//         actions: ["view", "create", "edit", "delete"],
//         children: [
//           {
//             key: "employee",
//             label: "Employee Management",
//             actions: ["view", "create", "edit", "delete"],
//           },
//           {
//             key: "attendance",
//             label: "Attendance",
//             actions: ["view", "create", "edit", "delete"],
//           },
//         ],
//       },
//       {
//         key: "billing",
//         label: "Billing & Insurance",
//         actions: ["view", "create", "edit", "delete"],
//         children: [
//           {
//             key: "claims",
//             label: "Claims Processing",
//             actions: ["view", "create", "edit", "delete"],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: "front_office",
//     label: "Front Office",
//     icon: "🏢",
//     subModules: [
//       {
//         key: "reception",
//         label: "Reception",
//         actions: ["view", "create", "edit", "delete"],
//       },
//       {
//         key: "appointment",
//         label: "Appointment Management",
//         actions: ["view", "create", "edit", "delete", "cancel"],
//       },
//     ],
//   },
//   {
//     key: "diagnostics",
//     label: "Diagnostics",
//     icon: "🔬",
//     subModules: [
//       {
//         key: "lab",
//         label: "Laboratory",
//         actions: ["view", "create", "edit", "delete", "approve"],
//       },
//       {
//         key: "radiology",
//         label: "Radiology",
//         actions: ["view", "create", "edit", "delete", "approve"],
//       },
//     ],
//   },
//   {
//     key: "pharmacy",
//     label: "Pharmacy",
//     icon: "💊",
//     subModules: [
//       {
//         key: "pharmacy",
//         label: "Pharmacy Management",
//         actions: ["view", "create", "edit", "delete", "export_pdf", "import_excel"],
//       },
//     ],
//   },
//   {
//     key: "billing_insurance",
//     label: "Billing & Insurance",
//     icon: "💰",
//     subModules: [
//       {
//         key: "invoicing",
//         label: "Invoicing",
//         actions: ["view", "create", "edit", "delete", "print"],
//       },
//       {
//         key: "insurance_claims",
//         label: "Insurance Claims",
//         actions: ["view", "create", "edit", "delete", "submit"],
//       },
//     ],
//   },
//   {
//     key: "inventory",
//     label: "Inventory",
//     icon: "📦",
//     subModules: [
//       {
//         key: "stock",
//         label: "Stock Management",
//         actions: ["view", "create", "edit", "delete", "adjust"],
//       },
//       {
//         key: "purchase",
//         label: "Purchase Orders",
//         actions: ["view", "create", "edit", "delete", "approve"],
//       },
//     ],
//   },
//   {
//     key: "reports_analytics",
//     label: "Reports & Analytics",
//     icon: "📊",
//     subModules: [
//       {
//         key: "reports",
//         label: "Reports",
//         actions: ["view", "export_pdf", "export_excel"],
//       },
//       {
//         key: "analytics",
//         label: "Analytics Dashboard",
//         actions: ["view"],
//       },
//     ],
//   },
//   {
//     key: "settings",
//     label: "Settings",
//     icon: "🔧",
//     subModules: [
//       {
//         key: "system_settings",
//         label: "System Settings",
//         actions: ["view", "edit"],
//       },
//       {
//         key: "user_management",
//         label: "User Management",
//         actions: ["view", "create", "edit", "delete"],
//       },
//     ],
//   },
// ];



import {
  Cog,
  Users,
  UserCog,
  Building2,
  Blocks,
  Layers,
  BedDouble,
  FileCog,
  ClipboardList,
  BadgeCheck,
  Activity,
} from "lucide-react";

export interface PermissionNode {
  key: string;
  label: string;
  actions?: string[];
  children?: PermissionNode[];
}

export interface MainModule {
  key: string;
  label: string;
  icon?: any;
  subModules: PermissionNode[];
}

export const mainModules: MainModule[] = [
  /* ------------------------------------------
     ✅ ADMINISTRATION (YOUR REAL MODULES)
  ------------------------------------------- */
  {
    key: "administration",
    label: "Administration",
    icon: Cog,
    subModules: [
      {
        key: "department",
        label: "Department",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "ward",
        label: "Ward",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "ward_type",
        label: "Ward Type",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "bed_type",
        label: "Bed Type",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "floor",
        label: "Floor",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "roles",
        label: "User Roles",
        actions: ["view", "create", "edit", "delete", "permission_manage"],
      },
      {
        key: "users",
        label: "Users",
        actions: ["view", "create", "edit", "delete", "assign_role"],
      },
      {
        key: "employee",
        label: "Employee Management",
        actions: ["view", "create", "edit", "delete"],
      },
    ],
  },

  /* ------------------------------------------
     REMAINING MODULES (Dummy as you requested)
  ------------------------------------------- */

  {
    key: "front_office",
    label: "Front Office",
    icon: Building2,
    subModules: [
      {
        key: "reception",
        label: "Reception",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "appointment",
        label: "Appointment Management",
        actions: ["view", "create", "edit", "delete", "cancel"],
      },
    ],
  },

  {
    key: "diagnostics",
    label: "Diagnostics",
    icon: Activity,
    subModules: [
      {
        key: "lab",
        label: "Laboratory",
        actions: ["view", "create", "edit", "delete", "approve"],
      },
      {
        key: "radiology",
        label: "Radiology",
        actions: ["view", "create", "edit", "delete", "approve"],
      },
    ],
  },

  {
    key: "pharmacy",
    label: "Pharmacy",
    icon: BedDouble,
    subModules: [
      {
        key: "pharmacy",
        label: "Pharmacy Management",
        actions: ["view", "create", "edit", "delete", "export_pdf", "import_excel"],
      },
    ],
  },

  {
    key: "billing_insurance",
    label: "Billing & Insurance",
    icon: FileCog,
    subModules: [
      {
        key: "invoicing",
        label: "Invoicing",
        actions: ["view", "create", "edit", "delete", "print"],
      },
      {
        key: "insurance_claims",
        label: "Insurance Claims",
        actions: ["view", "create", "edit", "delete", "submit"],
      },
    ],
  },

  {
    key: "inventory",
    label: "Inventory",
    icon: Blocks,
    subModules: [
      {
        key: "stock",
        label: "Stock Management",
        actions: ["view", "create", "edit", "delete", "adjust"],
      },
      {
        key: "purchase",
        label: "Purchase Orders",
        actions: ["view", "create", "edit", "delete", "approve"],
      },
    ],
  },

  {
    key: "reports_analytics",
    label: "Reports & Analytics",
    icon: ClipboardList,
    subModules: [
      {
        key: "reports",
        label: "Reports",
        actions: ["view", "export_pdf", "export_excel"],
      },
      {
        key: "analytics",
        label: "Analytics Dashboard",
        actions: ["view"],
      },
    ],
  },

  {
    key: "settings",
    label: "Settings",
    icon: UserCog,
    subModules: [
      {
        key: "system_settings",
        label: "System Settings",
        actions: ["view", "edit"],
      },
      {
        key: "user_management",
        label: "User Management",
        actions: ["view", "create", "edit", "delete"],
      },
    ],
  },
];
