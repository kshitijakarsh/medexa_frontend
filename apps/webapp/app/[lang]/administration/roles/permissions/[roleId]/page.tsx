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
import { PageHeader } from "@/components/common/page-header";
import { PermissionAccordion } from "../_components/PermissionAccordion";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/lib/sonner";
import { createRoleApiClient } from "@/lib/api/administration/roles";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { fetchAllowedModules } from "../_components/fetchAllowedModules";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";

type AllowedModule = { id: number; key: string };

type AllowedModuleForUI = { id?: string; key: string };

export default function PermissionAddPage() {
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  const { roleId } = useParams();
  const roleApi = createRoleApiClient({});

  const [permissionData, setPermissionData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState<any>(null);
  const queryClient = useQueryClient();


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

  const [allowedModules, setAllowedModules] = useState<AllowedModule[]>([]);

  useEffect(() => {
    const loadModules = async () => {
      setModulesLoading(true);
      // const mods = await fetchAllowedModules();
      const mods = await fetchAllowedModules();
      setAllowedModules(mods);
      setModulesLoading(false);

    };
    loadModules();
  }, []);

  const convertFlatToNested = (permissions: string[]) => {
    const result: Record<string, any> = {};

    permissions.forEach((perm) => {
      const parts = perm.split(":");

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

        // const nested = convertFlatToNested(
        //   role.permissions?.map((p: any) => p.permission) || []
        // );
        // const nested = convertFlatToNested((role.permissions || []) as string[]);
        const nested = convertFlatToNested(
          (role.permissions as unknown as string[]) || []
        );

        // console.log(role)
        setPermissionData(nested);

      } catch (err) {
        toast.error("Failed to load permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId]);

  // const {
  //   data: roleInfo,
  //   isLoading: loadingRole
  // } = useQuery({
  //   queryKey: ["role", roleId,],
  //   enabled: !!roleId,
  //   queryFn: async () => {
  //     const res = await roleApi.getRoleById(roleId as string);
  //     const role = res.data.data;

  //     const nested = convertFlatToNested(
  //       (role.permissions as unknown as string[]) || []
  //     );

  //     // console.log(role)
  //     setPermissionData(nested);
  //     return res.data.data;
  //   }
  // });

  // useEffect(() => {
  //   if (!roleInfo) return;

  //   const nested = convertFlatToNested(
  //     (roleInfo.permissions as unknown as string[]) || []
  //   );

  //   setPermissionData(nested);
  // }, [roleInfo]);



  /* ------------------------------------------------------------
      NESTED UI → API Flat Array
  ------------------------------------------------------------ */
  const flattenPermissions = (data: Record<string, any>): string[] => {
    const result: string[] = [];

    Object.entries(data).forEach(([mainKey, subModules]) => {
      Object.entries(subModules as any).forEach(([subKey, actions]) => {
        Object.entries(actions as any).forEach(([actionKey, isChecked]) => {
          if (isChecked === true) {
            result.push(`${mainKey}:${subKey}:${actionKey}`);
          }
        });
      });
    });

    return result;
  };

  /* ------------------------------------------------------------
      SAVE / UPDATE PERMISSIONS
  ------------------------------------------------------------ */
  // const handleSave = async () => {
  //   const permissionsArray = flattenPermissions(permissionData);

  //   try {
  //     await roleApi.updateRole(roleId as string, {
  //       name: roleInfo.name,               // Required by backend
  //       status: roleInfo.status,           // Required by backend
  //       permissions: permissionsArray      // Updated permission list
  //     });

  //     toast.success("Permissions updated successfully!");
  //   } catch (err: any) {
  //     toast.error(err?.response?.data?.message || "Failed to update permissions");
  //   }
  // };

  type UpdateRolePayload = {
    name: string;
    status: "active" | "inactive" | undefined;
    permissions: string[];
  };

  const updatePermissionMutation = useMutation({
    mutationFn: async (payload: UpdateRolePayload) => {
      return roleApi.updateRole(roleId as string, payload);
    },
    onSuccess: () => {
      toast.success("Permissions updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["role", roleId] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update permissions");
    },
  });

  // handleSave: guard and pass payload
  const handleSave = () => {
    if (!roleInfo) return; // safety guard
    const permissionsArray = flattenPermissions(permissionData);

    updatePermissionMutation.mutate({
      name: roleInfo.name || "",
      status: roleInfo.status || "inactive",
      permissions: permissionsArray,
    });
  };

  /* ------------------------------------------------------------
      UI
  ------------------------------------------------------------ */

  if (loading && modulesLoading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <div className="mx-auto rounded-lg shadow p-6 space-y-8">

          {/* Page Header Skeleton */}
          <div>
            <Skeleton className="h-8 w-72 rounded" />
          </div>

          {/* MAIN CARD */}
          <div className="border border-blue-100 rounded-lg p-5 bg-white space-y-6">

            {/* MAIN MODULE SKELETON */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-2 border-[#3B82F6] rounded-xl p-5 bg-white shadow-sm space-y-4"
              >
                {/* Main Module Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded" />
                </div>

                {/* Sub Modules */}
                <div className="pl-4 space-y-4">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3"
                    >
                      <Skeleton className="h-4 w-40 rounded" />

                      {/* Actions */}
                      <div className="flex gap-6 flex-wrap pt-2">
                        {[1, 2, 3, 4].map((a) => (
                          <div key={a} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-20 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
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
          <PermissionAccordion value={permissionData} onChange={setPermissionData} allowedModules={allowedModules.map(m => ({ ...m, id: String(m.id) }))} />
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
          {/* <PrimaryButton onClick={handleSave} loading={}/> */}
          <PrimaryButton onClick={handleSave} loading={updatePermissionMutation.isPending} />

        </div>
      </div>
    </main>
  );
}
