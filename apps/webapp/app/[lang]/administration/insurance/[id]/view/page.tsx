// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Header } from "@/components/header";
// import { getCompanyById } from "../../_components/view/api";
// import { CompanyDetailsView } from "../../_components/view/CompanyDetailsView";

// export default function CompanyDetailsPage() {
//   const { id } = useParams<{ id: string }>(); // ✅ ensures id is string
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [company, setCompany] = useState<any | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     const t = setTimeout(async () => {
//       const c = await getCompanyById(id);
//       setCompany(c);
//       setLoading(false);
//     }, 300);
//     return () => clearTimeout(t);
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//         <div className="p-5">
//           <div className="bg-white p-5 rounded shadow">
//             <div className="animate-pulse h-6 w-40 bg-gray-200 rounded mb-4" />
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="h-10 bg-gray-200 rounded" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   if (!company) {
//     return (
//       <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//         <div className="p-5">
//           <div className="bg-white p-5 rounded shadow text-center">
//             <p>Company not found</p>
//             <button
//               onClick={() => router.push("/company-list")}
//               className="mt-3 px-3 py-1.5 border rounded"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return <CompanyDetailsView company={company} onBack={() => router.back()} />;
// }



"use client";

import { useParams, useRouter } from "next/navigation";
import { CompanyDetailsView } from "../../_components/view/CompanyDetailsView";
import { useInsuranceById } from "../../_components/hooks/hooks";

export default function CompanyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: company, isLoading } = useInsuranceById(id);

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <div className="p-5">
          <div className="bg-white p-5 rounded shadow">
            <div className="animate-pulse h-6 w-40 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <div className="p-5">
          <div className="bg-white p-5 rounded shadow text-center">
            <p>Company not found</p>
            <button
              onClick={() => router.push("/company-list")}
              className="mt-3 px-3 py-1.5 border rounded"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  const mappedCompany = {
    id: company.id,
    providerName: company.provider_name,
    companyName: company.company_name,
    approvalUrl: company.approval_url,
    consultationServiceCode: company.consulting_service_code,
    registrationServiceCode: company.registration_service_code,
    trn: company.trn,
    address: company.address,
    logoUrl: company.insurance_company_logo_url,
    status: company.status,
    createdAt: company.created_at,
    createdBy: company.createdBy?.name,
  };

  return (
    <CompanyDetailsView
      company={mappedCompany}
      onBack={() => router.back()}
    />
  );
}
