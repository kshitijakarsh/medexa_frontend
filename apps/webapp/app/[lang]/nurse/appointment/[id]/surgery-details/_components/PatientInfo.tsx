// "use client";

// import { Phone, Mail, UserCircle2, ShieldCheck, Printer, Download } from "lucide-react";

// export default function PatientInfo() {
//   return (
//     <div className="bg-white rounded-xl border p-5 shadow-sm flex justify-between items-start">

//       {/* LEFT — Patient Basic Info */}
//       <div className="flex gap-4">
//         <img
//           src="/avatars/patient.png"
//           alt="patient"
//           className="w-16 h-16 rounded-full object-cover"
//         />

//         <div>
//           <h3 className="font-semibold text-lg">Fatima Al-Sabah</h3>
//           <p className="text-sm text-gray-600">MRN-2501</p>

//           {/* Info lines */}
//           <div className="text-gray-700 text-sm mt-2 space-y-1">

//             <p className="flex items-center gap-2">
//               <UserCircle2 className="w-4 h-4 text-blue-500" />
//               55Y / Female | 283014234567
//             </p>

//             <p className="flex items-center gap-2">
//               <Phone className="w-4 h-4 text-green-500" />
//               +965 284-1979
//             </p>

//             <p className="flex items-center gap-2">
//               <Mail className="w-4 h-4 text-blue-500" />
//               Abc@gmail.com
//             </p>

//             <p className="flex items-center gap-2">
//               <ShieldCheck className="w-4 h-4 text-sky-600" />
//               Kuwait Insurance
//               <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs border border-green-200">
//                 Insurance: Active
//               </span>
//             </p>

//           </div>
//         </div>
//       </div>

//       {/* RIGHT — Buttons */}
//       <div className="flex gap-3">
//         <button className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-blue-600 hover:bg-blue-50">
//           <Printer className="w-4 h-4" />
//           Print Document
//         </button>

//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
//           <Download className="w-4 h-4" />
//           Download Document
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Printer,
  Download,
  UserCircle2,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface PatientData {
  name: string;
  mrn: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  insuranceStatus: string;
  avatar?: string;
}

export default function PatientInfo() {
  const [data, setData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ Simulated API delay
    const timeout = setTimeout(() => {
      setData({
        name: "Fatima Al-Sabah",
        mrn: "MRN-2501",
        age: 55,
        gender: "Female",
        phone: "+965 284-1979",
        email: "abc@gmail.com",
        insuranceStatus: "Active",
        avatar: "/avatars/patient.png",
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-5 shadow-sm flex justify-between">
        <div className="flex gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm flex justify-between items-start">

      {/* Patient Info Block */}
      <div className="flex gap-4">
        <img
          src={data.avatar}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">{data.name}</h3>
          <p className="text-sm text-gray-600">{data.mrn}</p>

          <div className="text-gray-700 text-sm mt-2 space-y-1">

            <p className="flex items-center gap-2">
              <UserCircle2 className="w-4 h-4 text-blue-500" />
              {data.age}Y / {data.gender}
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              {data.phone}
            </p>

            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              {data.email}
            </p>

            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Insurance:
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs border border-green-200">
                {data.insuranceStatus}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-blue-600 hover:bg-blue-50">
          <Printer className="w-4 h-4" />
          Print Document
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Download Document
        </button>
      </div>
    </div>
  );
}
