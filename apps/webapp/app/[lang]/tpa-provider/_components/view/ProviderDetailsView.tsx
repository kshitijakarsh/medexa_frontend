// "use client";

// import { Header } from "@/components/header";
// import { Button } from "@workspace/ui/components/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@workspace/ui/components/dropdown-menu";
// import { MoveLeft, MoreVertical } from "lucide-react";

// interface ProviderDetailsViewProps {
//   provider: any;
//   onBack: () => void;
// }

// export function ProviderDetailsView({ provider, onBack }: ProviderDetailsViewProps) {
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <Header />

//       <div className="p-5 space-y-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           {/* Header Row */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1"
//                 onClick={onBack}
//               >
//                 <MoveLeft className="w-4 h-4 mr-1" />
//                 Company Details
//               </Button>
//             </div>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="bg-[#0094FF] text-white font-medium px-5 rounded-full flex items-center gap-2 hover:bg-blue-500"
//                 >
//                   Action
//                   <MoreVertical className="w-4 h-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-32 rounded-md border border-gray-200 shadow-lg">
//                 <DropdownMenuItem
//                   className="bg-green-500 text-white text-sm font-medium cursor-pointer hover:bg-green-600"
//                   onClick={() => alert("Edit clicked")}
//                 >
//                   Edit
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="text-sm cursor-pointer hover:bg-gray-100"
//                   onClick={() => alert("Delete clicked")}
//                 >
//                   Delete
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="text-sm cursor-pointer hover:bg-gray-100"
//                   onClick={() => alert("Reset Password clicked")}
//                 >
//                   Password
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Company / TPA Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-800">
//             <div>
//               <p className="font-semibold">Chart Of Account</p>
//               <p>{provider.chartOfAccount}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Short Name</p>
//               <p>{provider.shortName}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Contact Phone</p>
//               <p>{provider.contactPhone}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Contact Email</p>
//               <p>{provider.contactEmail}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Mobile</p>
//               <p>{provider.mobile}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Email</p>
//               <p>{provider.email}</p>
//             </div>
//             <div>
//               <p className="font-semibold">GSTIN</p>
//               <p>{provider.gstin}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Type</p>
//               <p>{provider.type}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Created At</p>
//               <p>Dr. Ahmed Al-Mansouri</p>
//             </div>
//             <div>
//               <p className="font-semibold">Created At</p>
//               <p>2025-09-27 19:30</p>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-6 border-t border-gray-200" />

//           {/* Provider Details Section */}
//           <div>
//             <div className="bg-[#EAF3FF] text-[#1B4DB1] px-3 py-1.5 rounded-md w-fit font-medium text-sm mb-3">
//               Provider Details
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm text-gray-800">
//               <div>
//                 <p className="font-semibold">Provider Name</p>
//                 <p>{provider.providerName}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Contact Person</p>
//                 <p>{provider.contactPerson}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Contact Mobile</p>
//                 <p>{provider.contactMobile}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Phone</p>
//                 <p>{provider.phone}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Fax Number</p>
//                 <p>{provider.faxNumber}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">TNA/VAT</p>
//                 <p>{provider.tnavat}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Credit Limit</p>
//                 <p>{provider.creditLimit}</p>
//               </div>
//               <div className="md:col-span-2">
//                 <p className="font-semibold">Address</p>
//                 <p>{provider.address}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { Header } from "@/components/header";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { MoveLeft, MoreVertical } from "lucide-react";

interface ProviderDetailsViewProps {
  provider: any;
  onBack: () => void;
}

export function ProviderDetailsView({ provider, onBack }: ProviderDetailsViewProps) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-6">
        {/* 🔹 Top Header and Action */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            className="flex items-center gap-2 bg-[#EAF3FF] text-[#1B4DB1] font-medium px-3 py-1 rounded-md hover:bg-[#d9e8ff]"
            onClick={onBack}
          >
            <MoveLeft className="w-4 h-4" />
            Company Details
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#0094FF] text-white rounded-full px-6 py-1.5 hover:bg-[#007BE0] flex items-center gap-2">
                Action
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 rounded-md border border-gray-200 shadow-md">
              <DropdownMenuItem
                className="bg-green-500 text-white text-sm font-medium cursor-pointer hover:bg-green-600"
                onClick={() => alert("Edit clicked")}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => alert("Delete clicked")}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => alert("Password clicked")}
              >
                Password
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 🔸 Company Info Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6 text-sm text-gray-800">
            <div>
              <p className="font-semibold text-gray-900">Chart Of Account</p>
              <p>{provider.chartOfAccount}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Short Name</p>
              <p>{provider.shortName}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Contact Phone</p>
              <p>{provider.contactPhone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Contact Email</p>
              <p>{provider.contactEmail}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Mobile</p>
              <p>{provider.mobile}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p>{provider.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">GSTIN</p>
              <p>{provider.gstin}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Type</p>
              <p>{provider.type}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Created At</p>
              <p>Dr. Ahmed Al-Mansouri</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Created At</p>
              <p>2025-09-27 19:30</p>
            </div>
          </div>
        </div>

        {/* 🔹 Provider Details Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="bg-[#EAF3FF] text-[#1B4DB1] px-3 py-1.5 rounded-md w-fit font-medium text-sm mb-5">
            Provider Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-6 text-sm text-gray-800">
            <div>
              <p className="font-semibold text-gray-900">Provider Name</p>
              <p>{provider.providerName}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Contact Person</p>
              <p>{provider.contactPerson}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Contact Mobile</p>
              <p>{provider.contactMobile}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p>{provider.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Fax Number</p>
              <p>{provider.faxNumber}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">TNA/VAT</p>
              <p>{provider.tnavat}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Credit Limit</p>
              <p>{provider.creditLimit}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-900">Address</p>
              <p>{provider.address}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
