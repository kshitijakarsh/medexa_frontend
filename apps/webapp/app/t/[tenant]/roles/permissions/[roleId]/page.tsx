// // // // "use client";

// // // // import { useParams } from "next/navigation";
// // // // import { useState } from "react";
// // // // import { PageHeader } from "@/components/common/PageHeader";
// // // // import { PermissionAccordion } from "../_components/PermissionAccordion";
// // // // import { Button } from "@workspace/ui/components/button";

// // // // export default function PermissionAddPage() {
// // // //   const { roleId } = useParams(); // 👈 dynamic route param
// // // //   const [permissionData, setPermissionData] = useState<Record<string, boolean>>({});

// // // //   const handleSave = () => {
// // // //     const payload = {
// // // //       roleId,
// // // //       permissions: permissionData,
// // // //     };
// // // //     console.log("🚀 Sending to backend:", payload);
// // // //     // Example: await axios.post(`/api/permissions/${roleId}`, payload)
// // // //   };

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6 space-y-6">
// // // //       <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
// // // //         <PageHeader title={`Permissions for Role ID: ${roleId}`} />

// // // //         {/* Permission Accordion */}
// // // //         <PermissionAccordion
// // // //           value={permissionData}
// // // //           onChange={setPermissionData}
// // // //         />

// // // //         {/* Footer */}
// // // //         <div className="flex justify-end gap-3 pt-4 border-t">
// // // //           <Button variant="outline" className="text-blue-600 border-blue-500">
// // // //             Cancel
// // // //           </Button>
// // // //           <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
// // // //             Save
// // // //           </Button>
// // // //         </div>
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }

// // // "use client";

// // // import { useParams } from "next/navigation";
// // // import { useState } from "react";
// // // import { PageHeader } from "@/components/common/PageHeader";
// // // import { PermissionAccordion } from "../_components/PermissionAccordion";
// // // import { Button } from "@workspace/ui/components/button";
// // // import { Checkbox } from "@workspace/ui/components/checkbox";

// // // export default function PermissionAddPage() {
// // //   const { roleId } = useParams();
// // //   const [permissionData, setPermissionData] = useState<Record<string, boolean>>({});

// // //   const handleSave = () => {
// // //     const payload = {
// // //       roleId,
// // //       permissions: permissionData,
// // //     };
// // //     console.log("🚀 Sending to backend:", payload);
// // //   };

// // //   return (
// // //     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6">
// // //       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-8 space-y-8">
// // //         <PageHeader title={`Permissions for Role ID: ${roleId}`} />
// // //         <div className="border border-blue-100 rounded-lg p-4 bg-[#F6FBFF]">
// // //           <PermissionAccordion value={permissionData} onChange={setPermissionData} />
// // //         </div>

// // //         <div className="flex justify-end gap-3 pt-6 border-t">
// // //           <Button variant="outline" className="text-blue-600 border-blue-500">
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
// // //             Save
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }



// // // app/permissions/[roleId]/page.tsx
// // "use client";

// // import { useParams } from "next/navigation";
// // import { useState } from "react";
// // import { PageHeader } from "@/components/common/PageHeader";
// // import { PermissionAccordion } from "../_components/PermissionAccordion";
// // import { Button } from "@workspace/ui/components/button";

// // export default function PermissionAddPage() {
// //   const { roleId } = useParams();
// //   const [permissionData, setPermissionData] = useState<Record<string, boolean>>({});

// //   const handleSave = () => {
// //     const selectedPermissions = Object.entries(permissionData)
// //       .filter(([_, isChecked]) => isChecked)
// //       .map(([key]) => key);

// //     console.log("✅ Selected Permissions:", selectedPermissions);
// //   };

// //   return (
// //     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6">
// //       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-8 space-y-8">
// //         <PageHeader title={`Permissions for Role ID: ${roleId}`} />

// //         <div className="border border-blue-100 rounded-lg p-4 bg-[#F6FBFF]">
// //           <PermissionAccordion value={permissionData} onChange={setPermissionData} />
// //         </div>

// //         <div className="flex justify-end gap-3 pt-6 border-t">
// //           <Button variant="outline" className="text-blue-600 border-blue-500">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
// //             Save
// //           </Button>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }


// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { PageHeader } from "@/components/common/PageHeader";
// import { PermissionAccordion } from "../_components/PermissionAccordion";
// import { Button } from "@workspace/ui/components/button";

// export default function PermissionAddPage() {
//   const { roleId } = useParams();
//   const [permissionData, setPermissionData] = useState<Record<string, boolean>>({});

//   const handleSave = () => {
//     const selected = Object.entries(permissionData)
//       .filter(([_, checked]) => checked)
//       .map(([key]) => key);

//     console.log("✅ Selected Permissions for Role:", roleId, selected);
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-8 space-y-8">
//         <PageHeader title={`Permissions for Role ID: ${roleId}`} />

//         <div className="border border-blue-100 rounded-lg p-4 bg-[#F6FBFF]">
//           <PermissionAccordion value={permissionData} onChange={setPermissionData} />
//         </div>

//         <div className="flex justify-end gap-3 pt-6 border-t">
//           <Button variant="outline" className="text-blue-600 border-blue-500">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
//             Save
//           </Button>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PermissionAccordion } from "../_components/PermissionAccordion";
import { Button } from "@workspace/ui/components/button";
import { Header } from "@/components/header";

export default function PermissionAddPage() {
  const { roleId } = useParams();
  const [permissionData, setPermissionData] = useState<Record<string, any>>({});

  const handleSave = () => {
    console.log("✅ Permissions for Role:", roleId);
    console.log("📦 Permission Data Structure:", JSON.stringify(permissionData, null, 2));
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] ">
      <Header />

      <div className=" mx-auto  rounded-lg shadow p-6 space-y-8">
        <PageHeader title={`Permissions for Role ID: ${roleId}`} />

        <div className="border border-blue-100 rounded-lg p-4 bg-white">
          <PermissionAccordion value={permissionData} onChange={setPermissionData} />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" className="text-blue-600 border-blue-500">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
            Save
          </Button>
        </div>
      </div>
    </main>
  );
}
