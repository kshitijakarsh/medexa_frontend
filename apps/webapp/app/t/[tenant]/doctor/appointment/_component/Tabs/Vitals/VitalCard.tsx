// import React from "react";

// export function VitalCard({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode; }) {
//   return (
//     <div className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4">
//       <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
//         {icon ?? <div className="w-5 h-5 bg-gray-300 rounded-full" />}
//       </div>
//       <div>
//         <div className="text-sm text-gray-600">{label}</div>
//         <div className="text-lg font-semibold">{value ?? "-----"}</div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export function VitalCard({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-lg font-semibold">{value ?? "-----"}</div>
      </div>
    </div>
  );
}
