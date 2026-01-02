// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import {
// // //   Accordion,
// // //   AccordionItem,
// // //   AccordionTrigger,
// // //   AccordionContent,
// // // } from "@workspace/ui/components/accordion";
// // // import { PermissionNode, permissionModules } from "./permissionsConfig";
// // // import { CustomCheckbox } from "./CustomCheckbox";

// // // interface PermissionAccordionProps {
// // //   value?: Record<string, boolean>;
// // //   onChange?: (updated: Record<string, boolean>) => void;
// // // }

// // // export const PermissionAccordion = ({
// // //   value = {},
// // //   onChange,
// // // }: PermissionAccordionProps) => {
// // //   const [permissions, setPermissions] = useState<Record<string, boolean>>(value);
// // //   const [openItems, setOpenItems] = useState<string[]>([]);

// // //   useEffect(() => {
// // //     // Open all modules by default
// // //     setOpenItems(permissionModules.map((m) => m.key));
// // //   }, []);

// // //   const updatePermissions = (updated: Record<string, boolean>) => {
// // //     setPermissions(updated);
// // //     onChange?.(updated);
// // //   };

// // //   // Check if all actions in a node are checked
// // //   const isAllChecked = (node: PermissionNode): boolean => {
// // //     const actions = node.actions || [];
// // //     const allActionsChecked = actions.every(
// // //       (act) => permissions[`${node.key}_${act}`]
// // //     );
// // //     const allChildrenChecked =
// // //       (node.children || []).length === 0 ||
// // //       (node.children || []).every((child) => isAllChecked(child));
// // //     return allActionsChecked && allChildrenChecked;
// // //   };

// // //   // Toggle all checkboxes for a node and its children
// // //   const toggleAllBranch = (
// // //     node: PermissionNode,
// // //     checked: boolean,
// // //     updated: Record<string, boolean>
// // //   ) => {
// // //     updated[`${node.key}_all`] = checked;
// // //     (node.actions || []).forEach((act) => (updated[`${node.key}_${act}`] = checked));
// // //     (node.children || []).forEach((child) => toggleAllBranch(child, checked, updated));
// // //   };

// // //   // Update "All" checkbox when individual actions change
// // //   const handleActionChange = (node: PermissionNode, action: string, checked: boolean) => {
// // //     const updated = { ...permissions };
// // //     const key = `${node.key}_${action}`;
// // //     updated[key] = checked;

// // //     // Update "All" checkbox based on whether all actions are checked
// // //     const allActions = node.actions || [];
// // //     const allChecked = allActions.every((act) => 
// // //       act === action ? checked : updated[`${node.key}_${act}`]
// // //     );
// // //     updated[`${node.key}_all`] = allChecked;

// // //     updatePermissions(updated);
// // //   };

// // //   // Render action checkboxes in a row
// // //   const renderActionRow = (node: PermissionNode, isChild = false) => {
// // //     const actions = node.actions || [];
// // //     if (actions.length === 0) return null;

// // //     return (
// // //       <div className="space-y-3">
// // //         {/* Section Label for child nodes */}
// // //         {isChild && (
// // //           <div className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
// // //             {node.label}
// // //           </div>
// // //         )}

// // //         <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
// // //           {/* All Checkbox */}
// // //           <div className="flex items-center gap-2.5 min-w-[80px]">
// // //             <CustomCheckbox
// // //               checked={isAllChecked(node)}
// // //               onChange={(checked) => {
// // //                 const updated = { ...permissions };
// // //                 toggleAllBranch(node, checked, updated);
// // //                 updatePermissions(updated);
// // //               }}
// // //             />
// // //             <span className="text-sm font-semibold text-gray-700">All</span>
// // //           </div>

// // //           {/* Individual Action Checkboxes */}
// // //           {actions.map((action) => {
// // //             const key = `${node.key}_${action}`;
// // //             return (
// // //               <div key={key} className="flex items-center gap-2.5 min-w-[100px]">
// // //                 <CustomCheckbox
// // //                   checked={!!permissions[key]}
// // //                   onChange={(checked) => handleActionChange(node, action, checked)}
// // //                 />
// // //                 <span className="text-sm text-gray-600 capitalize">
// // //                   {action.replace(/_/g, " ")}
// // //                 </span>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   // Render a single permission module (always in accordion)
// // //   const renderNode = (node: PermissionNode) => {
// // //     const hasChildren = node.children && node.children.length > 0;

