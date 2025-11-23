// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { PageHeader } from "@/components/common/PageHeader";
// import { PermissionAccordion } from "../_components/PermissionAccordion";
// import { Button } from "@workspace/ui/components/button";
// import { Header } from "@/components/header";

// export default function PermissionAddPage() {
//   const { roleId } = useParams();
//   const [permissionData, setPermissionData] = useState<Record<string, any>>({});

//   const handleSave = () => {
//     console.log("✅ Permissions for Role:", roleId);
//     console.log("📦 Permission Data Structure:", JSON.stringify(permissionData, null, 2));
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] ">
//       {/* <Header /> */}

//       <div className=" mx-auto  rounded-lg shadow p-6 space-y-8">
//         <PageHeader title={`Permissions for Role ID: ${roleId}`} />

//         <div className="border border-blue-100 rounded-lg p-4 bg-white">
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

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { PageHeader } from "@/components/common/PageHeader";
import { PermissionAccordion } from "../_components/PermissionAccordion";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/lib/sonner";
import { createRoleApiClient } from "@/lib/api/administration/roles";
import { Skeleton } from "@workspace/ui/components/skeleton"; 
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

export default function PermissionAddPage() {
  const { roleId } = useParams();
  const roleApi = createRoleApiClient({});

  const [permissionData, setPermissionData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState<any>(null);

  /* ------------------------------------------------------------
      API → Nested UI Structure
      Converts flat array like:
      ["admin.hr.employee.view", ...]
      Into:
      {
        admin: {
          hr: { view:true, create:false, ... },
          employee: { view:true, ... }
        }
      }
  ------------------------------------------------------------ */
  // const convertFlatToNested = (permissions: string[]) => {
  //   const result: Record<string, any> = {};

  //   permissions.forEach((perm) => {
  //     const parts = perm.split("."); // main.sub.action
  //     if (parts.length !== 3) return;

  //     const [main, sub, action] = parts;

  //     if (!result[main]) result[main] = {};
  //     if (!result[main][sub]) result[main][sub] = {};

  //     result[main][sub][action] = true;
  //   });

  //   return result;
  // };
  const convertFlatToNested = (permissions: string[]) => {
    const result: Record<string, any> = {};

    permissions.forEach((perm) => {
      const parts = perm.split(".");

      // Must be exactly: main.sub.action
      if (parts.length !== 3) return;

      const [main, sub, action] = parts as [string, string, string];

      if (!result[main]) result[main] = {};
      if (!result[main][sub]) result[main][sub] = {};

      result[main][sub][action] = true;
    });

    return result;
  };

  /* ------------------------------------------------------------
      LOAD EXISTING ROLE + PERMISSIONS
  ------------------------------------------------------------ */
  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);

      try {
        const res = await roleApi.getRoleById(roleId as string);
        const role = res.data.data;
        setRoleInfo(role);

        const nested = convertFlatToNested(
          role.permissions?.map((p: any) => p.permission) || []
        );

        setPermissionData(nested);
      } catch (err) {
        toast.error("Failed to load permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId]);

  /* ------------------------------------------------------------
      NESTED UI → API Flat Array
  ------------------------------------------------------------ */
  const flattenPermissions = (data: Record<string, any>): string[] => {
    const result: string[] = [];

    Object.entries(data).forEach(([mainKey, subModules]) => {
      Object.entries(subModules as any).forEach(([subKey, actions]) => {
        Object.entries(actions as any).forEach(([actionKey, isChecked]) => {
          if (isChecked === true) {
            result.push(`${mainKey}.${subKey}.${actionKey}`);
          }
        });
      });
    });

    return result;
  };

  /* ------------------------------------------------------------
      SAVE / UPDATE PERMISSIONS
  ------------------------------------------------------------ */
  const handleSave = async () => {
    const permissionsArray = flattenPermissions(permissionData);

    try {
      await roleApi.updateRole(roleId as string, {
        name: roleInfo.name,               // Required by backend
        status: roleInfo.status,           // Required by backend
        permissions: permissionsArray      // Updated permission list
      });

      toast.success("Permissions updated successfully!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update permissions");
    }
  };

  /* ------------------------------------------------------------
      UI
  ------------------------------------------------------------ */
  if (loading) {

    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <div className="mx-auto rounded-lg shadow p-6 space-y-8">

          {/* Page Header Skeleton */}
          <Skeleton className="h-8 w-64 rounded" />

          {/* Main Card */}
          <div className="border border-blue-100 rounded-lg p-4 bg-white space-y-4">

            {/* Main Modules Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-2 border-[#CBD5E1] rounded-xl bg-white shadow-sm p-4 space-y-4"
                >
                  {/* Main module title */}
                  <Skeleton className="h-5 w-48 rounded" />

                  {/* Submodule block */}
                  <div className="space-y-3 pl-4">
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-4 w-56 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons Skeleton */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-28 rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <div className="mx-auto rounded-lg shadow p-6 space-y-8">
        <PageHeader title={`Permissions for Role: ${roleInfo?.name}`} />

        <div className="border border-blue-100 rounded-lg p-4 bg-white">
          <PermissionAccordion value={permissionData} onChange={setPermissionData} />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          {/* <Button variant="outline" className="text-blue-600 border-blue-500">
            Cancel
          </Button> */}
          <CancelButton />
          {/* <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Save
          </Button> */}
          <PrimaryButton onClick={handleSave} />
        </div>
      </div>
    </main>
  );
}
