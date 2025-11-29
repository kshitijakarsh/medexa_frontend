

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
  ClipboardSignature,
  Accessibility,
  BriefcaseBusiness,
} from "lucide-react";

export interface PermissionNode {
  key: string;
  label: string;
  actions?: string[];
  children?: PermissionNode[];
}

export interface MainModule {
  key: string;
  id?: Number;
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
    id: 0,
    label: "Administration",
    icon: Cog,
    subModules: [
      {
        key: "department",
        label: "Department",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "ward",
        label: "Ward",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "wardType",
        label: "Ward Type",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "bedType",
        label: "Bed Type",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "floor",
        label: "Floor",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "role",
        label: "User Roles",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "user",
        label: "Users",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "employee",
        label: "Employee Management",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "operation-theatres",
        label: "Operation Theatres",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "insurance",
        label: "Insurance",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "charges",
        label: "Charges",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "tax",
        label: "Tax",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "category",
        label: "Category",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "unit",
        label: "Unit",
        actions: ["view", "create", "edit", "delete"],
      },
    ],
  },

  {
    key: "patient_management",
    id: 1,
    label: "Patient Management",
    icon: Accessibility,
    subModules: [
      {
        key: "reception",
        label: "Reception",
        actions: ["view", "create", "edit", "delete"],
      },
      {
        key: "appointments",
        label: "Appointment Management",
        actions: ["view", "create", "edit", "delete", "cancel"],
      },
    ],
  },
  {
    key: "appointment",
    id: 2,
    label: "Appointment Management",
    icon: ClipboardSignature,
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
    key: "billing",
    id: 3,
    label: "Billing",
    icon: BriefcaseBusiness,
    subModules: [
      {
        key: "billing",
        label: "Billing",
        actions: ["view", "create", "edit", "delete"],
      },
    ],
  },

  {
    key: "pharmacy",
    id: 4,
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
    key: "laboratory",
    id: 5,
    label: "Laboratory",
    icon: Activity,
    subModules: [
      {
        key: "lab",
        label: "Laboratory",
        actions: ["view", "create", "edit", "delete",],
      },
      {
        key: "radiology",
        label: "Radiology",
        actions: ["view", "create", "edit", "delete",],
      },
    ],
  },
  {
    key: "hr",
    id: 6,
    label: "Human Resources",
    icon: ClipboardSignature,
    subModules: [
      {
        key: "designation",
        label: "Designation",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "specialisation",
        label: "Specialisation Management",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
      {
        key: "employee",
        label: "Employee Management",
        actions: ["view", "create", "edit", "delete", "viewOne"],
      },
    ],
  },
  {
    key: "analytics",
    id: 7,
    label: "Analytics",
    icon: BriefcaseBusiness,
    subModules: [
      {
        key: "analytics",
        label: "Analytics",
        actions: ["view", "create", "edit", "delete"],
      },
    ],
  },

  {
    key: "doctor",
    id: 8,
    label: "Doctor",
    icon: BriefcaseBusiness,
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
      {
        key: "prescription",
        label: "Prescription Management",
        actions: ["view", "create", "edit", "delete", "approve"],
      },
      {
        key: "patient",
        label: "Patient Records",
        actions: ["view", "create", "edit", "delete", "export"],
      },
      {
        key: "lab",
        label: "Lab Reports",
        actions: ["view", "upload", "edit", "delete"],
      },
    ],
  },
  {
    key: "frontoffice",
    id: 9,
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


  // {
  //   key: "billing",
  //   id: 14,
  //   label: "Billing & Insurance",
  //   icon: FileCog,
  //   subModules: [
  //     {
  //       key: "invoicing",
  //       label: "Invoicing",
  //       actions: ["view", "create", "edit", "delete", "print"],
  //     },
  //     {
  //       key: "insurance_claims",
  //       label: "Insurance Claims",
  //       actions: ["view", "create", "edit", "delete", "submit"],
  //     },
  //   ],
  // },

  // {
  //   key: "inventory",
  //   id: 15,
  //   label: "Inventory",
  //   icon: Blocks,
  //   subModules: [
  //     {
  //       key: "stock",
  //       label: "Stock Management",
  //       actions: ["view", "create", "edit", "delete", "adjust"],
  //     },
  //     {
  //       key: "purchase",
  //       label: "Purchase Orders",
  //       actions: ["view", "create", "edit", "delete", "approve"],
  //     },
  //   ],
  // },

  // {
  //   key: "reports_analytics",
  //   id: 16,
  //   label: "Reports & Analytics",
  //   icon: ClipboardList,
  //   subModules: [
  //     {
  //       key: "reports",
  //       label: "Reports",
  //       actions: ["view", "export_pdf", "export_excel"],
  //     },
  //     {
  //       key: "analytics",
  //       label: "Analytics Dashboard",
  //       actions: ["view"],
  //     },
  //   ],
  // },

  // {
  //   key: "settings",
  //   id: 17,
  //   label: "Settings",
  //   icon: UserCog,
  //   subModules: [
  //     {
  //       key: "system_settings",
  //       label: "System Settings",
  //       actions: ["view", "edit"],
  //     },
  //     {
  //       key: "user_management",
  //       label: "User Management",
  //       actions: ["view", "create", "edit", "delete"],
  //     },
  //   ],
  // },
];