// // //     return (
// // //       <AccordionItem 
// // //         key={node.key} 
// // //         value={node.key} 
// // //         className="border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white mb-4"
// // //       >
// // //         <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-[#2D3748] hover:bg-[#F7FAFC] bg-gradient-to-r from-[#EDF2F7] to-[#E6EFFF] transition-colors duration-150">
// // //           {node.label}
// // //         </AccordionTrigger>
// // //         <AccordionContent className="bg-[#FAFBFC] px-0 py-0">
// // //           {hasChildren ? (
// // //             <>
// // //               {/* Parent node actions */}
// // //               <div className="px-5 py-4 bg-gradient-to-b from-white to-[#F9FAFB] border-b border-gray-200">
// // //                 {renderActionRow(node, false)}
// // //               </div>

// // //               {/* Children sections */}
// // //               <div className="divide-y divide-gray-200">
// // //                 {node.children?.map((child) => (
// // //                   <div key={child.key} className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150">
// // //                     {renderActionRow(child, true)}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </>
// // //           ) : (
// // //             // Single module without children (like Pharmacy)
// // //             <div className="px-5 py-4 bg-white">
// // //               {renderActionRow(node, false)}
// // //             </div>
// // //           )}
// // //         </AccordionContent>
// // //       </AccordionItem>
// // //     );
// // //   };

// // //   return (
// // //     <div className="w-full space-y-4">
// // //       <Accordion
// // //         type="multiple"
// // //         value={openItems}
// // //         onValueChange={setOpenItems}
// // //         className="w-full"
// // //       >
// // //         {permissionModules.map((mod) => renderNode(mod))}
// // //       </Accordion>
// // //     </div>
// // //   );
// // // };


// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   Accordion,
// //   AccordionItem,
// //   AccordionTrigger,
// //   AccordionContent,
// // } from "@workspace/ui/components/accordion";
// // import { PermissionNode, permissionModules } from "./permissionsConfig";
// // import { CustomCheckbox } from "./CustomCheckbox";

// // interface PermissionAccordionProps {
// //   value?: Record<string, any>;
// //   onChange?: (updated: Record<string, any>) => void;
// // }

// // export const PermissionAccordion = ({
// //   value = {},
// //   onChange,
// // }: PermissionAccordionProps) => {
// //   const [permissions, setPermissions] = useState<Record<string, any>>(value);
// //   const [openItems, setOpenItems] = useState<string[]>([]);

// //   useEffect(() => {
// //     // Open all modules by default
// //     setOpenItems(permissionModules.map((m) => m.key));
// //   }, []);

// //   useEffect(() => {
// //     // Initialize permissions structure from modules
// //     const initialPermissions: Record<string, any> = { ...value };

// //     const initializeNode = (node: PermissionNode) => {
// //       if (!initialPermissions[node.key]) {
// //         initialPermissions[node.key] = {};
// //       }
// //       (node.actions || []).forEach((action) => {
// //         if (initialPermissions[node.key][action] === undefined) {
// //           initialPermissions[node.key][action] = false;
// //         }
// //       });

// //       if (node.children) {
// //         node.children.forEach((child) => {
// //           if (!initialPermissions[child.key]) {
// //             initialPermissions[child.key] = {};
// //           }
// //           (child.actions || []).forEach((action) => {
// //             if (initialPermissions[child.key][action] === undefined) {
// //               initialPermissions[child.key][action] = false;
// //             }
// //           });
// //         });
// //       }
// //     };

// //     permissionModules.forEach(initializeNode);
// //     setPermissions(initialPermissions);
// //   }, []);

// //   const updatePermissions = (updated: Record<string, any>) => {
// //     setPermissions(updated);
// //     onChange?.(updated);
// //   };

// //   // Check if all actions in a node are checked
// //   const isAllChecked = (node: PermissionNode): boolean => {
// //     const actions = node.actions || [];
// //     const nodePermissions = permissions[node.key] || {};
// //     const allActionsChecked = actions.every((act) => nodePermissions[act] === true);

