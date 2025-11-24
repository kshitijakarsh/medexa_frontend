// // /app/charges/service/[id]/page.tsx
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { ArrowLeft } from "lucide-react";
// import { getServiceById } from "../_components/api";
// import { Header } from "@/components/header";

// export default function ServiceDetailsPage() {
//   const params = useParams() as { id?: string };
//   const id = params?.id ? Number(params.id) : undefined;
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [service, setService] = useState<any>(null);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     getServiceById(id).then((s) => {
//       setService(s);
//       setLoading(false);
//     });
//   }, [id]);

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <Header />
//       <div className="p-5">
//         <div className="bg-white rounded-md p-4 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" onClick={() => router.back()}>
//                 <ArrowLeft />
//               </Button>
//               <h3 className="text-lg font-semibold">Service Details</h3>
//             </div>
//             <div>
//               <Button variant="outline">Action</Button>
//             </div>
//           </div>

//           {loading || !service ? (
//             <div className="p-6 text-gray-500">Loading...</div>
//           ) : (
//             <div className="border rounded-md p-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <div className="text-sm text-gray-500">Charge Type</div>
//                   <div className="font-medium">{service.chargeType || "-"}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Charge Category</div>
//                   <div className="font-medium">{service.chargeCategoryLabel}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Unit Type</div>
//                   <div className="font-medium">{service.unitLabel}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Charge Name</div>
//                   <div className="font-medium">{service.serviceName}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Tax Category</div>
//                   <div className="font-medium">{service.taxLabel}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Tax %</div>
//                   <div className="font-medium">{service.standardCharge ? `${service.standardCharge}` : "0"}</div>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <div className="text-sm text-gray-500">Description</div>
//                 <div className="mt-2 text-gray-700">{service.description || "-"}</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { getServiceById } from "../_components/api";
import ActionMenu from "@/components/common/action-menu";

export default function ServiceDetailsPage() {
  const params = useParams() as { id?: string };
  const id = params?.id ? Number(params.id) : undefined;

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getServiceById(id).then((res) => {
      setService(res);
      setLoading(false);
    });
  }, [id]);

  // ---------------------------
  // ⭐ 1. Loader Skeleton
  // ---------------------------
  if (loading) return <ServiceSkeleton />;

  // ---------------------------
  // ⭐ 2. Not found UI
  // ---------------------------
  if (!service)
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />

        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <p className="text-gray-600 text-lg mb-4">Service not found</p>
          <Button variant="outline" onClick={() => router.push("/charges")}>
            Go Back
          </Button>
        </div>
      </main>
    );

  // ---------------------------
  // ⭐ 3. Main UI
  // ---------------------------
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-8">
        {/* HEADER SECTION */}
        <div className="bg-white rounded-md shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-1 rounded-md hover:bg-blue-100"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Button>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {service.serviceName}
              </h2>
              <p className="text-gray-500 text-sm">Service ID: {service.id}</p>
            </div>
          </div>

          {/* ⭐ Action Menu */}
          <ActionMenu
            actions={[
              {
                label: "Edit",
                variant: "success",
                onClick: () => router.push(`/charges/service/${service.id}/edit`),
              },
              {
                label: "Delete",
                variant: "danger",
                onClick: () => alert("Delete triggered"),
              },
              {
                label: "Password",
                onClick: () => alert("Password clicked"),
              },
            ]}
          />
        </div>

        {/* TOP INFO SECTION */}
        <div className="bg-white p-4 rounded-md shadow-sm grid md:grid-cols-4 gap-4">
          <InfoItem label="Charge Type" value={service.chargeType || "-"} />
          <InfoItem
            label="Charge Category"
            value={service.chargeCategoryLabel || "-"}
          />
          <InfoItem label="Unit Type" value={service.unitLabel || "-"} />
          <InfoItem label="Tax Category" value={service.taxLabel || "-"} />
          <InfoItem
            label="Tax %"
            value={service.taxPercent ? String(service.taxPercent) : "0"}
          />
          <InfoItem
            label="Standard Charge"
            value={service.standardCharge ? `${service.standardCharge}` : "0"}
          />
          <InfoItem
            label="Status"
            value={service.status === "Active" ? "Active" : "Inactive"}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-md shadow-sm p-5">
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-gray-700">
            {service.description?.trim() ? service.description : "-"}
          </p>
        </div>

        {/* PRICE VARY ON */}
        {service.priceVaryOn ? (
          <div className="bg-white rounded-md shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-4">Price Variation</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <InfoItem
                label="Standard"
                value={service.priceVaryOptions.standard}
              />
              <InfoItem label="Normal" value={service.priceVaryOptions.normal} />
              <InfoItem label="VIP" value={service.priceVaryOptions.vip} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

// -----------------------------------
// ⭐ Reusable Info Component
// -----------------------------------
function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col bg-gray-50 p-3 rounded-md border">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">
        {value || "-"}
      </span>
    </div>
  );
}

// -----------------------------------
// ⭐ Skeleton Loader
// -----------------------------------
function ServiceSkeleton() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-8">
        <div className="bg-white rounded-md shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm grid md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-md" />
          ))}
        </div>
      </div>
    </main>
  );
}