// //     if (node.children) {
// //       const allChildrenChecked = node.children.every((child) => isAllChecked(child));
// //       return allActionsChecked && allChildrenChecked;
// //     }

// //     return allActionsChecked;
// //   };

// //   // Toggle all checkboxes for a node and its children
// //   const toggleAllBranch = (node: PermissionNode, checked: boolean, updated: Record<string, any>) => {
// //     if (!updated[node.key]) {
// //       updated[node.key] = {};
// //     }

// //     (node.actions || []).forEach((act) => {
// //       updated[node.key][act] = checked;
// //     });

// //     (node.children || []).forEach((child) => {
// //       toggleAllBranch(child, checked, updated);
// //     });
// //   };

// //   // Update "All" checkbox when individual actions change
// //   const handleActionChange = (node: PermissionNode, action: string, checked: boolean) => {
// //     const updated = JSON.parse(JSON.stringify(permissions)); // Deep clone

// //     if (!updated[node.key]) {
// //       updated[node.key] = {};
// //     }

// //     updated[node.key][action] = checked;

// //     updatePermissions(updated);
// //   };

// //   // Render action checkboxes in a row
// //   const renderActionRow = (node: PermissionNode, isChild = false) => {
// //     const actions = node.actions || [];
// //     if (actions.length === 0) return null;

// //     return (
// //       <div className="space-y-3">
// //         {/* Section Label for child nodes */}
// //         {isChild && (
// //           <div className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
// //             {node.label}
// //           </div>
// //         )}

// //         <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
// //           {/* All Checkbox */}
// //           <div className="flex items-center gap-2.5 min-w-[80px]">
// //             <CustomCheckbox
// //               checked={isAllChecked(node)}
// //               onChange={(checked) => {
// //                 const updated = JSON.parse(JSON.stringify(permissions)); // Deep clone
// //                 toggleAllBranch(node, checked, updated);
// //                 updatePermissions(updated);
// //               }}
// //             />
// //             <span className="text-sm font-semibold text-gray-700">All</span>
// //           </div>

// //           {/* Individual Action Checkboxes */}
// //           {actions.map((action) => {
// //             const isChecked = permissions[node.key]?.[action] || false;
// //             return (
// //               <div key={action} className="flex items-center gap-2.5 min-w-[100px]">
// //                 <CustomCheckbox
// //                   checked={isChecked}
// //                   onChange={(checked) => handleActionChange(node, action, checked)}
// //                 />
// //                 <span className="text-sm text-gray-600 capitalize">
// //                   {action.replace(/_/g, " ")}
// //                 </span>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Render a single permission module (always in accordion)
// //   const renderNode = (node: PermissionNode) => {
// //     const hasChildren = node.children && node.children.length > 0;

// //     return (
// //       <AccordionItem 
// //         key={node.key} 
// //         value={node.key} 
// //         className="border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white mb-4"
// //       >
// //         <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-[#2D3748] hover:bg-[#F7FAFC] bg-gradient-to-r from-[#EDF2F7] to-[#E6EFFF] transition-colors duration-150">
// //           {node.label}
// //         </AccordionTrigger>
// //         <AccordionContent className="bg-[#FAFBFC] px-0 py-0">
// //           {hasChildren ? (
// //             <>
// //               {/* Parent node actions */}
// //               <div className="px-5 py-4 bg-gradient-to-b from-white to-[#F9FAFB] border-b border-gray-200">
// //                 {renderActionRow(node, false)}
// //               </div>

// //               {/* Children sections */}
// //               <div className="divide-y divide-gray-200">
// //                 {node.children?.map((child) => (
// //                   <div key={child.key} className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150">
// //                     {renderActionRow(child, true)}
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           ) : (
// //             // Single module without children (like Pharmacy)
// //             <div className="px-5 py-4 bg-white">
// //               {renderActionRow(node, false)}
// //             </div>
// //           )}
// //         </AccordionContent>
// //       </AccordionItem>
// //     );
// //   };

// //   return (
// //     <div className="w-full space-y-4">
// //       <Accordion
// //         type="multiple"
// //         value={openItems}
// //         onValueChange={setOpenItems}
// //         className="w-full"
// //       >
// //         {permissionModules.map((mod) => renderNode(mod))}
// //       </Accordion>
// //     </div>
// //   );
// // };


// "use client";

// import { useState, useEffect } from "react";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@workspace/ui/components/accordion";
// import { PermissionNode, MainModule, mainModules } from "./permissionsConfig";
// import { CustomCheckbox } from "./CustomCheckbox";
// import { ChevronDown } from "lucide-react";

// interface PermissionAccordionProps {
//   value?: Record<string, any>;
//   onChange?: (updated: Record<string, any>) => void;
// }

// export const PermissionAccordion = ({
//   value = {},
//   onChange,
// }: PermissionAccordionProps) => {
//   const [permissions, setPermissions] = useState<Record<string, any>>({});
//   const [openMainModules, setOpenMainModules] = useState<string[]>([]);
//   const [openSubModules, setOpenSubModules] = useState<string[]>([]);

//   useEffect(() => {
//     // Open all main modules by default
//     setOpenMainModules(mainModules.map((m) => m.key));

//     // Open all sub-modules by default
//     const allSubModules: string[] = [];
//     mainModules.forEach((main) => {
//       main.subModules.forEach((sub) => {
//         allSubModules.push(sub.key);
//       });
//     });
//     setOpenSubModules(allSubModules);
//   }, []);

//   useEffect(() => {
//     // Initialize ONLY nested structure - ignore any flat keys
//     const initialPermissions: Record<string, any> = {};

//     mainModules.forEach((mainModule) => {
//       initialPermissions[mainModule.key] = {};

//       mainModule.subModules.forEach((subModule) => {
//         initialPermissions[mainModule.key][subModule.key] = {};

//         (subModule.actions || []).forEach((action) => {
//           initialPermissions[mainModule.key][subModule.key][action] = 
//             value[mainModule.key]?.[subModule.key]?.[action] || false;
//         });

//         // Initialize children permissions
//         if (subModule.children) {
//           subModule.children.forEach((child) => {
//             initialPermissions[mainModule.key][child.key] = {};
//             (child.actions || []).forEach((action) => {
//               initialPermissions[mainModule.key][child.key][action] = 
//                 value[mainModule.key]?.[child.key]?.[action] || false;
//             });
//           });
//         }
//       });
//     });

//     setPermissions(initialPermissions);
//   }, []);

//   const updatePermissions = (updated: Record<string, any>) => {
//     setPermissions(updated);
//     onChange?.(updated);
//   };

//   // Check if all actions in a node are checked
//   const isAllChecked = (mainModuleKey: string, node: PermissionNode): boolean => {
//     const actions = node.actions || [];
//     const nodePermissions = permissions[mainModuleKey]?.[node.key] || {};
//     const allActionsChecked = actions.every((act) => nodePermissions[act] === true);

//     if (node.children) {
//       const allChildrenChecked = node.children.every((child) => 
//         isAllChecked(mainModuleKey, child)
//       );
//       return allActionsChecked && allChildrenChecked;
//     }

//     return allActionsChecked;
//   };

//   // Toggle all checkboxes for a node and its children
//   const toggleAllBranch = (
//     mainModuleKey: string,
//     node: PermissionNode,
//     checked: boolean,
//     updated: Record<string, any>
//   ) => {
//     if (!updated[mainModuleKey]) {
//       updated[mainModuleKey] = {};
//     }
//     if (!updated[mainModuleKey][node.key]) {
//       updated[mainModuleKey][node.key] = {};
//     }

//     (node.actions || []).forEach((act) => {
//       updated[mainModuleKey][node.key][act] = checked;
//     });

//     (node.children || []).forEach((child) => {
//       toggleAllBranch(mainModuleKey, child, checked, updated);
//     });
//   };

//   // Update individual action
//   const handleActionChange = (
//     mainModuleKey: string,
//     node: PermissionNode,
//     action: string,
//     checked: boolean
//   ) => {
//     const updated = JSON.parse(JSON.stringify(permissions));

//     if (!updated[mainModuleKey]) {
//       updated[mainModuleKey] = {};
//     }
//     if (!updated[mainModuleKey][node.key]) {
//       updated[mainModuleKey][node.key] = {};
//     }

//     updated[mainModuleKey][node.key][action] = checked;
//     updatePermissions(updated);
//   };

//   // Render action checkboxes
//   const renderActionRow = (mainModuleKey: string, node: PermissionNode, isChild = false) => {
//     const actions = node.actions || [];
//     if (actions.length === 0) return null;

//     return (
//       <div className="space-y-3">
//         {isChild && (
//           <div className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
//             {node.label}
//           </div>
//         )}

//         <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
//           {/* All Checkbox */}
//           <div className="flex items-center gap-2.5 min-w-[80px]">
//             <CustomCheckbox
//               checked={isAllChecked(mainModuleKey, node)}
//               onChange={(checked) => {
//                 const updated = JSON.parse(JSON.stringify(permissions));
//                 toggleAllBranch(mainModuleKey, node, checked, updated);
//                 updatePermissions(updated);
//               }}
//             />
//             <span className="text-sm font-semibold text-gray-700">All</span>
//           </div>

//           {/* Individual Action Checkboxes */}
//           {actions.map((action) => {
//             const isChecked = permissions[mainModuleKey]?.[node.key]?.[action] || false;
//             return (
//               <div key={action} className="flex items-center gap-2.5 min-w-[100px]">
//                 <CustomCheckbox
//                   checked={isChecked}
//                   onChange={(checked) => handleActionChange(mainModuleKey, node, action, checked)}
//                 />
//                 <span className="text-sm text-gray-600 capitalize">
//                   {action.replace(/_/g, " ")}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   // Render sub-module
//   const renderSubModule = (mainModuleKey: string, subModule: PermissionNode) => {
//     const hasChildren = subModule.children && subModule.children.length > 0;

//     return (
//       <AccordionItem
//         key={subModule.key}
//         value={subModule.key}
//         className="border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white mb-3"
//       >
//         <AccordionTrigger className="px-5 py-3 text-sm font-semibold text-[#2D3748] hover:bg-[#F7FAFC] bg-gradient-to-r from-[#EDF2F7] to-[#E6EFFF] transition-colors duration-150">
//           {subModule.label}
//         </AccordionTrigger>
//         <AccordionContent className="bg-[#FAFBFC] px-0 py-0">
//           {hasChildren ? (
//             <>
//               <div className="px-5 py-4 bg-gradient-to-b from-white to-[#F9FAFB] border-b border-gray-200">
//                 {renderActionRow(mainModuleKey, subModule, false)}
//               </div>
//               <div className="divide-y divide-gray-200">
//                 {subModule.children?.map((child) => (
//                   <div
//                     key={child.key}
//                     className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     {renderActionRow(mainModuleKey, child, true)}
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="px-5 py-4 bg-white">
//               {renderActionRow(mainModuleKey, subModule, false)}
//             </div>
//           )}
//         </AccordionContent>
//       </AccordionItem>
//     );
//   };

//   // Render main module with modern UI
//   const renderMainModule = (mainModule: MainModule) => {
//     return (
//       <AccordionItem
//         key={mainModule.key}
//         value={mainModule.key}
//         className="border-none rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white mb-6 transform hover:-translate-y-1"
//       >
//         <AccordionTrigger className="px-6 py-5 text-base font-bold text-white bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#F093FB] hover:from-[#5A67D8] hover:via-[#6B46C1] hover:to-[#ED64A6] transition-all duration-300 shadow-md">
//           <div className="flex items-center justify-between w-full">
//             <span className="flex items-center gap-3">
//               {mainModule.icon && (
//                 <span className="text-2xl bg-white/20 backdrop-blur-sm rounded-lg p-2 shadow-inner">
//                   {mainModule.icon}
//                 </span>
//               )}
//               <span className="tracking-wide">{mainModule.label}</span>
//             </span>
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="bg-gradient-to-br from-[#F8FAFC] to-[#EDF2F7] px-6 py-6 border-t-4 border-[#667EEA]">
//           <Accordion
//             type="multiple"
//             value={openSubModules}
//             onValueChange={setOpenSubModules}
//             className="space-y-3"
//           >
//             {mainModule.subModules.map((subModule) =>
//               renderSubModule(mainModule.key, subModule)
//             )}
//           </Accordion>
//         </AccordionContent>
//       </AccordionItem>
//     );
//   };

//   return (
//     <div className="w-full">
//       <Accordion
//         type="multiple"
//         value={openMainModules}
//         onValueChange={setOpenMainModules}
//         className="space-y-6"
//       >
//         {mainModules.map((mainModule) => renderMainModule(mainModule))}
//       </Accordion>
//     </div>
//   );
// };



"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";
import { PermissionNode, MainModule, mainModules } from "./permissionsConfig";
import { CustomCheckbox } from "./CustomCheckbox";
import { useDictionary } from "@/i18n/use-dictionary";

interface PermissionAccordionProps {
  allowedModules: Array<{ id?: string; key: string }> | string[];
  value?: Record<string, any>;
  onChange?: (updated: Record<string, any>) => void;
}

export const PermissionAccordion = ({
  allowedModules = [],
  value = {},
  onChange,
}: PermissionAccordionProps) => {

  const dict = useDictionary();
  const moduleDict = dict.pages.permissions.modules;
  const subModuleDict = dict.pages.permissions.submodules;
  const actionDict = dict.pages.permissions.children;

  const translatedModules: MainModule[] = mainModules.map((m) => ({
    ...m,
    label: moduleDict[m.key as keyof typeof moduleDict] || m.label,
    subModules: m.subModules.map((s) => ({
      ...s,
      label: subModuleDict[s.key as keyof typeof subModuleDict] || s.label,
      children: s.children?.map((c) => ({
        ...c,
        label: subModuleDict[c.key as keyof typeof subModuleDict] || c.label,
      })),
    })),
  }));

  const visibleModules = translatedModules.filter((m) =>
    allowedModules.some((allow) => {
      if (typeof allow === "string") {
        return allow.toLowerCase() === m.key.toLowerCase();
      }
      return allow.id === m.id || allow.key.toLowerCase() === m.key.toLowerCase();
    })
  );

  const [permissions, setPermissions] = useState<Record<string, any>>({});
  const [openMainModules, setOpenMainModules] = useState<string[]>([]);
  const [openSubModules, setOpenSubModules] = useState<string[]>([]);

  useEffect(() => {
    // Open all main modules by default
    setOpenMainModules(translatedModules.map((m) => m.key));

    // Open all sub-modules by default
    const allSubModules: string[] = [];
    mainModules.forEach((main) => {
      main.subModules.forEach((sub) => {
        allSubModules.push(sub.key);
      });
    });
    setOpenSubModules(allSubModules);
  }, []);

  useEffect(() => {
    // Initialize ONLY nested structure - ignore any flat keys
    const initialPermissions: Record<string, any> = {};

    translatedModules.forEach((mainModule) => {
      initialPermissions[mainModule.key] = {};

      mainModule.subModules.forEach((subModule) => {
        initialPermissions[mainModule.key][subModule.key] = {};

        (subModule.actions || []).forEach((action) => {
          initialPermissions[mainModule.key][subModule.key][action] =
            value[mainModule.key]?.[subModule.key]?.[action] || false;
        });

        // Initialize children permissions
        if (subModule.children) {
          subModule.children.forEach((child) => {
            initialPermissions[mainModule.key][child.key] = {};
            (child.actions || []).forEach((action) => {
              initialPermissions[mainModule.key][child.key][action] =
                value[mainModule.key]?.[child.key]?.[action] || false;
            });
          });
        }
      });
    });

    setPermissions(initialPermissions);
  }, []);

  const updatePermissions = (updated: Record<string, any>) => {
    setPermissions(updated);
    onChange?.(updated);
  };

  // Check if all Mian actions in a node are checked
  const isMainModuleAllChecked = (main: MainModule): boolean => {
    const mainKey = main.key;

    // Every sub and child action must be checked
    return main.subModules.every((sub) => isAllChecked(mainKey, sub));
  };


  // Check if all actions in a node are checked
  const isAllChecked = (mainModuleKey: string, node: PermissionNode): boolean => {
    const actions = node.actions || [];
    const nodePermissions = permissions[mainModuleKey]?.[node.key] || {};
    const allActionsChecked = actions.every((act) => nodePermissions[act] === true);

    if (node.children) {
      const allChildrenChecked = node.children.every((child) =>
        isAllChecked(mainModuleKey, child)
      );
      return allActionsChecked && allChildrenChecked;
    }

    return allActionsChecked;
  };

  // Toggle all main checkboxes 
  const toggleMainModuleAll = (
    main: MainModule,
    checked: boolean
  ) => {
    const updated = JSON.parse(JSON.stringify(permissions));
    const mainKey = main.key;

    if (!updated[mainKey]) updated[mainKey] = {};

    // Loop through every sub module
    main.subModules.forEach((sub) => {
      // Toggle the main submodule
      toggleAllBranch(mainKey, sub, checked, updated);

      // Toggle children (if exists)
      sub.children?.forEach((child) => {
        toggleAllBranch(mainKey, child, checked, updated);
      });
    });

    updatePermissions(updated);
  };


  // Toggle all checkboxes for a node and its children
  const toggleAllBranch = (
    mainModuleKey: string,
    node: PermissionNode,
    checked: boolean,
    updated: Record<string, any>
  ) => {
    if (!updated[mainModuleKey]) {
      updated[mainModuleKey] = {};
    }
    if (!updated[mainModuleKey][node.key]) {
      updated[mainModuleKey][node.key] = {};
    }

    (node.actions || []).forEach((act) => {
      updated[mainModuleKey][node.key][act] = checked;
    });

    (node.children || []).forEach((child) => {
      toggleAllBranch(mainModuleKey, child, checked, updated);
    });
  };

  // // Update individual action
  // const handleActionChange = (
  //   mainModuleKey: string,
  //   node: PermissionNode,
  //   action: string,
  //   checked: boolean
  // ) => {
  //   const updated = JSON.parse(JSON.stringify(permissions));

  //   if (!updated[mainModuleKey]) {
  //     updated[mainModuleKey] = {};
  //   }
  //   if (!updated[mainModuleKey][node.key]) {
  //     updated[mainModuleKey][node.key] = {};
  //   }

  //   updated[mainModuleKey][node.key][action] = checked;
  //   updatePermissions(updated);
  // };

  const handleActionChange = (
    mainModuleKey: string,
    node: PermissionNode,
    action: string,
    checked: boolean
  ) => {
    const updated = JSON.parse(JSON.stringify(permissions));

    if (!updated[mainModuleKey]) {
      updated[mainModuleKey] = {};
    }
    if (!updated[mainModuleKey][node.key]) {
      updated[mainModuleKey][node.key] = {};
    }

    // Set the action state
    updated[mainModuleKey][node.key][action] = checked;

    // 🔥 Auto-enable VIEW if any other action = true
    if (checked && action !== "view") {
      updated[mainModuleKey][node.key]["view"] = true;
    }

    // 🔥 If "view" gets unchecked → uncheck all other actions
    if (!checked && action === "view") {
      (node.actions || []).forEach((act) => {
        if (act !== "view") {
          updated[mainModuleKey][node.key][act] = false;
        }
      });
    }

    updatePermissions(updated);
  };


  // Render action checkboxes
  const renderActionRow = (mainModuleKey: string, node: PermissionNode, isChild = false) => {
    const actions = node.actions || [];
    if (actions.length === 0) return null;

    return (
      <div className="space-y-3">
        {isChild && (
          <div className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            {node.label}
          </div>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
          {/* All Checkbox */}
          <div className="flex items-center gap-2.5 min-w-[80px]">
            <CustomCheckbox
              checked={isAllChecked(mainModuleKey, node)}
              onChange={(checked) => {
                const updated = JSON.parse(JSON.stringify(permissions));
                toggleAllBranch(mainModuleKey, node, checked, updated);
                updatePermissions(updated);
              }}
            />
            <span className="text-sm font-semibold text-gray-700">{actionDict["All"]}</span>
          </div>

          {/* Individual Action Checkboxes */}
          {actions.map((action) => {
            const isChecked = permissions[mainModuleKey]?.[node.key]?.[action] || false;
            return (
              <div key={action} className="flex items-center gap-2.5 min-w-[100px]">
                <CustomCheckbox
                  checked={isChecked}
                  onChange={(checked) => handleActionChange(mainModuleKey, node, action, checked)}
                />
                <span className="text-sm text-gray-600 capitalize">
                    {actionDict[action as keyof typeof actionDict] || action.replace(/_/g, " ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render sub-module
  const renderSubModule = (mainModuleKey: string, subModule: PermissionNode) => {
    const hasChildren = subModule.children && subModule.children.length > 0;

    return (
      <AccordionItem
        key={subModule.key}
        value={subModule.key}
        className="border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white mb-3"
      >
        <AccordionTrigger className="px-5 py-3 text-sm font-semibold text-[#2D3748] hover:bg-[#F7FAFC] bg-gradient-to-r from-[#EDF2F7] to-[#E6EFFF] transition-colors duration-150">
          {subModule.label}
        </AccordionTrigger>
        <AccordionContent className="bg-[#FAFBFC] px-0 py-0">
          {hasChildren ? (
            <>
              <div className="px-5 py-4 bg-gradient-to-b from-white to-[#F9FAFB] border-b border-gray-200">
                {renderActionRow(mainModuleKey, subModule, false)}
              </div>
              <div className="divide-y divide-gray-200">
                {subModule.children?.map((child) => (
                  <div
                    key={child.key}
                    className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150"
                  >
                    {renderActionRow(mainModuleKey, child, true)}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="px-5 py-4 bg-white">
              {renderActionRow(mainModuleKey, subModule, false)}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

  // // Render main module with simple, clean UI matching sub-modules
  // const renderMainModule = (mainModule: MainModule) => {
  //   return (
  //     <AccordionItem
  //       key={mainModule.key}
  //       value={mainModule.key}
  //       className="border-2 border-[#3B82F6] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white mb-5"
  //     >
  //       <AccordionTrigger className="px-5 py-3 text-base font-bold text-[#1E40AF] hover:bg-[#EFF6FF] bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] transition-colors duration-150">
  //         <span className="flex items-center gap-3">
  //           {mainModule.icon && <span className="text-xl">{mainModule.icon}</span>}
  //           {mainModule.label}
  //         </span>
  //       </AccordionTrigger>
  //       <AccordionContent className="bg-[#F8FAFC] px-5 py-5">
  //         <Accordion
  //           type="multiple"
  //           value={openSubModules}
  //           onValueChange={setOpenSubModules}
  //           className="space-y-3"
  //         >
  //           {mainModule.subModules.map((subModule) =>
  //             renderSubModule(mainModule.key, subModule)
  //           )}
  //         </Accordion>
  //       </AccordionContent>
  //     </AccordionItem>
  //   );
  // };
  const renderMainModule = (mainModule: MainModule) => {
    const Icon = mainModule.icon;

    return (
      <AccordionItem
        key={mainModule.key}
        value={mainModule.key}
        className="border-2 border-[#3B82F6] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white mb-5"
      >
        <AccordionTrigger className="px-5 py-3 text-base font-bold text-[#1E40AF] flex justify-between items-center hover:bg-[#EFF6FF] bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between w-full">
            {/* LEFT: ICON + TITLE */}
            <span className="flex items-center gap-3">
              {Icon && <Icon className="w-5 h-5 text-blue-700" />}
              {mainModule.label}
            </span>

            {/* RIGHT: SELECT ALL */}
            <div
              className="flex items-center gap-2 mr-3"
              onClick={(e) => e.stopPropagation()} // prevent accordion toggle
            >
              <CustomCheckbox
                checked={isMainModuleAllChecked(mainModule)}
                onChange={(checked) => toggleMainModuleAll(mainModule, checked)}
              />
              <span className="text-sm font-medium text-blue-900">{dict.pages.permissions.all}</span>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="bg-[#F8FAFC] px-5 py-5">
          <Accordion
            type="multiple"
            value={openSubModules}
            onValueChange={setOpenSubModules}
            className="space-y-3"
          >
            {mainModule.subModules.map((subModule) =>
              renderSubModule(mainModule.key, subModule)
            )}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="w-full">
      <Accordion
        type="multiple"
        value={openMainModules}
        onValueChange={setOpenMainModules}
        className="space-y-5"
      >
        {/* {mainModules.map((mainModule) => renderMainModule(mainModule))} */}
        {visibleModules.map((mainModule) => renderMainModule(mainModule))}
      </Accordion>
    </div>
  );
};
